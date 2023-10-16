chrome.runtime.onInstalled.addListener(function (details) {
  if (details.reason == 'install') {
    chrome.tabs.create({})
  } else if (details.reason == 'update') {
  }
})
