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

// Select the button element
const changeBgButton = document.querySelector('.exposed-button');
const aboutContainer = document.querySelector('.about-container');
const header = document.querySelector('.about-header');
const bottomText = document.querySelector('.bottom-text');
const hiddenSkills = document.querySelectorAll('.hidden-skill');

let isBackgroundBlack = false; // Track whether the background is black

// Function to handle the mouse movement for hidden-skill visibility
const handleMouseMovement = (e) => {
  hiddenSkills.forEach((element) => {
    const rect = element.getBoundingClientRect();
    const contentCenterX = rect.left + rect.width / 2;
    const contentCenterY = rect.top + rect.height / 2;

    const distance = Math.sqrt(
      Math.pow(e.clientX - contentCenterX, 2) + Math.pow(e.clientY - contentCenterY, 2)
    );

    const threshold = 75; // Distance threshold in pixels

    if (distance < threshold) {
      element.style.visibility = 'visible';
      element.style.opacity = '1';
    } else {
      element.style.visibility = 'hidden';
      element.style.opacity = '0';
    }
  });
};

// Toggle background color and manage .hidden-skill visibility
changeBgButton.addEventListener('click', () => {
  isBackgroundBlack = !isBackgroundBlack; // Toggle background state

  const htmlElement = document.documentElement;

  if (isBackgroundBlack) {
    // Change background to black and adjust text color
    aboutContainer.style.color = 'white';
    header.style.color = 'white';
    bottomText.style.color = 'white';

    htmlElement.style.background = 'black'; // Set background to black
    htmlElement.style.backgroundSize = ''; // Reset background size
    htmlElement.style.animation = ''; // Stop animation

    changeBgButton.textContent = 'Go Back'; // Change button text when in black mode

    // Disable mouseover proximity logic by removing the event listener
    document.removeEventListener('mousemove', handleMouseMovement);
    
    // Enable hidden-skill visibility
    hiddenSkills.forEach((skill) => {
      skill.style.visibility = 'hidden';
      skill.style.opacity = '0';
    });

  } else {
    // Revert to the previous background state and text color
    aboutContainer.style.color = 'black';
    header.style.color = 'black';
    bottomText.style.color = 'black';

    htmlElement.style.removeProperty('background'); // Revert to custom background
    htmlElement.style.removeProperty('background-size');
    htmlElement.style.removeProperty('animation');

    changeBgButton.textContent = 'Click and Explore'; // Revert button text

    // Hide hidden-skill elements
    hiddenSkills.forEach((skill) => {
      skill.style.visibility = 'hidden';
      skill.style.opacity = '0';
    });

    // Re-enable mouseover proximity behavior by adding the event listener again
    document.addEventListener('mousemove', handleMouseMovement);
  }
});
