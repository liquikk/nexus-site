export function init() {
  const circles = document.querySelectorAll(".circle");
  const bannerImg = document.querySelector(".banner-img");
  if (!circles.length || !bannerImg) return;

  let currentRotation = 0;
  let direction = 1;

  circles.forEach(circle => {
    const animateCircle = () => {
      const deltaX = (Math.random() - 0.5) * 400;
      const deltaY = (Math.random() - 0.5) * 800;
      const scale = Math.random() * 0.4 + 0.8;
      
      circle.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(${scale})`;
      setTimeout(animateCircle, 1000 + Math.random() * 1000);
    };
    animateCircle();
  });

  const rotateImage = () => {
    if (currentRotation >= 7) direction = -1;
    if (currentRotation <= -7) direction = 1;
    currentRotation += direction * 0.05;
    bannerImg.style.transform = `scale(-1, 1) rotate(${currentRotation}deg)`;
    requestAnimationFrame(rotateImage);
  };
  
  rotateImage();
  console.log('BannerAnimation module initialized');
}