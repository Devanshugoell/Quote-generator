import { useEffect, useState, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getActiveProducts } from '../api/productApi';
import ProductCard from '../components/ProductCard';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';

const ITEMS_PER_PAGE = 9;

const ProductCatalogue = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('search') || '';
  const [selectedType, setSelectedType] = useState('All');
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const filterRef = useRef(null);

  
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedStyles, setSelectedStyles] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 100000]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getActiveProducts(selectedType);
        setProducts(data);
        setError(null);
        setCurrentPage(1);
      } catch (error) {
        console.error("Failed to load products", error);
        setError("Could not retrieve catalogue records. Please ensure API credentials are valid.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [selectedType]);

  
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  
  const filteredProducts = products.filter(product => {
    const term = search.toLowerCase();
    const nameMatch = product.Product_Name?.toLowerCase().includes(term);
    const skuMatch = product.SKU?.toLowerCase().includes(term);
    const modelMatch = product.Model_Name?.toLowerCase().includes(term);
    return nameMatch || skuMatch || modelMatch;
  });

  
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const toggleColor = (color) => {
    setSelectedColors(prev =>
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    );
  };

  const toggleSize = (size) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const toggleStyle = (style) => {
    setSelectedStyles(prev =>
      prev.includes(style) ? prev.filter(s => s !== style) : [...prev, style]
    );
  };

  const clearFilters = () => {
    setSelectedColors([]);
    setSelectedSizes([]);
    setSelectedStyles([]);
    setPriceRange([0, 100000]);
    setSelectedType('All');
    setSearch('');
  };

  const colorSwatches = [
    { name: 'Green', bg: 'bg-green-500' },
    { name: 'Red', bg: 'bg-red-500' },
    { name: 'Yellow', bg: 'bg-yellow-400' },
    { name: 'Orange', bg: 'bg-orange-500' },
    { name: 'Cyan', bg: 'bg-cyan-400' },
    { name: 'Blue', bg: 'bg-blue-500' },
    { name: 'Purple', bg: 'bg-purple-500' },
    { name: 'Pink', bg: 'bg-pink-500' },
    { name: 'White', bg: 'bg-white border border-gray-200' },
    { name: 'Black', bg: 'bg-black' },
  ];

  const sizes = ['XX-Small', 'X-Small', 'Small', 'Medium', 'Large', 'X-Large', 'XX-Large'];
  const dressStyles = [
    { name: 'Casual', count: 220 },
    { name: 'Formal', count: 80 },
    { name: 'Party', count: 40 },
    { name: 'Gym', count: 60 },
  ];

  
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setFilterDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const categoryCounts = {
    All: products.length,
    Goods: products.filter(p => p.Type === 'Goods').length,
    Service: products.filter(p => p.Type === 'Service').length,
  };

  return (
    <div className="pt-6">
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
        <Link to="/" className="hover:text-gray-700 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-gray-700 font-medium">
          {selectedType === 'All' ? 'Shop' : selectedType}
        </span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className={`${sidebarOpen ? 'fixed inset-0 z-50 bg-white p-6 overflow-y-auto lg:static lg:z-auto lg:bg-transparent lg:p-0' : 'hidden'} lg:block lg:w-56 flex-shrink-0`}>
          {/* Mobile close button */}
          <div className="flex items-center justify-between mb-6 lg:hidden">
            <h2 className="text-lg font-bold text-gray-900">Filters</h2>
            <button onClick={() => setSidebarOpen(false)} className="p-2 text-gray-500 hover:text-gray-900">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-6 border border-gray-200 rounded-md p-4">
            {/* Filters Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filters
              </h2>
              <button onClick={clearFilters} className="text-xs text-gray-400 hover:text-gray-700 transition-colors">
                Clear
              </button>
            </div>

            {/* Product Type */}
            <div>
              <h3 className="text-xs font-bold text-gray-900 mb-3">Product Type</h3>
              <div className="space-y-2">
                {['All', 'Goods', 'Service'].map(cat => (
                  <label key={cat} className="flex items-center justify-between text-xs text-gray-600 hover:text-gray-900 cursor-pointer group">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="category"
                        checked={selectedType === cat}
                        onChange={() => setSelectedType(cat)}
                        className="w-3.5 h-3.5 text-gray-900 border-gray-300 focus:ring-gray-900"
                      />
                      <span className="group-hover:text-gray-900">{cat === 'All' ? 'All Products' : cat}</span>
                    </div>
                    <span className="text-gray-400 text-[10px]">{categoryCounts[cat] || 0}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="text-xs font-bold text-gray-900 mb-3">Price</h3>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs text-gray-500">${priceRange[0]}</span>
                <div className="flex-1 h-1 bg-gray-200 rounded-full relative">
                  <div className="absolute left-0 top-0 h-full bg-gray-900 rounded-full" style={{ width: '100%' }} />
                </div>
                <span className="text-xs text-gray-500">${priceRange[1] >= 100000 ? '100k+' : priceRange[1]}</span>
              </div>
            </div>

            {/* Colors */}
            <div>
              <h3 className="text-xs font-bold text-gray-900 mb-3">Colors</h3>
              <div className="flex flex-wrap gap-2">
                {colorSwatches.map(color => (
                  <button
                    key={color.name}
                    onClick={() => toggleColor(color.name)}
                    className={`w-7 h-7 rounded-full ${color.bg} transition-all ${
                      selectedColors.includes(color.name)
                        ? 'ring-2 ring-offset-2 ring-gray-900 scale-110'
                        : 'hover:scale-110'
                    }`}
                    title={color.name}
                  />
                ))}
              </div>
            </div>


            <div>
              <h3 className="text-xs font-bold text-gray-900 mb-3">Size</h3>
              <div className="flex flex-wrap gap-1.5">
                {sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => toggleSize(size)}
                    className={`px-3 py-1.5 text-[10px] font-medium rounded-md border transition-all ${
                      selectedSizes.includes(size)
                        ? 'bg-gray-900 text-white border-gray-900'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold text-gray-900">Dress Style</h3>
                <svg className="w-3 h-3 text-gray-400" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 6l5 4-5 4" />
                </svg>
              </div>
              <div className="space-y-2">
                {dressStyles.map(style => (
                  <label key={style.name} className="flex items-center justify-between text-xs text-gray-600 hover:text-gray-900 cursor-pointer">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedStyles.includes(style.name)}
                        onChange={() => toggleStyle(style.name)}
                        className="w-3.5 h-3.5 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                      />
                      <span>{style.name}</span>
                    </div>
                    <svg className="w-3 h-3 text-gray-400" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 6l5 4-5 4" />
                    </svg>
                  </label>
                ))}
              </div>
              <div className="mt-4 flex justify-center">
                <button
                  type="button"
                  onClick={() => setSidebarOpen(false)}
                  className="inline-flex items-center justify-center w-[247px] h-12 px-[54px] bg-black text-white rounded-[62px] font-semibold transition hover:opacity-90"
                >
                  Apply Filter
                </button>
              </div>
            </div>

            {/* Apply Filter Button */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="w-full bg-gray-900 hover:bg-gray-800 text-white text-xs font-bold py-3 rounded-lg transition lg:hidden"
            >
              Apply Filter
            </button>
          </div>
        </aside>


        <div className="flex-1 min-w-0">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 border border-gray-200 rounded-lg text-gray-600 hover:text-gray-900 transition"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
              </button>
              <h1 className="text-2xl font-black text-gray-900">
                {selectedType === 'All' ? 'Casual' : selectedType}
              </h1>
              {search && (
                <span className="flex items-center gap-1.5 bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1.5 rounded-full">
                  <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  {search}
                  <button
                    onClick={() => setSearchParams({})}
                    className="ml-1 text-gray-400 hover:text-gray-700 transition"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              )}
            </div>
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <span>Showing {filteredProducts.length} of {products.length} Products</span>


              <div className="relative" ref={filterRef}>
                <button
                  onClick={() => setFilterDropdownOpen(!filterDropdownOpen)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition ${
                    filterDropdownOpen || selectedType !== 'All'
                      ? 'border-gray-900 text-gray-900 bg-gray-50'
                      : 'border-gray-200 text-gray-600 hover:border-gray-400'
                  }`}
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                  Filters
                  {selectedType !== 'All' && (
                    <span className="ml-1 w-4 h-4 bg-gray-900 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                      1
                    </span>
                  )}
                </button>

                {filterDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg py-2 z-40">
                    <p className="px-3 pb-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Product Type</p>
                    {['All', 'Goods', 'Service'].map(cat => (
                      <button
                        key={cat}
                        onClick={() => { setSelectedType(cat); setFilterDropdownOpen(false); setCurrentPage(1); }}
                        className={`w-full flex items-center justify-between px-3 py-2 text-xs hover:bg-gray-50 transition ${
                          selectedType === cat ? 'text-gray-900 font-semibold' : 'text-gray-600'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {selectedType === cat && (
                            <svg className="w-3.5 h-3.5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                          <span className={selectedType === cat ? '' : 'ml-5.5'}>{cat === 'All' ? 'All Products' : cat}</span>
                        </div>
                        <span className="text-gray-400 text-[10px]">{categoryCounts[cat] || 0}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>


          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-3">
                  <div className="bg-gray-100 rounded-xl aspect-[3/4] animate-pulse" />
                  <div className="bg-gray-100 h-4 rounded w-3/4 animate-pulse" />
                  <div className="bg-gray-100 h-3 rounded w-1/4 animate-pulse" />
                  <div className="bg-gray-100 h-4 rounded w-1/2 animate-pulse" />
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-xl flex items-start gap-4">
              <span className="text-2xl">⚠️</span>
              <div>
                <h3 className="font-bold mb-1 text-red-900">Database Connection Error</h3>
                <p className="text-sm text-red-700">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-3 bg-red-100 hover:bg-red-200 text-red-800 font-semibold text-xs px-4 py-2 rounded-lg transition"
                >
                  Reload Page
                </button>
              </div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
              <span className="text-4xl block mb-3">🔍</span>
              <h3 className="text-lg font-bold text-gray-800 mb-1">No Matching Products</h3>
              <p className="text-gray-500 text-sm max-w-sm mx-auto">
                We couldn't find any products matching your search.
              </p>
            </div>
          ) : (
            <>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-8">
                {paginatedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>


              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-10">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 text-xs font-semibold border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                  >
                    ← Previous
                  </button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-9 h-9 text-xs font-semibold rounded-lg transition ${
                        currentPage === i + 1
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 text-xs font-semibold border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                  >
                    Next →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div> 
   </div>
      {/* Newsletter & Footer */}
      <Newsletter />
      <Footer />
    </div>
  );
};

export default ProductCatalogue;
