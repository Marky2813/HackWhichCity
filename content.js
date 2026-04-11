const cards = document.querySelectorAll(`a[href*=".devfolio.co"]`); 

cards.forEach(card => {
  card.addEventListener("mouseenter", () => {
    console.log("hovered:", card.href)
  })
})
console.log(cards)