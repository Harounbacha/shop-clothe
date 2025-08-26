export const CATEGORIES = [
  { id: 'men', name: 'Men', path: '/men' },
  { id: 'women', name: 'Women', path: '/products/women' },
  { id: 'kids', name: 'Kids', path: '/products/kids' },
  { id: 'accessories', name: 'Accessories', path: '/products/accessories' },
];

export const SIZES = {
  clothing: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  shoes: ['6', '7', '8', '9', '10', '11', '12'],
  accessories: ['One Size'],
};

export const COLORS = [
  { name: 'Black', value: '#000000' },
  { name: 'White', value: '#FFFFFF' },
  { name: 'Navy', value: '#1F2937' },
  { name: 'Gray', value: '#6B7280' },
  { name: 'Red', value: '#EF4444' },
  { name: 'Blue', value: '#3B82F6' },
];

export const SAMPLE_PRODUCTS = [
  {
    id: '1',
    name: 'Classic White T-Shirt',
    description: 'Premium cotton blend t-shirt with a comfortable fit',
    price: 29.99,
    category: 'men' as const,
    images: ['https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['White', 'Black', 'Navy'],
    stock: 50,
    rating: 4.5,
    review_count: 128,
    featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Elegant Summer Dress',
    description: 'Flowing summer dress perfect for any occasion',
    price: 89.99,
    category: 'women' as const,
    images: ['https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg'],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['White', 'Blue', 'Red'],
    stock: 30,
    rating: 4.8,
    review_count: 64,
    featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Kids Colorful Hoodie',
    description: 'Warm and cozy hoodie for children',
    price: 39.99,
    category: 'kids' as const,
    images: ['https://images.pexels.com/photos/5698876/pexels-photo-5698876.jpeg'],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Red', 'Blue', 'Gray'],
    stock: 25,
    rating: 4.3,
    review_count: 42,
    featured: false,
    created_at: new Date().toISOString(),
  },
];