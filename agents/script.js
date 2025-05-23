const agentContainer = document.getElementById("agent-container");
const modal = new bootstrap.Modal(document.getElementById("agentModal"));
const agentImage = document.getElementById("agentImage");
const agentName = document.getElementById("agentName");
const agentRole = document.getElementById("agentRole");
const agentDescription = document.getElementById("agentDescription");
const agentAbilities = document.getElementById("agentAbilities");

let allAgents = [];

// Fetch agents from the API
fetch("https://valorant-api.com/v1/agents?isPlayableCharacter=true")
  .then(res => res.json())
  .then(data => {
    allAgents = data.data;
    displayAgents(allAgents); // Display all agents initially
  })
  .catch(err => {
    agentContainer.innerHTML = `<p class="text-danger">Failed to load agents. Try again later.</p>`;
    console.error(err);
  });

// Search bar functionality
document.getElementById('agentSearch').addEventListener('input', function () {
  const searchTerm = this.value.trim().toLowerCase();

  // Filter the agents based on the search term
  const filteredAgents = allAgents.filter(agent =>
    agent.displayName.toLowerCase().startsWith(searchTerm) // Match names starting with the search term
  );

  // Clear the agent container and display the filtered results
  agentContainer.innerHTML = ""; // Clear previous agents
  if (searchTerm.length === 0) {
    // If search bar is cleared, display all agents
    displayAgents(allAgents);
  } else if (filteredAgents.length > 0) {
    // Display filtered agents
    displayAgents(filteredAgents);
  } else {
    agentContainer.innerHTML = `<p class="text-muted">No agents found</p>`;
  }
});

