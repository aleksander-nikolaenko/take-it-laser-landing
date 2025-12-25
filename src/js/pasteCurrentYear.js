export const pasteCurrentYear = () => {
  const yearEl = document.querySelector('[data-copyright-year]');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
};
