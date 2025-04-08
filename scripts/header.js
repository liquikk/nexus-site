const header = document.querySelector('.header-second');
const target = document.querySelector('.full-scroll');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        header.classList.remove('active');
      } else {
        header.classList.add('active');
      }
    });
  },
  {
    threshold: 0.01 
  }
);

observer.observe(target);