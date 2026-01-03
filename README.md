# Craft Adventures SMP

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=${repositoryUrl})

A modern full-stack web application built on Cloudflare Workers with a React frontend, designed for high-performance, edge-deployed experiences. Features a sleek UI with Shadcn components, Tailwind CSS, and seamless API integration via Hono.

## Features

- **Edge-Native Backend**: Lightning-fast API routes powered by Cloudflare Workers and Hono.
- **Beautiful UI**: Responsive design with Shadcn UI components, Tailwind CSS, and dark mode support.
- **Modern React Stack**: React 18, React Router, Tanstack Query for data fetching, and Zustand for state management.
- **Developer Experience**: TypeScript, Vite for fast builds, Bun for package management, error boundaries, and client-side error reporting.
- **Sidebar Layout**: Collapsible sidebar ready for dashboards and apps (customizable or removable).
- **Production-Ready**: CORS, logging, health checks, and SPA asset handling out of the box.
- **Animations & Polish**: Framer Motion, Tailwind animations, glassmorphism effects, and responsive typography.
- **Extensible**: Easy to add pages, API routes, and integrate with Cloudflare KV/Durable Objects.

## Tech Stack

- **Frontend**: React, TypeScript, Vite, Tailwind CSS, Shadcn UI, Lucide React
- **Backend**: Cloudflare Workers, Hono
- **Data & State**: Tanstack Query, Zustand, Immer, Zod
- **UI Utils**: Class Variance Authority, Headless UI, Radix UI
- **Other**: Framer Motion, Sonner (toasts), Recharts, React Hook Form, Vaul (drawers)

## Quick Start

1. **Clone & Install**:
   ```bash
   git clone <your-repo-url>
   cd craft-adventures-smp-2o6fmufxqo0nxvfd8p8mw
   bun install
   ```

2. **Development**:
   ```bash
   bun dev
   ```
   Opens at `http://localhost:3000` (or `$PORT`).

3. **Build for Production**:
   ```bash
   bun build
   ```

## Development

- **API Routes**: Add endpoints in `worker/userRoutes.ts`. Auto-reloads in dev.
- **Frontend Pages**: Edit `src/pages/` and update `src/main.tsx` router.
- **Components**: Use Shadcn UI from `@/components/ui/`. Add custom in `src/components/`.
- **Theme**: Toggle dark/light mode with `ThemeToggle`. Persists in localStorage.
- **Sidebar**: Customize `src/components/app-sidebar.tsx` or wrap pages in `AppLayout`.
- **Type Generation**: `bun cf-typegen` for Worker bindings.
- **Linting**: `bun lint`.
- **Preview**: `bun preview`.

Test API: `GET /api/health` and `GET /api/test`.

## Deployment

Deploy to Cloudflare Workers with Pages integration:

1. **Authenticate Wrangler**:
   ```bash
   bunx wrangler login
   bunx wrangler whoami
   ```

2. **Deploy**:
   ```bash
   bun deploy
   ```
   Deploys Worker + static assets. Custom domain via Wrangler dashboard.

3. **Configure** (optional):
   Edit `wrangler.jsonc` for bindings (KV, DO, R2).
   ```bash
   bunx wrangler deploy --env production
   ```

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/Vsploit/forsaken-smp-website)

## Environment Variables

Set via Wrangler secrets:
```bash
bunx wrangler secret put YOUR_SECRET
```

## Project Structure

```
├── src/              # React app
│   ├── components/   # UI components & Shadcn
│   ├── pages/        # Route pages
│   ├── hooks/        # Custom hooks
│   └── lib/          # Utilities
├── worker/           # Cloudflare Worker API
├── public/           # Static assets
├── tailwind.config.js
└── wrangler.jsonc    # Worker config
```

## Customization

- **Home Page**: Replace `src/pages/HomePage.tsx`.
- **API**: Extend `worker/userRoutes.ts`.
- **Styles**: `src/index.css` & `tailwind.config.js`.
- **Remove Demo**: Delete `TemplateDemo` references.

## Troubleshooting

- **Worker Errors**: Check `wrangler tail`.
- **Types**: Run `bun cf-typegen`.
- **CORS**: Pre-configured for `/api/*`.
- **Bun Issues**: Ensure Bun 1.1+ (`bun --version`).

## Contributing

1. Fork & clone.
2. `bun install`.
3. Create feature branch.
4. `bun dev` & test.
5. PR with changelog.

## License

MIT. See [LICENSE](LICENSE) for details.