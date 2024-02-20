// background.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    sendResponse({
        phone: request.phone,
        age: request.age,
        city: request.city,
        job: request.job,
        name: request.name
    })
})