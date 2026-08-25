# Portfolio

Personal portfolio site — plain HTML, styled with Tailwind CSS via the Tailwind CLI.

## Setup

```bash
npm install
```

## Development

Watches `src/css/input.css` and rebuilds `dist/output.css` on save:

```bash
npm run dev
```

Open `src/index.html` in a browser (or serve `src/` with any static server).

## Production build

Generates a minified `dist/output.css`:

```bash
npm run build
```

## Structure

```
portfolio/
├── src/
│   ├── index.html      # entry page
│   ├── pages/           # additional HTML pages
│   ├── css/input.css    # Tailwind source (edit this, not dist/output.css)
│   ├── js/main.js       # JS
│   └── images/          # image assets
├── public/               # static files copied as-is (favicon, etc.)
├── dist/                 # generated CSS output (gitignored)
├── tailwind.config.js
└── package.json
```
