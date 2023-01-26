import { Image } from '../product/productModel';
import { ColorSchema } from '../promotion';

export interface RecipeQueryModel {
    recipes: RecipeModel[];
}

export interface RecipeModel {
    category: string;
    dateFirstPublication: Date;
    difficultyLevel: string;
    recipeOfTheWeek: boolean;
    recipeUrl: string;
    servingsNumber: number;
    teaserImage: Image;
    title: string;
    withVideo: boolean;
    workingTime: number;
}

export interface ExtendedRecipeModel {
    additionalTime: number;
    additionalTimeType: string;
    category: string;
    colorSchema?: ColorSchema;
    dateFirstPublication: Date;
    difficultyLevel: string;
    ingredients: Ingredient[];
    ingredientsTips: unknown[];
    preparationSteps: PreparationStep[];
    preparationStepsTips: PreparationStepsTip[];
    primaryImage: Image;
    recipeOfTheWeek: boolean;
    recipeUrl: string;
    servingsNumber: number;
    tips: unknown[];
    title: string;
    withVideo: boolean;
    workingTime: number;
}

export interface Ingredient {
    articlepath: string;
    ingredient: string;
    quantity: string;
    unit: string;
}

export interface PreparationStep {
    stepText: string;
    stepTitle: string;
    type: string;
}

export interface PreparationStepsTip {
    tipText: string;
    tipTitle: string;
}
