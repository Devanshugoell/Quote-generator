import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../api/productApi';
import { useCart } from '../hooks/useCart';
import { formatCurrency } from '../utils/formatCurrency';
import Loader from '../components/Loader';
import AuthImage from '../components/AuthImage';
import ProductReviews from '../components/ProductReviews';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [error, setError] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const data = await getProductById(id);
        if (data) {
          setProduct(data);
          setError(null);
        } else {
          setError("Record item unavailable or removed from CRM.");
        }
      } catch (error) {
        console.error("Error compiling data on individual product", error);
        setError("Network error fetching specifications. Check server logs.");
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, [id]);

  if (loading) return <Loader message="Fetching product specifications..." />;
  
  if (error || !product) {
    return (
      <div className="max-w-xl mx-auto text-center py-16 bg-white rounded-2xl border border-slate-100 p-6 space-y-4">
        <span className="text-3xl">⚠️</span>
        <h2 className="text-lg font-bold text-slate-800">Product Unavailable</h2>
        <p className="text-sm text-slate-500">{error || 'Unable to view product details.'}</p>
        <button 
          onClick={() => navigate('/')}
          className="bg-blue-600 text-white font-semibold text-xs px-5 py-2.5 rounded-lg shadow-sm hover:bg-blue-700 transition"
        >
          Return to Catalogue
        </button>
      </div>
    );
  }

  const StarRating = ({ rating = 4.5 }) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-5 h-5 ${
              star <= Math.floor(rating)
                ? 'text-amber-400 fill-amber-400'
                : star - rating < 1
                ? 'text-amber-400 fill-amber-400'
                : 'text-slate-300 fill-slate-300'
            }`}
            viewBox="0 0 20 20"
          >
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        ))}
        <span className="ml-3 text-sm font-semibold text-slate-700">(4.5)</span>
      </div>
    );
  };

  const specItems = [
    { label: 'Asset Reference ID', value: product.id },
    { label: 'Billing Unit', value: product.Usage_Unit || 'Units' },
  ];

  return (
    <div className="space-y-6 mt-4">
     <div className='max-w-5xl mx-auto'>
      <button 
        onClick={() => navigate('/')} 
        className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors my-4"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Catalogue
      </button>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-8">
        
        <div className="bg-slate-50 rounded-xl aspect-square overflow-hidden relative flex items-center justify-center border border-slate-100 shadow-inner">
          <AuthImage productId={product.id} productName={product.Product_Name} className="w-full h-full object-cover" />
        </div>


        <div className="flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight">
                {product.Product_Name}
              </h1>
              <div className="flex items-center gap-4 py-2">
                <StarRating rating={4.5} />
              </div>
              <p className="text-xl font-black text-slate-800">
                {formatCurrency(product.Unit_Price)}
              </p>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <p className="text-base font-normal text-slate-600 leading-relaxed max-w-2xl">
                {product.Description || 'This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.'}
              </p>
            </div>

            {/* Tech Specs List */}
            <div className="border-t border-slate-100 pt-4 space-y-3">
              <h3 className="text-xs font-bold tracking-wider text-slate-400 uppercase">Specifications</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-xs">
                {specItems.map((spec, i) => (
                  <div key={i} className="flex justify-between py-1.5 border-b border-slate-50">
                    <span className="text-slate-400 font-medium">{spec.label}</span>
                    <span className={`text-slate-800 font-bold ${spec.mono ? 'font-mono' : ''}`}>
                      {spec.value.slice(0,6)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Select Colors */}
            <div className="border-t border-slate-100 pt-4">
              <div className="flex flex-row items-start gap-4 w-[143px] h-[37px]">
                {[
                  { name: 'Olive', bg: 'bg-yellow-700' },
                  { name: 'Teal', bg: 'bg-teal-600' },
                  { name: 'Navy', bg: 'bg-blue-900' },
                ].map(color => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-9 h-9 rounded-full ${color.bg} transition-all ${
                      selectedColor === color.name
                        ? 'ring-2 ring-offset-2 ring-slate-900 scale-110'
                        : 'hover:scale-110'
                    }`}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
          </div>

          
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center border border-slate-200 bg-white rounded-lg w-fit overflow-hidden">
                <button 
                  onClick={() => setQty(q => Math.max(1, q - 1))} 
                  className="px-3.5 py-2 hover:bg-slate-50 text-slate-600 font-extrabold transition-colors"
                >
                  -
                </button>
                <span className="px-5 py-2 font-bold text-sm text-slate-800 select-none bg-slate-50/20">
                  {qty}
                </span>
                <button 
                  onClick={() => setQty(q => q + 1)} 
                  className="px-3.5 py-2 hover:bg-slate-50 text-slate-600 font-extrabold transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            <button 
              onClick={() => { 
                addToCart(product, qty);  
              }}
              className="flex flex-row justify-center items-center py-4 gap-3 bg-black text-white font-bold text-sm rounded-2xl transition-all duration-150 hover:opacity-90 w-full"
            >
              Add to Quote Cart
            </button>
          </div>

        </div>
      </div>

      
      <ProductReviews productId={product.id} />
    </div>

      <Newsletter />


      <Footer />
    </div>
  );
};

export default ProductDetail;