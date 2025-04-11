document.addEventListener("DOMContentLoaded", function () {
    let fullScrollSection = document.querySelector(".full-scroll");
    let aboutSection = document.querySelector("#about");
    let isAnimating = false;
    let hasScrolledDown = false;

    
    function scrollToSection(targetSection) {
        if (isAnimating) return;
        isAnimating = true;
    
        document.body.style.overflowY = 'hidden';
    
        targetSection.scrollIntoView({ behavior: "smooth" });

        setTimeout(() => {
            document.body.style.overflowY = '';
            isAnimating = false;
        }, 100);
    }

    window.addEventListener("wheel", function (event) {
        let isActive = this.document.body.classList.contains('active');
        if (isAnimating || !fullScrollSection || !aboutSection || isActive) return;

        let rect = fullScrollSection.getBoundingClientRect();
        let viewportHeight = window.innerHeight;

        // Скролл вниз 
        if (event.deltaY > 0 && !hasScrolledDown && rect.top < viewportHeight * 1.5 && rect.bottom > 0) {
            event.preventDefault();
            hasScrolledDown = true;
            scrollToSection(aboutSection);
            
        }

        // Скролл вверх — если зашли на full-scroll сверху
        else if (event.deltaY < 0 && rect.top > -viewportHeight * 1.2 && rect.top < 0) {
            event.preventDefault();
            hasScrolledDown = false;
            scrollToSection(document.body);
            
        }
    }, { passive: false });
});
