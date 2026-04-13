async function ensureOffscreenDocument(html) {
  try {
  const exists = await chrome.offscreen.hasDocument(); 
  if(!exists) {  
  await chrome.offscreen.createDocument({
  url: "offscreen.html", 
  reasons: [chrome.offscreen.Reason.DOM_PARSER], 
  justification: "Parse HTML string using DOMParser"
})
  return html; 
  }
  return html; 
} catch(err) {
  console.log(err); 
}
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'FETCH_HACKATHON') {
    fetch(message.url)
      .then(res => res.text())
      .then(html => {
        console.log("the promise chaining is working")
        return ensureOffscreenDocument(html)
        // const parser = new DOMParser()
        // const doc = parser.parseFromString(html, 'text/html')
        // console.log(doc)
        // const cityEl = doc.querySelector('.fXnLdT')
        // const city = cityEl[1] ? cityEl[1].textContent.trim() : 'Location not found'
        // sendResponse({ cityEl })
      })
      .then(html => {
       return chrome.runtime.sendMessage({
          type:"parse-html", 
          html: html, 
        })
      })
      .then(res => sendResponse({city:res.result}))
      .catch(err => sendResponse({ error: err.message }))
    return true
  }
})

//chrome expects that the listener returns true, so that it knows we will send it the response asynchronously. 