# Link Collector

We often come across links—articles, videos, tools—that we find valuable and wish to revisit later. But more often than not, we forget to save them properly. Link Collector solves this with a minimalist, personal bookmarking tool that lives in your browser.

## Live Demo

Check out the live version here: [https://link-stash-six.vercel.app](https://link-stash-six.vercel.app)

## Overview

Link Collector is a lightweight single-page app that lets users save useful links with a title and category, and view them neatly grouped. It runs entirely in the browser using localStorage—no signups, no backend.

## Features

### 1. Add a Link
- Input fields:
  - Title (e.g., "CSS Animations Guide")
  - URL (e.g., https://css-tricks.com/)
  - Category (e.g., CSS, Reading List, JavaScript)
- A “Save Link” button to store the entry.

### 2. Display Saved Links
- Links are shown grouped by category.
- Each link shows:
  - Clickable title
  - Tiny URL tooltip or subtext
  - Delete icon to remove the link

### 3. Persistent Storage
- All data is stored in localStorage
- Links remain saved across page reloads

### 4. Styling and UX
- Minimalist UI with light gray and pastel color tones
- Rounded corners, clean layout, and soft shadows
- Fully responsive – works on both desktop and mobile

## Bonus Features 

- Filter dropdown to view links by category
- Alphabetical sorting within categories
- Add date saved
- Add tag chips like #tools, #frontend
- Allow editing of existing links

## Tech Stack

- HTML
- CSS
- JavaScript (Vanilla)
- No frameworks
- No backend — all logic and data is stored client-side

## Folder Structure

categorized-link-stash/
├── index.html  
├── styles.css  
├── script.js  
└── README.md  

## How to Run Locally

1. Download or clone this repo:
   ```bash
   git clone https://github.com/your-username/categorized-link-stash.git
