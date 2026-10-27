export type Category = 
  | 'todos'
  | 'salas'
  | 'comedores'
  | 'dormitorios'
  | 'butacas'
  | 'mesas'
  | 'iluminacion';

export type FabricType = 
  | 'lino'
  | 'boucle'
  | 'terciopelo'
  | 'cuero'
  | 'chenille';

export type ColorTone = 
  | 'arena'
  | 'hueso'
  | 'grafito'
  | 'terracota'
  | 'oliva'
  | 'cognac';

export type SofaModel = 
  | 'aura'
  | 'curva'
  | 'lounge';

export type BaseFinish = 
  | 'roble_natural'
  | 'nogal_oscuro'
  | 'bronce_champagne'
  | 'negro_mate'
  | 'flotante';

export type ModuleSize = 
  | '2_plazas'
  | '3_plazas'
  | 'chaise_izq'
  | 'chaise_der'
  | 'isla_curva';

export interface SofaConfiguration {
  model: SofaModel;
  fabric: FabricType;
  color: ColorTone;
  size: ModuleSize;
  baseFinish: BaseFinish;
  cushionDensity: 'confort_pluma' | 'firmeza_arquitectonica';
  includeStool: boolean;
  estimatedPrice: number;
  leadTimeWeeks: number;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  collection: string;
  category: Category;
  priceEstimate: number;
  formattedPrice: string;
  dimensions: string;
  leadTime: string;
  description: string;
  materials: string[];
  features: string[];
  images: string[];
  isNew?: boolean;
  isIconic?: boolean;
  isConfigurable?: boolean;
  designer: string;
}

export interface Hotspot {
  id: string;
  xPercent: number; // 0 to 100
  yPercent: number; // 0 to 100
  productId: string;
  productName: string;
  subtitle: string;
  price: string;
  thumbnail: string;
}

export interface LookbookRoom {
  id: string;
  title: string;
  subtitle: string;
  location: string;
  description: string;
  heroImage: string;
  architect: string;
  hotspots: Hotspot[];
}

export interface QuoteItem {
  id: string;
  type: 'catalog' | 'custom_sofa';
  title: string;
  collection?: string;
  specSummary: string;
  priceEstimate: number;
  quantity: number;
  image: string;
  configDetails?: SofaConfiguration;
}

export type QuoteStatus = 
  | 'en_revision'
  | 'presupuestado'
  | 'en_produccion'
  | 'entregado';

export interface QuoteRequest {
  id: string;
  date: string;
  clientName: string;
  companyName: string; // Estudio de arquitectura / interiorismo
  email: string;
  phone: string;
  city: string;
  projectType: 'Residencial Privado' | 'Hotelería Boutique' | 'Comercial / Corporativo' | 'Inmobiliario';
  projectNotes: string;
  needsFabricSamples: boolean;
  items: QuoteItem[];
  totalEstimate: number;
  status: QuoteStatus;
}
