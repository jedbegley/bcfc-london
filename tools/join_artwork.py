"""Build the minimalist recruitment card and stickers from the existing QR SVG.

Usage: python3 tools/join_artwork.py
The PDFs have a 3 mm bleed and a 75/85 x 55 mm trim box; PNGs include bleed.
"""

from pathlib import Path
import math
import re
import subprocess
import tempfile

from PIL import Image, ImageDraw
from pypdf import PdfReader, PdfWriter
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen.canvas import Canvas

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "join"
QR = OUT / "qr.svg"
RED = "#df1024"
BLACK = "#080808"
FONT = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
BOLD = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
pdfmetrics.registerFont(TTFont("JoinRegular", FONT))
pdfmetrics.registerFont(TTFont("JoinBold", BOLD))
MODULES = [(int(x), int(y)) for x, y in re.findall(r"M(\d+) (\d+)h1v1h-1z", QR.read_text())]
assert len(MODULES) > 350, "QR SVG is missing modules"
URL = "bcfclondon.co.uk/join"


def text(c, x, y, words, size, bold=True, centered=False):
    c.setFillColor(BLACK)
    c.setFont("JoinBold" if bold else "JoinRegular", size)
    (c.drawCentredString if centered else c.drawString)(x * mm, y * mm, words)


def fitted(c, x, y, words, size, width_mm, min_size, centered=False):
    while pdfmetrics.stringWidth(words, "JoinBold", size) > width_mm * mm and size > min_size:
        size -= 0.1
    if pdfmetrics.stringWidth(words, "JoinBold", size) > width_mm * mm:
        raise ValueError(f"Text cannot fit: {words}")
    text(c, x, y, words, size, centered=centered)
    return size


def underline(c, x, y, w):
    c.setStrokeColor(RED)
    c.setLineWidth(0.6 * mm)
    c.setLineCap(1)
    c.line(x * mm, y * mm, (x + w) * mm, y * mm)


def qr(c, x, y, size):
    """Draw *the existing* QR modules, including its four-module white quiet zone."""
    c.setFillColorRGB(1, 1, 1)
    c.rect(x * mm, y * mm, size * mm, size * mm, stroke=0, fill=1)
    c.setFillColor(BLACK)
    pitch = size * mm / 37
    for col, row in MODULES:
        c.rect(x * mm + col * pitch, y * mm + (36 - row) * pitch, pitch, pitch, stroke=0, fill=1)


def scan_label(c, x, y, w, h, size):
    c.setFillColor(BLACK)
    c.roundRect(x * mm, y * mm, w * mm, h * mm, 1.1 * mm, stroke=0, fill=1)
    c.setFillColorRGB(1, 1, 1)
    c.setFont("JoinBold", size)
    c.drawCentredString((x + w / 2) * mm, (y + (h - size / mm) / 2 + 0.55) * mm, "SCAN TO JOIN")


def calendar(c, x, y, s):
    c.setStrokeColor(BLACK)
    c.setLineWidth(0.42 * mm)
    c.roundRect(x * mm, (y - s * 0.35) * mm, s * mm, s * 0.78 * mm, 0.5 * mm, stroke=1, fill=0)
    c.line(x * mm, (y + s * 0.13) * mm, (x + s) * mm, (y + s * 0.13) * mm)
    for a in (0.27, 0.73):
        c.line((x + a * s) * mm, (y + s * 0.29) * mm, (x + a * s) * mm, (y + s * 0.57) * mm)


def pin(c, x, y, s):
    p = c.beginPath()
    p.moveTo((x + s / 2) * mm, (y - s * 0.42) * mm)
    p.curveTo((x + s * 0.12) * mm, (y + s * 0.02) * mm, x * mm, (y + s * 0.25) * mm, (x + s / 2) * mm, (y + s * 0.52) * mm)
    p.curveTo((x + s) * mm, (y + s * 0.25) * mm, (x + s * 0.88) * mm, (y + s * 0.02) * mm, (x + s / 2) * mm, (y - s * 0.42) * mm)
    c.setFillColor(BLACK)
    c.drawPath(p, fill=1, stroke=0)
    c.setFillColorRGB(1, 1, 1)
    c.circle((x + s / 2) * mm, (y + s * 0.19) * mm, s * 0.13 * mm, fill=1, stroke=0)


def people(c, x, y, s):
    c.setFillColor(BLACK)
    for dx, dy, r in ((0.25, 0.2, 0.105), (0.5, 0.31, 0.125), (0.75, 0.2, 0.105)):
        c.circle((x + dx * s) * mm, (y + dy * s) * mm, r * s * mm, stroke=0, fill=1)
    for dx, w, h in ((0.02, 0.43, 0.32), (0.28, 0.46, 0.4), (0.55, 0.43, 0.32)):
        c.roundRect((x + dx * s) * mm, (y - 0.24 * s) * mm, w * s * mm, h * s * mm, 0.25 * s * mm, stroke=0, fill=1)


def frame(c, w, h):
    c.setFillColorRGB(1, 1, 1)
    c.rect(0, 0, w * mm, h * mm, stroke=0, fill=1)


