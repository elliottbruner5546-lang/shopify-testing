import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Check } from 'lucide-react';
import { Product } from '../types';
import { formatPKR } from '../utils';

interface LiveOrderNotificationsProps {
  products: Product[];
}

interface FakeNotification {
  id: string;
  name: string;
  city: string;
  productName: string;
  productPrice: number;
  productImage?: string;
  productEmoji: string;
  timeAgo: string;
}

export default function LiveOrderNotifications({ products }: LiveOrderNotificationsProps) {
  const [currentNotification, setCurrentNotification] = useState<FakeNotification | null>(null);

  const pakNames = [
    'Zainab Bibi', 'Muhammad Ahmed', 'Usman Ali', 'Ayesha Malik', 
    'Hamza Khan', 'Fatima Sheikh', 'Bilal Siddiqui', 'Sana Yasmin', 
    'Hassan Raza', 'Omer Farooq', 'Saad Ghafoor', 'Mariam Jameel', 
    'Amina Butt', 'Usman Khalid', 'Sara Baig', 'Farhan Qureshi', 
    'Sidra Mughal', 'Zeeshan Akbar'
  ];

  const pakCities = [
    'Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Faisalabad', 
    'Peshawar', 'Multan', 'Sialkot', 'Gujranwala', 'Quetta', 'Hyderabad'
  ];

  const timeAges = [
    'just now', '1 minute ago', '2 minutes ago', '45 seconds ago', '3 minutes ago'
  ];

  useEffect(() => {
    if (products.length === 0) return;

    // Trigger notification every 16 to 25 seconds
    const interval = setInterval(() => {
      const name = pakNames[Math.floor(Math.random() * pakNames.length)];
      const city = pakCities[Math.floor(Math.random() * pakCities.length)];
      const product = products[Math.floor(Math.random() * products.length)];
      const timeAgo = timeAges[Math.floor(Math.random() * timeAges.length)];

      const newNotif: FakeNotification = {
        id: Math.random().toString(36).substring(2, 9),
        name,
        city,
        productName: product.name,
        productPrice: product.price,
        productImage: product.image,
        productEmoji: product.emoji,
        timeAgo
      };

      setCurrentNotification(newNotif);

      // Hide after 6 seconds
      setTimeout(() => {
        setCurrentNotification(prev => prev?.id === newNotif.id ? null : prev);
      }, 6500);

    }, 20000); // Trigger every 20s

    // Initial delay trigger after 5 seconds to welcome user
    const firstTrigger = setTimeout(() => {
      const name = pakNames[Math.floor(Math.random() * pakNames.length)];
      const city = pakCities[Math.floor(Math.random() * pakCities.length)];
      const product = products[Math.floor(Math.random() * products.length)];
      const newNotif: FakeNotification = {
        id: Math.random().toString(36).substring(2, 9),
        name,
        city,
        productName: product.name,
        productPrice: product.price,
        productImage: product.image,
        productEmoji: product.emoji,
        timeAgo: 'just now'
      };
      setCurrentNotification(newNotif);

      setTimeout(() => {
        setCurrentNotification(prev => prev?.id === newNotif.id ? null : prev);
      }, 6500);
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(firstTrigger);
    };
  }, [products]);

  return (
    <div className="fixed bottom-5 left-5 z-45 max-w-sm w-full px-4 sm:px-0 pointer-events-auto">
      <AnimatePresence mode="wait">
        {currentNotification && (
          <motion.div
            key={currentNotification.id}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ type: 'spring', damping: 18, stiffness: 180 }}
            className="bg-[#090f19]/95 backdrop-blur border border-gray-800/80 p-4 rounded-2xl shadow-xl flex items-center gap-3.5 relative overflow-hidden"
            id={`notif-${currentNotification.id}`}
          >
            {/* Pulsing neon overlay behind */}
            <div className="absolute top-0 right-0 w-12 h-12 bg-[#00e5ff]/5 filter blur-xl rounded-full" />

            {/* Small Product Snapshot Visualizer */}
            <div className="w-11 h-11 rounded-lg bg-slate-950 border border-gray-800/65 flex items-center justify-center flex-shrink-0 relative overflow-hidden">
              {currentNotification.productImage ? (
                <img
                  src={currentNotification.productImage}
                  alt={currentNotification.productName}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <span className="text-xl select-none">{currentNotification.productEmoji}</span>
              )}
            </div>

            {/* Live activity wording */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-white text-xs font-bold leading-none">
                  {currentNotification.name}
                </span>
                <span className="text-[#00e5ff] text-[9px] font-semibold uppercase tracking-wider bg-cyan-950/20 px-1 py-0.5 rounded">
                  {currentNotification.city}
                </span>
              </div>
              <p className="text-gray-400 text-[10px] mt-1 shrink truncate line-clamp-1">
                Ordered <strong className="text-gray-200">{currentNotification.productName}</strong>
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] font-bold font-mono text-cyan-400">
                  {formatPKR(currentNotification.productPrice)}
                </span>
                <span className="text-gray-600 text-[9px] font-mono select-none">&bull;</span>
                <span className="text-gray-500 text-[9px] font-mono select-none">
                  {currentNotification.timeAgo}
                </span>
              </div>
            </div>

            {/* Green Badge verify */}
            <div className="flex flex-col items-center justify-center gap-0.5 ml-1 select-none flex-shrink-0">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-emerald-400 text-[8px] font-mono font-bold uppercase mt-1">
                COD
              </span>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
