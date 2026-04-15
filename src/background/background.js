let requests = [];

chrome.webRequest.onCompleted.addListener(
  (details) => {
    requests.push(details.url);
  },
  { urls: ["<all_urls>"] }
);

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "GET_REQUESTS") {
    sendResponse({ requests });
  }
});