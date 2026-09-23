# ZorZora

ZorZora is a production-focused free-to-play game discovery web app built with Next.js, React and Tailwind CSS. It uses the FreeToGame API through a server-side helper so the frontend stays fast, cache-friendly and easy to maintain.

## Stack
- Next.js 14
- React 18
- Tailwind CSS
- Framer Motion
- Lucide React
- FreeToGame API

## Local setup

```bash
npm install
```

Create `.env.local`:

```env
FREETOGAME_API_BASE=https://www.freetogame.com/api
```

Run:

```bash
npm run dev
```

Production verification:

```bash
npm run build
npm start
```

## Included
- Responsive production UI
- Featured game hero
- Search, category, platform and sort filters
- Popular and new-release sections
- Game detail pages and screenshots
- Loading and not-found states
- Server-side API fetching with 1-hour revalidation
- Custom ZorZora branding and favicon
