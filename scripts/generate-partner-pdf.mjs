import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  rootDir, logoPath, mm, colors, createDocument, finishDocument, drawLine, drawFooter,
} from "./lib/pdf-brand.mjs";

const content = JSON.parse(await readFile(path.join(rootDir, "app/data/partner-content.json"), "utf8"));
const outputPath = path.join(rootDir, "public/partner.pdf");
const contact = content.blocks.find((block) => block.type === "contact");
const document = createDocument(content.blocks[0].text);
document.on("pageAdded", () => {
  throw new Error("Partner PDF must fit on one A4 page");
});
const left = mm(22);
const width = document.page.width - left * 2;
const maxFooterTop = mm(257);
const sectionGap = 9;
const space = {
  block: 3,
  section: sectionGap,
  ruleToHeading: 6,
  headingToBody: 3,
  step: 6,
  stepToBody: 2,
  titleToReward: 3,
  rewardToSubtitle: 6.5,
  intro: sectionGap * 2,
  quote: 3.5,
  quoteEnd: 1.5,
};
const bodyColor = "#e5eae7";
const rewardColor = "#92dfd2";
const bodySize = 9.6;
let y = mm(23);

const logoSize = mm(14);
const logoY = mm(8);
document.image(logoPath, (document.page.width - logoSize) / 2, logoY, { width: logoSize });

function checkBounds(text) {
  if (y > maxFooterTop - space.section) {
    throw new Error(`Partner content exceeds the A4 layout at ${y.toFixed(1)}pt: ${text.slice(0, 60)}`);
  }
}

function drawText(text, {
  size = bodySize, font = "FuturaBook", color = bodyColor,
  after = space.block, indent = 0, align = "left", characterSpacing = 0,
} = {}) {
  document.font(font).fontSize(size).fillColor(color);
  const options = { width: width - indent, lineGap: 1.2, align, characterSpacing };
  const height = document.heightOfString(text, options);
  checkBounds(text);
  document.text(text, left + indent, y, options);
  y += height + after;
  checkBounds(text);
}

function drawBullet(text, nextBlock) {
  const indent = 10;
  const colon = text.indexOf(":");
  document.save().circle(left + 2, y + 5, 1).fill(colors.accent).restore();
  if (colon < 0) {
    const continues = nextBlock?.type === "bullet";
    drawText(text, { indent, after: continues ? space.quote : space.quoteEnd });
    if (!continues) y += space.block;
    return;
  }
  const options = { width: width - indent, lineGap: 1.2 };
  document.font("FuturaDemi").fontSize(bodySize).fillColor(colors.white)
    .text(`${text.slice(0, colon + 1)} `, left + indent, y, { ...options, continued: true });
  document.font("FuturaBook").fillColor(bodyColor)
    .text(text.slice(colon + 1).trimStart(), { ...options, continued: false });
  y = document.y + space.block;
  checkBounds(text);
}

function drawSectionHeading(text) {
  y += space.section;
  drawLine(document, left, y, left + width, y, 0.32, 0.45);
  y += space.ruleToHeading;
  drawText(text, { font: "FuturaDemi", size: 13, color: colors.white, after: space.headingToBody });
}

for (const [index, block] of content.blocks.entries()) {
  if (block.type === "title") {
    const titleSize = 24;
    document.font("FuturaDemi").fontSize(titleSize);
    if (document.widthOfString(block.text) > width) {
      throw new Error("Partner title exceeds the content width");
    }
    drawText(block.text, { font: "FuturaDemi", size: titleSize, color: colors.white, align: "center", after: space.titleToReward });
  } else if (block.type === "reward") {
    drawText(block.text, { font: "FuturaDemi", size: 24, color: rewardColor, align: "center", characterSpacing: 0.6, after: space.rewardToSubtitle });
  } else if (block.type === "subtitle") {
    drawText(block.text, { size: 11.5, color: bodyColor, align: "center", after: space.intro });
  } else if (block.type === "heading") {
    drawSectionHeading(block.text);
  } else if (block.type === "subheading") {
    if (content.blocks[index - 1]?.type !== "heading") y += space.step;
    drawText(block.text, { font: "FuturaDemi", size: 10.2, color: colors.white, after: space.stepToBody });
  } else if (block.type === "contact") {
    drawSectionHeading(block.text);
    const baseline = y + 10.5;
    document.font("FuturaBook").fontSize(10.5).fillColor(bodyColor);
    const emailX = left + document.widthOfString(block.prompt) + 5;
    document.text(block.prompt, left, baseline, { width, baseline: "alphabetic", lineBreak: false });
    document.font("FuturaMedium").fontSize(10.5).fillColor(colors.accent)
      .text(block.email, emailX, baseline, {
        width: left + width - emailX, baseline: "alphabetic", lineBreak: false, link: `mailto:${block.email}`,
      });
    y = baseline + 3;
    checkBounds(block.email);
  } else if (block.type === "bullet") {
    drawBullet(block.text, content.blocks[index + 1]);
  } else if (block.type === "paragraph") {
    drawText(block.text);
  } else {
    throw new Error(`Unknown partner content block type: ${block.type}`);
  }
}

const footerTop = y + space.section;
if (footerTop > maxFooterTop) throw new Error("Partner footer exceeds the A4 layout");
drawFooter(document, footerTop, contact.email, {
  colors: { white: "#bdc9c5", muted: "#889692", accent: "#a6bdb5" },
  lineOpacity: 0.28,
  legalLineOpacity: 0.20,
});
await mkdir(path.dirname(outputPath), { recursive: true });
const pdf = await finishDocument(document);
await writeFile(outputPath, pdf);
console.log(`Generated ${path.relative(rootDir, outputPath)} (${pdf.length} bytes)`);
