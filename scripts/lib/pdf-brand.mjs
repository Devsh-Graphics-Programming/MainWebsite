import path from "node:path";
import { fileURLToPath } from "node:url";
import PDFDocument from "pdfkit";

export const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
export const logoPath = path.join(rootDir, "public", "brand", "devsh-logo-glow.png");
const fontDir = path.join(rootDir, "app", "fonts", "FuturaPT", "pdf");

export const mm = (value) => value * 72 / 25.4;

export const colors = {
  background: "#020403",
  white: "#f8fffd",
  muted: "#9fa9a7",
  line: "#bafff6",
  accent: "#8ceedd",
};

export function finishDocument(document) {
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

export function drawLine(document, x1, y1, x2, y2, opacity = 0.4, width = 0.55) {
  withOpacity(document, opacity, () => {
    document
      .lineWidth(width)
      .strokeColor(colors.line)
      .moveTo(x1, y1)
      .lineTo(x2, y2)
      .stroke();
  });
}

export function drawCenteredText(document, text, y, options) {
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

export function drawFooter(document, topY, contact = "devsh@devsh.eu", options = {}) {
  const footerColors = { ...colors, ...options.colors };
  const left = mm(22);
  const width = document.page.width - left * 2;
  const right = left + width;
  const blockTop = topY + mm(2.2);
  const legalLineY = topY + mm(23.4);

  drawLine(document, left, topY, right, topY, options.lineOpacity ?? 0.5, 0.55);

  document
    .font("FuturaDemi")
    .fontSize(8.2)
    .fillColor(footerColors.white)
    .text("DevSH Graphics Programming Sp. z o.o.", left, blockTop + mm(1.2), {
      width: mm(96),
      height: 10,
      lineBreak: false,
    });

  document
    .font("FuturaBook")
    .fontSize(7.4)
    .fillColor(footerColors.muted)
    .text("ul. Lipuska 36\n80-178 Gdansk\nPoland", left, blockTop + mm(6.6), {
      width: mm(64),
      height: mm(13),
      lineGap: 1.15,
    });

  document
    .font("FuturaBook")
    .fontSize(7.4)
    .fillColor(footerColors.muted)
    .text("Contact", right - mm(45), blockTop + mm(5.8), {
      width: mm(45),
      height: 10,
      align: "right",
      lineBreak: false,
    });

  document
    .font("FuturaBook")
    .fontSize(7.4)
    .fillColor(footerColors.accent)
    .text(contact, right - mm(45), blockTop + mm(10.8), {
      width: mm(45),
      height: 10,
      align: "right",
      lineBreak: false,
    });

  drawLine(document, left, legalLineY, right, legalLineY, options.legalLineOpacity ?? 0.36, 0.5);

  drawCenteredText(document, "NIP 5833334868 | REGON 382168019 | KRS 0000764661", legalLineY + mm(5), {
    font: "FuturaBook",
    size: 7.2,
    color: footerColors.muted,
  });
  drawCenteredText(document, "Share capital: 15 000 PLN paid in full", legalLineY + mm(9.6), {
    font: "FuturaBook",
    size: 7.2,
    color: footerColors.muted,
  });
}

export function createDocument(title) {
  const document = new PDFDocument({
    size: "A4",
    margin: 0,
    compress: true,
    info: { Title: title, Author: "DevSH Graphics Programming Sp. z o.o." },
  });
  document.registerFont("FuturaBook", path.join(fontDir, "FuturaCyrillicBook.ttf"));
  document.registerFont("FuturaMedium", path.join(fontDir, "FuturaCyrillicMedium.ttf"));
  document.registerFont("FuturaDemi", path.join(fontDir, "FuturaCyrillicDemi.ttf"));
  document.rect(0, 0, document.page.width, document.page.height).fill(colors.background);
  return document;
}
