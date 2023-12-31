// content.js
(async () => {
  const response = await chrome.runtime.senMessage({greeting:"hello"});
  debugger
  if(response){
    debugger
  }
})()