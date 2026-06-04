import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, X, Sparkles, Gift, Check, AlertCircle } from 'lucide-react';

export default function PromoTimerAd() {
  // Global Countdown is 14 minutes and 32 seconds, resetting or sliding
  const [globalTime, setGlobalTime] = useState(872); // seconds (14m 32s)
  const [adOpen, setAdOpen] = useState(false);
  const [adTimer, setAdTimer] = useState(60); // 60 seconds backup timer inside pop ad
  const [copied, setCopied] = useState(false);

  // Tick the global flash sale timer
  useEffect(() => {
    const timer = setInterval(() => {
      setGlobalTime((prev) => (prev > 0 ? prev - 1 : 872));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Open the pop up ad after 8 seconds of loading
  useEffect(() => {
    const trigger = setTimeout(() => {
      // Check if they dismissed before or if it is already dismissed
      const isDismissed = sessionStorage.getItem('techzone_promo_dismissed');
      if (!isDismissed) {
        setAdOpen(true);
      }
    }, 8000);
    return () => clearTimeout(trigger);
  }, []);

  // Tick the promotional pop up timer when open
  useEffect(() => {
    let adInterval: NodeJS.Timeout;
    if (adOpen) {
      adInterval = setInterval(() => {
        setAdTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(adInterval);
  }, [adOpen]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText('TECH500');
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleDismissAd = () => {
    setAdOpen(false);
    sessionStorage.setItem('techzone_promo_dismissed', 'true');
  };

  return (
    <div id="promo-timer-root" className="relative z-50">
      {/* 1. STICKY TOP COUNTDOWN BAR */}
      <div className="bg-gradient-to-r from-[#05090f] via-[#7c3aed]/25 to-[#05090f] border-b border-[#00e5ff]/20 text-white py-2.5 px-4 text-center text-xs flex items-center justify-center gap-2.5 flex-wrap select-none relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00e5ff] to-transparent" />
        
        <span className="inline-flex items-center gap-1.5 font-display font-bold text-[10px] sm:text-xs">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
          </span>
          <span className="bg-[#7c3aed] text-white text-[10px] uppercase font-mono font-bold px-1.5 py-0.5 rounded mr-1">
            Midnight Sale
          </span>
          PAKISTAN HIGH-SPEED STOCK INFLOW: Extra Rs. 500 flat discount on orders above Rs. 5,000!
        </span>

        <div className="flex items-center gap-2 font-mono bg-black/45 border border-gray-800/80 rounded-lg px-2.5 py-1 text-[#00e5ff] text-[11px] font-bold">
          <Clock className="w-3.5 h-3.5 text-[#00e5ff] animate-pulse" />
          <span>SALE ENDS IN:</span>
          <span>{formatTime(globalTime)}</span>
        </div>

        <button 
          onClick={() => setAdOpen(true)}
          className="text-[10px] font-bold text-violet-300 underline hover:text-violet-100 uppercase font-display cursor-pointer select-none"
        >
          Claim Midnight Gift
        </button>
      </div>

      {/* 2. PROMOTIONAL COUNTDOWN AD POPUP MODAL */}
      <AnimatePresence>
        {adOpen && (
          <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 z-50 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="bg-[#09101b] border-2 border-[#7c3aed]/50 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative p-6 md:p-8"
              id="promo-ad-container"
            >
              {/* Radial gradient background accent */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#00e5ff]/5 filter blur-3xl rounded-full pointer-events-none" />

              {/* Close icon button */}
              <button
                onClick={handleDismissAd}
                className="absolute top-4 right-4 p-2 bg-black/40 hover:bg-black/80 border border-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors cursor-pointer z-10"
                aria-label="Close ad modal"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Ad Content */}
              <div className="text-center space-y-5 relative z-10">
                <div className="mx-auto w-16 h-16 rounded-full bg-[#7c3aed]/10 text-violet-400 flex items-center justify-center border border-[#7c3aed]/20">
                  <Gift className="w-8 h-8 text-[#00e5ff] animate-bounce" />
                </div>

                <div className="space-y-1.5">
                  <span className="text-[#00e5ff] text-[10px] font-bold tracking-widest font-mono uppercase block">
                    EXCLUSIVE EID GADGET DROP PROMO
                  </span>
                  <h3 className="font-display font-black text-2xl md:text-3xl text-white tracking-tight leading-none">
                    Rs. 500 Off Coupon Code!
                  </h3>
                  <p className="text-gray-400 text-xs max-w-xs mx-auto leading-relaxed">
                    Order details submit krty waqt niche diye gaye voucher code ko lgaen aur <strong className="text-white font-medium">Rs.500 ki bachat</strong> hasil karein.
                  </p>
                </div>

                {/* Urgently Ticking Timer in Modal */}
                <div className="bg-[#04080f] border border-gray-800/80 rounded-2xl p-4 max-w-sm mx-auto flex flex-col items-center justify-center">
                  <span className="text-gray-500 text-[9px] font-mono uppercase tracking-wider block mb-1">
                    This instant deal voucher expires in
                  </span>
                  <div className="flex items-center gap-1.5 text-center">
                    <span className="text-rose-400 font-mono font-black text-2xl sm:text-3xl animate-pulse">
                      00:
                    </span>
                    <span className="text-rose-400 font-mono font-black text-2xl sm:text-3xl animate-pulse">
                      {adTimer.toString().padStart(2, '0')}
                    </span>
                    <span className="text-rose-300 text-xs font-semibold pl-1 font-display">
                      seconds left!
                    </span>
                  </div>
                  {adTimer === 0 && (
                    <span className="text-[10px] text-amber-400 font-semibold block mt-1">
                      ⚠️ Voucher expired but our agents will still auto-verify it for COD!
                    </span>
                  )}
                </div>

                {/* Copiable Code field */}
                <div className="flex flex-col gap-2.5 max-w-sm mx-auto">
                  <div className="flex border border-gray-800 rounded-xl overflow-hidden bg-[#05090f]">
                    <div className="px-4 py-3 bg-[#0c1421] text-xs font-mono font-bold text-[#f3f4f6] flex items-center justify-center border-r border-gray-800 shrink-0">
                      Voucher Code:
                    </div>
                    <div className="flex-1 px-4 py-3 text-sm font-mono font-black tracking-widest text-[#00e5ff] flex items-center justify-center select-all">
                      TECH500
                    </div>
                    <button
                      onClick={handleCopyCode}
                      className="bg-[#7c3aed]/80 hover:bg-[#7c3aed] text-white px-4 text-xs font-display font-bold transition-colors cursor-pointer flex items-center justify-center gap-1"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          Copied
                        </>
                      ) : (
                        'Copy'
                      )}
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-center gap-1.5 text-[10px] text-gray-500 font-mono">
                    <AlertCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>Free shipping included across Pakistan. Valid for Cash on Delivery.</span>
                  </div>
                </div>

                {/* Continue checkout banner CTA */}
                <div className="pt-2 border-t border-gray-850">
                  <button
                    onClick={handleDismissAd}
                    className="bg-[#05090f] hover:bg-[#0c1421] border border-gray-800 text-gray-300 text-xs font-semibold px-5 py-2.5 rounded-xl cursor-pointer transition-all"
                  >
                    Catalog check karein (Continue Shopping)
                  </button>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
