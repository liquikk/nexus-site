document.addEventListener("DOMContentLoaded", () => {
    const circles = document.querySelectorAll(".circle");
    const banner_img = document.querySelector(".banner-img")
    let currentRotation = 0;
    let direction = 1;
    
    circles.forEach(circle => {
        function animateCircle() {
            const deltaX = (Math.random() - 0.5) * 400; // Смещение по X ±20px
            const deltaY = (Math.random() - 0.5) * 800; // Смещение по Y ±20px
            const scale = Math.random() * 0.4 + 0.8; // Рандомное масштабирование 0.8 - 1.2
            
            circle.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(${scale})`;
            setTimeout(animateCircle, 1000 + Math.random() * 1000); // Интервал 1-2 сек
        }

        animateCircle();
    });
    function rotateImage() {
        if (currentRotation >= 7) direction = -1;
        if (currentRotation <= -7) direction = 1;
        currentRotation += direction * 0.05; // Плавное изменение угла
        banner_img.style.transform = `scale(-1, 1) rotate(${currentRotation}deg)`;
        requestAnimationFrame(rotateImage);
    }
    
    rotateImage();
});