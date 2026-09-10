# Aurelia

> An AI-personalized jewelry discovery concept built as a polished bilingual React experience.

![React](https://img.shields.io/badge/React-frontend-20232A?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-typed%20UI-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-build-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?logo=tailwindcss&logoColor=white)
[![Product notes](https://img.shields.io/badge/docs-product%20notes-181717)](PRODUCT_NOTES.md)

## The idea

Aurelia explores a more personal way of discovering jewelry. Instead of starting with a conventional catalog and dozens of filters, the concept begins with signals about the person receiving or wearing the piece, such as personality, style, appearance and other preferences, then frames the experience around AI-assisted recommendations.

The project was built as a product and interaction prototype rather than a production commerce platform. The goal was to test how a premium brand could communicate personalization without making the interface feel technical or AI-heavy.

## Experience

The landing page includes:

- English and Spanish localization
- a personality/style trait ticker
- responsive mobile-first layouts
- premium visual treatment with subtle motion
- an email waitlist prototype
- reusable React UI structure
- deployment-ready Vite build

The waitlist currently uses `localStorage`, deliberately keeping this repository self-contained. A production version would replace that demo layer with a real API and persistent storage.

## Stack

- **React**
- **TypeScript**
- **Vite**
- **Tailwind CSS**
- **Framer Motion**
- **Lucide React**
- **Cloudflare Pages** compatible deployment

## What this project demonstrates

Aurelia is less about backend complexity and more about product execution. It reflects work around:

- turning an AI concept into a consumer-facing proposition
- bilingual UX and content structure
- responsive component design
- motion used as supporting feedback rather than decoration
- visual hierarchy for premium ecommerce-style products
- fast iteration with a modern TypeScript frontend stack

## Run locally

```bash
pnpm install
pnpm dev
```

`npm` or `yarn` can also be used with the equivalent commands.

## Deployment

The project can be deployed as a static Vite application. For Cloudflare Pages:

```text
Build command: npm run build
Output directory: dist
```

## Status

**Prototype / concept project.**

The original exploration is preserved as part of my product-development portfolio. It is not currently one of my actively developed products.

[Read the product notes](PRODUCT_NOTES.md)
