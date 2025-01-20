const img = document.getElementById("hover-image");

if (img) {
  img.addEventListener("mouseover", () => {
    img.style.opacity = 0;
    setTimeout(() => {
      img.src = "images/linkedin.png";
      img.style.opacity = 1;
    }, 300);
  });

  img.addEventListener("mouseout", () => {
    img.style.opacity = 0;
    setTimeout(() => {
      img.src = "images/github.png";
      img.style.opacity = 1;
    }, 300);
  });
} else {
  console.error('Error: "hover-image" element not found.');
}


document.addEventListener("mousemove", (e) => {
  const x = e.clientX;
  const y = e.clientY;

  document.documentElement.style.setProperty("--x", `${x}px`);
  document.documentElement.style.setProperty("--y", `${y}px`);
});

document.addEventListener('DOMContentLoaded', () => {
  const hiddenElements = document.querySelector('.hidden-content', '.hidden-skill');

  if (hiddenElements) {
    document.addEventListener('mousemove', (e) => {
      const rect = hiddenElements.getBoundingClientRect();
      const contentCenterX = rect.left + rect.width / 2;
      const contentCenterY = rect.top + rect.height / 2;

      const distance = Math.sqrt(
        Math.pow(e.clientX - contentCenterX, 2) + Math.pow(e.clientY - contentCenterY, 2)
      );

      const threshold = 150; // Distance threshold in pixels

      if (distance < threshold) {
        hiddenElements.style.visibility = 'visible';
        hiddenElements.style.opacity = '1';
      } else {
        hiddenElements.style.visibility = 'hidden';
        hiddenElements.style.opacity = '0';
      }
    });
  } else {
    console.error('Error: No hidden-content element not found!');
  }
});
