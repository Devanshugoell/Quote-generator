import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import ProductCatalogue from '../pages/ProductCatalogue';
import ProductDetail from '../pages/ProductDetail';
import Cart from '../pages/Cart';
import QuoteList from '../pages/QuoteList';
import QuoteDetail from '../pages/QuoteDetail';
import PrintQuote from '../pages/PrintQuote';

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<ProductCatalogue />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/quotes" element={<QuoteList />} />
        <Route path="/quotes/:quoteId" element={<QuoteDetail />} />
      </Route>

      <Route path="/print/:quoteId" element={<PrintQuote />} />
    </Routes>
  );
};

export default AppRoutes;