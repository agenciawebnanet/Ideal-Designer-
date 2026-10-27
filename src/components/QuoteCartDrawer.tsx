import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ShoppingBag, 
  FileCheck, 
  ShieldCheck,
  Sparkles
} from 'lucide-react';

export const QuoteCartDrawer: React.FC = () => {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    removeFromCart, 
    updateQuantity, 
    clearCart,
    setIsQuoteModalOpen 
  } = useApp();

  if (!isCartOpen) return null;

  const totalEstimate = cart.reduce((acc, item) => acc + item.priceEstimate * item.quantity, 0);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsQuoteModalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="w-screen max-w-md bg-[#FAF8F5] border-l border-[#E2DBD0] shadow-2xl flex flex-col justify-between"
        >
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-[#E8E2D5] bg-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#1C1B1A] flex items-center justify-center text-[#E0C895]">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-semibold text-[#1C1B1A]">
                  Dossier de Cotización
                </h3>
                <span className="text-[11px] text-[#8C8476]">
                  {totalItems} {totalItems === 1 ? 'pieza seleccionada' : 'piezas seleccionadas'}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-full hover:bg-black/5 text-[#554F45] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
            {cart.length > 0 ? (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl border border-[#E5DFD3] p-3.5 flex gap-3 shadow-xs"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 rounded-lg object-cover shrink-0 bg-[#ECE8DF]"
                  />

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="text-xs font-bold text-[#1C1B1A] line-clamp-1">
                          {item.title}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#998F81] hover:text-red-600 transition-colors cursor-pointer p-0.5"
                          title="Eliminar de la cotización"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <p className="text-[10px] text-[#736B5E] mt-0.5 line-clamp-2">
                        {item.specSummary}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#F2EDE4]">
                      {/* Quantity buttons */}
                      <div className="flex items-center border border-[#DDD6C8] rounded-md bg-[#F9F7F2]">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-6 h-6 flex items-center justify-center hover:bg-white text-xs cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-[11px] font-bold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-6 h-6 flex items-center justify-center hover:bg-white text-xs cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Line total */}
                      <span className="text-xs font-bold text-[#1C1B1A]">
                        {(item.priceEstimate * item.quantity).toLocaleString('es-ES')} €
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-16 space-y-3">
                <ShoppingBag className="w-10 h-10 text-[#C2A370] mx-auto opacity-50" />
                <p className="text-sm text-[#736B5E] font-medium">
                  Tu solicitud de cotización está vacía.
                </p>
                <p className="text-xs text-[#9E9689] max-w-xs mx-auto">
                  Explora nuestro catálogo o personaliza un sofá en el configurador 3D para comenzar.
                </p>
              </div>
            )}
          </div>

          {/* Footer & Actions */}
          {cart.length > 0 && (
            <div className="p-5 sm:p-6 bg-white border-t border-[#E8E2D5] space-y-4">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-[#736B5E]">
                  <span>Subtotal estimado</span>
                  <span>{totalEstimate.toLocaleString('es-ES')} €</span>
                </div>
                <div className="flex items-center justify-between text-xs text-[#736B5E]">
                  <span>Muestrario de tejidos físicos</span>
                  <span className="text-emerald-700 font-medium">Bonificado (0 €)</span>
                </div>
                <div className="flex items-baseline justify-between pt-2 border-t border-[#F0EBE0]">
                  <span className="text-xs uppercase font-semibold text-[#1C1B1A]">
                    Total Estimado (s/ IVA)
                  </span>
                  <span className="font-serif text-2xl font-bold text-[#1C1B1A]">
                    {totalEstimate.toLocaleString('es-ES')} €
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={handleProceedToCheckout}
                  className="w-full py-3.5 rounded-xl bg-[#1C1B1A] hover:bg-[#2C2926] text-white text-xs sm:text-sm font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                >
                  <FileCheck className="w-4 h-4 text-[#C2A370]" />
                  <span>Formalizar Solicitud de Cotización</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={clearCart}
                  className="w-full py-2 text-center text-[11px] text-[#8C8476] hover:text-[#1C1B1A] transition-colors cursor-pointer"
                >
                  Vaciar cotización
                </button>
              </div>

              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#FAF7F0] border border-[#E8E0D0] text-[11px] text-[#6B6152]">
                <ShieldCheck className="w-4 h-4 text-[#C2A370] shrink-0" />
                <span>
                  Sin pasarela ni pago real. Genera un presupuesto demostrativo listo para producción.
                </span>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};
