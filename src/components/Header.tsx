import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShoppingBag, 
  LayoutDashboard, 
  Sparkles, 
  Menu, 
  X, 
  ArrowRight,
  ShieldCheck,
  Compass
} from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    cart, 
    setIsCartOpen, 
    currentView, 
    setCurrentView, 
    setIsProjexModalOpen,
    quotes 
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartTotalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotalPrice = cart.reduce((acc, item) => acc + (item.priceEstimate * item.quantity), 0);

  const scrollToSection = (id: string) => {
    if (currentView !== 'store') {
      setCurrentView('store');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Conceptual Disclaimer Banner */}
      <div className="bg-[#1C1B1A] text-[#D8CEBC] text-[11px] sm:text-xs py-1.5 px-4 text-center tracking-wider border-b border-[#38342E] flex items-center justify-center gap-2 flex-wrap">
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#C2A370]/20 text-[#E0C895] font-medium border border-[#C2A370]/30 text-[10px] uppercase tracking-widest">
          <ShieldCheck className="w-3 h-3" /> Prototipo Conceptual
        </span>
        <span>
          Demostración comercial creada por <strong className="text-white font-semibold">Projex Tech</strong>. No representa el sitio oficial de Ideal Muebles y Design.
        </span>
        <button
          onClick={() => setIsProjexModalOpen(true)}
          className="underline hover:text-white transition-colors ml-1 font-medium cursor-pointer"
        >
          Saber más sobre esta demo &rarr;
        </button>
      </div>

      {/* Main Luxury Header */}
      <header className="sticky top-0 z-40 bg-[#F8F6F0]/90 backdrop-blur-md border-b border-[#E8E2D5] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Brand Title */}
            <div 
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => {
                setCurrentView('store');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <div className="w-9 h-9 rounded-sm bg-[#1C1B1A] flex items-center justify-center text-[#E0C895] font-serif text-xl font-bold tracking-widest shadow-sm group-hover:bg-[#C2A370] group-hover:text-black transition-colors">
                I
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg sm:text-xl font-semibold tracking-[0.2em] text-[#1C1B1A] uppercase leading-none">
                  Ideal Design Concept
                </span>
                <span className="text-[10px] tracking-[0.28em] text-[#8C8275] uppercase mt-1">
                  Atelier &bull; Ebanistería &bull; Arquitectura
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              <button
                onClick={() => scrollToSection('catalogo')}
                className="text-xs font-medium uppercase tracking-[0.18em] text-[#4A453E] hover:text-[#C2A370] transition-colors cursor-pointer"
              >
                Catálogo 2026
              </button>
              <button
                onClick={() => scrollToSection('configurador')}
                className="text-xs font-medium uppercase tracking-[0.18em] text-[#4A453E] hover:text-[#C2A370] transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C2A370]" />
                Configurador Bespoke
              </button>
              <button
                onClick={() => scrollToSection('lookbook')}
                className="text-xs font-medium uppercase tracking-[0.18em] text-[#4A453E] hover:text-[#C2A370] transition-colors cursor-pointer"
              >
                Lookbook de Espacios
              </button>
              <button
                onClick={() => scrollToSection('materiales')}
                className="text-xs font-medium uppercase tracking-[0.18em] text-[#4A453E] hover:text-[#C2A370] transition-colors cursor-pointer"
              >
                Artesanía & Materiales
              </button>
            </nav>

            {/* Action Bar */}
            <div className="flex items-center gap-2.5 sm:gap-4">
              
              {/* Switch View to CRM / Admin */}
              <button
                onClick={() => setCurrentView(currentView === 'store' ? 'admin' : 'store')}
                className={`relative px-3 py-2 rounded-full text-xs font-medium transition-all flex items-center gap-2 border cursor-pointer ${
                  currentView === 'admin'
                    ? 'bg-[#1C1B1A] text-white border-[#1C1B1A] shadow-md'
                    : 'bg-[#EFECE4] text-[#4A453E] border-[#DED7C8] hover:border-[#C2A370] hover:text-[#1C1B1A]'
                }`}
                title="Acceder al Panel de Gestión de Proyectos"
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-[#C2A370]" />
                <span className="hidden sm:inline">
                  {currentView === 'admin' ? 'Ver Tienda' : 'Panel de Proyectos'}
                </span>
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-[#C2A370] text-[#1C1B1A] font-bold">
                  {quotes.length}
                </span>
              </button>

              {/* Quote Cart Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-[#1C1B1A] text-white hover:bg-[#2F2C29] transition-all shadow-sm cursor-pointer group"
              >
                <ShoppingBag className="w-4 h-4 text-[#E0C895] group-hover:scale-110 transition-transform" />
                <span className="text-xs font-medium tracking-wider hidden md:inline">
                  Cotización
                </span>
                {cartTotalItems > 0 && (
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#C2A370] text-[#1C1B1A] text-[11px] font-bold">
                    {cartTotalItems}
                  </span>
                )}
                {cartTotalPrice > 0 && (
                  <span className="hidden xl:inline text-[11px] text-[#D8CEBC] pl-1 border-l border-white/20">
                    {cartTotalPrice.toLocaleString('es-ES')} €
                  </span>
                )}
              </button>

              {/* Hire Projex Tech Button */}
              <button
                onClick={() => setIsProjexModalOpen(true)}
                className="hidden md:flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-[#C2A370] text-[#8C6F35] bg-[#C2A370]/10 hover:bg-[#C2A370] hover:text-[#1C1B1A] transition-all text-xs font-semibold cursor-pointer"
              >
                <span>Solución Projex Tech</span>
                <ArrowRight className="w-3 h-3" />
              </button>

              {/* Mobile menu trigger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-[#1C1B1A] hover:text-[#C2A370] cursor-pointer"
                aria-label="Abrir menú"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#F4F1E8] border-b border-[#E2DBD0] px-6 py-6 space-y-4">
            <div className="flex flex-col space-y-3">
              <button
                onClick={() => scrollToSection('catalogo')}
                className="text-left text-sm uppercase tracking-widest text-[#2A2927] font-medium py-1"
              >
                Catálogo 2026
              </button>
              <button
                onClick={() => scrollToSection('configurador')}
                className="text-left text-sm uppercase tracking-widest text-[#2A2927] font-medium py-1 flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-[#C2A370]" />
                Configurador Bespoke
              </button>
              <button
                onClick={() => scrollToSection('lookbook')}
                className="text-left text-sm uppercase tracking-widest text-[#2A2927] font-medium py-1"
              >
                Lookbook de Espacios
              </button>
              <button
                onClick={() => scrollToSection('materiales')}
                className="text-left text-sm uppercase tracking-widest text-[#2A2927] font-medium py-1"
              >
                Artesanía & Materiales
              </button>
              <button
                onClick={() => {
                  setCurrentView(currentView === 'store' ? 'admin' : 'store');
                  setMobileMenuOpen(false);
                }}
                className="text-left text-sm uppercase tracking-widest text-[#C2A370] font-semibold py-1 flex items-center gap-2"
              >
                <LayoutDashboard className="w-4 h-4" />
                {currentView === 'admin' ? 'Volver a la Tienda' : 'Panel de Gestión CRM (Ficticio)'}
              </button>
            </div>

            <div className="pt-4 border-t border-[#E0D7C7] flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setIsProjexModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 rounded-lg bg-[#C2A370] text-[#1C1B1A] font-semibold text-xs tracking-wider uppercase text-center flex items-center justify-center gap-2 shadow-sm"
              >
                <Compass className="w-4 h-4" />
                Contratar Plataforma con Projex Tech
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
