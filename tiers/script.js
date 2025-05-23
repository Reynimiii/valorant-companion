// Each tier rank information
const tierInfo = {
  "Iron 1": {
    description: "New players learning the core mechanics of Valorant.",
    rankPoints: "0–100 RR",
    additionalInfo: "Focus on learning your agent’s abilities, practicing aim in the shooting range, and using voice or ping communication."
  },
  "Iron 2": {
    description: "Players starting to develop basic game sense.",
    rankPoints: "0–100 RR",
    additionalInfo: "Begin understanding callouts on maps, and try playing with consistent agents to learn utility timing."
  },
  "Iron 3": {
    description: "Players with slightly improved aim and awareness.",
    rankPoints: "0–100 RR",
    additionalInfo: "Try to stop running while shooting and learn when to rotate based on teammate info."
  },
  "Bronze 1": {
    description: "Foundational mechanics are more consistent.",
    rankPoints: "0–100 RR",
    additionalInfo: "Work on crosshair placement and pre-aiming common angles."
  },
  "Bronze 2": {
    description: "Growing awareness of enemy patterns and positioning.",
    rankPoints: "0–100 RR",
    additionalInfo: "Start experimenting with default strats and coordinated pushes with teammates."
  },
  "Bronze 3": {
    description: "Mechanics are developing, but consistency is key.",
    rankPoints: "0–100 RR",
    additionalInfo: "Watch pro gameplay to understand team setups and decision-making."
  },
  "Silver 1": {
    description: "Players show confidence in 1v1 duels.",
    rankPoints: "0–100 RR",
    additionalInfo: "Focus on learning one or two maps deeply and mastering specific angles."
  },
  "Silver 2": {
    description: "Players start to anchor or entry with specific roles.",
    rankPoints: "0–100 RR",
    additionalInfo: "Work on retake and post-plant scenarios more deliberately."
  },
  "Silver 3": {
    description: "Good fraggers begin to separate from passive players.",
    rankPoints: "0–100 RR",
    additionalInfo: "Start watching your own replays to review decision-making and positioning."
  },
  "Gold 1": {
    description: "Mid-tier players with good aim and some strategy.",
    rankPoints: "0–100 RR",
    additionalInfo: "Practice economy management and learn when to force or save rounds."
  },
  "Gold 2": {
    description: "Team synergy becomes more impactful.",
    rankPoints: "0–100 RR",
    additionalInfo: "Refine your utility usage to support teammates and break enemy setups."
  },
  "Gold 3": {
    description: "Capable of dominating lower ranks but inconsistent.",
    rankPoints: "0–100 RR",
    additionalInfo: "Learn how to punish over-aggression and play off teammate trades."
  },
  "Platinum 1": {
    description: "Solid game knowledge and sharper mechanical skills.",
    rankPoints: "0–100 RR",
    additionalInfo: "Understand enemy economy and adjust playstyle based on their buys."
  },
  "Platinum 2": {
    description: "Stronger use of utility and ability coordination.",
    rankPoints: "0–100 RR",
    additionalInfo: "Call mid-round adjustments and adapt to enemy counter-strategies."
  },
  "Platinum 3": {
    description: "Approaching high-level consistency in decision-making.",
    rankPoints: "0–100 RR",
    additionalInfo: "Start using lineups and flashes to control the pace of rounds."
  },
  "Diamond 1": {
    description: "High mechanical skill with strong macro understanding.",
    rankPoints: "0–100 RR",
    additionalInfo: "Sharpen your entry fragging or lurk timings and play to your team's comp."
  },
  "Diamond 2": {
    description: "Confident in taking initiative and clutching rounds.",
    rankPoints: "0–100 RR",
    additionalInfo: "Focus on punishing mistakes and leading micro-decisions for your team."
  },
  "Diamond 3": {
    description: "Players often on the edge of Immortal if consistent.",
    rankPoints: "0–100 RR",
    additionalInfo: "Play off high-level cues: sound, minimap, and enemy habits."
  },
  "Ascendant 1": {
    description: "Smart players with reliable fragging and strong positioning.",
    rankPoints: "0–100 RR",
    additionalInfo: "Improve clutch ability and refine agent-specific skillsets."
  },
  "Ascendant 2": {
    description: "Very coordinated play and strong fundamentals.",
    rankPoints: "0–100 RR",
    additionalInfo: "Master anti-eco setups and support micro-calls mid-round."
  },
  "Ascendant 3": {
    description: "Top-tier team players with strong mechanical consistency.",
    rankPoints: "0–100 RR",
    additionalInfo: "Review scrim footage or high-rank VODs to refine habits."
  },
  "Immortal 1": {
    description: "Advanced players capable of challenging pro-level coordination.",
    rankPoints: "0–100 RR",
    additionalInfo: "Identify your win conditions quickly and execute with minimal mistakes."
  },
  "Immortal 2": {
    description: "Dominant players with exceptional discipline and reads.",
    rankPoints: "0–100 RR",
    additionalInfo: "Lead micro-decisions with pace and support team comms actively."
  },
  "Immortal 3": {
    description: "Fringe pro-level players with near-perfect coordination.",
    rankPoints: "0–100 RR",
    additionalInfo: "Only take high-percentage duels and force enemy errors."
  },
  "Radiant": {
    description: "Top 500 players in the region — peak of competitive play.",
    rankPoints: "Leaderboard based (Top 500 players, usually >450 RR)",
    additionalInfo: "Continue refining every detail — from movement to timing — while staying mentally strong under pressure."
  }
};


