import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getQuoteDetail } from '../api/quoteApi';
import { formatCurrency } from '../utils/formatCurrency';
import Loader from '../components/Loader';

const PrintQuote = () => {
  const { quoteId } = useParams();
  const navigate = useNavigate();
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await getQuoteDetail(quoteId);
        setQuote(data);
      } catch (error) {
        console.error("Error loading quote for print", error);
      } finally {
        setLoading(false);
      }
    };
    if (quoteId) fetchDetails();
  }, [quoteId]);

  useEffect(() => {
    if (quote) {
   
      const timer = setTimeout(() => {
        window.print();
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [quote]);

  if (loading) return <Loader message="Preparing print canvas..." />;
  if (!quote) return <div className="p-8 text-center text-red-500">Quote record not found.</div>;

  const items = quote.Quoted_Items || [];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans p-6 md:p-12" id="printable-area">
      
      
      <div className="max-w-4xl mx-auto mb-8 flex justify-between items-center print:hidden border-b border-slate-100 pb-4">
        <button 
          onClick={() => navigate(-1)} 
          className="text-xs font-bold text-slate-500 hover:text-slate-800 transition flex items-center gap-1"
        >
          ← Return to Details
        </button>
        <button 
          onClick={() => window.print()} 
          className="bg-black text-white font-bold text-xs px-5 py-2.5 rounded-lg shadow-sm transition"
        >
          Print / Save PDF
        </button>
      </div>

      
      <div className="max-w-4xl mx-auto border border-slate-200 print:border-0 rounded-2xl p-6 md:p-10 space-y-8 bg-white shadow-xs print:shadow-none">
        
        {/* Header Block */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-6 border-b border-slate-200">
          <div>
            <h1 className="text-2xl font-black uppercase tracking-wider text-slate-900">Official Quotation</h1>
            <p className="text-xs text-slate-400 font-medium mt-1">Generated via Zoho CRM integration portal</p>
          </div>
          <div className="text-left sm:text-right space-y-1">
            <h2 className="font-extrabold text-sm text-slate-800">Dealer Representative</h2>
            <p className="text-xs text-slate-600 font-bold">{quote.Dealer_Name || quote.Dealer?.name || 'N/A'}</p>
            {quote.Dealer?.id && (
              <p className="text-[10px] text-slate-400 font-mono">ID: {quote.Dealer.id}</p>
            )}
          </div>
        </div>


        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-50 border border-slate-100 rounded-xl p-4 text-xs">
          <div className="space-y-1">
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Subject</span>
            <p className="text-slate-800 font-bold leading-snug">{quote.Subject}</p>
          </div>
          <div className="space-y-1">
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Quote Number</span>
            <p className="text-slate-800 font-bold font-mono">{quote.Quote_Number || 'N/A'}</p>
          </div>
          <div className="space-y-1">
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Created Date</span>
            <p className="text-slate-800 font-bold">
              {quote.Created_Time ? new Date(quote.Created_Time).toLocaleDateString('en-IN') : 'N/A'}
            </p>
          </div>
          <div className="space-y-1 text-right">
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Valid Till</span>
            <p className="text-slate-800 font-bold font-mono">
              {quote.Valid_Till ? new Date(quote.Valid_Till).toLocaleDateString('en-IN') : 'Open'}
            </p>
          </div>
        </div>


        <div className="space-y-2">
          <h3 className="font-bold text-xs tracking-wider text-slate-400 uppercase">Itemised Proposals</h3>
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-bold">
                <th className="py-2.5 pr-4">Description</th>
                <th className="py-2.5 pr-4">SKU / Code</th>
                <th className="py-2.5 pr-4 text-center">Quantity</th>
                <th className="py-2.5 pr-4 text-right">List Price</th>
                <th className="py-2.5 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
              {items.map((item, index) => (
                <tr key={item.id || index}>
                  <td className="py-3 pr-4 font-bold text-slate-800">{item.Product_Name?.name}</td>
                  <td className="py-3 pr-4 font-mono text-slate-500">{item.Product_Name?.Product_Code || 'N/A'}</td>
                  <td className="py-3 pr-4 text-center text-slate-800 font-bold">{item.Quantity}</td>
                  <td className="py-3 pr-4 text-right">{formatCurrency(item.List_Price)}</td>
                  <td className="py-3 text-right font-extrabold text-slate-900">
                    {formatCurrency(item.Total || (item.List_Price * item.Quantity))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>


        <div className="border-t border-slate-200 pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-stretch gap-6">
          
          <div className="flex-1 space-y-1.5 text-[10px] text-slate-400 max-w-md">
            <span className="font-bold uppercase tracking-wider text-slate-500">Terms & Notes</span>
            <p className="leading-relaxed">
              This quotation is synced dynamically with the client CRM module and is subject to local dealer validation rules. The totals computed above include local transaction adjustments in compliance with standard billing agreements.
            </p>
          </div>


          <div className="w-full sm:w-64 space-y-2 text-xs font-semibold text-slate-600 self-end sm:self-auto">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="text-slate-800 font-bold">{formatCurrency(quote.Sub_Total || quote.Grand_Total)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax Amount:</span>
              <span className="text-slate-800 font-bold">{formatCurrency(quote.Tax || 0)}</span>
            </div>
            <div className="flex justify-between">
              <span>Adjustments:</span>
              <span className="text-slate-800 font-bold">{formatCurrency(quote.Adjustment || 0)}</span>
            </div>
            <div className="border-t border-slate-200 pt-2 flex justify-between text-slate-900 text-sm font-black">
              <span>Grand Total:</span>
              <span>{formatCurrency(quote.Grand_Total)}</span>
            </div>
          </div>
        </div>


        <div className="grid grid-cols-2 gap-8 pt-12 text-[10px] text-slate-400 font-bold">
          <div className="border-t border-slate-200 pt-3 text-center uppercase tracking-wider">
            Authorized Dealer Signature
          </div>
          <div className="border-t border-slate-200 pt-3 text-center uppercase tracking-wider">
            Customer Acceptance Signature
          </div>
        </div>

      </div>
    </div>
  );
};

export default PrintQuote;