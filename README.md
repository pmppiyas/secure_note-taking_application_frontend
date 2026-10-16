# 🛡️ Secure Note-Taking & Posts Application — Frontend

[![Live Demo](https://img.shields.io/badge/Live_Demo-notetracker.vercel.app-6366f1?style=for-the-badge&logo=vercel&logoColor=white)](https://notetracker.vercel.app)
[![Next.js 16](<https://img.shields.io/badge/Next.js-16.4.1_(Turbopack)-black?style=for-the-badge&logo=next.js&logoColor=white>)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.3.0-61dafb?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-RTK_Query-764abc?style=for-the-badge&logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

A modern, high-performance web client for **Secure Note-Taking & Community Discussions**, built with **Next.js 16 (Turbopack)**, **React 19**, and **Redux Toolkit (RTK Query)**. Features strict JWT Role-Based Access Control (RBAC), multi-key indexed user interests, private note encryption vaults, and real-time MongoDB aggregation telemetry.

---

## 🌐 Live Deployments

- **Frontend Client**: [https://notetracker.vercel.app](https://notetracker.vercel.app)
- **Backend API Base**: [https://securenote-takingapplicationbeckend.vercel.app](https://securenote-takingapplicationbeckend.vercel.app)

---

## 🔑 Demo Access Credentials

| Role                     | Email               | Password   | Access Scope                                                                           |
| :----------------------- | :------------------ | :--------- | :------------------------------------------------------------------------------------- |
| **System Administrator** | `admin@example.com` | `admin123` | Full Platform Governance, User Management, Aggregation Pipelines, Global Notes & Posts |
| **Standard Contributor** | `user@example.com`  | `user123`  | Personal Encrypted Vault, Community Posts Feed, Profile Interests                      |

_(You can also register a brand new account anytime via the [Registration Page](https://notetracker.vercel.app/auth/register) with customizable multi-key interests)._

---

## ✨ Key Platform Features

### 👤 User Workspace (`/dashboard`)

- **Interactive Overview**: Real-time personalized metrics (Total Personal Notes, Total Published Discussions, Affiliated Interest Categories).
- **Personal Notes Vault (`/dashboard/my-notes`)**:
  - Full CRUD operations (Create, Read, Edit, Delete).
  - Search filtering by note title and content preview.
  - Server-side pagination backed by compound ESR indexing `{ userId: 1, createdAt: -1 }`.
  - Toggleable Grid and Table view modes.
- **My Discussions (`/dashboard/my-posts`)**:
  - Full CRUD management of community discussions.
  - Form validation with Zod and React Hook Form.
- **Community Feed (`/dashboard/posts`)**:
  - Browse platform discussions with real-time `$lookup` author linkage badges.
  - Inspect all posts authored by any specific contributor.

### 🛡️ Admin Governance Hub (`/admin/dashboard`)

- **System Telemetry Overview**: Live metrics tracking Total Registered Users, Total Global Notes, Total Public Posts, and Aggregated Category Counts.
- **User Directory Administration (`/admin/dashboard/manage-users`)**:
  - Create, view, edit roles (`USER` / `ADMIN`), and delete user accounts.
  - Interactive multi-key interest selection pills (`coding`, `design`, `management`, `cloud`, etc.).
  - Fast search filtering across names, emails, roles, and interest arrays.
- **All Users' Notes Registry (`/admin/dashboard/all-notes`)**:
  - Platform-wide note audit with owner identification and compound index lookup.
- **Scenario 1: Interests Analytics (`/admin/dashboard/interests-analytics`)**:
  - Visualizes MongoDB aggregation pipeline: `$match -> $unwind '$interests' -> $group` on multi-key indexed arrays.
  - Displays total matching users and interactive member identification chips per category.
  - Ascending / Descending frequency sorting.
- **Scenario 2: Posts Governance (`/admin/dashboard/posts`)**:
  - Relational aggregation oversight connecting MongoDB user records to published posts via `$lookup`.
- **Admin Personal Vault (`/admin/dashboard/my-notes`)**:
  - Private encrypted scratchpad isolated specifically to administrator accounts.

---

## 🛠️ Technology Stack

| Layer                     | Technologies                                                               |
| :------------------------ | :------------------------------------------------------------------------- |
| **Framework & Engine**    | Next.js 16.4.1 (Turbopack, App Router, React Server & Client Components)   |
| **Core UI Library**       | React 19.3.0, TypeScript 5                                                 |
| **State & Data Fetching** | Redux Toolkit (RTK Query with cache tagging and optimistic re-fetching)    |
| **Styling & Design**      | Tailwind CSS v4, Lucide React Icons                                        |
| **Forms & Validation**    | React Hook Form, Zod v4, `@hookform/resolvers`                             |
| **Auth & Security**       | JWT Authentication, HTTP Cookies (`js-cookie`), Protected Client Routing   |
| **Branding & Assets**     | Custom Vector SVG, Multi-Resolution Favicon (`.ico`), PWA/Apple Touch PNGs |

---

## 📁 Project Architecture & Directory Structure

```text
frontend/
├── public/
│   ├── logo.svg               # Scalable master vector brand logo
│   ├── logo.png               # High-resolution (512x512) brand identity
│   ├── icon.png               # Web app PWA icon (192x192)
│   ├── apple-icon.png         # iOS / Apple touch icon (180x180)
│   └── favicon.ico            # Multi-layer standard favicon (16x16, 32x32, 48x48)
├── src/
│   ├── app/
│   │   ├── (authLayout)/      # Auth pages layout (Sign In, Create Account)
│   │   │   ├── auth/login/
│   │   │   └── auth/register/
│   │   ├── (commonLayout)/    # Public home & community feed layout
│   │   │   └── page.tsx
│   │   ├── (dashboardLayout)/ # Protected workspace layouts
│   │   │   ├── (user)/dashboard/
│   │   │   │   ├── my-notes/  # User private notes vault
│   │   │   │   ├── my-posts/  # User discussions management
│   │   │   │   └── posts/     # Community feed with $lookup
│   │   │   └── admin/dashboard/
│   │   │       ├── all-notes/           # Global notes registry
│   │   │       ├── interests-analytics/ # Scenario 1 Aggregation UI
│   │   │       ├── manage-users/        # User directory & CRUD
│   │   │       ├── my-notes/            # Admin personal vault
│   │   │       └── posts/               # Scenario 2 Posts governance
│   │   ├── layout.tsx         # Root layout with cache-busting icons & metadata
│   │   ├── icon.png           # Next.js App Router dynamic icon
│   │   ├── apple-icon.png     # Next.js App Router dynamic apple icon
│   │   └── favicon.ico        # Next.js App Router root favicon
│   ├── components/
│   │   ├── dashboard/admin/   # Admin modular table components & CRUD modals
│   │   ├── layout/            # Sticky sidebar & responsive dashboard frame
│   │   ├── notes/             # Note creation, view, edit, delete modals
│   │   ├── posts/             # Post edit and deletion modals
│   │   ├── providers/         # Redux provider & ProtectedRoute client boundary
│   │   ├── shared/            # Reusable PageHeader & PaginationControls
│   │   ├── ui/                # Accessible table & UI primitives
│   │   └── Navbar.tsx         # Unified top navigation with mounted hydration guards
│   ├── redux/
│   │   ├── api/               # RTK Query APIs (authApi, noteApi, postApi, userApi, metadataApi)
│   │   ├── slices/            # Auth state slice (JWT token, user profile, logout)
│   │   ├── hooks.ts           # Typed useAppDispatch and useAppSelector
│   │   └── store.ts           # Centralized Redux store configuration
│   ├── constants/             # Predefined interest categories & metadata
│   ├── types/                 # Shared TypeScript interfaces (User, Note, Post, Meta)
│   └── proxy.ts               # API proxy and middleware helpers
├── package.json
└── tsconfig.json
```

---

## 🚀 Getting Started Locally

### 1. Prerequisites

- **Node.js**: v18.17.0 or higher
- **Package Manager**: `npm`, `pnpm`, or `yarn`

### 2. Clone Repository

```bash
git clone https://github.com/your-username/secure-notes-app.git
cd secure-notes-app/frontend
```

### 3. Install Dependencies

```bash
npm install
# or
pnpm install
```

### 4. Configure Environment Variables

Create a `.env.local` file in the `frontend` root:

```env
# Point to your local or deployed backend API
NEXT_PUBLIC_API_BASE_URL=https://securenote-takingapplicationbeckend.vercel.app/api/v1

# Optional: Application base URL for OpenGraph metadata
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 5. Start Development Server

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Available Scripts

| Command         | Action                                                           |
| :-------------- | :--------------------------------------------------------------- |
| `npm run dev`   | Runs the development server with Turbopack fast refresh.         |
| `npm run build` | Builds an optimized production bundle with full static analysis. |
| `npm run start` | Starts the production server.                                    |
| `npm run lint`  | Runs ESLint to check for code quality and style issues.          |

---

## 🔒 Security & Performance Features

- **Strict Client-Side Route Protection**: `<ProtectedRoute />` wrapper blocks unauthorized users and redirects based on JWT authentication and role requirements.
- **Zero Hydration Mismatch**: Uses React `mounted` hydration guards across the dynamic navigation and landing pages to ensure 100% synchronization between SSR and client states.
- **Optimized Static Metadata**: Employs `title: { absolute: '...' }` to enforce single, consistent page branding (`<Page Name> | Secure Note-Taking & Posts App`) without accidental parent template duplication.
- **Asset Cache Invalidation**: Automatic query versioning (`?v=2`) ensures immediate browser tab icon updates without stale browser caching.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