// to get the video for the abilities of each agents
function getAbilityVideo(agentName, abilityName) {
  const videos = {
    // DUELIST
    "Jett": {
      "Tailwind": "../videos/duel/Jett/tailwind.mp4",
      "Cloudburst": "../videos/duel/Jett/cloudburst.mp4",
      "Updraft": "../videos/duel/Jett/updraft.mp4",
      "Blade Storm": "../videos/duel/Jett/bladestorm.mp4"
    },
    "Phoenix": {
      "Blaze": "../videos/duel/Phoenix/blaze.mp4",
      "Hot Hands": "../videos/duel/Phoenix/hothands.mp4",
      "Curveball": "../videos/duel/Phoenix/curveball.mp4",
      "Run it Back": "../videos/duel/Phoenix/runitback.mp4"
    },
    "Raze": {
      "Paint Shells": "../videos/duel/Raze/paintshells.mp4",
      "Boom Bot": "../videos/duel/Raze/boombot.mp4",
      "Blast Pack": "../videos/duel/Raze/blastpack.mp4",
      "Showstopper": "../videos/duel/Raze/showstopper.mp4"
    },
    "Neon": {
      "High Gear": "../videos/duel/Neon/highgear.mp4",
      "Fast Lane": "../videos/duel/Neon/fastlane.mp4",
      "Relay Bolt": "../videos/duel/Neon/relaybolt.mp4",
      "Overdrive": "../videos/duel/Neon/overdrive.mp4"
    },
    "Reyna": {
      "Devour": "../videos/duel/Reyna/devour.mp4",
      "Dismiss": "../videos/duel/Reyna/dismiss.mp4",
      "Leer": "../videos/duel/Reyna/leer.mp4",
      "Empress": "../videos/duel/Reyna/empress.mp4"
    },
    "Iso": {
      "Undercut": "../videos/duel/Iso/undercut.mp4",
      "Double Tap": "../videos/duel/Iso/doubletap.mp4",
      "Contingency": "../videos/duel/Iso/contingency.mp4",
      "Kill Contract": "../videos/duel/Iso/killcontract.mp4"
    },
    "Yoru": {
      "BLINDSIDE": "../videos/duel/Yoru/blindside.mp4",
      "GATECRASH": "../videos/duel/Yoru/gatecrash.mp4",
      "FAKEOUT": "../videos/duel/Yoru/fakeout.mp4",
      "DIMENSIONAL DRIFT": "../videos/duel/Yoru/dimensional.mp4"
    },
    "Waylay": {
      "Saturate": "../videos/duel/Waylay/saturate.mp4",
      "Refract": "../videos/duel/Waylay/refract.mp4",
      "Lightspeed": "../videos/duel/Waylay/lightspeed.mp4",
      "Convergent Paths": "../videos/duel/Waylay/convergent.mp4"
    },
    // INITIATOR
    "Breach": {
      "Flashpoint": "../videos/initia/Breach/flashpoint.mp4",
      "Fault Line": "../videos/initia/Breach/faultline.mp4",
      "Aftershock": "../videos/initia/Breach/aftershock.mp4",
      "Rolling Thunder": "../videos/initia/Breach/rollingthunder.mp4"
    },
    "Gekko": {
      "Dizzy": "../videos/initia/Gekko/dizzy.mp4",
      "Mosh Pit": "../videos/initia/Gekko/mostpit.mp4",
      "Wingman": "../videos/initia/Gekko/wingman.mp4",
      "Thrash": "../videos/initia/Gekko/thrash.mp4"
    },
    "Fade": {
      "Seize": "../videos/initia/Fade/seize.mp4",
      "Haunt": "../videos/initia/Fade/haunt.mp4",
      "Prowler": "../videos/initia/Fade/prowler.mp4",
      "Nightfall": "../videos/initia/Fade/nightfall.mp4"
    },
    "Tejo": {
      "Guided Salvo": "../videos/initia/Tejo/guidedsalvo.mp4",
      "Special Delivery": "../videos/initia/Tejo/specialdelivery.mp4",
      "Stealth Drone": "../videos/initia/Tejo/stealthdrone.mp4",
      "Armageddon": "../videos/initia/Tejo/armageddon.mp4"
    },
    "KAY/O": {
      "FRAG/ment": "../videos/initia/KayO/fragment.mp4",
      "FLASH/drive": "../videos/initia/KayO/flashdrive.mp4",
      "ZERO/point": "../videos/initia/KayO/zeropoint.mp4",
      "NULL/cmd": "../videos/initia/KayO/nullcmd.mp4"
    },
    "Sova": {
      "Shock Bolt": "../videos/initia/Sova/shockbolt.mp4",
      "Recon Bolt": "../videos/initia/Sova/reconbolt.mp4",
      "Owl Drone": "../videos/initia/Sova/owldrone.mp4",
      "Hunter's Fury": "../videos/initia/Sova/huntersfury.mp4"
    },
    "Skye": {
      "Trailblazer": "../videos/initia/Skye/trailblazer.mp4",
      "Guiding Light": "../videos/initia/Skye/guidinglight.mp4",
      "Regrowth": "../videos/initia/Skye/regrowth.mp4",
      "Seekers": "../videos/initia/Skye/seekers.mp4"
    },
    // CONTROLLER
    "Omen": {
      "Paranoia": "../videos/control/Omen/paranoia.mp4",
      "Dark Cover": "../videos/control/Omen/darkcover.mp4",
      "Shrouded Step": "../videos/control/Omen/shroudedstep.mp4",
      "From the Shadows": "../videos/control/Omen/fromtheshadows.mp4"
    },
    "Viper": {
      "Poison Cloud": "../videos/control/Viper/poisoncloud.mp4",
      "Toxic Screen": "../videos/control/Viper/toxicscreen.mp4",
      "Snake Bite": "../videos/control/Viper/snakebite.mp4",
      "Viper's Pit": "../videos/control/Viper/viperspit.mp4"
    },
    "Astra": {
      "Nova Pulse": "../videos/control/Astra/novapulse.mp4",
      "Nebula": "../videos/control/Astra/dissipate.mp4",
      "Dissipate": "../videos/control/Astra/dissipate.mp4", // parihas sila sa nebula, hiniwalay lang para gumana yung video.
      "Gravity Well": "../videos/control/Astra/gravitywell.mp4",
      "Astral Form / Cosmic Divide": "../videos/control/Astra/astralform.mp4"
    },
    "Harbor": {
      "Cove": "../videos/control/Harbor/cove.mp4",
      "Cascade": "../videos/control/Harbor/cascade.mp4",
      "High Tide": "../videos/control/Harbor/hightide.mp4",
      "Reckoning": "../videos/control/Harbor/reckoning.mp4"
    },
    "Brimstone": {
      "Stim Beacon": "../videos/control/Brimstone/stimbeacon.mp4",
      "Incendiary": "../videos/control/Brimstone/incendiary.mp4",
      "Sky Smoke": "../videos/control/Brimstone/skysmoke.mp4",
      "Orbital Strike": "../videos/control/Brimstone/orbitalstrike.mp4"
    },
    "Clove": {
      "Pick-me-up": "../videos/control/Clove/pickmeup.mp4",
      "Ruse": "../videos/control/Clove/ruse.mp4",
      "Not Dead Yet": "../videos/control/Clove/notdeadyet.mp4",
      "Meddle": "../videos/control/Clove/meddle.mp4"
    },
    //SENTINEL
    "Sage":{
      "Slow Orb":"../videos/sen/Sage/sloworb.mp4",
      "Healing Orb":"../videos/sen/Sage/healingorb.mp4",
      "Barrier Orb":"../videos/sen/Sage/barrierorb.mp4",
      "Resurrection":"../videos/sen/Sage/resurrection.mp4"

    },
    "Killjoy":{
      "Nanoswarm":"../videos/sen/Killjoy/nanoswarm.mp4",
      "ALARMBOT":"../videos/sen/Killjoy/alarmbot.mp4",
      "TURRET":"../videos/sen/Killjoy/turret.mp4",
      "Lockdown":"../videos/sen/Killjoy/lockdown.mp4"
    },
    "Deadlock":{
      "Sonic Sensor":"../videos/sen/Deadlock/sonicsensor.mp4",
      "Barrier Mesh":"../videos/sen/Deadlock/barriermesh.mp4",
      "GravNet":"../videos/sen/Deadlock/gravnet.mp4",
      "Annihilation":"../videos/sen/Deadlock/annihilation.mp4"
    },
    "Chamber":{
      "Rendezvous":"../videos/sen/Chamber/rendezvous.mp4",
      "Trademark":"../videos/sen/Chamber/trademark.mp4",
      "Headhunter":"../videos/sen/Chamber/headhunter.mp4",
      "Tour De Force":"../videos/sen/Chamber/tourdeforce.mp4"
    },
    "Cypher":{
      "Cyber Cage":"../videos/sen/Cypher/cybercage.mp4",
      "Spycam":"../videos/sen/Cypher/spycam.mp4",
      "Trapwire":"../videos/sen/Cypher/trapwire.mp4",
      "Neural Theft":"../videos/sen/Cypher/neuraltheft.mp4"
    },
    "Vyse":{
      "Shear":"../videos/sen/Vyse/shear.mp4",
      "Arc Rose":"../videos/sen/Vyse/arcrose.mp4",
      "Razorvine":"../videos/sen/Vyse/razorvine.mp4",
      "Steel Garden":"../videos/sen/Vyse/steelgarden.mp4"
    },
  };

  // Para kay Astra, sa "Nebula / Dissipate ability niya"
  if (agentName === "Astra" && abilityName.includes("Nebula")) {
    return "../videos/control/Astra/dissipate.mp4";
  }

  return videos[agentName]?.[abilityName] || null;
}

