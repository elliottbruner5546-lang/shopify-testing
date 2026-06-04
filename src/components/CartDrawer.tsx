import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Plus, Minus, CreditCard, ShoppingBag, Truck, Check } from 'lucide-react';
import { CartItem } from '../types';
import { formatPKR } from '../utils';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onTriggerToast: (message: string) => void;
  initialStep?: 'cart' | 'checkout';
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onTriggerToast,
  initialStep,
}: CartDrawerProps) {
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout' | 'success'>(initialStep || 'cart');

  React.useEffect(() => {
    if (isOpen) {
      setCheckoutStep(initialStep || 'cart');
    }
  }, [isOpen, initialStep]);

  const [shippingForm, setShippingForm] = useState({
    name: '',
    phone: '',
    address: '',
    city: 'Lahore',
    notes: '',
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  
  // High-value tech sets shipping to flat free, otherwise 250 PKR
  const shippingFee = subtotal > 45000 ? 0 : 250;
  const codFee = 0; // Standard Cash On Delivery is free to encourage buyers
  const grandTotal = subtotal + shippingFee + codFee;

  // Handle Form Change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setShippingForm((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Form Validation and submission
  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!shippingForm.name.trim()) errors.name = 'Full Name is required';
    if (!shippingForm.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^(\+92|0|92)[3][0-9]{9}$/.test(shippingForm.phone.replace(/[\s-]/g, ''))) {
      errors.phone = 'Enter a valid Pakistani mobile number (e.g. 03001234567)';
    }
    if (!shippingForm.address.trim()) errors.address = 'Delivery address is required';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      onTriggerToast('Please correct errors before placing the order.');
      return;
    }

    // Success state
    setCheckoutStep('success');
    onTriggerToast(`Zabardast! Order placed successfully for ${shippingForm.name}.`);
  };

  const handleResetAndClose = () => {
    onClearCart();
    setCheckoutStep('cart');
    setShippingForm({
      name: '',
      phone: '',
      address: '',
      city: 'Lahore',
      notes: '',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-end">
      {/* Click outside to close wrapper */}
      <div className="absolute inset-0 cursor-pointer" onClick={() => checkoutStep !== 'success' && onClose()} />

      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 220 }}
        className="relative w-full max-w-md bg-[#090f19] border-l border-gray-800/80 shadow-2xl h-full flex flex-col z-10"
      >
        {/* Header Drawer */}
        <div className="p-5 border-b border-gray-800/70 flex items-center justify-between bg-[#070b12]">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#00e5ff]" />
            <h2 className="font-display font-extrabold text-lg text-white">Your TechZone Cart</h2>
          </div>
          {checkoutStep !== 'success' && (
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-gray-800/60 rounded-lg text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Dynamic Body content */}
        <div className="flex-1 overflow-y-auto p-5">
          {checkoutStep === 'success' ? (
            /* Success View */
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12 flex flex-col items-center justify-center h-full gap-4"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mb-2 shadow-lg shadow-emerald-950/20">
                <Check className="w-8 h-8" />
              </div>
              <h3 className="font-display font-black text-2xl text-white">Order Confirmed!</h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-sm px-4">
                Thank you for shopping with <strong className="text-white">TechZone.pk</strong>. <br />
                Our team in Lahore will contact you shortly on WhatsApp/Call to verify your COD shipment details.
              </p>

              <div className="bg-[#05090f] border border-gray-800/60 p-4 rounded-xl text-left w-full max-w-xs mt-4">
                <span className="text-[10px] text-gray-500 font-display block">SHIP TO:</span>
                <span className="text-white text-xs font-semibold block mt-0.5">{shippingForm.name}</span>
                <span className="text-gray-400 text-xs block mt-0.5">{shippingForm.phone}</span>
                <span className="text-gray-400 text-xs block mt-0.5 line-clamp-2">{shippingForm.address}, {shippingForm.city}</span>
                <div className="border-t border-gray-800/50 mt-3 pt-3 flex justify-between text-xs font-mono font-bold">
                  <span className="text-gray-500">PAYABLE ON COD:</span>
                  <span className="text-[#00e5ff]">{formatPKR(grandTotal)}</span>
                </div>
              </div>

              <button
                onClick={handleResetAndClose}
                className="mt-6 bg-gradient-to-r from-[#00e5ff] to-[#7c3aed] text-white font-display font-bold py-3.5 px-8 rounded-xl outline-none border-none transition-all duration-200 active:scale-95 shadow-md hover:brightness-110 cursor-pointer"
              >
                Continue Shopping
              </button>
            </motion.div>
          ) : checkoutStep === 'checkout' ? (
            /* Checkout Form View */
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col h-full justify-between"
            >
              <form onSubmit={handlePlaceOrder} className="space-y-4">
                <div className="pb-2">
                  <h4 className="font-display font-medium text-white text-sm">Shipping & Contact Details</h4>
                  <p className="text-xs text-gray-400 mt-1">We offer Cash on Delivery all across Pakistan.</p>
                </div>

                {/* Name */}
                <div>
                  <label htmlFor="name-input" className="block text-xs uppercase tracking-wider text-gray-400 font-display font-semibold mb-1">
                    Your Full Name *
                  </label>
                  <input
                    id="name-input"
                    type="text"
                    name="name"
                    value={shippingForm.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Hamza Tariq"
                    className="w-full bg-[#05090f] border border-gray-800 hover:border-gray-700 focus:border-[#00e5ff] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-gray-500 transition-colors duration-150 outline-none"
                  />
                  {formErrors.name && (
                    <span className="text-rose-500 text-[10px] font-semibold mt-1 block">{formErrors.name}</span>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone-input" className="block text-xs uppercase tracking-wider text-gray-400 font-display font-semibold mb-1">
                    Pakistani WhatsApp / Phone Number *
                  </label>
                  <input
                    id="phone-input"
                    type="tel"
                    name="phone"
                    value={shippingForm.phone}
                    onChange={handleInputChange}
                    placeholder="e.g. 03001234567"
                    className="w-full bg-[#05090f] border border-gray-800 hover:border-gray-700 focus:border-[#00e5ff] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-gray-500 transition-colors duration-150 outline-none"
                  />
                  {formErrors.phone && (
                    <span className="text-rose-500 text-[10px] font-semibold mt-1 block">{formErrors.phone}</span>
                  )}
                </div>

                {/* City */}
                <div>
                  <label htmlFor="city-select" className="block text-xs uppercase tracking-wider text-gray-400 font-display font-semibold mb-1">
                    City *
                  </label>
                  <select
                    id="city-select"
                    name="city"
                    value={shippingForm.city}
                    onChange={handleInputChange}
                    className="w-full bg-[#05090f] border border-gray-800 rounded-xl px-3.5 py-2.5 text-sm text-white transition-colors duration-150 outline-none cursor-pointer"
                  >
                    <option value="Lahore">Lahore</option>
                    <option value="Karachi">Karachi</option>
                    <option value="Islamabad">Islamabad</option>
                    <option value="Rawalpindi">Rawalpindi</option>
                    <option value="Faisalabad">Faisalabad</option>
                  </select>
                </div>

                {/* Delivery Address */}
                <div>
                  <label htmlFor="address-input" className="block text-xs uppercase tracking-wider text-gray-400 font-display font-semibold mb-1">
                    Home / Office Street Address *
                  </label>
                  <textarea
                    id="address-input"
                    name="address"
                    rows={3}
                    value={shippingForm.address}
                    onChange={handleInputChange}
                    placeholder="e.g. House No 45-B, Sector Z, Phase 6, DHA"
                    className="w-full bg-[#05090f] border border-gray-800 hover:border-gray-700 focus:border-[#00e5ff] rounded-xl px-3.5 py-2 text-sm text-white placeholder-gray-500 transition-colors duration-150 outline-none resize-none"
                  />
                  {formErrors.address && (
                    <span className="text-rose-500 text-[10px] font-semibold mt-1 block">{formErrors.address}</span>
                  )}
                </div>

                {/* Delivery Note */}
                <div>
                  <label htmlFor="notes-input" className="block text-xs uppercase tracking-wider text-gray-400 font-display font-semibold mb-1">
                    Delivery Notes (Optional)
                  </label>
                  <input
                    id="notes-input"
                    type="text"
                    name="notes"
                    value={shippingForm.notes}
                    onChange={handleInputChange}
                    placeholder="e.g. call before arriving"
                    className="w-full bg-[#05090f] border border-gray-800 hover:border-gray-700 focus:border-[#00e5ff] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-gray-500 transition-colors duration-150 outline-none"
                  />
                </div>
              </form>

              {/* Action Buttons inside checkout */}
              <div className="space-y-3 mt-6 border-t border-gray-800/60 pt-4">
                <button
                  type="button"
                  onClick={handlePlaceOrder}
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-display font-bold py-3.5 rounded-xl transition-all duration-200 shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Check className="w-5 h-5" />
                  Confirm Cash on Delivery Order
                </button>
                <button
                  type="button"
                  onClick={() => setCheckoutStep('cart')}
                  className="w-full bg-transparent border border-gray-800 hover:border-gray-700 text-gray-400 hover:text-white font-display font-bold py-2.5 rounded-xl transition-all duration-150 cursor-pointer"
                >
                  Back to Cart Review
                </button>
              </div>
            </motion.div>
          ) : cartItems.length === 0 ? (
            /* Empty Cart View */
            <div className="flex flex-col items-center justify-center h-full text-center py-20">
              <ShoppingBag className="w-12 h-12 text-gray-700 mb-4 animate-pulse" />
              <h3 className="font-display font-semibold text-white">Your Cart is Empty</h3>
              <p className="text-gray-500 text-xs mt-1.5 max-w-xs leading-relaxed">
                Unlock full computational power. Browse our categorised items list and click the shopping cart icon.
              </p>
              <button
                onClick={onClose}
                className="mt-6 border border-gray-800 hover:border-[#00e5ff] text-[#00e5ff] hover:bg-[#00e5ff]/5 px-6 py-2.5 rounded-xl text-xs font-display font-bold transition-all duration-200 cursor-pointer"
              >
                Start Exploring
              </button>
            </div>
          ) : (
            /* Standard Cart Products List */
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.product.id}
                  className="bg-[#05090f]/55 border border-gray-800/40 p-3.5 rounded-xl flex gap-3 items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 bg-slate-950 rounded-lg flex items-center justify-center border border-gray-800/50 flex-shrink-0 relative overflow-hidden">
                      {item.product.image ? (
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover relative z-10"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <span className="text-2.5xl drop-shadow-sm select-none">{item.product.emoji}</span>
                      )}
                    </div>
                    <div>
                      <h4 className="text-white text-xs md:text-sm font-semibold line-clamp-1">
                        {item.product.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[#00e5ff] text-xs font-bold font-mono">
                          {formatPKR(item.product.price)}
                        </span>
                        {item.quantity > 1 && (
                          <span className="text-gray-500 text-[10px] font-mono">
                            x{item.quantity}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2 shrink-0">
                    {/* Qty selectors */}
                    <div className="flex items-center gap-1.5 bg-black/45 border border-gray-800 rounded-lg p-1">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1 text-gray-400 hover:text-white transition-colors duration-150 disabled:opacity-40 disabled:hover:text-gray-400 cursor-pointer"
                        disabled={item.quantity <= 1}
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs text-white px-1.5 font-bold font-mono">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1 text-gray-400 hover:text-white transition-colors duration-150 cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Delete button */}
                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="text-gray-500 hover:text-rose-400 p-1 rounded transition-colors duration-150 cursor-pointer"
                      title="Remove product"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}

              {/* Delivery notice */}
              <div className="bg-[#7c3aed]/5 border border-[#7c3aed]/25 p-3.5 rounded-xl flex gap-3 mt-4 items-center">
                <Truck className="w-5 h-5 text-violet-400 flex-shrink-0 animate-bounce" />
                <div className="text-xs text-gray-400">
                  {subtotal > 45000 ? (
                    <span>
                      <strong className="text-violet-300">Congratulations!</strong> Your order qualifies for free delivery inside Pakistan.
                    </span>
                  ) : (
                    <span>
                      Add <strong className="text-violet-300">{formatPKR(45000 - subtotal)}</strong> more to unlock <strong className="text-violet-300">Free Delivery</strong> nationwide.
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Purchase Footer Calculator Panel */}
        {cartItems.length > 0 && checkoutStep !== 'success' && (
          <div className="bg-[#070b13] border-t border-gray-800 p-5 space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-gray-400">
                <span>Subtotal Items</span>
                <span className="font-mono">{formatPKR(subtotal)}</span>
              </div>
              <div className="flex justify-between text-xs text-gray-400">
                <span>Shipment Charges (Pakistan-wide)</span>
                <span className="font-mono">
                  {shippingFee === 0 ? <span className="text-emerald-400 font-bold uppercase">FREE</span> : formatPKR(shippingFee)}
                </span>
              </div>
              <div className="flex justify-between text-xs text-gray-400">
                <span>COD Processing Cost</span>
                <span className="font-mono uppercase text-emerald-400 font-bold">FREE</span>
              </div>
              <div className="border-t border-gray-800/80 pt-2 flex justify-between text-sm font-bold text-white">
                <span className="font-display">Total Payable</span>
                <span className="text-[#00e5ff] font-mono text-base">{formatPKR(grandTotal)}</span>
              </div>
            </div>

            {checkoutStep === 'cart' ? (
              <button
                onClick={() => setCheckoutStep('checkout')}
                className="w-full bg-gradient-to-r from-[#00e5ff] to-[#7c3aed] text-white font-display font-bold py-3.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 cursor-pointer"
              >
                <CreditCard className="w-4.5 h-4.5" />
                Proceed to Checkout Form
              </button>
            ) : null}
          </div>
        )}
      </motion.div>
    </div>
  );
}
