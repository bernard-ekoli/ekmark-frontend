# Ekmark Frontend

The frontend for [Ekmark](https://ekmark.ekolix.com.ng) — a free image watermarking tool launching June 10, 2026. Built as a pre-launch landing page with waitlist functionality, countdown timer, feature showcase, and developer API preview.

---

## Tech Stack

- **Framework** — Next.js (App Router)
- **Library** — React
- **Language** — TypeScript
- **Styling** — Tailwind CSS
- **Icons** — Lucide React
- **Theming** — next-themes
- **Package Manager** — npm

---

## Getting Started

### Prerequisites

- Node.js v18+
- npm
- Ekmark backend running locally (see [backend README](https://github.com/bernard-ekoli/ekmark-backend))

### Installation

```bash
# Clone the repository
git clone https://github.com/bernard-ekoli/ekmark-frontend.git
cd ekmark-frontend

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the root of the project:

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
```

### Run Locally

```bash
npm run dev
```

App will start on `http://localhost:3000`

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Main landing page with hero, features, countdown, and waitlist |
| `/privacy` | Privacy Policy |
| `/terms` | Terms of Service |

---

## Project Structure

```
frontend/
├── app/
│   ├── layout.tsx          # Root layout with metadata & SEO
│   ├── page.tsx            # Home page
│   ├── sitemap.ts          # Auto-generated sitemap for Google
│   ├── robots.ts           # Robots.txt for Google crawling
│   ├── globals.css         # Global styles
│   ├── privacy/
│   │   └── page.tsx        # Privacy Policy page
│   └── terms/
│       └── page.tsx        # Terms of Service page
├── components/
│   ├── ui/                 # Reusable UI components
│   ├── header.tsx          # Navigation bar
│   ├── hero.tsx            # Hero section with waitlist form
│   ├── features.tsx        # Features grid section
│   ├── launch-count.tsx    # Countdown timer to June 10, 2026
│   ├── developer-api.tsx   # API preview section for developers
│   ├── cta.tsx             # Bottom call-to-action with waitlist form
│   ├── footer.tsx          # Site footer with links
│   └── theme-provider.tsx  # Theme context provider
├── hooks/                  # Custom React hooks
├── lib/                    # Utility functions
├── public/                 # Static assets (images, icons)
├── styles/                 # Additional styles
├── .env                    # Environment variables (gitignored)
├── .gitignore
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## Key Features

- **Waitlist form** — Collects email addresses and sends them to the backend API
- **Countdown timer** — Live countdown to the June 10, 2026 launch date
- **SEO optimised** — Full metadata, Open Graph, Twitter cards, sitemap, and robots.txt
- **Privacy & Terms** — GDPR/NDPR-compliant Privacy Policy and Terms of Service pages
- **Dark/Light theme** — Theme support via theme provider
- **Responsive** — Fully responsive across mobile, tablet, and desktop

---

## Deployment

This frontend is deployed on [Vercel](https://vercel.com).

**Environment variables to set on Vercel:**
- `NEXT_PUBLIC_BACKEND_URL` — Your deployed backend URL (e.g. `https://ekmark-backend.onrender.com`)

---

## SEO

SEO is handled via Next.js App Router's built-in Metadata API in `app/layout.tsx`. Includes:

- Page title and meta description
- Open Graph tags (for WhatsApp, LinkedIn, Slack previews)
- Twitter card tags
- Sitemap at `/sitemap.xml`
- Robots.txt at `/robots.txt`

After deploying, submit your sitemap to [Google Search Console](https://search.google.com/search-console):
```
https://ekmark.ekolix.com.ng/sitemap.xml
```

---

## License

MIT © 2026 Bernard Edet Ekoli
