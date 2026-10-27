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
import { MobileSimulatorModal } from './components/MobileSimulatorModal';
import { CheckCircle2, ShoppingBag, ArrowRight, Smartphone } from 'lucide-react';

const MainContent: React.FC = () => {
  const { currentView, toastMessage, cart, setIsCartOpen, setIsMobileSimulatorOpen } = useApp();

  const totalCartCount = cart.reduce((acc, i) => acc + i.quantity, 0);
  const totalCartPrice = cart.reduce((acc, i) => acc + i.priceEstimate * i.quantity, 0);

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

      {/* Floating Quick-Cart Pill (Oakory Reference Style) */}
      {totalCartCount > 0 && currentView === 'store' && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 max-w-sm w-[90%] sm:w-auto">
          <div className="bg-[#1C1B1A] text-white p-2.5 sm:px-4 sm:py-2.5 rounded-full shadow-2xl border border-[#C2A370]/50 flex items-center justify-between gap-4 backdrop-blur-md">
            <div className="flex items-center gap-2.5 pl-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#C2A370] text-[#1C1B1A] font-bold text-xs">
                {totalCartCount}
              </span>
              <div className="text-xs">
                <span className="text-[#D8CEBC] font-medium hidden sm:inline">En Cotización &bull; </span>
                <strong className="text-white font-serif">{totalCartPrice.toLocaleString('es-ES')} €</strong>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setIsMobileSimulatorOpen(true)}
                className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-[#E0C895] text-[11px] font-semibold transition-colors cursor-pointer"
                title="Ver en simulador de Smartphone"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Ver App</span>
              </button>

              <button
                onClick={() => setIsCartOpen(true)}
                className="px-4 py-1.5 rounded-full bg-[#C2A370] hover:bg-[#D4B582] text-[#1C1B1A] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
              >
                <span>Ver Dossier</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modals & Overlays */}
      <ProductDetailModal />
      <QuoteCartDrawer />
      <QuoteCheckoutModal />
      <ProjexTechPromo />
      <MobileSimulatorModal />
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
