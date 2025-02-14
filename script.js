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

document.addEventListener('DOMContentLoaded', () => {
  const hiddenSkills = document.querySelectorAll('.hidden-skill');

  hiddenSkills.forEach((skill) => {
    // Apply the custom positions from data attributes
    const bottom = skill.getAttribute('data-bottom');
    const left = skill.getAttribute('data-left');

    skill.style.bottom = bottom;
    skill.style.left = left;

    skill.style.visibility = 'hidden';
    skill.style.opacity = '0';
  });

  // Mousemove event to reveal skills
  document.addEventListener('mousemove', (e) => {
    hiddenSkills.forEach((element) => {
      const rect = element.getBoundingClientRect();
      const contentCenterX = rect.left + rect.width / 2;
      const contentCenterY = rect.top + rect.height / 2;

      const distance = Math.sqrt(
        Math.pow(e.clientX - contentCenterX, 2) + Math.pow(e.clientY - contentCenterY, 2)
      );

      const threshold = 100; // Increased threshold for better visibility

      if (distance < threshold) {
        element.style.visibility = 'visible';
        element.style.opacity = '1';
      } else {
        element.style.visibility = 'hidden';
        element.style.opacity = '0';
      }
    });
  });
});

// Update flashlight position
document.addEventListener('mousemove', (e) => {
  document.documentElement.style.setProperty('--x', `${e.clientX}px`);
  document.documentElement.style.setProperty('--y', `${e.clientY}px`);
});
