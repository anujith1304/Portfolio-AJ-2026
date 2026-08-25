# Portfolio

Personal portfolio site — plain HTML, styled with Tailwind CSS via the Tailwind CLI.
Implemented from the Vitra Landing Page Figma file (`Portfolio(Home)` frame).

## Setup

```bash
npm install
```

## Development

Watches `src/css/input.css` and rebuilds `src/output.css` on save:

```bash
npm run dev
```

Then serve the `src/` folder (it is self-contained):

```bash
npx serve src        # or: python3 -m http.server -d src 8000
```

## Production build

Generates a minified `src/output.css`:

```bash
npm run build
```

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which installs
dependencies, runs the Tailwind build, and publishes `src/` to GitHub Pages.

The generated `src/output.css` is gitignored — the workflow rebuilds it on every
deploy, so it never needs to be committed.

One-time setup: repo **Settings → Pages → Source → GitHub Actions**.

## Structure

```
portfolio/
├── .github/workflows/deploy.yml   # builds + deploys to GitHub Pages
├── src/                            # published as the site root
│   ├── index.html                  # entry page
│   ├── output.css                  # generated Tailwind build (gitignored)
│   ├── css/input.css               # Tailwind source (edit this)
│   ├── js/main.js                  # JS
│   ├── images/                     # image assets from the Figma design
│   └── pages/                      # additional HTML pages
├── public/                          # static files copied as-is (favicon, etc.)
├── tailwind.config.js
└── package.json
```
