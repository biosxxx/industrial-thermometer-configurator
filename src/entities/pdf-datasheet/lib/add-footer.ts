import type { jsPDF } from 'jspdf';

export const addFooter = (doc: jsPDF, pageNumber: number, totalPages: number) => {
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;

  doc.setPage(pageNumber);
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8);
  doc.setTextColor(150);
  doc.text('cadautoscript.com', margin, pageHeight - 10);
  doc.link(margin, pageHeight - 13, 30, 5, { url: 'https://cadautoscript.com' });
  doc.text(`Page ${pageNumber} of ${totalPages}`, pageWidth - margin, pageHeight - 10, {
    align: 'right',
  });
};

