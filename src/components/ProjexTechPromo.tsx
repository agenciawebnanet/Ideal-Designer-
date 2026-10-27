import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  ArrowRight, 
  X, 
  CheckCircle2, 
  MessageSquare, 
  ShieldCheck, 
  Code2, 
  Layers, 
  Zap, 
  ExternalLink,
  Send
} from 'lucide-react';

export const ProjexTechPromo: React.FC = () => {
  const { isProjexModalOpen, setIsProjexModalOpen, showToast } = useApp();
  const [leadSent, setLeadSent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    whatsapp: '',
    email: '',
  });

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLeadSent(true);
    showToast('¡Mensaje enviado a Projex Tech! Nuestro equipo comercial se comunicará a la brevedad.');
  };

  const handleWhatsAppClick = () => {
    const text = encodeURIComponent(
      'Hola Projex Tech, vi la demostración "Ideal Design Concept" para el sector de muebles y decoración y me interesa implementar una plataforma similar para mi marca.'
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <>
      {/* Floating Bottom Badge */}
      <div className="fixed bottom-5 right-5 z-40 hidden sm:flex items-center gap-3 p-2 pl-4 rounded-full bg-[#1C1B1A]/95 text-white shadow-2xl border border-[#C2A370]/40 backdrop-blur-md">
        <div className="flex items-center gap-2 text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[#D8CEBC]">
            Desarrollado por <strong className="text-white font-semibold">Projex Tech</strong>
          </span>
        </div>

        <button
          onClick={() => setIsProjexModalOpen(true)}
          className="px-3.5 py-1.5 rounded-full bg-[#C2A370] hover:bg-[#D4B582] text-[#1C1B1A] text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
        >
          <span>Contratar Solución</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Dedicated Showcase & Hire Modal */}
      <AnimatePresence>
        {isProjexModalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#E5DFD3]"
            >
              {/* Header */}
              <div className="p-6 sm:p-7 bg-[#1C1B1A] text-white flex items-center justify-between relative overflow-hidden">
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#C2A370]/20 text-[#E0C895] text-[10px] font-bold uppercase tracking-widest border border-[#C2A370]/30 mb-2">
                    <Sparkles className="w-3 h-3 text-[#C2A370]" /> Projex Tech • Soluciones Digitales de Alta Gama
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-light text-white">
                    Transforma la presencia digital de tu marca de muebles
                  </h3>
                </div>

                <button
                  onClick={() => setIsProjexModalOpen(false)}
                  className="relative z-10 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Subtle gold gradient backdrop */}
                <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-[#C2A370]/20 rounded-full blur-3xl pointer-events-none" />
              </div>

              {/* Body */}
              <div className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
                
                {/* Conceptual Disclaimer */}
                <div className="p-3.5 rounded-xl bg-[#FAF6EE] border border-[#EADFC9] flex items-start gap-3 text-xs text-[#524B40]">
                  <ShieldCheck className="w-4 h-4 text-[#C2A370] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#1C1B1A] block">Demostración Tecnológica Conceptual</strong>
                    Esta aplicación es una maqueta de alto rendimiento creada por <strong>Projex Tech</strong> para exhibir configuradores 3D interactivos, lookbooks con hotspots y embudos de cotización B2B. No representa al sitio oficial de Ideal Muebles y Design.
                  </div>
                </div>

                {/* Key Capabilities */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#1C1B1A] mb-3">
                    Módulos y Capacidades Incluidas en la Solución
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl border border-[#EAE3D5] bg-[#FAF8F5]">
                      <div className="flex items-center gap-2 font-semibold text-[#1C1B1A] mb-1">
                        <Zap className="w-4 h-4 text-[#C2A370]" />
                        Configurador en Tiempo Real
                      </div>
                      <p className="text-[#6B6357]">
                        Mapeo dinámico de telas, colores, bases macizas y cotas milimétricas con visualización en planta y perspectiva.
                      </p>
                    </div>

                    <div className="p-3 rounded-xl border border-[#EAE3D5] bg-[#FAF8F5]">
                      <div className="flex items-center gap-2 font-semibold text-[#1C1B1A] mb-1">
                        <Layers className="w-4 h-4 text-[#C2A370]" />
                        Lookbook con Hotspots
                      </div>
                      <p className="text-[#6B6357]">
                        Etiquetado interactivo de piezas en ambientes reales con apertura de fichas y adición con un clic.
                      </p>
                    </div>

                    <div className="p-3 rounded-xl border border-[#EAE3D5] bg-[#FAF8F5]">
                      <div className="flex items-center gap-2 font-semibold text-[#1C1B1A] mb-1">
                        <Code2 className="w-4 h-4 text-[#C2A370]" />
                        Cotización B2B & Muestrario
                      </div>
                      <p className="text-[#6B6357]">
                        Flujo sin fricción para estudios de arquitectura y prescriptores, con despacho de muestras físicas.
                      </p>
                    </div>

                    <div className="p-3 rounded-xl border border-[#EAE3D5] bg-[#FAF8F5]">
                      <div className="flex items-center gap-2 font-semibold text-[#1C1B1A] mb-1">
                        <CheckCircle2 className="w-4 h-4 text-[#C2A370]" />
                        CRM Integrado de Proyectos
                      </div>
                      <p className="text-[#6B6357]">
                        Panel de control con estados de fabricación, seguimiento de clientes y exportación a PDF.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Contact & Hire Form */}
                <div className="pt-4 border-t border-[#EAE3D5]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#1C1B1A] mb-3">
                    Solicita una propuesta personalizada para tu marca
                  </h4>

                  {leadSent ? (
                    <div className="p-5 rounded-2xl bg-[#F0F8F1] border border-[#CDE5D2] text-center space-y-2">
                      <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                      <p className="text-xs font-semibold text-emerald-900">
                        ¡Gracias por tu interés en Projex Tech!
                      </p>
                      <p className="text-xs text-emerald-700 max-w-sm mx-auto">
                        Hemos recibido tus datos y te contactaremos para coordinar una demo técnica adaptada a tu catálogo.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleLeadSubmit} className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          required
                          type="text"
                          placeholder="Tu nombre completo"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="px-3.5 py-2.5 rounded-xl border border-[#DDD5C5] text-xs text-[#1C1B1A] focus:outline-none focus:border-[#C2A370]"
                        />
                        <input
                          required
                          type="text"
                          placeholder="Empresa o Marca de Mobiliario"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="px-3.5 py-2.5 rounded-xl border border-[#DDD5C5] text-xs text-[#1C1B1A] focus:outline-none focus:border-[#C2A370]"
                        />
                        <input
                          required
                          type="email"
                          placeholder="Correo electrónico"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="px-3.5 py-2.5 rounded-xl border border-[#DDD5C5] text-xs text-[#1C1B1A] focus:outline-none focus:border-[#C2A370]"
                        />
                        <input
                          required
                          type="tel"
                          placeholder="WhatsApp o Teléfono (+34 / +55 / etc)"
                          value={formData.whatsapp}
                          onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                          className="px-3.5 py-2.5 rounded-xl border border-[#DDD5C5] text-xs text-[#1C1B1A] focus:outline-none focus:border-[#C2A370]"
                        />
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 pt-2">
                        <button
                          type="submit"
                          className="flex-1 py-3.5 rounded-xl bg-[#1C1B1A] hover:bg-[#2F2C29] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                        >
                          <Send className="w-3.5 h-3.5 text-[#C2A370]" />
                          <span>Solicitar Presupuesto de Implementación</span>
                        </button>

                        <button
                          type="button"
                          onClick={handleWhatsAppClick}
                          className="px-5 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>WhatsApp Directo</span>
                        </button>
                      </div>
                    </form>
                  )}
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
