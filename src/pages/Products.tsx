import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, SlidersHorizontal, X } from 'lucide-react';
import { ProductGrid } from '../components/product/ProductGrid';
import { SAMPLE_PRODUCTS, CATEGORIES, SIZES, COLORS } from '../utils/constants';
import { Product } from '../types';

export function Products() {
  const { category } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [filters, setFilters] = useState({
    priceRange: [0, 200],
    sizes: [] as string[],
    colors: [] as string[],
    rating: 0,
    sortBy: 'featured'
  });

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      let filtered = SAMPLE_PRODUCTS;
      if (category && category !== 'all') {
        filtered = SAMPLE_PRODUCTS.filter(p => p.category === category);
      }
      setProducts(filtered);
      setFilteredProducts(filtered);
      setLoading(false);
    }, 800);
  }, [category]);

  useEffect(() => {
    let filtered = [...products];

    // Apply price filter
    filtered = filtered.filter(p => 
      p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    // Apply size filter
    if (filters.sizes.length > 0) {
      filtered = filtered.filter(p => 
        p.sizes.some(size => filters.sizes.includes(size))
      );
    }

    // Apply color filter
    if (filters.colors.length > 0) {
      filtered = filtered.filter(p => 
        p.colors.some(color => filters.colors.includes(color))
      );
    }

    // Apply rating filter
    if (filters.rating > 0) {
      filtered = filtered.filter(p => p.rating >= filters.rating);
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
      case 'newest':
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
      default: // featured
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    setFilteredProducts(filtered);
  }, [products, filters]);

  const currentCategory = CATEGORIES.find(c => c.id === category);
  const categoryName = currentCategory?.name || 'All Products';

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const toggleArrayFilter = (key: 'sizes' | 'colors', value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter(item => item !== value)
        : [...prev[key], value]
    }));
  };

  const clearFilters = () => {
    setFilters({
      priceRange: [0, 200],
      sizes: [],
      colors: [],
      rating: 0,
      sortBy: 'featured'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {categoryName}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {filteredProducts.length} products found
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Sort Dropdown */}
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              className="px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <AnimatePresence>
            {(showFilters || window.innerWidth >= 1024) && (
              <motion.aside
                initial={{ x: -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                className="fixed lg:static inset-y-0 left-0 z-50 w-80 bg-white dark:bg-gray-800 p-6 overflow-y-auto lg:w-64 border-r border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center justify-between mb-6 lg:hidden">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h2>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Price Range */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Price Range</h3>
                    <div className="space-y-2">
                      <input
                        type="range"
                        min="0"
                        max="200"
                        value={filters.priceRange[1]}
                        onChange={(e) => handleFilterChange('priceRange', [0, parseInt(e.target.value)])}
                        className="w-full"
                      />
                      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                        <span>$0</span>
                        <span>${filters.priceRange[1]}</span>
                      </div>
                    </div>
                  </div>

                  {/* Sizes */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Sizes</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {SIZES.clothing.map(size => (
                        <button
                          key={size}
                          onClick={() => toggleArrayFilter('sizes', size)}
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

                  {/* Colors */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Colors</h3>
                    <div className="grid grid-cols-4 gap-2">
                      {COLORS.map(color => (
                        <button
                          key={color.name}
                          onClick={() => toggleArrayFilter('colors', color.name)}
                          className={`w-8 h-8 rounded-full border-2 transition-all ${
                            filters.colors.includes(color.name)
                              ? 'border-blue-600 scale-110'
                              : 'border-gray-300 dark:border-gray-600 hover:scale-105'
                          }`}
                          style={{ backgroundColor: color.value }}
                          title={color.name}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Rating */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Minimum Rating</h3>
                    <div className="space-y-2">
                      {[4, 3, 2, 1].map(rating => (
                        <button
                          key={rating}
                          onClick={() => handleFilterChange('rating', filters.rating === rating ? 0 : rating)}
                          className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg transition-colors ${
                            filters.rating === rating
                              ? 'bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                              : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                          }`}
                        >
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <span
                                key={i}
                                className={i < rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                          <span className="text-sm">& above</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Clear Filters */}
                  <button
                    onClick={clearFilters}
                    className="w-full px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    Clear all filters
                  </button>
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Main Content */}
          <div className="flex-1">
            <ProductGrid products={filteredProducts} loading={loading} />
          </div>
        </div>
      </div>

      {/* Mobile Filter Overlay */}
      {showFilters && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setShowFilters(false)}
        />
      )}
    </div>
  );
}