# Shared POI links

PoiSave exposes one public sharing format:

```text
https://poisave.com/p/{id}
```

`id` is an immutable, URL-safe 12-character token matching `^[A-Za-z0-9_-]{12}$`. It is only a lookup key and contains no POI data. Shared snapshots last 30 days, but expiry is not present in the URL: the Firebase resolver is the only authoritative source.

The page does not request POI data during initial loading. It calls the resolver only after the visitor selects **Apri in PoiSave**.

## Configuration

Production builds require:

```bash
VITE_SHARED_PIN_RESOLVER_URL=https://us-central1-poisave-yugaweb.cloudfunctions.net/resolveSharedPin npm run build
```

For GitHub Actions, define `VITE_SHARED_PIN_RESOLVER_URL` as a repository variable. This URL is public configuration, not a secret.

## Resolver contract

```http
GET {VITE_SHARED_PIN_RESOLVER_URL}?id=K7mQ2x9Babcd
Accept: application/json
```

Successful response:

```json
{
  "ok": true,
  "pin": {
    "title": "Furong Town",
    "categoryId": "location",
    "coord": {
      "latitude": 12.123456789,
      "longitude": 34.123456789
    },
    "city": "芙蓉镇",
    "address": "Furong Town, Hunan, Cina",
    "price": null
  },
  "expiresAt": "2026-10-28T12:00:00.000Z"
}
```

An expired, missing, or invalid token returns:

```http
HTTP/1.1 410 Gone
```

```json
{ "ok": false, "error": "expired" }
```

Coordinates are passed to `poisave://pin` without formatting or rounding. Do not expose Firestore or Firebase credentials in the frontend.

## Static hosting

A host with rewrite support must serve `/p/index.html` for `/p/*` while preserving the original URL and returning HTTP 200:

```text
/p/*  ->  /p/index.html  200
```

GitHub Pages does not support dynamic rewrites. This repository therefore builds a root `404.html` fallback that renders the correct page after a direct visit or refresh, but the initial document still has HTTP status 404. A true HTTP 200 for arbitrary `/p/{id}` paths requires moving the frontend behind Firebase Hosting, Cloudflare Pages, Netlify, or another rewrite-capable host.

`firebase.json` and `.firebaserc` contain a ready-to-use Firebase Hosting configuration for project `poisave-yugaweb`. They do not deploy anything automatically; the custom domain must be moved from GitHub Pages before this rewrite becomes active.
