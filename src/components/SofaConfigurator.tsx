import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import { 
  FABRIC_OPTIONS, 
  COLOR_OPTIONS, 
  SIZE_OPTIONS, 
  BASE_FINISH_OPTIONS 
} from '../data/mockData';
import { 
  SofaModel, 
  FabricType, 
  ColorTone, 
  ModuleSize, 
  BaseFinish 
} from '../types';
import { 
  Sparkles, 
  Layers, 
  Ruler, 
  Sun, 
  Moon, 
  Check, 
  Info, 
  ShoppingBag, 
  RefreshCw,
  FileText,
  Sliders,
  Maximize2
} from 'lucide-react';

export const SofaConfigurator: React.FC = () => {
  const { sofaConfig, setSofaConfig, addToCart, setIsCartOpen, showToast } = useApp();

  // Local visualizer view state
  const [viewMode, setViewMode] = useState<'perspective' | 'front' | 'blueprint'>('perspective');
  const [lightingMode, setLightingMode] = useState<'day' | 'evening'>('day');
  const [activeStepTab, setActiveStepTab] = useState<'modelo' | 'medidas' | 'tejido' | 'color' | 'base'>('tejido');
  const [isZoomed, setIsZoomed] = useState(false);

  // Active option lookups
  const activeFabric = FABRIC_OPTIONS.find((f) => f.id === sofaConfig.fabric) || FABRIC_OPTIONS[0];
  const activeColor = COLOR_OPTIONS.find((c) => c.id === sofaConfig.color) || COLOR_OPTIONS[0];
  const activeSize = SIZE_OPTIONS.find((s) => s.id === sofaConfig.size) || SIZE_OPTIONS[1];
  const activeBase = BASE_FINISH_OPTIONS.find((b) => b.id === sofaConfig.baseFinish) || BASE_FINISH_OPTIONS[0];

  // Dynamic price calculation
  const calculatedPrice = Math.round(
    activeSize.basePrice * activeFabric.priceMultiplier +
      activeBase.extraPrice +
      (sofaConfig.cushionDensity === 'confort_pluma' ? 190 : 0) +
      (sofaConfig.includeStool ? 650 : 0)
  );

  const handleModelChange = (model: SofaModel) => {
    setSofaConfig((prev) => ({ ...prev, model, estimatedPrice: calculatedPrice }));
  };

  const handleFabricChange = (fabric: FabricType) => {
    setSofaConfig((prev) => ({ ...prev, fabric, estimatedPrice: calculatedPrice }));
  };

  const handleColorChange = (color: ColorTone) => {
    setSofaConfig((prev) => ({ ...prev, color, estimatedPrice: calculatedPrice }));
  };

  const handleSizeChange = (size: ModuleSize) => {
    setSofaConfig((prev) => ({ ...prev, size, estimatedPrice: calculatedPrice }));
  };

  const handleBaseChange = (baseFinish: BaseFinish) => {
    setSofaConfig((prev) => ({ ...prev, baseFinish, estimatedPrice: calculatedPrice }));
  };

  const handleAddToCart = () => {
    // Trigger confetti
    try {
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#C2A370', '#E0C895', '#DED6C6', '#1C1B1A'],
      });
    } catch {
      // safe fallback
    }

    addToCart({
      id: `config-${Date.now()}`,
      type: 'custom_sofa',
      title: `Sofá ${sofaConfig.model === 'curva' ? 'Escultórico Curva' : sofaConfig.model === 'aura' ? 'Modular Aura' : 'Lounge Grande Formato'} (Bespoke)`,
      collection: 'Ideal Bespoke Atelier',
      specSummary: `${activeSize.name} | ${activeFabric.name} (${activeColor.name}) | Base ${activeBase.name}`,
      priceEstimate: calculatedPrice,
      quantity: 1,
      image:
        sofaConfig.model === 'curva'
          ? 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80'
          : 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=600&q=80',
      configDetails: { ...sofaConfig, estimatedPrice: calculatedPrice },
    });

    setIsCartOpen(true);
  };

  return (
    <section id="configurador" className="py-20 md:py-28 bg-[#F4F1E8] border-b border-[#E5DFD2] scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5DFD2] text-[#8C6F35] text-xs font-semibold uppercase tracking-[0.2em] mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#C2A370]" />
              Configurador Interactivo Bespoke
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#1C1B1A] font-normal tracking-tight">
              Diseña tu pieza a medida en tiempo real
            </h2>
            <p className="text-[#6B6357] text-sm sm:text-base mt-2 max-w-2xl font-light">
              Explora proporciones, texturas táctiles europeas y bases artesanales con actualización visual instantánea.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            <button
              onClick={() => {
                setSofaConfig({
                  model: 'curva',
                  fabric: 'boucle',
                  color: 'arena',
                  size: '3_plazas',
                  baseFinish: 'nogal_oscuro',
                  cushionDensity: 'confort_pluma',
                  includeStool: false,
                  estimatedPrice: 3890,
                  leadTimeWeeks: 5,
                });
                showToast('Configurador restablecido a valores predeterminados.');
              }}
              className="px-3.5 py-2 rounded-lg bg-white/80 hover:bg-white text-xs text-[#554F45] border border-[#DDD6C8] flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Restablecer</span>
            </button>
          </div>
        </div>

        {/* Main Configurator Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Visualizer Canvas & Render Stage (7 Cols) */}
          <div className="lg:col-span-7 bg-[#EFECE3] rounded-2xl border border-[#DED7C7] p-4 sm:p-6 shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[520px] md:min-h-[640px]">
            
            {/* Top Toolbar in Visualizer */}
            <div className="flex items-center justify-between z-20 gap-2 flex-wrap">
              {/* Perspective View Selectors */}
              <div className="flex bg-[#E2DBD0]/80 p-1 rounded-xl border border-[#D5CDBD] text-xs">
                <button
                  onClick={() => setViewMode('perspective')}
                  className={`px-3 py-1.5 rounded-lg transition-all font-medium cursor-pointer ${
                    viewMode === 'perspective'
                      ? 'bg-white text-[#1C1B1A] shadow-sm'
                      : 'text-[#6C6457] hover:text-[#1C1B1A]'
                  }`}
                >
                  Perspectiva 3D
                </button>
                <button
                  onClick={() => setViewMode('front')}
                  className={`px-3 py-1.5 rounded-lg transition-all font-medium cursor-pointer ${
                    viewMode === 'front'
                      ? 'bg-white text-[#1C1B1A] shadow-sm'
                      : 'text-[#6C6457] hover:text-[#1C1B1A]'
                  }`}
                >
                  Frontal
                </button>
                <button
                  onClick={() => setViewMode('blueprint')}
                  className={`px-3 py-1.5 rounded-lg transition-all font-medium flex items-center gap-1 cursor-pointer ${
                    viewMode === 'blueprint'
                      ? 'bg-white text-[#1C1B1A] shadow-sm'
                      : 'text-[#6C6457] hover:text-[#1C1B1A]'
                  }`}
                >
                  <Ruler className="w-3 h-3 text-[#C2A370]" />
                  Plano & Cotas
                </button>
              </div>

              {/* Lighting Switch & Zoom */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setLightingMode(lightingMode === 'day' ? 'evening' : 'day')}
                  className="px-3 py-1.5 rounded-lg bg-white/80 hover:bg-white text-[#4A443B] border border-[#D5CDBD] text-xs font-medium flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
                  title="Cambiar iluminación del render"
                >
                  {lightingMode === 'day' ? (
                    <>
                      <Sun className="w-3.5 h-3.5 text-amber-500" />
                      <span className="hidden sm:inline">Luz Diurna (5000K)</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-3.5 h-3.5 text-indigo-400" />
                      <span className="hidden sm:inline">Luz Cálida (2700K)</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => setIsZoomed(!isZoomed)}
                  className={`p-2 rounded-lg bg-white/80 hover:bg-white text-[#4A443B] border border-[#D5CDBD] text-xs transition-colors shadow-sm cursor-pointer ${
                    isZoomed ? 'ring-2 ring-[#C2A370]' : ''
                  }`}
                  title="Zoom detalle"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Dynamic Visual Stage */}
            <div className={`relative my-auto w-full py-10 flex flex-col items-center justify-center transition-all duration-500 ${
              isZoomed ? 'scale-110' : 'scale-100'
            }`}>
              
              {/* Dynamic Room Environment Backlight */}
              <div
                className="absolute inset-0 rounded-xl transition-all duration-700 pointer-events-none"
                style={{
                  background:
                    lightingMode === 'day'
                      ? 'radial-gradient(circle at 50% 40%, rgba(255,255,255,0.7) 0%, rgba(230,223,211,0.2) 75%)'
                      : 'radial-gradient(circle at 50% 40%, rgba(245,215,160,0.3) 0%, rgba(35,32,28,0.4) 85%)',
                }}
              />

              {/* Render View Mode Condition */}
              {viewMode === 'blueprint' ? (
                /* Architectural Blueprint / CAD View with Dimensions */
                <div className="w-full max-w-lg p-6 bg-[#1F1E1C] text-[#E0D7C7] rounded-xl border border-[#3E3A33] shadow-inner font-mono text-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="text-[#C2A370] font-sans font-bold text-sm">
                      ESQUEMA ARQUITECTÓNICO & PLANTA
                    </span>
                    <span className="text-[10px] text-white/50">ESCALA 1:20 • COTAS EN CM</span>
                  </div>

                  {/* Blueprint Graphic */}
                  <div className="relative border border-dashed border-[#C2A370]/50 rounded-lg h-44 bg-[#171615] flex flex-col items-center justify-center p-4">
                    {/* Width Dimension Line */}
                    <div className="absolute top-2 inset-x-6 flex items-center justify-between text-[11px] text-[#C2A370]">
                      <div className="w-2 h-2 border-l border-t border-[#C2A370]" />
                      <div className="flex-1 border-b border-[#C2A370] mx-2 text-center">
                        {activeSize.dimensions.split('×')[0].trim()}
                      </div>
                      <div className="w-2 h-2 border-r border-t border-[#C2A370]" />
                    </div>

                    {/* Sofa Top Silhouette */}
                    <div
                      className="w-4/5 h-24 rounded-2xl border-2 border-[#C2A370] flex items-center justify-around relative overflow-hidden transition-all"
                      style={{ backgroundColor: activeColor.hex }}
                    >
                      {/* Module separation lines based on size */}
                      {activeSize.seats >= 3 && (
                        <div className="absolute inset-y-0 left-1/3 border-r border-black/20" />
                      )}
                      {activeSize.seats >= 3 && (
                        <div className="absolute inset-y-0 right-1/3 border-r border-black/20" />
                      )}
                      {sofaConfig.size.includes('chaise') && (
                        <div className="absolute inset-y-0 right-0 w-1/3 bg-black/10 border-l border-black/30 flex items-center justify-center text-[10px] text-black/70">
                          MÓDULO CHAISE
                        </div>
                      )}
                      <span className="text-[10px] uppercase tracking-widest text-[#1C1B1A] font-bold bg-white/60 px-2 py-0.5 rounded">
                        {activeSize.name}
                      </span>
                    </div>

                    {/* Depth Dimension Line */}
                    <div className="absolute right-2 inset-y-6 flex flex-col items-center justify-between text-[10px] text-[#C2A370]">
                      <div className="w-1.5 h-1.5 border-t border-r border-[#C2A370]" />
                      <div className="writing-mode-vertical border-l border-[#C2A370] my-2 text-center">
                        {activeSize.dimensions.split('×')[1]?.trim() || '104 cm'}
                      </div>
                      <div className="w-1.5 h-1.5 border-b border-r border-[#C2A370]" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-[11px]">
                    <div>
                      <span className="text-white/40 block">MODELO</span>
                      <span className="text-white uppercase font-sans font-medium">
                        {sofaConfig.model === 'curva' ? 'Curva Orgánica' : sofaConfig.model === 'aura' ? 'Aura Minimal' : 'Lounge Modular'}
                      </span>
                    </div>
                    <div>
                      <span className="text-white/40 block">ACABADO DE BASE</span>
                      <span className="text-white font-sans font-medium">{activeBase.name}</span>
                    </div>
                    <div>
                      <span className="text-white/40 block">TAPIZADO SELECCIONADO</span>
                      <span className="text-white font-sans font-medium">{activeFabric.name} ({activeColor.name})</span>
                    </div>
                    <div>
                      <span className="text-white/40 block">TIEMPO ESTIMADO</span>
                      <span className="text-[#C2A370] font-sans font-bold">{sofaConfig.leadTimeWeeks} semanas artesanal</span>
                    </div>
                  </div>
                </div>
              ) : (
                /* Dynamic Interactive Visual Render with Shadows and Textures */
                <div className="relative w-full max-w-lg aspect-[16/10] flex items-center justify-center">
                  
                  {/* Cast shadow under the sofa */}
                  <div
                    className="absolute bottom-4 inset-x-8 h-8 rounded-full blur-md opacity-40 transition-all duration-500"
                    style={{
                      background:
                        lightingMode === 'day'
                          ? 'radial-gradient(ellipse at center, rgba(30,25,20,0.6) 0%, rgba(0,0,0,0) 70%)'
                          : 'radial-gradient(ellipse at center, rgba(15,10,5,0.85) 0%, rgba(0,0,0,0) 70%)',
                      width: sofaConfig.size.includes('chaise') ? '92%' : '82%',
                    }}
                  />

                  {/* Base/Legs Visual Representation */}
                  <div className="absolute bottom-6 inset-x-12 flex justify-between px-6 z-10">
                    {sofaConfig.baseFinish !== 'flotante' ? (
                      <>
                        <div
                          className="w-4 h-6 rounded-b shadow-sm transition-colors duration-300"
                          style={{ backgroundColor: activeBase.colorHex }}
                        />
                        <div
                          className="w-4 h-6 rounded-b shadow-sm transition-colors duration-300"
                          style={{ backgroundColor: activeBase.colorHex }}
                        />
                        {sofaConfig.size.includes('chaise') && (
                          <div
                            className="w-4 h-6 rounded-b shadow-sm transition-colors duration-300"
                            style={{ backgroundColor: activeBase.colorHex }}
                          />
                        )}
                        <div
                          className="w-4 h-6 rounded-b shadow-sm transition-colors duration-300"
                          style={{ backgroundColor: activeBase.colorHex }}
                        />
                      </>
                    ) : (
                      <div
                        className="w-full h-2 rounded-full mx-8 opacity-70 transition-all"
                        style={{ backgroundColor: activeBase.colorHex }}
                      />
                    )}
                  </div>

                  {/* Main Sofa Body Composite */}
                  <motion.div
                    key={`${sofaConfig.model}-${sofaConfig.color}-${sofaConfig.fabric}-${sofaConfig.size}`}
                    initial={{ opacity: 0.85, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35 }}
                    className="relative z-10 w-full h-full flex flex-col items-center justify-center"
                  >
                    {/* Visual Graphic Representation of the High-End Furniture */}
                    <div
                      className="relative rounded-3xl transition-all duration-500 shadow-xl overflow-hidden flex flex-col justify-end"
                      style={{
                        backgroundColor: activeColor.hex,
                        width: sofaConfig.size === '2_plazas' ? '74%' : sofaConfig.size.includes('chaise') ? '94%' : '84%',
                        height: '68%',
                        borderRadius: sofaConfig.model === 'curva' ? '42px 42px 28px 28px' : '24px 24px 18px 18px',
                        boxShadow:
                          lightingMode === 'day'
                            ? '0 20px 35px -10px rgba(70,55,40,0.25), inset 0 2px 4px rgba(255,255,255,0.4), inset 0 -4px 8px rgba(0,0,0,0.15)'
                            : '0 25px 40px -10px rgba(20,15,10,0.5), inset 0 2px 3px rgba(255,200,120,0.3), inset 0 -6px 12px rgba(0,0,0,0.4)',
                      }}
                    >
                      {/* Fabric Texture Weave Simulation Layer */}
                      <div
                        className="absolute inset-0 opacity-25 mix-blend-multiply pointer-events-none"
                        style={{ backgroundImage: activeFabric.textureCss }}
                      />

                      {/* Top Soft Highlights */}
                      <div className="absolute top-0 inset-x-0 h-10 bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />

                      {/* Backrest Cushions */}
                      <div className="absolute top-2 inset-x-3 flex gap-2 h-1/2">
                        <div
                          className="flex-1 rounded-2xl border-b border-black/15 shadow-sm"
                          style={{
                            backgroundColor: activeColor.hex,
                            filter: 'brightness(0.96)',
                            borderRadius: sofaConfig.model === 'curva' ? '30px 30px 18px 18px' : '16px',
                          }}
                        />
                        <div
                          className="flex-1 rounded-2xl border-b border-black/15 shadow-sm"
                          style={{
                            backgroundColor: activeColor.hex,
                            filter: 'brightness(0.98)',
                            borderRadius: sofaConfig.model === 'curva' ? '30px 30px 18px 18px' : '16px',
                          }}
                        />
                        {activeSize.seats >= 3 && (
                          <div
                            className="flex-1 rounded-2xl border-b border-black/15 shadow-sm"
                            style={{
                              backgroundColor: activeColor.hex,
                              filter: 'brightness(0.96)',
                              borderRadius: sofaConfig.model === 'curva' ? '30px 30px 18px 18px' : '16px',
                            }}
                          />
                        )}
                      </div>

                      {/* Seat Cushions with Seams */}
                      <div className="relative z-10 w-full h-1/2 flex gap-1.5 p-2 items-end">
                        <div
                          className="flex-1 h-full rounded-xl border border-black/10 shadow-inner flex items-center justify-center text-[10px] text-black/30 font-serif"
                          style={{ backgroundColor: activeColor.hex }}
                        >
                          I
                        </div>
                        <div
                          className="flex-1 h-full rounded-xl border border-black/10 shadow-inner flex items-center justify-center text-[10px] text-black/30 font-serif"
                          style={{ backgroundColor: activeColor.hex }}
                        >
                          II
                        </div>
                        {activeSize.seats >= 3 && (
                          <div
                            className="flex-1 h-full rounded-xl border border-black/10 shadow-inner flex items-center justify-center text-[10px] text-black/30 font-serif"
                            style={{ backgroundColor: activeColor.hex }}
                          >
                            III
                          </div>
                        )}
                        {sofaConfig.size.includes('chaise') && (
                          <div
                            className="w-1/4 h-full rounded-xl border border-black/15 bg-black/5 flex items-center justify-center text-[9px] text-black/50 font-medium"
                          >
                            CHAISE
                          </div>
                        )}
                      </div>

                      {/* Discrete Model Stamp */}
                      <div className="absolute bottom-2 right-4 text-[9px] font-sans tracking-[0.2em] uppercase text-black/40">
                        Ideal Atelier • {sofaConfig.model}
                      </div>
                    </div>
                  </motion.div>

                  {/* Realtime Floating Dimension Tags */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-md text-[11px] font-medium text-[#2E2B27] border border-[#DDD5C5] shadow-sm">
                    {activeSize.dimensions}
                  </div>

                  <div className="absolute bottom-2 left-4 flex items-center gap-1.5 bg-[#1C1B1A]/80 backdrop-blur-sm px-2.5 py-1 rounded-md text-[11px] text-[#E0D7C7] border border-white/10">
                    <span
                      className="w-2.5 h-2.5 rounded-full inline-block border border-white/40"
                      style={{ backgroundColor: activeColor.hex }}
                    />
                    <span>{activeColor.name} &bull; {activeFabric.name}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Render Summary Bar */}
            <div className="pt-4 border-t border-[#DED7C7] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#5D564B]">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-[#C2A370] shrink-0" />
                <span>
                  Elaborado artesanalmente bajo plano con doble pespunte y armazón macizo de haya.
                </span>
              </div>
              <div className="font-semibold text-[#1C1B1A] shrink-0">
                Plazo estimado: {sofaConfig.leadTimeWeeks} semanas
              </div>
            </div>

          </div>

          {/* Configuration Controls Sidebar (5 Cols) */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-[#E0D9CB] p-6 shadow-sm flex flex-col justify-between">
            
            <div className="space-y-6">
              
              {/* Step Navigation Tabs */}
              <div className="flex border-b border-[#E8E2D5] overflow-x-auto pb-1 gap-4 text-xs scrollbar-none">
                <button
                  onClick={() => setActiveStepTab('tejido')}
                  className={`pb-2.5 uppercase tracking-wider font-semibold whitespace-nowrap cursor-pointer transition-colors ${
                    activeStepTab === 'tejido'
                      ? 'border-b-2 border-[#C2A370] text-[#1C1B1A]'
                      : 'text-[#857C70] hover:text-[#1C1B1A]'
                  }`}
                >
                  1. Tejido
                </button>
                <button
                  onClick={() => setActiveStepTab('color')}
                  className={`pb-2.5 uppercase tracking-wider font-semibold whitespace-nowrap cursor-pointer transition-colors ${
                    activeStepTab === 'color'
                      ? 'border-b-2 border-[#C2A370] text-[#1C1B1A]'
                      : 'text-[#857C70] hover:text-[#1C1B1A]'
                  }`}
                >
                  2. Color
                </button>
                <button
                  onClick={() => setActiveStepTab('medidas')}
                  className={`pb-2.5 uppercase tracking-wider font-semibold whitespace-nowrap cursor-pointer transition-colors ${
                    activeStepTab === 'medidas'
                      ? 'border-b-2 border-[#C2A370] text-[#1C1B1A]'
                      : 'text-[#857C70] hover:text-[#1C1B1A]'
                  }`}
                >
                  3. Medidas
                </button>
                <button
                  onClick={() => setActiveStepTab('base')}
                  className={`pb-2.5 uppercase tracking-wider font-semibold whitespace-nowrap cursor-pointer transition-colors ${
                    activeStepTab === 'base'
                      ? 'border-b-2 border-[#C2A370] text-[#1C1B1A]'
                      : 'text-[#857C70] hover:text-[#1C1B1A]'
                  }`}
                >
                  4. Base & Detalles
                </button>
              </div>

              {/* TAB 1: TEJIDO */}
              {activeStepTab === 'tejido' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#736B5E]">
                      Familia de Tejido Noble
                    </span>
                    <span className="text-xs text-[#C2A370] font-medium">
                      5 Calidades Certificadas
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {FABRIC_OPTIONS.map((fabric) => {
                      const isSelected = sofaConfig.fabric === fabric.id;
                      return (
                        <div
                          key={fabric.id}
                          onClick={() => handleFabricChange(fabric.id as FabricType)}
                          className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                            isSelected
                              ? 'border-[#C2A370] bg-[#FAF8F3] shadow-sm'
                              : 'border-[#E8E2D5] hover:border-[#D5CDBD] bg-white'
                          }`}
                        >
                          {/* Tactile Texture Swatch Preview */}
                          <div
                            className="w-12 h-12 rounded-lg shrink-0 border border-[#D5CDBD] shadow-inner relative overflow-hidden"
                            style={{ backgroundImage: fabric.textureCss }}
                          >
                            {isSelected && (
                              <div className="absolute inset-0 bg-[#C2A370]/30 flex items-center justify-center">
                                <Check className="w-4 h-4 text-black font-bold" />
                              </div>
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-[#1C1B1A]">
                                {fabric.name}
                              </span>
                              <span className="text-[11px] text-[#736B5E]">
                                {fabric.origin}
                              </span>
                            </div>
                            <p className="text-[11px] text-[#635C50] mt-0.5 line-clamp-2">
                              {fabric.description}
                            </p>
                            <span className="text-[10px] text-[#8C8476] font-mono mt-1 block">
                              {fabric.composition}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 2: COLOR */}
              {activeStepTab === 'color' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#736B5E]">
                      Paleta Mineral y Orgánica
                    </span>
                    <span className="text-xs text-[#1C1B1A] font-medium">
                      {activeColor.name}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {COLOR_OPTIONS.map((color) => {
                      const isSelected = sofaConfig.color === color.id;
                      return (
                        <button
                          key={color.id}
                          onClick={() => handleColorChange(color.id as ColorTone)}
                          className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between h-28 ${
                            isSelected
                              ? 'border-[#C2A370] bg-[#FAF8F3] shadow-md ring-1 ring-[#C2A370]'
                              : 'border-[#E8E2D5] hover:border-[#D5CDBD] bg-white'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span
                              className="w-6 h-6 rounded-full border border-black/15 shadow-sm inline-block"
                              style={{ backgroundColor: color.hex }}
                            />
                            {isSelected && <Check className="w-3.5 h-3.5 text-[#C2A370]" />}
                          </div>
                          <div>
                            <span className="text-xs font-semibold text-[#1C1B1A] block">
                              {color.name}
                            </span>
                            <span className="text-[10px] text-[#8C8476] line-clamp-1">
                              {color.description}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 3: MEDIDAS Y MÓDULOS */}
              {activeStepTab === 'medidas' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#736B5E]">
                      Configuración de Módulos & Espacio
                    </span>
                    <span className="text-xs text-[#C2A370] font-medium">
                      {activeSize.seats} Asientos
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {SIZE_OPTIONS.map((size) => {
                      const isSelected = sofaConfig.size === size.id;
                      return (
                        <div
                          key={size.id}
                          onClick={() => handleSizeChange(size.id as ModuleSize)}
                          className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                            isSelected
                              ? 'border-[#C2A370] bg-[#FAF8F3] shadow-sm'
                              : 'border-[#E8E2D5] hover:border-[#D5CDBD] bg-white'
                          }`}
                        >
                          <div className="space-y-0.5">
                            <span className="text-xs font-bold text-[#1C1B1A] block">
                              {size.name}
                            </span>
                            <span className="text-[11px] font-mono text-[#8C6F35]">
                              {size.dimensions}
                            </span>
                            <span className="text-[10px] text-[#736B5E] block">
                              {size.idealFor}
                            </span>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="text-xs font-bold text-[#1C1B1A] block">
                              {size.basePrice.toLocaleString('es-ES')} €
                            </span>
                            {isSelected && (
                              <span className="text-[10px] text-[#C2A370] font-medium flex items-center gap-1 justify-end">
                                <Check className="w-3 h-3" /> Seleccionado
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 4: BASE Y ACABADOS */}
              {activeStepTab === 'base' && (
                <div className="space-y-5">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#736B5E] block mb-2.5">
                      Acabado de Base o Zócalo
                    </span>
                    <div className="space-y-2">
                      {BASE_FINISH_OPTIONS.map((base) => {
                        const isSelected = sofaConfig.baseFinish === base.id;
                        return (
                          <div
                            key={base.id}
                            onClick={() => handleBaseChange(base.id as BaseFinish)}
                            className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                              isSelected
                                ? 'border-[#C2A370] bg-[#FAF8F3] shadow-sm'
                                : 'border-[#E8E2D5] hover:border-[#D5CDBD] bg-white'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <span
                                className="w-5 h-5 rounded-full border border-black/20 shrink-0"
                                style={{ backgroundColor: base.colorHex }}
                              />
                              <div>
                                <span className="text-xs font-bold text-[#1C1B1A] block">
                                  {base.name}
                                </span>
                                <span className="text-[10px] text-[#736B5E]">
                                  {base.description}
                                </span>
                              </div>
                            </div>
                            <div className="text-right shrink-0">
                              <span className="text-[11px] text-[#8C8476]">
                                {base.extraPrice === 0 ? 'Incluido' : `+${base.extraPrice} €`}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Cushion Density Options */}
                  <div className="pt-3 border-t border-[#EAE3D5]">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#736B5E] block mb-2">
                      Relleno de Cojines
                    </span>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <button
                        onClick={() => setSofaConfig((prev) => ({ ...prev, cushionDensity: 'confort_pluma' }))}
                        className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all ${
                          sofaConfig.cushionDensity === 'confort_pluma'
                            ? 'border-[#C2A370] bg-[#FAF8F3] font-semibold text-[#1C1B1A]'
                            : 'border-[#E8E2D5] text-[#6B6357]'
                        }`}
                      >
                        <div>Confort Pluma Natural</div>
                        <span className="text-[10px] text-[#8C6F35] block font-normal">+190 € • Tacto nube</span>
                      </button>
                      <button
                        onClick={() => setSofaConfig((prev) => ({ ...prev, cushionDensity: 'firmeza_arquitectonica' }))}
                        className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all ${
                          sofaConfig.cushionDensity === 'firmeza_arquitectonica'
                            ? 'border-[#C2A370] bg-[#FAF8F3] font-semibold text-[#1C1B1A]'
                            : 'border-[#E8E2D5] text-[#6B6357]'
                        }`}
                      >
                        <div>Firmeza Arquitectónica</div>
                        <span className="text-[10px] text-[#8C8476] block font-normal">Estándar • Espuma HR</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Bottom Actions & Price Breakdown */}
            <div className="pt-6 border-t border-[#E8E2D5] space-y-4 mt-6">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-[11px] text-[#857C70] uppercase tracking-wider block">
                    Estimación Presupuestaria
                  </span>
                  <div className="font-serif text-3xl font-semibold text-[#1C1B1A]">
                    {calculatedPrice.toLocaleString('es-ES')} €
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#EAE4D7] text-[#6B6152] font-medium block">
                    Sin IVA • Tarifa Estudio
                  </span>
                  <span className="text-[10px] text-[#8C8476] mt-0.5 block">
                    Fabricación 4 a 6 semanas
                  </span>
                </div>
              </div>

              {/* Add to Quote CTA */}
              <button
                onClick={handleAddToCart}
                className="w-full py-4 rounded-xl bg-[#1C1B1A] hover:bg-[#2C2926] text-white text-xs sm:text-sm font-semibold uppercase tracking-[0.16em] flex items-center justify-center gap-2.5 transition-all shadow-md hover:shadow-lg cursor-pointer group"
              >
                <ShoppingBag className="w-4 h-4 text-[#C2A370] group-hover:scale-110 transition-transform" />
                <span>Añadir a Mi Solicitud de Cotización</span>
              </button>

              <p className="text-[10px] text-center text-[#8C8476]">
                * Esta cotización no requiere pago. Se genera un dossier técnico para su validación por nuestro equipo de proyectos.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
