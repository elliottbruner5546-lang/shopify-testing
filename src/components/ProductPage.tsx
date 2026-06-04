import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Star, 
  ShoppingCart, 
  Heart, 
  ShieldCheck, 
  ArrowRightLeft, 
  MessageSquare, 
  CheckCircle2, 
  Plus, 
  AlertCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Product, Review } from '../types';
import { formatPKR, calculateDiscount } from '../utils';

interface ProductPageProps {
  product: Product;
  allProducts: Product[];
  isWishlisted: boolean;
  onBack: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onToggleWishlist: (product: Product) => void;
  onSwitchProduct: (product: Product) => void;
  onBuyNow: (product: Product) => void;
  onAddReview: (productId: string, name: string, city: string, rating: number, text: string) => void;
}

export default function ProductPage({
  product,
  allProducts,
  isWishlisted,
  onBack,
  onAddToCart,
  onToggleWishlist,
  onSwitchProduct,
  onBuyNow,
  onAddReview,
}: ProductPageProps) {
  const [reviewName, setReviewName] = useState('');
  const [reviewCity, setReviewCity] = useState('Lahore');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [reviewError, setReviewError] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState(false);

  const [activeSlide, setActiveSlide] = useState(0);

  // Scroll window to top on mount or product change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setReviewSuccess(false);
    setReviewError('');
    setReviewName('');
    setReviewText('');
    setReviewRating(5);
    setActiveSlide(0);
  }, [product.id]);

  const slideImages = product.images && product.images.length > 0
    ? product.images
    : (product.image ? [product.image] : []);

  const nextSlide = () => {
    if (slideImages.length > 1) {
      setActiveSlide((prev) => (prev + 1) % slideImages.length);
    }
  };

  const prevSlide = () => {
    if (slideImages.length > 1) {
      setActiveSlide((prev) => (prev - 1 + slideImages.length) % slideImages.length);
    }
  };

  const discount = calculateDiscount(product.originalPrice, product.price);

  // Filter out current product for related products
  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id)
    .filter((p) => p.category === product.category || p.brand === product.brand)
    .concat(allProducts.filter((p) => p.id !== product.id)) // Fallback matches
    .filter((value, index, self) => self.findIndex((p) => p.id === value.id) === index) // Unique
    .slice(0, 4);

  // Pakistani Cities Dropdown list
  const pakCities = [
    'Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Faisalabad', 
    'Multan', 'Peshawar', 'Quetta', 'Sialkot', 'Gujranwala', 'Hyderabad'
  ];

  // Ratings distribution percentages calculation based on reviews
  const totalReviews = product.reviews.length;
  const ratingCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 } as Record<number, number>;
  product.reviews.forEach((r) => {
    const star = Math.round(r.rating);
    if (star >= 1 && star <= 5) {
      ratingCounts[star]++;
    }
  });

  const ratingDistribution = [5, 4, 3, 2, 1].map((stars) => {
    const count = ratingCounts[stars] || 0;
    const percentage = totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0;
    return { stars, percentage, count };
  });

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName.trim()) {
      setReviewError('Apna naam darj karein (Please enter your name).');
      return;
    }
    if (!reviewText.trim()) {
      setReviewError('Review ka text likhein (Please enter your review text).');
      return;
    }
    if (reviewText.trim().length < 8) {
      setReviewError('Review text thoda lamba likhein (Too short, write something helpful).');
      return;
    }

    onAddReview(product.id, reviewName.trim(), reviewCity, reviewRating, reviewText.trim());
    
    setReviewName('');
    setReviewText('');
    setReviewRating(5);
    setReviewError('');
    setReviewSuccess(true);
    setTimeout(() => {
      setReviewSuccess(false);
    }, 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="product-page-root">
      {/* Back navigation banner */}
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0d1522] border border-gray-800 hover:border-cyan-400/50 rounded-xl text-gray-300 hover:text-white transition-all text-xs font-semibold cursor-pointer shadow-sm group"
        >
          <ArrowLeft className="w-4 h-4 text-[#00e5ff] transition-transform group-hover:-translate-x-1" />
          Kuch aur dekhein (Back to Catalog)
        </button>
        <span className="text-xs font-mono text-gray-500 bg-[#05090f] px-3.5 py-1.5 border border-gray-800/40 rounded-lg">
          Category: <span className="text-gray-300 uppercase font-semibold">{product.category}</span>
        </span>
      </div>

      {/* Main product wrapper layout */}
      <div className="bg-[#090f19] border border-gray-800/80 rounded-3xl p-6 md:p-10 shadow-xl relative overflow-hidden">
        {/* Glow halo behind */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#7c3aed]/5 filter blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-[#00e5ff]/5 filter blur-3xl pointer-events-none" />

        {/* Top Product Detail layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start relative z-10">
          
          {/* Left Column: Premium Visual Container / Slider */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="relative aspect-square rounded-2xl bg-gradient-to-br from-[#0c1421] to-[#121d2e] border border-gray-800/80 flex items-center justify-center overflow-hidden shadow-inner group">
              <div className={`absolute w-44 h-44 rounded-full filter blur-3xl opacity-25 bg-gradient-to-tr ${product.gradientFrom} ${product.gradientTo}`} />
              
              {/* Slide image rendering */}
              {slideImages.length > 0 ? (
                <motion.img
                  key={activeSlide}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  src={slideImages[activeSlide]}
                  alt={`${product.name} - Slide ${activeSlide + 1}`}
                  className="w-full h-full object-cover relative z-10 select-none pointer-events-none"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <span className="text-8.5xl filter drop-shadow-[0_15px_15px_rgba(0,229,255,0.25)] select-none">
                  {product.emoji}
                </span>
              )}

              {/* Badges overlay */}
              {product.badge && (
                <span className="absolute top-4 left-4 bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-display font-bold px-3 py-1.5 rounded-full z-20 shadow">
                  {product.badge}
                </span>
              )}

              {/* Slider Edge Navigation Controls */}
              {slideImages.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      prevSlide();
                    }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-slate-900/70 backdrop-blur-sm border border-gray-850 hover:border-cyan-400 text-white cursor-pointer z-20 hover:bg-[#00e5ff]/20 hover:text-[#00e5ff] transition-all"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      nextSlide();
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-slate-900/70 backdrop-blur-sm border border-gray-850 hover:border-cyan-400 text-white cursor-pointer z-20 hover:bg-[#00e5ff]/20 hover:text-[#00e5ff] transition-all"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Current Index Indicator Label */}
              {slideImages.length > 1 && (
                <span className="absolute bottom-4 right-4 z-20 bg-slate-950/80 backdrop-blur-xs border border-gray-800 text-gray-300 px-3 py-1 rounded-lg text-[11px] font-mono select-none">
                  <span className="text-[#00e5ff] font-bold">{String(activeSlide + 1).padStart(2, '0')}</span> / {String(slideImages.length).padStart(2, '0')}
                </span>
              )}

              {/* Sliding Bottom Progress Bar indicator */}
              {slideImages.length > 1 && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-950/40 z-20">
                  <div 
                    className="h-full bg-gradient-to-r from-cyan-400 to-[#7c3aed] transition-all duration-300"
                    style={{ width: `${((activeSlide + 1) / slideImages.length) * 100}%` }}
                  />
                </div>
              )}
            </div>

            {/* Micro Thumbnails Carousel */}
            {slideImages.length > 1 && (
              <div className="grid grid-cols-5 gap-2.5">
                {slideImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSlide(idx)}
                    className={`relative aspect-square rounded-xl bg-[#090f19] border overflow-hidden cursor-pointer transition-all ${
                      idx === activeSlide
                        ? 'border-[#00e5ff] ring-1 ring-[#00e5ff]/30 scale-102 opacity-100 shadow-lg shadow-cyan-950/30'
                        : 'border-gray-850 opacity-50 hover:opacity-85 hover:scale-101'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Core Badges box */}
            <div className="p-4.5 bg-[#070b13] border border-gray-800/60 rounded-xl flex items-center gap-3.5">
              <div className="p-2.5 bg-cyan-950/40 text-[#00e5ff] rounded-lg">
                <ShieldCheck className="w-5.5 h-5.5" />
              </div>
              <div>
                <h5 className="text-white text-xs font-semibold">100% Sealed & Checked Stock</h5>
                <p className="text-gray-400 text-[10px] mt-0.5">Tested before dispatch. 7 days replacement guarantee apply.</p>
              </div>
            </div>
          </div>

          {/* Right Column: Descriptions & action buttons */}
          <div className="lg:col-span-7 flex flex-col">
            <span className="text-[#00e5ff] text-xs font-display font-extrabold tracking-widest uppercase">
              {product.brand}
            </span>
            <h1 className="font-display font-black text-3xl sm:text-4xl text-white mt-1 leading-tight tracking-tight shadow-sm">
              {product.name}
            </h1>

            {/* Stars summary details */}
            <div className="flex items-center gap-2 mt-4 select-none flex-wrap">
              <div className="flex text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-gray-700'
                    }`}
                  />
                ))}
              </div>
              <span className="text-amber-400 font-bold font-mono text-sm">{product.rating}</span>
              <span className="text-gray-400 border-l border-gray-800 pl-2 text-xs">
                {product.reviews.length} Customer Reviews
              </span>
              <span className="text-emerald-400 text-[10px] font-mono font-bold px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 ml-auto mr-1 select-none">
                VERIFIED IN STORE
              </span>
            </div>

            {/* Description card */}
            <p className="text-gray-300 text-sm md:text-base mt-6 leading-relaxed bg-[#0d1522]/30 border border-gray-800/30 p-5 rounded-2xl">
              {product.description}
            </p>

            {/* Pricing section */}
            <div className="bg-[#05090f] border border-gray-800/60 p-6 rounded-2xl mt-6 flex items-center justify-between gap-4 flex-wrap">
              <div className="flex flex-col">
                <span className="text-gray-500 text-[10px] font-semibold tracking-wider font-display uppercase">DELIVERY CHARGES COMPLETE FREE (COD ON DELIVERY)</span>
                <div className="flex items-baseline gap-3 mt-1.5">
                  <span className="text-3xl sm:text-4.5xl font-display font-black text-[#00e5ff] tracking-tight">
                    {formatPKR(product.price)}
                  </span>
                  {discount > 0 && (
                    <span className="text-xs sm:text-sm font-mono line-through text-gray-500">
                      {formatPKR(product.originalPrice)}
                    </span>
                  )}
                </div>
              </div>

              {discount > 0 && (
                <div className="bg-[#7c3aed]/10 text-violet-400 border border-[#7c3aed]/20 px-4.5 py-2.5 rounded-xl text-center flex flex-col justify-center">
                  <span className="text-[10px] font-bold tracking-wider font-display uppercase">SPECIAL SAVE</span>
                  <span className="text-xl font-black font-display leading-tight">{discount}% OFF</span>
                </div>
              )}
            </div>

            {/* Action columns: Add to Cart, Wishlist */}
            <div className="flex flex-wrap gap-4 mt-6">
              <button
                onClick={() => onBuyNow(product)}
                className="flex-1 min-w-[200px] bg-gradient-to-r from-[#00e5ff] to-[#7c3aed] hover:brightness-110 text-white font-display font-black text-sm py-4.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 active:scale-98 shadow-lg shadow-cyan-950/10 cursor-pointer"
              >
                Abhi Order Karein (Instant COD Order)
              </button>
              
              <button
                onClick={() => onAddToCart(product, 1)}
                className="bg-[#05090f] border border-gray-800 hover:border-gray-600 hover:bg-[#0c1421] text-white font-display font-bold text-sm py-4.5 px-6 rounded-xl flex items-center justify-center gap-2.5 transition-all duration-200 active:scale-98 cursor-pointer"
              >
                <ShoppingCart className="w-4.5 h-4.5 text-[#00e5ff]" />
                Cart me Dalein
              </button>
              
              <button
                onClick={() => onToggleWishlist(product)}
                className={`p-4.5 rounded-xl transition-all duration-200 border cursor-pointer flex items-center justify-center gap-2 ${
                  isWishlisted
                    ? 'bg-[#7c3aed]/10 border-[#7c3aed] text-violet-400'
                    : 'bg-[#05090f] border-gray-800 text-gray-400 hover:text-white'
                }`}
                aria-label="Toggle wishlist"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                <span className="text-xs font-semibold px-0.5">
                  {isWishlisted ? 'Wishlisted' : 'Add Wishlist'}
                </span>
              </button>
            </div>

          </div>
        </div>

        {/* Specifications Grid */}
        <div className="mt-12 border-t border-gray-800/65 pt-9">
          <h3 className="font-display font-extrabold text-xl text-white mb-5 flex items-center gap-2">
            <span className="w-1.5 h-5 bg-[#00e5ff] rounded-full" />
            Device Features & Specifications
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Object.entries(product.specs).map(([key, value]) => {
              if (!value) return null;
              // Clean keys representing specifications
              const friendlyKey = key.replace(/_/g, ' ');

              return (
                <div key={key} className="bg-[#05090f] border border-gray-850 p-4.5 rounded-xl hover:border-gray-800 transition-colors">
                  <span className="text-cyan-400 uppercase font-display text-[9px] font-extrabold tracking-widest select-none">
                    {friendlyKey}
                  </span>
                  <p className="text-gray-200 text-xs md:text-[13px] font-medium mt-1 leading-snug">
                    {value}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Ratings Summary (Star percentages) & Reviews */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-12 border-t border-gray-800/65 pt-9 relative">
          
          {/* Left Side: Distribution Progress Bars & Submission form */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Summary details */}
            <div className="bg-[#05090f] border border-gray-800/40 p-6 rounded-2xl">
              <h4 className="font-display font-extrabold text-white text-base">Ratings Summary</h4>
              <div className="flex items-baseline gap-2 mt-4 select-none">
                <span className="text-4xl font-black text-white font-mono">{product.rating}</span>
                <span className="text-gray-500 font-mono text-sm">/ 5.0</span>
              </div>
              <div className="flex text-amber-400 mt-1 select-none">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4.5 h-4.5 ${
                      i < Math.floor(product.rating) ? 'fill-amber-400' : 'text-gray-800'
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-500 text-[10px] font-mono mt-1 pr-1.5 block">Calculated from verified customer orders countrywide</span>

              {/* Progress bars list */}
              <div className="space-y-2 mt-6">
                {ratingDistribution.map((r) => (
                  <div key={r.stars} className="flex items-center gap-3">
                    <span className="text-xs text-gray-400 font-mono w-4 shrink-0 select-none">{r.stars}★</span>
                    <div className="flex-1 h-2 bg-gray-950 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#00e5ff] to-[#7c3aed]"
                        style={{ width: `${r.percentage}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-mono text-gray-500 w-8 text-right select-none">
                      {r.percentage}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Urdu / EN Submit Review Form */}
            <div className="bg-[#05090f] border border-gray-800/40 p-6 rounded-2xl">
              <h4 className="font-display font-extrabold text-white text-sm uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Plus className="w-4 h-4 text-[#00e5ff]" />
                Write a verified Review
              </h4>
              <p className="text-gray-400 text-[11px] mb-4.5">Apna feedback share karein. It helps other shoppers make decisions!</p>

              <form onSubmit={handleReviewSubmit} className="space-y-3.5">
                {reviewSuccess && (
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-xl flex items-center gap-2">
                    <CheckCircle2 className="w-4.5 h-4.5 shrink-0" />
                    <span>Review added! Thank you for the verified drops insight.</span>
                  </div>
                )}

                {reviewError && (
                  <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold rounded-xl flex items-center gap-2">
                    <AlertCircle className="w-4.5 h-4.5 shrink-0" />
                    <span>{reviewError}</span>
                  </div>
                )}

                <div>
                  <label htmlFor="review-name" className="block text-[11px] font-mono text-gray-400 uppercase mb-1">Your Name *</label>
                  <input
                    type="text"
                    id="review-name"
                    value={reviewName}
                    onChange={(e) => setReviewName(e.target.value)}
                    placeholder="Usman, Sarah, Ali..."
                    className="w-full bg-[#0c1421]/60 border border-gray-850 hover:border-gray-800 focus:border-[#00e5ff] text-white text-xs px-3.5 py-2.5 rounded-xl outline-none transition-all placeholder-gray-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="review-city" className="block text-[11px] font-mono text-gray-400 uppercase mb-1">City *</label>
                    <select
                      id="review-city"
                      value={reviewCity}
                      onChange={(e) => setReviewCity(e.target.value)}
                      className="w-full bg-[#0c1421]/60 border border-gray-850 hover:border-gray-800 focus:border-[#00e5ff] text-white text-xs px-3.5 py-2.5 rounded-xl outline-none transition-all"
                    >
                      {pakCities.map((c) => (
                        <option key={c} value={c} className="bg-[#090f19]">{c}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="review-stars" className="block text-[11px] font-mono text-gray-400 uppercase mb-1">Rating *</label>
                    <select
                      id="review-stars"
                      value={reviewRating}
                      onChange={(e) => setReviewRating(Number(e.target.value))}
                      className="w-full bg-[#0c1421]/60 border border-gray-850 hover:border-gray-800 focus:border-[#00e5ff] text-white text-xs px-3.5 py-2.5 rounded-xl outline-none transition-all font-semibold text-amber-400"
                    >
                      <option value="5" className="bg-[#090f19]">5 Stars (Mind-blowing)</option>
                      <option value="4" className="bg-[#090f19]">4 Stars (Very Good)</option>
                      <option value="3" className="bg-[#090f19]">3 Stars (Good)</option>
                      <option value="2" className="bg-[#090f19]">2 Stars (Average)</option>
                      <option value="1" className="bg-[#090f19]">1 Star (Bad)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="review-text" className="block text-[11px] font-mono text-gray-400 uppercase mb-1">Review Details *</label>
                  <textarea
                    id="review-text"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Bhai iski deep bass aur battery kamaal hai... (Urdu/English compatible)"
                    rows={3}
                    className="w-full bg-[#0c1421]/60 border border-gray-850 hover:border-gray-800 focus:border-[#00e5ff] text-white text-xs px-3.5 py-2.5 rounded-xl outline-none transition-all placeholder-gray-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-500/30 to-[#7c3aed]/30 hover:from-cyan-500/40 hover:to-[#7c3aed]/40 border border-cyan-500/30 text-white font-display font-extrabold text-xs py-2.5 rounded-xl transition-all hover:scale-101 cursor-pointer"
                >
                  Publish Verified Review
                </button>
              </form>
            </div>

          </div>

          {/* Right Side: पाकिस्तानी Reviews scrolling list */}
          <div className="lg:col-span-8 flex flex-col">
            <h4 className="font-display font-extrabold text-white text-lg mb-5 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#00e5ff]" />
              Customer Feedbacks ({product.reviews.length})
            </h4>
            <div className="space-y-4 max-h-[640px] overflow-y-auto pr-2 custom-scrollbar">
              {product.reviews.length === 0 ? (
                <div className="p-10 border border-gray-805 bg-gray-950/20 rounded-2xl text-center text-gray-400">
                  Reviews are loading or none submitted for this device yet. Be the first one to write!
                </div>
              ) : (
                product.reviews.map((rev) => {
                  // Initials helper
                  const initials = rev.name
                    ?.split(' ')
                    .map((n) => n[0])
                    .join('') || '?';

                  return (
                    <div key={rev.id} className="bg-[#05090f]/50 border border-gray-850 p-5 rounded-2xl flex flex-col gap-3.5 hover:border-gray-800 transition-colors">
                      <div className="flex items-start justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00e5ff]/20 to-[#7c3aed]/20 text-[#00e5ff] border border-[#00e5ff]/10 flex items-center justify-center text-xs font-bold font-display select-none select-none">
                            {initials}
                          </div>
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-white text-sm font-semibold">{rev.name}</span>
                              <span className="text-cyan-400 text-[10px] font-bold font-mono text-xs">
                                ({rev.city})
                              </span>
                            </div>
                            <span className="text-emerald-400 text-[10px] font-semibold flex items-center gap-1 mt-0.5 select-none">
                              <span>✅ Order Verified (COD Complete)</span>
                            </span>
                          </div>
                        </div>

                        {/* Rating stars column */}
                        <div className="flex flex-col items-end gap-1 select-none">
                          <div className="flex text-amber-400">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3.5 h-3.5 ${
                                  i < rev.rating
                                    ? 'fill-amber-400 text-amber-400'
                                    : 'text-gray-800'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-[10px] text-gray-500 font-mono">{rev.date}</span>
                        </div>
                      </div>

                      {/* Review mix Urdu textual body */}
                      <p className="text-gray-200 text-sm italic leading-relaxed pl-1">
                        "{rev.text}"
                      </p>
                    </div>
                  );
                })
              )}
            </div>
          </div>

        </div>

        {/* Suggestion block */}
        <div className="mt-12 border-t border-gray-800/65 pt-9">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-display font-extrabold text-xl text-white flex items-center gap-2">
              <span className="w-1.5 h-5 bg-[#7c3aed] rounded-full" />
              Related Match Stock (Suggested Products)
            </h3>
            <span className="text-xs text-gray-400 flex items-center gap-1.5 font-mono select-none">
              <ArrowRightLeft className="w-4 h-4 text-[#00e5ff]" />
              Instant matches
            </span>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {relatedProducts.map((p) => {
              const discountPct = calculateDiscount(p.originalPrice, p.price);
              return (
                <div
                  key={p.id}
                  onClick={() => onSwitchProduct(p)}
                  className="bg-[#060b13] border border-gray-850 hover:border-[#00e5ff]/50 rounded-xl p-4 cursor-pointer hover:bg-[#070e1b] transition-all duration-200 group flex flex-col justify-between"
                >
                  <div>
                    <div className="aspect-square bg-slate-950 rounded-lg flex items-center justify-center mb-3.5 relative overflow-hidden border border-gray-850">
                      <div className={`absolute w-16 h-16 rounded-full filter blur-xl opacity-10 bg-gradient-to-tr ${p.gradientFrom} ${p.gradientTo}`} />
                      {p.image ? (
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-full h-full object-cover relative z-10 transition-transform duration-300 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <span className="text-4xl drop-shadow-sm select-none group-hover:scale-105 transition-transform">{p.emoji}</span>
                      )}
                    </div>
                    <span className="text-[#00e5ff] text-[8px] font-extrabold tracking-widest uppercase block mb-0.5">{p.brand}</span>
                    <h5 className="text-white text-xs font-semibold line-clamp-1 mb-1 group-hover:text-[#00e5ff] transition-colors">{p.name}</h5>
                  </div>
                  <div className="flex items-center justify-between gap-1.5 mt-3 pt-2 border-t border-gray-850">
                    <span className="text-xs text-white font-extrabold font-mono">{formatPKR(p.price)}</span>
                    {discountPct > 0 && (
                      <span className="bg-[#7c3aed]/15 text-violet-400 text-[9px] font-bold px-1.5 py-0.5 rounded font-display">
                        -{discountPct}%
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
