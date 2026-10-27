import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LOOKBOOK_ROOMS, CATALOG_PRODUCTS } from '../data/mockData';
import { Hotspot, LookbookRoom } from '../types';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  MapPin, 
  Plus, 
  Eye, 
  Maximize2, 
  Compass,
  ArrowRight,
  Info
} from 'lucide-react';

export const Lookbook: React.FC = () => {
  const { setSelectedProduct, addToCart, showToast } = useApp();
  const [selectedRoomIndex, setSelectedRoomIndex] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);

  const room = LOOKBOOK_ROOMS[selectedRoomIndex];

  const handleHotspotClick = (hotspot: Hotspot) => {
    setActiveHotspot(activeHotspot?.id === hotspot.id ? null : hotspot);
  };

  const handleOpenProduct = (productId: string) => {
    const product = CATALOG_PRODUCTS.find((p) => p.id === productId);
    if (product) {
      setSelectedProduct(product);
      setActiveHotspot(null);
    }
  };

  const handleAddHotspotToCart = (hotspot: Hotspot) => {
    const product = CATALOG_PRODUCTS.find((p) => p.id === hotspot.productId);
    if (product) {
      addToCart({
        id: `${product.id}-${Date.now()}`,
        type: 'catalog',
        title: product.name,
        collection: product.collection,
        specSummary: `${product.dimensions} | ${product.materials[0]}`,
        priceEstimate: product.priceEstimate,
        quantity: 1,
        image: product.images[0],
      });
      setActiveHotspot(null);
    } else {
      showToast(`Elemento "${hotspot.productName}" añadido.`);
    }
  };

  return (
    <section id="lookbook" className="py-20 md:py-28 bg-[#1B1A18] text-[#F3EFE6] scroll-mt-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#C2A370] text-xs font-semibold uppercase tracking-[0.2em] mb-3 border border-white/10">
              <Compass className="w-3.5 h-3.5 text-[#C2A370]" />
              Lookbook de Proyectos Reales
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-white font-normal tracking-tight">
              Espacios habitados por el diseño
            </h2>
            <p className="text-[#A39A8C] text-sm sm:text-base mt-2 max-w-xl font-light">
              Explora cómo conviven nuestras piezas en proyectos residenciales y boutique de autor. Pulsa en los puntos interactivos para descubrir cada elemento.
            </p>
          </div>

          {/* Room Selector Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {LOOKBOOK_ROOMS.map((r, idx) => (
              <button
                key={r.id}
                onClick={() => {
                  setSelectedRoomIndex(idx);
                  setActiveHotspot(null);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-medium tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                  selectedRoomIndex === idx
                    ? 'bg-[#C2A370] text-[#1C1B1A] font-bold shadow-lg'
                    : 'bg-white/10 hover:bg-white/15 text-[#C9BFB0] border border-white/10'
                }`}
              >
                {r.title.split('-')[0].trim()}
              </button>
            ))}
          </div>
        </div>

        {/* Room Interactive Stage */}
        <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#121110]">
          
          {/* Main Room Image */}
          <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] max-h-[680px]">
            <AnimatePresence mode="wait">
              <motion.img
                key={room.id}
                src={room.heroImage}
                alt={room.title}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full h-full object-cover object-center filter brightness-[0.88]"
              />
            </AnimatePresence>

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

            {/* Pulsing Hotspots */}
            {room.hotspots.map((hotspot) => {
              const isActive = activeHotspot?.id === hotspot.id;
              return (
                <div
                  key={hotspot.id}
                  className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${hotspot.xPercent}%`, top: `${hotspot.yPercent}%` }}
                >
                  {/* Pin Circle with Ripple */}
                  <div className="relative group">
                    <span className="absolute -inset-2 rounded-full bg-[#C2A370]/40 animate-ping" />
                    <button
                      onClick={() => handleHotspotClick(hotspot)}
                      className={`relative w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-xl transition-all cursor-pointer ${
                        isActive
                          ? 'bg-white text-black scale-125 ring-4 ring-[#C2A370]'
                          : 'bg-[#C2A370] text-[#1C1B1A] hover:scale-110'
                      }`}
                      aria-label={`Ver ${hotspot.productName}`}
                    >
                      <Plus className={`w-4 h-4 transition-transform ${isActive ? 'rotate-45' : ''}`} />
                    </button>
                  </div>

                  {/* Hotspot Floating Popover Card */}
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute bottom-11 left-1/2 -translate-x-1/2 w-64 sm:w-72 bg-[#1C1B1A]/95 backdrop-blur-md text-white p-3.5 rounded-2xl border border-white/20 shadow-2xl z-30"
                    >
                      <div className="flex gap-3 items-center">
                        <img
                          src={hotspot.thumbnail}
                          alt={hotspot.productName}
                          className="w-16 h-16 rounded-xl object-cover shrink-0 border border-white/10"
                        />
                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] text-[#C2A370] uppercase tracking-wider block font-medium">
                            Pieza en este ambiente
                          </span>
                          <h4 className="font-serif text-sm font-semibold text-white truncate">
                            {hotspot.productName}
                          </h4>
                          <span className="text-xs font-semibold text-[#E5D7BE] block mt-0.5">
                            {hotspot.price}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mt-3 pt-2.5 border-t border-white/10">
                        <button
                          onClick={() => handleOpenProduct(hotspot.productId)}
                          className="flex-1 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[11px] font-medium flex items-center justify-center gap-1 transition-colors cursor-pointer"
                        >
                          <Eye className="w-3 h-3 text-[#C2A370]" />
                          <span>Ver Ficha</span>
                        </button>
                        <button
                          onClick={() => handleAddHotspotToCart(hotspot)}
                          className="flex-1 py-1.5 rounded-lg bg-[#C2A370] hover:bg-[#D4B582] text-[#1C1B1A] text-[11px] font-bold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Cotizar</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              );
            })}

            {/* Bottom Room Meta Badge */}
            <div className="absolute bottom-6 left-6 right-6 z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="max-w-xl">
                <div className="flex items-center gap-2 text-xs text-[#C2A370] font-medium tracking-wider uppercase mb-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{room.location} &bull; {room.architect}</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-light text-white">
                  {room.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#C9BFB0] mt-1 font-light line-clamp-2">
                  {room.description}
                </p>
              </div>

              <div className="shrink-0 flex items-center gap-2 bg-black/50 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/15 text-xs text-[#E0D7C7]">
                <Info className="w-4 h-4 text-[#C2A370]" />
                <span>{room.hotspots.length} piezas identificadas en la escena</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
