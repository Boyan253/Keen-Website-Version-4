# Development Guide - Keen Agents Website

## Project Structure

```
keen-agents-website/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles and Tailwind imports
│   ├── layout.tsx         # Root layout with metadata
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── Header.tsx         # Navigation header
│   ├── HeroSection.tsx    # Hero section with variants
│   ├── ProductSection.tsx # Product features and value props
│   ├── ProcessSection.tsx # Implementation timeline
│   ├── TestimonialsSection.tsx # Case studies and quotes
│   ├── AboutSection.tsx   # Leadership and company info
│   ├── FAQSection.tsx     # Accordion FAQ
│   ├── AIQuestionnaire.tsx # Interactive quiz
│   ├── Footer.tsx         # Footer with links
│   └── FloatingCTA.tsx    # Floating action buttons
├── public/                # Static assets
│   └── logo-no-text.webp  # Company logo
├── scripts/               # Development scripts
└── README.md             # Project documentation
```

## Key Features Implemented

### 1. Hero Section
- **Primary Variant**: High-conversion, decision-maker focused
- **Risk-Averse Variant**: For conservative buyers
- **Animated Elements**: Floating AI agent visualization
- **Interactive Toggle**: Switch between hero variants
- **Stats Display**: Key metrics with animations

### 2. Product Section
- **Value Propositions**: 4 core value props with icons
- **Feature Cards**: Process automation, customer experience, operational resilience
- **Hover Animations**: Cards lift and scale on hover
- **Gradient Backgrounds**: Brand-consistent color schemes

### 3. Process Section
- **5-Phase Timeline**: Visual implementation process
- **Animated Progress**: Timeline line with phase indicators
- **Role Definitions**: Clear responsibilities breakdown
- **Interactive Elements**: Hover effects and smooth transitions

### 4. Testimonials Section
- **Case Studies**: Detailed Unimaster and Reno examples
- **Metrics Display**: Key performance indicators
- **Quote Cards**: Testimonial pull-quotes
- **Video Placeholder**: Demo call-to-action

### 5. About Section
- **Leadership Bios**: Petar Denev and Vic profiles
- **Company Values**: 4 core values with icons
- **Stats Grid**: Company metrics display
- **Mission Statement**: Brand positioning

### 6. FAQ Section
- **Accordion Interface**: Smooth expand/collapse animations
- **Category Filtering**: Filter by topic (Security, Technical, etc.)
- **Search Functionality**: Easy question discovery
- **Contact Integration**: Direct consultation booking

### 7. AI Questionnaire
- **7-Question Assessment**: Comprehensive readiness check
- **Progress Tracking**: Visual progress bar
- **Scoring System**: High/Medium/Low readiness levels
- **Email Capture**: Lead generation integration
- **Results Display**: Personalized recommendations

## Animation System

### Framer Motion Integration
- **Page Load**: Staggered component animations
- **Scroll Triggers**: Intersection Observer for scroll-based animations
- **Hover Effects**: Interactive element feedback
- **Page Transitions**: Smooth section transitions

### Animation Types
1. **Fade In**: `opacity: 0 → 1`
2. **Slide Up**: `translateY(30px) → 0`
3. **Scale**: `scale(0.8) → 1`
4. **Float**: Continuous floating motion
5. **Glow**: Pulsing glow effects

## Brand Implementation

### Colors
```css
--keen-blue: #04a5fa
--keen-gray: #656565
--keen-white: #ffffff
--keen-gradient-start: #f0f8ff
--keen-gradient-end: #04a5fa
```

### Typography
- **Font Family**: Montserrat (Google Fonts)
- **Weights**: 400 (Regular), 500 (Medium), 600 (Semi Bold), 700 (Bold)
- **Usage**: Semi Bold for headings, Medium for subheadings

### Logo Integration
- **File**: `public/logo-no-text.webp`
- **Usage**: Header logo, favicon, social sharing
- **Format**: WebP for optimal performance

## Performance Optimizations

### Next.js Features
- **App Router**: Latest Next.js routing system
- **Server Components**: Reduced client-side JavaScript
- **Image Optimization**: Automatic WebP conversion
- **Code Splitting**: Automatic bundle optimization

### Animation Performance
- **GPU Acceleration**: Transform-based animations
- **Reduced Motion**: Respects user preferences
- **Lazy Loading**: Animations trigger on scroll
- **Optimized Re-renders**: Minimal state updates

## SEO Implementation

### Metadata
- **Title**: "Keen Agents - AI Employees for Your Business"
- **Description**: Comprehensive meta description
- **Keywords**: AI employees, process automation, etc.
- **Open Graph**: Social media sharing optimization
- **Twitter Cards**: Twitter-specific metadata

### Structured Data
- **Organization**: Company information
- **Service**: AI automation services
- **FAQ**: Question and answer pairs
- **Review**: Customer testimonials

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## Customization Guide

### Adding New Sections
1. Create component in `/components`
2. Add to `/app/page.tsx`
3. Update navigation in `/components/Header.tsx`
4. Add smooth scroll anchor links

### Modifying Animations
1. Update `tailwind.config.js` for new keyframes
2. Modify component-level Framer Motion props
3. Create reusable animation variants
4. Test performance impact

### Styling Changes
1. Update `app/globals.css` for global styles
2. Modify Tailwind classes in components
3. Add new color schemes to `tailwind.config.js`
4. Update brand variables

## Browser Support

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

## Performance Targets

- **Lighthouse Score**: 90+
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

## Deployment

### Vercel (Recommended)
1. Connect GitHub repository
2. Configure build settings
3. Set environment variables
4. Deploy automatically

### Other Platforms
1. Build: `npm run build`
2. Upload `out/` directory
3. Configure server for SPA routing
4. Set up CDN for assets

## Maintenance

### Regular Updates
- **Dependencies**: Monthly security updates
- **Content**: Quarterly content refresh
- **Performance**: Monthly performance audits
- **Analytics**: Weekly conversion tracking

### Monitoring
- **Uptime**: 99.9% target
- **Performance**: Core Web Vitals tracking
- **Errors**: Error boundary implementation
- **Analytics**: User behavior tracking
