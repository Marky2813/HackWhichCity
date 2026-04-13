chrome.runtime.onMessage.addListener((message, sender, sendResponse ) => {
  if(message.type === "parse-html") {
    const parser = new DOMParser(); 
    const doc = parser.parseFromString(message.html, "text/html"); 
    const elements = doc.querySelectorAll(".fXnLdT")[1].textContent; 
    sendResponse({ result:  elements})
  }
})