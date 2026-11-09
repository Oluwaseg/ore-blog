# Development Roadmap & Technical Architecture

## 1. Project Overview

Build a custom, full-stack editorial publishing platform using Next.js.

The application will provide two primary experiences:

1. Public Website: Allows visitors to discover, read, share and comment on published articles.
2. Admin Dashboard: Allows the publication owner to create, edit, manage and publish articles.

The platform will initially operate as a single-owner publication.

There will be one administrator account responsible for managing the entire publication. Multiple administrative roles, author accounts and reader registration are outside the initial scope.

Brand identity, logo, colours and final website copy will be incorporated when provided.

---

## 2. Technology Stack

| Layer            | Technology                       |
| ---------------- | -------------------------------- |
| Framework        | Next.js (App Router)             |
| Language         | TypeScript                       |
| Styling          | Tailwind CSS                     |
| UI Components    | shadcn/ui                        |
| Database         | PostgreSQL                       |
| ORM              | Prisma                           |
| Authentication   | Credentials-based authentication |
| Rich Text Editor | Tiptap                           |
| Image Storage    | Cloudinary                       |
| Email Service    | Resend                           |
| Validation       | Zod                              |
| Deployment       | Vercel (proposed)                |

The application will use Next.js as both the frontend and backend. A separate Express server is not required.

---

## 3. Application Structure

### A. Public Website

The public-facing website will include:

- Homepage
- Article listing
- Individual article pages
- Categories
- Search functionality
- Author information/profile
- About page
- Contact page
- Newsletter subscription
- Social sharing

### B. Admin Dashboard

The dashboard will provide the publication owner with the following functionality.

**Dashboard Overview**

- Total articles
- Published articles
- Draft articles
- Total newsletter subscribers
- Article views
- Recently published articles

**Article Management**

- Create articles
- Edit articles
- Delete articles
- Save drafts
- Publish articles
- Schedule publications
- Manage article slugs
- Add featured images
- Add SEO metadata
- Assign categories and tags

**Content Editor**

- Rich-text editing using Tiptap
- Headings and paragraphs
- Bold and italic formatting
- Ordered and unordered lists
- Blockquotes
- Links
- Images and media
- Text alignment

**Category Management**

- Create categories
- Edit categories
- Delete categories
- Assign categories to articles

**Media Library**

- Upload images
- Manage uploaded images
- Select images for articles
- Store media through Cloudinary

**Newsletter Management**

- View subscribers
- Manage subscriber records
- Export subscriber lists where necessary

**Comment Management**

- View submitted comments
- Delete inappropriate comments

**Analytics**

- Total article views
- Most-read articles
- Article performance
- Subscriber growth

**Settings**

- Publication information
- Website metadata
- Administrative account settings

---

## 4. Reader Functionality

Readers will not need to register or create accounts.

The website should allow visitors to:

- Browse and read articles freely.
- Search for articles.
- Browse articles by category.
- Share articles through social platforms.
- Like articles.
- Subscribe to the newsletter.
- Submit comments on articles.

### Commenting System

The commenting system will be intentionally simple.

Readers can submit comments without registration.

The comment form will support:

- Display name (optional)
- Username (optional)
- Email address (optional and private)
- Comment content (required)

Comments will be published immediately after submission.

There will be no mandatory registration, approval queue or pre-publication moderation workflow.

The administrator can review published comments and delete inappropriate ones when necessary.

Basic spam protection and rate limiting should be implemented to prevent abuse.

---

## 5. Authentication & Access Control

The initial application will have one administrative account.

Requirements:

- Email and password login.
- Secure password hashing.
- Secure session management.
- Protected admin dashboard routes.
- Server-side authorization checks.
- Logout functionality.
- No public administrator registration.

There will be no role management system.

There will also be no reader authentication or account registration.

---

## 6. Database Architecture

The initial database will use PostgreSQL with Prisma.

### Core Models

**Admin**

- id
- email
- passwordHash
- createdAt
- updatedAt

**Article**

- id
- title
- slug
- excerpt
- content
- featuredImage
- status
- publishedAt
- scheduledAt
- metaTitle
- metaDescription
- createdAt
- updatedAt

**Category**

- id
- name
- slug
- description
- createdAt
- updatedAt

**Tag**

- id
- name
- slug

**ArticleCategory**

- articleId
- categoryId

**ArticleTag**

- articleId
- tagId

**Comment**

- id
- articleId
- displayName (nullable)
- username (nullable)
- email (nullable)
- content
- createdAt
- updatedAt

**Reaction**

- id
- articleId
- identifier
- createdAt

**NewsletterSubscriber**

- id
- email
- status
- subscribedAt
- unsubscribedAt

**ArticleView**

- id
- articleId
- viewedAt

### Database Considerations

- Article slugs must be unique.
- Categories and tags should have unique slugs.
- Comments must belong to existing articles.
- Newsletter subscriber emails should be unique.
- Deleting an article should handle its associated comments and reactions appropriately.
- Database indexes should support common article, category and search queries.

The database should remain simple and extensible.

There is no need to introduce a general User model, reader accounts, role management or multiple author accounts at this stage.

---

## 7. Content Publishing Workflow

Articles will support the following statuses:

- DRAFT
- SCHEDULED
- PUBLISHED
- ARCHIVED

### Publishing Process

