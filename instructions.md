# Genesis Examinations Website - Development Instructions

## Project Overview

Genesis Examinations is an educational assessment provider in South Sudan. This website serves as a lead generation and credibility-building platform for school administrators.

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with shadcn/ui components
- **Routing**: React Router DOM
- **State Management**: TanStack React Query
- **Icons**: Lucide React

## Architecture

This project follows **Screaming Architecture** (feature-based folder structure):

```
src/
├── assets/           # Images and static assets
├── components/
│   ├── ui/           # shadcn/ui components
│   └── NavLink.tsx   # Shared navigation component
├── features/         # Feature modules
│   ├── home/
│   ├── about/
│   ├── services/
│   ├── testimonials/
│   ├── partners/
│   ├── contact/
│   ├── faq/
│   └── not-found/
├── shared/           # Shared code
│   ├── contexts/     # React contexts (LanguageContext)
│   ├── hooks/        # Custom hooks (use-toast, use-mobile)
│   └── layout/       # Layout components (Navbar, Footer, ScrollToTop)
├── lib/              # Utility functions
├── App.tsx
├── main.tsx
└── index.css         # Design system tokens
```

## Design System Guidelines

### Colors (Use Semantic Tokens Only)
- **NEVER** use direct colors like `text-white`, `bg-blue-500`
- **ALWAYS** use semantic tokens: `text-foreground`, `bg-primary`, `text-muted-foreground`
- All colors are defined in HSL format in `index.css` and `tailwind.config.ts`

### Key Design Tokens
- `--primary`: Main brand color (trust-building blue)
- `--secondary`: Accent color (growth green)
- `--background` / `--foreground`: Base colors
- `--muted` / `--muted-foreground`: Subdued elements
- `--accent`: Highlight color
- `--card` / `--card-foreground`: Card surfaces

### Styling Approach
1. Use Tailwind classes with semantic tokens
2. Customize shadcn components with variants
3. Leverage `index.css` for global design tokens
4. Ensure responsive design (mobile-first)

## Critical Constraints

### Security (NON-NEGOTIABLE)
- **NO downloadable exam materials** anywhere on the site
- Include messaging explaining why exam content cannot be distributed

### Accessibility
- WCAG 2.1 AA compliance
- Proper contrast ratios
- Alt text for all images
- Keyboard navigation support

### Performance
- Lightweight assets (slow internet context in South Sudan)
- Lazy loading for images
- Optimized bundle size

### Navigation
- Maximum 2-3 clicks to reach any destination
- No pop-ups or friction points
- Smooth transitions

### Imagery
- All images must feature African subjects
- Reflect South Sudan educational context
- Build trust and credibility

### Multilingual
- Support English and Arabic
- Language toggle in navigation
- All content structured for translation

## Lead Generation Requirements

- Prominent "Contact Us" CTAs on every page
- Contact form with: name, institution, email, phone, request details
- Inline error validation
- Confirmation message after submission
- Currently simulated (no backend)

## File Naming Conventions

- Components: PascalCase (e.g., `Home.tsx`)
- Hooks: camelCase with `use-` prefix (e.g., `use-toast.ts`)
- Contexts: PascalCase with `Context` suffix (e.g., `LanguageContext.tsx`)
- Feature folders: kebab-case (e.g., `not-found/`)

## Before Making Changes

1. Review this file and `tasks.md`
2. Check existing code patterns
3. Use semantic design tokens
4. Test responsiveness
5. Verify accessibility
6. Update tasks.md when complete
