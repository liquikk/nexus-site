export function init() {
  const form = document.querySelector(".form-cta1");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const phone = document.getElementById("phone-cta1").value;

    try {
      await fetch(`https://api.telegram.org/bot8046009815:AAHtMlpS9BvKnm5jOgX3FKbI3EQq84Rh-F0/sendMessage?chat_id=-4611993402&parse_mode=html&text=${encodeURIComponent(`<b>📞 Новая заявка:</b>\n+7 ${phone}`)}`);
      
      if (window.Swal) {
        Swal.fire({
          icon: "success",
          title: "Успешно!",
          text: "Мы скоро вам перезвоним",
          background: "#2E2C2D",
          color: "#fff",
          backdrop: "rgba(0, 0, 0, 0.8)",
        });
      }
      form.reset();
    } catch (error) {
      console.error('Telegram send error:', error);
      if (window.Swal) {
        Swal.fire({
          icon: "error",
          title: "Ой...",
          text: "Что-то пошло не так",
          backdrop: "rgba(0, 0, 0, 0.8)",
        });
      }
    }
  });

  console.log('Telegram module initialized');
}