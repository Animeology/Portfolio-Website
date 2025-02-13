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

  document.documentElement.style.setProperty('--x', `${x}px`);
  document.documentElement.style.setProperty('--y', `${y}px`);
});

document.addEventListener('DOMContentLoaded', () => {
  const hiddenElements = document.querySelectorAll('.hidden-skill');

  if (hiddenElements.length > 0) {
    document.addEventListener('mousemove', (e) => {
      hiddenElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const contentCenterX = rect.left + rect.width / 2;
        const contentCenterY = rect.top + rect.height / 2;

        const distance = Math.sqrt(
          Math.pow(e.clientX - contentCenterX, 2) + Math.pow(e.clientY - contentCenterY, 2)
        );

        const threshold = 75; // Distance threshold in pixels

        if (isBackgroundBlack && distance < threshold) {
          element.style.visibility = 'visible';
          element.style.opacity = '1';
        } else {
          element.style.visibility = 'hidden';
          element.style.opacity = '0';
        }
      });
    });
  } else {
    console.error('Error: No hidden elements (hidden-content or hidden-skill) found!');
  }
});

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
});

const changeBgButton = document.querySelector('.exposed-button');
const aboutContainer = document.querySelector('.about-container');
const header = document.querySelector('.about-header');
const bottomText = document.querySelector('.bottom-text');
const hiddenSkills = document.querySelectorAll('.hidden-skill');
const flashlight = document.querySelector('.flashlight');

let isBackgroundBlack = false; // Track whether the background is black
let flashlightEnabled = false; // Track if flashlight is active

// Function to toggle background and flashlight effect
changeBgButton.addEventListener('click', () => {
  isBackgroundBlack = !isBackgroundBlack; // Toggle background state
  flashlightEnabled = isBackgroundBlack;  // Sync flashlight with background

  if (isBackgroundBlack) {
    // Change background to black and adjust text color
    document.documentElement.style.background = 'black';
    aboutContainer.style.color = 'white';
    header.style.color = 'white';
    bottomText.style.color = 'white';

    // Activate flashlight effect
    flashlight.style.opacity = '1';

    changeBgButton.textContent = 'Go Back';

    // Hide hidden skills initially
    hiddenSkills.forEach((skill) => {
      skill.style.visibility = 'hidden';
      skill.style.opacity = '0';
    });

  } else {
    // Revert to original background and text colors
    document.documentElement.style.removeProperty('background');
    aboutContainer.style.color = 'black';
    header.style.color = 'black';
    bottomText.style.color = 'black';

    // Deactivate flashlight effect
    flashlight.style.opacity = '0';

    changeBgButton.textContent = 'Click and Explore';
  }
});

// Ensure flashlight follows cursor only when enabled
document.addEventListener('mousemove', (e) => {
  if (flashlightEnabled) {
    document.documentElement.style.setProperty('--x', `${e.clientX}px`);
    document.documentElement.style.setProperty('--y', `${e.clientY}px`);
  }
});
