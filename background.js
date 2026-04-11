chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if(message.type === 'FETCH_HACKATHON') {
    fetch(message.url)
    .then(res => res.text())
    .then(html => sendResponse({html}))
    .catch(err => sendResponse({error:err.message}))
    return true 
  }
})