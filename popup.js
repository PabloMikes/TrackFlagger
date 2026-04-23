import { detectTrackers } from "./src/engine/trackerDetector.js";
import { calculateScore } from "./src/engine/scoreCalculator.js";

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const tabId = tabs[0].id;

  chrome.runtime.sendMessage(
    { type: "GET_REQUESTS", tabId },
    (response) => {
      if (!response) {
        document.getElementById("score").innerText = "No data";
        return;
      }

      const trackers = detectTrackers(response.requests);
      const score = calculateScore({ trackers });

      document.getElementById("score").innerText =
        "Privacy Score: " + score;

      document.getElementById("trackers").innerText =
        trackers.length > 0
          ? trackers.join(", ")
          : "No trackers detected";
    }
  );
});