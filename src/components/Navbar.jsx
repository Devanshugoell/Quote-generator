import { Link, useSearchParams } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useState, useRef, useEffect } from 'react';

const Navbar = () => {
  const { cartCount } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const mobileInputRef = useRef(null);

  
  useEffect(() => {
    setSearch(searchParams.get('search') || '');
  }, [searchParams]);

  
  useEffect(() => {
    if (mobileSearchOpen && mobileInputRef.current) {
      mobileInputRef.current.focus();
    }
  }, [mobileSearchOpen]);

  const handleSearch = (value) => {
    setSearch(value);
    if (value.trim()) {
      setSearchParams({ search: value.trim() });
    } else {
      setSearchParams({});
    }
  };

  const clearSearch = () => {
    setSearch('');
    setSearchParams({});
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-6">
          {/* Logo */}
          <Link to="/" className="text-xl font-black text-gray-900 tracking-tight flex-shrink-0">
            SHOP<span className="text-gray-900">.CO</span>
          </Link>

          
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm font-medium hover:text-gray-900 text-gray-600 transition-colors flex items-center gap-1">
              Shop
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
              </svg>
            </Link>
            <Link to="/quotes" className="text-sm font-medium text-gray-900 transition-colors">Quotes</Link>
          </div>

          
          <div className="flex-1 max-w-md hidden sm:block">
            <div className="relative">
              <svg className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search for products..."
                className="w-full pl-9 pr-8 py-2 text-sm bg-gray-100 border border-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-200 focus:bg-white transition placeholder-gray-400"
              />
              {search && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>


          <div className="flex items-center gap-4">

            <button
              onClick={() => setMobileSearchOpen(true)}
              className="sm:hidden p-2 text-gray-600 hover:text-gray-900 transition"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>


            <Link to="/cart" className="relative p-2 text-gray-600 hover:text-gray-900 transition">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-black text-white text-[10px] w-4.5 h-4.5 min-w-[18px] min-h-[18px] flex items-center justify-center rounded-full font-bold">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      
      {mobileSearchOpen && (
        <div className="fixed inset-0 z-[60] bg-white">
          <div className="flex items-center gap-3 px-4 h-16 border-b border-gray-200">
            <button
              onClick={() => setMobileSearchOpen(false)}
              className="p-2 text-gray-600 hover:text-gray-900 transition flex-shrink-0"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <div className="relative flex-1">
              <svg className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                ref={mobileInputRef}
                type="text"
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search for products..."
                className="w-full pl-9 pr-8 py-2.5 text-sm bg-gray-100 border border-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-200 focus:bg-white transition placeholder-gray-400"
              />
              {search && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
          {search && (
            <div className="px-4 py-3">
              <p className="text-xs text-gray-500">
                Searching for "<span className="font-semibold text-gray-900">{search}</span>"
              </p>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
