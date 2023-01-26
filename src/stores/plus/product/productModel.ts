export interface ProductQueryModel {
    facets: Facet[];
    items: ProductData[];
    properties: Properties;
    redirects: unknown[];
}

export interface Sortfield {
    title: string;
    displaytitle: string;
    order: string;
    isselected: boolean;
    url: string;
}

export interface Properties {
    nrofitems: number;
    pagesize: number;
    nrofpages: number;
    currentpage: number;
    selectedcategory: number;
    searchterm: string;
    suggestedsearchterm?: unknown;
    isdirectsearch: boolean;
    isrootcategory: boolean;
    pageurl: string;
    reseturl: string;
    sortfields: Sortfield[];
}

export interface ProductData {
    itemno: string;
    title: string;
    price: number;
    brand: string;
    image: string;
    attributes: ProductAttribute[];
}

export interface ProductAttribute {
    name: string;
    values: string[];
}

export interface Facet {
    facetsettings: Facetsettings;
    attributes: FacetAttribute[];
}

export interface FacetAttribute {
    title: string;
    isselected: boolean;
    nrofresults: number;
    attributeid?: unknown;
    url: string;
    imagetag?: unknown;
    children?: unknown;
}

export interface Facetsettings {
    facetid: number;
    isvisible: boolean;
    attributename: string;
    urlkey: string;
    title: string;
    iscollapsible: boolean;
    iscollapsed: boolean;
    nrofshownattributes: number;
    expandtext: string;
    collapsetext: string;
    ismultiselect: boolean;
    multiselectlogic: string;
    selectiontype: string;
    nrofcolumns: number;
    isnrofresultsvisible: boolean;
    isinfovisible: boolean;
    infotext?: unknown;
    containsclickpoints: boolean;
    containsbuckets: boolean;
    source: string;
    prefix: string;
    postfix?: unknown;
    cssclass?: unknown;
}

export interface ProductModel {
    baseUnit: string;
    bereidstat: string;
    bewaarinstructie: string;
    categoryID: string;
    categoryName: string;
    communicatieadres: string;
    contactnaam: string;
    defaultCategory: string;
    ean: string;
    id: string;
    image_I1: string;
    image_I2: string;
    image_I3: string;
    image_I4: string;
    image_L: string;
    image_M: string;
    image_S: string;
    image_XS: string;
    ingredienten: string;
    lastchangedate: string;
    legalInfo: LegalInfo;
    legrisGroup: string;
    listPrice: string;
    logos: string[];
    mainCategoryID: string;
    mainCategoryName: string;
    merk: string;
    name: string;
    ppse: string;
    productName: string;
    productPrice: number;
    ratioBasePackingUnit: string;
    salePrice: string;
    sku: string;
    standaard_inhoud: string;
    timestamp: number;
    type: string;
    unit: string;
    voedingswaarde_basis: string;
    voedingswaarden: Voedingswaarden[];
    wettelijke_naam: string;
}

export interface LegalInfo {
    'Communicatie adres': string;
    Contactnaam: string;
}

export interface Voedingswaarden {
    code: string;
    eenheid: string;
    inhoud: string;
    omschrijving: string;
}
