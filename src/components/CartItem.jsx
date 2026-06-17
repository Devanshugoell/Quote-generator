import { formatCurrency } from '../utils/formatCurrency';
import AuthImage from './AuthImage';

const CartItem = ({ item, onUpdateQty, onRemove }) => {
  return (
    <div className="flex items-center gap-5 py-5 border-b border-gray-200 last:border-0">
      {/* Product Image */}
      <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 border border-gray-100">
        <AuthImage productId={item.id} productName={item.Product_Name} className="w-full h-full object-cover" />
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-gray-900 text-sm leading-tight truncate">{item.Product_Name}</h3>
        <p className="text-xs text-gray-400 mt-0.5">
          Product Category: <span className="text-gray-600 font-medium">{item.Product_Category || 'N/A'}</span>
        </p>
        <p className="text-xs text-gray-400">
          Code: <span className="text-gray-600 font-medium font-mono">{item.Product_Code || 'N/A'}</span>
        </p>
        <p className="text-base font-bold text-gray-900 mt-1">
          {formatCurrency(item.Unit_Price)}
        </p>
      </div>

      <div className='flex flex-col items-end gap-5'>


        {/* Delete Button */}
        <button
          type="button"
          onClick={() => onRemove(item.id)}
          className="w-7 h-7 flex items-center justify-center rounded-full text-red-500 transition-colors flex-shrink-0"
        >
          <svg
            className="w-3.5 h-3.5 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 7L18.133 19.142C18.058 20.189 17.186 21 16.136 21H7.864C6.814 21 5.942 20.189 5.867 19.142L5 7M10 11V17M14 11V17M9 7V4C9 3.447 9.447 3 10 3H14C14.553 3 15 3.447 15 4V7M4 7H20"
            />
          </svg>
        </button>

        <div>
          <div className="flex items-center bg-[#f0f0f0] border border-gray-200 rounded-full overflow-hidden flex-shrink-0">
            <button
              type="button"
              onClick={() => onUpdateQty(item.id, item.quantity - 1)}
              className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-50 font-bold text-sm transition-colors"
            >
              -
            </button>
            <span className="w-8 text-center text-sm font-bold text-gray-800 select-none">{item.quantity}</span>
            <button
              type="button"
              onClick={() => onUpdateQty(item.id, item.quantity + 1)}
              className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-50 font-bold text-sm transition-colors"
            >
              +
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CartItem;
