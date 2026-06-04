import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Check } from 'lucide-react';
import { Product } from '../types';
import { formatPKR } from '../utils';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  onOrderSuccess: (name: string, phone: string, address: string, city: string, grandTotal: number) => void;
}

export default function CheckoutModal({
  isOpen,
  onClose,
  product,
  onOrderSuccess,
}: CheckoutModalProps) {
  // Input fields state
  const [form, setForm] = useState({
    email: '',
    subscribeNewsletter: true,
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: 'Lahore',
    postalCode: '',
    province: 'Punjab',
    phone: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  // Provinces List for Pakistan
  const provinces = [
    'Punjab',
    'Sindh',
    'Khyber Pakhtunkhwa',
    'Balochistan',
    'Islamabad Capital Territory',
    'Azad Jammu & Kashmir',
    'Gilgit-Baltistan',
  ];

  // Common Pakistani Cities
  const cities = [
    'Lahore',
    'Karachi',
    'Islamabad',
    'Rawalpindi',
    'Faisalabad',
    'Multan',
    'Peshawar',
    'Quetta',
    'Sialkot',
    'Gujranwala',
    'Hyderabad',
    'Sargodha',
    'Bahawalpur',
    'Sukkur',
    'Jhelum',
    'Gujrat',
    'Sahiwal',
    'Okara',
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    setForm((prev) => ({ ...prev, [name]: val }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Email validation
    if (!form.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      newErrors.email = 'Enter a valid email address';
    }

    // First and Last Name
    if (!form.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!form.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    // Street Address
    if (!form.address.trim()) {
      newErrors.address = 'Street address is required';
    }

    // City
    if (!form.city.trim()) {
      newErrors.city = 'City is required';
    }

    // Postal Code (Compulsory as requested)
    if (!form.postalCode.trim()) {
      newErrors.postalCode = 'Postal code is required';
    } else if (form.postalCode.trim().length < 4) {
      newErrors.postalCode = 'Enter a valid postal code (min 4 digits)';
    }

    // Province (Compulsory as requested)
    if (!form.province) {
      newErrors.province = 'Province name is required';
    }

    // Phone / Number (Compulsory as requested)
    if (!form.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^((\+92|0|92)[3][0-9]{9})$/.test(form.phone.replace(/[\s-]/g, ''))) {
      newErrors.phone = 'Enter a valid Pakistani mobile number (e.g. 03001234567)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate order placement
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 flex items-center justify-center p-4" id="checkout-modal-overlay">
      <div className="relative w-full max-w-[1100px] bg-white rounded-2xl shadow-2xl overflow-hidden text-slate-800 flex flex-col md:flex-row h-[90vh] md:h-[85vh]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
          aria-label="Close Checkout"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Shopify Checkout Form */}
        <div className="w-full md:w-[60%] p-6 md:p-8 overflow-y-auto h-full bg-white flex flex-col justify-between">
          <div className="mb-6 flex items-center gap-1.5">
            <span className="font-extrabold text-lg text-slate-900 tracking-tight">TechZone</span>
            <span className="text-[10px] bg-slate-900 text-white font-bold px-1 py-0.5 rounded uppercase select-none">.pk</span>
          </div>

          {isSuccess ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-6 text-center flex-1 gap-4"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-600 flex items-center justify-center mb-1 shadow">
                <Check className="w-8 h-8" />
              </div>
              <p className="text-xs text-blue-600 font-bold uppercase tracking-widest font-mono">Order Thank you!</p>
              <h3 className="font-display font-black text-2.5xl text-slate-900 tracking-tight">Order Confirmed!</h3>
              <p className="text-slate-600 text-[14px] leading-relaxed max-w-sm px-2">
                Thank you for shopping with <strong className="text-slate-900">TechZone.pk</strong>. <br />
                Our team in Lahore will contact you shortly on WhatsApp/Call to verify your COD shipment details.
              </p>

              <div className="bg-slate-50 border border-slate-250 p-5 rounded-xl text-left w-full max-w-md mt-4 space-y-3">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Ship To:</span>
                  <span className="text-slate-900 text-[13px] font-bold block mt-0.5">{form.firstName} {form.lastName}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Phone Number / Contact:</span>
                  <span className="text-slate-700 text-[13px] block mt-0.5">{form.phone}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Address of Delivery:</span>
                  <span className="text-slate-705 text-[13px] block mt-0.5">{form.address} {form.apartment ? `(${form.apartment})` : ''}</span>
                  <span className="text-slate-705 text-[13px] font-semibold block mt-0.5">{form.city}, {form.province}</span>
                </div>
                <div className="border-t border-slate-200 pt-3 flex justify-between text-xs font-mono font-bold text-slate-500">
                  <span>PAYMENT MODE:</span>
                  <span className="text-slate-900">CASH ON DELIVERY (COD)</span>
                </div>
              </div>

              <button
                onClick={() => {
                  onOrderSuccess(
                    `${form.firstName} ${form.lastName}`,
                    form.phone,
                    `${form.address}${form.apartment ? ', ' + form.apartment : ''}`,
                    `${form.city}, ${form.province}`,
                    product.price
                  );
                }}
                className="mt-6 w-full max-w-md bg-[#0c65e6] hover:bg-[#0b5cd1] text-white font-semibold text-[15px] py-4 rounded-lg transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer shadow"
              >
                Continue Shopping
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Section */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-[16px] font-semibold text-slate-950">Contact</h3>
                  <span className="text-xs text-slate-500 underline cursor-pointer hover:text-slate-900">Sign in</span>
                </div>
                
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                    className={`w-full border rounded-lg px-4 py-3 text-[14px] text-slate-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400 ${
                      errors.email ? 'border-red-500 bg-red-50/10' : 'border-slate-350 bg-white'
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-[11px] font-medium mt-1">{errors.email}</p>
                )}

                <label className="flex items-center gap-2 mt-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    name="subscribeNewsletter"
                    checked={form.subscribeNewsletter}
                    onChange={handleInputChange}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 h-4.5 w-4.5"
                  />
                  <span className="text-[13px] text-slate-600 font-medium">Email me with news and offers</span>
                </label>
              </div>

              {/* Payment (Shopify COD Block) */}
              <div>
                <h3 className="text-[16px] font-semibold text-slate-955 mb-1.5">Payment</h3>
                <p className="text-[12px] text-slate-500 mb-3">All transactions are secure and encrypted.</p>
                
                <div className="border border-blue-600 bg-blue-50/5 rounded-xl overflow-hidden">
                  <div className="p-3.5 bg-blue-50/20 border-b border-blue-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-5.5 w-5.5 rounded-full border-[5px] border-blue-600 bg-white" />
                      <span className="text-[14px] font-semibold text-slate-900">Cash on Delivery (COD)</span>
                    </div>
                  </div>
                  <div className="p-4 bg-slate-50 text-[13px] text-slate-600">
                    Pay when rider delivers the order on your doorstep.
                  </div>
                </div>
              </div>

              {/* Billing address Section */}
              <div>
                <h3 className="text-[16px] font-semibold text-slate-955 mb-4">Billing address</h3>
                
                <div className="space-y-3">
                  {/* Country/Region */}
                  <div>
                    <label className="block text-[11px] font-medium text-slate-500 uppercase tracking-wider mb-1">Country/Region</label>
                    <select
                      name="country"
                      disabled
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-3 text-[14px] text-slate-700 outline-none"
                    >
                      <option value="Pakistan">Pakistan</option>
                    </select>
                  </div>

                  {/* First & Last name Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <input
                        type="text"
                        name="firstName"
                        value={form.firstName}
                        onChange={handleInputChange}
                        placeholder="First name"
                        className={`w-full border rounded-lg px-3.5 py-3 text-[14px] text-slate-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400 ${
                          errors.firstName ? 'border-red-500' : 'border-slate-350'
                        }`}
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-[11px] font-medium mt-1">{errors.firstName}</p>
                      )}
                    </div>
                    <div>
                      <input
                        type="text"
                        name="lastName"
                        value={form.lastName}
                        onChange={handleInputChange}
                        placeholder="Last name"
                        className={`w-full border rounded-lg px-3.5 py-3 text-[14px] text-slate-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400 ${
                          errors.lastName ? 'border-red-500' : 'border-slate-350'
                        }`}
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-[11px] font-medium mt-1">{errors.lastName}</p>
                      )}
                    </div>
                  </div>

                  {/* Street Address */}
                  <div>
                    <input
                      type="text"
                      name="address"
                      value={form.address}
                      onChange={handleInputChange}
                      placeholder="Address"
                      className={`w-full border rounded-lg px-3.5 py-3 text-[14px] text-slate-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400 ${
                        errors.address ? 'border-red-500' : 'border-slate-350'
                      }`}
                    />
                    {errors.address && (
                      <p className="text-red-500 text-[11px] font-medium mt-1">{errors.address}</p>
                    )}
                  </div>

                  {/* Apartment, suite etc */}
                  <div>
                    <input
                      type="text"
                      name="apartment"
                      value={form.apartment}
                      onChange={handleInputChange}
                      placeholder="Apartment, suite, etc. (optional)"
                      className="w-full border border-slate-350 rounded-lg px-3.5 py-3 text-[14px] text-slate-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400"
                    />
                  </div>

                  {/* City and Postal code */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <select
                        name="city"
                        value={form.city}
                        onChange={handleInputChange}
                        className="w-full border border-slate-350 rounded-lg px-3.5 py-3 text-[14px] text-slate-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      >
                        {cities.map((city) => (
                          <option key={city} value={city}>{city}</option>
                        ))}
                      </select>
                      {errors.city && (
                        <p className="text-red-500 text-[11px] font-medium mt-1">{errors.city}</p>
                      )}
                    </div>
                    <div>
                      <input
                        type="text"
                        name="postalCode"
                        value={form.postalCode}
                        onChange={handleInputChange}
                        placeholder="Postal Code"
                        className={`w-full border rounded-lg px-3.5 py-3 text-[14px] text-slate-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400 ${
                          errors.postalCode ? 'border-red-500' : 'border-slate-350'
                        }`}
                      />
                      {errors.postalCode && (
                        <p className="text-red-500 text-[11px] font-medium mt-1">{errors.postalCode}</p>
                      )}
                    </div>
                  </div>

                  {/* Province Selector Group (Urdu: Province/Subsidies) */}
                  <div>
                    <label className="block text-[11px] font-medium text-slate-500 uppercase tracking-wider mb-1">Province *</label>
                    <select
                      name="province"
                      value={form.province}
                      onChange={handleInputChange}
                      className="w-full border border-slate-350 rounded-lg px-3.5 py-3 text-[14px] text-slate-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    >
                      {provinces.map((prov) => (
                        <option key={prov} value={prov}>{prov}</option>
                      ))}
                    </select>
                    {errors.province && (
                      <p className="text-red-500 text-[11px] font-medium mt-1">{errors.province}</p>
                    )}
                  </div>

                  {/* Phone Input */}
                  <div>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleInputChange}
                      placeholder="Phone Number (e.g. 03001234567)"
                      className={`w-full border rounded-lg px-3.5 py-3 text-[14px] text-slate-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400 ${
                        errors.phone ? 'border-red-500' : 'border-slate-350'
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-[11px] font-medium mt-1">{errors.phone}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Complete order button */}
              <div className="pt-4 border-t border-slate-100">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#0c65e6] hover:bg-[#0b5cd1] text-white font-semibold text-[15px] py-4 rounded-lg transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer shadow-sm shadow-blue-200/50"
                >
                  {isSubmitting ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    'Complete order'
                  )}
                </button>
              </div>

            </form>
          )}
        </div>

        {/* Right Side: Order Summary Panel */}
        <div className="w-full md:w-[40%] bg-slate-50 border-t md:border-t-0 md:border-l border-slate-100 p-6 md:p-8 flex flex-col justify-between overflow-y-auto h-full">
          <div>
            <h3 className="text-[15px] font-bold text-slate-700 tracking-wide mb-6 uppercase">Order summary</h3>
            
            {/* Product description item row */}
            <div className="flex gap-4 items-center justify-between pb-4 border-b border-slate-200/60">
              <div className="flex items-center gap-3.5">
                {/* Image wrapper with badge */}
                <div className="relative w-15 h-15 bg-white border border-slate-200 rounded-xl flex items-center justify-center p-1 font-sans">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain rounded-lg"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <span className="text-2.5xl">{product.emoji}</span>
                  )}
                  {/* Shopify Circular Quantity Badge */}
                  <span className="absolute -top-1.5 -right-1.5 h-5 w-5 bg-slate-800 text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow">
                    1
                  </span>
                </div>
                <div>
                  <h4 className="text-[14px] font-bold text-slate-900 leading-tight">
                    {product.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 font-medium font-mono mt-0.5">Brand: {product.brand}</p>
                </div>
              </div>
              <span className="text-[14px] font-semibold text-slate-800 font-mono">
                {formatPKR(product.price)}
              </span>
            </div>

            {/* Price Calculations */}
            <div className="space-y-3.5 py-5 border-b border-slate-200/60 text-[13px] text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono text-slate-800 font-medium">{formatPKR(product.price)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Shipping</span>
                <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full uppercase">Free</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes & Duties</span>
                <span className="text-slate-400 italic text-[11px]">Included</span>
              </div>
            </div>
          </div>

          {/* Pricing bottom Total row */}
          <div className="pt-5 flex items-center justify-between">
            <span className="text-[16px] font-bold text-slate-900">Total</span>
            <div className="flex items-baseline gap-1">
              <span className="text-[11px] text-slate-500 font-medium font-mono">PKR</span>
              <span className="text-[22px] font-black text-slate-950 font-mono tracking-tight">
                {formatPKR(product.price)}
              </span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
