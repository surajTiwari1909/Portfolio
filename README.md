# Suraj Tiwari — Portfolio

A responsive personal portfolio built with React 19 and Vite. The design uses a charcoal and olive palette, warm apricot accents, editorial typography, and an interactive architecture illustration.

## Run locally

Requires Node.js 20.19+ or a recent Node.js LTS release.

```sh
npm ci
npm run dev
```

Vite prints the local preview address. To build and preview production output:

```sh
npm run build
npm run preview
```

## Features

- Responsive desktop and mobile navigation, active section highlighting, and keyboard support.
- Interactive frontend, backend, and data nodes in the hero illustration.
- Project category filters, GitHub source links, and a FoodExpress live link.
- Interactive terminal between About and Experience with command history, mobile command buttons, accessible output, and working project/contact/resume links.
- Experience timeline, skills, education, and certifications from the supplied resume.
- Downloadable resume, email contact, copy-email feedback, and social links.
- Reduced-motion support, focus indicators, skip navigation, and descriptive metadata.

## Update content

- `src/App.jsx`: work history, skills, and page sections.
- `src/portfolioData.js`: shared project records and contact details.
- `src/components/PortfolioTerminal.jsx`: terminal interface and command history.
- `src/components/terminalCommands.js`: supported commands and responses.
- `src/components/PortfolioTerminal.css`: terminal styling and responsive layouts.
- `src/App.css`: component styles and responsive layouts.
- `src/index.css`: fonts, palette, base styles, and reduced-motion preferences.
- `public/resume/Suraj_Tiwari.pdf`: downloadable resume.
- `public/Data/resume/profilepic.jpeg`: existing portrait.
- `index.html`: search and social metadata.

Project thumbnails are original CSS concept illustrations, not screenshots of the applications. Project details were checked against the supplied resume and public GitHub repositories on September 20, 2026. QuizGenie is explicitly marked as in development. No confidential employer source code is included.

The contact link opens an email client. Copy email uses the browser clipboard API and displays a fallback message if clipboard access is unavailable. There is no contact-form backend. Google Fonts is optional; local font fallbacks keep the page usable without it.

## Verification status

The production build, ESLint checks for the updated application and terminal modules, command-response checks, and whitespace checks passed. Command checks cover normalization, blank input, clear, links, downloads, and unsupported input. Browser interaction and visual checks remain unverified because starting the local preview server was declined. Existing unused legacy components remain in `src/components`; they are not imported by the new application.

## Terminal commands

Use `help`, `about`, `skills`, `projects`, `experience`, `contact`, `resume`, or `clear`. Enter runs a command, and the up/down arrows recall previous commands while preserving a draft. Clickable command buttons work without opening the mobile keyboard. The terminal is a client-side portfolio explorer; it does not execute shell commands. History lasts only for the current page session.
