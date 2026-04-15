import { detectTrackers } from "./src/engine/trackerDetector.js";
import { calculateScore } from "./src/engine/scoreCalculator.js";

chrome.runtime.sendMessage({ type: "GET_REQUESTS" }, (response) => {
  const trackers = detectTrackers(response.requests);
  const score = calculateScore({ trackers });

  document.getElementById("score").innerText =
    "Privacy Score: " + score;
});