// Fetch competitive tiers from the API
fetch("https://valorant-api.com/v1/competitivetiers")
  .then(res => {
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  })
  .then(data => {
    const tiers = data.data;
    const container = document.getElementById("tier-container");
    const latest = tiers[tiers.length - 1].tiers;

    latest.forEach(tier => {
      if (!tier.tierName.startsWith("Unused")) {
        const col = document.createElement("div");
        col.className = "col-md-3 mb-3";

        const card = document.createElement("div");
        card.className = "card tier-card text-center p-3";
        card.setAttribute("data-bs-toggle", "modal");
        card.setAttribute("data-bs-target", "#tierModal");
        card.setAttribute("data-tier-name", tier.tierName); 

        const img = document.createElement("img");
        img.src = tier.largeIcon;
        img.alt = tier.tierName;
        img.className = "tier-img mx-auto mb-2";
        img.setAttribute("data-bs-toggle", "tooltip");
        img.setAttribute("title", tier.tierName); 

        const h5 = document.createElement("h5");
        h5.textContent = tier.tierName;

        card.appendChild(img);
        card.appendChild(h5);
        col.appendChild(card);
        container.appendChild(col);

        // Para Madisplay yung content sa modal
        card.addEventListener("click", () => {
          const tierName = card.getAttribute("data-tier-name");

          // Normalize both the tier name from the card and tierInfo keys
          const matchedKey = Object.keys(tierInfo).find(
            key => key.toLowerCase() === tierName.toLowerCase()
          );

          const info = matchedKey ? tierInfo[matchedKey] : {};

          if (!matchedKey) {
            console.warn(`No info for tier: ${tierName}`);
          }

          // Update modal content with the tier info
          document.getElementById("tierModalLabel").textContent = tierName;
          document.getElementById("modalBody").innerHTML = `
            <p>${info.description || "No description available."}</p>
            <p><strong>Rank Points:</strong> ${info.rankPoints || "N/A"}</p>
            <p><strong>Additional Info:</strong> ${info.additionalInfo || "N/A"}</p>
          `;
        });
      }
    });
  })
  .catch(err => console.error("Failed to load tiers:", err));
  

  // Scroll to top button
document.getElementById("scrollToTopBtn").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
