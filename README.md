# SnapBox 📸

A local image upload and metadata manager built with React.
No backend, no cloud storage — everything runs in the browser.

## Features

- 📁 Drag & drop or browse to upload multiple images
- 🖼 Live preview thumbnails for each image
- 📋 File metadata display — name, type, size, and dimensions
- ✏️ Rename images inline
- 🏷 Add and remove category tags
- ✅ Select all / remove all / remove selected
- 🔍 Filter images by category

## Tech Stack

- React 18
- File API & URL.createObjectURL()
- CSS Modules (no external UI libraries)

## Getting Started

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── App.jsx
├── hooks/
│   └── useImageManager.js
├── components/
│   ├── DropZone.jsx
│   ├── ImageCard.jsx
│   ├── CategoryTag.jsx
│   └── Toolbar.jsx
├── utils/
│   └── format.js
└── styles/
    └── global.css
```
