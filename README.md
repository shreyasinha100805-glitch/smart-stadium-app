# 🏟️ Smart Stadium

**Smart Stadium** is a match-day companion app built to make the stadium experience seamless for fans — live scores, digital tickets, gate navigation, and match-day planning, all in one clean dashboard.

🔗 **Live App:** [smart-stadium-app.vercel.app](https://smart-stadium-app.vercel.app/)

Built for **Challenge 4** of **Virtual: PromptWars** by Hack2skill.

---

## ✨ Features

- 📊 **Live Score Updates** — real-time match scores and game status
- 🎟️ **Digital Ticket Access** — view your ticket details instantly
- 🧭 **Gate Navigation** — find your gate and section with ease
- ⏱️ **Match-Day Countdown** — never miss kickoff
- 📅 **Upcoming Events** — stay on top of stadium events and schedules
- 🎨 **Clean, Responsive Dashboard** — built for quick, on-the-go use

---

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (bootstrapped with `create-next-app`)
- **Fonts:** [Geist](https://vercel.com/font) via `next/font`
- **Deployment:** [Vercel](https://vercel.com/)

---

## 🚀 Getting Started

First, install dependencies and run the development server:

```bash
npm install
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the app by modifying files inside `src/app`. The page auto-updates as you edit.

---

## 📂 Project Structure

```
smart-stadium-app/
├── public/                  # Static assets (images, icons, favicon)
├── src/
│   └── app/
│       ├── layout.js        # Root layout (fonts, metadata, global providers)
│       ├── page.js          # Dashboard / home page
│       ├── globals.css      # Global styles
│       └── components/      # Reusable UI components (cards, nav, widgets)
├── next.config.mjs          # Next.js configuration (Turbopack root, etc.)
├── jsconfig.json            # Path aliases & JS config
├── eslint.config.mjs        # Linting rules
├── postcss.config.mjs       # PostCSS/Tailwind config
├── package.json             # Dependencies & scripts
└── README.md                # Project documentation
```

---

## 📖 Learn More

To learn more about Next.js, check out these resources:

- [Next.js Documentation](https://nextjs.org/docs) — learn about Next.js features and API
- [Learn Next.js](https://nextjs.org/learn) — an interactive Next.js tutorial
- [Next.js GitHub Repository](https://github.com/vercel/next.js) — feedback and contributions welcome

---

## ☁️ Deploy on Vercel

The easiest way to deploy this app is via the [Vercel Platform](https://vercel.com/new), from the creators of Next.js.

See the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

## 🙌 Acknowledgements

Built as part of **Virtual: PromptWars**, hosted by [Hack2skill](https://hack2skill.com/).
