import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getQuoteDetail } from '../api/quoteApi';
import { formatCurrency } from '../utils/formatCurrency';
import Loader from '../components/Loader';

const QuoteDetail = () => {
  const { quoteId } = useParams();
  const navigate = useNavigate();
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const data = await getQuoteDetail(quoteId);
        if (data) {
          setQuote(data);
          setError(null);
        } else {
          setError("Quote record not found inside Zoho CRM database.");
        }
      } catch (err) {
        console.error(err);
        setError("Error pulling quote record. Check network connections.");
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [quoteId]);

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateStr;
    }
  };

  const handlePrint = () => {
    window.open(`/print/${quoteId}`, '_blank');
  };

  if (loading) return <Loader message="Compiling quote records..." />;

  if (error || !quote) {
    return (
      <div className="max-w-xl mx-auto text-center py-16 bg-white rounded-2xl border border-slate-100 p-6 space-y-4">
        <span className="text-3xl">⚠️</span>
        <h2 className="text-lg font-bold text-slate-800">Quote Record Offline</h2>
        <p className="text-sm text-slate-500">{error || 'Unable to retrieve quote details.'}</p>
        <button 
          onClick={() => navigate('/quotes')}
          className="bg-blue-600 text-white font-semibold text-xs px-5 py-2.5 rounded-lg shadow-sm hover:bg-blue-700 transition"
        >
          Return to Archives
        </button>
      </div>
    );
  }

  const items = quote.Quoted_Items || [];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <button 
            onClick={() => navigate('/quotes')} 
            className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 hover:text-slate-700 transition-colors uppercase tracking-wider my-4"
          >
            ← Back to Archives
          </button>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">{quote.Subject}</h1>

          </div>
        </div>
        
        <button
          onClick={handlePrint}
          className="bg-slate-950 hover:bg-slate-900 text-white font-bold text-xs px-6 py-3 rounded-lg shadow-xs flex items-center justify-center gap-2 transition duration-150"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          Print Order Summary
        </button>
      </div>

      {/* Document Specifications */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-xs space-y-6">
        <h3 className="font-extrabold text-slate-800 text-sm pb-3 border-b border-slate-100">Document Specifications</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-xs">
          <div className="space-y-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Quote Number</span>
            <p className="font-mono text-slate-800 font-bold">{quote.Quote_Number || 'N/A'}</p>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Dealer Organization</span>
            <p className="text-slate-800 font-bold">{quote.Dealer_Name || quote.Dealer?.name || 'N/A'}</p>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Sync Owner</span>
            <p className="text-slate-800 font-bold">{quote.Owner?.name || 'N/A'} ({quote.Owner?.email || 'N/A'})</p>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">CRM Record ID</span>
            <p className="font-bold text-slate-800">{quote.id}</p>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Created Timestamp</span>
            <p className="text-slate-800 font-bold">{formatDate(quote.Created_Time)}</p>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Valid Till Date</span>
            <p className="text-slate-800 font-bold">
              {quote.Valid_Till ? (
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-100 font-mono">
                  {formatDate(quote.Valid_Till)}
                </span>
              ) : (
                <span className="text-slate-400">N/A</span>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Itemised Proposal Details - Full Width */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-xs space-y-4">
        <h3 className="font-extrabold text-slate-800 text-sm pb-3 border-b border-slate-100">Itemised Proposal Details</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider py-2">
                <th className="pb-3 pr-4">Product</th>
                <th className="pb-3 pr-4 text-right">Unit Price</th>
                <th className="pb-3 pr-4 text-center">Qty</th>
                <th className="pb-3 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 font-medium text-slate-700">
              {items.map((item, index) => (
                <tr key={item.id || index} className="hover:bg-slate-50/20">
                  <td className="py-3.5 pr-4">
                    <p className="font-bold text-slate-800">{item.Product_Name?.name}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5 font-mono">{item.Product_Name?.Product_Code || 'N/A'}</p>
                  </td>
                  <td className="py-3.5 pr-4 text-right text-slate-700">{formatCurrency(item.List_Price)}</td>
                  <td className="py-3.5 pr-4 text-center text-slate-800 font-bold">{String(item.Quantity).padStart(2, '0')}</td>
                  <td className="py-3.5 text-right font-extrabold text-slate-900">{formatCurrency(item.Total || (item.List_Price * item.Quantity))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Method + Financial Summary - Side by Side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Payment Method */}
        <div className="bg-white rounded-2xl p-6 space-y-4">
          <h3 className="font-extrabold text-slate-800 text-sm pb-3 border-b border-slate-100">Payment Method</h3>
          
          <div className="space-y-3 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <span className="font-bold text-slate-700">Online Payment</span>
            </div>
            <p className="text-slate-500">{quote.Owner?.email || 'accounts@company.com'}</p>
            <p className="text-[10px] text-slate-400 font-medium">We accept Bank Transfer, UPI, and all major payment methods.</p>
          </div>
        </div>

        {/* Financial Summary */}
        <div className="bg-white rounded-2xl p-6 space-y-4">
          <h3 className="font-extrabold text-slate-800 text-sm pb-3 border-b border-slate-100">Financial Summary</h3>
          
          <div className="space-y-3 text-xs font-semibold text-slate-600">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="text-slate-800 font-bold">{formatCurrency(quote.Sub_Total || quote.Grand_Total)}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Tax Amount:</span>
              <span className="text-slate-800 font-bold">{formatCurrency(quote.Tax || 0)}</span>
            </div>
            <div className="flex justify-between">
              <span>Adjustments:</span>
              <span className="text-slate-800 font-bold">{formatCurrency(quote.Adjustment || 0)}</span>
            </div>
            
            <div className="border-t border-slate-100 pt-3 flex justify-between items-center">
              <span className="text-slate-900 text-sm font-black">GRAND TOTAL (INR):</span>
              <span className="bg-slate-900 text-white font-extrabold text-sm px-4 py-2 rounded-lg">
                {formatCurrency(quote.Grand_Total)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Terms & Signature */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 space-y-3">
          <h3 className="font-extrabold text-slate-800 text-sm pb-3 border-b border-slate-100">Terms and Conditions</h3>
          <p className="text-[10px] text-slate-400 leading-relaxed">
            This quote is valid until the date specified above. All prices are in Indian Rupees (INR) unless otherwise stated. 
            Payment is due within 30 days of invoice date. Any modifications to this quote may result in a revised pricing structure.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 flex flex-col items-end justify-between">
          <h3 className="font-extrabold text-slate-800 text-sm pb-3 border-b border-slate-100 w-full text-left">Authorized Signature</h3>
          <div className="flex flex-col items-end space-y-2 pt-4">
            <div className="h-12 border-b border-slate-200 w-48"></div>
            <p className="text-xs font-bold text-slate-700">{quote.Owner?.name || 'Authorized Signatory'}</p>
            <p className="text-[10px] text-slate-400">{quote.Dealer_Name || quote.Dealer?.name || 'Company Name'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteDetail;