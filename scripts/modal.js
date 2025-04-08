document.addEventListener('DOMContentLoaded', function() {
    const openBookingBtn = document.querySelectorAll('.open-booking');
    const Overlay = document.getElementById('overlay');
    const closeBookingBtn = document.getElementById('close-booking');
    const bookingWindow = document.getElementById('booking-window');
    const bookingInput = document.getElementById('phone-booking-form');
    const burgerMenu = document.querySelectorAll('.burger-menu');
    const Menu = document.getElementById('menu');
    const closeBurgerMenu = document.getElementById('close-menu');
    const menuLink = document.querySelectorAll('.menu-list-item-link')
   
    openBookingBtn.forEach(button => {
        button.addEventListener('click', function() {
            bookingWindow.classList.add('active'); 
            Overlay.classList.add('active'); 
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
    
    closeBurgerMenu.addEventListener('click', function() {
        closeMenu();
    });

    function closeMenu() {
        Menu.classList.remove('active');
        document.documentElement.classList.remove('modal-open');
        document.body.classList.remove('modal-open');
    };

    function closeBooking() {
        bookingWindow.classList.remove('active');
        Overlay.classList.remove('active');
        bookingInput.value = '';
        let isMenuOpen = Menu.classList.contains('active')
        if (isMenuOpen) return;
        else{
            document.documentElement.classList.remove('modal-open');
            document.body.classList.remove('modal-open');
        }
    };

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeBooking();
        }
    });

    closeBookingBtn.addEventListener('click', closeBooking);

    Overlay.addEventListener('click', function(event) {
        if (event.target === Overlay) {
            closeBooking();
        }
    });

    menuLink.forEach(link => {
        link.addEventListener('click', function() {
            closeMenu();
        })
    });
});