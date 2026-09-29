# لمسة دار | Lamsat Dar

Arabic (RTL) luxury interior-design landing page. React 18 + Vite + Tailwind CSS + Framer Motion + Lucide.

## Local setup
```bash
git clone <your-repo-url> lamsat-dar && cd lamsat-dar
npm install            # or: pnpm install
cp .env.example .env   # set VITE_WHATSAPP and (optionally) VITE_BOOKING_ENDPOINT
npm run dev            # http://localhost:5173
npm run build && npm run preview   # production check
```

| Variable | Purpose |
|---|---|
| `VITE_WHATSAPP` | Number used by the floating WhatsApp button |
| `VITE_BOOKING_ENDPOINT` | If set, the booking form POSTs JSON here; otherwise it only shows the success screen |

## Deploy to Vercel

**A. GitHub import**
1. Push the project to GitHub.
2. In Vercel: **Add New → Project → Import** your repository.
3. Framework Preset: **Vite**. Build Command: `npm run build`. Output Directory: `dist`. Install Command: `npm install`.
4. Under **Environment Variables**, add `VITE_WHATSAPP` (and `VITE_BOOKING_ENDPOINT` if used).
5. Click **Deploy**. Every push to `main` redeploys automatically.

**B. Vercel CLI**
```bash
npm i -g vercel
vercel login
vercel            # first run: link/create the project, accept Vite defaults
vercel env add VITE_WHATSAPP production
vercel --prod     # production deployment
```

## Customising
- All content lives in `src/data/mockData.js` (projects, services, offers, areas, images). Replace the Unsplash ids with your own photos; `<Img>` shows a gradient fallback if a URL fails.
- Smooth scrolling is Lenis (`src/hooks/useLenis.js`); it is disabled for `prefers-reduced-motion`.
- Booking is a modal (`BookingModal.jsx`) opened from every CTA via `onBook(serviceId?)` in `App.jsx`.
- Colours live in `tailwind.config.js` (`char`, `sand`, `gold`).
