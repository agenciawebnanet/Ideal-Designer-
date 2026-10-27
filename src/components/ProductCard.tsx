import React from 'react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import { Plus, Sparkles, Eye, ArrowUpRight, Heart, Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { setSelectedProduct, addToCart, setIsCartOpen, favorites, toggleFavorite } = useApp();
  const isFav = favorites.includes(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      id: `${product.id}-${Date.now()}`,
      type: 'catalog',
      title: product.name,
      collection: product.collection,
      specSummary: `${product.dimensions} | ${product.materials[0] || 'Materiales nobles'}`,
      priceEstimate: product.priceEstimate,
      quantity: 1,
      image: product.images[0],
    });
  };

  const scrollToConfigurator = (e: React.MouseEvent) => {
    e.stopPropagation();
    const el = document.getElementById('configurador');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      onClick={() => setSelectedProduct(product)}
      className="group bg-white rounded-2xl border border-[#E8E2D5] overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
    >
      {/* Product Image Area */}
      <div className="relative aspect-[4/3] bg-[#EFECE6] overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />

        {/* Badges & Favorite Heart Button */}
        <div className="absolute top-3 inset-x-3 flex items-start justify-between z-10 pointer-events-none">
          <div className="flex flex-col gap-1.5 pointer-events-auto">
            {product.isIconic && (
              <span className="px-2.5 py-1 rounded-full bg-[#1C1B1A]/85 backdrop-blur-sm text-[#E0C895] text-[10px] font-semibold tracking-wider uppercase border border-white/10">
                Pieza Icónica
              </span>
            )}
            {product.isNew && (
              <span className="px-2.5 py-1 rounded-full bg-[#C2A370] text-[#1C1B1A] text-[10px] font-bold tracking-wider uppercase shadow-sm">
                Novedad 2026
              </span>
            )}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(product.id);
            }}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-md pointer-events-auto cursor-pointer ${
              isFav
                ? 'bg-rose-500 text-white'
                : 'bg-white/80 hover:bg-white text-[#4A443B]'
            }`}
            title={isFav ? 'Quitar de favoritos' : 'Guardar en favoritos'}
          >
            <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Hover Quick Action Overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
          <button
            onClick={() => setSelectedProduct(product)}
            className="w-10 h-10 rounded-full bg-white text-[#1C1B1A] flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
            title="Ver especificaciones"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={handleQuickAdd}
            className="w-10 h-10 rounded-full bg-[#C2A370] text-[#1C1B1A] flex items-center justify-center shadow-lg hover:scale-110 transition-transform font-bold"
            title="Añadir a cotización"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Details Area */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px] text-[#8C8476] uppercase tracking-wider">
            <span>{product.collection}</span>
            <div className="flex items-center gap-1 text-amber-600 font-semibold">
              <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
              <span>4.9</span>
            </div>
          </div>

          <h3 className="font-serif text-lg font-semibold text-[#1C1B1A] group-hover:text-[#8C6F35] transition-colors leading-snug">
            {product.name}
          </h3>

          <p className="text-xs text-[#6B6357] line-clamp-2 font-light leading-relaxed">
            {product.subtitle}
          </p>

          {/* Color preview dots */}
          <div className="flex items-center gap-1.5 pt-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#DED6C6] border border-black/10 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#5E6652] border border-black/10 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#2B2A29] border border-black/10 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#8D5832] border border-black/10 inline-block" />
            <span className="text-[10px] text-[#8C8476] ml-1">+4 acabados</span>
          </div>
        </div>

        {/* Bottom Card Actions */}
        <div className="pt-4 mt-4 border-t border-[#F0EBE0] flex items-center justify-between">
          <div>
            <span className="text-[10px] text-[#8C8476] uppercase tracking-wider block">
              Estimación
            </span>
            <span className="font-semibold text-sm text-[#1C1B1A]">
              {product.formattedPrice}
            </span>
          </div>

          {product.isConfigurable ? (
            <button
              onClick={scrollToConfigurator}
              className="px-3 py-1.5 rounded-lg bg-[#FAF7F0] border border-[#DDD5C5] text-[11px] text-[#8C6F35] font-semibold flex items-center gap-1 hover:bg-[#C2A370] hover:text-[#1C1B1A] transition-colors cursor-pointer"
            >
              <Sparkles className="w-3 h-3 text-[#C2A370]" />
              <span>Configurar</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          ) : (
            <button
              onClick={handleQuickAdd}
              className="px-3 py-1.5 rounded-lg bg-[#1C1B1A] text-white text-[11px] font-medium flex items-center gap-1 hover:bg-[#33302C] transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-[#C2A370]" />
              <span>Cotizar</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
