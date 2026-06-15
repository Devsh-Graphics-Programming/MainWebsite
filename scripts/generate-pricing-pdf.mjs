import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import PDFDocument from "pdfkit";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourcePath = path.join(rootDir, "app", "data", "pricing-rates.json");
const outputPath = path.join(rootDir, "public", "pricing.pdf");
const logoPath = path.join(rootDir, "public", "brand", "devsh-logo-glow.png");
const fontDir = path.join(rootDir, "app", "fonts", "FuturaPT", "pdf");

const pricing = JSON.parse(await readFile(sourcePath, "utf8"));

const mm = (value) => value * 72 / 25.4;

const colors = {
  background: "#020403",
  white: "#f8fffd",
  muted: "#9fa9a7",
  line: "#bafff6",
  accent: "#8ceedd",
};

function finishDocument(document) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    document.on("data", (chunk) => chunks.push(chunk));
    document.on("end", () => resolve(Buffer.concat(chunks)));
    document.on("error", reject);
    document.end();
  });
}

function withOpacity(document, opacity, draw) {
  document.save();
  document.opacity(opacity);
  draw();
  document.restore();
}

function drawLine(document, x1, y1, x2, y2, opacity = 0.4, width = 0.55) {
  withOpacity(document, opacity, () => {
    document
      .lineWidth(width)
      .strokeColor(colors.line)
      .moveTo(x1, y1)
      .lineTo(x2, y2)
      .stroke();
  });
}

function drawCenteredText(document, text, y, options) {
  document
    .font(options.font)
    .fontSize(options.size)
    .fillColor(options.color ?? colors.white)
    .text(text, 0, y, {
      width: document.page.width,
      height: options.height ?? options.size * 1.5,
      align: "center",
      lineGap: options.lineGap ?? 0,
    });
}

function drawBrand(document) {
  const logoSize = mm(24);
  const logoX = (document.page.width - logoSize) / 2;
  const logoY = mm(29);

  document.image(logoPath, logoX, logoY, {
    fit: [logoSize, logoSize],
    align: "center",
    valign: "center",
  });

  drawCenteredText(document, "DEVSH GRAPHICS PROGRAMMING SP. Z O.O.", logoY + logoSize + mm(1.15), {
    font: "FuturaMedium",
    size: 5.6,
    color: colors.white,
  });

  drawCenteredText(document, "DevSH 2026", mm(57.8), {
    font: "FuturaDemi",
    size: 30,
    color: colors.white,
  });

  drawCenteredText(document, "Professional Engineering Rates", mm(75.3), {
    font: "FuturaBook",
    size: 12.4,
    color: colors.accent,
  });
}

function drawRateValue(document, row, x, y, width, height) {
  const value = String(row.rate);
  const unit = `${pricing.currency} / ${pricing.unit}`.toUpperCase();
  const valueSize = 23;
  const unitSize = 7;
  const gap = mm(3.1);

  document.font("FuturaDemi").fontSize(valueSize);
  const valueWidth = document.widthOfString(value);

  document.font("FuturaDemi").fontSize(unitSize);
  const unitWidth = document.widthOfString(unit, { characterSpacing: 1.2 });
  const groupWidth = valueWidth + gap + unitWidth;
  const startX = x + width - groupWidth;
  const valueY = y + (height - valueSize) / 2 - 0.5;
  const unitY = y + (height - unitSize) / 2 + 0.8;

  document
    .font("FuturaDemi")
    .fontSize(valueSize)
    .fillColor(colors.white)
    .text(value, startX, valueY, {
      height: valueSize * 1.35,
      lineBreak: false,
    });

  document
    .font("FuturaDemi")
    .fontSize(unitSize)
    .fillColor(colors.accent)
    .text(unit, startX + valueWidth + gap, unitY, {
      height: unitSize * 1.4,
      lineBreak: false,
      characterSpacing: 1.2,
    });
}

