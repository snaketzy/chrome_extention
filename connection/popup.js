// chrome.runtime.onMessage.addListener(
//   function(request, sender, sendResponse) {
//     console.log(sender.tab ?
//                 "from a content script:" + sender.tab.url :
//                 "from the extension");
//     if (request.greeting === "hello")
//       sendResponse({farewell: "goodbye"});
//   }
// );


function setChildTextNode(elementId, text) {
  document.getElementById(elementId).innerText = text;
}

// Tests the roundtrip time of sendMessage().
const testMessage = async () => {
  const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
  const response = await chrome.tabs.sendMessage(tab.id, {greeting: "hello"});
  // do something with response here, not outside the function
  //  alert(response.farewell)
  setChildTextNode("resultsRequest", response.farewell);
}


(function(){
  document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('#testMessage').addEventListener(
        'click', testMessage);
  });
})();
