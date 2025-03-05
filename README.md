# edtorr.com
🛠 Codebase for edtorr.com🌍

```
edtorr.com (Project Root)
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
│       ├── extends → layouts/base.njk
│       │         ├── includes → shared/head.njk
│       │         ├── includes → shared/header.njk
│       │         ├── includes → shared/footer.njk
│       ├── includes → shared/post-header.njk
│       ├── includes → shared/post-footer.njk
│
├── layouts/
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
│       ├── extends → layouts/base.njk
│       ├── includes → shared/post-header.njk
│       ├── includes → shared/post-footer.njk
│
└── shared/
    ├── head.njk
    ├── header.njk
    ├── header-overlay.njk
    ├── footer.njk
    ├── posts-list.njk
    ├── pagination-blog.njk
    ├── hero.njk
    ├── featured-posts.njk
    ├── contact-form.njk
    ├── team.njk
    ├── mission.njk
    ├── post-header.njk
    ├── post-footer.njk
```
'''
