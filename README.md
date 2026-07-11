# triTechies — Software Engineering Studio

triTechies is a software engineering and development studio building premium custom digital systems, dynamic web applications, mobile apps, and robust business automations designed for real-world impact.

This repository hosts the official corporate web platform, engineered with a clean, high-performance tech stack, smooth animated transitions, and custom-tailored layout systems.

---

## 🛠️ Technology Stack

* **Core Framework:** [Next.js 16.2.4 (Turbopack)](https://nextjs.org/) (App Router & Server Component architecture)
* **Frontend Library:** [React 19.2.4](https://react.dev/)
* **Styling Engine:** [Tailwind CSS v4](https://tailwindcss.com/) (fully utilizing inline theme variables and utility classes)
* **Animations:** [Framer Motion 12](https://www.framer.com/motion/) (orchestrating smooth viewport fade-ins, sliding panels, and hover effects)
* **Database & CRM:** [Firebase 12 (Firestore)](https://firebase.google.com/) (powers dynamic case studies, team profiles, and secure contact submissions)
* **Package Manager:** [pnpm](https://pnpm.io/)

---

## ✨ Features & Architecture

### 1. Zero-Bounce Scroll Architecture
* Utilizes a locked-viewport structure (`height: 100%; overflow: hidden; overscroll-behavior-y: none;` on the body) and delegates scrolling to the `<main>` element.
* Prevents viewport overscroll (rubber-banding) on Safari/Chrome across macOS & iOS, giving the site a native, high-end application feel.

### 2. Header Layout & Mobile Dropdown
* The header sits in flex-flow above the scroll area, completely avoiding content overlapping.
* The mobile dropdown menu utilizes `AnimatePresence` for sliding height transitions and overlays a blurred fixed backdrop. Clicking outside the menu closes it instantly.

### 3. Dynamic Sectors & AI Automation
* Highlights process pipelines, tech stacks, and industry sectors (Hospitals, Law Firms, Restaurants, etc.) mapped directly to target pain points.

### 4. Interactive Components & Grayscale transitions
* Team member cards smoothly transition photos from black-and-white to full color on hover.
* Navigation includes unified smooth scrolling using JavaScript `scrollIntoView` for cross-browser anchor compatibility.

---

## 📂 Project Structure

```bash
├── app/                      # Next.js App Router (pages and layouts)
│   ├── globals.css           # Global Tailwind v4 CSS, design tokens & custom utilities
│   ├── layout.tsx            # Main layout wrapper hosting Navbar & Ashna AI chat widget
│   ├── page.tsx              # Homepage composition (Hero, Services, Automation, Work, etc.)
│   ├── about/                # Process page (/about)
│   ├── services/             # Services page (/services)
│   ├── work/                 # Portfolio page (/work)
│   ├── contact/              # Project inquiry page (/contact)
│   └── admintriTechies2026/  # Administrative dashboard space
│
├── src/
│   ├── components/
│   │   ├── sections/         # Segmented page components (Hero, Work, Services, Team, etc.)
│   │   ├── ui/               # Core layout widgets (Navbar, Footer, LiveProjectCard, SectionHeader)
│   │   └── animations/       # Framer Motion transition wrappers (FadeIn)
│   │
│   ├── hooks/                # Custom React hooks (e.g., use-is-in-view)
│   └── lib/
│       ├── firebase.ts       # Firebase app initialization & Firestore client
│       └── utils.ts          # Tailwind class merger utilities
│
└── public/                   # Static media assets, SVG illustrations & configurations
```

---

## 📂 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed and [pnpm](https://pnpm.io/) enabled.

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Configure Environment Variables
Create a `.env` (or `.env.local`) file in the root directory and populate it with your Firebase credentials:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 3. Run Development Server
```bash
pnpm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the site.

To test the **Ashna AI chat widget** locally (which requires a secure connection), start Next.js with HTTPS:
```bash
pnpm next dev --experimental-https
```
Then visit [https://localhost:3000](https://localhost:3000).

### 4. Build for Production
Verify typescript compilation, lint guidelines, and static page output:
```bash
pnpm run build
```

---

## 🔥 Firestore Database Collections

The application queries data from the following Firestore collections:

### 1. `projects`
* **Purpose:** Renders portfolio item cards in the **Work** section.
* **Fields:**
  * `title` (string)
  * `description` (string)
  * `url` (string)
  * `tags` (array of strings)
  * `imageUrl` (string, optional)
  * `createdAt` (timestamp, ordered descending)

### 2. `team`
* **Purpose:** Lists members in the **Team** section.
* **Fields:**
  * `name` (string)
  * `role` (string)
  * `description` (string, optional)
  * `imageUrl` (string)
  * `createdAt` (timestamp, ordered ascending)

### 3. `contacts`
* **Purpose:** Collects submitted project forms from the **Contact** page.
* **Fields:**
  * `name` (string)
  * `email` (string)
  * `phone` (string)
  * `budget` (string)
  * `timeline` (string)
  * `description` (string)
  * `createdAt` (server timestamp)
  * `status` (string, defaults to `"new"`)
