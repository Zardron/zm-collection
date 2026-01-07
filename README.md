# ZM Collection

A modern, full-featured e-commerce platform built with Next.js, specializing in premium beauty products and fashion collections. ZM Collection offers a seamless shopping experience with a comprehensive admin dashboard for managing products, orders, and collections.

## 🚀 Features

### Customer-Facing Features
- **Product Catalog**: Browse beauty products (lip tints, perfumes, serums) and fashion collections (clothing, accessories)
- **Shopping Cart**: Add items to cart with persistent storage using localStorage
- **Product Details**: Detailed product pages with descriptions, features, ingredients, and specifications
- **Collections**: Browse products organized by categories and collections
- **Dark/Light Theme**: Toggle between dark and light themes for comfortable viewing
- **Responsive Design**: Fully responsive layout optimized for all devices
- **Product Search & Filtering**: Find products by category and collection
- **Featured Sections**: Hero section, new arrivals, best sellers, testimonials, and more

### Admin Dashboard
- **Dashboard Overview**: Real-time statistics, sales charts, and activity feed
- **Product Management**: Create, edit, and manage products with detailed information
- **Collection Management**: Organize products into collections and categories
- **Order Management**: Track and process customer orders with status updates
- **Customer Management**: View and manage customer information
- **Analytics**: Sales performance metrics and insights
- **Settings**: Configure store settings, payment methods, shipping, and notifications
- **Low Stock Alerts**: Get notified when products are running low

## 🛠️ Tech Stack

- **Framework**: [Next.js 16.1.1](https://nextjs.org/) with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **Font**: Raleway (Google Fonts)
- **State Management**: React Context API
- **Image Optimization**: Next.js Image component with Unsplash integration

## 📦 Dependencies

### Core Dependencies
- `next`: 16.1.1
- `react`: 19.2.3
- `react-dom`: 19.2.3
- `typescript`: ^5

### UI Libraries
- `@radix-ui/react-dialog`: ^1.1.15
- `@radix-ui/react-dropdown-menu`: ^2.1.16
- `@radix-ui/react-label`: ^2.1.8
- `@radix-ui/react-select`: ^2.2.6
- `@radix-ui/react-slot`: ^1.2.4
- `@radix-ui/react-switch`: ^1.2.6
- `lucide-react`: ^0.562.0

### Utilities
- `class-variance-authority`: ^0.7.1
- `clsx`: ^2.1.1
- `tailwind-merge`: ^3.4.0

## 🏗️ Project Structure

```
zm-collection/
├── app/
│   ├── about/              # About page
│   ├── admin/              # Admin dashboard
│   │   ├── analytics/      # Analytics page
│   │   ├── collections/    # Collection management
│   │   ├── customers/      # Customer management
│   │   ├── notifications/  # Notifications page
│   │   ├── orders/         # Order management
│   │   ├── products/       # Product management
│   │   └── settings/       # Settings page
│   ├── auth/               # Authentication pages
│   │   ├── signin/
│   │   └── signup/
│   ├── cart/               # Shopping cart page
│   ├── collections/        # Collection browsing pages
│   ├── components/         # Reusable components
│   │   ├── admin/          # Admin-specific components
│   │   └── ui/             # UI primitives
│   ├── contexts/           # React contexts
│   │   ├── CartContext.tsx
│   │   └── ThemeContext.tsx
│   ├── contact/            # Contact page
│   ├── data/               # Data files
│   │   ├── collections.ts
│   │   └── products.ts
│   ├── products/           # Product pages
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── lib/                    # Utility functions
│   ├── menu.ts
│   └── utils.ts
├── public/                 # Static assets
│   ├── lip-tint/          # Product images
│   ├── perfume/
│   ├── serum/
│   └── ZM-logo.png
├── next.config.ts          # Next.js configuration
├── tsconfig.json           # TypeScript configuration
└── package.json           # Dependencies
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd zm-collection
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📝 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint to check for code issues

## 🎨 Key Features Explained

### Shopping Cart
The cart functionality is managed through React Context (`CartContext`) and persists data to localStorage. Users can:
- Add products to cart
- Update quantities
- Remove items
- View total items and price

### Theme System
The application supports dark and light themes through `ThemeContext`. The theme preference is managed client-side and provides a consistent color scheme throughout the app.

### Product Data
Products are organized into two main categories:
- **Beauty Products**: Lip tints, perfumes, serums, and makeup items (11 products)
- **Fashion Collections**: Men's and women's clothing, accessories (20 collection items)

### Admin Dashboard
The admin section provides comprehensive management tools:
- Real-time dashboard with sales metrics
- Product and collection CRUD operations
- Order tracking and management
- Customer insights
- Analytics and reporting
- Configurable store settings

## 🔧 Configuration

### Image Optimization
The project is configured to load images from Unsplash. You can modify `next.config.ts` to add additional image domains or use local images from the `public` folder.

### Environment Variables
Currently, the project uses static data. For production, you may want to add:
- Database connection strings
- API keys
- Payment gateway credentials
- Email service configuration

## 🎯 Future Enhancements

Potential improvements for the platform:
- [ ] User authentication and authorization
- [ ] Payment gateway integration
- [ ] Email notifications
- [ ] Product reviews and ratings system
- [ ] Wishlist functionality
- [ ] Advanced search and filtering
- [ ] Multi-language support
- [ ] Inventory management system
- [ ] Shipping integration
- [ ] Analytics integration (Google Analytics, etc.)

## 📄 License

This project is private and proprietary.

## 👥 Contributing

This is a private project. For questions or suggestions, please contact the development team.

---

Built with ❤️ using Next.js and TypeScript
