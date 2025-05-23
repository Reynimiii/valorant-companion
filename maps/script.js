const mapContainer = document.getElementById("map-container");
const mapModal = new bootstrap.Modal(document.getElementById("mapModal"));
const mapModalLabel = document.getElementById("mapModalLabel");
const mapDescription = document.getElementById("mapDescription");
const mapImage = document.getElementById("mapImage");
const mapSearchInput = document.getElementById("mapSearch");

//Map Details
const mapDetails = {
  "Haven": {
    description: `
      <strong>Haven</strong><br>
      Callouts used specifically for the Haven map, which has three bomb sites instead of the usual two.
      <ul>
        <li><strong>A-Short:</strong> The pathway leading directly to A site.</li>
        <li><strong>C-Long:</strong> The long corridor that stretches towards C site.</li>
        <li><strong>Garage:</strong> An area that provides a rotational point between C and B sites.</li>
      </ul>
    `,
    image: "../imgs/Map/Haven.WEBP"
  },
  "Ascent":{
    description: `
    <strong>Ascent</strong><br>
    Callouts tailored to Ascent, focusing on its open mid area and several key tactical spots.
    <ul>
    <li><strong>Garden:</strong>Located near B site, providing a pathway from mid.</li>
    <li><strong>Catwalk:</strong>An elevated path connecting mid to A site.</li>
    <li><strong>Pizza:</strong>A small area near mid market.</li>
    </ul>
    `,
    image: "../imgs/Map/Ascent.WEBP"
  },
  "Split":{
    description: `
    <strong>Split</strong><br>
    Callouts for the Split map, emphasizing areas important for controlling mid and vertical spaces.
    <ul>
    <li><strong>Heaven:</strong>An elevated area on A and B sites overlooking the site.</li>
    <li><strong>Ropes:</strong>Connects mid to A Heaven and B Heaven through enclosed rope rooms.</li>
    <li><strong>Vent:</strong>A passage connecting mid to B site.</li>
    </ul>
    `,
    image: "../imgs/Map/Split.WEBP"
  },
  "Fracture":{
    description: `
    <strong>Fracture</strong><br>
    Specific to Fracture, a map known for its horseshoe shape and unique two-sided spawn points.
    <ul>
    <li><strong>Dish:</strong>An area that offers a wide view of the map’s outer region.</li>
    <li><strong>Arcade:</strong> Located near the attacker’s spawn with access to both sites.</li>
    <li><strong>Generator:</strong>Found within B site, providing cover and tactical positioning.</li>
    </ul>
    `,
    image: "../imgs/Map/Fracture.WEBP"
  },
  "Bind":{
    description: `
    <strong>Bind</strong><br>
    Specific to the Bind map, these callouts refer to unique locations and strategies relevant to Bind’s layout.
    <ul>
    <li><strong>Hookah:</strong>A small room leading to the B site that has a window and a doorway.</li>
    <li><strong>Lamps (U-Hall):</strong>A hallway near A site, crucial for site control.</li>
    <li><strong>Teleporter:</strong>There are two teleporters linking opposite sides of the map.</li>
    </ul>
    `,
    image: "../imgs/Map/Bind.WEBP"
  },
  "Breeze":{
    description: `
    <strong>Breeze</strong><br>
    Breeze callouts emphasize open spaces and long sightlines, specific to this tropical map.
    <ul>
    <li><strong>A Hall:</strong>A long corridor leading from the attacker spawn to A site, often a key control point.</li>
    <li><strong>B Main:</strong>The primary entrance to the B site from the attacker spawn, frequently the first point of contention.</li>
    <li><strong>Nest:</strong>An elevated platform near the mid-area, providing a strategic vantage point.</li>
    <li><strong>Elbow:</strong>A curved passage connecting the mid to the B site, essential for rotations.</li>
    </ul>
    `,
    image: "../imgs/Map/Breeze.WEBP"
  },
  "Abyss":{
    description: `
    <strong>Abyss</strong><br>
    Abyss callouts emphasize vertical movement, environmental hazards, and fast rotations.
    <ul>
    <li><strong>A Main:</strong>The primary attacker path into A site, often contested early.</li>
    <li><strong>B Main:</strong>The main approach to B site with clear sightlines for defenders.</li>
    <li><strong>Bridge:</strong>A narrow walkway over the central pit, connecting mid to both sites.</li>
    <li><strong>Tower:</strong>Elevated positions near A and B sites for holding or retaking.</li>
    </ul>
    `,
    image: "../imgs/Map/Abyss.png"
  },
  "Lotus":{
    description: `
    <strong>Lotus</strong><br>
    Callouts for Lotus, which features three bomb sites and a variety of new environmental elements.
    <ul>
    <li><strong>Cave:</strong>A dark, narrow passage leading to one of the sites.</li>
    <li><strong>Pond:</strong>An open area surrounding a water feature, providing sight lines to multiple paths.</li>
    <li><strong>Temple:</strong>A crucial hold point with many angles and entries.</li>
    </ul>
    `,
    image: "../imgs/Map/Lotus.WEBP"
  },
  "Sunset":{
    description: `
    <strong>Sunset</strong><br>
    Sunset callouts highlight the blend of urban and coastal elements, specific to this evening-themed map.
    <ul>
    <li><strong>Market:</strong>A central indoor area near the mid, connecting the two main sites and often contested.</li>
    <li><strong>Beach:</strong>An open area near the attacker spawn, offering a clear path to B site.</li>
    <li><strong>Bridge:</strong>A narrow walkway above the mid area, crucial for controlling rotations and mid engagements.</li>
    </ul>
    `,
    image: "../imgs/Map/Sunset.WEBP"
  },
  "Pearl":{
    description: `
    <strong>Pearl</strong><br>
    These are specific to the Pearl map, which features a variety of unique and tight locations.
    <ul>
    <li><strong>Art:</strong>An area filled with artwork near A site.</li>
    <li><strong>Museum:</strong>A large, open space near the center of the map.</li>
    <li><strong>Connector:</strong>A hallway linking major areas of the map.</li>
    </ul>
    `,
    image: "../imgs/Map/Pearl.WEBP"
  },
  "Icebox":{
    description: `
    <strong>Icebox</strong><br>
    Icebox callouts focus on vertical gameplay and tight chokepoints, specific to this colder map.
    <ul>
    <li><strong>Kitchen:</strong>An indoor area above the B site tunnel.</li>
    <li><strong>Snowman:</strong>A position near B site, overlooking the plant area.</li>
    <li><strong>Belt:</strong>An elevated walkway above A site, crucial for site control.</li>
    </ul>
    `,
    image: "../imgs/Map/Icebox.WEBP"
  },
};
// Fetch API
fetch("https://valorant-api.com/v1/maps")
  .then(res => res.json())
  .then(data => {
    const unwantedMaps = ["District", "Kasbah", "Drift", "Glitch", "Piazza"];

    // Add maps to the container
    data.data.forEach(map => {
      if (!map.displayIcon) return; 
      if (unwantedMaps.includes(map.displayName)) return; 

      mapContainer.innerHTML += `
        <div class="col-md-4 mb-3">
          <div class="card p-2 map-card" data-map-name="${map.displayName}">
            <img src="${map.splash}" class="card-img-top rounded" style="height:180px; object-fit:cover;">
            <div class="card-body">
              <h5 class="card-title text-white">${map.displayName}</h5>
              <p class="text-muted mb-0">${map.coordinates}</p>
            </div>
          </div>
        </div>
      `;
    });

    // Click event to show map details in a modal
    document.querySelectorAll(".map-card").forEach(card => {
      card.addEventListener("click", () => {
        const name = card.getAttribute("data-map-name");
        const details = mapDetails[name];

        if (!details) {
          mapModalLabel.textContent = name;
          mapDescription.textContent = "No additional details available.";
          mapImage.src = "";
        } else {
          mapModalLabel.textContent = name;
          mapDescription.innerHTML = details.description;
          mapImage.src = details.image;
        }

        mapModal.show();
      });
    });   
  })
  .catch(err => {
    console.error("Failed to load maps:", err);
  });

// Map Search Functionality
mapSearchInput.addEventListener("input", function () {
  const query = this.value.trim().toLowerCase();
  const cards = document.querySelectorAll("#map-container .card");

  if (query.length === 0) {
    // Show all cards if search bar is empty
    cards.forEach(card => card.parentElement.style.display = "block");
  } else {
    cards.forEach(card => {
      const title = card.querySelector(".card-title").textContent.toLowerCase();
      if (title.startsWith(query)) {
        card.parentElement.style.display = "block"; // Show matching card
      } else {
        card.parentElement.style.display = "none"; // Hide non-matching card
      }
    });
  }
});

// Scroll to top on click
document.getElementById("scrollToTopBtn").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
