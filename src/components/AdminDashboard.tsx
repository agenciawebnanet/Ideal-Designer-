import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { QuoteRequest, QuoteStatus } from '../types';
import { 
  LayoutDashboard, 
  ArrowLeft, 
  Search, 
  Filter, 
  Clock, 
  CheckCircle, 
  Hammer, 
  Truck, 
  TrendingUp, 
  Building2, 
  DollarSign, 
  FileText, 
  Eye, 
  X,
  Printer,
  Mail,
  Phone,
  Sparkles,
  Download
} from 'lucide-react';

const STATUS_CONFIG: Record<
  QuoteStatus,
  { label: string; badgeClass: string; icon: React.ReactNode }
> = {
  en_revision: {
    label: 'En Revisión Técnica',
    badgeClass: 'bg-amber-100 text-amber-800 border-amber-200',
    icon: <Clock className="w-3 h-3" />,
  },
  presupuestado: {
    label: 'Presupuesto Enviado',
    badgeClass: 'bg-blue-100 text-blue-800 border-blue-200',
    icon: <CheckCircle className="w-3 h-3" />,
  },
  en_produccion: {
    label: 'En Fabricación Artesanal',
    badgeClass: 'bg-purple-100 text-purple-800 border-purple-200',
    icon: <Hammer className="w-3 h-3" />,
  },
  entregado: {
    label: 'Entregado & Instalado',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    icon: <Truck className="w-3 h-3" />,
  },
};

