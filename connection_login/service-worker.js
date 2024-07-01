chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    alert("service-worker")
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request)
      sendResponse({title: request.title});
  }
);