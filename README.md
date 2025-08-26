# StyleShop - Modern E-commerce Platform

A premium, modern e-commerce platform built with React, TypeScript, and Tailwind CSS. Features a clean, responsive design with dark/light mode support, shopping cart functionality, and user authentication.

## ✨ Features

### 🛍️ Core E-commerce Features
- **Product Catalog**: Browse products by category (Men, Women, Kids, Accessories)
- **Advanced Search & Filtering**: Filter by price, size, color, rating
- **Shopping Cart**: Persistent cart with add/remove/update functionality
- **User Authentication**: Sign up, login with Supabase Auth
- **Responsive Design**: Mobile-first approach with smooth animations

### 🎨 Design & UX
- **Modern UI**: Clean, minimalist design with premium aesthetics
- **Dark/Light Mode**: Seamless theme switching with system preference detection
- **Smooth Animations**: Framer Motion powered micro-interactions
- **Mobile Optimized**: Perfect experience across all devices
- **Accessibility**: WCAG compliant with proper focus management

### 🛠️ Technical Features
- **TypeScript**: Fully typed for better development experience
- **Context API**: State management for cart, auth, and theme
- **React Router**: Client-side routing with protected routes
- **Hot Toast**: Beautiful notification system
- **Tailwind CSS**: Utility-first styling with custom design system

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd styleshop
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_url_here
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 📱 Usage

### Customer Features
1. **Browse Products**: Explore different categories and use filters
2. **Add to Cart**: Select size/color and add items to cart
3. **Manage Cart**: View cart sidebar, update quantities, remove items
4. **Account**: Sign up/login to save your preferences
5. **Checkout**: Proceed to checkout (payment integration placeholder)

### Theme Switching
- Click the sun/moon icon in the header
- System preference is automatically detected
- Theme persists across sessions

## 🏗️ Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── common/          # Header, Footer, shared components
│   ├── product/         # Product-related components
│   ├── cart/            # Shopping cart components
│   └── auth/            # Authentication components
├── context/             # React Context providers
│   ├── AuthContext.tsx  # Authentication state
│   ├── CartContext.tsx  # Shopping cart state
│   └── ThemeContext.tsx # Theme management
├── pages/               # Page components
├── types/               # TypeScript type definitions
├── utils/               # Utility functions and constants
└── styles/              # Global styles and Tailwind config
```

## 🎯 Key Components

### Product Management
- **ProductCard**: Individual product display with hover effects
- **ProductGrid**: Responsive grid layout with loading states
- **Filters**: Advanced filtering system with real-time updates

### Shopping Cart
- **CartContext**: Global cart state management
- **CartSidebar**: Slide-out cart with item management
- **Persistent Storage**: Cart survives page refreshes

### Authentication
- **Supabase Integration**: Secure authentication system
- **Protected Routes**: Role-based access control
- **User Management**: Profile and order history

## 🎨 Design System

### Colors
- **Primary**: Blue (#2563eb) - Main brand color
- **Secondary**: Teal (#0d9488) - Accent color
- **Accent**: Orange (#f97316) - Call-to-action color
- **Success/Warning/Error**: Semantic colors for feedback

### Typography
- **Headings**: 120% line height, bold weights
- **Body**: 150% line height for readability
- **Font Stack**: Inter, system-ui, sans-serif

### Spacing
- **8px Grid System**: Consistent spacing throughout
- **Responsive Breakpoints**: Mobile (< 768px), Tablet (768-1024px), Desktop (> 1024px)

## 🔧 Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Code Quality
- **ESLint**: Configured with React and TypeScript rules
- **TypeScript**: Strict mode enabled for better type safety
- **Prettier**: Code formatting (configure as needed)

## 📦 Deployment

### Build for Production
```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Environment Setup
Ensure all environment variables are properly set in your deployment platform:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## 🔮 Future Enhancements

### Phase 2 Features
- **Product Reviews**: User ratings and reviews system
- **Wishlist**: Save products for later
- **Order Management**: Complete order tracking
- **Payment Integration**: Stripe/PayPal integration
- **Admin Panel**: Product and order management

### Technical Improvements
- **PWA**: Progressive Web App capabilities
- **SEO**: Server-side rendering with Next.js
- **Testing**: Unit and integration tests
- **Performance**: Image optimization and lazy loading

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Pexels**: High-quality product images
- **Lucide React**: Beautiful icon library
- **Framer Motion**: Smooth animations
- **Tailwind CSS**: Utility-first CSS framework
- **Supabase**: Backend-as-a-Service platform

---

Built with ❤️ using modern web technologies for the best shopping experience.