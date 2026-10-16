import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import type { PDFFont, PDFPage } from "pdf-lib";

export interface VoucherDetails {
  number: string;
  date: string;        // yyyy-mm-dd
  method: string;
  payee: string;
  amount: number;
  description: string;
  preparedBy: string;
}

const A4: [number, number] = [595.28, 841.89];
const MARGIN = 48;
const GREEN = rgb(0.016, 0.471, 0.341);   // gDeep #047857
const INK = rgb(0.06, 0.09, 0.16);
const MUTED = rgb(0.42, 0.45, 0.5);
const LINE = rgb(0.88, 0.9, 0.92);

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export const formatDate = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return `${String(d).padStart(2, "0")} ${MONTHS[m - 1]} ${y}`;
};

/** Standard PDF fonts only cover Latin-1, so anything else (₹, emoji…) would throw. */
const safe = (s: string) => s.replace(/₹/g, "Rs.").replace(/[^\x20-\x7E\xA0-\xFF\n]/g, "?");

const ONES = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
const TENS = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
const twoDigits = (n: number) => n < 20 ? ONES[n] : `${TENS[Math.floor(n / 10)]}${n % 10 ? ` ${ONES[n % 10]}` : ""}`;
const threeDigits = (n: number) => [n >= 100 ? `${ONES[Math.floor(n / 100)]} Hundred` : "", twoDigits(n % 100)].filter(Boolean).join(" ");

/** Indian numbering: 1,23,45,678.50 → "One Crore Twenty Three Lakh … Rupees and Fifty Paise Only". */
export const amountInWords = (amount: number) => {
  const rupees = Math.floor(amount);
  const paise = Math.round((amount - rupees) * 100);
  const parts: string[] = [];
  const crore = Math.floor(rupees / 1e7), lakh = Math.floor(rupees / 1e5) % 100, thousand = Math.floor(rupees / 1e3) % 100, rest = rupees % 1000;
  if (crore) parts.push(`${threeDigits(crore)} Crore`);
  if (lakh) parts.push(`${twoDigits(lakh)} Lakh`);
  if (thousand) parts.push(`${twoDigits(thousand)} Thousand`);
  if (rest) parts.push(threeDigits(rest));
  const words = `${parts.join(" ") || "Zero"} Rupees`;
  return `${words}${paise ? ` and ${twoDigits(paise)} Paise` : ""} Only`;
};

const wrap = (text: string, font: PDFFont, size: number, width: number) => {
  const lines: string[] = [];
  for (const para of text.split("\n")) {
    let line = "";
    for (const word of para.split(/\s+/)) {
      const next = line ? `${line} ${word}` : word;
      if (font.widthOfTextAtSize(next, size) > width && line) { lines.push(line); line = word; }
      else line = next;
    }
    lines.push(line);
  }
  return lines;
};

const drawVoucherPage = (page: PDFPage, v: VoucherDetails, regular: PDFFont, bold: PDFFont, attachments: number) => {
  const [w, h] = A4;
  const inner = w - MARGIN * 2;

  // Header band
  page.drawRectangle({ x: 0, y: h - 110, width: w, height: 110, color: GREEN });
  page.drawText("ELEMENTS ENERGY", { x: MARGIN, y: h - 50, size: 11, font: bold, color: rgb(0.99, 0.75, 0.2) });
  page.drawText("Payment Voucher", { x: MARGIN, y: h - 80, size: 24, font: bold, color: rgb(1, 1, 1) });
  const no = safe(`No. ${v.number}`);
  page.drawText(no, { x: w - MARGIN - bold.widthOfTextAtSize(no, 13), y: h - 78, size: 13, font: bold, color: rgb(1, 1, 1) });

  let y = h - 150;
  const row = (label: string, value: string) => {
    page.drawText(label.toUpperCase(), { x: MARGIN, y, size: 8.5, font: bold, color: MUTED });
    page.drawText(safe(value) || "-", { x: MARGIN + 150, y, size: 11.5, font: regular, color: INK });
    y -= 12;
    page.drawLine({ start: { x: MARGIN, y }, end: { x: w - MARGIN, y }, thickness: 0.6, color: LINE });
    y -= 20;
  };
  row("Voucher number", v.number);
  row("Date", formatDate(v.date));
  row("Payment method", v.method);
  row("Payee name", v.payee);
  row("Prepared by", v.preparedBy);

  // Description
  page.drawText("DESCRIPTION / PURPOSE", { x: MARGIN, y, size: 8.5, font: bold, color: MUTED });
  y -= 18;
  for (const line of wrap(safe(v.description) || "-", regular, 11, inner).slice(0, 14)) {
    page.drawText(line, { x: MARGIN, y, size: 11, font: regular, color: INK });
    y -= 15;
  }
  y -= 16;

  // Amount box
  page.drawRectangle({ x: MARGIN, y: y - 64, width: inner, height: 72, color: rgb(0.925, 0.992, 0.961), borderColor: rgb(0.82, 0.98, 0.9), borderWidth: 1 });
  page.drawText("AMOUNT", { x: MARGIN + 16, y: y - 16, size: 8.5, font: bold, color: GREEN });
  page.drawText(`Rs. ${v.amount.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, { x: MARGIN + 16, y: y - 40, size: 20, font: bold, color: INK });
  page.drawText(amountInWords(v.amount), { x: MARGIN + 16, y: y - 56, size: 9, font: regular, color: MUTED });
  y -= 110;

  if (attachments) {
    page.drawText(`Payment proof attached: ${attachments} file${attachments > 1 ? "s" : ""} (following pages)`, { x: MARGIN, y, size: 9.5, font: regular, color: MUTED });
  }

  // Signatures
  const sigY = 120;
  const colW = (inner - 40) / 3;
  ["Prepared by", "Approved by", "Received by"].forEach((label, i) => {
    const x = MARGIN + i * (colW + 20);
    page.drawLine({ start: { x, y: sigY }, end: { x: x + colW, y: sigY }, thickness: 0.8, color: MUTED });
    page.drawText(label, { x, y: sigY - 14, size: 9, font: regular, color: MUTED });
  });

  page.drawText(safe(`Generated ${formatDate(new Date().toISOString().slice(0, 10))}`), { x: MARGIN, y: 40, size: 8, font: regular, color: MUTED });
};

/** Voucher on page 1, then each attachment in order: an image per page, PDFs with all their pages. */
export const buildVoucherPdf = async (v: VoucherDetails, files: File[]) => {
  const doc = await PDFDocument.create();
  doc.setTitle(`Payment Voucher ${v.number}`);
  const regular = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);

  drawVoucherPage(doc.addPage(A4), v, regular, bold, files.length);

  for (const file of files) {
    const bytes = await file.arrayBuffer();
    if (file.type === "application/pdf") {
      const src = await PDFDocument.load(bytes, { ignoreEncryption: true });
      const pages = await doc.copyPages(src, src.getPageIndices());
      pages.forEach(p => doc.addPage(p));
      continue;
    }
    const img = file.type === "image/png" ? await doc.embedPng(bytes) : await doc.embedJpg(bytes);
    const page = doc.addPage(A4);
    const [w, h] = A4;
    const scale = Math.min((w - MARGIN * 2) / img.width, (h - MARGIN * 2 - 24) / img.height, 1);
    const iw = img.width * scale, ih = img.height * scale;
    page.drawText(safe(file.name), { x: MARGIN, y: h - MARGIN + 8, size: 9, font: regular, color: MUTED });
    page.drawImage(img, { x: (w - iw) / 2, y: (h - 24 - ih) / 2, width: iw, height: ih });
  }

  return doc.save();
};
