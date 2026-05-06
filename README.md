# NULL//SECTOR — Jekyll Cybersecurity Blog Theme

A dark, terminal-aesthetic Jekyll blog theme designed for security researchers.

## ⚡ Quick Start

### Local Development

```bash
# 1. Install dependencies
gem install bundler
bundle install

# 2. Serve locally
bundle exec jekyll serve --livereload

# 3. Open in browser
open http://localhost:4000
```

### Deploy to GitHub Pages

1. Push this repo to GitHub
2. Go to **Settings → Pages**
3. Set source to **GitHub Actions**
4. The `.github/workflows/deploy.yml` handles the rest

## 📝 Writing Posts

Create files in `_posts/` with the format `YYYY-MM-DD-title.md`:

```markdown
---
layout: post
title: "Your Post Title"
date: 2024-01-20
categories: [Exploit Dev]
tags: [buffer-overflow, linux, gdb]
author: your_handle
severity: critical        # critical | high | medium | info
tldr: "One-sentence summary"
excerpt: "Short description for cards and SEO"
---

Your content here...
```

### Severity Badges

Use the `severity` or `difficulty` front matter to add colored badges:

| Value | Color | Use Case |
|-------|-------|----------|
| `critical` | Red | RCE, critical CVEs |
| `high` | Amber | High-impact vulns |
| `medium` | Green | Medium severity |
| `info` | Blue | Informational |

### TL;DR Box

Add a `tldr` field in front matter to show a highlighted summary box at the top of the post.

## 🎨 Customization

### Site Config (`_config.yml`)

```yaml
title: "YOUR BLOG TITLE"
description: "Your description"
author:
  name: "Your Handle"
  bio: "Your short bio"
  twitter: "yourhandle"
  github: "yourhandle"
  email: "you@example.com"
url: "https://yourusername.github.io"
```

### Colors (CSS variables in `assets/css/main.scss`)

```css
--green:  #00ff88;   /* Primary accent */
--red:    #ff3c5a;   /* Critical/danger */
--amber:  #f5a623;   /* Warning/high */
--blue:   #4da6ff;   /* Info */
```

### Navigation (`_includes/header.html`)

Edit the `<nav>` links to match your desired sections.

## 📂 Structure

```
cyberblog/
├── _config.yml          # Site config
├── _layouts/
│   ├── default.html     # Base layout
│   ├── home.html        # Homepage
│   └── post.html        # Post layout
├── _includes/
│   ├── header.html      # Navigation
│   ├── footer.html      # Footer
│   ├── sidebar.html     # Right sidebar
│   └── post-card.html   # Post card component
├── _posts/              # Your posts go here
├── assets/
│   ├── css/main.scss    # All styles
│   └── js/main.js       # Interactions
├── .github/workflows/   # Auto-deploy
├── index.html           # Homepage
└── about.md             # About page
```

## 🔧 Dependencies

- Jekyll 4.3+
- jekyll-paginate
- jekyll-sitemap
- jekyll-feed
- jekyll-seo-tag

## License

MIT — use freely, attribution appreciated.
