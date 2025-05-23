const loading = document.getElementById("loading");
const container = document.getElementById("card-container");
const searchInput = document.getElementById("cardSearch");

loading.style.display = "block";

let cardsData = [];

// Fetch API for Playercards
fetch("https://valorant-api.com/v1/playercards")
  .then(res => res.json())
  .then(data => {
    loading.style.display = "none";
    cardsData = data.data;
    displayCards(cardsData); // Display all cards initially
  })
  .catch(err => {
    loading.textContent = "Failed to load player cards.";
    console.error(err);
  });

// Display the cards
function displayCards(cards) {
  let html = "";
  cards.forEach(card => {
    html += `
      <div class="col-6 col-md-4 col-lg-2">
        <div class="card text-center bg-dark text-white border-0 shadow-sm p-2">
          <img
            src="${card.largeArt}"
            alt="${card.displayName}"
            class="playercard-img mb-2"
          >
          <p class="card-title small">${card.displayName}</p>
        </div>
      </div>
    `;
  });
  container.innerHTML = html;
}

// Search Function
searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim().toLowerCase();

  // Filter the cards based on the search term
  const filtered = cardsData.filter(card =>
    card.displayName.toLowerCase().startsWith(query) // Match names starting with the search term
  );

  // Display filtered cards
  if (query.length === 0) {
    // If search bar is cleared, display all cards again
    displayCards(cardsData);
  } else if (filtered.length > 0) {
    // If there are matching cards, display them
    displayCards(filtered);
  } else {
    // If no matches found, display a message
    container.innerHTML = `<p class="text-muted">No player cards found</p>`;
  }
});

// Scroll to top on click
document.getElementById("scrollToTopBtn").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
