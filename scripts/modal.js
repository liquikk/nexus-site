export function init() {
    const DOM = {
      menu: document.getElementById('menu'),
      dikidiLink: document.getElementById('dikidiLink')
    };
  
    function toggleMenu(open) {
      DOM.menu.classList.toggle('active', open);
      document.documentElement.classList.toggle('modal-open', open);
      document.body.classList.toggle('modal-open', open);
    }
  
    document.body.addEventListener('click', (e) => {
      if (e.target.closest('.open-booking')) {
        DOM.dikidiLink.click();
        document.documentElement.classList.add('modal-open');
      }
      if (e.target.closest('.burger-menu')) toggleMenu(true);
      if (e.target.closest('.menu-list-item-link') || e.target.closest('#close-menu')) {
        toggleMenu(false);
      }
    });
  
    setInterval(() => {
      const iframe = document.querySelector('iframe[src*="dikidi.ru"]');
      const shouldLock = (iframe && getComputedStyle(iframe).display !== 'none') || DOM.menu.classList.contains('active');
      
      document.documentElement.classList.toggle('modal-open', shouldLock);
      document.body.classList.toggle('modal-open', shouldLock);
    }, 300);
  
    console.log('Modal module initialized');
  }