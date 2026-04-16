import html2canvas from 'html2canvas';

export const capturePreview = async (previewElement: HTMLElement) => {
  const canvas = await html2canvas(previewElement, {
    backgroundColor: '#ffffff',
    scale: 3,
    useCORS: true,
    logging: false,
    onclone: (clonedDocument) => {
      const element = clonedDocument.querySelector('[data-preview-capture]');
      if (element instanceof HTMLElement) {
        element.style.background = '#ffffff';
        element.style.border = 'none';
        element.style.boxShadow = 'none';
        element.style.width = '1080px';
        element.style.padding = '28px 32px 26px';
        element.style.borderRadius = '28px';
      }

      const figure = clonedDocument.querySelector('[data-preview-figure]');
      if (figure instanceof HTMLElement) {
        figure.style.maxWidth = '760px';
        figure.style.paddingTop = '8px';
      }

      const title = clonedDocument.querySelector('[data-preview-title]');
      if (title instanceof HTMLElement) {
        title.style.color = '#64748b';
        title.style.fontSize = '12px';
        title.style.letterSpacing = '0.35em';
      }

      // Badges are rendered as vector pills directly in PDF — remove from capture entirely.
      clonedDocument.querySelector('[data-preview-badges]')?.remove();

      const watermark = clonedDocument.querySelector('[data-preview-watermark]');
      if (watermark instanceof HTMLElement) {
        watermark.style.color = '#f97316';
        watermark.style.opacity = '1';
        watermark.style.fontSize = '12px';
      }

      const footer = clonedDocument.querySelector('[data-preview-footer]');
      if (footer instanceof HTMLElement) {
        footer.style.color = '#475569';
        footer.style.fontSize = '13px';
      }
    },
  });

  return canvas.toDataURL('image/png');
};
