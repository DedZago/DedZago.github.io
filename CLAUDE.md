# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is **Daniele Zago's personal portfolio website**, now built with **Astro 5** using the Bloomfolio template. It showcases work as a Data Scientist, including education, experience, publications, software packages, and conference presentations.

**Migration Status**: Successfully migrated from Hugo (adritian-free-hugo-theme) to Astro 5 on 2026-02-26. See `MIGRATION_PLAN.md` for complete migration details.

## Development Commands

### Setup
```bash
# Install dependencies
npm install

# Start development server (localhost:4321)
npm run dev
```

### Build & Deployment
```bash
# Build for production (outputs to ./dist/)
npm run build

# Preview production build locally
npm run preview

# Run Astro CLI commands
npm run astro -- <command>

# Type checking
npm run astro check
```

### Content Management
- **Keystatic CMS**: Visit `http://localhost:4321/keystatic` during development
- Edit content collections: education, experience, publications, software, presentations, and site settings

## Architecture

### Framework & Build Setup

- **Astro 5.x**: Static site generator with fast build times
- **Tailwind CSS 4.x**: Integrated via Vite plugin with new CSS-first configuration
- **DaisyUI 5.x**: Component library loaded as Tailwind plugin
- **TypeScript**: Strict mode enabled
- **Keystatic CMS**: Git-based headless CMS for content management (dev-only, production is fully static)

### Directory Structure

```
src/
├── assets/images/          # Images for profile, publications, software
├── components/
│   ├── common/             # Reusable components (CVDownloadButton, SocialLinks, Analytics)
│   ├── layout/             # Layout components (Header, Footer, ThemeSelector)
│   └── sections/           # Homepage sections (Hero, Education, Experience, Publications, Software, Presentations)
├── content/                # Astro Content Collections
│   ├── about/              # Profile & site settings (singleton)
│   ├── education/          # Education entries
│   ├── experience/         # Work experience
│   ├── general/            # General settings (singleton)
│   ├── publications/       # Research publications
│   ├── software/           # Software packages
│   └── presentations/      # Conference presentations
├── layouts/                # Page layouts (BaseLayout)
├── pages/                  # File-based routing
│   ├── index.astro         # Homepage
│   ├── publications/       # Publications listing and detail pages
│   ├── experience/         # Experience detail pages
│   └── 404.astro           # Error page
└── styles/                 # Global CSS with theme configuration
```

### Content Collections

All content is managed through Astro Content Collections with schemas defined in `src/content/config.ts`:

1. **Education**: Degrees and educational achievements
2. **Experience**: Work experience entries
3. **Publications**: Research publications with status (published, submitted, in-preparation)
4. **Software**: Open-source software packages
5. **Presentations**: Conference talks and presentations
6. **About**: Profile information and social links (singleton)
7. **General**: Site-wide settings (singleton)

### Styling System

- **Global styles**: `src/styles/global.css` using Tailwind CSS 4.x `@import` and `@plugin` syntax
- **Themes**: 6 DaisyUI themes available (light, dark, synthwave, retro, valentine, dim)
- **Theme persistence**: Stored in localStorage
- **View transitions**: Subtle fade animations between page navigations

### Keystatic Configuration

- Configured in `keystatic.config.ts`
- Local storage mode for development
- Admin interface with WYSIWYG editor for all content collections
- Includes image upload for publication and software showcases

## Deployment

### GitHub Pages Deployment

- Automated via GitHub Actions (`.github/workflows/deploy.yml`)
- Triggered on push to main/master branches
- Builds Astro site and deploys to GitHub Pages
- Site: https://dedzago.github.io

### Build Configuration

- Static output (production)
- Server output (development, enables Keystatic CMS)
- Automatic image optimization to WebP format

## Key Features

✅ **CV Download**: Language toggle for English/Italian CVs
✅ **Theme Selector**: 6 customizable DaisyUI themes
✅ **Responsive Design**: Mobile-first Tailwind CSS
✅ **Image Optimization**: Automatic WebP conversion and sizing
✅ **Social Links**: LinkedIn, GitHub, Google Scholar, ORCID, ResearchGate
✅ **View Transitions**: Smooth page navigation animations
✅ **Accessibility**: Reduced motion support, semantic HTML
✅ **CMS**: Keystatic for content management during development

## Common Tasks

### Add New Content
1. Run `npm run dev` to start development server
2. Visit `http://localhost:4321/keystatic`
3. Add content through the CMS interface

### Add Manually
Create markdown files in appropriate `src/content/` collection directory with required frontmatter matching the schema.

### Modify Styling
- Update `src/styles/global.css` for global styles
- Use Tailwind utility classes in components
- Configure DaisyUI themes in `src/styles/global.css`

### Test Locally
```bash
npm run dev              # See changes live
npm run build            # Test production build
npm run preview          # Preview built site
```

## Deployment Checklist

Before pushing to GitHub:

- [ ] Test site locally: `npm run dev`
- [ ] Verify all content displays correctly
- [ ] Test theme selector
- [ ] Test CV download buttons
- [ ] Check responsive design on mobile
- [ ] Verify all external links work
- [ ] Run build: `npm run build`
- [ ] Run preview: `npm run preview`

## Related Documentation

- `MIGRATION_PLAN.md`: Complete Hugo→Astro migration details
- [Astro Documentation](https://docs.astro.build)
- [Tailwind CSS 4 Documentation](https://tailwindcss.com/docs)
- [DaisyUI Documentation](https://daisyui.com)
- [Keystatic Documentation](https://keystatic.com)
