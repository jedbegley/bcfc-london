"""Rebuild fixture 12 artwork from the supplied badge files and background image.

Run from the repository root with the three source paths as arguments. The
badge crops retain the supplied pixels; only the surrounding phone UI is
removed from the Three Little Birds screenshot.
"""
from pathlib import Path
import sys
from PIL import Image, ImageDraw, ImageFont


def badge(source, box, size=500):
    image = Image.open(source).convert("RGBA").crop(box).resize((size, size), Image.Resampling.LANCZOS)
    mask = Image.new("L", (size, size))
    ImageDraw.Draw(mask).ellipse((2, 2, size - 3, size - 3), fill=255)
    image.putalpha(mask)
    return image


def main():
    if len(sys.argv) != 4:
        raise SystemExit("usage: script.py BRISTOL_BADGE THREE_LITTLE_BIRDS_SCREENSHOT PITCH_BACKGROUND")
    output = Path("public/matches/12")
    output.mkdir(parents=True, exist_ok=True)
    bristol = badge(sys.argv[1], (28, 0, 664, 636))
    birds = badge(sys.argv[2], (118, 449, 592, 923))
    bristol.save(output / "bristol-city-badge.png")
    birds.save(output / "three-little-birds-badge.png")

    im = Image.open(sys.argv[3]).convert("RGB").resize((1600, 900), Image.Resampling.LANCZOS).convert("RGBA")
    shade = Image.new("RGBA", im.size, (3, 9, 19, 0))
    shade.putalpha(Image.new("L", im.size, 112))
    im = Image.alpha_composite(im, shade)
    d = ImageDraw.Draw(im)
    bold = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
    regular = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
    def centered(label, y, size, fill, font=bold):
        f = ImageFont.truetype(font, size)
        width = d.textlength(label, font=f)
        d.text(((1600-width)/2, y), label, font=f, fill=fill, stroke_width=0)

    centered("MATCHDAY  /  LEAGUE EIGHT", 52, 40, "#F2F2F2")
    d.rounded_rectangle((380, 105, 1220, 111), radius=3, fill="#D91E2B")
    for logo, x in ((bristol, 290), (birds, 1100)):
        im.alpha_composite(logo.resize((210, 210), Image.Resampling.LANCZOS), (x, 194))
    d = ImageDraw.Draw(im)
    centered("BRISTOL CITY", 460, 67, "#FFFFFF")
    centered("VS", 547, 38, "#ED2734")
    centered("THREE LITTLE BIRDS FC", 605, 56, "#FFFFFF")
    centered("SUNDAY 8 NOVEMBER 2026", 728, 39, "#FFFFFF")
    centered("10:30AM KICK-OFF   |   CLAPHAM COMMON", 791, 32, "#FFFFFF", regular)
    im.convert("RGB").save(output / "matchday.jpg", quality=91, optimize=True)


if __name__ == "__main__":
    main()
