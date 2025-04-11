document.addEventListener('DOMContentLoaded', function() {
    const openBookingBtn = document.querySelectorAll('.open-booking');
    const burgerMenu = document.querySelectorAll('.burger-menu');
    const Menu = document.getElementById('menu');
    const closeBurgerMenu = document.getElementById('close-menu');
    const menuLink = document.querySelectorAll('.menu-list-item-link');
    const dikidiLink = document.getElementById('dikidiLink');
   
    openBookingBtn.forEach(button => {
        button.addEventListener('click', function() {
            dikidiLink.click();
            document.documentElement.classList.add('modal-open');
            document.body.classList.add('modal-open');
        });
    });

    burgerMenu.forEach(button => {
        button.addEventListener('click', function() {
            Menu.classList.add('active'); 
            document.documentElement.classList.add('modal-open');
            document.body.classList.add('modal-open');
        });
    });
    
    function closeMenu() {
        Menu.classList.remove('active');
        document.documentElement.classList.remove('modal-open');
        document.body.classList.remove('modal-open');
    };
    
    closeBurgerMenu.addEventListener('click', function() {
        closeMenu();
    });
    
    menuLink.forEach(link => {
        link.addEventListener('click', function() {
            closeMenu();
        })
    });

    setInterval(() => {
        const iframe = document.querySelector('iframe[src*="dikidi.ru"]');
        if (iframe && getComputedStyle(iframe).display !== 'none') {
            document.body.classList.add('active');
            return
        }
        else{
            document.body.classList.remove('active');
            let isMenuOpen = Menu.classList.contains('active')
            if (isMenuOpen) return
            else{
                document.documentElement.classList.remove('modal-open');
                document.body.classList.remove('modal-open');
        }
        }
      }, 300);
});