export const AdminDashboard: React.FC = () => {
  const { quotes, updateQuoteStatus, setCurrentView, showToast } = useApp();
  const [statusFilter, setStatusFilter] = useState<'all' | QuoteStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [inspectedQuote, setInspectedQuote] = useState<QuoteRequest | null>(null);

  // Metrics
  const totalVolume = quotes.reduce((acc, q) => acc + q.totalEstimate, 0);
  const activeCount = quotes.filter((q) => q.status !== 'entregado').length;
  const inProductionCount = quotes.filter((q) => q.status === 'en_produccion').length;

  const filteredQuotes = quotes.filter((q) => {
    const matchesStatus = statusFilter === 'all' || q.status === statusFilter;
    const matchesSearch =
      searchQuery === '' ||
      q.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.city.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleExportPDF = () => {
    showToast('Generando dossier técnico PDF con membrete Ideal Design Concept...');
    setTimeout(() => {
      window.print();
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#F5F2EB] py-8 sm:py-12 text-[#1C1B1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E2DBD0]">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#8C6F35] font-semibold mb-1">
              <LayoutDashboard className="w-4 h-4 text-[#C2A370]" />
              <span>Backoffice de Operaciones & Presupuestos B2B</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1C1B1A]">
              Panel de Gestión de Proyectos
            </h1>
            <p className="text-xs text-[#736B5E] mt-0.5">
              Control en tiempo real de cotizaciones, especificaciones arquitectónicas y pedidos en taller.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentView('store')}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-[#F2ECE0] text-[#1C1B1A] border border-[#DDD5C5] text-xs font-semibold uppercase tracking-wider flex items-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver al Catálogo y Tienda</span>
            </button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white p-5 rounded-2xl border border-[#E5DFD3] shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#8C8476] font-medium block">
                Volumen Total Cotizado
              </span>
              <div className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1B1A] mt-1">
                {totalVolume.toLocaleString('es-ES')} €
              </div>
              <span className="text-[10px] text-emerald-700 font-semibold mt-1 inline-flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +18.4% este mes
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#FAF6EE] text-[#C2A370] flex items-center justify-center">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E5DFD3] shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#8C8476] font-medium block">
                Expedientes Activos
              </span>
              <div className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1B1A] mt-1">
                {activeCount}
              </div>
              <span className="text-[10px] text-[#736B5E] mt-1 block">
                {quotes.length} solicitudes históricas
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#FAF6EE] text-[#C2A370] flex items-center justify-center">
              <Building2 className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E5DFD3] shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#8C8476] font-medium block">
                En Fabricación Artesanal
              </span>
              <div className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1B1A] mt-1">
                {inProductionCount}
              </div>
              <span className="text-[10px] text-purple-700 font-medium mt-1 block">
                Talleres de España e Italia
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#FAF6EE] text-[#C2A370] flex items-center justify-center">
              <Hammer className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E5DFD3] shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#8C8476] font-medium block">
                Plazo Medio de Entrega
              </span>
              <div className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1B1A] mt-1">
                4.8 Sem.
              </div>
              <span className="text-[10px] text-[#736B5E] mt-1 block">
                Montaje de guante blanco
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#FAF6EE] text-[#C2A370] flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Quotes Control Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E5DFD3] shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Status Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none text-xs">
              <button
                onClick={() => setStatusFilter('all')}
                className={`px-3 py-1.5 rounded-lg font-medium cursor-pointer transition-colors ${
                  statusFilter === 'all'
                    ? 'bg-[#1C1B1A] text-white'
                    : 'bg-[#F2ECE0] text-[#554F45] hover:bg-[#E8E2D5]'
                }`}
              >
                Todas ({quotes.length})
              </button>
              {(Object.keys(STATUS_CONFIG) as QuoteStatus[]).map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-lg font-medium cursor-pointer transition-colors flex items-center gap-1.5 ${
                    statusFilter === st
                      ? 'bg-[#1C1B1A] text-white'
                      : 'bg-[#F2ECE0] text-[#554F45] hover:bg-[#E8E2D5]'
                  }`}
                >
                  {STATUS_CONFIG[st].icon}
                  <span>{STATUS_CONFIG[st].label}</span>
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-[#8C8476] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar por cliente, estudio o ref..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-[#DDD5C5] text-xs text-[#1C1B1A] focus:outline-none focus:border-[#C2A370]"
              />
            </div>

          </div>

          {/* Quotes Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF8F5] text-[#736B5E] border-b border-[#EAE3D5] uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4">Referencia</th>
                  <th className="py-3 px-4">Estudio / Cliente</th>
                  <th className="py-3 px-4">Tipología</th>
                  <th className="py-3 px-4">Piezas</th>
                  <th className="py-3 px-4">Importe Estimado</th>
                  <th className="py-3 px-4">Estado</th>
                  <th className="py-3 px-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F2ECE0]">
                {filteredQuotes.map((q) => {
                  const statusInfo = STATUS_CONFIG[q.status];
                  return (
                    <tr key={q.id} className="hover:bg-[#FAF8F3] transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-[#1C1B1A]">
                        {q.id}
                        <span className="block text-[10px] text-[#8C8476] font-sans font-normal">
                          {q.date}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-[#1C1B1A]">{q.companyName}</div>
                        <div className="text-[11px] text-[#736B5E]">{q.clientName} &bull; {q.city}</div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded-md bg-[#F2EDE4] text-[#554F45] text-[10px]">
                          {q.projectType}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="font-medium">{q.items.length} piezas</span>
                        <span className="block text-[10px] text-[#8C8476] truncate max-w-xs">
                          {q.items[0]?.title}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 font-mono font-bold text-sm text-[#1C1B1A]">
                        {q.totalEstimate.toLocaleString('es-ES')} €
                      </td>

                      <td className="py-3.5 px-4">
                        {/* Interactive status selector */}
                        <select
                          value={q.status}
                          onChange={(e) => updateQuoteStatus(q.id, e.target.value as QuoteStatus)}
                          className={`text-[11px] font-medium px-2 py-1 rounded-lg border cursor-pointer focus:outline-none ${statusInfo.badgeClass}`}
                        >
                          <option value="en_revision">En Revisión</option>
                          <option value="presupuestado">Presupuestado</option>
                          <option value="en_produccion">En Producción</option>
                          <option value="entregado">Entregado</option>
                        </select>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => setInspectedQuote(q)}
                          className="px-2.5 py-1.5 rounded-lg bg-[#FAF6EE] hover:bg-[#F2ECE0] text-[#8C6F35] font-semibold border border-[#E5DFD3] inline-flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Ver Dossier</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {filteredQuotes.length === 0 && (
              <div className="text-center py-12 text-xs text-[#736B5E]">
                No se encontraron cotizaciones con los criterios actuales.
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Quote Inspection Drawer / Modal */}
      {inspectedQuote && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#E5DFD3] shadow-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-[#EAE3D5] pb-4">
              <div>
                <span className="font-mono text-xs text-[#8C6F35] font-bold">
                  {inspectedQuote.id}
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#1C1B1A]">
                  Expediente Técnico de Cotización
                </h3>
              </div>
              <button
                onClick={() => setInspectedQuote(null)}
                className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center text-[#554F45] hover:bg-black/10 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Client Info Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-[#FAF8F5] p-4 rounded-xl border border-[#EAE3D5] text-xs">
              <div>
                <span className="text-[#8C8476] text-[10px] uppercase block">Estudio</span>
                <span className="font-bold text-[#1C1B1A]">{inspectedQuote.companyName}</span>
              </div>
              <div>
                <span className="text-[#8C8476] text-[10px] uppercase block">Contacto</span>
                <span className="font-medium text-[#1C1B1A]">{inspectedQuote.clientName}</span>
              </div>
              <div>
                <span className="text-[#8C8476] text-[10px] uppercase block">Ubicación</span>
                <span className="font-medium text-[#1C1B1A]">{inspectedQuote.city}</span>
              </div>
              <div>
                <span className="text-[#8C8476] text-[10px] uppercase block">Email</span>
                <span className="text-[#1C1B1A]">{inspectedQuote.email}</span>
              </div>
              <div>
                <span className="text-[#8C8476] text-[10px] uppercase block">Teléfono</span>
                <span className="text-[#1C1B1A]">{inspectedQuote.phone}</span>
              </div>
              <div>
                <span className="text-[#8C8476] text-[10px] uppercase block">Muestras de Tela</span>
                <span className={`font-semibold ${inspectedQuote.needsFabricSamples ? 'text-emerald-700' : 'text-zinc-500'}`}>
                  {inspectedQuote.needsFabricSamples ? 'Solicitadas' : 'No requeridas'}
                </span>
              </div>
            </div>

            {/* Architect notes */}
            {inspectedQuote.projectNotes && (
              <div>
                <span className="text-[10px] uppercase font-semibold text-[#8C8476] block mb-1">
                  Notas Técnicas del Proyecto
                </span>
                <p className="text-xs bg-[#FAF8F5] p-3 rounded-lg border border-[#EAE3D5] text-[#554F45]">
                  {inspectedQuote.projectNotes}
                </p>
              </div>
            )}

            {/* Itemized pieces list */}
            <div>
              <span className="text-[10px] uppercase font-semibold text-[#8C8476] block mb-2">
                Piezas Seleccionadas ({inspectedQuote.items.length})
              </span>
              <div className="space-y-2.5">
                {inspectedQuote.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex gap-3 items-center p-3 rounded-xl border border-[#EAE3D5] bg-white"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-14 h-14 rounded-lg object-cover shrink-0 bg-[#ECE8DF]"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline">
                        <h4 className="text-xs font-bold text-[#1C1B1A] truncate">{item.title}</h4>
                        <span className="font-mono font-bold text-xs text-[#1C1B1A]">
                          {(item.priceEstimate * item.quantity).toLocaleString('es-ES')} €
                        </span>
                      </div>
                      <p className="text-[11px] text-[#736B5E] mt-0.5">{item.specSummary}</p>
                      <span className="text-[10px] text-[#8C8476]">Cantidad: {item.quantity}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Total and actions */}
            <div className="pt-4 border-t border-[#EAE3D5] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase text-[#8C8476] block">Total Estimado</span>
                <span className="font-serif text-2xl font-bold text-[#1C1B1A]">
                  {inspectedQuote.totalEstimate.toLocaleString('es-ES')} €
                </span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={handleExportPDF}
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-white border border-[#DDD5C5] text-xs font-semibold text-[#1C1B1A] flex items-center justify-center gap-2 hover:bg-[#F5F1E8] cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Imprimir / PDF</span>
                </button>
                <button
                  onClick={() => {
                    showToast(`Borrador de email generado para ${inspectedQuote.email}`);
                    setInspectedQuote(null);
                  }}
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-[#1C1B1A] text-white text-xs font-semibold flex items-center justify-center gap-2 hover:bg-[#2C2926] cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5 text-[#C2A370]" />
                  <span>Enviar al Estudio</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
