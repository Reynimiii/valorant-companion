let allWeapons = [];
let filteredWeapons = []; // New array to hold filtered weapons
let searchQuery = ''; // Store the current search query for weapons
let skinSearchQuery = ''; // Store the current search query for skins

// Fetch weapon data from the API
fetch("https://valorant-api.com/v1/weapons")
  .then(res => res.json())
  .then(data => {
    allWeapons = data.data;
    filteredWeapons = allWeapons; // Initially, the filtered list is the same as the full list
    displayWeapons(filteredWeapons); // Display all weapons initially
  })
  .catch(err => console.error(err));

// Function to display weapons
function displayWeapons(weapons) {
  const container = document.getElementById("weapon-container");
  container.innerHTML = ''; // Clear previous results

  weapons.forEach((weapon, index) => {
    container.innerHTML += `
      <div class="col-md-4 mb-4">
        <div class="card h-100 text-center p-3">
          <img src="${weapon.displayIcon}" class="weapon-img mb-2" alt="${weapon.displayName}">
          <h5>${weapon.displayName}</h5>
          <button class="btn btn-sm btn-primary mt-2" onclick="showSkins(${index})">View Skins</button>
        </div>
      </div>
    `;
  });
}

// Function to show skins for a weapon
function showSkins(index) {
  const weapon = filteredWeapons[index]; // Use filteredWeapons instead of allWeapons
  const skins = weapon.skins;

  // Store the index in modal for use in skinSearch
  const skinModal = document.getElementById("skinModal");
  skinModal.setAttribute("data-weapon-index", index);

  // Filter skins based on current query
  const filteredSkins = skins.filter(skin => skin.displayName.toLowerCase().startsWith(skinSearchQuery));

  const skinContainer = document.getElementById("skin-container");
  const modalTitle = document.getElementById("skinModalLabel");

  modalTitle.textContent = `${weapon.displayName} Skins`;
  skinContainer.innerHTML = ''; // Clear any existing skins

  if (filteredSkins.length === 0) {
    skinContainer.innerHTML = '<p class="text-center">No skins found matching your search.</p>';
  } else {
    filteredSkins.forEach(skin => {
      if (skin.displayIcon) {
        skinContainer.innerHTML += `
          <div class="col-md-4 mb-3">
            <div class="card text-center p-2">
              <img src="${skin.displayIcon}" class="skin-img" alt="${skin.displayName}">
              <p class="mt-2">${skin.displayName}</p>
            </div>
          </div>
        `;
      }
    });
  }

  const modal = new bootstrap.Modal(skinModal);
  modal.show(); // Show the modal
}

// Function to filter weapons based on search query (starts with query)
function filterWeapons() {
  searchQuery = document.getElementById("weaponSearch").value.toLowerCase(); // Get the search query

  // Only filter based on weapon names that start with the query
  filteredWeapons = allWeapons.filter(weapon =>
    weapon.displayName.toLowerCase().startsWith(searchQuery)
  );

  displayWeapons(filteredWeapons); // Update the displayed weapons
}


// Function to filter skins based on the skin search query
function filterSkins() {
  skinSearchQuery = document.getElementById("skinSearch").value.toLowerCase();  // Corrected ID
  const skinModal = document.getElementById("skinModal");
  const weaponIndex = parseInt(skinModal.getAttribute("data-weapon-index"));

  if (isNaN(weaponIndex)) return;

  const weapon = filteredWeapons[weaponIndex];
  const skins = weapon.skins;
  const skinContainer = document.getElementById("skin-container");

  // Filter skins based on the search query
  const filteredSkins = skins.filter(skin => skin.displayName.toLowerCase().startsWith(skinSearchQuery));

  skinContainer.innerHTML = ''; // Clear any existing skins

  if (filteredSkins.length === 0) {
    skinContainer.innerHTML = '<p class="text-center">No skins found matching your search.</p>';
  } else {
    filteredSkins.forEach(skin => {
      if (skin.displayIcon) {
        skinContainer.innerHTML += `
          <div class="col-md-4 mb-3">
            <div class="card text-center p-2">
              <img src="${skin.displayIcon}" class="skin-img" alt="${skin.displayName}">
              <p class="mt-2">${skin.displayName}</p>
            </div>
          </div>
        `;
      }
    });
  }
}

// Event listener for weapon search
document.getElementById("weaponSearch").addEventListener("input", filterWeapons);

// Event listener for skin search
document.getElementById("skinSearch").addEventListener("input", filterSkins);

// Scroll to top button
document.getElementById("scrollToTopBtn").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