function drawRateRow(document, row, y, height, layout) {
  const { left, width, rateWidth } = layout;
  const roleWidth = width - rateWidth;
  const roleSize = 17.4;
  const roleY = y + (row.note ? mm(4.6) : (height - roleSize) / 2 - 0.2);

  drawLine(document, left, y, left + width, y, 0.42, 0.45);
  drawLine(document, left + roleWidth, y + mm(4.3), left + roleWidth, y + height - mm(4.3), 0.28, 0.55);

  document
    .font("FuturaDemi")
    .fontSize(roleSize)
    .fillColor(colors.white)
    .text(row.role, left, roleY, {
      width: roleWidth - mm(8),
      height: roleSize * 1.4,
      lineBreak: false,
    });

  if (row.note) {
    const notes = Array.isArray(row.note) ? row.note : [row.note];
    document.font("FuturaBook").fontSize(7.1).fillColor(colors.muted);
    notes.forEach((note, index) => {
      document.text(note, left, y + mm(12.2) + index * mm(3.4), {
        width: roleWidth - mm(10),
        height: 9,
        lineBreak: false,
      });
    });
  }

  drawRateValue(document, row, left + roleWidth + mm(9), y, rateWidth - mm(9), height);
}

function drawPricingTable(document) {
  const left = mm(22);
  const width = document.page.width - left * 2;
  const top = mm(99.4);
  const rateWidth = mm(52);
  const rowHeights = pricing.rates.map((row) => row.note ? mm(23.5) : mm(17.7));
  let y = top;

  pricing.rates.forEach((row, index) => {
    drawRateRow(document, row, y, rowHeights[index], { left, width, rateWidth });
    y += rowHeights[index];
  });

  drawLine(document, left, y, left + width, y, 0.55, 0.7);

  const noteY = y + mm(6.2);
  drawCenteredText(document, "Rates are exclusive of VAT where applicable.", noteY, {
    font: "FuturaBook",
    size: 7.6,
    color: colors.muted,
  });

  return noteY + mm(9);
}

function drawFooter(document, topY) {
  const left = mm(22);
  const width = document.page.width - left * 2;
  const right = left + width;
  const blockTop = topY + mm(2.2);
  const legalLineY = topY + mm(23.4);

  drawLine(document, left, topY, right, topY, 0.5, 0.55);

  document
    .font("FuturaDemi")
    .fontSize(8.2)
    .fillColor(colors.white)
    .text("DevSH Graphics Programming Sp. z o.o.", left, blockTop + mm(1.2), {
      width: mm(96),
      height: 10,
      lineBreak: false,
    });

  document
    .font("FuturaBook")
    .fontSize(7.4)
    .fillColor(colors.muted)
    .text("ul. Lipuska 36\n80-178 Gdansk\nPoland", left, blockTop + mm(6.6), {
      width: mm(64),
      height: mm(13),
      lineGap: 1.15,
    });

  document
    .font("FuturaBook")
    .fontSize(7.4)
    .fillColor(colors.muted)
    .text("Contact", right - mm(45), blockTop + mm(5.8), {
      width: mm(45),
      height: 10,
      align: "right",
      lineBreak: false,
    });

  document
    .font("FuturaBook")
    .fontSize(7.4)
    .fillColor(colors.accent)
    .text("devsh@devsh.eu", right - mm(45), blockTop + mm(10.8), {
      width: mm(45),
      height: 10,
      align: "right",
      lineBreak: false,
    });

  drawLine(document, left, legalLineY, right, legalLineY, 0.36, 0.5);

  drawCenteredText(document, "NIP 5833334868 | REGON 382168019 | KRS 0000764661", legalLineY + mm(5), {
    font: "FuturaBook",
    size: 7.2,
    color: colors.muted,
  });
  drawCenteredText(document, "Share capital: 15 000 PLN paid in full", legalLineY + mm(9.6), {
    font: "FuturaBook",
    size: 7.2,
    color: colors.muted,
  });
}

const document = new PDFDocument({
  size: "A4",
  margin: 0,
  info: {
    Title: "DevSH 2026 Professional Engineering Rates",
    Author: "DevSH Graphics Programming Sp. z o.o.",
  },
});

document.registerFont("FuturaBook", path.join(fontDir, "FuturaCyrillicBook.ttf"));
document.registerFont("FuturaMedium", path.join(fontDir, "FuturaCyrillicMedium.ttf"));
document.registerFont("FuturaDemi", path.join(fontDir, "FuturaCyrillicDemi.ttf"));

document.rect(0, 0, document.page.width, document.page.height).fill(colors.background);
drawBrand(document);
const footerTop = drawPricingTable(document);
drawFooter(document, footerTop);

await mkdir(path.dirname(outputPath), { recursive: true });
await writeFile(outputPath, await finishDocument(document));
console.log(`Generated ${path.relative(rootDir, outputPath)}`);
