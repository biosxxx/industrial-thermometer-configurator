import { buildPdfPayload } from '@/entities/thermometer-config/lib/build-pdf-payload';
import type {
  ThermometerConfiguratorState,
  PdfSectionRow,
  TechnicalContentBlock,
} from '@/entities/thermometer-config/model/types';
import { addFooter } from '@/entities/pdf-datasheet/lib/add-footer';
import { capturePreview } from '@/entities/pdf-datasheet/lib/capture-preview';

const SECTION_FILL = [240, 240, 240] as const;
const CONTENT_WIDTH = 170;
const PREVIEW_BOX = {
  width: 170,
  height: 118,
};

const renderSection = (
  doc: import('jspdf').jsPDF,
  title: string,
  rows: PdfSectionRow[],
  margin: number,
  y: number,
) => {
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setFillColor(...SECTION_FILL);
  doc.rect(margin, y, 170, 7, 'F');
  doc.setTextColor(40);
  doc.text(title.toUpperCase(), margin + 2, y + 5);
  y += 12;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);

  rows.forEach((row) => {
    doc.setTextColor(100);
    doc.text(`${row.label}:`, margin + 5, y);
    doc.setTextColor(0);
    doc.text(row.value, margin + 75, y);
    y += 7;
  });

  return y + 5;
};

const renderTextSection = (
  doc: import('jspdf').jsPDF,
  title: string,
  text: string,
  margin: number,
  y: number,
) => {
  const pageHeight = doc.internal.pageSize.getHeight();

  if (y > 250) {
    doc.addPage();
    y = 20;
  }

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setFillColor(...SECTION_FILL);
  doc.rect(margin, y, 170, 7, 'F');
  doc.setTextColor(40);
  doc.text(title.toUpperCase(), margin + 2, y + 5);
  y += 12;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(50);

  const lines = doc.splitTextToSize(text, 170);
  lines.forEach((line: string) => {
    if (y > pageHeight - 18) {
      doc.addPage();
      y = 20;
    }
    doc.text(line, margin + 2, y);
    y += 5;
  });

  return y + 5;
};

const ensurePageSpace = (
  doc: import('jspdf').jsPDF,
  y: number,
  requiredHeight: number,
) => {
  const pageHeight = doc.internal.pageSize.getHeight();

  if (y + requiredHeight <= pageHeight - 18) {
    return y;
  }

  doc.addPage();
  return 20;
};

const fitImageIntoBox = (
  sourceWidth: number,
  sourceHeight: number,
  maxWidth: number,
  maxHeight: number,
) => {
  const widthRatio = maxWidth / sourceWidth;
  const heightRatio = maxHeight / sourceHeight;
  const scale = Math.min(widthRatio, heightRatio, 1);

  return {
    width: sourceWidth * scale,
    height: sourceHeight * scale,
  };
};

