# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

OpenFinOps Website - A static marketing website for the OpenFinOps platform (Open Source FinOps Platform for AI/ML Cost Intelligence). This is a fully static site designed for GitHub Pages deployment.

**Live URL**: https://openfinops.org/ (also https://rdmurugan.github.io/openfinopsws/)

## Development Commands

### Local Preview
```bash
# Option 1: Python HTTP Server (recommended)
python -m http.server 8888

# Option 2: Node.js http-server
npx http-server -p 8888

# Option 3: PHP built-in server
php -S localhost:8888
```

Then open: http://localhost:8888

### Deployment

The site is deployed via GitHub Pages:
- **Branch**: main
- **Directory**: / (root)
- Automatically deploys on push to main branch

No build process is required - all files are served statically.

## Architecture

### Site Structure

This is a **100% static website** with no backend dependencies. All interactive features (dashboards, charts) run client-side using JavaScript.

**Core Pages**:
- `index.html` - Landing page with features overview
- `features.html` - Detailed feature descriptions
- `documentation.html` - Getting started guide
- `api.html` - API documentation for all modules
- `intelligent-recommendations.html` - AI-powered recommendations showcase
- `demo.html` - Demo selector page
- `demo/` - Static dashboard demos (overview, cfo, coo, infrastructure)

**Blog**:
- `blog/index.html` - Blog listing
- `blog/*.html` - Individual blog posts

### Technology Stack

- **HTML/CSS/JavaScript** - Pure static files, no framework
- **Chart.js** (via CDN) - Used in demo dashboards for visualizations
- **Font Awesome 6.4.0** - Icons
- **Google Fonts (Inter)** - Typography
- **Google Analytics** (G-GCTB1YQQEM) - With GDPR-compliant consent mode

### CSS Architecture

- `css/style.css` - Main stylesheet with CSS custom properties
- `css/cookie-consent.css` - Cookie consent banner styles

**CSS Variables** (defined in `:root`):
```css
--primary-color: #00d4aa (teal)
--secondary-color: #00a8ff (blue)
--accent-color: #3742fa (indigo)
--dark-bg: #0a0e27
--dark-bg-2: #16213e
--dark-bg-3: #0f3460
--text-primary: #ffffff
--text-secondary: #9ca3af
--text-muted: #6b7280
```

**Key CSS Components**:
- `.navbar` - Fixed navigation with backdrop blur
- `.hero` - Landing page hero section
- `.feature-card` - Feature showcase cards
- `.metric-card` - Dashboard metric displays
- `.chart-card` - Chart containers in demos
- `.code-block` - Code snippet display with copy functionality

### JavaScript Architecture

- `js/main.js` - Core interactive functionality:
  - Mobile menu toggle
  - Smooth scrolling for anchor links
  - Navbar scroll effects
  - Intersection Observer for animations
  - Code block copy-to-clipboard
  - Syntax highlighting for code blocks

- `js/cookie-consent.js` - GDPR cookie consent management

**Demo Dashboards** (`demo/*.html`):
- All demos use Chart.js for client-side data visualization
- Sample data is hardcoded in inline `<script>` tags
- Each dashboard is self-contained with its own styles and chart initialization

### SEO & Meta Tags

All pages include comprehensive SEO optimization:
- Open Graph tags for social sharing
- Twitter Card tags
- JSON-LD structured data (SoftwareApplication schema on index.html)
- Canonical URLs pointing to https://openfinops.org/
- Sitemap at `sitemap.xml`
- Robots.txt configured

### Copyright & Licensing

All files include Apache 2.0 license headers:
```
Copyright (c) 2025 Infinidatum
Author: Duraimurugan Rajamanickam
Licensed under the Apache License, Version 2.0
```

When creating new files, include the full license header (see existing files for template).

## Common Patterns

### Adding a New Page

1. Copy an existing page as template (e.g., `features.html`)
2. Update meta tags (title, description, keywords, og tags, canonical URL)
3. Update navigation menu in the new page
4. Add page to `sitemap.xml` with appropriate priority
5. Update navigation links in all other pages if needed
6. Include Google Analytics snippet with consent mode
7. Add copyright header comment at top

### Adding Demo Dashboards

Demo dashboards are in `demo/` directory. Each:
- Uses Chart.js from CDN
- Contains inline styles for dashboard-specific UI
- Has hardcoded sample data in JavaScript
- Links back to main site with `.back-button` class

### Code Blocks with Copy Functionality

Use this structure for code examples:
```html
<div class="code-block">
    <div class="code-header">
        <span class="code-label">LANGUAGE</span>
        <button class="code-copy-btn" onclick="copyCode(this)">
            <i class="fas fa-copy"></i> Copy
        </button>
    </div>
    <pre><code>Your code here</code></pre>
</div>
```

The `copyCode()` function in `js/main.js` handles the copy functionality.

## Related Resources

- **Main Platform**: https://github.com/rdmurugan/openfinops
- **PyPI Package**: https://pypi.org/project/openfinops/
- **Documentation Files**:
  - `DEPLOYMENT.md` - Deployment instructions
  - `DNS_CONFIGURATION.md` - DNS setup
  - `TROUBLESHOOTING.md` - Common issues
  - `ANALYTICS_SETUP.md` - Analytics configuration
  - `ADVANCED_SEO_STRATEGY.md` - SEO best practices
