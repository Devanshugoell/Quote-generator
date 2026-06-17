import { useState } from 'react';
import { formatCurrency } from '../utils/formatCurrency';

const OrderSummary = ({ grandTotal, onCheckout, submitting }) => {
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');

  const DELIVERY_FEE = 15;

  const handleApplyPromo = () => {
    if (!promoCode.trim()) {
      setPromoMessage('Please enter a promo code.');
      return;
    }


    const code = promoCode.trim().toUpperCase();
    if (code === 'SAVE20') {
      const discount = grandTotal * 0.20;
      setAppliedDiscount(discount);
      setPromoMessage(`Promo applied! You saved ${formatCurrency(discount)}`);
    } else if (code === 'SAVE10') {
      const discount = grandTotal * 0.10;
      setAppliedDiscount(discount);
      setPromoMessage(`Promo applied! You saved ${formatCurrency(discount)}`);
    } else {
      setAppliedDiscount(0);
      setPromoMessage('Invalid promo code.');
    }
  };

  const handleRemovePromo = () => {
    setPromoCode('');
    setAppliedDiscount(0);
    setPromoMessage('');
  };

  const subtotal = grandTotal;
  const total = Math.max(0, subtotal - appliedDiscount + DELIVERY_FEE);

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-5">
      <h2 className="font-bold text-gray-900 text-lg">Order Summary</h2>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span className="font-semibold text-gray-900">{formatCurrency(subtotal)}</span>
        </div>

        <div className="flex justify-between text-gray-600">
          <span>Discount {appliedDiscount > 0 && <span className="text-xs text-gray-400">(-{Math.round((appliedDiscount / subtotal) * 100)}%)</span>}</span>
          <span className={`font-semibold ${appliedDiscount > 0 ? 'text-red-500' : 'text-gray-900'}`}>
            {appliedDiscount > 0 ? `-${formatCurrency(appliedDiscount)}` : formatCurrency(0)}
          </span>
        </div>

        <div className="flex justify-between text-gray-600">
          <span>Delivery Fee</span>
          <span className="font-semibold text-gray-900">{formatCurrency(DELIVERY_FEE)}</span>
        </div>

        <div className="border-t border-gray-200 pt-3 flex justify-between text-gray-900 font-bold text-base">
          <span>Total</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </div>

      {/* Promo Code Input */}
      <div className="space-y-2">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <svg className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            <input
              type="text"
              value={promoCode}
              onChange={(e) => { setPromoCode(e.target.value); setPromoMessage(''); }}
              placeholder="Enter promo code"
              className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-400 transition"
            />
          </div>
          {appliedDiscount > 0 ? (
            <button
              type="button"
              onClick={handleRemovePromo}
              className="px-4 py-2.5 text-sm font-semibold bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition"
            >
              Remove
            </button>
          ) : (
            <button
              type="button"
              onClick={handleApplyPromo}
              className="px-4 py-2.5 text-sm font-semibold bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition"
            >
              Apply
            </button>
          )}
        </div>
        {promoMessage && (
          <p className={`text-xs font-medium ${promoMessage.includes('saved') ? 'text-green-600' : 'text-red-500'}`}>
            {promoMessage}
          </p>
        )}
      </div>


      <button
        type="button"
        onClick={onCheckout}
        disabled={submitting}
        className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-3.5 rounded-lg text-sm transition duration-150 shadow-sm disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {submitting ? 'Processing...' : 'Go to Checkout'}
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </button>
    </div>
  );
};

export default OrderSummary;
