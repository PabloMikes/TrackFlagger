import { detectTrackers } from "./src/engine/trackerDetector.js";
import { calculateScore } from "./src/engine/scoreCalculator.js";

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const tabId = tabs[0].id;

  chrome.runtime.sendMessage({ type: "GET_REQUESTS", tabId }, (response) => {
    const scoreEl = document.getElementById("score");
    const trackersEl = document.getElementById("trackers");
    const circleEl = document.getElementById("score-circle");

    if (!response) {
      scoreEl.innerText = "N/A";
      trackersEl.innerText = "No data available for this page.";
      return;
    }

    const trackers = detectTrackers(response.requests);
    const score = calculateScore({ trackers });

    scoreEl.innerText = score;
    
    if (score < 50) {
      circleEl.style.borderColor = "var(--accent-danger)";
    } else if (score < 85) {
      circleEl.style.borderColor = "var(--accent-warning)";
    } else {
      circleEl.style.borderColor = "var(--accent-safe)";
    }

    if (trackers.length > 0) {
      trackersEl.innerHTML = trackers
        .map(t => `<span class="tracker-item">${t}</span>`)
        .join("");
    } else {
      trackersEl.innerHTML = `<p style="text-align:center; color: var(--accent-safe);">Clean sheet! No trackers detected.</p>`;
    }
  });
});