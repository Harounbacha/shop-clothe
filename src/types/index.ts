export interface User {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  role: 'customer' | 'admin';
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'men' | 'women' | 'kids' | 'accessories';
  images: string[];
  sizes: string[];
  colors: string[];
  stock: number;
  rating: number;
  review_count: number;
  featured: boolean;
  created_at: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  color: string;
}

export interface Review {
  id: string;
  product_id: string;
  user_id: string;
  user_name: string;
  rating: number;
  comment: string;
  created_at: string;
}

export interface Order {
  id: string;
  user_id: string;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  items: CartItem[];
  created_at: string;
}