const renderTechnicalBlocksSection = async (
  doc: import('jspdf').jsPDF,
  blocks: TechnicalContentBlock[],
  margin: number,
  y: number,
) => {
  if (!blocks.length) {
    return y;
  }

  y = ensurePageSpace(doc, y, 30);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setFillColor(...SECTION_FILL);
  doc.rect(margin, y, CONTENT_WIDTH, 7, 'F');
  doc.setTextColor(40);
  doc.text('6A. RICH TECHNICAL ATTACHMENTS', margin + 2, y + 5);
  y += 12;

  for (const block of blocks) {
    y = ensurePageSpace(doc, y, 26);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(25);
    doc.text(block.title || 'Technical attachment', margin + 2, y);
    y += 6;

    if (block.type === 'text') {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(60);
      const lines = doc.splitTextToSize(block.text || '-', CONTENT_WIDTH - 4);
      lines.forEach((line: string) => {
        y = ensurePageSpace(doc, y, 8);
        doc.text(line, margin + 2, y);
        y += 5;
      });
      y += 4;
      continue;
    }

    if (block.type === 'table') {
      const columnCount = Math.max(block.columns.length, 1);
      const columnWidth = CONTENT_WIDTH / columnCount;

      y = ensurePageSpace(doc, y, 14);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);

      block.columns.forEach((column, columnIndex) => {
        const cellX = margin + columnIndex * columnWidth;
        doc.setFillColor(245, 245, 245);
        doc.rect(cellX, y, columnWidth, 8, 'FD');
        doc.text(column || `Column ${columnIndex + 1}`, cellX + 2, y + 5);
      });
      y += 8;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);

      block.rows.forEach((row) => {
        const rowLines = row.map((cell) => doc.splitTextToSize(cell || '-', columnWidth - 4));
        const rowHeight = Math.max(...rowLines.map((lines: string[]) => lines.length), 1) * 4 + 4;
        y = ensurePageSpace(doc, y, rowHeight + 2);

        row.forEach((cell, columnIndex) => {
          const cellX = margin + columnIndex * columnWidth;
          doc.rect(cellX, y, columnWidth, rowHeight);
          doc.text(doc.splitTextToSize(cell || '-', columnWidth - 4), cellX + 2, y + 4);
        });

        y += rowHeight;
      });

      y += 6;
      continue;
    }

    const hasImage = Boolean(block.src);

    if (hasImage) {
      const imageProps = doc.getImageProperties(block.src);
      const maxWidth = CONTENT_WIDTH - 10;
      const maxHeight = 90;
      const widthRatio = maxWidth / imageProps.width;
      const heightRatio = maxHeight / imageProps.height;
      const imageRatio = Math.min(widthRatio, heightRatio, 1);
      const imageWidth = imageProps.width * imageRatio;
      const imageHeight = imageProps.height * imageRatio;

      y = ensurePageSpace(doc, y, imageHeight + 24);
      doc.addImage(block.src, imageProps.fileType || 'JPEG', margin + 2, y, imageWidth, imageHeight);
      y += imageHeight + 6;
    } else {
      y = ensurePageSpace(doc, y, 18);
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(9);
      doc.setTextColor(120);
      doc.text('No screenshot uploaded.', margin + 2, y);
      y += 6;
    }

    if (block.caption.trim()) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(70);
      const captionLines = doc.splitTextToSize(block.caption, CONTENT_WIDTH - 4);
      captionLines.forEach((line: string) => {
        y = ensurePageSpace(doc, y, 8);
        doc.text(line, margin + 2, y);
        y += 4.5;
      });
    }

    y += 4;
  }

  return y;
};

export const exportThermometerDatasheet = async (
  config: ThermometerConfiguratorState,
  previewElement: HTMLElement,
) => {
  const [{ jsPDF }] = await Promise.all([import('jspdf')]);
  const payload = buildPdfPayload(config);
  const sketchImage = await capturePreview(previewElement);

  const doc = new jsPDF({
    orientation: 'p',
    unit: 'mm',
    format: 'a4',
    compress: true,
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  let y = 20;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(33, 150, 243);
  doc.text('TECHNICAL DATA SHEET', margin, y);
  y += 8;
  doc.setFontSize(9);
  doc.setTextColor(100);
  doc.text('INDUSTRIAL THERMOMETER SPECIFICATION', margin, y);
  y += 4;
  doc.line(margin, y, 190, y);
  y += 12;

  y = renderSection(doc, '1. Project Data', payload.sections.projectData, margin, y);
  y = renderSection(doc, '2. Technical Specifications', payload.sections.technicalSpecifications, margin, y);
  y = renderSection(doc, '3. Stem & Connection', payload.sections.stemConnection, margin, y);
  y = renderSection(doc, '4. Thermowell', payload.sections.thermowell, margin, y);
  y = renderSection(doc, '5. Options', payload.sections.options, margin, y);
  y = renderTextSection(doc, '6. Other Technical Parameters', payload.technicalParameters, margin, y);
  y = await renderTechnicalBlocksSection(doc, payload.technicalContent, margin, y);

  doc.addPage();
  y = 20;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(33, 150, 243);
  doc.text('PRELIMINARY SKETCH', pageWidth / 2, y, { align: 'center' });
  const sketchProps = doc.getImageProperties(sketchImage);
  const fittedPreview = fitImageIntoBox(
    sketchProps.width,
    sketchProps.height,
    PREVIEW_BOX.width,
    PREVIEW_BOX.height,
  );
  const previewX = (pageWidth - fittedPreview.width) / 2;
  const previewY = 42;
  doc.setDrawColor(225, 232, 240);
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(previewX - 4, previewY - 4, fittedPreview.width + 8, fittedPreview.height + 8, 4, 4, 'FD');
  doc.addImage(sketchImage, 'JPEG', previewX, previewY, fittedPreview.width, fittedPreview.height);
  doc.setFontSize(8);
  doc.setTextColor(150);
  payload.sketchNotes.forEach((note, index) => {
    doc.text(note, margin, previewY + fittedPreview.height + 18 + index * 5);
  });

  const totalPages = doc.getNumberOfPages();
  for (let page = 1; page <= totalPages; page += 1) {
    addFooter(doc, page, totalPages);
  }

  doc.save(payload.fileName);
};
