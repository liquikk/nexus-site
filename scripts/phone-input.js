document.addEventListener('DOMContentLoaded', function() {
    let phoneInputs = document.querySelectorAll('[name="phone"]');
    
    phoneInputs.forEach(input => {
       
        input.addEventListener('input', function (e) {
            // Удаляем все символы, кроме цифр
            let x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
            // Форматируем ввод по шаблону (999) 999-99-99
            e.target.value = !x[1] ? '' : '(' + x[1] + (x[2] ? ') ' + x[2] : '') + (x[3] ? '-' + x[3] : '') + (x[4] ? '-' + x[4] : '');
        });
    });
});
