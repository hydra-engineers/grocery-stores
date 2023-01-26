export interface StoreModel {
    name: string;
    type: string;
    postalCode: string;
    city: string;
    country: string;
    countryCode: string;
    email: string;
    latitude: string;
    longitude: string;
    storeName: string;
    currentWeekMonday: string;
    currentWeekTuesday: string;
    currentWeekWednesday: string;
    currentWeekThursday: string;
    currentWeekFriday: string;
    currentWeekSaturday: string;
    currentWeekSunday: string;
    nextWeekMonday: string;
    nextWeekTuesday: string;
    nextWeekWednesday: string;
    nextWeekThursday: string;
    nextWeekFriday: string;
    nextWeekSaturday: string;
    nextWeekSunday: string;
    storeId: string;
    lastModified: unknown;
    phoneNumber: string;
    ownerName: string;
    facebookUrl: string;
    images: Images;
    deliveryMethods: DeliveryMethods;
    postalCodes: PostalCodes;
    paymentMethods: PaymentMethods;
    supportsDigitalSaving: boolean;
    supportsDigitalPLUSPunten: boolean;
    supportsRoutigo: boolean;
    websiteOnlineFlag: boolean;
    address: string;
    twitterCode: string;
}

export interface StoreInfo {
    url: string;
    lastModified: unknown;
}

export interface StoreOwner {
    url: string;
    lastModified: unknown;
}

export interface Images {
    store: StoreInfo;
    storeOwner: StoreOwner;
}

export interface DeliveryMethods {
    delivery: string;
    pickup: string;
}

export interface PostalCodes {
    primary: string[];
    secondary: string[];
}

export interface Private {
    name: string;
    id: string;
    delivery: boolean;
    pickup: boolean;
}

export interface Business {
    name: string;
    id: string;
    delivery: boolean;
    pickup: boolean;
}

export interface PaymentMethods {
    private: Private[];
    business: Business[];
}
