# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a Hugo static site that serves as Daniele Zago's personal website, showcasing his work as a Data Scientist. The site is built using the "adritian-free-hugo-theme" Hugo theme and deployed to GitHub Pages.

## Development Commands

### Prerequisites
- Hugo installed (extended version recommended)
- Node.js and npm for PostCSS processing
- PostCSS dependencies: `npm i -D postcss postcss-cli autoprefixer`

### Core Commands
- **Start development server**: `hugo server -D`
  - Serves the site at http://localhost:1313/
  - `-D` flag includes draft content
  - Auto-reloads on file changes

- **Build for production**: `hugo`
  - Generates static files in the `public/` directory
  - Use `hugo --minify` for minified output

- **Create new content**:
  - Experience: `hugo new experience/experience-name.md`
  - Project: `hugo new projects/project-name.md`
  - Client work: `hugo new client-work/client-name.md`

### CSS Processing
The theme uses PostCSS for CSS processing with autoprefixer. CSS files are processed through Hugo's asset pipeline.

## Architecture

### Directory Structure
- `content/`: Markdown content files organized by content type
  - `experience/`: Work experience entries
  - `projects/`: Research projects and publications
  - `client-work/`: Client work showcases
- `data/homepage.yml`: Main homepage configuration and content
- `hugo.toml`: Hugo configuration file
- `assets/`: Theme assets (CSS, JS, images)
- `static/`: Static files (PDFs, favicons, etc.)
- `themes/adritian-free-hugo-theme/`: Hugo theme files

### Content Types
1. **Experience**: Professional work history with duration, company, location
2. **Projects**: Research projects and publications with showcase images
3. **Client Work**: Client projects and collaborations

### Key Configuration
- Site configuration in `hugo.toml`
- Homepage content and structure defined in `data/homepage.yml`
- Theme sections: showcase, about, education, experience, publications, contact
- Navigation menus configured in `hugo.toml`

### Content Management
- Homepage content (showcase, about, education sections) managed through `data/homepage.yml`
- Experience items have individual pages and are displayed on homepage (limited by `homepageExperienceCount`)
- Projects are displayed in the publications section
- Images stored in `assets/images/` and `static/` directories

### Theme Features
- Bootstrap 5 responsive design
- Hugo assets pipeline for CSS/JS processing
- Contact form integration (currently disabled)
- Google Analytics/Tag Manager support (currently disabled)
- Newsletter subscription (currently disabled)

## Deployment
The site is deployed to GitHub Pages. The `public/` directory contains the generated static files.