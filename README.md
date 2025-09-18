# Keen Agents Website

A modern, animated website for Keen Agents - AI automation solutions company. Built with Next.js, React, TypeScript, and Framer Motion for smooth animations.

## Features

- 🚀 **Modern Tech Stack**: Next.js 14, React 18, TypeScript
- 🎨 **Beautiful Animations**: Framer Motion for smooth, professional animations
- 📱 **Responsive Design**: Mobile-first approach with Tailwind CSS
- ⚡ **Performance Optimized**: Server-side rendering and optimized images
- 🎯 **SEO Ready**: Comprehensive metadata and structured data
- 🧠 **AI Readiness Quiz**: Interactive questionnaire for lead qualification
- 📊 **Analytics Ready**: Google Analytics 4 integration ready

## Sections

1. **Hero Section** - Animated hero with primary and risk-averse variants
2. **Product Section** - Value propositions and feature cards
3. **Process Section** - 5-phase implementation timeline
4. **Testimonials** - Case studies and success stories
5. **About Section** - Leadership team and company values
6. **FAQ Section** - Accordion-style frequently asked questions
7. **AI Questionnaire** - Interactive readiness assessment
8. **Footer** - Contact info and newsletter signup

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd keen-agents-website
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Run the development server
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## Brand Guidelines

The website follows the Keen Agents brand guidelines:

- **Colors**: 
  - Primary Blue: #04a5fa
  - Gray: #656565
  - White: #ffffff
  - Gradient: Blue to light blue

- **Typography**: Montserrat font family
  - Semi Bold for headings
  - Medium for subheadings and body text

- **Logo**: Uses the provided logo-no-text.webp file

## Customization

### Adding New Sections

1. Create a new component in `/components`
2. Import and add to `/app/page.tsx`
3. Add navigation link to `/components/Header.tsx`

### Modifying Animations

Animations are powered by Framer Motion. Modify animation properties in individual components or create reusable animation variants.

### Styling

The project uses Tailwind CSS with custom configuration in `tailwind.config.js`. Custom styles are in `app/globals.css`.

## Performance

- Optimized images with Next.js Image component
- Lazy loading for animations using Intersection Observer
- Server-side rendering for better SEO
- Optimized bundle size with tree shaking

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

© 2024 Keen Agents. All rights reserved.
