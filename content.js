let cards;

function attachCities() {
  cards = document.querySelectorAll(`a[href*=".devfolio.co"]`);
  cards.forEach(card => {
    chrome.runtime.sendMessage(
      { type: 'FETCH_HACKATHON', url: card.href },
      (response) => {
        card.title = response.city;
      }
    );
  });
}

const observer = new MutationObserver(() => {
  attachCities();
})

observer.observe(document.querySelector("main"), { childList: true });

attachCities();

console.log(cards)

