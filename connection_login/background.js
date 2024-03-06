// background.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(sender.tab ?
        "from a content script:" + sender.tab.url :
        "from the extension");
    sendResponse({
        phone: request.phone,
        age: request.age,
        city: request.city,
        job: request.job,
        name: request.name
    })
})