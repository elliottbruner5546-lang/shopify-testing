import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, X } from 'lucide-react';

interface ToastProps {
  key?: any;
  id: string;
  message: string;
  onClose: (id: string) => void;
}

export default function Toast({ id, message, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, 2800);

    return () => clearTimeout(timer);
  }, [id, onClose]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.2 } }}
      className="bg-[#0b131e] border-l-4 border-[#00e5ff] text-white py-3 px-4 rounded-lg shadow-xl shadow-cyan-950/20 flex items-center justify-between gap-4 max-w-sm pointer-events-auto select-none"
    >
      <div className="flex items-center gap-3">
        <CheckCircle className="w-5 h-5 text-[#00e5ff] shrink-0" />
        <span className="text-sm font-medium tracking-wide">{message}</span>
      </div>
      <button
        onClick={() => onClose(id)}
        className="text-gray-400 hover:text-white transition-colors duration-150 cursor-pointer"
        aria-label="Dismiss notification"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
}
