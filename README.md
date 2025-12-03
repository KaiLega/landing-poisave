# PoiSave — Landing Page

Landing page for the PoiSave mobile app, built with React + Vite + Tailwind. It showcases the product hero, feature highlights, screenshots, FAQ, and download call-to-action.

## Tech stack
- React + TypeScript
- Vite for dev/build
- Tailwind CSS for styling
- Lucide icons

## Structure
- `src/App.tsx` — main page sections (hero, features, how it works, screens, FAQ, download). Reads `COMING_SOON` to optionally show the temporary page.
- `src/components/` — reusable bits (`Header`, `Footer`, `Feature`, `FAQ`).
- `src/components/ComingSoon.tsx` — animated coming-soon page (shifting gradient + cursor trail).
- `src/styles.css` — Tailwind setup plus utility/custom styles.
- `src/config.ts` — toggle `COMING_SOON` on/off.
- `public/` — static assets under `public/img` (logo, screenshots, store badges).

## Getting started
```bash
npm install
npm run dev
```

## Production build
```bash
npm run build
```
Output in `dist/`.

## Coming soon mode
In `src/config.ts` set `COMING_SOON = true` to show the coming-soon page; set to `false` for the full landing.

## Deploy
Static site: run `npm run build` and publish the `dist/` folder (GitHub Pages, Netlify, Vercel, or FTP on traditional hosting).
