import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import PDFDocument from "pdfkit";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourcePath = path.join(rootDir, "app", "data", "pricing-rates.json");
const outputPath = path.join(rootDir, "public", "pricing.pdf");

const pricing = JSON.parse(await readFile(sourcePath, "utf8"));

function finishDocument(document) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    document.on("data", (chunk) => chunks.push(chunk));
    document.on("end", () => resolve(Buffer.concat(chunks)));
    document.on("error", reject);
    document.end();
  });
}

function maxTextWidth(document, values) {
  return Math.max(...values.map((value) => document.widthOfString(String(value))));
}

function drawCell(document, x, y, width, height, value, options = {}) {
  const paddingX = options.paddingX;
  const paddingY = options.paddingY;
  const textWidth = width - paddingX * 2;

  document
    .font(options.bold ? "Helvetica-Bold" : "Helvetica")
    .fontSize(options.fontSize);

  const verticalOffset = Math.max((height - document.currentLineHeight(true)) / 2, paddingY / 2);

  document.text(String(value), x + paddingX, y + verticalOffset, {
      width: textWidth,
      align: options.align ?? "left",
      lineBreak: false,
  });
}

function drawPricingTable(document, rows) {
  const columns = [
    { key: "role", title: "Role" },
    { key: "rate", title: `${pricing.currency}/${pricing.unit}` },
  ];
  const paddingX = 12;
  const paddingY = 8;
  const fontSize = 10;
  const headerFontSize = 10;
  const left = document.page.margins.left;
  const maxWidth = document.page.width - document.page.margins.left - document.page.margins.right;

  document.font("Helvetica-Bold").fontSize(headerFontSize);
  const rateColumnWidth = Math.ceil(
    maxTextWidth(document, [columns[1].title, ...rows.map((row) => row.rate)]) + paddingX * 2
  );
  const roleColumnWidth = maxWidth - rateColumnWidth;
  const tableWidth = roleColumnWidth + rateColumnWidth;

  const rowHeights = [
    document.currentLineHeight(true) + paddingY * 2,
    ...rows.map((row) => {
      document.font("Helvetica").fontSize(fontSize);
      const roleHeight = document.heightOfString(String(row.role), {
        width: roleColumnWidth - paddingX * 2,
      });
      const rateHeight = document.heightOfString(String(row.rate), {
        width: rateColumnWidth - paddingX * 2,
      });
      return Math.ceil(Math.max(roleHeight, rateHeight) + paddingY * 2);
    }),
  ];

  let y = document.y;
  const totalHeight = rowHeights.reduce((sum, height) => sum + height, 0);

  document.rect(left, y, tableWidth, totalHeight).stroke();
  document
    .moveTo(left + roleColumnWidth, y)
    .lineTo(left + roleColumnWidth, y + totalHeight)
    .stroke();

  const headerHeight = rowHeights[0];
  drawCell(document, left, y, roleColumnWidth, headerHeight, columns[0].title, {
    paddingX,
    paddingY,
    fontSize: headerFontSize,
    bold: true,
  });
  drawCell(document, left + roleColumnWidth, y, rateColumnWidth, headerHeight, columns[1].title, {
    paddingX,
    paddingY,
    fontSize: headerFontSize,
    bold: true,
  });

  y += headerHeight;
  document.moveTo(left, y).lineTo(left + tableWidth, y).stroke();

  rows.forEach((row, index) => {
    const height = rowHeights[index + 1];
    drawCell(document, left, y, roleColumnWidth, height, row.role, {
      paddingX,
      paddingY,
      fontSize,
    });
    drawCell(document, left + roleColumnWidth, y, rateColumnWidth, height, row.rate, {
      paddingX,
      paddingY,
      fontSize,
    });

    y += height;
    document.moveTo(left, y).lineTo(left + tableWidth, y).stroke();
  });

  document.y = y;
}

const document = new PDFDocument({
  size: "A4",
  margin: 72,
  info: {
    Title: "DevSH 2026 Professional Engineering Rates",
    Author: "DevSH",
  },
});

document.font("Helvetica-Bold").fontSize(16).text("DevSH 2026", {
  align: "center",
});
document.moveDown(0.7);
document.font("Helvetica-Bold").fontSize(14).text("Professional Engineering Rates", {
  align: "center",
});
document.moveDown(1.8);

drawPricingTable(document, pricing.rates);
const noteY = document.y + 12;
document
  .font("Helvetica")
  .fontSize(9)
  .text("Rates are exclusive of VAT where applicable.", document.page.margins.left, noteY, {
    width: document.page.width - document.page.margins.left - document.page.margins.right,
    align: "left",
  });

await mkdir(path.dirname(outputPath), { recursive: true });
await writeFile(outputPath, await finishDocument(document));
console.log(`Generated ${path.relative(rootDir, outputPath)}`);