// Function to display agents in the container
function displayAgents(agentList) {
  agentList.forEach(agent => {
    if (!agent.role || !agent.role.displayName) return;

    const col = document.createElement("div");
    col.className = "col-md-4 col-sm-6 mb-4";

    const card = document.createElement("div");
    card.className = "card h-100 text-center";
    card.innerHTML = `
      <img src="${agent.displayIcon}" class="card-img-top p-3" alt="${agent.displayName}" style="height: 300px; object-fit: contain;" />
      <div class="card-body">
        <h5 class="card-title">${agent.displayName}</h5>
        <span class="badge bg-danger">${agent.role.displayName}</span>
      </div>
    `;

    card.addEventListener("click", () => {
      agentImage.src = agent.fullPortrait || agent.displayIcon;
      agentName.textContent = agent.displayName;
      agentRole.textContent = agent.role.displayName;
      agentDescription.textContent = agent.description;
      agentAbilities.innerHTML = "";

      agent.abilities.forEach((ability) => {
        if (ability.displayName && ability.description) {
          const li = document.createElement("li");
          li.className = "list-group-item bg-dark text-white";

          const videoUrl = getAbilityVideo(agent.displayName, ability.displayName);
          const videoHtml = videoUrl ? ` 
            <video class="w-100 mb-3" style="max-height: 250px;" autoplay muted loop>
              <source src="${videoUrl}" type="video/mp4">
            </video>
          ` : '';

          li.innerHTML = `
            <div>
              <strong>${ability.displayName}:</strong> ${ability.description}
              ${videoHtml}
            </div>
          `;

          agentAbilities.appendChild(li);
        }
      });

      modal.show();
    });

    col.appendChild(card);
    agentContainer.appendChild(col);
  });
}

// Scroll to top button functionality
document.getElementById("scrollToTopBtn").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});