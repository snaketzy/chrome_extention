// background.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    sendResponse(request.info)
})