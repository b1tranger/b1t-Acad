/**
 * Archived Feature: Glitch Transition & Bengali Brand Name Swap
 * Original Location: index.html:L2281-L2353
 * Date Archived: 17.09.26
 *
 * Description:
 * First-time visit effect tracked via cookies ('gaus_website_effect_run').
 * 3 seconds after load, initiates a glitch transition, changes the header
 * into "Gaus এর Website" and subtext into "বড়ভাইরা এ নামে ভালো চিনে আরকি",
 * holds for 10 seconds, then triggers a second glitch to revert back to
 * "b1t Academics" / "Unofficial Resources Archiver for UITS".
 */

// Helper function to read a cookie
function getCookie(name) {
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

// Helper function to set a cookie
function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie =
    name + "=" + (value || "") + expires + "; path=/; SameSite=Lax";
}

function updateStatus(text) {
  const statusEl = document.getElementById("status-indicator");
  if (statusEl) statusEl.textContent = text;
}

// Core glitch animation and text swap routine
function runGlitchEffect() {
  const heading = document.getElementById("main-logo-heading");
  const subtext = document.getElementById("main-logo-subtext");

  if (!heading || !subtext) return;

  updateStatus("Waiting 3s before trigger...");

  // Stay 3s after load before triggering
  setTimeout(() => {
    updateStatus("Glitch 1: Swapping to 'Gaus এর Website'...");

    // Step 1: Trigger the glitch transition
    heading.classList.add("glitch-active");
    subtext.classList.add("glitch-active");

    // Set cookie so it won't run again on subsequent visits
    setCookie("gaus_website_effect_run", "true", 365);

    // Step 2: Swap the text midway through the glitch (at 220ms, when opacity is 0)
    setTimeout(() => {
      heading.textContent = "Gaus এর Website";
      subtext.innerHTML = "বড়ভাইরা এ নামে ভালো চিনে আরকি";
    }, 220);

    // Step 3: Remove the glitch class after animation completes (600ms)
    setTimeout(() => {
      heading.classList.remove("glitch-active");
      subtext.classList.remove("glitch-active");
      updateStatus("Displaying changed text (10s duration)...");
    }, 600);

    // Step 4: Revert back after 10s of displaying the changed text (10s from now)
    setTimeout(() => {
      updateStatus("Glitch 2: Reverting to 'b1t Academics'...");

      // Trigger glitch again for the revert
      heading.classList.add("glitch-active");
      subtext.classList.add("glitch-active");

      // Swap back to original text midway through the glitch (at 220ms)
      setTimeout(() => {
        heading.textContent = "b1t Academics";
        subtext.innerHTML = "Unofficial Resources Archiver<br>for UITS";
      }, 220);

      // Remove the glitch class after animation completes
      setTimeout(() => {
        heading.classList.remove("glitch-active");
        subtext.classList.remove("glitch-active");
        updateStatus("Completed. Reverted to default.");
      }, 600);
    }, 10000); // 10 seconds of swap state
  }, 3000); // 3 seconds delay after page load
}

// Reset cookie and re-execute (for testing convenience)
function resetAndReplay() {
  // Clear the cookie
  document.cookie =
    "gaus_website_effect_run=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  
  // Reset text
  const heading = document.getElementById("main-logo-heading");
  const subtext = document.getElementById("main-logo-subtext");
  if (heading) heading.textContent = "b1t Academics";
  if (subtext) subtext.innerHTML = "Unofficial Resources Archiver<br>for UITS";

  // Run effect
  runGlitchEffect();
}

// Execution initialization
document.addEventListener("DOMContentLoaded", () => {
  // Check if the effect has already run
  if (!getCookie("gaus_website_effect_run")) {
    runGlitchEffect();
  } else {
    updateStatus("Cookie found (Effect already ran). Click reset to replay.");
  }

  const resetBtn = document.getElementById("btn-reset-cookie");
  if (resetBtn) {
    resetBtn.addEventListener("click", resetAndReplay);
  }
});
