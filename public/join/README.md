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
- `card-phone.png` is the 1080 × 1600 single-design phone image.
- `card-print.pdf` and `card-print.png`: one-sided 85 × 55 mm landscape card; PDF media box 91 × 61 mm, trim box 85 × 55 mm, and 3 mm white bleed on every side.
- `sticker-square-print.pdf` and `.png`: 75 × 75 mm square sticker; 81 × 81 mm with bleed.
- `sticker-round-print.pdf` and `.png`: 75 mm diameter round sticker; 81 × 81 mm canvas with 3 mm white bleed and transparent PNG corners for the digital preview. Tell the printer to cut the PDF to a centered 75 mm circle. If the printer requires a spot-colour die line/template, use their supplied specification before printing.
- All print PDFs have vector QR modules and embedded fonts; their PNG exports are rendered at 300 DPI. The existing standalone QR in `qr.svg`/`qr.png` was reused exactly. The reference image's illustrative QR was not used.
- `tools/join_artwork.py` regenerates every new card/sticker asset; edit its layout values if contact wording needs to change. Printed QR code sizes are 23 mm (card), 31 mm (square) and 30 mm (round), including four-module quiet zones.
- All four rendered PNGs were decoded at pixel level to the canonical production URL. A physical sample scan on iPhone and Android should still be done before a bulk print run.

## Safe release

The form is deferred; the page instead offers clickable email, Instagram and X links. The local build passed after fixing the CSS module selector. Confirm the Vercel preview, mobile rendering and working links before requesting Jed's approval for a production merge and deployment. No player notifications are part of this work.
