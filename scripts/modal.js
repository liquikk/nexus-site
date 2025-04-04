document.addEventListener('DOMContentLoaded', function() {
    const openBookingBtn = document.querySelectorAll('.open-booking');
    const Overlay = document.getElementById('overlay');
    const closeBookingBtn = document.getElementById('close-booking');
    const bookingWindow = document.getElementById('booking-window');
    const bookingInput = document.getElementById('phone-booking-form')

    openBookingBtn.forEach(button => {
        button.addEventListener('click', function() {
            bookingWindow.classList.add('active'); 
            Overlay.classList.add('active'); 
            document.documentElement.classList.add('modal-open');
            document.body.classList.add('modal-open');
        });
    });

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            bookingWindow.classList.remove('active');
            Overlay.classList.remove('active');
            bookingInput.value = '';
            document.documentElement.classList.remove('modal-open');
            document.body.classList.remove('modal-open');
        }
    });

    // Закрытие модального окна при клике на крестик
    closeBookingBtn.addEventListener('click', function() {
        bookingWindow.classList.remove('active');
        Overlay.classList.remove('active');
        bookingInput.value = '';
        document.documentElement.classList.remove('modal-open');
        document.body.classList.remove('modal-open');
    });

    // Закрытие модального окна при клике вне его области
    Overlay.addEventListener('click', function(event) {
        if (event.target === Overlay) {
            bookingWindow.classList.remove('active');
            Overlay.classList.remove('active');
            bookingInput.value = '';
            document.documentElement.classList.remove('modal-open');
            document.body.classList.remove('modal-open');
        }
    });
});