# Demo Model School & College Website

A high-performance, modern educational institution website built with the latest web technologies. This project is designed to provide a seamless experience for students, parents, and faculty while maintaining a professional and accessible digital presence.

## 🚀 Tech Stack

- **Framework:** [Next.js 16 (App Router)](https://nextjs.org/)
- **Library:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/) with CSS Variable-based Theming
- **Language:** [TypeScript 5](https://www.typescriptlang.org/)
- **PDF Generation:** [@react-pdf/renderer](https://react-pdf.org/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Testing:** [Vitest](https://vitest.dev/) & React Testing Library
- **Linting:** [ESLint 9](https://eslint.org/)

## ✨ Key Features

- **📝 Online Admission Portal:** Complete SPA-style multi-step application system with save-as-draft functionality (via localStorage) and real-time procedure tracking.
- **🎓 Student Portal:** Personalized dashboard for enrolled students to check **Ladder-Style Attendance**, historical results (GPA/Standings), and manage institutional fee payments.
- **👨‍👩‍👧 Guardian Portal:** Dedicated parent-access hub to monitor multiple children's academic progress, attendance alerts, and financial status.
- **💬 Review System:** Integrated feedback mechanism for guardians to share institutional insights, dynamically showcased on the homepage.
- **📄 Professional PDF Engine:** Automated generation of official **Mark Sheets**, **Payment Receipts**, **Routines**, and **Notices** featuring an authentic institutional seal.
- **🌐 Internationalization (i18n):** Full support for English and Bengali languages via a custom `LanguageProvider` and `useLanguage` hook.
- **🧪 Mock Persistence:** Entire state management for portals is handled via custom React Contexts and `localStorage`, providing a full-featured experience without requiring a backend for the template.
- **📱 Responsive Design:** Mobile-first approach ensuring compatibility across all device sizes (320px to 1440px+).
- **🎨 Custom Theming:** Semantic green/slate school-themed palette defined in `globals.css` using Tailwind 4 `@theme`.
- **📰 Dynamic Notice Board:** Real-time updates ticker and structured notice display powered by a centralized JSON database.

## 📁 Project Structure

```text
src/
├── app/               # Next.js App Router (pages & layouts)
├── components/        # UI Components
│   ├── home/          # Homepage-specific sections
│   ├── guardian/      # Parent portal components
│   ├── student/       # Student portal components
│   ├── layout/        # Global Layout (Navbar, Topbar, Footer)
│   └── ui/            # Reusable UI primitives
├── data/              # Centralized JSON database & content
├── lib/               # Utilities, hooks, and context
│   ├── pdf/           # PDF Generation templates
│   ├── LanguageContext.tsx # i18n implementation
│   ├── hooks.ts       # Custom React hooks (e.g., useScrollReveal)
│   └── utils.ts       # Tailwind merging and class utilities
└── messages/          # Locale translation files (JSON)
```

## 🛠️ Getting Started

### Prerequisites

- Node.js (Latest LTS recommended)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/TM-Mehrab-Hasan/Educational-Institute-Website-Template.git

# Install dependencies
npm install
```

### Development

```bash
# Run the development server
npm run dev

# Run tests
npm test

# Build for production
npm run build

# Lint the project
npm run lint
```

## 🌍 Internationalization (i18n)

The project uses a custom context-based translation system. To add or modify translations, edit the files in the `messages/` directory.

**Usage in components:**

```tsx
import { useLanguage } from '@/lib/LanguageContext';

const MyComponent = () => {
  const { t } = useLanguage();
  return <h1>{t('nav.home')}</h1>;
};
```

## 🎨 Styling Convention

We use **Tailwind CSS 4** with the `@theme` directive. Semantic colors are mapped to CSS variables in `src/app/globals.css`:

- `--color-brand-primary`: Primary action color (Green)
- `--color-brand-secondary`: Secondary accents (Darker Green)
- `--color-ui-bg`: Main background (Slate-50)
- `--color-text-main`: Primary text (Slate-900)

Avoid using arbitrary hex codes in components; prefer the semantic tokens defined in the theme.

## 🧪 Testing

Testing is handled by **Vitest**. All new features should include unit tests in `*.test.tsx` files colocated with the source or in the `tests/` directory.

---
© 2026 Demo Model School & College. All Rights Reserved.
