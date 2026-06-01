document.addEventListener('DOMContentLoaded', function() {
  // Grab references to the form, card preview, and theme buttons
  const form = document.getElementById('userForm');
  const card = document.getElementById('cardPreview');
  const themeButtons = Array.from(document.querySelectorAll('.theme-button'));
  const fields = ['name', 'title', 'bio', 'skills', 'linkedin', 'instagram', 'github'];

  // Return the trimmed value of a form field by its ID
  function getFieldValue(id) {
    return document.getElementById(id).value.trim();
  }

  // Render the skills input as pill-style tags inside the card
  function renderSkills(skillsText) {
    const skills = skillsText.split(',').map(skill => skill.trim()).filter(Boolean);
    const container = document.getElementById('cardSkills');
    container.innerHTML = ''; // Clear previous tags
    skills.forEach(skill => {
      const tag = document.createElement('div');
      tag.textContent = skill;
      container.appendChild(tag);
    });
  }

  // Apply a selected theme to the card and highlight the active theme button
  function applyTheme(theme) {
    if (!theme) return;
    card.className = 'card-preview ' + theme;
    themeButtons.forEach(button => {
      button.classList.toggle('active', button.dataset.theme === theme);
    });
  }

  // Show the card preview with a transition class
  function showCard() {
    card.style.display = 'block';
    requestAnimationFrame(() => card.classList.add('show'));
  }

  // Hide the card preview smoothly and preserve the transition
  function hideCard() {
    card.classList.remove('show');
    setTimeout(() => {
      card.style.display = 'none';
    }, 200);
  }

  // Save the current field values and theme into localStorage
  function saveState() {
    const data = {
      theme: card.classList.contains('theme-light') ? 'theme-light'
        : card.classList.contains('theme-dark') ? 'theme-dark'
        : card.classList.contains('theme-gradient') ? 'theme-gradient' : '',
      fields: {}
    };
    fields.forEach(id => {
      data.fields[id] = getFieldValue(id);
    });
    localStorage.setItem('portfolioCardData', JSON.stringify(data));
  }

  // Load saved form state from localStorage, if present
  function loadState() {
    const raw = localStorage.getItem('portfolioCardData');
    if (!raw) return false;

    try {
      const data = JSON.parse(raw);
      fields.forEach(id => {
        if (data.fields && data.fields[id] !== undefined) {
          document.getElementById(id).value = data.fields[id];
        }
      });
      if (data.theme) applyTheme(data.theme);
      updateCard({show: true, persist: false});
      return true;
    } catch (error) {
      console.warn('Failed to load saved card:', error);
      return false;
    }
  }

  // Update the preview card with current form values
  // show: whether to display the card
  // persist: whether to save the form state into localStorage
  function updateCard({show = false, persist = false} = {}) {
    document.getElementById('cardName').textContent = getFieldValue('name') || 'Your Name';
    document.getElementById('cardTitle').textContent = getFieldValue('title') || 'Your Title';
    document.getElementById('cardBio').textContent = getFieldValue('bio') || 'Short Bio';

    renderSkills(getFieldValue('skills'));

    document.getElementById('cardLinkedin').href = getFieldValue('linkedin') || '#';
    document.getElementById('cardGithub').href = getFieldValue('github') || '#';
    document.getElementById('cardInstagram').href = getFieldValue('instagram') || '#';

    if (show) showCard();
    if (persist) saveState();
  }

  // Attach live-update listeners to each form field
  fields.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('input', () => updateCard({show: true, persist: true}));
  });

  // Attach theme button listeners for manual switching
  themeButtons.forEach(button => {
    button.addEventListener('click', () => {
      const theme = button.dataset.theme;
      applyTheme(theme);
      showCard();
      saveState();
    });
  });

  // Handle form submit by updating and persisting the card
  form.addEventListener('submit', function(event) {
    event.preventDefault();
    updateCard({show: true, persist: true});
  });

  // Handle form reset by clearing saved state and hiding the card
  form.addEventListener('reset', function() {
    localStorage.removeItem('portfolioCardData');
    setTimeout(hideCard, 50);
  });

  // Initialize preview from saved data if available
  loadState();
});
