# Fashion Store

A modern, responsive e-commerce website built with Next.js, React, TypeScript, and Tailwind CSS.

## Features

- 🎨 Modern and clean UI design
- 📱 Fully responsive layout
- 🛍️ Product showcase with categories
- 💝 Wishlist functionality
- 🛒 Shopping cart
- 📧 Newsletter subscription
- ⚡ Built with Next.js 14 for optimal performance
- 🎭 Tailwind CSS for styling
- 🔍 Lucide React icons

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

```
fashion-store/
├── src/
│   ├── app/
│   │   ├── layout.tsx       # Root layout with navbar and footer
│   │   ├── page.tsx         # Homepage
│   │   └── globals.css      # Global styles
│   └── components/
│       ├── Navbar.tsx       # Navigation component
│       ├── Footer.tsx       # Footer component
│       ├── Hero.tsx         # Hero section
│       ├── Categories.tsx   # Category showcase
│       ├── FeaturedProducts.tsx  # Product listing
│       ├── ProductCard.tsx  # Individual product card
│       └── Newsletter.tsx   # Newsletter subscription
├── public/                  # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── next.config.js
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Technologies Used

- **Next.js 14** - React framework for production
- **React 18** - JavaScript library for building user interfaces
- **TypeScript** - Typed superset of JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful & consistent icon toolkit

## Customization

### Styling

All styling is done using Tailwind CSS utility classes. You can customize the theme in `tailwind.config.js`.

### Products

Product data is currently hardcoded in the `FeaturedProducts.tsx` component. You can replace this with API calls to your backend or a CMS.

### Images

Product and category images are loaded from Unsplash. Replace these URLs with your own image assets in production.

## Deployment

The easiest way to deploy your Next.js app is to use [Vercel](https://vercel.com):

```bash
npm run build
```

Then deploy to Vercel or any other hosting platform that supports Next.js.

## License

MIT License - feel free to use this project for personal or commercial purposes.
