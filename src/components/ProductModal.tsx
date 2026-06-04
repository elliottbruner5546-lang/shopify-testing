import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star, ShoppingCart, Heart, ShieldCheck, ArrowRightLeft } from 'lucide-react';
import { Product } from '../types';
import { formatPKR, calculateDiscount } from '../utils';

interface ProductModalProps {
  product: Product | null;
  allProducts: Product[];
  onClose: () => void;
  isWishlisted: boolean;
  onAddToCart: (product: Product, quantity: number) => void;
  onToggleWishlist: (product: Product) => void;
  onSwitchProduct: (product: Product) => void;
  onBuyNow: (product: Product) => void;
}

export default function ProductModal({
  product,
  allProducts,
  onClose,
  isWishlisted,
  onAddToCart,
  onToggleWishlist,
  onSwitchProduct,
  onBuyNow,
}: ProductModalProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  if (!product) return null;

  const discount = calculateDiscount(product.originalPrice, product.price);

  // Filter out current product for horizontal related products strip
  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id)
    .filter((p) => p.category === product.category || p.brand === product.brand)
    .concat(allProducts.filter((p) => p.id !== product.id)) // Fallback if limited matching
    .slice(0, 4);

  // Ratings distribution for progress bar chart
  const ratingDistribution = [
    { stars: 5, percentage: 85, count: 32 },
    { stars: 4, percentage: 12, count: 3 },
    { stars: 3, percentage: 2, count: 1 },
    { stars: 2, percentage: 1, count: 0 },
    { stars: 1, percentage: 0, count: 0 },
  ];

  return (
    <div
      onClick={(e) => {
        // Close if click is outside modal card container
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-start justify-center p-4 md:p-8"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        className="relative bg-[#090f19] border border-gray-800/80 rounded-3xl w-full max-w-5xl shadow-2xl shadow-cyan-950/20 overflow-hidden my-auto"
      >
        {/* Close Button top-right */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-10 p-2.5 bg-black/40 hover:bg-black/80 border border-gray-800 rounded-xl text-gray-400 hover:text-white transition-colors duration-150 cursor-pointer"
          aria-label="Close details dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Main Content Container */}
        <div className="p-6 md:p-10">
          
          {/* Two-Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
            
            {/* Left Column: Huge visual container with emoji */}
            <div className="md:col-span-5 flex flex-col gap-4">
              <div className="relative aspect-square rounded-2xl bg-gradient-to-br from-[#0c1421] to-[#121d2e] border border-gray-800/80 flex items-center justify-center overflow-hidden">
                <div className={`absolute w-44 h-44 rounded-full filter blur-3xl opacity-20 bg-gradient-to-tr ${product.gradientFrom} ${product.gradientTo}`} />
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover relative z-10 transition-transform duration-300 hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <span className="text-8.5xl filter drop-shadow-[0_15px_15px_rgba(0,229,255,0.2)] select-none">
                    {product.emoji}
                  </span>
                )}

                {/* Hot badge floating */}
                {product.badge && (
                  <span className="absolute top-4 left-4 bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-display font-bold px-3 py-1 rounded-full z-20">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Verified Badge and Info */}
              <div className="p-4 bg-[#070b13] border border-gray-800/60 rounded-xl flex items-center gap-3">
                <div className="p-2 bg-cyan-950/40 text-[#00e5ff] rounded-lg">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-white text-xs font-semibold">100% Sealed & Authentic</h5>
                  <p className="text-gray-400 text-[10px]">With manufacturer warranty & COD</p>
                </div>
              </div>
            </div>

            {/* Right Column: Descriptions & action buttons */}
            <div className="md:col-span-7 flex flex-col">
              <span className="text-[#00e5ff] text-xs font-display font-extrabold tracking-widest uppercase">
                {product.brand}
              </span>
              <h1 className="font-display font-extrabold text-2xl md:text-3.5xl text-white mt-1 leading-tight tracking-tight">
                {product.name}
              </h1>

              {/* Stars summary details */}
              <div className="flex items-center gap-2 mt-3 select-none">
                <div className="flex text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4.5 h-4.5 ${
                        i < Math.floor(product.rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-gray-700'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-amber-400 font-semibold font-mono text-sm">{product.rating}</span>
                <span className="text-gray-400 border-l border-gray-800 pl-2 text-xs">
                  {product.reviewsCount} Customer Reviews
                </span>
                <span className="text-emerald-400 text-xs font-medium px-2 py-0.5 rounded bg-emerald-500/10 font-mono ml-auto">
                  In Stock
                </span>
              </div>

              {/* Pricing section */}
              <div className="bg-[#05090f] border border-gray-800/50 p-5 rounded-2xl mt-5 flex items-center justify-between gap-4">
                <div className="flex flex-col">
                  <span className="text-gray-500 text-xs font-display">PRICING (COD AVAILABLE)</span>
                  <div className="flex items-baseline gap-2.5 mt-1">
                    <span className="text-3xl font-display font-extrabold text-[#00e5ff]">
                      {formatPKR(product.price)}
                    </span>
                    {discount > 0 && (
                      <span className="text-xs font-mono line-through text-gray-500">
                        {formatPKR(product.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>

                {discount > 0 && (
                  <div className="bg-[#7c3aed]/10 text-violet-400 border border-[#7c3aed]/20 px-4 py-2 rounded-xl text-center flex flex-col justify-center">
                    <span className="text-[10px] font-bold tracking-wider font-display uppercase">Save</span>
                    <span className="text-lg font-black font-display leading-tight">{discount}% OFF</span>
                  </div>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-300 text-sm mt-5 leading-relaxed">
                {product.description}
              </p>

              {/* Action columns: Add to Cart, Wishlist */}
              <div className="flex flex-wrap gap-3 mt-6">
                <button
                  onClick={() => onBuyNow(product)}
                  className="flex-1 min-w-[150px] bg-gradient-to-r from-[#00e5ff] to-[#7c3aed] hover:brightness-110 text-white font-display font-bold text-sm py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 active:scale-98 shadow-md cursor-pointer"
                >
                  Buy Now (Instant COD)
                </button>
                <button
                  onClick={() => onAddToCart(product, 1)}
                  className="bg-[#05090f] border border-gray-800 hover:border-gray-700 text-white font-display font-bold text-sm py-4 px-5 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 active:scale-98 cursor-pointer"
                >
                  <ShoppingCart className="w-4.5 h-4.5" />
                  Add to Cart
                </button>
                <button
                  onClick={() => onToggleWishlist(product)}
                  className={`p-4 rounded-xl transition-all duration-200 border cursor-pointer flex items-center justify-center gap-2 ${
                    isWishlisted
                      ? 'bg-[#7c3aed]/20 border-[#7c3aed] text-violet-400'
                      : 'bg-[#05090f] border-gray-800 text-gray-400 hover:text-white'
                  }`}
                  aria-label="Toggle wishlist"
                >
                  <Heart className={`w-4.5 h-4.5 ${isWishlisted ? 'fill-current' : ''}`} />
                  <span className="text-xs font-semibold px-1">
                    {isWishlisted ? 'Wishlisted' : 'Add Wishlist'}
                  </span>
                </button>
              </div>

            </div>
          </div>

          {/* Specifications Grid */}
          <div className="mt-10 border-t border-gray-800/65 pt-8">
            <h3 className="font-display font-bold text-lg text-white mb-4">Technical Specifications</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(product.specs).map(([key, value]) => {
                if (!value) return null;
                return (
                  <div key={key} className="bg-[#05090f] border border-gray-800/40 p-3.5 rounded-xl">
                    <span className="text-gray-500 uppercase font-display text-[10px] tracking-wider select-none">
                      {key}
                    </span>
                    <p className="text-gray-200 text-xs font-medium mt-1 leading-snug">
                      {value}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Ratings Summary (Star percentages) & Reviews */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-10 border-t border-gray-800/65 pt-8">
            
            {/* Left: Star bar chart */}
            <div className="md:col-span-4 flex flex-col bg-[#05090f] border border-gray-800/30 p-6 rounded-2xl justify-between">
              <div>
                <h4 className="font-display font-bold text-white text-base">Ratings Summary</h4>
                <div className="flex items-baseline gap-2 mt-4 select-none">
                  <span className="text-4xl font-extrabold text-white font-mono">{product.rating}</span>
                  <span className="text-gray-500 font-mono text-sm">/ 5.0</span>
                </div>
                <div className="flex text-amber-400 mt-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating) ? 'fill-amber-400' : 'text-gray-800'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-500 text-xs font-mono mt-1 block">Based on verified orders</span>
              </div>

              {/* Progress Bars */}
              <div className="space-y-2 mt-6">
                {ratingDistribution.map((r) => (
                  <div key={r.stars} className="flex items-center gap-3">
                    <span className="text-xs text-gray-400 font-mono w-4 shrink-0">{r.stars}★</span>
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

            {/* Right: Pakistani verified buyer reviews scrolling */}
            <div className="md:col-span-8 flex flex-col">
              <h4 className="font-display font-semibold text-white text-base mb-4">Customer Reviews</h4>
              <div className="space-y-4 max-h-[340px] overflow-y-auto pr-2 custom-scrollbar">
                {product.reviews.map((rev) => {
                  // Get initials from review name
                  const initials = rev.name
                    ?.split(' ')
                    .map((n) => n[0])
                    .join('') || '?';

                  return (
                    <div key={rev.id} className="bg-[#05090f]/50 border border-gray-800/40 p-4.5 rounded-2xl flex flex-col gap-3">
                      <div className="flex items-start justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00e5ff]/20 to-[#7c3aed]/20 text-[#00e5ff] border border-[#00e5ff]/10 flex items-center justify-center text-xs font-bold font-display select-none">
                            {initials}
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="text-white text-sm font-semibold">{rev.name}</span>
                              <span className="text-cyan-400 text-[10px] font-medium font-mono">
                                ({rev.city})
                              </span>
                            </div>
                            <span className="text-emerald-400 text-[10px] font-semibold flex items-center gap-1 mt-0.5 select-none">
                              <span>✅ Verified Buyer</span>
                            </span>
                          </div>
                        </div>

                        {/* Stars & days */}
                        <div className="flex flex-col items-end gap-1">
                          <div className="flex text-amber-400 select-none">
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
                          <span className="text-[10px] text-gray-500 font-mono select-none">{rev.date}</span>
                        </div>
                      </div>

                      {/* Review Urdu-mixed Text */}
                      <p className="text-gray-300 text-xs md:text-sm italic leading-relaxed pl-1">
                        "{rev.text}"
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Related Products horizontal strip */}
          <div className="mt-10 border-t border-gray-800/65 pt-8">
            <div className="flex justify-between items-center mb-5">
              <h3 className="font-display font-extrabold text-lg text-white">Suggested Products</h3>
              <span className="text-xs text-gray-400 flex items-center gap-2">
                <ArrowRightLeft className="w-3.5 h-3.5 text-[#00e5ff]" />
                Explore Matches
              </span>
            </div>
            
            <div className="flex gap-4 overflow-x-auto pb-4 pt-1 px-1 snap-x select-none">
              {relatedProducts.map((p) => {
                const discountPct = calculateDiscount(p.originalPrice, p.price);
                return (
                  <div
                    key={p.id}
                    onClick={() => {
                      onSwitchProduct(p);
                      // Scroll detail container back to top
                      if (containerRef.current) {
                        containerRef.current.scrollTop = 0;
                      }
                    }}
                    className="min-w-[200px] w-52 snap-start flex-shrink-0 bg-[#060b13] border border-gray-800/60 hover:border-[#00e5ff]/50 rounded-xl p-3.5 cursor-pointer hover:bg-[#070e1b] transition-all duration-200"
                  >
                    <div className="aspect-square bg-slate-950 rounded-lg flex items-center justify-center mb-3 relative overflow-hidden border border-gray-800/40">
                      <div className={`absolute w-16 h-16 rounded-full filter blur-xl opacity-10 bg-gradient-to-tr ${p.gradientFrom} ${p.gradientTo}`} />
                      {p.image ? (
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-full h-full object-cover relative z-10"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <span className="text-3.5xl drop-shadow-sm select-none">{p.emoji}</span>
                      )}
                    </div>
                    <span className="text-[#00e5ff] text-[9px] font-bold tracking-widest uppercase block mb-0.5">{p.brand}</span>
                    <h5 className="text-white text-xs font-semibold line-clamp-1 mb-1">{p.name}</h5>
                    <div className="flex items-center justify-between gap-1.5 mt-2">
                      <span className="text-xs text-white font-bold font-mono">{formatPKR(p.price)}</span>
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
      </motion.div>
    </div>
  );
}
