"use client"

import { useAuth } from "@/context/AuthContext";
import useGetFoodDetail from "@/features/foods/hooks/useGetFoodDetail";
import UseGetAllIngredientOfFood from "@/features/ingredientsOfFoods/hooks/useGetAllIngredientOfFood";
import useAddShoppingList from "@/features/shoppingList/hooks/useAddShoppingList";
import AppToast from "@/lib/toast";
import Container from "@/shared/components/container";
import LoadingComponent from "@/shared/components/loading";
import { parseApiError } from "@/utils/apiError";
import { getFoodImageUrl } from "@/utils/image";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Loader2, ShoppingCart, Heart } from "lucide-react";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import AddToFavoriteListHook from "@/features/favoriteList/hooks/useAddToFavoriteList";
import DOMPurify from "dompurify";

export default function FoodDetail() {

    const { id } = useParams<{ id: string }>();
    const { user } = useAuth()

    const [pendingIngredientId, setPendingIngredientId] = useState<string | null>(null);

    const [isClick, setIsClick] = useState(false)

    const {
        data,
        isLoading,
        isError,
        error,
    } = useGetFoodDetail(id);

    const parsedError = isError
        ? parseApiError(error)
        : null;

    const {
        data: ingredientData,
        isLoading: ingredientIsLoading,
        isError: ingredientIsError,
        error: ingredientError,
    } = UseGetAllIngredientOfFood(id);

    const {
        mutate: shoppingListMutate,
        isPending: shoppingListIsPending,
        isError: shoppingListIsError,
        error: shoppingListError,
    } = useAddShoppingList();

    const {
        mutate: favoriteListMutate,
        isPending: favoriteListIsPending,
        isError: favoriteListIsError,
        error: favoriteListError,
    } = AddToFavoriteListHook();

    const addToShoppingList = (foodId: string, ingredientId: string) => {
        if (!user) {
            AppToast.error("برای افزودن به لیست خرید ابتدا وارد شوید");
            return;
        }

        if (pendingIngredientId) return; // جلوگیری از کلیک همزمان روی چند دکمه

        setPendingIngredientId(ingredientId);

        shoppingListMutate(
            { foodId, ingredientId },
            {
                onSuccess: () => {
                    AppToast.success("ماده اولیه به لیست خریدتان افزوده شد");
                },
                onError: (mutationError) => {
                    const parsed = parseApiError(mutationError);
                    AppToast.error(parsed.message ?? "خطایی رخ داد");
                },
                onSettled: () => {
                    setPendingIngredientId(null);
                },
            }
        );
    };

    const addToFavoriteList = (foodId: string) => {

        if (!user) {
            AppToast.error("برای افزودن به علاقه مندی ابتدا وارد شوید");
            return;
        }

        favoriteListMutate(
            { foodId },
            {
                onSuccess: () => {
                    AppToast.success("غذا به علاقه مندی افزوده شد");
                },
                onError: (mutationError) => {
                    const parsed = parseApiError(mutationError);
                    AppToast.error(parsed.message ?? "خطایی رخ داد");
                },
                onSettled: () => {

                },
            }
        )

    }

    // const addToShoppingList = (foodId: string, ingredientId: string) => {

    //     if (!user) {
    //         AppToast.error("برای افزودن به لیست خرید ابتدا وارد شوید")
    //         return
    //     }

    //     shoppingListMutate({
    //         foodId,
    //         ingredientId
    //     },
    //         {
    //             onSuccess: () => {
    //                 AppToast.success("ماده اولیه به لیست خریدتان افزوده شد")
    //             },
    //             onError: (mutationError) => {
    //                 //AppToast.error(mutationError.message)

    //                 const parsed = parseApiError(mutationError);

    //                 AppToast.error(
    //                     parsed.message ?? "خطایی رخ داد"
    //                 );
    //             }
    //         })

    // }


    if (isLoading) return (
        <LoadingComponent />
    )

    if (isError && parsedError?.message) {
        return (
            <div className="flex items-center justify-center py-20">
                <p className="rounded-xl bg-red-50 p-4 text-center text-red-500 ring-1 ring-red-200">
                    {/* {(error as Error).message} */}
                    {parsedError?.message}
                </p>
            </div>
        );
    }


    return (
        <div className="">
            <Container>
                <div className="pt-21 md:pt-30 flex md:flex-row flex-col gap-10">
                    {/* right side */}
                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col gap-4 items-center 
                        border border-slate-200/80 rounded-3xl shadow-[0_4px_20px_rgba(15,23,42,0.05)]">
                            {/* Image */}
                            <div className="relative w-full md:w-60 lg:w-75">
                                <div className="relative h-75 md:h-50 lg:h-60 w-full rounded-3xl overflow-hidden">

                                    <img
                                        src={getFoodImageUrl(data?.imagePath)}
                                        alt={`${data?.name}`}
                                        sizes="(max-width: 768px) 100vw, 25vw"
                                        className="absolute inset-0 h-full w-full object-cover
                                        object-center"
                                    />
                                </div>

                            </div>


                        </div>

                        <div className=" flex items-center justify-between border border-slate-200/80 rounded-3xl 
                        shadow-[0_4px_20px_rgba(15,23,42,0.05)] bg-white p-4">
                            <div className="flex flex-col items-center gap-1">
                                <div className="text-2xl text-emerald-950">{data?.name}</div>
                                {/* <div className="text-emerald-600 text-shadow-sm">دسته بندی: <span className="text-slate-900">{data?.categoryName}</span></div> */}
                            </div>

                            <button aria-disabled={favoriteListIsPending === true} onClick={() => { setIsClick(!isClick), addToFavoriteList(id) }} className={`flex items-center justify-center w-12 h-12 ease-out duration-200 rounded-full border border-slate-200 text-emerald-950 hover:text-white ${isClick == false && 'hover:bg-slate-800'} hover:border-transparent ${isClick ? 'bg-emerald-600 border-transparent text-white' : 'bg-white'} active:scale-90 ${favoriteListIsPending ? "cursor-not-allowed opacity-60" : ""}`}>


                                {favoriteListIsPending ? (
                                    <Loader2 className="size-5 animate-spin" />
                                ) : (
                                    <FavoriteBorderOutlinedIcon className="text-xl" />
                                )}
                            </button>
                        </div>

                        {/* Ingredients List */}
                        <div className="min-w-64 rounded-3xl overflow-hidden 
                        flex flex-col gap-2 bg-white p-3 divide-y divide-emerald-200
                        shadow-[0_4px_20px_rgba(15,23,42,0.05)]">
                            <div className="w-full flex items-center p-1 pb-3 divide-x divide-emerald-200">
                                <div className="flex-1 text-center">ماده اولیه</div>
                                <div className="flex-1 text-center">مقدار مورد نیاز</div>
                            </div>

                            <div className="flex flex-col gap-2">
                                {ingredientIsLoading ? (
                                    <div className="hover:bg-emerald-100/30 transition-colors select-none">
                                        <div className="text-center p-4">
                                            در حال بارگذاری...
                                        </div>
                                    </div>
                                ) : ingredientData?.length ? (

                                    ingredientData.map((i) => (
                                        <div className="w-full flex items-center justify-between rounded-xl 
                                        px-6 py-3 text-right transition-all duration-200 hover:bg-emerald-100
                                        bg-emerald-50" key={i.id}>
                                            <span>{i.ingredientName}</span>
                                            <div className="flex items-center gap-3">
                                                <span>{i.value}</span>
                                                <button
                                                    aria-disabled={pendingIngredientId === i.ingredientId}
                                                    onClick={() => {
                                                        if (pendingIngredientId === i.ingredientId) return;
                                                        addToShoppingList(id, i.ingredientId);
                                                    }}
                                                    className={`
    relative flex h-9 w-9 items-center justify-center rounded-xl
    text-emerald-700 transition-all duration-150 ease-out
    hover:bg-emerald-50 hover:text-emerald-900
    active:scale-90 active:bg-emerald-200 active:text-emerald-900
    touch-manipulation select-none
    focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500
    ${pendingIngredientId === i.ingredientId ? "cursor-not-allowed opacity-60" : ""}
  `}
                                                >
                                                    {pendingIngredientId === i.ingredientId ? (
                                                        <Loader2 className="size-5 animate-spin" />
                                                    ) : (
                                                        <ShoppingCart size={20} />
                                                    )}
                                                </button>

                                                {/* <button
                                                    disabled={shoppingListIsPending}
                                                    onClick={() => addToShoppingList(id, i.ingredientId)}
                                                    className="
                                                        text-xl text-emerald-700 p-2 rounded-xl
                                                        transition-all duration-150
                                                        hover:text-emerald-900 hover:bg-emerald-50
                                                        active:scale-90 active:bg-emerald-200 active:text-emerald-900
                                                        disabled:pointer-events-none
                                                        touch-manipulation select-none
                                                        focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500
                                                      "
                                                >
                                                    <ShoppingCart size={20} />
                                                </button> */}
                                            </div>

                                        </div>
                                    ))

                                ) : (
                                    <div>
                                        <span className="text-center p-4">
                                            مواد اولیه در دسترس نیستند.
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* left side | recipe */}
                    <div className="">
                        <h3 className="text-2xl drop-shadow-lg text-shadow-sm mb-3">طرز تهیه</h3>

                        {/*<div className="leading-8 text-justify">
                            {data?.recipe}
                        </div>*/}

                        <div
                            className="tiptap leading-8 text-justify"
                            dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(data?.recipe ?? ""),
                            }}
                        />
                    </div>

                </div>
            </Container>
        </div>
    )

}