def business(c):
    frame(c, 91, 61)
    fitted(c, 7, 46.5, "Looking for an", 13, 51, 11)
    fitted(c, 7, 39.5, "11-a-side team?", 13, 51, 11)
    underline(c, 7, 35.5, 36)
    for icon, baseline, label, size in (
        (calendar, 29.2, "Sunday Mornings", 7.5),
        (pin, 22.6, "SW London (Clapham Common)", 7.1),
        (people, 16, "Competitive Football • Regular Socials", 6.5),
    ):
        icon(c, 7.1, baseline + 0.6, 3.5)
        fitted(c, 12, baseline, label, size, 47, 6.0)
    c.setStrokeColor(BLACK)
    c.setLineWidth(0.27 * mm)
    c.line(60 * mm, 10 * mm, 60 * mm, 51 * mm)
    qr(c, 62, 26.4, 23)
    scan_label(c, 62.5, 20.0, 22, 5.1, 6.2)
    fitted(c, 73.5, 15.1, URL, 5.4, 22.8, 5.0, centered=True)


def square(c):
    frame(c, 81, 81)
    fitted(c, 40.5, 71, "Looking for an", 14.8, 67, 12, centered=True)
    fitted(c, 40.5, 64, "11-a-side team?", 14.8, 67, 12, centered=True)
    underline(c, 22, 60.6, 37)
    calendar(c, 18, 57.3, 3)
    fitted(c, 22.5, 56.7, "Sunday Mornings", 7.7, 44, 7)
    pin(c, 18, 52.6, 3)
    fitted(c, 22.5, 52.0, "SW London (Clapham Common)", 7.2, 50, 6.7)
    qr(c, 25, 17, 31)
    scan_label(c, 29, 12, 23, 4.5, 7)
    fitted(c, 40.5, 7.2, URL, 7, 55, 6.5, centered=True)


def round_sticker(c):
    frame(c, 81, 81)
    fitted(c, 40.5, 67, "Looking for an", 11.8, 53, 10.5, centered=True)
    fitted(c, 40.5, 61.5, "11-a-side team?", 11.8, 54, 10.5, centered=True)
    underline(c, 26, 58.7, 29)
    pin(c, 21, 54.0, 2.9)
    fitted(c, 25, 53.3, "SW London (Clapham Common)", 6.9, 42, 6.4)
    qr(c, 25.5, 20.5, 30)
    scan_label(c, 30.5, 16.4, 20, 3.9, 6.5)
    fitted(c, 40.5, 12.3, URL, 6.2, 38, 5.8, centered=True)


def digital(c):
    frame(c, 108, 160)
    fitted(c, 8, 139, "Looking for an", 23, 94, 20)
    fitted(c, 8, 126, "11-a-side team?", 23, 94, 20)
    underline(c, 8.5, 119, 60)
    for icon, baseline, label, size in (
        (calendar, 107, "Sunday Mornings", 12),
        (pin, 98, "SW London (Clapham Common)", 11.5),
        (people, 89, "Competitive Football • Regular Socials", 10.3),
    ):
        icon(c, 8.5, baseline + 1, 5.5)
        fitted(c, 17, baseline, label, size, 82, 9.2)
    qr(c, 25, 17, 58)
    scan_label(c, 35.5, 10, 37, 6, 11)
    fitted(c, 54, 5.5, URL, 10, 91, 9, centered=True)


def finish_pdf(name, width, height, draw, trim=3):
    path = OUT / name
    c = Canvas(str(path), pagesize=(width * mm, height * mm), pageCompression=1)
    c.setTitle("Join BCFC London – " + name.replace("-", " "))
    c.setSubject("Print on white; 3 mm bleed and safe margins. Round sticker is cut to 75 mm diameter.")
    draw(c)
    c.showPage()
    c.save()
    reader = PdfReader(str(path))
    writer = PdfWriter()
    writer.append_pages_from_reader(reader)
    page = writer.pages[0]
    page.trimbox.lower_left = (trim * mm, trim * mm)
    page.trimbox.upper_right = ((width - trim) * mm, (height - trim) * mm)
    page.bleedbox.lower_left = (0, 0)
    page.bleedbox.upper_right = (width * mm, height * mm)
    writer.add_metadata({"/Title": name.replace("-", " "), "/Subject": "3 mm bleed; round sticker cut to 75 mm diameter"})
    with tempfile.NamedTemporaryFile(dir=OUT, suffix=".pdf", delete=False) as temp:
        writer.write(temp)
        new_path = Path(temp.name)
    new_path.replace(path)
    return path


def png_from_pdf(pdf, name, dpi):
    with tempfile.TemporaryDirectory() as temp:
        prefix = Path(temp) / "render"
        subprocess.run(["pdftoppm", "-f", "1", "-singlefile", "-r", str(dpi), "-png", str(pdf), str(prefix)], check=True, stdout=subprocess.DEVNULL)
        Image.open(str(prefix) + ".png").save(OUT / name, optimize=True)


if __name__ == "__main__":
    for name, w, h, fn, png, dpi in (
        ("card-print.pdf", 91, 61, business, "card-print.png", 300),
        ("sticker-square-print.pdf", 81, 81, square, "sticker-square-print.png", 300),
        ("sticker-round-print.pdf", 81, 81, round_sticker, "sticker-round-print.png", 300),
        ("card-phone.pdf", 108, 160, digital, "card-phone.png", 254),
    ):
        pdf = finish_pdf(name, w, h, fn, trim=3 if name != "card-phone.pdf" else 0)
        png_from_pdf(pdf, png, dpi)
        print(name, png, (OUT / png).stat().st_size)
    # The phone version only needs a PNG. Its PDF is an intermediate render.
    (OUT / "card-phone.pdf").unlink()
    # Transparent outer corners make the round PNG preview visibly circular.
    path = OUT / "sticker-round-print.png"
    im = Image.open(path).convert("RGBA")
    mask = Image.new("L", im.size, 0)
    d = ImageDraw.Draw(mask)
    d.ellipse((0, 0, im.width - 1, im.height - 1), fill=255)
    im.putalpha(mask)
    im.save(path, optimize=True)
