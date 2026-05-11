# edtorr.com
Codebase for edtorr.com

 This repository contains the structure and files for the edtorr.com website, a bilingual (English & Spanish) personal site and blog. Below, you'll find an overview of the project structure and how it works.

 ## Table of Contents

- [Technologies Used](#technologies-used)
- [Language Configuration](#language-configuration)
- [Project Structure](#project-structure)
- [How to Run Locally](#how-to-run-locally)
- [Environment Variables](#environment-variables)
  - [Build Environment Variables](#build-environment-variables-used-for-eleventy-build)
  - [Deployment Environment Variables](#deployment-environment-variables-used-by-github-actions)
- [Branching Strategy](#branching-strategy)
- [Deployment](#deployment)
- [Stay Connected](#stay-connected)


 ## Technologies Used

* Eleventy → Static site generator used to build the website
* Nunjucks → Template engine for dynamic content
* HTML, CSS, JavaScript → Core web technologies
* Markdown → Used for blog content

## Language Configuration

The site detects the user's preferred language and redirects them accordingly. Supported languages:

* English (/en/)
* Spanish (/es/)

*If a user's language isn't supported, the site defaults to English (/en/).*

## Project Structure
```
edtorr.com (Project Root)
├── index.html  → Detects user language & redirects  
│   ├── Detects `navigator.language`  
│   ├── Checks against supported languages (`en`, `es`)  
│   ├── Redirects to `/en/`, or `/es/`  
│   └── Defaults to `/en/` if language is unsupported  
│   
├── src/en/  → English site
│   ├── index.njk
│   │   ├── extends → layouts/home.njk
│   │   │             ├── extends → layouts/base-header-home.njk
│   │   │             │              ├── extends → layouts/base.njk
│   │   │             │              │             ├── includes → shared/head.njk
│   │   │             │              │             ├── includes → shared/footer.njk
│   │   │             │              │             ├── includes → shared/back-to-top.njk
│   │   │             │              │             └── includes → shared/script.njk
│   │   │             │              ├── includes → shared/navbar-header-overlay.njk
│   │   │             │              ├── includes → shared/hero-home.njk
│   │   │             │              └── includes → shared/script-home.njk
│   │   │             └── includes → shared/sidebar.njk
│   │   │                            ├── includes → shared/search.njk
│   │   │                            ├── includes → shared/recent-posts.njk
│   │   │                            └── includes → shared/tags-cloud.njk
│   │   └── includes → shared/posts-list.njk
│   │
│   ├── blog.njk  →  
│   │   ├── extends → layouts/blog.njk
│   │   │             ├── extends → layouts/base-header-overlay.njk
│   │   │             │             ├── extends → layouts/base.njk
│   │   │             │             │             ├── includes → shared/head.njk
│   │   │             │             │             ├── includes → shared/header.njk
│   │   │             │             │             └── includes → shared/footer.njk
│   │   │             │             ├── includes → shared/navbar-header-overlay.njk
│   │   │             │             └── includes → shared/hero-header-overlay.njk
│   │   │             └── includes → shared/sidebar.njk
│   │   │                           ├── includes → shared/search.njk
│   │   │                           ├── includes → shared/recent-posts.njk
│   │   │                           └── includes → shared/tags-cloud.njk
│   │   ├── includes → shared/posts-list.njk
│   │   └── includes → shared/pagination-blog.njk
│   │                 │
│   ├── src/en/pages/about-me/index.md
│   │   └── extends → layouts/readme.njk
│   │                 ├── extends → layouts/base-header-profile.njk
│   │                 │             ├── extends → layouts/base.njk
│   │                 │             │             ├── includes → shared/head.njk
│   │                 │             │             ├── includes → shared/header.njk
│   │                 │             │             └── includes → shared/footer.njk
│   │                 │             ├── includes → shared/navbar-header-overlay.njk 
│   │                 │             └── includes → shared/hero-profile.njk
│   │                 └── includes → shared/sidebar.njk
│   │                  
│   └── src/en/posts.json  → It used markdowns on src/es/posts/
│       └── extends → layouts/post.njk
│                     ├── extends → layouts/base-header.njk
│                     │             ├── extends → layouts/base.njk
│                     │             │             ├── includes → shared/head.njk
│                     │             │             ├── includes → shared/header.njk
│                     │             │             └── includes → shared/footer.njk
│                     │             ├── includes → shared/navbar-header-overlay.njk 
│                     │             └── includes → shared/hero.njk
│                     ├── includes → shared/tag-list.njk
│                     ├── includes → shared/pagination-post.njk
│                     └── includes → shared/sidebar.njk
│                      
├── src/es/  → Spanish site  
│   ├── index.njk
│   │   ├── extends → layouts/home.njk
│   │   │             ├── extends → layouts/base-header-home.njk
│   │   │             │              ├── extends → layouts/base.njk
│   │   │             │              │             ├── includes → shared/head.njk
│   │   │             │              │             ├── includes → shared/footer.njk
│   │   │             │              │             ├── includes → shared/back-to-top.njk
│   │   │             │              │             └── includes → shared/script.njk
│   │   │             │              ├── includes → shared/navbar-header-overlay.njk
│   │   │             │              ├── includes → shared/hero-home.njk
│   │   │             │              └── includes → shared/script-home.njk
│   │   │             └── includes → shared/sidebar.njk
│   │   │                            ├── includes → shared/search.njk
│   │   │                            ├── includes → shared/recent-posts.njk
│   │   │                            └── includes → shared/tags-cloud.njk
│   │   └── includes → shared/posts-list.njk
│   │                  
│   ├── blog.njk  →  
│   │   ├── extends → layouts/blog.njk
│   │   │             ├── extends → layouts/base-header-overlay.njk
│   │   │             │             ├── extends → layouts/base.njk
│   │   │             │             │             ├── includes → shared/head.njk
│   │   │             │             │             ├── includes → shared/header.njk
│   │   │             │             │             └── includes → shared/footer.njk
│   │   │             │             ├── includes → shared/navbar-header-overlay.njk
│   │   │             │             └── includes → shared/hero-header-overlay.njk
│   │   │             └── includes → shared/sidebar.njk
│   │   │                           ├── includes → shared/search.njk
│   │   │                           ├── includes → shared/recent-posts.njk
│   │   │                           └── includes → shared/tags-cloud.njk
│   │   ├── includes → shared/posts-list.njk
│   │   └── includes → shared/pagination-blog.njk
│   │                  
│   ├── src/es/pages/sobre-mi/index.md
│   │   └── extends → layouts/readme.njk
│   │                 ├── extends → layouts/base-header-profile.njk
│   │                 │             ├── extends → layouts/base.njk
│   │                 │             │             ├── includes → shared/head.njk
│   │                 │             │             ├── includes → shared/header.njk
│   │                 │             │             └── includes → shared/footer.njk
│   │                 │             ├── includes → shared/navbar-header-overlay.njk 
│   │                 │             └── includes → shared/hero-profile.njk
│   │                 └── includes → shared/sidebar.njk
│   └── src/es/posts/posts.json  → It used markdowns on src/es/posts/ to create the blog posts
│       └── extends → layouts/post.njk
│                     ├── extends → layouts/base-header.njk
│                     │             ├── extends → layouts/base.njk
│                     │             │             ├── includes → shared/head.njk
│                     │             │             ├── includes → shared/header.njk
│                     │             │             └── includes → shared/footer.njk
│                     │             ├── includes → shared/navbar-header-overlay.njk 
│                     │             └── includes → shared/hero.njk
│                     ├── includes → shared/tag-list.njk
│                     └── includes → shared/pagination-post.n
│                     
└── 404.md  → 404 Page
    └── extends → layouts/error.njk
                  ├── extends → layouts/base.njk
                  │             ├── includes → shared/head.njk
                  │             ├── includes → shared/header.njk
                  │             └── includes → shared/footer.njk
                  └── includes → shared/navbar-header-overlay.njk
```


## How to Run Locally

*NodeJS and NPM are required.*

1. Clone the repository

```
git clone https://github.com/your-repo/edtorr.com.git
cd edtorr.com
```

2. Install dependencies (if any)
```
npm install 
```

3. Run the local development server
```
npm run serve

Visit your local site: http://localhost:8080/
```


## Environment Variables

This project requires different environment variables for building and deployment. Ensure they are set in your hosting environment or GitHub Actions secrets.


### Build Environment Variables (Used for Eleventy Build)

These variables are used by Eleventy during the build process:
```
NODE_ENV=production  # Ensures Eleventy creates a production-ready build
```
`NODE_ENV`=production enables optimizations and disables unnecessary development features when running npm run build.

### Deployment Environment Variables (Used by GitHub Actions)
These variables are required for deployment via SSH:

```
SSH_PRIVATE_KEY=your-ssh-key
SSH_USER=your-ssh-username
SSH_HOST=your-server-host
SSH_PORT=your-ssh-port
```
Set these variables in GitHub Actions secrets for automated deployment.


## Branching Strategy

* `main` → Production (Live site, no direct commits)

## Deployment

This site is automatically deployed via GitHub Actions when pushing to main. The deployment process:

1. Build the site using `Eleventy` 
```
npm run build
```

2. Deploy using rsync over SSH.


## Stay Connected

Visit: [edtorr.com](https://edtorr.com)
