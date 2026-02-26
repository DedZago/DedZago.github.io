# Hugo to Astro Migration Plan

## Personal Website Migration: Hugo → Astro + Bloomfolio

**Target:** Migrate dedzago.github.io from Hugo (adritian-free-hugo-theme) to Astro 5 using Bloomfolio template as base.

---

## Table of Contents

1. [Requirements Summary](#1-requirements-summary)
2. [Project Setup](#2-project-setup)
3. [Architecture Overview](#3-architecture-overview)
4. [Content Collections Schema](#4-content-collections-schema)
5. [Component Architecture](#5-component-architecture)
6. [Content Migration](#6-content-migration)
7. [Custom Sections Implementation](#7-custom-sections-implementation)
8. [Theming & Styling](#8-theming--styling)
9. [View Transitions](#9-view-transitions)
10. [Image Optimization](#10-image-optimization)
11. [Analytics Preparation](#11-analytics-preparation)
12. [Deployment Configuration](#12-deployment-configuration)
13. [Testing & Verification](#13-testing--verification)
14. [File Structure Reference](#14-file-structure-reference)
15. [Migration Checklist](#15-migration-checklist)

---

## 1. Requirements Summary

### Confirmed Requirements

| Feature | Decision |
|---------|----------|
| CMS | Keystatic CMS (visual editor) |
| Default Theme | Theme selector enabled (all themes available) |
| Conference Presentations | Custom section (new content collection) |
| Blog | Not needed (disable) |
| Deployment | GitHub Pages |
| CV Downloads | Single button with language toggle (EN/IT) |
| Software Section | Keep as separate section (custom) |
| CI/CD | GitHub Actions auto-deploy |
| View Transitions | Subtle fade transitions |
| Hero Layout | Image with text beside (current style) |
| Analytics | None initially, architecture ready for Simple Analytics |
| Social Links | LinkedIn, GitHub, Email + Google Scholar, ORCID, ResearchGate |
| URL Structure | Fresh Astro conventions |

### Content to Migrate

| Content Type | Count | Source Location |
|--------------|-------|-----------------|
| Experience entries | 2 | `content/experience/` |
| Publications | 6 | `content/projects/` |
| Software packages | 1 | `content/software/` |
| Conference presentations | 5 | `data/homepage.yml` |
| Education entries | 4 | `data/homepage.yml` |
| Profile images | 3 | `assets/images/showcase/` |
| Project images | 10+ | `assets/images/works/` |
| CV PDFs | 2 | `static/pdf/` |
| Favicon set | 8 | `static/` |

---

## 2. Project Setup

### 2.1 Prerequisites

```bash
# Required versions
node --version  # v18+ or v20+ required
npm --version   # v9+ recommended
```

### 2.2 Clone Bloomfolio Template

```bash
# Create new project directory (separate from current Hugo site)
cd ~/Documents/git
git clone https://github.com/lauroguedes/bloomfolio.git dedzago-astro
cd dedzago-astro

# Remove Bloomfolio's git history to start fresh
rm -rf .git
git init

# Install dependencies
npm install
```

### 2.3 Initial Configuration

**File: `astro.config.mjs`**
```javascript
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import keystatic from '@keystatic/astro';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';

export default defineConfig({
  site: 'https://dedzago.github.io',
  output: 'hybrid', // For Keystatic admin
  integrations: [
    tailwind(),
    mdx(),
    markdoc(),
    react(),
    keystatic(),
  ],
  vite: {
    optimizeDeps: {
      exclude: ['@keystatic/astro', '@keystatic/core'],
    },
  },
});
```

### 2.4 Environment Setup

**File: `.env.example`**
```env
# Optional: Simple Analytics (for future use)
# PUBLIC_SIMPLE_ANALYTICS_ENABLED=false

# Keystatic
KEYSTATIC_GITHUB_CLIENT_ID=
KEYSTATIC_GITHUB_CLIENT_SECRET=
KEYSTATIC_SECRET=
```

---

## 3. Architecture Overview

### 3.1 Directory Structure

```
dedzago-astro/
├── .github/
│   └── workflows/
│       └── deploy.yml           # GitHub Pages deployment
├── public/
│   ├── pdf/
│   │   ├── zago_cv_english.pdf
│   │   └── zago_cv_italian.pdf
│   ├── favicon.ico
│   ├── android-chrome-*.png
│   ├── apple-touch-icon.png
│   └── site.webmanifest
├── src/
│   ├── assets/
│   │   └── images/
│   │       ├── profile/         # Profile photos
│   │       ├── publications/    # Publication showcase images
│   │       ├── software/        # Software showcase images
│   │       └── general/         # Misc images
│   ├── components/
│   │   ├── common/              # Reusable UI components
│   │   │   ├── Button.astro
│   │   │   ├── Card.astro
│   │   │   ├── CVDownloadButton.astro  # Custom: language toggle
│   │   │   ├── SectionHeader.astro
│   │   │   └── SocialLinks.astro
│   │   ├── layout/
│   │   │   ├── Header.astro
│   │   │   ├── Footer.astro
│   │   │   ├── Navigation.astro
│   │   │   └── ThemeSelector.astro
│   │   ├── sections/            # Homepage sections
│   │   │   ├── Hero.astro
│   │   │   ├── Education.astro
│   │   │   ├── Experience.astro
│   │   │   ├── Publications.astro
│   │   │   ├── Software.astro        # Custom section
│   │   │   └── Presentations.astro   # Custom section
│   │   └── icons/               # SVG icon components
│   ├── content/
│   │   ├── config.ts            # Content collection schemas
│   │   ├── about/               # Site settings (Keystatic singleton)
│   │   │   └── index.yaml
│   │   ├── education/
│   │   │   └── *.md
│   │   ├── experience/
│   │   │   └── *.md
│   │   ├── publications/        # Renamed from "projects"
│   │   │   └── *.md
│   │   ├── software/            # Custom collection
│   │   │   └── *.md
│   │   └── presentations/       # Custom collection
│   │       └── *.md
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   └── MarkdownLayout.astro
│   ├── pages/
│   │   ├── index.astro          # Homepage
│   │   ├── publications/
│   │   │   ├── index.astro      # Publications listing
│   │   │   └── [slug].astro     # Individual publication
│   │   ├── experience/
│   │   │   └── [slug].astro
│   │   └── 404.astro
│   ├── styles/
│   │   └── global.css           # Tailwind + DaisyUI config
│   └── utils/
│       ├── content.ts           # Content helpers
│       └── date.ts              # Date formatting
├── keystatic.config.ts          # Keystatic CMS configuration
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
└── package.json
```

### 3.2 Page Routing

| URL | Component | Description |
|-----|-----------|-------------|
| `/` | `index.astro` | Homepage with all sections |
| `/publications/` | `publications/index.astro` | Publications listing |
| `/publications/[slug]` | `publications/[slug].astro` | Publication detail |
| `/experience/[slug]` | `experience/[slug].astro` | Experience detail |
| `/keystatic` | Keystatic admin | CMS interface |

---

## 4. Content Collections Schema

### 4.1 Schema Definition

**File: `src/content/config.ts`**
```typescript
import { defineCollection, z } from 'astro:content';

// Education collection
const educationCollection = defineCollection({
  type: 'content',
  schema: z.object({
    institution: z.string(),
    degree: z.string(),
    field: z.string().optional(),
    location: z.string().optional(),
    startDate: z.string(),  // "2021" or "Jan 2023"
    endDate: z.string().optional(),  // "2024" or "present"
    description: z.string().optional(),
    order: z.number().default(0),
  }),
});

// Experience collection
const experienceCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    company: z.string(),
    location: z.string(),
    startDate: z.string(),
    endDate: z.string().optional(),  // undefined = "present"
    order: z.number().default(0),
  }),
});

// Publications collection
const publicationsCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    date: z.coerce.date(),
    journal: z.string().optional(),
    status: z.enum(['published', 'submitted', 'in-preparation']).default('published'),
    doi: z.string().optional(),
    url: z.string().url().optional(),
    image: image().optional(),
    featured: z.boolean().default(false),
    order: z.number().default(0),
  }),
});

// Software collection (custom)
const softwareCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    date: z.coerce.date(),
    journal: z.string().optional(),  // For accompanying papers
    journalUrl: z.string().url().optional(),
    githubUrl: z.string().url(),
    image: image().optional(),
    language: z.string().optional(),  // "Julia", "R", "Python"
    order: z.number().default(0),
  }),
});

// Presentations collection (custom)
const presentationsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    type: z.enum(['invited-talk', 'invited-seminar', 'poster', 'workshop']),
    venue: z.string(),
    location: z.string().optional(),
    slidesUrl: z.string().url().optional(),
    order: z.number().default(0),
  }),
});

// About/Settings singleton
const aboutCollection = defineCollection({
  type: 'data',
  schema: ({ image }) => z.object({
    name: z.string(),
    title: z.string(),
    subtitle: z.string().optional(),
    bio: z.string(),
    profileImage: image(),
    email: z.string().email(),
    location: z.string(),
    socialLinks: z.object({
      linkedin: z.string().url().optional(),
      github: z.string().url().optional(),
      googleScholar: z.string().url().optional(),
      orcid: z.string().url().optional(),
      researchGate: z.string().url().optional(),
    }),
    sectionVisibility: z.object({
      education: z.boolean().default(true),
      experience: z.boolean().default(true),
      publications: z.boolean().default(true),
      software: z.boolean().default(true),
      presentations: z.boolean().default(true),
    }),
  }),
});

export const collections = {
  education: educationCollection,
  experience: experienceCollection,
  publications: publicationsCollection,
  software: softwareCollection,
  presentations: presentationsCollection,
  about: aboutCollection,
};
```

### 4.2 Keystatic Configuration

**File: `keystatic.config.ts`**
```typescript
import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',  // Change to 'github' for production
  },

  singletons: {
    settings: singleton({
      label: 'Site Settings',
      path: 'src/content/about/index',
      format: { data: 'yaml' },
      schema: {
        name: fields.text({ label: 'Full Name' }),
        title: fields.text({ label: 'Professional Title' }),
        subtitle: fields.text({ label: 'Subtitle', multiline: true }),
        bio: fields.text({ label: 'Bio', multiline: true }),
        profileImage: fields.image({
          label: 'Profile Image',
          directory: 'src/assets/images/profile',
          publicPath: '@assets/images/profile/',
        }),
        email: fields.text({ label: 'Email' }),
        location: fields.text({ label: 'Location' }),
        socialLinks: fields.object({
          linkedin: fields.url({ label: 'LinkedIn URL' }),
          github: fields.url({ label: 'GitHub URL' }),
          googleScholar: fields.url({ label: 'Google Scholar URL' }),
          orcid: fields.url({ label: 'ORCID URL' }),
          researchGate: fields.url({ label: 'ResearchGate URL' }),
        }, { label: 'Social Links' }),
        sectionVisibility: fields.object({
          education: fields.checkbox({ label: 'Show Education', defaultValue: true }),
          experience: fields.checkbox({ label: 'Show Experience', defaultValue: true }),
          publications: fields.checkbox({ label: 'Show Publications', defaultValue: true }),
          software: fields.checkbox({ label: 'Show Software', defaultValue: true }),
          presentations: fields.checkbox({ label: 'Show Presentations', defaultValue: true }),
        }, { label: 'Section Visibility' }),
      },
    }),
  },

  collections: {
    education: collection({
      label: 'Education',
      path: 'src/content/education/*',
      slugField: 'institution',
      format: { contentField: 'description' },
      schema: {
        institution: fields.slug({ name: { label: 'Institution' } }),
        degree: fields.text({ label: 'Degree' }),
        field: fields.text({ label: 'Field of Study' }),
        location: fields.text({ label: 'Location' }),
        startDate: fields.text({ label: 'Start Date (e.g., 2021 or Jan 2023)' }),
        endDate: fields.text({ label: 'End Date (leave empty for ongoing)' }),
        description: fields.mdx({ label: 'Description' }),
        order: fields.integer({ label: 'Display Order', defaultValue: 0 }),
      },
    }),

    experience: collection({
      label: 'Experience',
      path: 'src/content/experience/*',
      slugField: 'title',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Job Title' } }),
        company: fields.text({ label: 'Company' }),
        location: fields.text({ label: 'Location' }),
        startDate: fields.text({ label: 'Start Date' }),
        endDate: fields.text({ label: 'End Date (leave empty for current)' }),
        content: fields.mdx({ label: 'Description' }),
        order: fields.integer({ label: 'Display Order', defaultValue: 0 }),
      },
    }),

    publications: collection({
      label: 'Publications',
      path: 'src/content/publications/*',
      slugField: 'title',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        date: fields.date({ label: 'Publication Date' }),
        journal: fields.text({ label: 'Journal/Venue' }),
        status: fields.select({
          label: 'Status',
          options: [
            { label: 'Published', value: 'published' },
            { label: 'Submitted', value: 'submitted' },
            { label: 'In Preparation', value: 'in-preparation' },
          ],
          defaultValue: 'published',
        }),
        doi: fields.text({ label: 'DOI' }),
        url: fields.url({ label: 'Article URL' }),
        image: fields.image({
          label: 'Showcase Image',
          directory: 'src/assets/images/publications',
          publicPath: '@assets/images/publications/',
        }),
        featured: fields.checkbox({ label: 'Featured', defaultValue: false }),
        content: fields.mdx({ label: 'Description' }),
        order: fields.integer({ label: 'Display Order', defaultValue: 0 }),
      },
    }),

    software: collection({
      label: 'Software',
      path: 'src/content/software/*',
      slugField: 'title',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Package Name' } }),
        date: fields.date({ label: 'Release Date' }),
        journal: fields.text({ label: 'Accompanying Paper Journal' }),
        journalUrl: fields.url({ label: 'Paper URL' }),
        githubUrl: fields.url({ label: 'GitHub Repository URL' }),
        image: fields.image({
          label: 'Showcase Image',
          directory: 'src/assets/images/software',
          publicPath: '@assets/images/software/',
        }),
        language: fields.select({
          label: 'Programming Language',
          options: [
            { label: 'Julia', value: 'julia' },
            { label: 'R', value: 'r' },
            { label: 'Python', value: 'python' },
            { label: 'Other', value: 'other' },
          ],
          defaultValue: 'julia',
        }),
        content: fields.mdx({ label: 'Description' }),
        order: fields.integer({ label: 'Display Order', defaultValue: 0 }),
      },
    }),

    presentations: collection({
      label: 'Presentations',
      path: 'src/content/presentations/*',
      slugField: 'title',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Presentation Title' } }),
        date: fields.date({ label: 'Date' }),
        type: fields.select({
          label: 'Type',
          options: [
            { label: 'Invited Talk', value: 'invited-talk' },
            { label: 'Invited Seminar', value: 'invited-seminar' },
            { label: 'Poster Presentation', value: 'poster' },
            { label: 'Workshop', value: 'workshop' },
          ],
          defaultValue: 'invited-talk',
        }),
        venue: fields.text({ label: 'Conference/Venue' }),
        location: fields.text({ label: 'Location' }),
        slidesUrl: fields.url({ label: 'Slides URL (optional)' }),
        content: fields.mdx({ label: 'Abstract/Description' }),
        order: fields.integer({ label: 'Display Order', defaultValue: 0 }),
      },
    }),
  },
});
```

---

## 5. Component Architecture

### 5.1 Base Layout

**File: `src/layouts/BaseLayout.astro`**
```astro
---
import { ViewTransitions } from 'astro:transitions';
import Header from '@components/layout/Header.astro';
import Footer from '@components/layout/Footer.astro';
import '@styles/global.css';

interface Props {
  title: string;
  description?: string;
  image?: string;
}

const { title, description = '', image } = Astro.props;
const canonicalURL = new URL(Astro.url.pathname, Astro.site);
---

<!DOCTYPE html>
<html lang="en" data-theme="light">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="manifest" href="/site.webmanifest" />

    <title>{title} | Daniele Zago</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={canonicalURL} />

    <!-- Open Graph -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content={canonicalURL} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    {image && <meta property="og:image" content={image} />}

    <!-- Simple Analytics placeholder (future) -->
    <!-- <script async defer src="https://sa.dedzago.github.io/latest.js"></script> -->

    <ViewTransitions />
  </head>
  <body class="min-h-screen flex flex-col">
    <Header />
    <main class="flex-1" transition:animate="fade">
      <slot />
    </main>
    <Footer />

    <!-- Theme initialization script -->
    <script is:inline>
      const theme = localStorage.getItem('theme') || 'light';
      document.documentElement.setAttribute('data-theme', theme);
    </script>
  </body>
</html>
```

### 5.2 Hero Section (Image with Text Beside)

**File: `src/components/sections/Hero.astro`**
```astro
---
import { Image } from 'astro:assets';
import { getEntry } from 'astro:content';
import SocialLinks from '@components/common/SocialLinks.astro';
import CVDownloadButton from '@components/common/CVDownloadButton.astro';

const about = await getEntry('about', 'index');
const { name, title, subtitle, bio, profileImage, email, socialLinks } = about.data;
---

<section id="about-me" class="hero min-h-[80vh] bg-base-200">
  <div class="hero-content flex-col lg:flex-row-reverse gap-8 lg:gap-16 max-w-6xl mx-auto px-4">
    <!-- Profile Image -->
    <div class="flex-shrink-0">
      <Image
        src={profileImage}
        alt={name}
        width={400}
        height={400}
        class="rounded-xl shadow-2xl max-w-xs lg:max-w-sm"
        loading="eager"
        format="webp"
      />
    </div>

    <!-- Text Content -->
    <div class="text-center lg:text-left">
      <h1 class="text-4xl lg:text-5xl font-bold" transition:name="hero-name">
        {name}
      </h1>
      <p class="text-xl lg:text-2xl text-primary mt-2">
        {title}
      </p>
      {subtitle && (
        <p class="text-lg text-base-content/70 mt-2">
          {subtitle}
        </p>
      )}
      <div class="mt-6 prose prose-lg max-w-none" set:html={bio} />

      <!-- Action Buttons -->
      <div class="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start">
        <a href={`mailto:${email}`} class="btn btn-primary">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
          Contact
        </a>
        <CVDownloadButton />
        <SocialLinks links={socialLinks} />
      </div>
    </div>
  </div>
</section>
```

### 5.3 CV Download Button with Language Toggle

**File: `src/components/common/CVDownloadButton.astro`**
```astro
---
// CV language toggle component
---

<div class="dropdown dropdown-end">
  <label tabindex="0" class="btn btn-outline gap-2">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clip-rule="evenodd" />
    </svg>
    Download CV
    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
    </svg>
  </label>
  <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow-lg bg-base-100 rounded-box w-52">
    <li>
      <a href="/pdf/zago_cv_english.pdf" download class="flex items-center gap-2">
        <span class="text-lg">🇬🇧</span>
        English
      </a>
    </li>
    <li>
      <a href="/pdf/zago_cv_italian.pdf" download class="flex items-center gap-2">
        <span class="text-lg">🇮🇹</span>
        Italiano
      </a>
    </li>
  </ul>
</div>
```

### 5.4 Theme Selector

**File: `src/components/layout/ThemeSelector.astro`**
```astro
---
const themes = [
  { name: 'light', label: 'Light' },
  { name: 'dark', label: 'Dark' },
  { name: 'synthwave', label: 'Synthwave' },
  { name: 'retro', label: 'Retro' },
  { name: 'valentine', label: 'Valentine' },
  { name: 'dim', label: 'Dim' },
];
---

<div class="dropdown dropdown-end">
  <label tabindex="0" class="btn btn-ghost btn-circle">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
    </svg>
  </label>
  <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow-lg bg-base-100 rounded-box w-52 max-h-80 overflow-y-auto">
    {themes.map((theme) => (
      <li>
        <button
          class="theme-btn flex items-center gap-3"
          data-theme={theme.name}
        >
          <div class="flex gap-1">
            <span class={`w-2 h-4 rounded bg-primary`} data-theme={theme.name}></span>
            <span class={`w-2 h-4 rounded bg-secondary`} data-theme={theme.name}></span>
            <span class={`w-2 h-4 rounded bg-accent`} data-theme={theme.name}></span>
          </div>
          {theme.label}
        </button>
      </li>
    ))}
  </ul>
</div>

<script>
  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const theme = btn.getAttribute('data-theme');
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    });
  });
</script>
```

### 5.5 Social Links Component

**File: `src/components/common/SocialLinks.astro`**
```astro
---
interface Props {
  links: {
    linkedin?: string;
    github?: string;
    googleScholar?: string;
    orcid?: string;
    researchGate?: string;
  };
  size?: 'sm' | 'md' | 'lg';
}

const { links, size = 'md' } = Astro.props;

const iconSize = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
};

const btnSize = {
  sm: 'btn-sm',
  md: '',
  lg: 'btn-lg',
};
---

<div class="flex gap-2">
  {links.linkedin && (
    <a href={links.linkedin} target="_blank" rel="noopener noreferrer"
       class={`btn btn-ghost btn-circle ${btnSize[size]}`} aria-label="LinkedIn">
      <svg class={iconSize[size]} fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    </a>
  )}

  {links.github && (
    <a href={links.github} target="_blank" rel="noopener noreferrer"
       class={`btn btn-ghost btn-circle ${btnSize[size]}`} aria-label="GitHub">
      <svg class={iconSize[size]} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    </a>
  )}

  {links.googleScholar && (
    <a href={links.googleScholar} target="_blank" rel="noopener noreferrer"
       class={`btn btn-ghost btn-circle ${btnSize[size]}`} aria-label="Google Scholar">
      <svg class={iconSize[size]} fill="currentColor" viewBox="0 0 24 24">
        <path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z"/>
      </svg>
    </a>
  )}

  {links.orcid && (
    <a href={links.orcid} target="_blank" rel="noopener noreferrer"
       class={`btn btn-ghost btn-circle ${btnSize[size]}`} aria-label="ORCID">
      <svg class={iconSize[size]} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.525.422-.947.947-.947zm-.684 3.625h1.369v9.62H6.685v-9.62zm4.34 0h3.696c3.137 0 4.676 2.064 4.676 4.755 0 2.952-1.842 4.865-4.855 4.865h-3.517v-9.62zm1.369 1.256v7.108h2.164c2.212 0 3.39-1.472 3.39-3.59 0-1.913-1.026-3.518-3.269-3.518h-2.285z"/>
      </svg>
    </a>
  )}

  {links.researchGate && (
    <a href={links.researchGate} target="_blank" rel="noopener noreferrer"
       class={`btn btn-ghost btn-circle ${btnSize[size]}`} aria-label="ResearchGate">
      <svg class={iconSize[size]} fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.586 0c-.818 0-1.508.19-2.073.565-.563.377-.97.936-1.213 1.68a3.193 3.193 0 0 0-.112.437 8.365 8.365 0 0 0-.078.53 9 9 0 0 0-.05.727c-.01.282-.013.621-.013 1.016a31.121 31.121 0 0 0 .014 1.017 9 9 0 0 0 .05.727 7.946 7.946 0 0 0 .078.53h-.005a3.334 3.334 0 0 0 .112.44c.244.743.65 1.303 1.214 1.68.565.376 1.256.564 2.075.564.8 0 1.536-.213 2.105-.603.57-.39.94-.916 1.175-1.65.076-.235.135-.558.177-.93a10.9 10.9 0 0 0 .043-1.207v-.82c0-.095-.047-.142-.14-.142h-3.064c-.094 0-.14.047-.14.141v.956c0 .094.046.14.14.14h1.666c.056 0 .084.03.084.086 0 .36 0 .62-.036.865-.038.244-.1.447-.147.606-.108.229-.27.418-.493.566-.224.149-.514.222-.869.222-.703 0-1.095-.202-1.405-.617-.076-.104-.14-.234-.204-.38a2.253 2.253 0 0 1-.139-.541c-.024-.2-.037-.433-.04-.7-.006-.267-.009-.592-.009-.975 0-.383.003-.707.009-.975.003-.267.016-.5.04-.7.021-.197.073-.391.14-.541.063-.146.127-.276.203-.38.31-.415.702-.617 1.404-.617.335 0 .602.06.804.183.201.12.345.273.44.46.094.186.14.39.158.612.02.22.022.412.022.573 0 .094.047.141.14.141h1.336c.094 0 .14-.047.14-.141 0-.38-.023-.744-.07-1.086-.045-.343-.134-.67-.274-.98a2.52 2.52 0 0 0-.6-.848c-.256-.244-.584-.437-.987-.58-.402-.14-.888-.21-1.455-.21zM5.254 3.738a.36.36 0 0 0-.244.103.357.357 0 0 0-.103.244v9.822c0 .095.035.18.103.246a.346.346 0 0 0 .244.104h1.476a.35.35 0 0 0 .347-.35V3.985a.35.35 0 0 0-.347-.35H5.254v.103zm5.082 0a.36.36 0 0 0-.244.103.357.357 0 0 0-.102.244v9.822c0 .095.034.18.102.246a.346.346 0 0 0 .244.104h5.288c.685 0 1.202-.167 1.55-.5.35-.333.524-.82.524-1.459v-1.608c0-.404-.107-.74-.318-1.006-.21-.265-.506-.442-.887-.53v-.028c.29-.094.52-.257.687-.49.165-.233.248-.526.248-.878V6.21c0-.596-.156-1.056-.466-1.38-.31-.322-.78-.483-1.408-.483H10.59a.36.36 0 0 0-.244.103.357.357 0 0 0-.102.244v.044h.092zm1.93 1.387h3.234c.27 0 .477.06.617.183.14.123.21.307.21.55v1.065c0 .243-.07.427-.21.55-.14.123-.346.184-.617.184h-3.234v-2.532zm0 3.98h3.44c.29 0 .505.073.645.22.14.147.21.366.21.656v1.163c0 .29-.07.51-.21.656-.14.147-.355.22-.646.22h-3.44v-2.915z"/>
      </svg>
    </a>
  )}
</div>
```

### 5.6 Publications Section

**File: `src/components/sections/Publications.astro`**
```astro
---
import { getCollection } from 'astro:content';
import { Image } from 'astro:assets';

const publications = await getCollection('publications');
const sortedPublications = publications.sort((a, b) => {
  // Sort by order first, then by date (newest first)
  if (a.data.order !== b.data.order) return a.data.order - b.data.order;
  return b.data.date.getTime() - a.data.date.getTime();
});

const statusLabels = {
  'published': { text: 'Published', class: 'badge-success' },
  'submitted': { text: 'Submitted', class: 'badge-warning' },
  'in-preparation': { text: 'In Preparation', class: 'badge-info' },
};
---

<section id="publications" class="py-16 px-4">
  <div class="max-w-6xl mx-auto">
    <h2 class="text-3xl font-bold text-center mb-4">Publications</h2>
    <p class="text-center text-base-content/70 mb-12 max-w-2xl mx-auto">
      Research articles in statistical sciences, process monitoring, and stochastic optimization.
    </p>

    <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {sortedPublications.map((pub) => (
        <div class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
          {pub.data.image && (
            <figure class="px-4 pt-4">
              <Image
                src={pub.data.image}
                alt={pub.data.title}
                width={400}
                height={250}
                class="rounded-xl object-cover h-48 w-full"
                format="webp"
              />
            </figure>
          )}
          <div class="card-body">
            <h3 class="card-title text-lg">
              {pub.data.title}
              <span class={`badge ${statusLabels[pub.data.status].class} badge-sm`}>
                {statusLabels[pub.data.status].text}
              </span>
            </h3>
            {pub.data.journal && (
              <p class="text-sm text-primary italic">{pub.data.journal}</p>
            )}
            <p class="text-sm text-base-content/70">
              {pub.body || pub.data.description}
            </p>
            <div class="card-actions justify-end mt-4">
              {pub.data.url && (
                <a href={pub.data.url} target="_blank" rel="noopener noreferrer"
                   class="btn btn-primary btn-sm">
                  View Article
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
```

### 5.7 Software Section (Custom)

**File: `src/components/sections/Software.astro`**
```astro
---
import { getCollection } from 'astro:content';
import { Image } from 'astro:assets';

const software = await getCollection('software');
const sortedSoftware = software.sort((a, b) => a.data.order - b.data.order);
---

<section id="software" class="py-16 px-4 bg-base-200">
  <div class="max-w-6xl mx-auto">
    <h2 class="text-3xl font-bold text-center mb-4">Software</h2>
    <p class="text-center text-base-content/70 mb-12 max-w-2xl mx-auto">
      Open-source software packages and tools for statistical computing and data analysis.
    </p>

    <div class="grid gap-8 md:grid-cols-2">
      {sortedSoftware.map((pkg) => (
        <div class="card bg-base-100 shadow-xl lg:card-side">
          {pkg.data.image && (
            <figure class="lg:w-1/3">
              <Image
                src={pkg.data.image}
                alt={pkg.data.title}
                width={300}
                height={200}
                class="h-full w-full object-cover"
                format="webp"
              />
            </figure>
          )}
          <div class="card-body lg:w-2/3">
            <h3 class="card-title">
              {pkg.data.title}
              {pkg.data.language && (
                <span class="badge badge-outline badge-sm">{pkg.data.language}</span>
              )}
            </h3>
            {pkg.data.journal && (
              <p class="text-sm text-primary italic">{pkg.data.journal}</p>
            )}
            <p class="text-sm">{pkg.body}</p>
            <div class="card-actions justify-end mt-4">
              {pkg.data.journalUrl && (
                <a href={pkg.data.journalUrl} target="_blank" rel="noopener noreferrer"
                   class="btn btn-outline btn-sm">
                  Paper
                </a>
              )}
              <a href={pkg.data.githubUrl} target="_blank" rel="noopener noreferrer"
                 class="btn btn-primary btn-sm gap-2">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                Source Code
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
```

### 5.8 Presentations Section (Custom)

**File: `src/components/sections/Presentations.astro`**
```astro
---
import { getCollection } from 'astro:content';

const presentations = await getCollection('presentations');
const sortedPresentations = presentations.sort((a, b) => {
  // Sort by date (newest first)
  return b.data.date.getTime() - a.data.date.getTime();
});

const typeLabels = {
  'invited-talk': { text: 'Invited Talk', class: 'badge-primary' },
  'invited-seminar': { text: 'Invited Seminar', class: 'badge-secondary' },
  'poster': { text: 'Poster', class: 'badge-accent' },
  'workshop': { text: 'Workshop', class: 'badge-info' },
};

// Format date as "Mon YYYY"
const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};
---

<section id="presentations" class="py-16 px-4">
  <div class="max-w-4xl mx-auto">
    <h2 class="text-3xl font-bold text-center mb-4">Conference Presentations</h2>
    <p class="text-center text-base-content/70 mb-12 max-w-2xl mx-auto">
      Selected conference presentations and invited talks on statistical methods and data science.
    </p>

    <div class="space-y-4">
      {sortedPresentations.map((pres) => (
        <div class="card bg-base-100 shadow-md hover:shadow-lg transition-shadow">
          <div class="card-body py-4">
            <div class="flex flex-wrap items-start gap-4">
              <!-- Date -->
              <div class="text-sm font-mono text-base-content/60 w-20 shrink-0">
                {formatDate(pres.data.date)}
              </div>

              <!-- Content -->
              <div class="flex-1 min-w-0">
                <h3 class="font-semibold text-lg leading-tight">
                  {pres.data.title}
                </h3>
                <p class="text-sm text-base-content/70 mt-1">
                  {pres.data.venue}
                  {pres.data.location && `, ${pres.data.location}`}
                </p>
              </div>

              <!-- Type Badge -->
              <span class={`badge ${typeLabels[pres.data.type].class} shrink-0`}>
                {typeLabels[pres.data.type].text}
              </span>

              <!-- Slides Link (if available) -->
              {pres.data.slidesUrl && (
                <a href={pres.data.slidesUrl} target="_blank" rel="noopener noreferrer"
                   class="btn btn-ghost btn-sm">
                  Slides
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
```

---

## 6. Content Migration

### 6.1 About/Settings (Singleton)

**File: `src/content/about/index.yaml`**
```yaml
name: "Daniele Zago"
title: "Data Scientist"
subtitle: "Data Scientist @OPTIT S.r.l., Bologna"
bio: |
  <strong>Ph.D. in Statistical Sciences</strong> specialized in industrial statistics,
  online outlier detection, and stochastic optimization. Experienced in statistical
  consulting and software development.

  <strong>Research interests:</strong>
  <ul>
    <li>Stochastic optimization</li>
    <li>Functional data analysis</li>
    <li>Statistical software development</li>
    <li>Quality control and process monitoring</li>
  </ul>
profileImage: "@assets/images/profile/user-picture.png"
email: "zagodaniele.9@gmail.com"
location: "Bologna, Italy"
socialLinks:
  linkedin: "https://www.linkedin.com/in/daniele-zago/"
  github: "https://github.com/DedZago"
  googleScholar: ""  # Add your Google Scholar URL
  orcid: ""          # Add your ORCID URL
  researchGate: ""   # Add your ResearchGate URL
sectionVisibility:
  education: true
  experience: true
  publications: true
  software: true
  presentations: true
```

### 6.2 Education Entries

Create one file per education entry in `src/content/education/`:

**File: `src/content/education/phd-padova.md`**
```markdown
---
institution: "University of Padova"
degree: "Doctor of Philosophy (Ph.D.)"
field: "Statistical Sciences"
location: "Padova, Italy"
startDate: "2021"
endDate: "2024"
order: 1
---
```

**File: `src/content/education/msc-padova.md`**
```markdown
---
institution: "University of Padova"
degree: "Master of Science (M.Sc.)"
field: "Statistical Sciences"
location: "Padova, Italy"
startDate: "2019"
endDate: "2021"
order: 2
---
```

**File: `src/content/education/bsc-padova.md`**
```markdown
---
institution: "University of Padova"
degree: "Bachelor of Science (B.Sc.)"
field: "Statistical Sciences"
location: "Padova, Italy"
startDate: "2016"
endDate: "2019"
order: 3
---
```

**File: `src/content/education/visiting-florida.md`**
```markdown
---
institution: "University of Florida"
degree: "Visiting Research Scholar"
field: "Department of Biostatistics"
location: "Gainesville, FL, USA"
startDate: "Jan 2023"
endDate: "Dec 2023"
order: 4
---

Supervisor: Prof. Peihua Qiu
```

**File: `src/content/education/infn-school.md`**
```markdown
---
institution: "INFN"
degree: "Thirteenth INFN International School on Efficient Scientific Computing"
startDate: "Oct 2022"
order: 5
---

- Efficient C++ programming
- GPU programming with CUDA
```

**File: `src/content/education/summer-school-perugia.md`**
```markdown
---
institution: "University of Perugia"
degree: "Summer School in Mathematics"
startDate: "Jul 2020"
order: 6
---
```

### 6.3 Experience Entries

**File: `src/content/experience/data-scientist-optit.md`**
```markdown
---
title: "Data Scientist"
company: "OPTIT S.r.l"
location: "Bologna, Italy"
startDate: "2024"
order: 1
---

I joined OPTIT S.r.l. as a Data Scientist to leverage my statistical expertise in solving complex, real-world problems. Part of my workload has focused on implementing data-driven solutions for energy forecasting and anomaly detection. The remaining part was dedicated to research and development on novel algorithms for the periodic multiple vehicle routing problem, both in single- as well as in multi-frequency pickup patterns.
```

**File: `src/content/experience/phd-student.md`**
```markdown
---
title: "Ph.D. Student"
company: "Università degli Studi di Padova"
location: "Padova, Italy"
startDate: "2021"
endDate: "2024"
order: 2
---

During my Ph.D. in Statistical Sciences at Università degli Studi di Padova, I focused on advancing my technical expertise in industrial statistics, particularly in real-time outlier detection and stochastic optimization. My research contributions have resulted in publications in several journals, such as the *Journal of Quality Technology*, *Statistics & Computing*, *Quality Engineering*, and the *Journal of Statistical Software*.

Additionally, I applied my knowledge in real-world contexts, taking part in consulting projects related to statistical process monitoring.

I submitted my thesis in 2024, titled "*Advanced Statistical Process Monitoring using Simulation-Based Algorithms*."
```

### 6.4 Publications Migration

**File: `src/content/publications/stochastic-optimization-algorithm.md`**
```markdown
---
title: "A doubly-stochastic constrained optimization algorithm"
date: 2024-08-27
journal: "Journal of Quality Technology"
status: published
url: "https://doi.org/10.1080/00224065.2024.2323585"
image: "@assets/images/publications/stochapprox-showcase.png"
featured: true
order: 1
---

I designed a novel stochastic optimization algorithm with stochastic constraints, aimed at optimizing control chart tuning parameters with greater efficiency compared to traditional numerical methods.
```

**File: `src/content/publications/bisection-algorithm.md`**
```markdown
---
title: "An improved bisection-type algorithm for control chart calibration"
date: 2024-08-26
journal: "Statistics and Computing"
status: published
url: "https://doi.org/10.1007/s11222-025-10609-7"
image: "@assets/images/publications/bisection-showcase.png"
order: 2
---

I developed a modified bisection algorithm for computing control limits in complex settings where standard methods are inefficient. The approach removes the need for a predefined search range and scales efficiently to multi-chart scenarios.
```

**File: `src/content/publications/alternative-parameter-learning.md`**
```markdown
---
title: "Alternative parameter learning schemes for monitoring process stability"
date: 2021-08-25
journal: "Quality Engineering"
status: published
url: "https://www.tandfonline.com/doi/full/10.1080/08982112.2023.2253891"
image: "@assets/images/publications/alternative-parameter-learning-showcase.png"
order: 3
---

I formalized the theoretical behavior of parameter learning schemes in relation to outlier detection performance in control charts. This work enabled the generalization of alternative parameter learning methods, leading to a more efficient and accurate detection scheme compared to traditional approaches.
```

**File: `src/content/publications/mixed-data-monitoring.md`**
```markdown
---
title: "A general framework for monitoring mixed data"
date: 2024-08-22
journal: "Journal of Quality Technology"
status: published
url: "https://www.tandfonline.com/doi/full/10.1080/00224065.2025.2512164"
image: "@assets/images/publications/mixed-monitoring-showcase.png"
order: 4
---

We developed a general methodology to monitor processes involving mixed-type data (continuous, ordinal, categorical), common in real-world applications. The method enables effective sequential monitoring under serial correlation.
```

**File: `src/content/publications/complex-geometries-monitoring.md`**
```markdown
---
title: "Monitoring of complex geometrical shapes"
date: 2024-08-29
journal: ""
status: submitted
image: "@assets/images/publications/ovetti-showcase.png"
order: 5
---

I developed an innovative statistical quality control method for detecting shape defects in complex geometries obtained via additive manufacturing. I introduced a novel nonparametric control chart based on kurtosis analysis which provides superior defect detection for 3D-printed objects compared to existing approaches.
```

**File: `src/content/publications/likelihood-ratio-mixed-data.md`**
```markdown
---
title: "Transparent sequential learning and monitoring of processes with mixed data based on a likelihood-ratio formulation"
date: 2025-08-22
journal: "Technometrics"
status: in-preparation
image: "@assets/images/publications/lrt-akde-showcase.png"
order: 6
---

We developed a likelihood-ratio methodology to monitor processes involving continuous and categorical data. The approach makes use of adaptive kernel density estimation in order to approximate the likelihood ratio, thus providing efficient detection power.
```

### 6.5 Software Migration

**File: `src/content/software/statisticalprocessmonitoring-jl.md`**
```markdown
---
title: "StatisticalProcessMonitoring.jl"
date: 2024-08-27
journal: "Journal of Statistical Software"
journalUrl: "https://www.jstatsoft.org/article/view/v113i07"
githubUrl: "https://github.com/DedZago/StatisticalProcessMonitoring.jl"
image: "@assets/images/software/spm-showcase.png"
language: "julia"
order: 1
---

A Julia package for real-time statistical process monitoring, integrating advanced algorithms and control charts to handle complex data types, such as sequential data, functional data, and structured observations.
```

### 6.6 Presentations Migration

**File: `src/content/presentations/enbis-2025.md`**
```markdown
---
title: "Optimal constrained design of control charts using stochastic approximations"
date: 2025-09-01
type: invited-talk
venue: "ENBIS-25 Conference"
location: "Piraeus, Greece"
order: 1
---
```

**File: `src/content/presentations/padova-seminar-2025.md`**
```markdown
---
title: "Efficient algorithms for the calibration of control limits"
date: 2025-11-01
type: invited-seminar
venue: "Università degli Studi di Padova"
location: "Padova, Italy"
order: 2
---
```

**File: `src/content/presentations/informs-2023.md`**
```markdown
---
title: "Optimal constrained design of control charts using stochastic approximations"
date: 2023-10-01
type: invited-talk
venue: "2023 INFORMS Annual Meeting"
location: "Phoenix, AZ, USA"
order: 3
---
```

**File: `src/content/presentations/padova-poster-2022.md`**
```markdown
---
title: "Profile monitoring based on adaptive parameter learning"
date: 2022-09-01
type: poster
venue: "Statistical methods and models for complex data"
location: "Padova, Italy"
order: 4
---
```

**File: `src/content/presentations/isba-2022.md`**
```markdown
---
title: "Bayesian nonparametric multiscale mixture models via Hilbert-curve partitioning"
date: 2022-06-01
type: poster
venue: "2022 ISBA World Meeting"
location: "Montréal, Canada"
order: 5
---
```

---

## 7. Custom Sections Implementation

### 7.1 Education Section

**File: `src/components/sections/Education.astro`**
```astro
---
import { getCollection } from 'astro:content';

const education = await getCollection('education');
const sortedEducation = education.sort((a, b) => a.data.order - b.data.order);

const formatDateRange = (start: string, end?: string) => {
  return end ? `${start} — ${end}` : start;
};
---

<section id="education" class="py-16 px-4 bg-base-200">
  <div class="max-w-4xl mx-auto">
    <h2 class="text-3xl font-bold text-center mb-12">Education</h2>

    <div class="space-y-8">
      {sortedEducation.map((edu) => (
        <div class="card bg-base-100 shadow-md">
          <div class="card-body">
            <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
              <div>
                <h3 class="card-title text-lg">{edu.data.institution}</h3>
                <p class="text-primary font-medium">{edu.data.degree}</p>
                {edu.data.field && (
                  <p class="text-sm text-base-content/70">{edu.data.field}</p>
                )}
                {edu.data.location && (
                  <p class="text-sm text-base-content/60">{edu.data.location}</p>
                )}
              </div>
              <div class="badge badge-outline shrink-0">
                {formatDateRange(edu.data.startDate, edu.data.endDate)}
              </div>
            </div>
            {edu.body && (
              <div class="mt-4 prose prose-sm max-w-none" set:html={edu.body} />
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
```

### 7.2 Experience Section

**File: `src/components/sections/Experience.astro`**
```astro
---
import { getCollection } from 'astro:content';

const experience = await getCollection('experience');
const sortedExperience = experience.sort((a, b) => a.data.order - b.data.order);

const formatDateRange = (start: string, end?: string) => {
  return end ? `${start} — ${end}` : `${start} — present`;
};
---

<section id="experience" class="py-16 px-4">
  <div class="max-w-4xl mx-auto">
    <h2 class="text-3xl font-bold text-center mb-4">Experience</h2>
    <p class="text-center text-base-content/70 mb-12 max-w-2xl mx-auto">
      Experienced in designing advanced statistical algorithms, specializing in real-time outlier detection and stochastic optimization.
    </p>

    <!-- Timeline -->
    <div class="relative">
      <!-- Timeline line -->
      <div class="absolute left-4 sm:left-1/2 transform sm:-translate-x-px top-0 bottom-0 w-0.5 bg-base-300"></div>

      {sortedExperience.map((exp, index) => (
        <div class={`relative flex items-start mb-8 ${index % 2 === 0 ? 'sm:flex-row-reverse' : ''}`}>
          <!-- Timeline dot -->
          <div class="absolute left-4 sm:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-base-100 z-10"></div>

          <!-- Content card -->
          <div class={`ml-12 sm:ml-0 sm:w-5/12 ${index % 2 === 0 ? 'sm:mr-auto sm:pr-8' : 'sm:ml-auto sm:pl-8'}`}>
            <div class="card bg-base-100 shadow-md hover:shadow-lg transition-shadow">
              <div class="card-body py-4">
                <div class="badge badge-primary badge-sm mb-2">
                  {formatDateRange(exp.data.startDate, exp.data.endDate)}
                </div>
                <h3 class="card-title text-lg">{exp.data.title}</h3>
                <p class="text-primary font-medium text-sm">{exp.data.company}</p>
                <p class="text-sm text-base-content/60">{exp.data.location}</p>
                {exp.body && (
                  <div class="mt-3 prose prose-sm max-w-none line-clamp-4" set:html={exp.body} />
                )}
                <a href={`/experience/${exp.slug}`} class="link link-primary text-sm mt-2">
                  Read more →
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
```

---

## 8. Theming & Styling

### 8.1 Global Styles

**File: `src/styles/global.css`**
```css
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

/* Custom base styles */
@layer base {
  html {
    scroll-behavior: smooth;
  }

  /* Smooth theme transitions */
  html,
  html * {
    transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
  }
}

/* Custom component styles */
@layer components {
  /* Card hover effects */
  .card {
    @apply transition-all duration-300;
  }

  /* Section spacing consistency */
  section {
    @apply scroll-mt-20;
  }

  /* Badge status colors */
  .badge-success {
    @apply bg-success/20 text-success border-success/30;
  }

  .badge-warning {
    @apply bg-warning/20 text-warning border-warning/30;
  }

  .badge-info {
    @apply bg-info/20 text-info border-info/30;
  }
}

/* View transition customizations */
@layer utilities {
  ::view-transition-old(root),
  ::view-transition-new(root) {
    animation-duration: 0.3s;
  }
}

/* Print styles */
@media print {
  header, footer, nav {
    display: none !important;
  }

  section {
    break-inside: avoid;
  }
}
```

### 8.2 Tailwind Configuration

**File: `tailwind.config.mjs`**
```javascript
import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [
    daisyui,
    require('@tailwindcss/typography'),
  ],
  daisyui: {
    themes: ['light', 'dark', 'synthwave', 'retro', 'valentine', 'dim'],
    darkTheme: 'dark',
    base: true,
    styled: true,
    utils: true,
    logs: false,
  },
};
```

---

## 9. View Transitions

### 9.1 Configuration

View Transitions are enabled via `<ViewTransitions />` in BaseLayout (already shown in section 5.1).

### 9.2 Custom Transition Animations

**File: `src/styles/transitions.css`** (import in global.css)
```css
/* Subtle fade transition (default) */
::view-transition-old(root) {
  animation: fade-out 0.2s ease-out;
}

::view-transition-new(root) {
  animation: fade-in 0.3s ease-in;
}

@keyframes fade-out {
  from { opacity: 1; }
  to { opacity: 0; }
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Named transitions for specific elements */
::view-transition-old(hero-name),
::view-transition-new(hero-name) {
  animation-duration: 0.4s;
}

/* Reduce motion for accessibility */
@media (prefers-reduced-motion: reduce) {
  ::view-transition-old(root),
  ::view-transition-new(root) {
    animation: none;
  }
}
```

### 9.3 Usage in Components

Add `transition:name="unique-name"` to elements that should have persistent identity across page navigations:

```astro
<!-- Hero name persists across pages -->
<h1 transition:name="hero-name">{name}</h1>

<!-- Card images morph between list and detail -->
<Image transition:name={`pub-image-${slug}`} ... />
```

---

## 10. Image Optimization

### 10.1 Astro Image Component Usage

All images should use Astro's built-in `<Image />` component:

```astro
---
import { Image } from 'astro:assets';
import profileImage from '@assets/images/profile/user-picture.png';
---

<Image
  src={profileImage}
  alt="Daniele Zago"
  width={400}
  height={400}
  format="webp"
  quality={80}
  loading="eager"  <!-- For above-fold images -->
/>
```

### 10.2 Image Migration Script

Create a script to migrate and organize images:

**File: `scripts/migrate-images.sh`**
```bash
#!/bin/bash

# Create directory structure
mkdir -p src/assets/images/{profile,publications,software,general}

# Copy profile images
cp assets/images/showcase/user-picture*.png src/assets/images/profile/

# Copy publication images
cp assets/images/works/stochapprox/showcase.png src/assets/images/publications/stochapprox-showcase.png
cp assets/images/works/bisection/sacl-boxplot-time.png src/assets/images/publications/bisection-showcase.png
cp assets/images/works/alternative-parameter-learning/showcase.png src/assets/images/publications/alternative-parameter-learning-showcase.png
cp assets/images/works/mixed-monitoring/showcase.png src/assets/images/publications/mixed-monitoring-showcase.png
cp assets/images/works/ovetti/showcase.png src/assets/images/publications/ovetti-showcase.png
cp assets/images/works/lrt-akde/showcase.png src/assets/images/publications/lrt-akde-showcase.png

# Copy software images
cp assets/images/works/software/showcase.png src/assets/images/software/spm-showcase.png

# Copy static files (PDFs, favicons)
cp -r static/pdf public/
cp static/favicon* public/
cp static/android-chrome* public/
cp static/apple-touch-icon.png public/
cp static/site.webmanifest public/

echo "Image migration complete!"
```

### 10.3 Image Optimization Settings

**File: `astro.config.mjs`** (add to config)
```javascript
export default defineConfig({
  // ... other config
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        limitInputPixels: false,
      },
    },
  },
  build: {
    assets: '_assets',
    inlineStylesheets: 'auto',
  },
});
```

---

## 11. Analytics Preparation

### 11.1 Analytics Component (Ready for Future Use)

**File: `src/components/common/Analytics.astro`**
```astro
---
// Simple Analytics integration - disabled by default
// To enable: set PUBLIC_SIMPLE_ANALYTICS_ENABLED=true in .env
const enabled = import.meta.env.PUBLIC_SIMPLE_ANALYTICS_ENABLED === 'true';
---

{enabled && (
  <>
    <script async defer src="https://scripts.simpleanalyticscdn.com/latest.js"></script>
    <noscript>
      <img
        src="https://queue.simpleanalyticscdn.com/noscript.gif"
        alt=""
        referrerpolicy="no-referrer-when-downgrade"
      />
    </noscript>
  </>
)}
```

### 11.2 Integration in BaseLayout

Add to `<head>` section:
```astro
import Analytics from '@components/common/Analytics.astro';
<!-- ... in head ... -->
<Analytics />
```

---

## 12. Deployment Configuration

### 12.1 GitHub Actions Workflow

**File: `.github/workflows/deploy.yml`**
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

env:
  BUILD_PATH: "."

jobs:
  build:
    name: Build
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: npm
          cache-dependency-path: ${{ env.BUILD_PATH }}/package-lock.json

      - name: Setup Pages
        id: pages
        uses: actions/configure-pages@v5

      - name: Install dependencies
        run: npm ci
        working-directory: ${{ env.BUILD_PATH }}

      - name: Build with Astro
        run: |
          npx astro build \
            --site "${{ steps.pages.outputs.origin }}" \
            --base "${{ steps.pages.outputs.base_path }}"
        working-directory: ${{ env.BUILD_PATH }}

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ${{ env.BUILD_PATH }}/dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    needs: build
    runs-on: ubuntu-latest
    name: Deploy
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### 12.2 Astro Configuration for GitHub Pages

**File: `astro.config.mjs`** (update site config)
```javascript
export default defineConfig({
  site: 'https://dedzago.github.io',
  output: 'static', // Use 'static' for GitHub Pages (no Keystatic admin in prod)
  // ... rest of config
});
```

### 12.3 Keystatic for Local Development Only

For GitHub Pages deployment, Keystatic runs only locally. Update the config:

**File: `keystatic.config.ts`**
```typescript
export default config({
  storage: import.meta.env.DEV
    ? { kind: 'local' }
    : { kind: 'github', repo: 'DedZago/DedZago.github.io' },
  // ... rest of config
});
```

---

## 13. Testing & Verification

### 13.1 Development Testing Checklist

```markdown
- [ ] Run `npm run dev` and verify no errors
- [ ] Test all theme options in selector
- [ ] Verify view transitions work smoothly
- [ ] Check responsive design on mobile/tablet/desktop
- [ ] Test all navigation links (header and footer)
- [ ] Verify CV download button works for both languages
- [ ] Check all social links open in new tabs
- [ ] Test Keystatic admin at /keystatic
- [ ] Verify all images load and are optimized
- [ ] Check accessibility with browser dev tools
- [ ] Test print styles
```

### 13.2 Build Testing

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview
```

### 13.3 Lighthouse Audit Targets

| Metric | Target |
|--------|--------|
| Performance | > 90 |
| Accessibility | > 95 |
| Best Practices | > 95 |
| SEO | > 95 |

### 13.4 Cross-Browser Testing

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

---

## 14. File Structure Reference

### 14.1 Complete File Tree

```
dedzago-astro/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── .env.example
├── .gitignore
├── astro.config.mjs
├── keystatic.config.ts
├── package.json
├── tailwind.config.mjs
├── tsconfig.json
├── public/
│   ├── pdf/
│   │   ├── zago_cv_english.pdf
│   │   └── zago_cv_italian.pdf
│   ├── favicon.ico
│   ├── favicon-16x16.png
│   ├── favicon-32x32.png
│   ├── android-chrome-192x192.png
│   ├── android-chrome-512x512.png
│   ├── apple-touch-icon.png
│   ├── safari-pinned-tab.svg
│   ├── mstile-150x150.png
│   ├── browserconfig.xml
│   └── site.webmanifest
├── scripts/
│   └── migrate-images.sh
└── src/
    ├── assets/
    │   └── images/
    │       ├── profile/
    │       │   ├── user-picture.png
    │       │   └── user-picture@2x.png
    │       ├── publications/
    │       │   ├── stochapprox-showcase.png
    │       │   ├── bisection-showcase.png
    │       │   ├── alternative-parameter-learning-showcase.png
    │       │   ├── mixed-monitoring-showcase.png
    │       │   ├── ovetti-showcase.png
    │       │   └── lrt-akde-showcase.png
    │       ├── software/
    │       │   └── spm-showcase.png
    │       └── general/
    ├── components/
    │   ├── common/
    │   │   ├── Analytics.astro
    │   │   ├── Button.astro
    │   │   ├── Card.astro
    │   │   ├── CVDownloadButton.astro
    │   │   ├── SectionHeader.astro
    │   │   └── SocialLinks.astro
    │   ├── icons/
    │   │   └── [SVG icon components]
    │   ├── layout/
    │   │   ├── Footer.astro
    │   │   ├── Header.astro
    │   │   ├── Navigation.astro
    │   │   └── ThemeSelector.astro
    │   └── sections/
    │       ├── Education.astro
    │       ├── Experience.astro
    │       ├── Hero.astro
    │       ├── Presentations.astro
    │       ├── Publications.astro
    │       └── Software.astro
    ├── content/
    │   ├── config.ts
    │   ├── about/
    │   │   └── index.yaml
    │   ├── education/
    │   │   ├── bsc-padova.md
    │   │   ├── infn-school.md
    │   │   ├── msc-padova.md
    │   │   ├── phd-padova.md
    │   │   ├── summer-school-perugia.md
    │   │   └── visiting-florida.md
    │   ├── experience/
    │   │   ├── data-scientist-optit.md
    │   │   └── phd-student.md
    │   ├── presentations/
    │   │   ├── enbis-2025.md
    │   │   ├── informs-2023.md
    │   │   ├── isba-2022.md
    │   │   ├── padova-poster-2022.md
    │   │   └── padova-seminar-2025.md
    │   ├── publications/
    │   │   ├── alternative-parameter-learning.md
    │   │   ├── bisection-algorithm.md
    │   │   ├── complex-geometries-monitoring.md
    │   │   ├── likelihood-ratio-mixed-data.md
    │   │   ├── mixed-data-monitoring.md
    │   │   └── stochastic-optimization-algorithm.md
    │   └── software/
    │       └── statisticalprocessmonitoring-jl.md
    ├── layouts/
    │   ├── BaseLayout.astro
    │   └── MarkdownLayout.astro
    ├── pages/
    │   ├── 404.astro
    │   ├── index.astro
    │   ├── experience/
    │   │   └── [slug].astro
    │   └── publications/
    │       ├── index.astro
    │       └── [slug].astro
    ├── styles/
    │   ├── global.css
    │   └── transitions.css
    └── utils/
        ├── content.ts
        └── date.ts
```

---

## 15. Migration Checklist

### Phase 1: Project Setup ✅ COMPLETE
- [x] Clone Bloomfolio template to new directory
- [x] Remove Bloomfolio git history, initialize fresh repo
- [x] Install dependencies
- [x] Configure `astro.config.mjs`
- [x] Configure `tailwind.config.mjs`
- [x] Set up TypeScript configuration

### Phase 2: Content Schema ✅ COMPLETE
- [x] Create `src/content/config.ts` with all collections
- [x] Configure `keystatic.config.ts`
- [x] Test Keystatic admin locally

### Phase 3: Component Development ✅ COMPLETE
- [x] Create `BaseLayout.astro`
- [x] Create `Header.astro` with navigation
- [x] Create `Footer.astro`
- [x] Create `ThemeSelector.astro`
- [x] Create `Hero.astro` section
- [x] Create `Education.astro` section
- [x] Create `Experience.astro` section
- [x] Create `Publications.astro` section
- [x] Create `Software.astro` section (custom)
- [x] Create `Presentations.astro` section (custom)
- [x] Create `CVDownloadButton.astro`
- [x] Create `SocialLinks.astro`
- [x] Create `Analytics.astro` (prepared for future)

### Phase 4: Content Migration ✅ COMPLETE
- [x] Migrate profile images
- [x] Migrate publication images
- [x] Migrate software images
- [x] Copy static files (PDFs, favicons)
- [x] Create `about/index.yaml`
- [x] Create all education entries
- [x] Create all experience entries
- [x] Create all publication entries
- [x] Create software entry
- [x] Create all presentation entries

### Phase 5: Pages & Routing ✅ COMPLETE
- [x] Create `index.astro` homepage
- [x] Create `publications/index.astro`
- [x] Create `publications/[slug].astro`
- [x] Create `experience/[slug].astro`
- [x] Create `404.astro`

### Phase 6: Styling & Polish ✅ COMPLETE
- [x] Configure global styles
- [x] Set up view transitions
- [ ] Test all 6 themes
- [ ] Verify responsive design
- [ ] Test accessibility

### Phase 7: Deployment ✅ COMPLETE
- [x] Create GitHub Actions workflow
- [x] Test build locally (successful build confirmed)
- [ ] Push to GitHub
- [ ] Verify deployment
- [ ] Run Lighthouse audit

### Phase 8: Final Verification ⏳ IN PROGRESS
- [ ] Test all content displays correctly
- [ ] Verify all links work
- [ ] Test CV downloads
- [ ] Cross-browser testing
- [ ] Mobile testing
- [ ] Performance optimization

---

## Appendix: Quick Commands Reference

```bash
# Development
npm run dev          # Start dev server at localhost:4321
npm run build        # Build for production
npm run preview      # Preview production build

# Keystatic CMS
# Visit http://localhost:4321/keystatic during dev

# Image optimization
# Images are automatically optimized during build

# Deployment
git push origin main  # Triggers GitHub Actions deploy
```

---

**Plan Created:** 2026-02-26
**Target Completion:** Upon approval and implementation
**Estimated Effort:** 8-12 hours of implementation time

---

*This plan provides a complete roadmap for migrating your Hugo site to Astro with Bloomfolio. Each section is self-contained and can be implemented incrementally. The custom sections (Software, Presentations) extend Bloomfolio's base functionality while maintaining consistency with its design patterns.*
