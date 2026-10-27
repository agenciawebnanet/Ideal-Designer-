import React from 'react';
import { Sparkles, Layers, ShieldCheck, TreePine, Gem, Flame } from 'lucide-react';

const NOBLE_MATERIALS = [
  {
    title: 'Mármol Travertino Romano Navona',
    origin: 'Tívoli, Italia',
    description: 'Piedra sedimentaria con poros minerales naturales tratados al agua. Aporta una presencia tectónica sobria y atemporal.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    icon: <Gem className="w-4 h-4 text-[#C2A370]" />,
  },
  {
    title: 'Roble Francés & Nogal Macizo FSC',
    origin: 'Bosques Sostenibles, Francia',
    description: 'Secado lento de 18 meses para garantizar estabilidad dimensional. Uniones artesanales en cola de milano sin tornillería visible.',
    image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=800&q=80',
    icon: <TreePine className="w-4 h-4 text-[#C2A370]" />,
  },
  {
    title: 'Bouclé Italiano de Lana Merina',
    origin: 'Biella, Piamonte',
    description: 'Tejido tridimensional con bucles cerrados que ofrecen un tacto envolvente, resistencia extrema a la abrasión y propiedades atérmicas.',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
    icon: <Layers className="w-4 h-4 text-[#C2A370]" />,
  },
  {
    title: 'Latón Satinado & Bronce Cepillado',
    origin: 'Valencia, España',
    description: 'Pátinas minerales aplicadas manualmente con cera vegetal que envejecen con elegancia y captan los reflejos crepusculares.',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
    icon: <Flame className="w-4 h-4 text-[#C2A370]" />,
  },
];

export const MaterialsShowcase: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-[#F4F1E8] border-t border-[#E5DFD3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EAE4D7] text-[#8C6F35] text-xs font-semibold uppercase tracking-[0.2em] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C2A370]" />
            Pureza Material
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#1C1B1A] font-normal tracking-tight">
            La nobleza de la materia en su estado más honesto
          </h2>
          <p className="text-[#6E6659] text-sm sm:text-base mt-3 font-light leading-relaxed">
            Seleccionamos materias primas autóctonas europeas tratadas con procesos biológicos sin barnices sintéticos que alteren su respiración natural.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {NOBLE_MATERIALS.map((mat, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-[#E5DFD3] overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] bg-[#EAE5D9] overflow-hidden">
                <img
                  src={mat.image}
                  alt={mat.title}
                  className="w-full h-full object-cover filter contrast-[1.03] hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute bottom-2.5 left-2.5 bg-black/60 backdrop-blur-md text-white text-[10px] uppercase font-mono px-2 py-0.5 rounded">
                  {mat.origin}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    {mat.icon}
                    <h3 className="font-serif text-base font-semibold text-[#1C1B1A] leading-snug">
                      {mat.title}
                    </h3>
                  </div>
                  <p className="text-xs text-[#6B6357] font-light leading-relaxed">
                    {mat.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#F0EBE0] flex items-center justify-between text-[11px] text-[#8C6F35] font-semibold">
                  <span>Muestras físicas disponibles</span>
                  <span>&rarr;</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Architect Swatch Box Offer */}
        <div className="mt-12 bg-[#1C1B1A] text-white rounded-3xl p-8 sm:p-10 border border-[#3A3630] flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-[10px] uppercase tracking-widest text-[#C2A370] font-bold">
              Servicio para Profesionales del Diseño
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-light">
              Solicita la caja de muestras físicas de Ideal Atelier
            </h3>
            <p className="text-xs sm:text-sm text-[#C9BFB0] max-w-xl font-light">
              Recibe en tu estudio un estuche con 12 muestras de maderas macizas, mármoles apomazados y telas de lana virgen para presentar a tus clientes.
            </p>
          </div>

          <button
            onClick={() => {
              const el = document.getElementById('configurador');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="shrink-0 px-6 py-3.5 rounded-full bg-[#C2A370] hover:bg-[#D4B582] text-[#1C1B1A] text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer"
          >
            Solicitar Muestrario para Estudio
          </button>
        </div>

      </div>
    </section>
  );
};
