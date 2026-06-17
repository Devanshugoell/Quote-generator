import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { createZohoQuote } from '../api/quoteApi';
import CartItem from '../components/CartItem';
import OrderSummary from '../components/OrderSummary';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';

const Cart = () => {
  const { cart, grandTotal, updateQuantity, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const [subject, setSubject] = useState('');
  const [dealer, setDealer] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [showSubjectModal, setShowSubjectModal] = useState(false);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setShowSubjectModal(true);
    setError(null);
  };

  const handleGenerateQuote = async (e) => {
    e.preventDefault();
    if (!subject.trim()) return setError("Please input a Quote Subject.");
    if (!dealer.trim()) return setError("Please input a Dealer name.");

    setSubmitting(true);
    setError(null);
    try {
      const quotePayload = {
        Subject: subject.trim(),
        Dealer_Name: dealer.trim(),
        Quoted_Items: cart.map(item => ({
          Product_Name: {
            id: item.id,
            name: item.Product_Name
          },
          Quantity: item.quantity,
          List_Price: item.Unit_Price
        }))
      };

      const result = await createZohoQuote(quotePayload);

      if (result?.id) {
        clearCart();
        navigate(`/quotes/${result.id}`);
      } else {
        setError("Failed to create quote. CRM did not return a valid record mapping.");
      }
    } catch (err) {
      console.error(err);
      const errMsg = err.response?.data?.data?.[0]?.message || err.response?.data?.message || "Transmission error. Check Zoho API logs.";
      setError(errMsg);
    } finally {
      setSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div >
        <div className=" max-w-5xl mx-auto text-center py-20 space-y-4">
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto text-3xl border border-gray-200">
            🛒
          </div>
          <h2 className="text-xl font-bold text-gray-900">Your Cart is Empty</h2>
          <p className="text-sm text-gray-500 max-w-xs mx-auto">
            Looks like you haven't added anything to your cart yet.
          </p>
          <button
            onClick={() => navigate('/')}
            className="mt-2 bg-gray-900 hover:bg-gray-800 text-white font-bold text-sm px-8 py-3 rounded-lg transition"
          >
            Start Shopping
          </button>
        </div>
        <Newsletter />
        <Footer />
      </div>
    );
  }

  return (
    <div className="pt-6">

    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
      <div className="flex items-center gap-2 text-xs text-gray-400 mb-6">
        <Link to="/" className="hover:text-gray-700 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-gray-700 font-medium">Cart</span>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tight mb-8">
        Your Cart
      </h1>


      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

        <div className="lg:col-span-2">
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="divide-y divide-gray-200">
              {cart.map(item => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateQty={updateQuantity}
                  onRemove={removeFromCart}
                />
              ))}
            </div>
          </div>
        </div>

        
        <div className="lg:col-span-1">
          <OrderSummary
            grandTotal={grandTotal}
            onCheckout={handleCheckout}
            submitting={submitting}
          />
        </div>
      </div>


      {showSubjectModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md space-y-4 shadow-xl">
            <h3 className="font-bold text-gray-900 text-lg">Quote Details</h3>
            <p className="text-xs text-gray-500">Enter quote subject and dealer information before syncing to Zoho CRM.</p>

            {error && (
              <div className="p-3 bg-red-50 border border-red-100 text-red-600 rounded-lg text-xs font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleGenerateQuote} className="space-y-4">
              <input
                type="text"
                value={subject}
                onChange={(e) => { setSubject(e.target.value); setError(null); }}
                className="w-full text-sm border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400 transition"
                required
                placeholder="e.g. Q3 Equipment Acquisition #4"
                autoFocus
              />
              <input
                type="text"
                value={dealer}
                onChange={(e) => { setDealer(e.target.value); setError(null); }}
                className="w-full text-sm border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400 transition"
                required
                placeholder="e.g. John Smith - ABC Corp"
              />
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => { setShowSubjectModal(false); setError(null); }}
                  className="flex-1 py-3 text-sm font-semibold border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 rounded-lg text-sm transition disabled:opacity-50"
                >
                  {submitting ? 'Syncing...' : 'Generate Quote'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
   </div>
      
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Cart;