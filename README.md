# Tejash Gupta — Personal Website

Live at **https://tejash-gupta-site.onrender.com**

Node.js + Express + EJS personal site with a WebGL particle background (Three.js), featuring project write-ups for Spendly, RAG Roadmap, and Finance Planner, plus a markdown-backed Backstage/notes section.

## Running locally

```
npm install
npm start
```

Then open http://localhost:3000. Use `npm run dev` for auto-reload during development.

## Adding a Backstage note

Drop a `.md` file into `content/notes/` (see `content/notes/TEMPLATE.md.example` for the format) — it shows up automatically on `/notes` and the homepage.

## Deployment

Deployed on [Render](https://render.com) via `render.yaml` — every push to `master` auto-redeploys.
