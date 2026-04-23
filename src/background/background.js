let tabRequests = {};

chrome.webRequest.onCompleted.addListener(
  (details) => {
    const tabId = details.tabId;

    if (tabId < 0) return;

    if (!tabRequests[tabId]) {
      tabRequests[tabId] = [];
    }

    tabRequests[tabId].push(details.url);
  },
  { urls: ["<all_urls>"] }
);
chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.status === "loading") {
    tabRequests[tabId] = [];
  }
});

chrome.tabs.onRemoved.addListener((tabId) => {
  delete tabRequests[tabId];
});


chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "GET_REQUESTS") {
    sendResponse({
      requests: tabRequests[msg.tabId] || []
    });
    return true;
  }
});