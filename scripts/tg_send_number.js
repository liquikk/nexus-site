document.querySelector(".form-cta1").addEventListener("submit", function(e) {
    e.preventDefault();
    const phone = document.getElementById("phone-cta1").value;
    
    // Отправка в Telegram
    fetch(`https://api.telegram.org/bot8046009815:AAHtMlpS9BvKnm5jOgX3FKbI3EQq84Rh-F0/sendMessage?chat_id=-4611993402&parse_mode=html&text=${encodeURIComponent('<b>📞 Новая заявка:</b>\n+7 ' + phone)}`)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Успешно!",
          text: "Мы скоро вам перезвоним",
          background: "#2E2C2D",
          color: "#fff",
          backdrop: "rgba(0,0,123,0.4)",
          });
        document.getElementById("phone-cta1").value = ""; // Очистка поля
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Ой...",
          text: "Что-то пошло не так(",
        });
      });
  });