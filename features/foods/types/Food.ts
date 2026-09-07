import { IIngredientsOfFoodDto } from "../../ingredientsOfFoods/types/IngredientOfFood";


export interface IFoodDto {
    id: string;
    name: string;
    categoryId: string;
    categoryName: string;
    recipe: string
    imagePath?: string | null;
}

export interface IFoodDetailDto extends IFoodDto {
    ingredients: IIngredientsOfFoodDto[];
}

export interface ICreateFoodDto {
    name: string;
    categoryId: string;
    recipe?: string;
    image?: File | null;
}

export interface IUpdateFoodDto {
    id: string;
    name: string;
    categoryId: string;
    recipe: string
    image?: File | null;
    removeImage?: boolean
}

export interface IFoodQueryParams {
    categoryId?: string
    search?: string
    includedIngredientIds?: string[]
    excludedIngredientIds?: string[]
}