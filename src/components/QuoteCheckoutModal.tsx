import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import { QuoteRequest } from '../types';
import { 
  X, 
  CheckCircle2, 
  FileText, 
  Printer, 
  LayoutDashboard, 
  ArrowRight, 
  ShieldCheck, 
  Send,
  Building,
  User,
  Mail,
  Phone,
  MapPin,
  Sparkles
} from 'lucide-react';

export const QuoteCheckoutModal: React.FC = () => {
  const { 
    isQuoteModalOpen, 
    setIsQuoteModalOpen, 
    cart, 
    clearCart, 
    addQuote, 
    setCurrentView 
  } = useApp();

  const [formData, setFormData] = useState({
    clientName: 'Arq. Sofía Mendieta',
    companyName: 'Mendieta Arquitectura & Interiorismo',
    email: 'sofia@mendieta-arq.com',
    phone: '+34 654 321 987',
    city: 'Madrid / Pozuelo',
    projectType: 'Residencial Privado' as QuoteRequest['projectType'],
    projectNotes: 'Solicitamos confirmación de plazos para obra de entrega en el primer trimestre. Adjuntaremos plano de planta en la respuesta al correo.',
    needsFabricSamples: true,
  });

  const [submittedQuote, setSubmittedQuote] = useState<QuoteRequest | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isQuoteModalOpen) return null;

  const totalEstimate = cart.reduce((acc, item) => acc + item.priceEstimate * item.quantity, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const generatedId = `COT-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const newQuote: QuoteRequest = {
        id: generatedId,
        date: new Date().toISOString().split('T')[0],
        clientName: formData.clientName,
        companyName: formData.companyName,
        email: formData.email,
        phone: formData.phone,
        city: formData.city,
        projectType: formData.projectType,
        projectNotes: formData.projectNotes,
        needsFabricSamples: formData.needsFabricSamples,
        items: [...cart],
        totalEstimate,
        status: 'en_revision',
      };

      addQuote(newQuote);
      setSubmittedQuote(newQuote);
      clearCart();
      setIsSubmitting(false);

      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#C2A370', '#E0C895', '#DED6C6', '#1C1B1A'],
        });
      } catch {}
    }, 700);
  };

  const handleClose = () => {
    setIsQuoteModalOpen(false);
    setSubmittedQuote(null);
  };

  const handleGoToCRM = () => {
    handleClose();
    setCurrentView('admin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        className="relative bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#E5DFD3]"
      >
        {/* Header */}
        <div className="p-6 bg-[#FAF8F5] border-b border-[#EAE3D5] flex items-center justify-between">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8C6F35] block">
              Dossier Comercial B2B
            </span>
            <h3 className="font-serif text-2xl font-semibold text-[#1C1B1A]">
              {submittedQuote ? 'Solicitud Registrada con Éxito' : 'Tramitar Solicitud de Cotización'}
            </h3>
          </div>

          <button
            onClick={handleClose}
            className="w-9 h-9 rounded-full bg-black/5 hover:bg-black/10 text-[#4A443B] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
          {submittedQuote ? (
            /* Confirmation Screen */
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 rounded-full bg-[#C2A370]/15 text-[#8C6F35] flex items-center justify-center mx-auto border border-[#C2A370]/40">
                <CheckCircle2 className="w-10 h-10 text-[#C2A370]" />
              </div>

              <div>
                <span className="text-xs uppercase tracking-widest text-[#8C8476] font-mono block mb-1">
                  CÓDIGO DE REFERENCIA OFICIAL
                </span>
                <span className="font-mono text-2xl font-bold text-[#1C1B1A] bg-[#FAF8F3] px-4 py-1.5 rounded-lg border border-[#E8E2D5] inline-block">
                  {submittedQuote.id}
                </span>
              </div>

              <div className="max-w-md mx-auto text-xs text-[#6B6357] space-y-2 leading-relaxed">
                <p>
                  Estimado/a <strong>{submittedQuote.clientName}</strong> ({submittedQuote.companyName}), hemos recibido la solicitud técnica para su proyecto en <strong>{submittedQuote.city}</strong>.
                </p>
                <p>
                  Esta solicitud ha sido incorporada en tiempo real a nuestro <strong>Panel de Gestión (CRM)</strong> con estado <em>En revisión técnica</em>.
                </p>
                {submittedQuote.needsFabricSamples && (
                  <p className="text-[#8C6F35] font-medium bg-[#FAF6EC] p-2 rounded-lg border border-[#EADFC9]">
                    ✓ Se ha programado el envío del muestrario físico de tejidos a su estudio.
                  </p>
                )}
              </div>

              {/* Order breakdown summary */}
              <div className="bg-[#FAF8F5] rounded-xl p-4 border border-[#EAE3D5] text-left text-xs space-y-2">
                <div className="font-semibold text-[#1C1B1A] pb-2 border-b border-[#EAE3D5] flex justify-between">
                  <span>Resumen de piezas solicitadas</span>
                  <span className="font-mono font-bold">{submittedQuote.totalEstimate.toLocaleString('es-ES')} €</span>
                </div>
                {submittedQuote.items.map((item, i) => (
                  <div key={i} className="flex justify-between text-[#5D5548]">
                    <span>{item.quantity}× {item.title}</span>
                    <span className="font-mono">{(item.priceEstimate * item.quantity).toLocaleString('es-ES')} €</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  onClick={handleGoToCRM}
                  className="flex-1 py-3.5 rounded-xl bg-[#1C1B1A] hover:bg-[#2C2926] text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                >
                  <LayoutDashboard className="w-4 h-4 text-[#C2A370]" />
                  <span>Inspeccionar en Panel de Gestión</span>
                </button>

                <button
                  onClick={handleClose}
                  className="px-6 py-3.5 rounded-xl bg-[#FAF8F5] hover:bg-[#F2EDE2] border border-[#DDD5C5] text-[#1C1B1A] text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Continuar Explorando
                </button>
              </div>
            </div>
          ) : (
            /* Submission Form */
            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div className="p-3.5 rounded-xl bg-[#FAF8F3] border border-[#E8E2D5] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-[#5D5548]">
                  <FileText className="w-4 h-4 text-[#C2A370]" />
                  <span>{cart.length} piezas listas para presupuesto formal</span>
                </div>
                <div className="font-serif font-bold text-base text-[#1C1B1A]">
                  Total: {totalEstimate.toLocaleString('es-ES')} €
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#4A443B] mb-1">
                    Nombre del Arquitecto o Responsable *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#8C8476] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      required
                      type="text"
                      value={formData.clientName}
                      onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#DDD6C8] text-xs text-[#1C1B1A] focus:outline-none focus:border-[#C2A370]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#4A443B] mb-1">
                    Estudio de Arquitectura / Interiorismo *
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-[#8C8476] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      required
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#DDD6C8] text-xs text-[#1C1B1A] focus:outline-none focus:border-[#C2A370]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#4A443B] mb-1">
                    Correo Corporativo *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#8C8476] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#DDD6C8] text-xs text-[#1C1B1A] focus:outline-none focus:border-[#C2A370]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#4A443B] mb-1">
                    Teléfono Directo *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#8C8476] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      required
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#DDD6C8] text-xs text-[#1C1B1A] focus:outline-none focus:border-[#C2A370]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#4A443B] mb-1">
                    Ciudad de la Obra o Proyecto *
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-[#8C8476] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      required
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#DDD6C8] text-xs text-[#1C1B1A] focus:outline-none focus:border-[#C2A370]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#4A443B] mb-1">
                    Tipología de Proyecto *
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-[#DDD6C8] text-xs text-[#1C1B1A] focus:outline-none focus:border-[#C2A370] bg-white"
                  >
                    <option value="Residencial Privado">Residencial Privado de Lujo</option>
                    <option value="Hotelería Boutique">Hotelería Boutique / Restauración</option>
                    <option value="Comercial / Corporativo">Comercial / Sede Corporativa</option>
                    <option value="Inmobiliario">Promoción Inmobiliaria Premium</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#4A443B] mb-1">
                  Notas Técnicas o Plazos Especiales
                </label>
                <textarea
                  rows={3}
                  value={formData.projectNotes}
                  onChange={(e) => setFormData({ ...formData, projectNotes: e.target.value })}
                  placeholder="Detalles sobre accesos, acabados especiales o plano en CAD..."
                  className="w-full p-3 rounded-xl border border-[#DDD6C8] text-xs text-[#1C1B1A] focus:outline-none focus:border-[#C2A370]"
                />
              </div>

              {/* Fabric Sample Box Checkbox */}
              <div className="p-3.5 rounded-xl bg-[#FAF6EE] border border-[#EADFC9] flex items-start gap-3">
                <input
                  type="checkbox"
                  id="fabricSamples"
                  checked={formData.needsFabricSamples}
                  onChange={(e) => setFormData({ ...formData, needsFabricSamples: e.target.checked })}
                  className="mt-0.5 rounded text-[#C2A370] focus:ring-[#C2A370] cursor-pointer"
                />
                <label htmlFor="fabricSamples" className="text-xs text-[#524B40] cursor-pointer">
                  <strong className="text-[#1C1B1A] block">
                    Solicitar envío de muestrario físico de tejidos al estudio
                  </strong>
                  Incluye muestras táctiles de Bouclé, Lino Belga y Cuero Anilina sin coste para el estudio.
                </label>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting || cart.length === 0}
                  className="w-full py-4 rounded-xl bg-[#1C1B1A] hover:bg-[#2C2926] disabled:opacity-50 text-white text-xs sm:text-sm font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                >
                  <Send className="w-4 h-4 text-[#C2A370]" />
                  <span>{isSubmitting ? 'Generando Expediente...' : 'Emitir Solicitud Formal de Cotización'}</span>
                </button>

                <p className="text-[10px] text-center text-[#8C8476] mt-2.5">
                  Prototipo comercial: Se registrará en la base de datos ficticia de proyectos inmediatamente.
                </p>
              </div>

            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};
