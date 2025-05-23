fetch("https://valorant-api.com/v1/playertitles")
  .then(res => res.json())
  .then(data => {
    const titles = data.data; // Extract titles data from the API response
    const container = document.getElementById("title-container");
    const searchInput = document.getElementById("titleSearch");

    // Function to display titles
    function displayTitles(filteredTitles) {
      container.innerHTML = ""; // Clear any previous titles
      if (filteredTitles.length === 0) {
        container.innerHTML = "<p class='text-danger'>No titles found.</p>";
      }
      filteredTitles.forEach(title => {
        // Debugging: Check what titles are being looped through
        console.log('Displaying title:', title);

        // Check for valid title
        if (title && title.displayName && title.displayName.trim() !== "") {
          container.innerHTML += `
            <div class="col-6 col-md-4 col-lg-3">
              <div class="title-card text-center p-3">
                ${title.displayName}
              </div>
            </div>
          `;
        }
      });
    }

    // Initially display all titles
    displayTitles(titles);

    // Search functionality for filtering titles (dynamically as user types)
    searchInput.addEventListener("input", () => {
      const query = searchInput.value.trim().toLowerCase(); // Get the search query
      const filteredTitles = titles.filter(title => 
        title.displayName && title.displayName.toLowerCase().startsWith(query) // Exact match for the starting letters
      );
      displayTitles(filteredTitles); // Display filtered titles dynamically
    });
  })
  .catch(err => {
    const container = document.getElementById("title-container");
    container.innerHTML = "<p class='text-danger'>Failed to load player titles.</p>";
    console.error("API Error:", err);
  });

// Scroll to top functionality
document.getElementById("scrollToTopBtn").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
