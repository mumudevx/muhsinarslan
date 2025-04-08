# System Patterns: Personal Website

## 1. Architecture

*   **Component-Based:** The entire UI will be constructed using reusable Vue components managed by Nuxt.js. This promotes modularity and maintainability.
*   **Nuxt.js Pages & Layouts:** Utilize Nuxt.js conventions for routing (`pages/` directory) and consistent page structure (`layouts/` directory).
*   **Static Site Generation (SSG):** Leverage Nuxt.js's SSG capabilities for optimal performance and SEO, suitable for GitHub Pages deployment.

## 2. Key Technical Decisions

*   **Nuxt.js over React/Vue:** Chosen for its built-in features simplifying SSR/SSG, routing, and meta tag management, which are beneficial for SEO.
*   **Tailwind CSS:** Preferred for rapid UI development and easy customization to match the design specifications.
*   **GSAP for Animations:** Selected for its power and flexibility in creating the desired smooth animations.

## 3. Design Patterns

*   **Dark Mode:** Implement a site-wide dark theme based on the provided color palette.
*   **Minimalism:** Adhere to the principle of using fewer elements for a clean and focused UI.
*   **Centralized Layout:** Key content areas (like the hero section) will use centered alignment.
*   **Atomic Design Principles (Implicit):** Components will likely follow atomic design ideas (atoms, molecules, organisms) naturally through the use of Vue components.

## 4. Component Relationships

*   **Layouts:** Define the overall page structure (e.g., `default.vue` containing Header, Footer, and `<slot />` for page content).
*   **Pages:** Represent distinct site sections (e.g., `index.vue`, `blog/index.vue`, `gallery.vue`).
*   **Shared Components:** Reusable elements like Buttons, Navigation Links, Cards (for projects/photos/blog posts) will be created in the `components/` directory.
