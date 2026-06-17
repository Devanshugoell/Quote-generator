import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { formatCurrency } from '../utils/formatCurrency';
import AuthImage from './AuthImage';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="group cursor-pointer">
      {/* Product Image */}
      <Link to={`/product/${product.id}`} className="block relative bg-gray-100 rounded-xl overflow-hidden aspect-[3/4]">
        <AuthImage productId={product.id} productName={product.Product_Name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        {product.Type && (
          <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-bold text-red-600 bg-red-50 rounded-md">
            {product.Type === 'Service' ? '-20%' : '-15%'}
          </span>
        )}
      </Link>

      {/* Product Info */}
      <div className="mt-3 space-y-1.5">
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="font-semibold text-sm text-gray-900 group-hover:text-gray-600 transition-colors line-clamp-1">
            {product.Product_Name}
          </h3>
        </Link>

        {/* Star Rating */}
        <div className="flex items-center gap-1">
          <div className="flex items-center">
            {[1, 2, 3, 4].map((star) => (
              <svg key={star} className="w-3.5 h-3.5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <svg className="w-3.5 h-3.5 text-gray-300 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <span className="text-xs text-gray-400">(4.5)</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="font-bold text-sm text-gray-900">
            {formatCurrency(product.Unit_Price)}
          </span>
          <span className="text-xs text-gray-400 line-through">
            {formatCurrency(Math.round(product.Unit_Price * 1.2))}
          </span>
          <span className="text-[10px] font-bold text-red-500 bg-red-50 px-1.5 py-0.5 rounded">
            -20%
          </span>
        </div>
      </div>


      <button
        onClick={(e) => { e.stopPropagation(); addToCart(product); }}
        className="mt-3 w-full bg-gray-900 hover:bg-gray-800 text-white text-xs font-semibold py-2.5 rounded-lg group-hover:opacity-100 transition-all duration-200"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;