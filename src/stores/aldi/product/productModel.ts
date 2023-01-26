export interface ProductQueryModel {
    articles: ArticleModel[];
}

export interface ArticleModel {
    additionalInfoUrl: string;
    allBadgeImages: Image[];
    ambientImage: Image;
    articleFlags: unknown[];
    articleGroupModel?: unknown | null;
    articleId: string; // products/{category}/{articleNumber}.json
    articleNumber: string;
    articleTileImageUsed: boolean;
    badgeImage: Image;
    basePriceFormatted: string;
    basePriceValue: number;
    brandName: string;
    certificates: unknown[];
    energyEfficiencyClass?: unknown | null;
    energyEfficiencyClassHtml?: unknown | null;
    energyEfficiencyColor?: unknown | null;
    energyEfficiencyIndex: number;
    energyEfficiencyNewLayout: boolean;
    energyEfficiencyScale?: unknown | null;
    filterValues: unknown;
    footnotes: string;
    hasPricePerVariant: boolean;
    hasVariants: boolean;
    isExternalArticle: boolean;
    isNotAvailable: boolean;
    isSoldOut: boolean;
    isTipp: boolean;
    notAvailableText?: unknown | null;
    oldPriceFormatted?: unknown | null;
    oldPricePrefix?: unknown | null;
    price: string;
    priceFormatted: string;
    priceInfo?: unknown;
    priceReduction: string;
    primaryImage: Image;
    salesUnit: string;
    shortDescription: string;
    showAvailability: boolean;
    showNotAvailableHint: boolean;
    showPrice: boolean;
    showPriceInfo: boolean;
    showQuantities: boolean;
    soldOutText?: unknown | null;
    title: string;
    webDetailURL: string;
}

export interface Image {
    alt: string;
    altText: string;
    author: string;
    baseUrl: string;
    imageLastPublished: number; // Unix millis timestamp
    location: string;
    renditionsSuffixes?: RenditionsSuffixes;
    title: string;
    type: string;
    valid: boolean;
}

export interface RenditionsSuffixes {
    [key: number]: string; // key is image width or index
}