1. Administrator creates an article.
2. Administrator adds content, images and metadata.
3. Article can be saved as a draft.
4. Administrator can publish immediately.
5. Administrator can schedule publication for a future date.
6. Published articles become available on the public website.
7. Administrator can edit, archive or delete existing articles.

Scheduled publishing will require a server-side scheduled task or cron job to publish articles when their scheduled time arrives.

---

## 8. Proposed Project Structure

```text
src/
├── app/
│   ├── (public)/
│   │   ├── page.tsx
│   │   ├── articles/
│   │   ├── categories/
│   │   ├── about/
│   │   └── contact/
│   │
│   ├── (auth)/
│   │   └── admin/
│   │       └── login/
│   │
│   ├── admin/
│   │   ├── page.tsx
│   │   ├── articles/
│   │   ├── categories/
│   │   ├── media/
│   │   ├── subscribers/
│   │   ├── comments/
│   │   ├── analytics/
│   │   └── settings/
│   │
│   └── api/
│
├── components/
│   ├── ui/
│   ├── shared/
│   ├── public/
│   └── admin/
│
├── features/
│   ├── auth/
│   ├── articles/
│   ├── categories/
│   ├── comments/
│   ├── newsletter/
│   ├── media/
│   └── analytics/
│
├── lib/
│   ├── db.ts
│   ├── auth.ts
│   └── validations/
│
├── actions/
├── hooks/
└── types/

prisma/
├── schema.prisma
└── migrations/
```

The structure may be adjusted to fit the existing repository conventions.

---

## 9. Development Roadmap

### Phase 1: Project Foundation

- Inspect existing repository.
- Review current dependencies and configurations.
- Establish application structure.
- Configure environment variables.
- Configure PostgreSQL.
- Install and configure Prisma.
- Create initial database schema.
- Run initial migrations.

**Deliverable:** Working Next.js application connected to PostgreSQL.

### Phase 2: Authentication

- Implement administrator login.
- Configure password hashing.
- Implement secure session management.
- Protect administrative routes.
- Implement logout.
- Create initial administrator account securely.

**Deliverable:** Functional and protected admin authentication.

### Phase 3: Admin Dashboard

- Create dashboard layout.
- Implement sidebar navigation.
- Create dashboard overview.
- Implement article management.
- Integrate Tiptap editor.
- Implement draft and publishing workflows.
- Implement category management.
- Implement media uploads.
- Implement scheduled publishing.

**Deliverable:** Functional editorial management dashboard.

### Phase 4: Public Website

- Build homepage.
- Build article listing.
- Build individual article pages.
- Implement category pages.
- Implement article search.
- Implement About and Contact pages.
- Implement article sharing.
- Implement SEO metadata and structured data.

**Deliverable:** Functional public-facing publication website.

### Phase 5: Reader Engagement

- Implement article reactions.
- Implement public commenting.
- Implement comment deletion in the admin dashboard.
- Implement newsletter subscription.
- Integrate email delivery.
- Implement subscriber management.
- Add spam protection and rate limiting.

**Deliverable:** Reader engagement and newsletter functionality.

### Phase 6: Analytics & Optimization

- Implement article view tracking.
- Create basic analytics dashboard.
- Optimize database queries.
- Improve loading performance.
- Implement sitemap and robots.txt.
- Test responsive layouts.
- Conduct security testing.

**Deliverable:** Production-ready application.

### Phase 7: Deployment

- Configure production environment variables.
- Set up production PostgreSQL.
- Configure Cloudinary.
- Configure email delivery.
- Configure deployment.
- Run production database migrations.
- Test authentication and publishing workflows.
- Perform final launch checks.

**Deliverable:** Live publication website.

---

## 10. Security & Reliability Considerations

- Secure administrator authentication.
- Password hashing with a suitable modern algorithm.
- Server-side authorization.
- Input validation and sanitization.
- Protection against SQL injection through Prisma's parameterized queries.
- Rate limiting for public endpoints.
- Spam protection for comments and newsletter forms.
- Secure image upload validation.
- Safe rendering of rich-text content.
- Protection against cross-site scripting.
- Proper handling of email addresses and subscriber data.
- Database backups.
- Error handling and logging.

Comments should be treated as untrusted user-generated content.

The platform should avoid collecting unnecessary personal information, particularly because of the sensitive subject matter.

---

## 11. Future Enhancements

The following features are not part of the initial development scope but may be considered later:

- Multiple administrative accounts.
- Multiple authors and contributors.
- Advanced editorial workflows.
- Anonymous story submissions.
- Dedicated reader accounts.
- Advanced newsletter campaigns.
- Advanced analytics.
- Donation functionality.
- Additional community features.

These should only be introduced when there is a clear business or operational need.

---

## 12. Development Principles

1. Keep the architecture simple and maintainable.
2. Avoid unnecessary dependencies.
3. Build reusable components.
4. Prioritize functionality before unnecessary abstraction.
5. Maintain proper TypeScript types.
6. Validate inputs on the server.
7. Use database migrations for schema changes.
8. Keep public and administrative experiences logically separated.
9. Build with mobile responsiveness in mind.
10. Make branding and publication content configurable.

**Initial Development Priority:** Project foundation → Database → Authentication → Admin Dashboard → Article Management → Public Website → Reader Engagement.
