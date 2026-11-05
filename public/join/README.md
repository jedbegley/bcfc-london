# Join page assets

The recruitment page is an independent route at `/join`, not a news article. Do not merge until both real photographs have been uploaded and the preview build is green.

## Photographs

The manager supplied the actual current squad and historic cup-winning photographs in the 5 November Work conversation. Preserve the originals and export web-optimised derivatives at:

- `public/join/squad-2026.jpg`: current squad, landscape. This image is the hero and current Open Graph/X image. Prepare a separate 1200 × 630 social crop if the original image does not compose well in social previews; update `app/join/page.js` accordingly.
- `public/join/cup-winners-west-ham.jpg`: cup-winning team outside the stadium, portrait, displayed in the history section.

Do not substitute generic photos. Check that no individuals are cut out by the mobile hero crop or social crop. Review image file sizes and accessibility alt text.

## Card and QR

- `qr.svg` is a 1480 × 1480 pure-vector QR with four modules of quiet zone. Its encoded byte payload was independently decoded to `https://www.bcfclondon.co.uk/join`. Camera scanning and live destination remain to be checked after deployment.
- `card-phone.svg` displays the front and back together as a portrait phone image.
- `card-front-print.svg` and `card-back-print.svg` each measure 91 × 61 mm including 3 mm bleed on every side. Trim to 85 × 55 mm; keep key text clear of the trim. The back embeds the real QR vector.
- Export at 300 DPI or above to PNG/PDF with a vector-capable renderer, retaining the bleed. Inspect the rendered card at actual printed size and test with iPhone and Android cameras before sharing or printing.

## Safe release

The form is deferred; the page instead offers clickable email, Instagram and X links. Do not deploy until the two photographs are included, build and mobile preview pass, and Jed explicitly approves this PR's production merge and deployment. No player notifications are part of this work.
