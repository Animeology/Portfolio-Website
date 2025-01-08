const img = document.getElementById("hover-image");

img.addEventListener("mouseover", () => {
  img.style.opacity = 0; // Fade out current image
  setTimeout(() => {
    img.src = "images/linkedin.png"; // Swap image after fading out
    img.style.opacity = 1; // Fade in new image
  }, 300); // Wait for the fade-out transition to finish
});

img.addEventListener("mouseout", () => {
  img.style.opacity = 0; // Fade out current image
  setTimeout(() => {
    img.src = "images/github.png"; // Swap back to default image
    img.style.opacity = 1; // Fade in original image
  }, 300);
});
