import React from 'react';
import { motion } from 'motion/react';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { Product } from '../types';
import { formatPKR, calculateDiscount } from '../utils';

interface ProductCardProps {
  key?: any;
  product: Product;
  index: number;
  isWishlisted: boolean;
  onOpenDetails: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onToggleWishlist: (product: Product) => void;
  onBuyNow: (product: Product) => void;
}

export default function ProductCard({
  product,
  index,
  isWishlisted,
  onOpenDetails,
  onAddToCart,
  onToggleWishlist,
  onBuyNow,
}: ProductCardProps) {
  const discount = calculateDiscount(product.originalPrice, product.price);

  // Badge dynamic colors
  const badgeColors = {
    HOT: 'bg-rose-500/10 text-rose-400 border border-rose-500/20',
    NEW: 'bg-[#7c3aed]/10 text-violet-400 border border-[#7c3aed]/20',
    SALE: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8 }}
      onClick={() => onOpenDetails(product)}
      className="group relative bg-[#0d1522] border border-gray-800/80 hover:border-[#00e5ff]/50 rounded-2xl overflow-hidden cursor-pointer flex flex-col justify-between transition-all duration-300 shadow-lg hover:shadow-cyan-950/20"
    >
      {/* Decorative Outer Glow on Card Hover */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#00e5ff]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div className="p-5 flex-1 flex flex-col">
        {/* Card Header Badge and Wishlist */}
        <div className="flex justify-between items-center mb-4">
          <div>
            {product.badge && (
              <span className={`text-xs font-display font-bold px-2.5 py-1 rounded-full ${badgeColors[product.badge]}`}>
                {product.badge}
              </span>
            )}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product);
            }}
            className={`p-2 rounded-xl transition-all duration-200 border cursor-pointer ${
              isWishlisted
                ? 'bg-[#7c3aed]/20 border-[#7c3aed] text-violet-400'
                : 'bg-[#060a0f] border-gray-800/70 text-gray-400 hover:text-white'
            }`}
            aria-label="Toggle wishlist"
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Brand name */}
        <span className="text-[#00e5ff] text-xs font-semibold tracking-widest uppercase font-display select-none">
          {product.brand}
        </span>

        {/* Product image/emoji placeholder */}
        <div className="relative my-6 aspect-square max-h-40 w-full flex items-center justify-center rounded-2xl bg-gradient-to-br from-[#0a111a] to-[#121c2c] overflow-hidden border border-gray-800/50">
          {/* Inner pulsating glow backdrop connected to product's gradient info */}
          <div className={`absolute w-32 h-32 rounded-full filter blur-2xl opacity-10 bg-gradient-to-tr ${product.gradientFrom} ${product.gradientTo} group-hover:opacity-20 transition-opacity duration-300`} />
          
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover relative z-10 transition-transform duration-300 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
          ) : (
            <span className="text-6.5xl filter drop-shadow-[0_10px_10px_rgba(0,229,255,0.15)] group-hover:scale-110 transition-transform duration-300 select-none">
              {product.emoji}
            </span>
          )}
        </div>

        {/* Stars and ratings */}
        <div className="flex items-center gap-1.5 mb-2 select-none">
          <div className="flex text-amber-400">
            {Array.from({ length: 5 }).map((_, i) => {
              const starVal = i + 1;
              return (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    starVal <= Math.floor(product.rating)
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-gray-700'
                  }`}
                />
              );
            })}
          </div>
          <span className="text-xs text-amber-400 font-medium font-mono">{product.rating}</span>
          <span className="text-gray-500 text-xs font-mono">({product.reviewsCount})</span>
        </div>

        {/* Product name */}
        <h3 className="font-display font-bold text-lg leading-snug text-white line-clamp-1 mb-2 group-hover:text-[#00e5ff] transition-colors duration-200">
          {product.name}
        </h3>
      </div>

      {/* Pricing and Action button footer */}
      <div className="border-t border-gray-800/50 p-5 bg-[#0a111a]/50 flex items-center justify-between gap-2 flex-wrap">
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="text-[#00e5ff] font-display font-extrabold text-[15px] sm:text-[17px]">
              {formatPKR(product.price)}
            </span>
            {discount > 0 && (
              <span className="bg-emerald-500/10 text-emerald-400 text-[9px] font-bold px-1 py-0.5 rounded font-display">
                -{discount}%
              </span>
            )}
          </div>
          <span className="text-gray-500 line-through text-[11px] font-mono">
            {formatPKR(product.originalPrice)}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onBuyNow(product);
            }}
            className="bg-gradient-to-r from-[#00e5ff] to-[#7c3aed] hover:brightness-110 text-white text-xs font-display font-bold px-3 py-2.5 rounded-lg transition-all duration-200 hover:scale-103 active:scale-97 cursor-pointer"
          >
            Buy Now
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product, 1);
            }}
            className="bg-[#05090f] border border-gray-800 hover:border-[#00e5ff] text-gray-300 hover:text-white p-2.5 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
            aria-label="Add to cart"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
