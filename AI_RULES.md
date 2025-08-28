# AI Rules for Samyun Wan Armenia Application

This document outlines the core technologies and library usage guidelines for developing the Samyun Wan Armenia web application. Adhering to these rules ensures consistency, maintainability, and optimal performance.

## Tech Stack Description

*   **React**: The application is built using React for a component-based UI architecture.
*   **TypeScript**: All new components and logic should be written in TypeScript for better type safety and developer experience.
*   **Tailwind CSS**: Styling is handled exclusively with Tailwind CSS, utilizing its utility-first classes for responsive and consistent design.
*   **Vite**: The project uses Vite as its build tool for a fast development experience and optimized production builds.
*   **React Router**: For client-side navigation and routing between different views of the application.
*   **shadcn/ui**: A collection of beautifully designed, accessible, and customizable UI components built with Radix UI and Tailwind CSS.
*   **Lucide React**: Used for incorporating a wide range of vector icons into the application.
*   **Framer Motion**: Available for implementing declarative and performant animations.
*   **React Intersection Observer**: Utilized for detecting when elements enter or exit the viewport, enabling scroll-based animations and lazy loading.
*   **React Helmet Async**: Manages document head tags for SEO and dynamic metadata updates.

## Library Usage Rules

To maintain consistency and leverage the strengths of our chosen libraries, please follow these guidelines:

*   **Styling**:
    *   **ALWAYS** use Tailwind CSS for all styling. Avoid inline styles or custom CSS files unless absolutely necessary for very specific, non-Tailwindable properties.
    *   Utilize Tailwind's responsive utilities (`sm:`, `md:`, `lg:`, etc.) for all responsive designs.
*   **UI Components**:
    *   **PRIORITIZE** using components from `shadcn/ui` for common UI elements (buttons, cards, forms, etc.).
    *   If a `shadcn/ui` component doesn't fit the exact requirement or needs significant customization, create a new, custom component in `src/components/` that uses Tailwind CSS. **Do not modify `shadcn/ui` source files directly.**
*   **Icons**:
    *   **ALWAYS** use icons from the `lucide-react` library.
*   **Routing**:
    *   Implement client-side routing using **React Router**.
    *   All primary application routes should be defined and managed within `src/App.tsx`.
*   **Animations**:
    *   For complex, interactive, or gesture-driven animations, use **Framer Motion**.
    *   For simpler animations (e.g., hover effects, basic transitions, fade-ins), leverage Tailwind CSS utility classes or custom CSS keyframes defined in `src/index.css`.
*   **Scroll Effects**:
    *   For detecting element visibility or triggering animations based on scroll position, use `react-intersection-observer`.
*   **SEO & Head Management**:
    *   For dynamically updating `<head>` elements (like `title`, `meta` tags), use `react-helmet-async`.
*   **File Structure**:
    *   New components should be created in `src/components/`.
    *   New pages should be created in `src/pages/`.
    *   All directory names must be lowercase (e.g., `src/pages`, `src/components`).
*   **Code Quality**:
    *   Write clean, readable, and well-commented TypeScript code.
    *   Ensure all new features are fully functional and do not contain placeholders or `TODO` comments.
    *   Prioritize creating small, focused components and files (ideally under 100 lines of code per component).