import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight, Award, Compass, Layers } from 'lucide-react';

interface Slide {
  id: number;
  image: string;
  tag: string;
  title: string;
  subtitle: string;
  location: string;
  designerCredit: string;
}

const HERO_SLIDES: Slide[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85',
    tag: 'Colección Milano 2026',
    title: 'La pureza de la forma. El silencio del lujo.',
    subtitle: 'Mobiliario arquitectónico concebido para proyectos que trascienden las tendencias efímeras.',
    location: 'Ático Serrano • Madrid',
    designerCredit: 'Diseño por Matteo Rossi & Studio Atelier',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2000&q=85',
    tag: 'Edición Bespoke Atelier',
    title: 'Texturas minerales y maderas nobles.',
    subtitle: 'Mármoles travertinos seleccionados en cantera y uniones de ebanistería tradicional.',
    location: 'Villa Bellagio • Lago di Como',
    designerCredit: 'Curaduría por Elena Vasari',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=2000&q=85',
    tag: 'Personalización Integral',
    title: 'El sofá de tu proyecto, calibrado al milímetro.',
    subtitle: 'Configura dimensiones, tejidos de alta densidad, paletas terrosas y acabados de zócalo en tiempo real.',
    location: 'Loft Saint-Germain • París',
    designerCredit: 'Configuración interactiva en 3D/Bespoke',
  },
];

export const Hero: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[currentSlideIndex];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative w-full h-[88vh] min-h-[620px] max-h-[920px] bg-[#171615] overflow-hidden">
      {/* Background Image Carousel with Ken Burns subtle motion */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover object-center filter brightness-[0.72] contrast-[1.05]"
          />
          {/* Subtle vignette and luxury tone gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#141312] via-[#141312]/40 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#141312]/80 via-transparent to-black/30" />
        </motion.div>
      </AnimatePresence>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-between py-12 md:py-16">
        
        {/* Top Breadcrumb / Tag */}
        <motion.div
          key={`tag-${slide.id}`}
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-3"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[#E5D7BE] text-xs font-medium tracking-[0.2em] uppercase border border-white/15">
            <Sparkles className="w-3 h-3 text-[#C2A370]" />
            {slide.tag}
          </span>
          <span className="hidden sm:inline-block text-xs text-[#A9A093] tracking-widest uppercase">
            {slide.location}
          </span>
        </motion.div>

        {/* Center Editorial Typography */}
        <div className="max-w-3xl my-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={`text-${slide.id}`}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-[#F7F4EE] leading-[1.08] tracking-tight">
                {slide.title}
              </h1>

              <p className="text-base sm:text-lg text-[#D1C7B7] font-light max-w-xl leading-relaxed">
                {slide.subtitle}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button
                  onClick={() => scrollTo('configurador')}
                  className="px-7 py-3.5 rounded-full bg-[#C2A370] text-[#1C1B1A] font-medium text-xs sm:text-sm tracking-[0.14em] uppercase hover:bg-[#D4B582] transition-all transform hover:-translate-y-0.5 shadow-lg flex items-center gap-2.5 cursor-pointer group"
                >
                  <Sparkles className="w-4 h-4 text-[#1C1B1A]" />
                  <span>Configurar Sofá Interactivo</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => scrollTo('catalogo')}
                  className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/25 font-medium text-xs sm:text-sm tracking-[0.14em] uppercase transition-all cursor-pointer"
                >
                  Explorar Catálogo 2026
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Bar: Indicators & Trust Features */}
        <div className="border-t border-white/15 pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          
          {/* Trust Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 text-[#C9BFB0] text-xs">
            <div className="flex items-center gap-2.5">
              <Award className="w-4 h-4 text-[#C2A370] shrink-0" />
              <span>Garantía estructural de 15 años</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Layers className="w-4 h-4 text-[#C2A370] shrink-0" />
              <span>Muestrario de tejidos sin coste</span>
            </div>
            <div className="hidden sm:flex items-center gap-2.5">
              <Compass className="w-4 h-4 text-[#C2A370] shrink-0" />
              <span>Asesoría B2B para estudios</span>
            </div>
          </div>

          {/* Slide Navigator Controls */}
          <div className="flex items-center gap-4 self-end md:self-auto">
            <div className="flex gap-2">
              {HERO_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlideIndex(idx)}
                  className={`h-1.5 transition-all rounded-full cursor-pointer ${
                    currentSlideIndex === idx ? 'w-8 bg-[#C2A370]' : 'w-2 bg-white/30 hover:bg-white/60'
                  }`}
                  aria-label={`Ir al slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() =>
                  setCurrentSlideIndex((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1))
                }
                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:border-[#C2A370] transition-colors cursor-pointer"
                aria-label="Slide anterior"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() =>
                  setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length)
                }
                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:border-[#C2A370] transition-colors cursor-pointer"
                aria-label="Slide siguiente"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
