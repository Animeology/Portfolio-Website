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
  const hiddenElements = document.querySelectorAll('.hidden-content, .hidden-skill'); // Select both classes

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

        if (distance < threshold) {
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
  });
});

// Select the button element
const changeBgButton = document.querySelector('.exposed-button');
const aboutContainer = document.querySelector('.about-container');
const header = document.querySelector('.about-header');
const bottomText = document.querySelector('.bottom-text');

changeBgButton.addEventListener('click', () => {
  const htmlElement = document.documentElement;

  // Check the current background color
  if (htmlElement.style.backgroundColor === 'black') {
    // If it's black, change it to the custom background
    aboutContainer.style.color = 'black'; // Adjust text color back to black
    header.style.color = 'black';
    bottomText.style.color = 'black';

    htmlElement.style.removeProperty('background');  // Revert to custom background
    htmlElement.style.removeProperty('background-size');
    htmlElement.style.removeProperty('animation');

    // Remove any inline styles applied to the button
    changeBgButton.style.removeProperty('background-color');
    changeBgButton.style.removeProperty('color');
    changeBgButton.style.removeProperty('border-radius');
    changeBgButton.style.removeProperty('border');

    changeBgButton.textContent = 'Click and Explore'; // Revert to original button text
  } else {
    // If it's not black, change it to black
    aboutContainer.style.color = 'white'; // Adjust text color to white
    header.style.color = 'white';
    bottomText.style.color = 'white';

    htmlElement.style.background = 'black'; // Set background to black
    htmlElement.style.backgroundSize = ''; // Reset background size
    htmlElement.style.animation = ''; // Stop animation
    
    changeBgButton.classList.add('button');
    changeBgButton.textContent = 'Go Back'; // Change button text when in black mode
  }
});



