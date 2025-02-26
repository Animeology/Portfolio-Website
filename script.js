document.addEventListener('DOMContentLoaded', () => {
  const hiddenSkills = document.querySelectorAll('.hidden-skill');

  // Set initial positions for hidden skills based on data attributes
  hiddenSkills.forEach((skill) => {
    const bottom = skill.getAttribute('data-bottom');
    const left = skill.getAttribute('data-left');

    skill.style.bottom = bottom;
    skill.style.left = left;

    skill.style.visibility = 'hidden';
    skill.style.opacity = '0';
  });

  // Flashlight effect & hidden skill visibility logic
  document.addEventListener('mousemove', (e) => {
    const flashlightX = e.clientX;
    const flashlightY = e.clientY;
    const flashlightRadius = 100; // Match the flashlight size in CSS

    // Update CSS variables for the flashlight effect
    document.documentElement.style.setProperty('--x', `${flashlightX}px`);
    document.documentElement.style.setProperty('--y', `${flashlightY}px`);

    // Adjust hidden skill visibility based on distance from the flashlight center
    hiddenSkills.forEach((skill) => {
      const rect = skill.getBoundingClientRect();
      const skillX = rect.left + rect.width / 2;
      const skillY = rect.top + rect.height / 2;

      const distance = Math.sqrt(
        Math.pow(skillX - flashlightX, 2) + Math.pow(skillY - flashlightY, 2)
      );

      // Adjust opacity based on distance (fade in/out effect)
      if (distance < flashlightRadius * 1.2) {
        let opacity = 1 - (distance / (flashlightRadius * 1.2)); // Scale opacity based on distance
        skill.style.opacity = Math.max(opacity, 0); // Ensure opacity doesn't go below 0
        skill.style.visibility = 'visible';
      } else {
        skill.style.opacity = 0; // Fully hide if out of range
        skill.style.visibility = 'hidden';
      }
    });
  });

  // Image hover effect for LinkedIn & GitHub swap
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
});

// Email Form
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("contact-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    const response = await fetch("https://formspree.io/f/{your-form-id}", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    const statusMessage = document.getElementById("form-status");
    if (response.ok) {
      statusMessage.textContent = "Message sent successfully!";
      this.reset();
    } else {
      statusMessage.textContent = "Oops! Something went wrong.";
    }
  });
});

// RSS Feed
document.addEventListener("DOMContentLoaded", function () {
  const rssFeedUrl = "https://rss.app/feeds/DaR8bkbeVvxPcQbO.xml";
  const feedContainer = document.getElementById("rss-feed");

  async function fetchRSS() {
    try {
      const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssFeedUrl)}`);
      const data = await response.json();

      if (data.items) {
        data.items.slice(0, 5).forEach(post => { // Show latest 5 posts
          const postElement = document.createElement("div");
          postElement.classList.add("rss-post");

          // Extract image from 'enclosure' or 'description'
          let imageUrl = post.enclosure?.link || "";
          if (!imageUrl) {
            // Try extracting image from description (sometimes LinkedIn includes them here)
            const imgMatch = post.description.match(/<img[^>]+src="([^">]+)"/);
            if (imgMatch) {
              imageUrl = imgMatch[1];
            }
          }

          postElement.innerHTML = `
            ${imageUrl ? `<img src="${imageUrl}" alt="LinkedIn Post Image" class="rss-image">` : ""}
            <h3><a href="${post.link}" target="_blank">${post.title}</a></h3>
            <p>${post.description.replace(/<img[^>]*>/g, "").substring(0, 150)}...</p>
            <hr>
          `;
          feedContainer.appendChild(postElement);
        });
      } else {
        feedContainer.innerHTML = "<p>No recent posts available.</p>";
      }
    } catch (error) {
      feedContainer.innerHTML = "<p>Failed to load LinkedIn posts.</p>";
      console.error("Error fetching RSS feed:", error);
    }
  }

  fetchRSS();
});
