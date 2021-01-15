chrome.tabs.onUpdated.addListener(function (tabId, change, tab) {
  let visitingURL = tab.url;
  chrome.history.search({ text: tab.title }, function (result) {
    result.forEach((page) => {
      if (page.url == visitingURL) {
        if (page.visitCount == 1) return false; // first time visiting
        let count = page.visitCount.toString();
        if (count > 10000) count = ':D';
        chrome.browserAction.setIcon({ path: 'images/blue-64.png', tabId: tabId });
        chrome.browserAction.setBadgeText({ text: count, tabId: tabId });
        return;
      }
    });
  });
});
