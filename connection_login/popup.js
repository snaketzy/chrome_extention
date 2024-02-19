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
  const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
  const response = await chrome.tabs.sendMessage(tab.id, {greeting: "hello"});
  // do something with response here, not outside the function
  //  alert(response.farewell)
  setChildTextNode("resultsRequest", response.farewell);
  fetchData()
}

const fetchData = async () => {
  const res = await fetch("https://prerecruit.viphrm.com/roster/weizhi/moa/company/list/%E6%B5%8B%E8%AF%95%E6%95%B0%E6%8D%AE%E6%9D%83%E9%99%90%E5%AE%A2%E6%88%B7",{
    method:"post"
  });
  const response = await res.json();

  return alert(response.data.records[0].name)
}


(function(){
  document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('#testMessage').addEventListener(
        'click', testMessage);
  });
})();
