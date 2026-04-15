const TRACKERS = [
  "google-analytics.com",
  "facebook.net"
];

export function detectTrackers(requests) {
  return requests.filter(req =>
    TRACKERS.some(domain => req.includes(domain))
  );
}