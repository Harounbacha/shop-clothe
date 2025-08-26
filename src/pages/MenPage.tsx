import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X, ChevronDown, ShoppingBag } from 'lucide-react';
import { ProductGrid } from '../components/product/ProductGrid';
import { useCart } from '../context/CartContext';
import { Product } from '../types';

// Sample men's products data
const MENS_PRODUCTS: Product[] = [
  {
    id: 'men-1',
    name: 'Classic Denim Jacket',
    description: 'Timeless denim jacket crafted from premium cotton',
    price: 89.99,
    category: 'men',
    images: ['https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Blue', 'Black'],
    stock: 25,
    rating: 4.6,
    review_count: 89,
    featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'men-2',
    name: 'Premium Cotton T-Shirt',
    description: 'Soft, breathable cotton tee for everyday comfort',
    price: 29.99,
    category: 'men',
    images: ['https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['White', 'Black', 'Navy', 'Gray'],
    stock: 50,
    rating: 4.5,
    review_count: 156,
    featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'men-3',
    name: 'Slim Fit Chinos',
    description: 'Modern slim-fit chinos for a polished look',
    price: 69.99,
    category: 'men',
    images: ['https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg'],
    sizes: ['30', '32', '34', '36'],
    colors: ['Navy', 'Khaki', 'Black'],
    stock: 30,
    rating: 4.4,
    review_count: 73,
    featured: false,
    created_at: new Date().toISOString(),
  },
  {
    id: 'men-4',
    name: 'Wool Blend Sweater',
    description: 'Cozy wool blend sweater for cooler days',
    price: 79.99,
    category: 'men',
    images: ['https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Gray', 'Navy', 'Black'],
    stock: 20,
    rating: 4.7,
    review_count: 92,
    featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'men-5',
    name: 'Leather Dress Shoes',
    description: 'Handcrafted leather shoes for formal occasions',
    price: 149.99,
    category: 'men',
    images: ['https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg'],
    sizes: ['8', '9', '10', '11', '12'],
    colors: ['Brown', 'Black'],
    stock: 15,
    rating: 4.8,
    review_count: 45,
    featured: false,
    created_at: new Date().toISOString(),
  },
  {
    id: 'men-6',
    name: 'Casual Button-Down Shirt',
    description: 'Versatile button-down shirt for work or weekend',
    price: 49.99,
    category: 'men',
    images: ['https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['White', 'Blue', 'Gray'],
    stock: 35,
    rating: 4.3,
    review_count: 67,
    featured: false,
    created_at: new Date().toISOString(),
  },
  {
    id: 'men-7',
    name: 'Athletic Joggers',
    description: 'Comfortable joggers perfect for workouts or lounging',
    price: 39.99,
    category: 'men',
    images: ['https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Gray', 'Navy'],
    stock: 40,
    rating: 4.2,
    review_count: 134,
    featured: false,
    created_at: new Date().toISOString(),
  },
  {
    id: 'men-8',
    name: 'Winter Parka',
    description: 'Warm, waterproof parka for harsh weather conditions',
    price: 199.99,
    category: 'men',
    images: ['https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg'],
    sizes: ['M', 'L', 'XL'],
    colors: ['Black', 'Navy', 'Green'],
    stock: 12,
    rating: 4.9,
    review_count: 28,
    featured: true,
    created_at: new Date().toISOString(),
  },
];

const CATEGORIES = [
  { id: 'all', name: 'All Items' },
  { id: 'tops', name: 'Tops' },
  { id: 'bottoms', name: 'Bottoms' },
  { id: 'outerwear', name: 'Outerwear' },
  { id: 'accessories', name: 'Accessories' },
];

const SIZES = ['S', 'M', 'L', 'XL', '30', '32', '34', '36', '8', '9', '10', '11', '12'];

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
];

export function MenPage() {
  const [products, setProducts] = useState<Product[]>(MENS_PRODUCTS);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(MENS_PRODUCTS);
  const [loading, setLoading] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    sizes: [] as string[],
    sortBy: 'featured',
  });

  const { addToCart } = useCart();

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, []);

  useEffect(() => {
    let filtered = [...products];

    // Apply search filter
    if (filters.search) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        product.description.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Apply category filter
    if (filters.category !== 'all') {
      // Simple category mapping based on product names/descriptions
      filtered = filtered.filter(product => {
        switch (filters.category) {
          case 'tops':
            return product.name.toLowerCase().includes('shirt') || 
                   product.name.toLowerCase().includes('sweater') ||
                   product.name.toLowerCase().includes('t-shirt');
          case 'bottoms':
            return product.name.toLowerCase().includes('chinos') || 
                   product.name.toLowerCase().includes('joggers') ||
                   product.name.toLowerCase().includes('pants');
          case 'outerwear':
            return product.name.toLowerCase().includes('jacket') || 
                   product.name.toLowerCase().includes('parka') ||
                   product.name.toLowerCase().includes('coat');
          case 'accessories':
            return product.name.toLowerCase().includes('shoes') || 
                   product.name.toLowerCase().includes('belt') ||
                   product.name.toLowerCase().includes('watch');
          default:
            return true;
        }
      });
    }

    // Apply size filter
    if (filters.sizes.length > 0) {
      filtered = filtered.filter(product =>
        product.sizes.some(size => filters.sizes.includes(size))
      );
    }

    // Apply sorting
    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default: // featured
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    setFilteredProducts(filtered);
  }, [products, filters]);

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const toggleSizeFilter = (size: string) => {
    setFilters(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size]
    }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      category: 'all',
      sizes: [],
      sortBy: 'featured',
    });
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1, product.sizes[0], product.colors[0]);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-900 to-gray-700 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg"
            alt="Men's Fashion"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Men's Collection
            </h1>
            <p className="text-xl lg:text-2xl text-gray-200 mb-8">
              Modern, durable, everyday wear designed for the contemporary man
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors inline-flex items-center gap-2"
            >
              Shop Now
              <ShoppingBag className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div id="products" className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex gap-8">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden lg:block w-80 bg-white dark:bg-gray-800 rounded-xl p-6 h-fit sticky top-24 border border-gray-200 dark:border-gray-700">
            <div className="space-y-6">
              {/* Search */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  Search Products
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  Category
                </label>
                <div className="space-y-2">
                  {CATEGORIES.map(category => (
                    <button
                      key={category.id}
                      onClick={() => handleFilterChange('category', category.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        filters.category === category.id
                          ? 'bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400 font-medium'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  Sizes
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {SIZES.map(size => (
                    <button
                      key={size}
                      onClick={() => toggleSizeFilter(size)}
                      className={`px-3 py-2 text-sm border rounded-lg transition-colors ${
                        filters.sizes.includes(size)
                          ? 'border-blue-600 bg-blue-50 text-blue-600 dark:bg-blue-900 dark:text-blue-400'
                          : 'border-gray-200 dark:border-gray-600 hover:border-blue-600 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort By */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  Sort By
                </label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  {SORT_OPTIONS.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Clear Filters */}
              <button
                onClick={clearFilters}
                className="w-full px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors border border-gray-200 dark:border-gray-600 rounded-lg hover:border-blue-600"
              >
                Clear All Filters
              </button>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1">
            {/* Mobile Header */}
            <div className="lg:hidden flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Men's Collection
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {filteredProducts.length} products
                </p>
              </div>
              <button
                onClick={() => setShowMobileFilters(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Filter className="w-4 h-4" />
                Filters
              </button>
            </div>

            {/* Desktop Header */}
            <div className="hidden lg:flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Men's Collection
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  {filteredProducts.length} products found
                </p>
              </div>
            </div>

            {/* Product Grid */}
            <ProductGrid products={filteredProducts} loading={loading} />
          </div>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      <AnimatePresence>
        {showMobileFilters && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 lg:hidden"
              onClick={() => setShowMobileFilters(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed right-0 top-0 h-full w-full max-w-sm bg-white dark:bg-gray-800 z-50 overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Filters
                  </h3>
                  <button
                    onClick={() => setShowMobileFilters(false)}
                    className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Mobile Search */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                      Search Products
                    </label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Search..."
                        value={filters.search}
                        onChange={(e) => handleFilterChange('search', e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>

                  {/* Mobile Category Filter */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                      Category
                    </label>
                    <div className="space-y-2">
                      {CATEGORIES.map(category => (
                        <button
                          key={category.id}
                          onClick={() => handleFilterChange('category', category.id)}
                          className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                            filters.category === category.id
                              ? 'bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400 font-medium'
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                          }`}
                        >
                          {category.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Mobile Size Filter */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                      Sizes
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {SIZES.map(size => (
                        <button
                          key={size}
                          onClick={() => toggleSizeFilter(size)}
                          className={`px-3 py-2 text-sm border rounded-lg transition-colors ${
                            filters.sizes.includes(size)
                              ? 'border-blue-600 bg-blue-50 text-blue-600 dark:bg-blue-900 dark:text-blue-400'
                              : 'border-gray-200 dark:border-gray-600 hover:border-blue-600 text-gray-700 dark:text-gray-300'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Mobile Sort By */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                      Sort By
                    </label>
                    <select
                      value={filters.sortBy}
                      onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      {SORT_OPTIONS.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Mobile Clear Filters */}
                  <button
                    onClick={clearFilters}
                    className="w-full px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors border border-gray-200 dark:border-gray-600 rounded-lg hover:border-blue-600"
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}