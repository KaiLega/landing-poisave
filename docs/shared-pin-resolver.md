# Short shared-POI resolver

The static fallback at `/p/?id=TOKEN&e=UNIX_SECONDS` accepts a 22-character URL-safe token and does not request POI data until the visitor selects **Apri in PoiSave**.

Each link lasts 30 days and contains an immutable snapshot: later edits or deletion of the original POI do not alter the shared content. Once the expiry is reached, the page shows **Link scaduto** without calling the resolver.

## Configuration

Set the resolver URL at build time:

```bash
VITE_SHARED_PIN_RESOLVER_URL=https://us-central1-poisave-yugaweb.cloudfunctions.net/resolveSharedPin npm run build
```

For GitHub Pages, define `VITE_SHARED_PIN_RESOLVER_URL` as a GitHub Actions repository variable. This URL is public configuration, not a secret. The endpoint must allow CORS requests from `https://poisave.com`.
Production builds intentionally fail when the variable is missing. No fallback resolver URL is embedded in the frontend.


## API contract

```http
GET {VITE_SHARED_PIN_RESOLVER_URL}?id=K7mQ2x9B4nR8tV3wY6zA1c
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
      "latitude": 28.76733999999999,
      "longitude": 109.97484
    },
    "city": "芙蓉镇",
    "address": "Furong Town, Yongshun County, Hunan, Cina",
    "price": null
  },
  "expiresAt": "2026-10-28T12:00:00.000Z"
}
```

For an expired, missing, malformed, or unavailable code, return HTTP `410` with the same public response for every case:

```json
{ "ok": false, "error": "expired" }
```

Do not expose Firestore or Firebase credentials from this endpoint. The frontend validates the response and caches it locally only until the earliest expiry declared by the URL or resolver.

Coordinates are passed to the PoiSave deep link without formatting or rounding.
