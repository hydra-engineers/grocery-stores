export interface PromotionQueryModel {
    elements: PromotionData[];
    type: string;
    timestamp: number;
}

export interface PromotionProduct {
    sku: string;
    productName: string;
    unit: string;
    ratioBasePackingUnit: string;
    baseUnit: string;
    productPrice: number;
    promotionUUID: string;
    imageUrl: string;
    legrisGroup: string;
    showClover: boolean;
    lowestLevelCategoryID: string;
    lowestLevelCategoryName: string;
}

export interface LogoLabels {
    logo_bestelkosten1500: string;
    logo_bestelkosten1100: string;
    logo_bestelkosten2000: string;
    logo_WKEND: string;
    logo_NGOED: string;
    logo_waardebon: string;
    logo_OPOP: string;
}

export interface PromotionModel {
    type: string;
    description: string;
    couponCodeRequired: boolean;
    enabled: boolean;
    startDate: any;
    endDate: any;
    products: PromotionProduct[];
    id: string;
    promoSortOrder: string;
    aanbiedingStart: any;
    laagsteVanPrijs: string;
    aanbiedingEind: any;
    shapeTekstRood: string;
    verpakking: string;
    hoogsteVanPrijs: string;
    variant: string;
    plusPromotionType: string;
    label: string;
    l: string;
    m: string;
    logos: string[];
    logoLabels: LogoLabels;
    shapeTekstWit: string;
    labelPrice?: number;
    loyaliteitCode: string;
    toelichting: string;
}

export interface Category {
    name: string;
    sortOrder: number;
    categoryId: string;
    promotions: PromotionModel[];
    id: string;
}

export interface PromotionData {
    startTime: number;
    endTime: number;
    category: Category[];
}
