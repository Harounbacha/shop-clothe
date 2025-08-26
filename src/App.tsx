import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { CartSidebar } from './components/cart/CartSidebar';
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { LoginForm } from './components/auth/LoginForm';

function App() {
  const [cartSidebarOpen, setCartSidebarOpen] = useState(false);

  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <Router>
            <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
              <Header />
              
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/products/:category" element={<Products />} />
                  <Route path="/login" element={<LoginForm />} />
                  <Route path="/register" element={<LoginForm />} />
                  <Route 
                    path="/cart" 
                    element={
                      <div className="min-h-screen flex items-center justify-center">
                        <div className="text-center">
                          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            Shopping Cart
                          </h1>
                          <p className="text-gray-600 dark:text-gray-400">
                            Cart page coming soon! Use the sidebar for now.
                          </p>
                          <button
                            onClick={() => setCartSidebarOpen(true)}
                            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                          >
                            Open Cart Sidebar
                          </button>
                        </div>
                      </div>
                    }
                  />
                  <Route 
                    path="*" 
                    element={
                      <div className="min-h-screen flex items-center justify-center">
                        <div className="text-center">
                          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
                          <p className="text-gray-600 dark:text-gray-400">Page not found</p>
                        </div>
                      </div>
                    }
                  />
                </Routes>
              </main>

              <Footer />
              
              <CartSidebar 
                isOpen={cartSidebarOpen} 
                onClose={() => setCartSidebarOpen(false)} 
              />
            </div>
          </Router>

          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: 'var(--toast-bg)',
                color: 'var(--toast-color)',
                border: '1px solid var(--toast-border)',
              },
            }}
          />
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;