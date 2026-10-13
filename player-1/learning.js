export function setupLearning() {
  const trigger = document.getElementById('enlarge-learning');
  if (!trigger) return;
  const dialog = document.getElementById('learning-dialog');
  const image = document.getElementById('learning-image');
  const zoomImage = document.getElementById('learning-zoom-image');
  trigger.addEventListener('click', () => {
    zoomImage.src = image.src;
    zoomImage.alt = image.alt;
    dialog.showModal();
    document.body.classList.add('modal-open');
  });
  document.getElementById('close-learning').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => {
    document.body.classList.toggle('modal-open', !!document.querySelector('dialog[open]'));
    zoomImage.removeAttribute('src');
    trigger.focus();
  });
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
}
