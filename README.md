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
│   │
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
│   │   │
│   ├── src/en/posts/  
│   │
├── src/es/  → Spanish site  
│   ├── blog.njk  →  layouts/blog.njk
│   │                 ├── extends → layouts/base-header-overlay.njk
│   │                 │                 ├── extends → layouts/base.njk
│   │                 │                 │         ├── includes → shared/head.njk
│   │                 │                 │         ├── includes → shared/header.njk
│   │                 │                 │         ├── includes → shared/footer.njk
│   │                 │                 ├── includes → shared/header-overlay.njk
│   │                 │                 ├── includes → shared/footer.njk
│   │                 ├── includes → shared/posts-list.njk
│   │                 ├── includes → shared/pagination-blog.njk
│   ├── index.njk → layouts/home.njk  
│   ├── contact.njk → layouts/contact.njk  
│   ├── about.njk → layouts/about.njk  
│   ├── posts/  
│
├── src/en/
│   ├── blog.njk  →  layouts/blog.njk
│   │                 ├── extends → layouts/base-header-overlay.njk
│   │                 │                 ├── extends → layouts/base.njk
│   │                 │                 │         ├── includes → shared/head.njk
│   │                 │                 │         ├── includes → shared/header.njk
│   │                 │                 │         ├── includes → shared/footer.njk
│   │                 │                 ├── includes → shared/header-overlay.njk
│   │                 │                 ├── includes → shared/footer.njk
│   │                 ├── includes → shared/posts-list.njk
│   │                 ├── includes → shared/pagination-blog.njk
│   │
│   ├── index.njk  →  layouts/home.njk
│   │                 ├── extends → layouts/base.njk
│   │                 │         ├── includes → shared/head.njk
│   │                 │         ├── includes → shared/header.njk
│   │                 │         ├── includes → shared/footer.njk
│   │                 ├── includes → shared/hero.njk
│   │                 ├── includes → shared/featured-posts.njk
│   │
│   ├── contact.njk  →  layouts/contact.njk
│   │                    ├── extends → layouts/base.njk
│   │                    │         ├── includes → shared/head.njk
│   │                    │         ├── includes → shared/header.njk
│   │                    │         ├── includes → shared/footer.njk
│   │                    ├── includes → shared/contact-form.njk
│   │
│   ├── about.njk  →  layouts/about.njk
│   │                 ├── extends → layouts/base.njk
│   │                 │         ├── includes → shared/head.njk
│   │                 │         ├── includes → shared/header.njk
│   │                 │         ├── includes → shared/footer.njk
│   │                 ├── includes → shared/team.njk
│   │                 ├── includes → shared/mission.njk
│   │
│   ├── posts/post1.njk  →  layouts/post.njk
│   │   ├── extends → layouts/base.njk
│   │   │         ├── includes → shared/head.njk
│   │   │         ├── includes → shared/header.njk
│   │   │         ├── includes → shared/footer.njk
│   │   ├── includes → shared/post-header.njk
│   │   ├── includes → shared/post-footer.njk
│
├── src/_include/layouts/
│   ├── base.njk
│   │   ├── includes → shared/head.njk
│   │   ├── includes → shared/header.njk
│   │   ├── includes → shared/footer.njk
│   │
│   ├── base-header-overlay.njk
│   │   ├── extends → layouts/base.njk
│   │   ├── includes → shared/header-overlay.njk
│   │   ├── includes → shared/footer.njk
│   │
│   ├── blog.njk
│   │   ├── extends → layouts/base-header-overlay.njk
│   │   ├── includes → shared/posts-list.njk
│   │   ├── includes → shared/pagination-blog.njk
│   │
│   ├── home.njk
│   │   ├── extends → layouts/base.njk
│   │   ├── includes → shared/hero.njk
│   │   ├── includes → shared/featured-posts.njk
│   │
│   ├── contact.njk
│   │   ├── extends → layouts/base.njk
│   │   ├── includes → shared/contact-form.njk
│   │
│   ├── about.njk
│   │   ├── extends → layouts/base.njk
│   │   ├── includes → shared/team.njk
│   │   ├── includes → shared/mission.njk
│   │
│   ├── post.njk
│   │   ├── extends → layouts/base.njk
│   │   ├── includes → shared/post-header.njk
│   │   ├── includes → shared/post-footer.njk
│
├── src/_include/shared/
│   ├── head.njk
│   ├── header.njk
│   ├── header-overlay.njk
│   ├── footer.njk
│   ├── posts-list.njk
│   ├── pagination-blog.njk
│   ├── hero.njk
│   ├── featured-posts.njk
│   ├── contact-form.njk
│   ├── team.njk
│   ├── mission.njk
│   ├── post-header.njk
│   ├── post-footer.njk
│
├── about-me.html  → 🌎 Detects user language & redirects  
│     ├── Detects `navigator.language`  
│     ├── Checks against supported languages (`en`, `es`)  
│     ├── Redirects to `/en/pages/about-me/`, or `/es//pages/sobre-mi/`  
│     ├── Defaults to `/en/` if language is unsupported  
└──
```
'''
