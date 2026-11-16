'use strict';
// A imagem continua acessível pelo link quando JavaScript não está disponível.
const imageViewer = document.querySelector('#image-viewer');
const viewerImage = document.querySelector('#image-viewer-image');
const viewerCaption = document.querySelector('#image-viewer-caption');
let imageTrigger = null;
if (typeof imageViewer.showModal === 'function') {
  imageViewer.querySelector('.image-viewer-close').addEventListener('click', () => imageViewer.close());
  imageViewer.addEventListener('cancel', event => {
    event.preventDefault();
    imageViewer.close();
  });
  document.querySelectorAll('.project-card figure a').forEach(link => {
    link.setAttribute('aria-haspopup', 'dialog');
    link.addEventListener('click', event => {
      if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      const thumbnail = link.querySelector('img');
      imageTrigger = link;
      viewerImage.src = link.href;
      viewerImage.alt = thumbnail.alt;
      viewerCaption.textContent = link.closest('figure').querySelector('figcaption')?.textContent || '';
      imageViewer.showModal();
      document.body.classList.add('image-viewer-open');
    });
  });
  imageViewer.addEventListener('click', event => {
    if (event.target !== imageViewer) return;
    imageViewer.close();
  });
  imageViewer.addEventListener('close', () => {
    document.body.classList.remove('image-viewer-open');
    viewerImage.removeAttribute('src');
    imageTrigger?.focus();
  });
}
