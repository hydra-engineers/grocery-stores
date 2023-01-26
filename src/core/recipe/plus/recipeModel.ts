export interface RecipeQueryModel {
    total: number;
    offset: number;
    amount: number;
    elements: RecipeData[];
}

export interface RecipeData {
    id: string;
    textId: string;
    name: string;
    type: string;
    cookingTime: number;
    savings: number;
    image: string;
}

export interface Ingredient {
    name: string;
    quantity: number;
    unit: string;
    sku: string;
    skuQuantity: number;
    inPromotion: boolean;
    ratioBasePackingUnit: string;
    baseUnit: string;
    categoryID: string;
    categoryName: string;
    price: string;
    productPrice: number;
    productName: string;
    mainCategoryID: string;
    mainCategoryName: string;
    productNameFull: string;
    recipeUnit: string;
    imageUrl_S: string;
    imageUrl_M: string;
    isLaagblijver: boolean;
}

export interface NutritionInfo {
    carbonhydrate: number;
    fiber: number;
    energyKJ: number;
    energyKcal: number;
    protein: number;
    fat: number;
    fatSaturated: number;
    sugar: number;
}

export interface RecipeModel {
    id: string;
    textId: string;
    name: string;
    created: number;
    edited: number;
    start: number;
    end: number;
    type: string;
    servings: number;
    cookingTime: number;
    savings: number;
    image: string;
    ingredients: Ingredient[];
    instructions: string[];
    nutritionInfo: NutritionInfo;
}
