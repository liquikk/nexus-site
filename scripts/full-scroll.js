export function init() {
  const scrollState = {
    isAnimating: false,
    hasScrolledDown: false,
  
    lockScroll() {
      document.documentElement.style.overflowY = 'hidden';
      document.body.style.overflowY = 'hidden';
      this.isAnimating = true;
    },
  
    unlockScroll() {
      document.documentElement.style.overflowY = '';
      document.body.style.overflowY = '';
      this.isAnimating = false;
    },
  
    canScroll() {
      return !this.isAnimating && !document.body.classList.contains('modal-open');
    }
  };

  const scrollToSection = (targetSection) => {
    if (!scrollState.canScroll() || !targetSection) return;
    
    scrollState.lockScroll();
    targetSection.scrollIntoView({ 
      behavior: "smooth",
      block: "start" 
    });
  
    setTimeout(() => scrollState.unlockScroll(), 400);
  };

  const handleWheel = (event) => {
    const fullScrollSection = document.querySelector(".full-scroll");
    const aboutSection = document.querySelector("#about");
    
    if (!scrollState.canScroll() || !fullScrollSection || !aboutSection) return;
    
    const rect = fullScrollSection.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
  
    // Scroll down
    if (event.deltaY > 0 && !scrollState.hasScrolledDown && rect.top < viewportHeight * 1.5) {
      event.preventDefault();
      scrollState.hasScrolledDown = true;
      scrollToSection(aboutSection);
    }
    // Scroll up
    else if (event.deltaY < 0 && rect.top > -viewportHeight * 1.2 && rect.top < 0) {
      event.preventDefault();
      scrollState.hasScrolledDown = false;
      scrollToSection(document.body);
    }
  };

  window.addEventListener("wheel", handleWheel, { passive: false });
  console.log('FullScroll module initialized');
}