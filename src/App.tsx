import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './web/components/Layout';
import BecomeProvider from './web/pages/BecomeProvider';
import Catalogue from './web/pages/Catalogue';
import Dashboard from './web/pages/Dashboard';
import Home from './web/pages/Home';
import NotFound from './web/pages/NotFound';
import ProviderPage from './web/pages/ProviderPage';
import ServiceDetail from './web/pages/ServiceDetail';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="services" element={<Catalogue />} />
          <Route path="services/:id" element={<ServiceDetail />} />
          <Route path="prestataires/:id" element={<ProviderPage />} />
          <Route path="devenir-prestataire" element={<BecomeProvider />} />
          <Route path="tableau-de-bord" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
