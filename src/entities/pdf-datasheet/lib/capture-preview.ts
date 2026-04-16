import html2canvas from 'html2canvas';

export const capturePreview = async (previewElement: HTMLElement) => {
  const canvas = await html2canvas(previewElement, {
    backgroundColor: '#ffffff',
    scale: 2,
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

      const badgesContainer = clonedDocument.querySelector('[data-preview-badges]');
      if (badgesContainer instanceof HTMLElement) {
        badgesContainer.style.maxWidth = '82%';
        badgesContainer.style.bottom = '24px';
        badgesContainer.style.left = '24px';
      }

      clonedDocument.querySelectorAll('[data-preview-badges] [data-tone]').forEach((node) => {
        if (!(node instanceof HTMLElement)) {
          return;
        }

        const tone = node.getAttribute('data-tone');
        node.style.fontSize = '11px';
        node.style.fontWeight = '800';
        node.style.letterSpacing = '0.12em';
        node.style.padding = '6px 12px';
        node.style.boxShadow = 'none';

        if (tone === 'accent') {
          node.style.color = '#9a3412';
          node.style.background = '#ffedd5';
          node.style.border = '1px solid #fdba74';
          return;
        }

        if (tone === 'info') {
          node.style.color = '#0f172a';
          node.style.background = '#e0f2fe';
          node.style.border = '1px solid #7dd3fc';
          return;
        }

        if (tone === 'warning') {
          node.style.color = '#78350f';
          node.style.background = '#fef3c7';
          node.style.border = '1px solid #fcd34d';
          return;
        }

        node.style.color = '#1e293b';
        node.style.background = '#f8fafc';
        node.style.border = '1px solid #cbd5e1';
      });

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

  return canvas.toDataURL('image/jpeg', 0.92);
};
