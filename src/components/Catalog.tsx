import React, { useState, useMemo } from 'react';
import { CATALOG_PRODUCTS } from '../data/mockData';
import { ProductCard } from './ProductCard';
import { Category } from '../types';
import { Search, SlidersHorizontal, Sparkles } from 'lucide-react';

const CATEGORIES: { id: Category; label: string }[] = [
  { id: 'todos', label: 'Toda la Colección' },
  { id: 'salas', label: 'Salas & Sofás' },
  { id: 'comedores', label: 'Comedores' },
  { id: 'dormitorios', label: 'Dormitorios' },
  { id: 'butacas', label: 'Butacas & Sillones' },
  { id: 'mesas', label: 'Mesas Esculturales' },
  { id: 'iluminacion', label: 'Iluminación' },
];

export const Catalog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price_asc' | 'price_desc'>('featured');

  const filteredProducts = useMemo(() => {
    return CATALOG_PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === 'todos' || product.category === selectedCategory;
      const matchesSearch =
        searchQuery === '' ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.collection.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price_asc') return a.priceEstimate - b.priceEstimate;
      if (sortBy === 'price_desc') return b.priceEstimate - a.priceEstimate;
      return 0; // featured default
    });
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <section id="catalogo" className="py-20 md:py-28 bg-[#F8F6F0] scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EAE4D7] text-[#8C6F35] text-xs font-semibold uppercase tracking-[0.2em] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C2A370]" />
            Catálogo Editorial 2026
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#1C1B1A] font-normal tracking-tight">
            Mobiliario que dialoga con la arquitectura
          </h2>
          <p className="text-[#6E6659] text-sm sm:text-base mt-3 font-light leading-relaxed">
            Cada pieza es concebida en nuestro taller europeo combinando técnicas de ebanistería ancestral y acabados minerales contemporáneos.
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-[#E8E2D5]">
          
          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-medium tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#1C1B1A] text-white shadow-sm'
                    : 'bg-[#EDE8DE] text-[#554F45] hover:bg-[#E2DDD0]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search & Sort Controls */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 md:w-64">
              <Search className="w-4 h-4 text-[#8C8476] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar por modelo o colección..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-[#DDD6C8] text-xs text-[#1C1B1A] placeholder-[#9E9689] focus:outline-none focus:border-[#C2A370] transition-colors shadow-sm"
              />
            </div>

            {/* Sort Select */}
            <div className="relative shrink-0">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="pl-3 pr-8 py-2 rounded-xl bg-white border border-[#DDD6C8] text-xs text-[#1C1B1A] focus:outline-none focus:border-[#C2A370] shadow-sm appearance-none cursor-pointer"
              >
                <option value="featured">Destacados</option>
                <option value="price_asc">Precio: Menor a Mayor</option>
                <option value="price_desc">Precio: Mayor a Menor</option>
              </select>
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#8C8476] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-[#E5DFD3] p-8">
            <p className="text-sm text-[#736B5E] mb-3">
              No se encontraron piezas con los criterios de búsqueda seleccionados.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('todos');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-lg bg-[#1C1B1A] text-white text-xs uppercase tracking-wider font-medium cursor-pointer"
            >
              Restablecer Filtros
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
