# edtorr.com
🛠 Codebase for edtorr.com🌍

```
edtorr.com (Project Root)
├── index.html  → 🌎 Detects user language & redirects  
│   ├── Detects `navigator.language`  
│   ├── Checks against supported languages (`en`, `es`)  
│   ├── Redirects to `/en/`, or `/es/`  
│   ├── Defaults to `/en/` if language is unsupported  
│   │
├── src/en/  → English site
│   ├── index.njk
│   │   ├── extends → layouts/home.njk
│   │   │             ├── extends → layouts/base-header-home.njk
│   │   │             │              ├── extends → layouts/base.njk
│   │   │             │              │             ├── includes → shared/head.njk
│   │   │             │              │             ├── includes → shared/footer.njk
│   │   │             │              │             ├── includes → shared/back-to-top.njk
│   │   │             │              │             ├── includes → shared/script.njk
│   │   │             │              ├── includes → shared/navbar-header-overlay.njk
│   │   │             │              ├── includes → shared/hero-home.njk
│   │   │             │              ├── includes → shared/script-home.njk
│   │   │             ├── includes → shared/sidebar.njk
│   │   │             │              ├── includes → shared/search.njk
│   │   │             │              ├── includes → shared/recent-posts.njk
│   │   │             │              ├── includes → shared/tags-cloud.njk
│   │   ├── includes → shared/posts-list.njk
│   ├── blog.njk  →  
│   │   ├── extends → layouts/blog.njk
│   │   │             ├── extends → layouts/base-header-overlay.njk
│   │   │             │             ├── extends → layouts/base.njk
│   │   │             │             │             ├── includes → shared/head.njk
│   │   │             │             │             ├── includes → shared/header.njk
│   │   │             │             │             ├── includes → shared/footer.njk
│   │   │             │             ├── includes → shared/navbar-header-overlay.njk
│   │   │             │             ├── includes → shared/hero-header-overlay.njk
│   │   │             ├── includes → shared/sidebar.njk
│   │   │             │             ├── includes → shared/search.njk
│   │   │             │             ├── includes → shared/recent-posts.njk
│   │   │             │             ├── includes → shared/tags-cloud.njk
│   │   ├── includes → shared/posts-list.njk
│   │   ├── includes → shared/pagination-blog.njk
│   │                 │
│   ├── src/en/pages/about-me/index.md
│   │   ├── extends → layouts/readme.njk
│   │   │             ├── extends → layouts/base-header-profile.njk
│   │   │             │             ├── extends → layouts/base.njk
│   │   │             │             │             ├── includes → shared/head.njk
│   │   │             │             │             ├── includes → shared/header.njk
│   │   │             │             │             ├── includes → shared/footer.njk
│   │   │             │             ├── includes → shared/navbar-header-overlay.njk 
│   │   │             │             ├── includes → shared/hero-profile.njk
│   │   │             ├── includes → shared/sidebar.njk
│   │   │             │
│   ├── src/en/posts.json  → It used markdowns on src/es/posts/
│   │   ├── extends → layouts/post.njk
│   │   │             ├── extends → layouts/base-header.njk
│   │   │             │             ├── extends → layouts/base.njk
│   │   │             │             │             ├── includes → shared/head.njk
│   │   │             │             │             ├── includes → shared/header.njk
│   │   │             │             │             ├── includes → shared/footer.njk
│   │   │             │             ├── includes → shared/navbar-header-overlay.njk 
│   │   │             │             ├── includes → shared/hero.njk
│   │   │             ├── includes → shared/tag-list.njk
│   │   │             ├── includes → shared/pagination-post.njk
│   │   │             ├── includes → shared/sidebar.njk
│   │   │             │
├── src/es/  → Spanish site  
│   ├── index.njk
│   │   ├── extends → layouts/home.njk
│   │   │             ├── extends → layouts/base-header-home.njk
│   │   │             │              ├── extends → layouts/base.njk
│   │   │             │              │             ├── includes → shared/head.njk
│   │   │             │              │             ├── includes → shared/footer.njk
│   │   │             │              │             ├── includes → shared/back-to-top.njk
│   │   │             │              │             ├── includes → shared/script.njk
│   │   │             │              ├── includes → shared/navbar-header-overlay.njk
│   │   │             │              ├── includes → shared/hero-home.njk
│   │   │             │              ├── includes → shared/script-home.njk
│   │   │             ├── includes → shared/sidebar.njk
│   │   │             │              ├── includes → shared/search.njk
│   │   │             │              ├── includes → shared/recent-posts.njk
│   │   │             │              ├── includes → shared/tags-cloud.njk
│   │   ├── includes → shared/posts-list.njk
│   │   │             │
│   ├── blog.njk  →  
│   │   ├── extends → layouts/blog.njk
│   │   │             ├── extends → layouts/base-header-overlay.njk
│   │   │             │             ├── extends → layouts/base.njk
│   │   │             │             │             ├── includes → shared/head.njk
│   │   │             │             │             ├── includes → shared/header.njk
│   │   │             │             │             ├── includes → shared/footer.njk
│   │   │             │             ├── includes → shared/navbar-header-overlay.njk
│   │   │             │             ├── includes → shared/hero-header-overlay.njk
│   │   │             ├── includes → shared/sidebar.njk
│   │   │             │             ├── includes → shared/search.njk
│   │   │             │             ├── includes → shared/recent-posts.njk
│   │   │             │             ├── includes → shared/tags-cloud.njk
│   │   ├── includes → shared/posts-list.njk
│   │   ├── includes → shared/pagination-blog.njk
│   │   │             │
│   ├── src/es/pages/sobre-mi/index.md
│   │   ├── extends → layouts/readme.njk
│   │   │             ├── extends → layouts/base-header-profile.njk
│   │   │             │             ├── extends → layouts/base.njk
│   │   │             │             │             ├── includes → shared/head.njk
│   │   │             │             │             ├── includes → shared/header.njk
│   │   │             │             │             ├── includes → shared/footer.njk
│   │   │             │             ├── includes → shared/navbar-header-overlay.njk 
│   │   │             │             ├── includes → shared/hero-profile.njk
│   │   │             ├── includes → shared/sidebar.njk
│   ├── src/es/posts/posts.json  → It used markdowns on src/es/posts/ to create the blog posts
│   │   ├── extends → layouts/post.njk
│   │   │             ├── extends → layouts/base-header.njk
│   │   │             │             ├── extends → layouts/base.njk
│   │   │             │             │             ├── includes → shared/head.njk
│   │   │             │             │             ├── includes → shared/header.njk
│   │   │             │             │             ├── includes → shared/footer.njk
│   │   │             │             ├── includes → shared/navbar-header-overlay.njk 
│   │   │             │             ├── includes → shared/hero.njk
│   │   │             ├── includes → shared/tag-list.njk
│   │   │             ├── includes → shared/pagination-post.n
│   │   │             │
└──
```
'''
