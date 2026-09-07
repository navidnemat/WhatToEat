"use client"

import { useEffect, useState } from "react";
import useGetAllIngredients from "@/features/ingredients/hooks/useGetAllIngredients";
import { parseApiError } from "@/utils/apiError";
import { IIngredientItem } from "../types/Ingredient";

interface SelectedIngredient {
    id: string;
    name: string;
}

interface SelectIngredientProps {
    value?: string;
    onSelect?: (id: string) => void;
    onIngredientSelect?: (ingredient: IIngredientItem) => void;
}

export default function SelectIngredient({
    value = "",
    onSelect,
    onIngredientSelect
}: SelectIngredientProps) {
    const [searchTerm, setSearchTerm] = useState("");

    const [searchInput, setSearchInput] = useState("");

    const [selectedId, setSelectedId] =
        useState(value);

    const {
        data: ingredients,
        isLoading,
        isError,
        error,
    } = useGetAllIngredients({
        name: searchTerm,
    });

    const parsedError = isError ? parseApiError(error) : null;

    useEffect(() => {
        setSelectedId(value);
    }, [value]);

    const handleSearch = () => {
        setSearchTerm(searchInput.trim());
    };

    // const handleIngredientSelect = (id: string) => {
    //     setSelectedId(id);
    //     onSelect(id);
    // };

    const handleIngredientSelect = (ingredient: IIngredientItem) => {
        setSelectedId(ingredient.id);

        onSelect?.(ingredient.id);
        onIngredientSelect?.(ingredient);
    };

    if (isError) {
        return (
            <div className="rounded-lg bg-red-50 p-4">
                <p className="text-center text-sm text-red-500">
                    {(error as Error).message}
                </p>
            </div>
        );
    }

    return (
        <div className="flex w-full flex-col gap-3 rounded-lg border border-gray-300 bg-slate-50 p-3">
            <label className="text-sm font-medium text-gray-600">
                انتخاب ماده اولیه
            </label>

            <div className="flex items-center gap-2">
                <input
                    type="text"
                    placeholder="جست‌وجوی ماده اولیه..."
                    value={searchInput}
                    onChange={(event) =>
                        setSearchInput(event.target.value)
                    }
                    onKeyDown={(event) => {
                        if (event.key === "Enter") {
                            event.preventDefault();
                            handleSearch();
                        }
                    }}
                    autoComplete="off"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none transition-shadow focus:ring-2 focus:ring-emerald-400"
                />

                <button
                    type="button"
                    onClick={handleSearch}
                    className="rounded-lg border border-gray-300 bg-white px-3 py-2 transition-colors hover:bg-gray-100"
                    aria-label="جست‌وجوی ماده اولیه"
                >
                    🔎
                </button>

                {isError && parsedError?.message && (
                    <p className="text-sm text-rose-500 text-center mt-2">
                        {parsedError.message}
                    </p>
                )}
            </div>

            <div className="h-52 overflow-y-auto">
                {isLoading ? (
                    <p className="py-5 text-center text-sm text-gray-500">
                        در حال بارگذاری...
                    </p>
                ) : ingredients &&
                    ingredients.length > 0 ? (
                    // <div className="flex flex-col gap-1">
                    <div className="grid grid-cols-2 gap-1.5">
                        {ingredients.map((ingredient) => (
                            <button
                                key={ingredient.id}
                                type="button"
                                onClick={() =>
                                    handleIngredientSelect(ingredient)
                                }
                                className={`
                                    rounded-md px-3 py-2 text-right
                                    transition-colors
                                    ${ingredient.id ===
                                        selectedId
                                        ? "bg-emerald-200 text-emerald-900"
                                        : "bg-white hover:bg-emerald-50"
                                    }
                                `}
                            >
                                {ingredient.name}
                            </button>
                        ))}
                    </div>
                ) : (
                    <p className="py-5 text-center text-sm text-gray-500">
                        ماده اولیه‌ای پیدا نشد.
                    </p>
                )}
            </div>
        </div>
    );
}