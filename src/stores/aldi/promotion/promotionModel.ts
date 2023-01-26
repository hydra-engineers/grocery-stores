import { ArticleModel, Image } from '../product/productModel';

export interface PromotionQueryModel {
    categoryNavigation: CategoryNavigation;
    promotions: PromotionModel[];
}

export interface PromotionModel {
    id: string;
    isSelected: boolean;
    promotionDate: Date;
    promotionNavTitle: string;
    promotionTitle: string;
    promotionTitleDate: string;
    showFromDate: Date;
    showUntilDate: Date;
    useGroupPromotionDates: boolean;
}

export interface CategoryNavigation {
    primaryPromotionWeek: PromotionWeek;
    secondaryPromotionWeek: PromotionWeek;
}

export interface PromotionWeek {
    slides: Slide[];
    title: string;
}

export interface Slide {
    anchorId: string;
    badgeText?: any;
    dateFrom: Date;
    dateFromFormatted: string;
    image: Image;
    promotionId: string;
    title: string;
}

export interface SinglePromotionModel {
    articleGroups: ArticleGroup[];
    colorSchema: ColorSchema;
    disclaimer?: any;
    hideNotAvailableHint: boolean;
    id: string;
    isSelected: boolean;
    promotionDate: Date;
    promotionNavTitle: string;
    promotionTitle: string;
    promotionTitleDate: string;
    remindServiceEnabled: boolean;
    showAgeCheck: boolean;
    showFromDate: Date;
    showUntilDate: Date;
    stageImage: Image;
    useGroupPromotionDates: boolean;
}

export interface ArticleGroup {
    anchorId: string;
    articles: ArticleModel[];
    category: string;
    colorSchema: ColorSchema;
    disclaimer?: unknown | null;
    headline: string;
    heroType: string;
    offerDate?: unknown | null;
}

export interface ColorSchema {
    backgroundColor?: string | null;
    backgroundImage?: unknown | null;
    flagColor?: string | null;
    flagFontColor?: unknown | null;
    fontColor?: unknown | null;
    priceBackgroundColor?: string | null;
}
