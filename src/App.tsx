import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  Heart, 
  MapPin, 
  Phone, 
  Mail, 
  Send, 
  ChevronRight, 
  Laptop, 
  Smartphone, 
  Headphones, 
  Cpu, 
  Tv, 
  Volume2, 
  Layers, 
  Sparkles,
  Info,
  Clock,
  Instagram,
  Facebook,
  Twitter,
  ArrowUpRight
} from 'lucide-react';
import { productsData } from './data';
import { Product, CartItem, Review } from './types';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import CartDrawer from './components/CartDrawer';
import TrustBadges from './components/TrustBadges';
import Toast from './components/Toast';
import ProductPage from './components/ProductPage';
import LiveOrderNotifications from './components/LiveOrderNotifications';
import PromoTimerAd from './components/PromoTimerAd';

export { productsData }; // export data for notifications

export default function App() {
  // --- Products State with full support for user reviews ---
  const [productsList, setProductsList] = useState<Product[]>(productsData);

  // --- Active Product Stand-alone Page View ---
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  // --- Persistent States ---
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('techzone_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('techzone_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('techzone_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('techzone_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // --- UI Layout States ---
  const [selectedCategory, setSelectedCategory] = useState<
    'all' | 'phones' | 'audio' | 'laptops' | 'accessories' | 'wearables'
  >('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartDrawerStep, setCartDrawerStep] = useState<'cart' | 'checkout'>('cart');
  const [toasts, setToasts] = useState<{ id: string; message: string }[]>([]);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterError, setNewsletterError] = useState('');

  // --- Toast Trigger Utility ---
  const triggerToast = (message: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // --- Cart Handlers ---
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        triggerToast(`Updated quantity of ${product.name} inside cart.`);
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      triggerToast(`Added ${product.name} to your Shopping Cart!`);
      return [...prev, { product, quantity }];
    });
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    const item = cart.find((i) => i.product.id === productId);
    if (item) {
      setCart((prev) => prev.filter((i) => i.product.id !== productId));
      triggerToast(`Removed ${item.product.name} from Cart.`);
    }
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleBuyNow = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev;
      }
      return [...prev, { product, quantity: 1 }];
    });
    setCartDrawerStep('checkout');
    setCartOpen(true);
    triggerToast(`Added ${product.name} and opened checkout! 🚀`);
  };

  // --- Wishlist Handlers ---
  const handleToggleWishlist = (product: Product) => {
    const isAlready = wishlist.includes(product.id);
    if (isAlready) {
      setWishlist((prev) => prev.filter((id) => id !== product.id));
      triggerToast(`Removed ${product.name} from your Wishlist.`);
    } else {
      setWishlist((prev) => [...prev, product.id]);
      triggerToast(`Added ${product.name} to Wishlist! ❤️`);
    }
  };

  // --- Add Review Handler ---
  const handleAddReview = (productId: string, name: string, city: string, rating: number, text: string) => {
    const newReview: Review = {
      id: `rev-${Date.now()}`,
      name,
      city,
      rating,
      text,
      date: new Date().toISOString().split('T')[0],
      verified: true
    };

    setProductsList((prevProducts) => {
      const updated = prevProducts.map((p) => {
        if (p.id === productId) {
          const updatedReviews = [newReview, ...p.reviews];
          const newAvgRating = parseFloat(
            (updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length).toFixed(1)
          );
          return {
            ...p,
            rating: newAvgRating,
            reviewsCount: updatedReviews.length,
            reviews: updatedReviews
          };
        }
        return p;
      });

      // Synchronize the active stand-alone page product
      const newActive = updated.find((p) => p.id === productId);
      if (newActive) {
        setActiveProduct(newActive);
      }

      return updated;
    });

    triggerToast(`Thanks ${name}! Your review has been added.`);
  };

  // --- Newsletter Validation ---
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) {
      setNewsletterError('Please provide your active email.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newsletterEmail.trim())) {
      setNewsletterError('Invalid email address configuration.');
      return;
    }

    setNewsletterError('');
    setNewsletterEmail('');
    triggerToast('Shukriya! Thank you for subscribing to TechZone drops.');
  };

  // --- Category Specific Icon Mappings ---
  const categoryTabs = [
    { id: 'all', name: 'All Gadgets', icon: Layers },
    { id: 'phones', name: 'Phones', icon: Smartphone },
    { id: 'audio', name: 'Audio', icon: Headphones },
    { id: 'laptops', name: 'Laptops', icon: Laptop },
    { id: 'accessories', name: 'Accessories', icon: Cpu },
    { id: 'wearables', name: 'Wearables', icon: Tv },
  ] as const;

  // Filter Catalog Products
  const filteredProducts = productsList.filter((product) => {
    if (selectedCategory === 'all') return true;
    return product.category === selectedCategory;
  });

  const cartTotalCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#080c10] text-[#f3f4f6]" id="shop-root">
      
      {/* 0. PROMO TIMER AD & FLASH ANNOUNCEMENT BAR */}
      <PromoTimerAd />

      {/* 1. STICKY NAV BAR */}
      <header className="sticky top-0 z-40 bg-[#080c10]/85 backdrop-blur-md border-b border-gray-800/60 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo Brand with Cyan/Purple Gradient */}
          <a 
            href="#shop-root" 
            onClick={() => setActiveProduct(null)}
            className="flex items-center gap-1.5 focus:outline-none"
          >
            <span className="font-display font-black text-2xl tracking-tight bg-gradient-to-r from-[#00e5ff] to-[#7c3aed] bg-clip-text text-transparent hover:brightness-110 transition-all">
              TechZone
            </span>
            <span className="text-xs bg-[#7c3aed] text-white font-extrabold px-1.5 py-0.5 rounded uppercase select-none">
              .pk
            </span>
          </a>

          {/* Large Screen Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
            <a 
              href="#products-section" 
              onClick={() => setActiveProduct(null)}
              className="text-gray-300 hover:text-[#00e5ff] transition-colors"
            >
              Catalog
            </a>
            <a href="#trust-badges" className="text-gray-300 hover:text-[#00e5ff] transition-colors">COD Guarantee</a>
            <a href="#newsletter-section" className="text-gray-300 hover:text-[#00e5ff] transition-colors">Drops Alert</a>
            <a href="#footer-section" className="text-gray-300 hover:text-[#00e5ff] transition-colors">Customer Desk</a>
          </nav>

          {/* Action Icons right */}
          <div className="flex items-center gap-4">
            
            {/* Wishlist triggers list or feedback */}
            <button 
              onClick={() => {
                if (wishlist.length === 0) {
                  triggerToast("Your wishlist is empty. Tap standard hearts on products!");
                } else {
                  triggerToast(`You have ${wishlist.length} premium item(s) bookmarked.`);
                }
              }}
              className="relative p-2.5 bg-[#0d1522] border border-gray-800/80 hover:border-violet-500 rounded-xl text-gray-400 hover:text-white transition-all cursor-pointer"
              aria-label="Wishlist bookmarks"
            >
              <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'fill-[#7c3aed] text-[#7c3aed]' : ''}`} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#7c3aed] text-white text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center font-mono">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping cart trigger */}
            <button
              onClick={() => {
                setCartDrawerStep('cart');
                setCartOpen(true);
              }}
              className="relative p-2.5 bg-[#0d1522] border border-gray-800/80 hover:border-[#00e5ff] rounded-xl text-gray-400 hover:text-white transition-all cursor-pointer flex items-center gap-2"
              aria-label="Shopping Cart Drawer"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartTotalCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-[#00e5ff] to-[#7c3aed] text-white text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center font-mono animate-pulse">
                  {cartTotalCount}
                </span>
              )}
            </button>
            
          </div>

        </div>
      </header>

      {activeProduct ? (
        <ProductPage
          product={activeProduct}
          allProducts={productsList}
          isWishlisted={wishlist.includes(activeProduct.id)}
          onBack={() => setActiveProduct(null)}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          onSwitchProduct={(p) => setActiveProduct(p)}
          onBuyNow={handleBuyNow}
          onAddReview={handleAddReview}
        />
      ) : (
        <>
          {/* 2. HERO BANNER */}
          <section className="relative overflow-hidden py-16 md:py-28 px-4 md:px-8 select-none">
        {/* Abstract Glowing Gradients in background */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[600px] h-[350px] md:h-[600px] rounded-full bg-gradient-to-tr from-[#7c3aed]/10 to-[#00e5ff]/10 filter blur-3xl pointer-events-none" />
        <div className="absolute top-10 right-10 w-96 h-96 rounded-full bg-[#00e5ff]/5 filter blur-3xl pointer-events-none" />
        
        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-[#0c1522] border border-gray-800 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-cyan-400 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#00e5ff]" />
            Lahore's Professional Digital Outlet
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display font-black text-4xl sm:text-5xl md:text-6.5xl tracking-tight text-white leading-[1.1] max-w-4xl mx-auto"
          >
            Pakistan's Premier{' '}
            <span className="bg-gradient-to-r from-[#00e5ff] via-[#7c3aed] to-[#00e5ff] bg-[length:200%_auto] animate-gradient bg-clip-text text-transparent">
              Authentic Tech
            </span>{' '}
            Depot
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-gray-400 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Bringing original imported electronics, global warranties, and official sealed boxes directly to Pakistan. Completely risk-free Shopping with <strong className="text-white font-medium">Cash on Delivery (COD)</strong> options.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 pt-4"
          >
            <a
              href="#products-section"
              className="bg-gradient-to-r from-[#00e5ff] to-[#7c3aed] hover:from-[#00e5ff] hover:to-[#7c3aed] hover:shadow-cyan-950/40 text-white font-display font-bold text-sm px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-black/20"
            >
              Shop Curated Catalog
            </a>
            <a
              href="#trust-badges"
              className="bg-[#05090f]/70 hover:bg-[#0c1522] border border-gray-800 text-gray-300 hover:text-white font-display font-semibold text-sm px-7 py-4 rounded-xl transition-all duration-200"
            >
              Verify Badges & COD
            </a>
          </motion.div>
        </div>
      </section>

      {/* 3. TRUST BADGES STRIP */}
      <section id="trust-badges">
        <TrustBadges />
      </section>

      {/* 4. PRODUCT DIRECTORY GRID SECTION */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" id="products-section">
        
        {/* Directory Headers */}
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-4 mb-10">
          <div className="text-center md:text-left">
            <h2 className="font-display font-black text-2xl md:text-4xl tracking-tight text-white">
              Explore Our Authentic Stocks
            </h2>
            <p className="text-gray-400 text-xs md:text-sm mt-1.5">
              Select category filters below to find the correct gear for your tech environment
            </p>
          </div>

          <div className="text-xs text-gray-500 font-mono bg-[#05090f]/70 border border-gray-800/80 rounded-lg px-3 py-1.5 select-none shrink-0 flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-[#00e5ff]" />
            Shipments active outside Lahore today
          </div>
        </div>

        {/* Category filtering Segment Tabs */}
        <div className="flex overflow-x-auto pb-3 mb-8 gap-2 snap-x scrollbar-none select-none">
          {categoryTabs.map((tab) => {
            const TabIcon = tab.icon;
            const isActive = selectedCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`snap-start flex items-center gap-2 px-5 py-3 rounded-xl border font-display text-xs font-bold tracking-wide transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#00e5ff]/15 to-[#7c3aed]/15 border-[#00e5ff] text-[#00e5ff] shadow-sm'
                    : 'bg-[#05090f]/75 border-gray-800 text-gray-400 hover:text-gray-200 hover:border-gray-700'
                }`}
              >
                <TabIcon className={`w-4 h-4 ${isActive ? 'text-[#00e5ff]' : 'text-gray-500'}`} />
                {tab.name}
              </button>
            );
          })}
        </div>

        {/* Staggered Products Grid */}
        <AnimatePresence mode="popLayout">
          {filteredProducts.length > 0 ? (
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            >
              {filteredProducts.map((p, index) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  index={index}
                  isWishlisted={wishlist.includes(p.id)}
                  onOpenDetails={(item) => setActiveProduct(item)}
                  onAddToCart={(item, qty) => handleAddToCart(item, qty)}
                  onToggleWishlist={(item) => handleToggleWishlist(item)}
                  onBuyNow={(item) => handleBuyNow(item)}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20 bg-[#0d1522]/30 border border-gray-800/60 rounded-3xl p-8"
            >
              <p className="text-gray-400 font-display">No devices found matching this filter category.</p>
              <button
                onClick={() => setSelectedCategory('all')}
                className="mt-4 bg-[#0c1522] border border-gray-800 px-5 py-2 rounded-xl text-xs font-bold text-white hover:border-[#00e5ff]"
              >
                Reset Filter Setup
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* 5. NEWSLETTER SIGNUP BANNER WITH GRADIENT BORDER */}
      <section className="max-w-4xl mx-auto px-4 py-16" id="newsletter-section">
        {/* Glow wrapper with responsive border gradient */}
        <div className="relative p-0.5 rounded-3xl bg-gradient-to-r from-[#00e5ff]/50 via-gray-800 to-[#7c3aed]/50 overflow-hidden shadow-2xl">
          <div className="bg-[#090f19] p-8 md:p-12 rounded-3xl relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            
            <div className="max-w-md text-center md:text-left space-y-2">
              <span className="text-[#00e5ff] text-xs font-bold tracking-widest font-display uppercase block select-none">
                VIP MEMBERS ONLY
              </span>
              <h3 className="font-display font-black text-2.5xl text-white tracking-tight">
                Get Weekly Stock Drops Alert
              </h3>
              <p className="text-gray-400 text-xs">
                Receive instant alerts when scarce hardware (Samsung Ultra series, imported Apple units, specialized wireless accessories) lands at our warehouse. No spam guarantee.
              </p>
            </div>

            <div className="w-full md:w-auto shrink-0 flex flex-col gap-2">
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2 w-full md:w-80">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => {
                    setNewsletterEmail(e.target.value);
                    if (newsletterError) setNewsletterError('');
                  }}
                  placeholder="Insert your premium email..."
                  className="bg-[#05090f] border border-gray-800 focus:border-[#00e5ff] hover:border-gray-700 text-xs text-white placeholder-gray-500 rounded-xl px-4 py-3.5 flex-1 outline-none transition-colors duration-150"
                  aria-label="Newsletter email input"
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-[#00e5ff]/90 to-[#7c3aed]/90 hover:from-[#00e5ff] hover:to-[#7c3aed] text-white p-3.5 rounded-xl flex items-center justify-center cursor-pointer transition-all active:scale-95 shadow-md shadow-cyan-950/20"
                  aria-label="Subscribe"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
              {newsletterError && (
                <span className="text-rose-500 text-[10px] font-semibold block text-center md:text-left pl-1">
                  {newsletterError}
                </span>
              )}
            </div>

          </div>
        </div>
      </section>
        </>
      )}

      {/* 6. PROFESSIONAL FOOTER (Lahore Address, copyright, social pillars) */}
      <footer className="bg-[#05090f] border-t border-gray-800/80 py-12 text-sm text-gray-400" id="footer-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          
          {/* Column 1: Brand details */}
          <div className="space-y-4">
            <div className="flex items-center gap-1.5">
              <span className="font-display font-black text-xl bg-gradient-to-r from-[#00e5ff] to-[#7c3aed] bg-clip-text text-transparent uppercase select-none">
                TechZone
              </span>
              <span className="text-[10px] bg-[#7c3aed] text-white font-bold px-1.5 py-0.5 rounded uppercase">
                .pk
              </span>
            </div>
            <p className="text-xs leading-relaxed text-gray-400">
              TechZone.pk is an independent premium consumer hardware depot shipping original electronic items with Cash on Delivery nationwide. Designed for professional workflows.
            </p>
            <div className="flex gap-3 pt-2">
              <a href="#" className="p-2 bg-[#0d1522] hover:bg-[#7c3aed]/10 hover:text-white rounded-lg transition-colors border border-gray-800/50">
                <Instagram className="w-4 h-4 text-gray-400 hover:text-[#00e5ff]" />
              </a>
              <a href="#" className="p-2 bg-[#0d1522] hover:bg-[#7c3aed]/10 hover:text-white rounded-lg transition-colors border border-gray-800/50">
                <Facebook className="w-4 h-4 text-gray-400 hover:text-[#00e5ff]" />
              </a>
              <a href="#" className="p-2 bg-[#0d1522] hover:bg-[#7c3aed]/10 hover:text-white rounded-lg transition-colors border border-gray-800/50">
                <Twitter className="w-4 h-4 text-gray-400 hover:text-[#00e5ff]" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick navigation */}
          <div>
            <h4 className="font-display font-semibold text-white tracking-wider text-xs uppercase mb-4">Stock Collections</h4>
            <ul className="space-y-2.5 text-xs">
              <li><button onClick={() => setSelectedCategory('phones')} className="hover:text-white transition-colors cursor-pointer text-left">Samsung Ultra & Apple Devices</button></li>
              <li><button onClick={() => setSelectedCategory('audio')} className="hover:text-white transition-colors cursor-pointer text-left">Active Noise Cancelling Audio</button></li>
              <li><button onClick={() => setSelectedCategory('laptops')} className="hover:text-white transition-colors cursor-pointer text-left">Silicon M-Series Laptops</button></li>
              <li><button onClick={() => setSelectedCategory('wearables')} className="hover:text-white transition-colors cursor-pointer text-left">Smart Wellness Wearables</button></li>
            </ul>
          </div>

          {/* Column 3: Corporate/Polices info */}
          <div>
            <h4 className="font-display font-semibold text-white tracking-wider text-xs uppercase mb-4">Guarantees & Desk</h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#trust-badges" className="hover:text-white transition-colors">COD Countryside Policies</a></li>
              <li><a href="#trust-badges" className="hover:text-white transition-colors">7-Day Replacement Guidelines</a></li>
              <li><a href="#trust-badges" className="hover:text-white transition-colors">Original Seals Verification</a></li>
              <li><a href="#footer-section" className="hover:text-white transition-colors">Submit Support Tickets</a></li>
            </ul>
          </div>

          {/* Column 4: Address lahore Pakistan physical info */}
          <div className="space-y-3 p-4 bg-[#0d1522]/35 border border-gray-800/60 rounded-2xl">
            <h4 className="font-display font-semibold text-white tracking-wider text-xs uppercase mb-1">Corporate Depot Address</h4>
            
            <div className="flex gap-2 items-start text-xs text-gray-300">
              <MapPin className="w-4 h-4 text-[#00e5ff] shrink-0 mt-0.5" />
              <span>
                Suite 412, Floor 4, Century Tower, Phase 8, Defence (DHA), Lahore, Pakistan
              </span>
            </div>

            <div className="flex gap-2 items-center text-xs text-gray-300">
              <Phone className="w-4 h-4 text-[#00e5ff] shrink-0" />
              <span>+92 (300) 079-ZONE</span>
            </div>

            <div className="flex gap-2 items-center text-xs text-gray-300">
              <Mail className="w-4 h-4 text-[#00e5ff] shrink-0" />
              <span>orders@techzone.pk</span>
            </div>
          </div>

        </div>

        {/* Outer bottom row copyright info */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-gray-800/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <span>&copy; {new Date().getFullYear()} TechZone.pk Digital Outlet. All rights reserved.</span>
          <div className="flex gap-2.5 text-[10px] select-none font-semibold uppercase text-gray-500">
            <span>Original Packings Verified</span>
            <span>&bull;</span>
            <span>Lahore Support active</span>
          </div>
        </div>
      </footer>

      {/* --- FLOATING DIALOGS & OVERLAYS --- */}

      {/* Product Information Detail Modal Overlay */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            allProducts={productsData}
            isWishlisted={wishlist.includes(selectedProduct.id)}
            onClose={() => setSelectedProduct(null)}
            onAddToCart={(item, qty) => {
              handleAddToCart(item, qty);
              setSelectedProduct(null);
            }}
            onToggleWishlist={(item) => handleToggleWishlist(item)}
            onSwitchProduct={(item) => setSelectedProduct(item)}
            onBuyNow={(item) => {
              setSelectedProduct(null);
              handleBuyNow(item);
            }}
          />
        )}
      </AnimatePresence>

      {/* Sliding Check-Out Shopping Cart Drawer */}
      <AnimatePresence>
        {cartOpen && (
          <CartDrawer
            isOpen={cartOpen}
            onClose={() => setCartOpen(false)}
            cartItems={cart}
            onUpdateQuantity={handleUpdateCartQuantity}
            onRemoveItem={handleRemoveFromCart}
            onClearCart={handleClearCart}
            onTriggerToast={triggerToast}
            initialStep={cartDrawerStep}
          />
        )}
      </AnimatePresence>

      {/* Live Recent Purchase Booking Notifications */}
      <LiveOrderNotifications products={productsList} />

      {/* Top right notification portal */}
      <div className="fixed bottom-5 right-5 z-55 flex flex-col gap-2.5 pointer-events-none max-w-sm w-full px-4">
        <AnimatePresence>
          {toasts.map((toast) => (
            <Toast
              key={toast.id}
              id={toast.id}
              message={toast.message}
              onClose={removeToast}
            />
          ))}
        </AnimatePresence>
      </div>

    </div>
  );
}
