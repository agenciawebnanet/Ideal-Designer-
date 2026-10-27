import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import { 
  X, 
  ShoppingBag, 
  Sparkles, 
  Ruler, 
  Clock, 
  ShieldCheck, 
  Layers, 
  ChevronRight,
  Plus,
  Minus
} from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const { selectedProduct, setSelectedProduct, addToCart, setIsCartOpen } = useApp();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setActiveImageIndex(0);
    setQuantity(1);
  }, [selectedProduct]);

  if (!selectedProduct) return null;

  const handleAddToCart = () => {
    try {
      confetti({
        particleCount: 30,
        spread: 50,
        origin: { y: 0.8 },
      });
    } catch {}

    addToCart({
      id: `${selectedProduct.id}-${Date.now()}`,
      type: 'catalog',
      title: selectedProduct.name,
      collection: selectedProduct.collection,
      specSummary: `${selectedProduct.dimensions} | ${selectedProduct.materials[0]}`,
      priceEstimate: selectedProduct.priceEstimate,
      quantity,
      image: selectedProduct.images[0],
    });

    setSelectedProduct(null);
    setIsCartOpen(true);
  };

  const scrollToConfigurator = () => {
    setSelectedProduct(null);
    const el = document.getElementById('configurador');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-hidden shadow-2xl flex flex-col md:flex-row border border-[#E5DFD3]"
        >
          {/* Close button */}
          <button
            onClick={() => setSelectedProduct(null)}
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/5 hover:bg-black/15 text-[#1C1B1A] flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Column: Gallery */}
          <div className="w-full md:w-1/2 bg-[#F6F4ED] p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#EAE3D5]">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#ECE8DC] shadow-inner mb-4">
              <img
                src={selectedProduct.images[activeImageIndex] || selectedProduct.images[0]}
                alt={selectedProduct.name}
                className="w-full h-full object-cover object-center"
              />
              <span className="absolute bottom-3 right-3 text-[10px] uppercase tracking-widest bg-black/60 backdrop-blur-md text-white px-2.5 py-1 rounded-md">
                {selectedProduct.collection}
              </span>
            </div>

            {/* Thumbnails */}
            {selectedProduct.images.length > 1 && (
              <div className="flex gap-2.5 overflow-x-auto pb-1">
                {selectedProduct.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-16 h-14 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                      activeImageIndex === idx ? 'border-[#C2A370] scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Quick architectural pills */}
            <div className="grid grid-cols-2 gap-3 mt-4 text-xs text-[#5D5548] pt-4 border-t border-[#E5DFD3]">
              <div className="flex items-center gap-2">
                <Ruler className="w-4 h-4 text-[#C2A370]" />
                <span>{selectedProduct.dimensions}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#C2A370]" />
                <span>{selectedProduct.leadTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C2A370]" />
                <span>15 Años de Garantía</span>
              </div>
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#C2A370]" />
                <span>Muestras Disponibles</span>
              </div>
            </div>
          </div>

          {/* Right Column: Specifications & Quote Action */}
          <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[85vh]">
            <div className="space-y-5">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8C6F35] block mb-1">
                  {selectedProduct.designer}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#1C1B1A] font-semibold">
                  {selectedProduct.name}
                </h2>
                <p className="text-xs sm:text-sm text-[#736B5E] mt-1 font-light leading-relaxed">
                  {selectedProduct.subtitle}
                </p>
              </div>

              {/* Price Estimate */}
              <div className="p-3.5 rounded-xl bg-[#F8F6F1] border border-[#E8E2D5] flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#8C8476] block">
                    Estimación Presupuestaria
                  </span>
                  <div className="font-serif text-2xl font-bold text-[#1C1B1A]">
                    {selectedProduct.formattedPrice}
                  </div>
                </div>
                <span className="text-[10px] text-[#6B6152] bg-[#EAE4D7] px-2 py-0.5 rounded">
                  PVP Arquitectura (s/ IVA)
                </span>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1C1B1A] mb-2">
                  Memoria de Diseño
                </h4>
                <p className="text-xs text-[#5D5548] leading-relaxed">
                  {selectedProduct.description}
                </p>
              </div>

              {/* Materials */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1C1B1A] mb-2">
                  Materiales & Acabados
                </h4>
                <ul className="space-y-1.5 text-xs text-[#5D5548]">
                  {selectedProduct.materials.map((mat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C2A370] mt-1.5 shrink-0" />
                      <span>{mat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Configurable Banner */}
              {selectedProduct.isConfigurable && (
                <div
                  onClick={scrollToConfigurator}
                  className="p-3 rounded-xl bg-[#C2A370]/10 border border-[#C2A370]/30 flex items-center justify-between cursor-pointer hover:bg-[#C2A370]/20 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Sparkles className="w-4 h-4 text-[#8C6F35]" />
                    <span className="text-xs font-semibold text-[#1C1B1A]">
                      Personaliza esta pieza en el configurador 3D
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#8C6F35]" />
                </div>
              )}
            </div>

            {/* Actions at bottom */}
            <div className="pt-6 border-t border-[#EAE3D5] mt-6 space-y-3">
              <div className="flex items-center gap-4">
                {/* Quantity selector */}
                <div className="flex items-center border border-[#D5CDBD] rounded-xl bg-[#F9F7F2] p-1">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white text-[#1C1B1A] transition-colors cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-10 text-center text-xs font-bold font-mono">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white text-[#1C1B1A] transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Add to quote button */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 rounded-xl bg-[#1C1B1A] hover:bg-[#2F2C29] text-white text-xs sm:text-sm font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 text-[#C2A370]" />
                  <span>Añadir a Cotización ({quantity})</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
