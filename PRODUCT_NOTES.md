# Aurelia Product Notes

Aurelia is a product and interaction prototype exploring how AI-assisted discovery can feel like a consumer experience rather than a technical demo.

## Product question

Most recommendation interfaces begin with filters. Aurelia explores a different starting point: describe the person, style and context first, then use those signals to shape discovery.

The goal was not to maximize the amount of visible AI. It was to make personalization feel natural inside a premium retail experience.

## Experience principles

### Keep AI in the background

The user should understand what the product does without reading model terminology, prompt language or implementation detail.

### Ask for signals that feel human

Personality, style and occasion are easier to reason about than a long catalog of technical product attributes.

### Motion should support hierarchy

Animation is used to guide attention and reinforce transitions, not to make every component move.

### Mobile-first composition

The layout is designed to retain hierarchy and premium spacing on narrow screens rather than treating mobile as a compressed desktop page.

## Frontend structure

The prototype uses:

- React for component structure
- TypeScript for typed UI state
- Vite for the development/build pipeline
- Tailwind CSS for layout and visual primitives
- Framer Motion for selected transitions
- Lucide React for interface iconography
- localStorage for the self-contained waitlist prototype

A production version would move waitlist and recommendation state to authenticated backend services rather than browser-local persistence.

## What the project demonstrates

- product framing for AI-assisted experiences
- premium consumer-interface hierarchy
- bilingual UX
- responsive React component design
- prototyping without unnecessary backend complexity
- separating proof-of-concept behavior from production architecture

[Back to README](README.md)
