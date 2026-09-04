can you add a total visitor counter at the bottom of the   <main class="container">

I am concerned about it though, will itcount the users who just load the website? or stay for a while to actually visit the website?

is there a way to show the counter count as a number and not as an image?

```js
    <!-- Delayed Visitor Counter (Text Based) -->
    <div id="visitor-counter-container"
      style="text-align: center; margin-top: 1rem; min-height: 28px; color: var(--text-content); font-size: 0.9rem;">
      <span id="visitor-badge"
        style="display: inline-block; padding: 4px 12px; background-color: var(--secondary-color); border: 1px solid var(--border-color); border-radius: 12px; opacity: 0; transition: opacity 0.5s ease-in;">
        <i class="fas fa-eye" style="color: var(--accent-color); margin-right: 5px;"></i> <span
          id="visitor-count-text">Loading visits...</span>
      </span>
    </div>
    <script>
      // Load the hit counter after a 10-second delay 
      // This prevents counting users who immediately bounce/close the website
      setTimeout(async () => {
        const badge = document.getElementById('visitor-badge');
        const countTextElement = document.getElementById('visitor-count-text');

        if (badge && countTextElement) {
          try {
            // Using a free JSON API for visitor counting to display as text
            const response = await fetch("https://api.counterapi.dev/v1/b1tacad/visits/up");
            const data = await response.json();

            // Format number neatly (e.g. 1,234)
            const formattedCount = Number(data.count).toLocaleString();
            countTextElement.textContent = `Total Visits: ${formattedCount}`;

            // Fade in the badge
            badge.style.opacity = '1';
          } catch (error) {
            countTextElement.textContent = "Visits unavailable";
            badge.style.opacity = '1';
            console.error("Failed to fetch visitor count:", error);
          }
        }
      }, 60000);
        </script>
```