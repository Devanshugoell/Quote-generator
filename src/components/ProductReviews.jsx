import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getActiveProducts } from '../api/productApi';
import { formatCurrency } from '../utils/formatCurrency';
import AuthImage from './AuthImage';

const ProductReviews = ({ productId }) => {
  const [reviews, setReviews] = useState([

    {
      id: 1,
      author: 'Samantha D',
      verified: true,
      rating: 4.5,
      text: 'I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It\'s become my favorite go-to shirt.',
      date: 'August 14, 2023'
    },
    {
      id: 2,
      author: 'Alex M',
      verified: true,
      rating: 4,
      text: 'I got exactly what I expected when ordering! The colors are vibrant and the print quality is top-notch. Being a UX/UX designer myself, I\'m quite picky about aesthetics, and the design checks all my boxes!',
      date: 'August 15, 2023'
    },
    {
      id: 3,
      author: 'Ethan R',
      verified: true,
      rating: 4.5,
      text: 'This shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer\'s style. It\'s the kind of shirt that pairs perfectly with a nice denim jacket. The fit is perfect. I can say I\'m a fan.',
      date: 'August 16, 2023',
      featured: true
    },
    {
      id: 4,
      author: 'Olivia P',
      verified: true,
      rating: 4,
      text: 'As a UX/UX enthusiast, I value simplicity and functionality. This t-shirt not only epitomizes those principles but also feels great! It\'s evident that the designer poured their creativity into making this t-shirt stand out\'',
      date: 'August 17, 2023'
    },
    {
      id: 5,
      author: 'Liam K',
      verified: true,
      rating: 4,
      text: 'This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer\'s style. It\'s the wearing piece of art that reflects my passion for both design and fashion\'',
      date: 'August 18, 2023'
    },
    {
      id: 6,
      author: 'Ava H',
      verified: true,
      rating: 4.5,
      text: 'I\'m not just wearing a t-shirt. I\'m wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this t-shirt stand out in a conversation starter\'',
      date: 'August 19, 2023'
    }
  ]);

  const [displayCount, setDisplayCount] = useState(3);
  const totalReviews = reviews.length;

  const StarRating = ({ rating }) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-3.5 h-3.5 ${
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
      </div>
    );
  };

  const displayedReviews = reviews.slice(0, displayCount);
  const hasMore = displayCount < totalReviews;

  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const allProducts = await getActiveProducts('All');
        const others = allProducts.filter(p => p.id !== productId);
        setRelatedProducts(others.slice(0, 3));
      } catch (err) {
        console.error('Failed to fetch related products', err);
      }
    };
    fetchRelated();
  }, [productId]);

  return (
    <div className="space-y-8 bg-white rounded-2xl p-8 mb-0">

      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-extrabold text-slate-900">All Reviews</h2>
          <p className="text-xs text-slate-500">({totalReviews})</p>
        </div>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {displayedReviews.map((review) => (
          <div
            key={review.id}
            className={`p-5 rounded-xl border-2 transition-colors ${
              review.featured
                ? 'border-slate-100 bg-slate-50/50 hover:bg-slate-100/50'
                : 'border-slate-100 bg-slate-50/50 hover:bg-slate-100/50'
            }`}
          >
            
            <div className="flex items-start justify-between mb-3">
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-sm text-slate-900">{review.author}</span>
                  {review.verified && (
                    <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                      <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                <StarRating rating={review.rating} />
              </div>
              <button className="text-slate-300 hover:text-slate-500 transition-colors p-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 3a1 1 0 100 2 1 1 0 000-2zM10 9a1 1 0 100 2 1 1 0 000-2zm0 6a1 1 0 100 2 1 1 0 000-2z" />
                </svg>
              </button>
            </div>


            <p className="text-xs text-slate-600 leading-relaxed mb-3 line-clamp-4">
              {review.text}
            </p>

            
            <p className="text-[11px] text-slate-400 font-medium">
              Posted on {review.date}
            </p>
          </div>
        ))}
      </div>


      {hasMore && (
        <div className="flex justify-center pt-4">
          <button
            onClick={() => setDisplayCount(prev => Math.min(prev + 3, totalReviews))}
            className="px-6 py-2.5 text-xs font-bold text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            Load More Reviews
          </button>
        </div>
      )}

      
      <div className="border-t border-slate-100 pt-8">
        <h3 className="mx-auto mb-6 flex h-14 min-w-96 py-12  items-center justify-center text-center text-5xl font-[Integral\ CF] font-extrabold text-black">
          YOU MIGHT ALSO LIKE
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {relatedProducts.map((product) => (
            <div key={product.id} className="group">
              <Link to={`/product/${product.id}`} className="block relative bg-gray-100 rounded-lg overflow-hidden aspect-square">
                <AuthImage productId={product.id} productName={product.Product_Name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                {product.Type && (
                  <span className="absolute top-2 left-2 px-2 py-0.5 text-[10px] font-bold text-red-600 bg-red-50 rounded-md">
                    {product.Type === 'Service' ? '-20%' : '-15%'}
                  </span>
                )}
              </Link>
              <div className="mt-2 space-y-1">
                <Link to={`/product/${product.id}`}>
                  <h4 className="text-xs font-semibold text-slate-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                    {product.Product_Name}
                  </h4>
                </Link>
                <div className="flex items-center gap-1">
                  <div className="flex">
                    {[1, 2, 3, 4].map((star) => (
                      <svg key={star} className="w-3 h-3 text-amber-400 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <svg className="w-3 h-3 text-gray-300 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <span className="text-[10px] text-slate-400">(4.5)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-slate-900">{formatCurrency(product.Unit_Price)}</span>
                  <span className="text-[10px] text-slate-400 line-through">{formatCurrency(Math.round(product.Unit_Price * 1.2))}</span>
                  <span className="text-[10px] font-bold text-red-500 bg-red-50 px-1 py-0.5 rounded">-20%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductReviews;
