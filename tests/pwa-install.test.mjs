// Run against a running production build: BCFC_TEST_URL=http://127.0.0.1:3102 node --test tests/pwa-install.test.mjs
import assert from "node:assert/strict";
import { test } from "node:test";

const origin = process.env.BCFC_TEST_URL || "http://127.0.0.1:3102";

test("installation metadata is available from install, login and dashboard routes", async () => {
  for (const path of ["/install", "/login", "/dashboard"]) {
    const response = await fetch(origin + path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    const head = html.slice(0, html.indexOf("</head>"));
    assert.match(head, /rel="manifest" href="\/manifest\.webmanifest"/, path);
    assert.match(head, /name="apple-mobile-web-app-capable" content="yes"/, path);
    assert.match(head, /name="apple-mobile-web-app-title" content="BCFC London"/, path);
    assert.match(head, /rel="apple-touch-icon"[^>]+href="\/icons\/apple-touch-icon\.png"/, path);
    assert.match(head, /name="theme-color" content="#e31b23"/, path);
    if (path === "/install") {
      assert.match(html, /Add to Home Screen/);
      assert.match(html, /On Android/);
      assert.match(html, /internet connection/);
    }
  }
});

test("standalone manifest has valid same-origin icons for Android and Apple", async () => {
  const response = await fetch(origin + "/manifest.webmanifest");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type"), /manifest\+json|application\/json/);
  const manifest = await response.json();
  assert.equal(manifest.name, "BCFC London");
  assert.equal(manifest.display, "standalone");
  assert.equal(manifest.scope, "/");
  assert.equal(manifest.start_url, "/");
  assert.equal(manifest.id, "/");
  assert(manifest.icons.some((icon) => icon.sizes === "192x192" && icon.purpose === "any"));
  assert(manifest.icons.some((icon) => icon.sizes === "512x512" && icon.purpose === "maskable"));
  for (const icon of [...manifest.icons, { src: "/icons/apple-touch-icon.png", sizes: "180x180" }]) {
    assert.equal(new URL(icon.src, origin).origin, new URL(origin).origin);
    const asset = await fetch(new URL(icon.src, origin));
    assert.equal(asset.status, 200, icon.src);
    assert.match(asset.headers.get("content-type"), /image\/png/);
    const png = Buffer.from(await asset.arrayBuffer());
    assert.equal(png.subarray(1, 4).toString(), "PNG");
    assert.equal(`${png.readUInt32BE(16)}x${png.readUInt32BE(20)}`, icon.sizes);
  }
});
