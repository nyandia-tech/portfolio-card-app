// Attach an event listener to the form submission
// This runs when the user clicks the "Generate" (submit) button
document.getElementById("userForm").addEventListener("submit", function(e) {
  e.preventDefault(); // Prevents the default browser behavior of reloading the page

  // Collecting values from form inputs
  const name = document.getElementById("name").value;
  const title = document.getElementById("title").value;
  const bio = document.getElementById("bio").value;
  const skills = document.getElementById("skills").value.split(","); // Split skills by commas
  const linkedin = document.getElementById("linkedin").value;
  const github = document.getElementById("github").value;
  const instagram = document.getElementById("instagram").value; // Instagram field

  //  Updating card content with form values
  
  document.getElementById("cardName").textContent = name;
  document.getElementById("cardTitle").textContent = title;
  document.getElementById("cardBio").textContent = bio;
  // 3. Render skills as pill-shaped tags
  const skillsContainer = document.getElementById("cardSkills");
  skillsContainer.innerHTML = ""; // Clear previous tags
  skills.forEach(skill => {
    const trimmedSkill = skill.trim();
    if (!trimmedSkill) return;
    const tag = document.createElement("div");
    tag.textContent = trimmedSkill;
    skillsContainer.appendChild(tag);
  });

  // 4. Update social links (LinkedIn, GitHub, Instagram)
  document.getElementById("cardLinkedin").href = linkedin || "#";
  document.getElementById("cardGithub").href = github || "#";
  document.getElementById("cardInstagram").href = instagram || "#";

  // 5. Randomly assign one of the three themes
  const themes = ["theme-light", "theme-dark", "theme-gradient"];
  const randomTheme = themes[Math.floor(Math.random() * themes.length)];
  const card = document.getElementById("cardPreview");
  card.className = "card-preview " + randomTheme;

  // 6. Reveal the card with fade-in animation
  card.style.display = "block";     // Make card visible
  card.classList.add("show");       // Trigger CSS transition (opacity + scale)
});

// Reset button hides the card again
document.getElementById("userForm").addEventListener("reset", function() {
  const card = document.getElementById("cardPreview");
  card.style.display = "none";      // Hide card
  card.classList.remove("show");    // Remove animation class
});
