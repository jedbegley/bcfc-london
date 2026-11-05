# Join page assets

The recruitment page is an independent route at `/join`, not a news article. Do not merge until the preview build and the deployed page have been checked and Jed approves.

## Photographs

The manager supplied the actual current squad and historic cup-winning photographs in the 5 November Work conversation. Web-optimised derivatives are committed at:

- `public/join/squad-2026.jpg`: current squad, landscape hero.
- `public/join/squad-social.jpg`: 1200 × 630 crop of the same photo for Open Graph/X.
- `public/join/cup-winners-west-ham.jpg`: cup-winning team outside the stadium, portrait, displayed in the history section.

Do not substitute generic photos. Check that no individuals are cut out by the mobile hero crop or social crop. Review image file sizes and accessibility alt text.

## Card and QR

- `qr.svg` is a 1480 × 1480 pure-vector QR with four modules of quiet zone. Its encoded byte payload was independently decoded to `https://www.bcfclondon.co.uk/join`. Camera scanning and live destination remain to be checked after deployment.
- `qr.png` is the downloadable 1480 × 1480 raster export of that code.
- `card-phone.svg` displays the front and back together as a portrait phone image.
- `card-phone.png` is the downloadable 1080 × 1480 phone image.
- `card-front-print.svg` and `card-back-print.svg` each measure 91 × 61 mm including 3 mm bleed on every side. Trim to 85 × 55 mm; keep key text clear of the trim. The back embeds the real QR vector.
- Export at 300 DPI or above to PNG/PDF with a vector-capable renderer, retaining the bleed. Inspect the rendered card at actual printed size and test with iPhone and Android cameras before sharing or printing.

## Safe release

The form is deferred; the page instead offers clickable email, Instagram and X links. The local build passed after fixing the CSS module selector. Confirm the Vercel preview, mobile rendering and working links before requesting Jed's approval for a production merge and deployment. No player notifications are part of this work.
