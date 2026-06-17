import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getExistingQuotes } from '../api/quoteApi';
import { formatCurrency } from '../utils/formatCurrency';
import Loader from '../components/Loader';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';

const QuoteList = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuotesData = async () => {
      try {
        setLoading(true);
        const quotesData = await getExistingQuotes();
        setQuotes(quotesData);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch quotes/dealers", err);
        setError("Unable to load quote history. Ensure the server is online and credentials are correct.");
      } finally {
        setLoading(false);
      }
    };
    fetchQuotesData();
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  if (loading) return <Loader message="Accessing quote archives..." />;

  return (
    <div className="pt-6">

<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>

      <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
        <Link to="/" className="hover:text-gray-700 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-gray-700 font-medium">Quotes</span>
      </div>

      {/* Title block */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="space-y-1">
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Quote Archives</h1>
          <p className="text-xs text-gray-500 font-medium">Review and print historical quotation proposals synchronized with Zoho CRM.</p>
        </div>
        <button
          onClick={() => navigate('/cart')}
          className="bg-gray-900 hover:bg-gray-800 text-white font-bold text-xs px-5 py-3 rounded-lg shadow-sm transition w-fit"
        >
          Create New Quote
        </button>
      </div>

      {error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-xl flex items-start gap-4">
          <span className="text-2xl mt-0.5">️</span>
          <div>
            <h3 className="font-bold mb-1 text-red-900">Archive Retrieval Failed</h3>
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      ) : quotes.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto text-2xl text-gray-400 border border-gray-200">
            📑
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-gray-800">No Quotes Found</h3>
            <p className="text-gray-400 text-xs max-w-xs mx-auto leading-relaxed">
              No quotes have been created in your CRM account yet. Assemble product listings in your cart and generate your first sync.
            </p>
          </div>
        </div>
      ) : (
        /* Quotes Table Container */
        <div className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/75 border-b border-gray-200 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  <th className="py-4 px-6">Quote Number</th>
                  <th className="py-4 px-6">Subject</th>
                  <th className="py-4 px-6 text-right">Grand Total</th>
                  <th className="py-4 px-6">Created Date</th>
                  <th className="py-4 px-6">Valid Till</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs">
                {quotes.map((quote) => (
                  <tr 
                    key={quote.id} 
                    onClick={() => navigate(`/quotes/${quote.id}`)}
                    className="hover:bg-gray-50/50 cursor-pointer transition-colors duration-150 group"
                  >
                    <td className="py-4 px-6 font-mono text-gray-500 font-medium">
                      {quote.Quote_Number || 'N/A'}
                    </td>
                    <td className="py-4 px-6 font-bold text-gray-900 group-hover:text-gray-600 transition-colors">
                      {quote.Subject}
                    </td>
                    <td className="py-4 px-6 text-right font-bold text-gray-900">
                      {quote.Grand_Total ? formatCurrency(quote.Grand_Total) : '—'}
                    </td>
                    <td className="py-4 px-6 text-gray-500 font-mono">
                      {formatDate(quote.Created_Time)}
                    </td>
                    <td className="py-4 px-6 text-gray-500 font-mono">
                      {formatDate(quote.Valid_Till)}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/quotes/${quote.id}`);
                        }}
                        className="text-[10px] font-extrabold text-gray-700 hover:text-gray-900 transition-colors bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

</div>
      {/* Newsletter & Footer */}
      <Newsletter />
      <Footer />
    </div>
  );
};

export default QuoteList;