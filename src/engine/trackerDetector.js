import trackerData from "../data/trackers.json";

export function detectTrackers(requests) {
  const found = [];

  trackerData.trackers.forEach((tracker) => {
    const matched = requests.some((url) =>
      tracker.patterns.some((pattern) =>
        url.includes(pattern)
      )
    );

    if (matched) {
      found.push(tracker.name);
    }
  });

  return found;
}