/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Catalog } from './components/Catalog';
import { SofaConfigurator } from './components/SofaConfigurator';
import { Lookbook } from './components/Lookbook';
import { MaterialsShowcase } from './components/MaterialsShowcase';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { QuoteCartDrawer } from './components/QuoteCartDrawer';
import { QuoteCheckoutModal } from './components/QuoteCheckoutModal';
import { AdminDashboard } from './components/AdminDashboard';
import { ProjexTechPromo } from './components/ProjexTechPromo';
import { CheckCircle2 } from 'lucide-react';

const MainContent: React.FC = () => {
  const { currentView, toastMessage } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F6F0] selection:bg-[#C2A370] selection:text-white">
      {/* Toast notification */}
      {toastMessage && (
        <div className="fixed top-24 right-5 z-50 bg-[#1C1B1A] text-white px-4 py-3 rounded-2xl shadow-2xl border border-[#C2A370]/50 flex items-center gap-2.5 text-xs animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-[#C2A370] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Luxury Navigation Header */}
      <Header />

      {/* Storefront vs Management CRM View */}
      <main className="flex-1">
        {currentView === 'store' ? (
          <>
            <Hero />
            <Lookbook />
            <SofaConfigurator />
            <Catalog />
            <MaterialsShowcase />
          </>
        ) : (
          <AdminDashboard />
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Overlays */}
      <ProductDetailModal />
      <QuoteCartDrawer />
      <QuoteCheckoutModal />
      <ProjexTechPromo />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
