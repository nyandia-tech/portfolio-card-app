# portfolio-card-app
Interactive Portfolio Card Generator is a web app built with HTML, CSS, and JavaScript. Users input their details and instantly preview a styled, responsive portfolio card with real-time updates, multiple themes, animations, and local storage support.
# Day one of working on the project
Set up the project repository and created the initial folder structure.
Added the index.html starter code with a form section and a card preview section.
Tested the basic layout in the browser to confirm everything loads correctly.

Challenges Encountered:
The form inputs were displaying in a straight line instead of stacking vertically.
I experimented with wrapping inputs in(<div>) elements to force them onto new lines.
Decided that the cleaner solution is to adjust the layout in style.css using display: block and spacing.

Next Steps:
Update the style.css file to control the form layout and ensure each input appears on its own line.
Begin styling the form and card preview for responsiveness and theme support.

# CSS progress
  What Was Done
- Styled the form inputs to stack vertically with spacing and clean borders.
- Designed the portfolio card with rounded corners, shadows, and hover animations.
- Added three distinct themes:
  - **Light Theme** (white background, dark text)
  - **Dark Theme** (dark background, light text)
  - **Gradient Theme** (purple-blue gradient with white text)
- Created pill-shaped skill tags with hover transitions.
- Integrated **Font Awesome icons** for social links (LinkedIn, GitHub).
- Added smooth hover effects and transitions for buttons, tags, and icons.

  Challenges & Current State
- The card is currently **hidden by default** (`display:none` / `opacity:0`) to prevent it from showing before the form is filled.
- JavaScript logic to toggle visibility and apply random themes is not yet implemented, which is why the card does not appear after pressing **Generate**.
- Next step: update `script.js` to handle form submission, populate the card, and reveal it with a fade-in animation.

    Next Steps
- Implement JavaScript functions to:
  - Show the card after form submission.
  - Populate the card with user data.
  - Randomly assign one of the three themes.
  - Add fade-in animation when the card appears.
