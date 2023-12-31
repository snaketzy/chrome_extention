// (async() => {
//   // const response = await chrome.runtime.sendMessage({greeting: "hello"});
//   const response = await chrome.runtime.sendMessage({title: document.title});
//   // do something with response here, not outside the function
//   alert(response.title)
// })();

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.greeting === "hello")
      sendResponse({farewell: document.title});
  }
);