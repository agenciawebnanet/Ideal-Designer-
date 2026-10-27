import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Sparkles, MapPin, Mail, Phone, ArrowUpRight, Compass } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setIsProjexModalOpen, setCurrentView } = useApp();

  return (
    <footer id="materiales" className="bg-[#141312] text-[#DDD5C7] border-t border-[#262421] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Atelier Brand & Philosophy */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-16 border-b border-[#2B2824]">
          
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-sm bg-[#C2A370] text-[#141312] flex items-center justify-center font-serif text-lg font-bold">
                I
              </div>
              <span className="font-serif text-xl tracking-[0.2em] text-white uppercase font-light">
                Ideal Design Concept
              </span>
            </div>

            <p className="text-xs text-[#A89F91] leading-relaxed max-w-sm font-light">
              Atelier de ebanistería y diseño arquitectónico. Creamos piezas de mobiliario escultórico que equilibran la pureza geométrica, los materiales de extracción responsable y el confort silencioso.
            </p>

            <div className="pt-2">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-[#C2A370]">
                <Sparkles className="w-3 h-3" />
                Muestrario de tejidos físicos gratuito para arquitectos
              </span>
            </div>
          </div>

          {/* Showrooms */}
          <div className="md:col-span-3 space-y-3 text-xs">
            <h4 className="uppercase tracking-[0.2em] text-white font-semibold text-[11px]">
              Ateliers & Showrooms
            </h4>
            <div className="space-y-3 text-[#A89F91]">
              <div>
                <strong className="text-white block font-medium">Madrid (Flagship)</strong>
                <span>Calle de Claudio Coello 44, Salamanca</span>
              </div>
              <div>
                <strong className="text-white block font-medium">Milano (Studio)</strong>
                <span>Via Monte Napoleone 18, Brera</span>
              </div>
              <div>
                <strong className="text-white block font-medium">París (Atelier)</strong>
                <span>Rue Saint-Honoré 212, 1er Arrondissement</span>
              </div>
            </div>
          </div>

          {/* Prescriptores & B2B */}
          <div className="md:col-span-4 space-y-3 text-xs">
            <h4 className="uppercase tracking-[0.2em] text-white font-semibold text-[11px]">
              División Contract & Arquitectura
            </h4>
            <p className="text-[#A89F91] leading-relaxed font-light">
              Ofrecemos soporte técnico directo a estudios, cálculo de cotas especiales, archivos 3D BIM/CAD y fabricación de piezas a medida para proyectos residenciales y de hostelería.
            </p>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setCurrentView('admin');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-[#C2A370] hover:text-[#E0C895] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer text-left"
              >
                <span>Acceder al Panel de Gestión de Proyectos (CRM)</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setIsProjexModalOpen(true)}
                className="text-[#E0D7C7] hover:text-white text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer text-left"
              >
                <span>¿Deseas una solución así para tu marca? Contratar Projex Tech</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Disclaimer Banner */}
        <div className="my-10 p-4 rounded-2xl bg-[#1C1A18] border border-[#33302B] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#9E9587]">
          <div className="flex items-start gap-3 max-w-3xl">
            <ShieldCheck className="w-5 h-5 text-[#C2A370] shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block mb-0.5">
                Aviso Legal & Identificación Conceptual
              </strong>
              <span>
                Esta aplicación es una demostración conceptual y técnica desarrollada por <strong>Projex Tech</strong> para exhibir el potencial comercial del sector de muebles y decoración de alta gama. No representa el sitio oficial de Ideal Muebles y Design. Todas las referencias fotográficas, marcas e importes se presentan con fines demostrativos y de prototipo.
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsProjexModalOpen(true)}
            className="shrink-0 px-4 py-2 rounded-xl bg-[#C2A370]/15 hover:bg-[#C2A370] text-[#E0C895] hover:text-[#1C1B1A] border border-[#C2A370]/40 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer"
          >
            Saber más sobre Projex Tech
          </button>
        </div>

        {/* Bottom Credits */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#736B5E] pt-4">
          <div>
            &copy; {new Date().getFullYear()} Ideal Design Concept &bull; Concepto y desarrollo tecnológico por <strong>Projex Tech</strong>.
          </div>
          <div className="flex items-center gap-6">
            <span>Privacidad Arquitectónica</span>
            <span>Términos B2B</span>
            <span>Certificación FSC 100%</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
