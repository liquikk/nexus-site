export function init() {
  const header = document.querySelector('.header-second');
  const target = document.querySelector('.full-scroll');
  if (!header || !target) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        header.classList.toggle('active', !entry.isIntersecting);
      });
    },
    { threshold: 0.01 }
  );

  observer.observe(target);
  console.log('Header module initialized');
}