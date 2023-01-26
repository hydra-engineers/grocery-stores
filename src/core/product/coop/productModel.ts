export interface ProductQueryModel {
    amount: number;
    elements: ProductModel[];
    filters: Filter[];
    offset: number;
    redirectUrl: string;
    searchID: string;
    total: number;
    type: string;
}

export interface Filter {
    filterOptions: FilterOption[];
    id: number;
    name: string;
    predecessorFilterID: number;
    type: string;
}

export interface FilterOption {
    amount: number;
    checked: boolean;
    id: string;
}

export interface ProductModel {
    attributeGroups: unknown;
    attributes: Attribute[];
    availability: boolean;
    defaultCategory: DefaultCategory;
    images: Image[];
    inStock: boolean;
    listPrice: ListPrice;
    longDescription: string;
    manufacturer: string;
    mastered: boolean;
    maxOrderQuantity: number;
    minOrderQuantity: number;
    name: string;
    packingUnit: string;
    productBundle: boolean;
    productMaster: boolean;
    productName: string;
    retailSet: boolean;
    salePrice: SalePrice;
    shortDescription: string;
    sku: string;
    stepOrderQuantity: number;
    supplierSKU: string;
    type: string;
}

export interface Attribute {
    name: string;
    type: string;
    value: any;
}

export interface CategoryPath {
    id: string;
    name: string;
    type: string;
    uri: string;
}

export interface DefaultCategory {
    categoryPath: CategoryPath[];
    id: string;
    name: string;
    type: string;
    uri: string;
}

export interface Image {
    effectiveUrl: string;
    imageActualHeight: number;
    imageActualWidth: number;
    name: string;
    primaryImage: boolean;
    type: string;
    typeID: string;
    viewID: string;
}

export interface ListPrice {
    currency: string;
    currencyMnemonic: string;
    type: string;
    value: number;
}

export interface SalePrice {
    currency: string;
    currencyMnemonic: string;
    type: string;
    value: number;
}
