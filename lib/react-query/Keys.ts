import { ICategoryQueryParams } from "@/features/categories/types/Category";
import { IFoodQueryParams } from "@/features/foods/types/Food";
import { IngredientQueryParams } from "@/features/ingredients/types/Ingredient";


export const queryKeys = {
    foods: ["foods"] as const,
    ingredients: ["ingredients"] as const,
    categories: ["categories"] as const,
    ingredientOfFood: ["ingredientOfFood"] as const,
    ingredientsFiltered: (params: IngredientQueryParams) => [...queryKeys.ingredients, params],
    categoriesFiltered: (params: ICategoryQueryParams) => [...queryKeys.categories, params],
    foodsFiltered: (params: IFoodQueryParams) => [...queryKeys.foods, params],
    shoppingList: ["shopping-list"] as const,
    favoriteList: ["favorite-list"] as const,
    user: ["user"] as const,
}