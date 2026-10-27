import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';
import { CATALOG_PRODUCTS, COLOR_OPTIONS } from '../data/mockData';
import { 
  X, 
  Search, 
  SlidersHorizontal, 
  Heart, 
  ShoppingBag, 
  Star, 
  ArrowRight, 
  Sparkles, 
  ChevronLeft, 
  MessageSquare, 
  Phone, 
  Plus, 
  Minus, 
  Check, 
  Clock, 
  ShieldCheck, 
  Truck, 
  RotateCcw,
  Home,
  Grid,
  Layers,
  User
} from 'lucide-react';

export const MobileSimulatorModal: React.FC = () => {
  const { 
    isMobileSimulatorOpen, 
    setIsMobileSimulatorOpen, 
    cart, 
    addToCart, 
    favorites, 
    toggleFavorite,
    setIsCartOpen,
    showToast 
  } = useApp();

  const [activeScreen, setActiveScreen] = useState<'onboarding' | 'home' | 'product'>('home');
  const [selectedMobileProduct, setSelectedMobileProduct] = useState(CATALOG_PRODUCTS[2]); // Butaca Nube / Olive
  const [selectedColorHex, setSelectedColorHex] = useState<string>(COLOR_OPTIONS[4].hex); // Oliva
  const [mobileQty, setMobileQty] = useState(1);
  const [countdown, setCountdown] = useState({ hours: 2, minutes: 45, seconds: 30 });

  // Countdown timer simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 2, minutes: 45, seconds: 30 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!isMobileSimulatorOpen) return null;

  const totalCartCount = cart.reduce((acc, i) => acc + i.quantity, 0);

  const handleMobileAddToCart = () => {
    addToCart({
      id: `${selectedMobileProduct.id}-mobile-${Date.now()}`,
      type: 'catalog',
      title: `${selectedMobileProduct.name} (Mobile App)`,
      collection: selectedMobileProduct.collection,
      specSummary: `${selectedMobileProduct.dimensions} | Tono Seleccionado`,
      priceEstimate: selectedMobileProduct.priceEstimate,
      quantity: mobileQty,
      image: selectedMobileProduct.images[0],
    });
    showToast(`Pieza añadida desde la App Móvil.`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <div className="relative max-w-sm sm:max-w-md w-full flex flex-col items-center">
        
        {/* Floating Top Banner Controls */}
        <div className="w-full flex items-center justify-between mb-3 px-2 text-white">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-widest text-[#E0C895]">
              Simulador App Móvil (Referencias Pinterest)
            </span>
          </div>

          <button
            onClick={() => setIsMobileSimulatorOpen(false)}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Screen switcher pills */}
        <div className="flex items-center gap-2 bg-white/10 p-1 rounded-full mb-4 border border-white/15 text-xs text-white">
          <button
            onClick={() => setActiveScreen('onboarding')}
            className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
              activeScreen === 'onboarding' ? 'bg-[#C2A370] text-[#1C1B1A] font-bold' : 'hover:bg-white/10'
            }`}
          >
            1. Spotlight Podium
          </button>
          <button
            onClick={() => setActiveScreen('home')}
            className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
              activeScreen === 'home' ? 'bg-[#C2A370] text-[#1C1B1A] font-bold' : 'hover:bg-white/10'
            }`}
          >
            2. App Home (Oakory)
          </button>
          <button
            onClick={() => setActiveScreen('product')}
            className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
              activeScreen === 'product' ? 'bg-[#C2A370] text-[#1C1B1A] font-bold' : 'hover:bg-white/10'
            }`}
          >
            3. Ficha con Concierge
          </button>
        </div>

        {/* Smartphone Chassis Frame */}
        <div className="relative w-[340px] sm:w-[370px] h-[720px] bg-[#141312] rounded-[48px] p-3 shadow-2xl border-4 border-[#38342E] ring-1 ring-white/20 overflow-hidden flex flex-col">
          
          {/* Dynamic Island / Speaker Notch */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-40 flex items-center justify-end px-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#1A1A1A] border border-white/10" />
          </div>

          {/* Screen Content Inner Container */}
          <div className="relative w-full h-full bg-[#FAF8F5] rounded-[38px] overflow-hidden flex flex-col justify-between text-[#1C1B1A]">
            
            {/* Status Bar */}
            <div className="pt-3 px-6 flex items-center justify-between text-[11px] font-semibold text-[#1C1B1A] z-30 shrink-0">
              <span>9:41</span>
              <div className="flex items-center gap-1 text-[10px]">
                <span>5G</span>
                <span className="w-5 h-2.5 rounded-sm border border-current inline-block relative">
                  <span className="absolute inset-0.5 bg-current rounded-xs" />
                </span>
              </div>
            </div>

            {/* SCREEN 1: ONBOARDING SPOTLIGHT */}
            {activeScreen === 'onboarding' && (
              <div className="flex-1 flex flex-col justify-between bg-[#191816] text-white relative overflow-hidden">
                {/* 3D Spotlight Podium Graphic */}
                <div className="relative flex-1 flex flex-col items-center justify-center pt-8">
                  {/* Spotlight Ray */}
                  <div className="absolute top-0 w-48 h-64 bg-gradient-to-b from-[#C2A370]/30 to-transparent blur-2xl pointer-events-none" />

                  {/* Circular Podium with Glow Ring */}
                  <div className="relative w-64 h-64 flex items-center justify-center">
                    <div className="absolute bottom-4 w-48 h-14 rounded-full bg-[#C2A370]/20 blur-md" />
                    <div className="absolute bottom-6 w-44 h-12 rounded-full border border-[#C2A370]/60 bg-[#24221F] shadow-lg flex items-center justify-center">
                      <div className="w-36 h-8 rounded-full border border-[#C2A370]/30" />
                    </div>

                    {/* Featured Armchair */}
                    <img
                      src="https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=600&q=80"
                      alt="Luxury Armchair"
                      className="relative z-10 w-44 h-44 object-contain filter drop-shadow-2xl hover:scale-105 transition-transform"
                    />
                  </div>
                </div>

                {/* Bottom Curved Sheet */}
                <div className="bg-[#FAF8F5] text-[#1C1B1A] rounded-t-[36px] p-6 pt-7 space-y-4 shadow-2xl relative z-20">
                  <div className="text-center space-y-1.5">
                    <h3 className="font-serif text-2xl font-bold tracking-tight">
                      Encuentra tu Estilo de Autor
                    </h3>
                    <p className="text-xs text-[#736B5E] max-w-xs mx-auto leading-relaxed">
                      Explora piezas escultóricas seleccionadas a mano y personalizadas para proyectos que trascienden.
                    </p>
                  </div>

                  {/* Pagination Dots */}
                  <div className="flex justify-center gap-1.5 pt-1">
                    <span className="w-6 h-1.5 rounded-full bg-[#1C1B1A]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#DDD5C5]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#DDD5C5]" />
                  </div>

                  <button
                    onClick={() => setActiveScreen('home')}
                    className="w-full py-3.5 rounded-full bg-[#1C1B1A] hover:bg-[#2C2926] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                  >
                    <span>Comenzar Experiencia</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C2A370]" />
                  </button>
                </div>
              </div>
            )}

            {/* SCREEN 2: APP HOME (Oakory & Spring Sale) */}
            {activeScreen === 'home' && (
              <div className="flex-1 flex flex-col justify-between overflow-y-auto bg-[#F9F7F2]">
                <div className="p-4 space-y-4">
                  
                  {/* User Bar */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-[#C2A370] text-[#1C1B1A] font-bold flex items-center justify-center text-xs shadow-sm">
                        JD
                      </div>
                      <div>
                        <span className="text-[10px] text-[#8C8476] block">Bienvenido,</span>
                        <strong className="text-xs text-[#1C1B1A] font-serif">Estudio Arquitectura</strong>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => showToast(`Tienes ${favorites.length} piezas guardadas.`)}
                        className="w-8 h-8 rounded-full bg-white border border-[#E5DFD3] flex items-center justify-center text-[#554F45] relative"
                      >
                        <Heart className="w-4 h-4" />
                        {favorites.length > 0 && (
                          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-rose-500 text-white rounded-full text-[9px] font-bold flex items-center justify-center">
                            {favorites.length}
                          </span>
                        )}
                      </button>

                      <button
                        onClick={() => {
                          setIsMobileSimulatorOpen(false);
                          setIsCartOpen(true);
                        }}
                        className="w-8 h-8 rounded-full bg-[#1C1B1A] text-white flex items-center justify-center relative"
                      >
                        <ShoppingBag className="w-4 h-4 text-[#C2A370]" />
                        {totalCartCount > 0 && (
                          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#C2A370] text-[#1C1B1A] rounded-full text-[9px] font-bold flex items-center justify-center">
                            {totalCartCount}
                          </span>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Search Bar */}
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-[#8C8476] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Buscar mobiliario, iluminación..."
                      className="w-full pl-8 pr-8 py-2 rounded-xl bg-white border border-[#E0D7C7] text-xs placeholder-[#9E9689] focus:outline-none focus:border-[#C2A370]"
                    />
                    <SlidersHorizontal className="w-3.5 h-3.5 text-[#8C8476] absolute right-3 top-1/2 -translate-y-1/2" />
                  </div>

                  {/* Spring Sale / Flash Deals Card */}
                  <div className="rounded-2xl bg-gradient-to-r from-[#4A4F3D] to-[#2E3325] text-white p-3.5 relative overflow-hidden shadow-sm flex items-center justify-between">
                    <div className="space-y-1 z-10 max-w-[170px]">
                      <span className="px-2 py-0.5 rounded-full bg-white/20 text-[#E5D7BE] text-[9px] font-bold uppercase tracking-wider">
                        Edición Taller
                      </span>
                      <h4 className="font-serif text-sm font-bold leading-tight">
                        Cierre de Pedidos Primavera
                      </h4>
                      <div className="flex items-center gap-1 text-[10px] text-[#E0D7C7] font-mono">
                        <Clock className="w-3 h-3 text-[#C2A370]" />
                        <span>
                          {String(countdown.hours).padStart(2, '0')}:
                          {String(countdown.minutes).padStart(2, '0')}:
                          {String(countdown.seconds).padStart(2, '0')}
                        </span>
                      </div>
                    </div>

                    <img
                      src="https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=300&q=80"
                      alt=""
                      className="w-20 h-20 object-contain drop-shadow-lg"
                    />
                  </div>

                  {/* Circular Category Pills (Reference from image_bccbd6be.png) */}
                  <div className="flex justify-between px-1">
                    {[
                      { label: 'Butacas', icon: '🪑' },
                      { label: 'Sofás', icon: '🛋️' },
                      { label: 'Camas', icon: '🛏️' },
                      { label: 'Mesas', icon: '🪵' },
                    ].map((c, i) => (
                      <div key={i} className="flex flex-col items-center gap-1">
                        <button className="w-12 h-12 rounded-full bg-white border border-[#E0D7C7] shadow-xs flex items-center justify-center text-lg hover:border-[#C2A370] transition-colors">
                          {c.icon}
                        </button>
                        <span className="text-[10px] font-medium text-[#554F45]">{c.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Popular Picks (Oakory Style) */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-serif text-sm font-bold text-[#1C1B1A]">
                        Piezas Destacadas
                      </span>
                      <span className="text-[10px] text-[#8C6F35] font-semibold cursor-pointer">
                        Ver todas &rarr;
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      {CATALOG_PRODUCTS.slice(0, 2).map((prod) => (
                        <div
                          key={prod.id}
                          onClick={() => {
                            setSelectedMobileProduct(prod);
                            setActiveScreen('product');
                          }}
                          className="bg-white p-2 rounded-xl border border-[#EAE3D5] shadow-xs cursor-pointer"
                        >
                          <div className="relative aspect-square rounded-lg overflow-hidden bg-[#ECE8DC] mb-1.5">
                            <img src={prod.images[0]} alt="" className="w-full h-full object-cover" />
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleFavorite(prod.id);
                              }}
                              className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-white/90 flex items-center justify-center text-[#554F45]"
                            >
                              <Heart
                                className={`w-3 h-3 ${
                                  favorites.includes(prod.id) ? 'fill-rose-500 text-rose-500' : ''
                                }`}
                              />
                            </button>
                          </div>
                          <h5 className="text-[11px] font-bold text-[#1C1B1A] truncate">{prod.name}</h5>
                          <div className="flex items-center justify-between text-[10px] mt-0.5">
                            <span className="font-semibold text-[#1C1B1A]">{prod.formattedPrice}</span>
                            <span className="flex items-center text-amber-600 font-bold">
                              ★ 4.9
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Trust Highlights */}
                  <div className="bg-white p-3 rounded-xl border border-[#EAE3D5] space-y-2 text-[10px] text-[#6B6357]">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#C2A370]" />
                      <span>Calidad de autor con garantía de 15 años</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Truck className="w-3.5 h-3.5 text-[#C2A370]" />
                      <span>Montaje de guante blanco en destino</span>
                    </div>
                  </div>

                </div>

                {/* Floating Bottom Quick Cart Pill (Oakory Reference) */}
                {totalCartCount > 0 && (
                  <div className="p-3 bg-white border-t border-[#EAE3D5] flex items-center justify-between">
                    <div className="text-[11px]">
                      <span className="text-[#8C8476] block">{totalCartCount} piezas en cotización</span>
                      <strong className="text-xs text-[#1C1B1A]">
                        {cart.reduce((a, b) => a + b.priceEstimate * b.quantity, 0).toLocaleString('es-ES')} €
                      </strong>
                    </div>

                    <button
                      onClick={() => {
                        setIsMobileSimulatorOpen(false);
                        setIsCartOpen(true);
                      }}
                      className="px-3.5 py-1.5 rounded-full bg-[#1C1B1A] text-white text-[11px] font-bold flex items-center gap-1.5"
                    >
                      <span>Ver Dossier</span>
                      <ArrowRight className="w-3 h-3 text-[#C2A370]" />
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* SCREEN 3: PRODUCT DETAILS & CONCIERGE (image_bccbd6be.png Screen 3) */}
            {activeScreen === 'product' && (
              <div className="flex-1 flex flex-col justify-between overflow-y-auto bg-white">
                <div className="p-4 space-y-4">
                  
                  {/* Top Bar with Back & Cart */}
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setActiveScreen('home')}
                      className="w-8 h-8 rounded-full bg-[#FAF8F5] border border-[#E5DFD3] flex items-center justify-center cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="font-serif text-xs font-bold uppercase tracking-wider text-[#1C1B1A]">
                      Detalle de Pieza
                    </span>
                    <button
                      onClick={() => toggleFavorite(selectedMobileProduct.id)}
                      className="w-8 h-8 rounded-full bg-[#FAF8F5] border border-[#E5DFD3] flex items-center justify-center cursor-pointer"
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          favorites.includes(selectedMobileProduct.id)
                            ? 'fill-rose-500 text-rose-500'
                            : ''
                        }`}
                      />
                    </button>
                  </div>

                  {/* Main Product Image */}
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#ECE8DC] shadow-inner">
                    <img
                      src={selectedMobileProduct.images[0]}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-2 left-2 bg-black/60 text-white text-[9px] px-2 py-0.5 rounded font-mono">
                      {selectedMobileProduct.dimensions}
                    </span>
                  </div>

                  {/* Thumbnails row */}
                  <div className="flex gap-2">
                    {selectedMobileProduct.images.map((img, idx) => (
                      <div key={idx} className="w-12 h-10 rounded-lg overflow-hidden border border-[#C2A370]">
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </div>
                    ))}
                    <div className="w-12 h-10 rounded-lg bg-[#FAF8F5] border border-[#E5DFD3] flex items-center justify-center text-[10px] font-bold text-[#736B5E]">
                      +4
                    </div>
                  </div>

                  {/* Title & Rating */}
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-[#8C6F35] uppercase font-bold tracking-wider">
                        {selectedMobileProduct.collection}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] font-bold text-amber-600">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
                        4.9 (128)
                      </span>
                    </div>
                    <h3 className="font-serif text-lg font-bold text-[#1C1B1A]">
                      {selectedMobileProduct.name}
                    </h3>
                  </div>

                  {/* Atelier Concierge Card (Reference: Hello, John - Manager) */}
                  <div className="p-2.5 rounded-xl bg-[#FAF8F3] border border-[#EADFC9] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#1C1B1A] text-[#E0C895] flex items-center justify-center text-[10px] font-bold">
                        MR
                      </div>
                      <div>
                        <span className="text-xs font-bold text-[#1C1B1A] block">Arq. Matteo Rossi</span>
                        <span className="text-[9px] text-[#736B5E]">Director Atelier & Prescriptor</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => showToast('Iniciando chat con Arq. Matteo Rossi...')}
                        className="w-7 h-7 rounded-full bg-white border border-[#DDD5C5] flex items-center justify-center text-[#554F45]"
                      >
                        <MessageSquare className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => showToast('Llamada directa al Atelier: +34 912 345 678')}
                        className="w-7 h-7 rounded-full bg-white border border-[#DDD5C5] flex items-center justify-center text-[#554F45]"
                      >
                        <Phone className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Color Swatch Circles */}
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-[#8C8476] block mb-1.5">
                      Paleta de Acabados
                    </span>
                    <div className="flex gap-2">
                      {COLOR_OPTIONS.slice(0, 5).map((c) => (
                        <button
                          key={c.id}
                          onClick={() => setSelectedColorHex(c.hex)}
                          className={`w-7 h-7 rounded-full border-2 transition-all flex items-center justify-center ${
                            selectedColorHex === c.hex ? 'border-[#1C1B1A] scale-110 shadow-sm' : 'border-transparent'
                          }`}
                          style={{ backgroundColor: c.hex }}
                        >
                          {selectedColorHex === c.hex && <Check className="w-3 h-3 text-white" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs text-[#554F45]">Cantidad para proyecto:</span>
                    <div className="flex items-center border border-[#DDD5C5] rounded-lg bg-[#FAF8F5]">
                      <button
                        onClick={() => setMobileQty((q) => Math.max(1, q - 1))}
                        className="w-7 h-7 flex items-center justify-center text-xs"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-7 text-center text-xs font-bold">{mobileQty}</span>
                      <button
                        onClick={() => setMobileQty((q) => q + 1)}
                        className="w-7 h-7 flex items-center justify-center text-xs"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                </div>

                {/* Floating Bottom Action */}
                <div className="p-3 bg-[#FAF8F5] border-t border-[#EAE3D5] flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[9px] uppercase text-[#8C8476] block">Estimación</span>
                    <strong className="font-serif text-base text-[#1C1B1A]">
                      {(selectedMobileProduct.priceEstimate * mobileQty).toLocaleString('es-ES')} €
                    </strong>
                  </div>

                  <button
                    onClick={handleMobileAddToCart}
                    className="flex-1 py-3 rounded-full bg-[#1C1B1A] hover:bg-[#2C2926] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-[#C2A370]" />
                    <span>Añadir a Cotización</span>
                  </button>
                </div>
              </div>
            )}

            {/* Bottom App Navigation Bar (Home, Shop, Favorites, Cart) */}
            <div className="h-12 bg-white border-t border-[#EAE3D5] px-6 flex items-center justify-between text-[#8C8476] shrink-0">
              <button
                onClick={() => setActiveScreen('home')}
                className={`flex flex-col items-center gap-0.5 ${
                  activeScreen === 'home' ? 'text-[#1C1B1A]' : 'hover:text-[#1C1B1A]'
                }`}
              >
                <Home className="w-4 h-4" />
                <span className="text-[8px] font-semibold">Inicio</span>
              </button>
              <button
                onClick={() => setActiveScreen('product')}
                className={`flex flex-col items-center gap-0.5 ${
                  activeScreen === 'product' ? 'text-[#1C1B1A]' : 'hover:text-[#1C1B1A]'
                }`}
              >
                <Grid className="w-4 h-4" />
                <span className="text-[8px]">Catálogo</span>
              </button>
              <button
                onClick={() => {
                  showToast(`Favoritos guardados: ${favorites.length} piezas.`);
                }}
                className="flex flex-col items-center gap-0.5 hover:text-[#1C1B1A]"
              >
                <Heart className="w-4 h-4" />
                <span className="text-[8px]">Favoritos</span>
              </button>
              <button
                onClick={() => {
                  setIsMobileSimulatorOpen(false);
                  setIsCartOpen(true);
                }}
                className="flex flex-col items-center gap-0.5 hover:text-[#1C1B1A] relative"
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="text-[8px]">Cotización</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
