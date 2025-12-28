# ZAPRINT Premium Landing Page

A modern, premium landing page for ZAPRINT – Print & Create, featuring a warm industrial studio aesthetic with smooth animations and responsive design.

## ✅ Site Status: FULLY FUNCTIONAL

The site is now working perfectly! You can access it at:
- **Development**: http://localhost:3000/premium-landing
- **Main site**: http://localhost:3000 (existing landing page)

## Features

- **Modern Design**: Warm industrial studio aesthetic with gradient backgrounds and modern styling
- **Smooth Animations**: Scroll-triggered fade-in animations and hover effects
- **Responsive**: Fully responsive design that works on all devices
- **Performance Optimized**: Built with React + TypeScript and Tailwind CSS
- **Accessibility**: Semantic HTML and accessible components
- **Client-Side Interactivity**: Proper Next.js App Router client component

## Usage

### Access the Premium Landing Page
Visit `/premium-landing` to see the new ZAPRINT landing page.

### Replace Main Page (Optional)
To replace the main landing page:
1. Backup the current `app/page.tsx`
2. Rename `app/page-premium.tsx` to `app/page.tsx`

## Visual Design

The landing page features:
- **Hero Section**: Large gradient background with ZAPRINT branding and compelling headline
- **About Section**: Two-column layout with gradient placeholder for studio workspace image
- **Features Section**: Card-based layout with icons and hover effects
- **Showcase Section**: Large gradient background with overlay content
- **CTA Section**: Strong teal background with dual call-to-action buttons
- **Footer**: Clean, branded footer

## Technical Implementation

- **Framework**: React 19.2.3 + TypeScript + Next.js 16.1.0
- **Styling**: Tailwind CSS with custom animations
- **Client Component**: Properly marked with 'use client' directive
- **Animations**: CSS-based scroll animations and hover effects
- **Build**: Successfully builds and runs without errors

## File Structure

```
components/landing/PremiumLanding.tsx  # Main landing page component (Client Component)
app/premium-landing/page.tsx          # Next.js route wrapper
app/page-premium.tsx                  # Alternative main page replacement
tailwind.config.js                   # Extended with custom animations
app/globals.css                      # Additional animation styles
```

## Development Commands

```bash
npm run dev    # Start development server
npm run build  # Build for production
npm start      # Start production server
```

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Graceful degradation for older browsers

## Next Steps

1. **Replace Gradient Placeholders**: Add actual high-quality images of print studio interiors
2. **Customize Content**: Update text content to match your specific brand messaging
3. **Add Functionality**: Connect buttons to actual pages/forms
4. **SEO Optimization**: Add meta tags and structured data