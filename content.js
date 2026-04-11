const cards = document.querySelectorAll(`a[href*=".devfolio.co"]`); 

cards.forEach(card => {
  card.addEventListener("mouseenter", () => {
    chrome.runtime.sendMessage(
      {type: 'FETCH_HACKATHON', url: card.href}, 
      (response) => {
        console.log(response)
      }
    )
    console.log("hovered:", card.href)
  })
})
console.log(cards)

