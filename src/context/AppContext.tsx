import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, QuoteItem, QuoteRequest, SofaConfiguration } from '../types';
import { CATALOG_PRODUCTS, INITIAL_QUOTES, INITIAL_SOFA_CONFIG } from '../data/mockData';

interface AppContextType {
  cart: QuoteItem[];
  addToCart: (item: QuoteItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  // Selected Product Modal
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;

  // Quotes (CRM)
  quotes: QuoteRequest[];
  addQuote: (quote: QuoteRequest) => void;
  updateQuoteStatus: (id: string, status: QuoteRequest['status']) => void;

  // View state
  currentView: 'store' | 'admin';
  setCurrentView: (view: 'store' | 'admin') => void;

  // Sofa Configurator active state
  sofaConfig: SofaConfiguration;
  setSofaConfig: React.Dispatch<React.SetStateAction<SofaConfiguration>>;

  // Projex Tech Modal
  isProjexModalOpen: boolean;
  setIsProjexModalOpen: (open: boolean) => void;

  // Quote Checkout Modal
  isQuoteModalOpen: boolean;
  setIsQuoteModalOpen: (open: boolean) => void;

  // Notification toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial cart or default
  const [cart, setCart] = useState<QuoteItem[]>(() => {
    return [
      {
        id: 'initial-sample-sofa',
        type: 'custom_sofa',
        title: 'Sofá Escultórico Curva (Configuración Personalizada)',
        collection: 'Ideal Bespoke Atelier',
        specSummary: '3 Plazas Confort | Bouclé Suave Italiano (Arena Cálido) | Base Nogal Macizo',
        priceEstimate: 3890,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400&q=80',
        configDetails: INITIAL_SOFA_CONFIG,
      },
    ];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quotes, setQuotes] = useState<QuoteRequest[]>(INITIAL_QUOTES);
  const [currentView, setCurrentView] = useState<'store' | 'admin'>('store');
  const [sofaConfig, setSofaConfig] = useState<SofaConfiguration>(INITIAL_SOFA_CONFIG);
  const [isProjexModalOpen, setIsProjexModalOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const addToCart = (newItem: QuoteItem) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === newItem.id);
      if (existing) {
        return prev.map((item) =>
          item.id === newItem.id ? { ...item, quantity: item.quantity + newItem.quantity } : item
        );
      }
      return [...prev, newItem];
    });
    showToast(`"${newItem.title}" añadida a la solicitud de cotización.`);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    showToast('Elemento retirado de la cotización.');
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as QuoteItem[]
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const addQuote = (quote: QuoteRequest) => {
    setQuotes((prev) => [quote, ...prev]);
  };

  const updateQuoteStatus = (id: string, status: QuoteRequest['status']) => {
    setQuotes((prev) =>
      prev.map((q) => (q.id === id ? { ...q, status } : q))
    );
    showToast(`Estado de ${id} actualizado.`);
  };

  return (
    <AppContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        selectedProduct,
        setSelectedProduct,
        quotes,
        addQuote,
        updateQuoteStatus,
        currentView,
        setCurrentView,
        sofaConfig,
        setSofaConfig,
        isProjexModalOpen,
        setIsProjexModalOpen,
        isQuoteModalOpen,
        setIsQuoteModalOpen,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
