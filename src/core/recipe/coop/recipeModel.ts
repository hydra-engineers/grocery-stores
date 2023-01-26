export interface RecipeQueryModel {
    header: Header;
    results: RecipeModel[];
    filters: Filters;
}

export interface RecipeModel {
    id: number;
    title: string;
    slug: string;
    subtitle: string;
    meta_title: string;
    meta_description: string;
    preparation_time: number;
    kcal: number;
    fat: number;
    saturated_fat: number;
    carbs: number;
    protein: number;
    fibers: number;
    salt: number;
    sugar: number;
    prepreparation: string;
    preparation: string;
    persons: number;
    pieces: number;
    variation: string;
    wine_advice: string;
    intro: string;
    status: Status;
    difficulty: Difficulty;
    source: Source;
    images: RecipeImage[];
    kitchens: Kitchen[];
    courses: Cours[];
    requirements: Requirement[];
    ingredients: Ingredient[];
    times: unknown[];
    steps: Step[];
    tags: Tag[];
    tips: Tip[];
    wines: unknown[];
    drinks: unknown[];
    youtube: string;
    avatar: string;
    ratings: Ratings;
    views: Views;
    created_timestamp: number;
    updated_timestamp: number;
}

export interface RecipeIngredientModel {
    id: number;
    name?: unknown;
    amount: number;
    unit_name_singular: string;
    unit_name_plural: string;
    unit_abbreviation: string;
    name_singular: string;
    name_plural: string;
    portion_group_name: string;
    prefix_name: string;
    postfix_name: string;
    preparations: string;
    scaled_amount: number;
    scaled_amount_formatted: string;
    base_stock: boolean;
    products: RecipeProduct[];
}

export interface RecipeProduct {
    ean: string;
    amount: number;
    listPrice: number;
    salePrice: number;
    title: string;
    sticker: string;
    inhoud: string;
    images: Images;
    longtail: boolean;
    formattedListPrice: string;
    formattedSellingPrice: string;
}

export interface Images {
    [key: string]: string; // Key is either dimensions, size ('S', 'M', 'L') or 'ZOOM'
}

export interface Header {
    page: number;
    total_pages: number;
    items_per_page: number;
    total_items: number;
}

export interface Status {
    id: number;
    name: string;
}

export interface Difficulty {
    id: number;
    name: string;
}

export interface Source {
    id: number;
    name: string;
}

export interface RecipeImage {
    url: string;
    width: number;
    height: number;
    variants: unknown[];
}

export interface Kitchen {
    id: number;
    name: string;
}

export interface Cours {
    id: number;
    name: string;
}

export interface Requirement {
    id: number;
    amount: number;
    name_singular: string;
    name_plural: string;
    variant_name: string;
    postfix_name: string;
}

export interface Ingredient {
    id: number;
    name?: unknown;
    amount: number;
    unit_name_singular: string;
    unit_name_plural: string;
    unit_abbreviation: string;
    name_singular: string;
    name_plural: string;
    portion_group_name: string;
    prefix_name: string;
    postfix_name: string;
    preparations: string;
    scaled_amount: number;
    scaled_amount_formatted: string;
    base_stock: boolean;
    products?: unknown;
}

export interface Step {
    text: string;
}

export interface Tag {
    id: number;
    name: string;
}

export interface Tip {
    text: string;
}

export interface Ratings {
    count: number;
    average: number;
}

export interface Views {
    count: number;
}

export interface Filters {
    kitchen_id: KitchenId[];
    course_id: CourseId[];
    theme_id: ThemeId[];
    diet_id: DietId[];
    mainingredient_id: MainingredientId[];
    type_id: TypeId[];
    wine_id: WineId[];
    difficulty_id: DifficultyId[];
    source_id: SourceId[];
    tag_id: unknown[];
}

export interface KitchenId {
    id: number;
    frequency: number;
    name: string;
}

export interface CourseId {
    id: number;
    frequency: number;
    name: string;
}

export interface ThemeId {
    id: number;
    frequency: number;
    name: string;
}

export interface DietId {
    id: number;
    frequency: number;
    name: string;
}

export interface MainingredientId {
    id: number;
    frequency: number;
    name: string;
}

export interface TypeId {
    id: number;
    frequency: number;
    name: string;
}

export interface WineId {
    id: number;
    frequency: number;
    name: string;
    type: string;
    characteristic: string;
}

export interface DifficultyId {
    id: number;
    frequency: number;
    name: string;
}

export interface SourceId {
    id: number;
    frequency: number;
    name: string;
}
