import { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';

const AuthImage = ({ productId, productName, className = 'w-full h-full object-cover' }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let objectUrl = null;

    const fetchImage = async () => {
      if (!productId) {
        setLoading(false);
        setError(true);
        return;
      }

      try {
        const response = await axiosInstance.get(`/crm/v6/Products/${productId}/photo`, {
          responseType: 'blob',
        });

        if (response.status === 200 && response.data.size > 0) {
          objectUrl = URL.createObjectURL(response.data);
          setImageSrc(objectUrl);
          setError(false);
        } else {
          setError(true);
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchImage();

        return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [productId]);

  if (loading) {
    return (
      <div className="w-full h-full bg-slate-100 flex items-center justify-center animate-pulse">
        <svg className="w-8 h-8 text-slate-300 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      </div>
    );
  }

  if (error || !imageSrc) {

    const initials = productName
      ? productName.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()
      : 'P';

    return (
      <div className="w-full h-full bg-gradient-to-tr from-slate-100 to-slate-200 border-slate-100 flex flex-col items-center justify-center p-4 text-center">
        <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg shadow-inner mb-2 select-none">
          {initials}
        </div>
        <span className="text-[11px] font-semibold text-slate-500 max-w-[85%] truncate uppercase tracking-wider">{productName}</span>
      </div>
    );
  }

  return (
    <img
      src={imageSrc}
      alt={productName || 'Product Image'}
      className={className}
      loading="lazy"
    />
  );
};

export default AuthImage;
