import { detectTrackers } from "./src/engine/trackerDetector.js";
import { calculateScore } from "./src/engine/scoreCalculator.js";

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const tabId = tabs[0].id;

  chrome.runtime.sendMessage(
    { type: "GET_REQUESTS", tabId },
    (response) => {
      document.getElementById("score").innerText =
        "Requests: " + response.requests.length;
    }
  );
});