let cards; 
let controller = new AbortController(); 

function attachListeners() {
  controller.abort(); 
  controller = new AbortController(); 

  cards = document.querySelectorAll(`a[href*=".devfolio.co"]`);
  cards.forEach(card => {
    card.addEventListener("mouseenter", () => {
      chrome.runtime.sendMessage(
        { type: 'FETCH_HACKATHON', url: card.href },
        (response) => {
          console.log("city:", response.city);
        }
      );
      console.log("hovered:", card.href);
    }, { signal: controller.signal });
  });
}

const observer = new MutationObserver(() => {
  attachListeners(); 
})

observer.observe(document.querySelector("main"), {childList:true});

attachListeners(); 

console.log(cards)

