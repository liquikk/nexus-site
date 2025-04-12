export function init() {
    const formatPhone = (input) => {
      const numbers = input.value.replace(/\D/g, '');
      const match = numbers.match(/(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
      input.value = !match[1] ? '' : `(${match[1]}${match[2] ? `) ${match[2]}` : ''}${match[3] ? `-${match[3]}` : ''}${match[4] ? `-${match[4]}` : ''}`;
    };
  
    document.querySelectorAll('[name="phone"]').forEach(input => {
      input.addEventListener('input', (e) => formatPhone(e.target));
    });
  
    console.log('PhoneInput module initialized');
  }