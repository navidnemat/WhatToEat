"use client"

import { useGetAllFoods } from "@/features/foods/hooks/useGetAllFoods";
import LoadingComponent from "../../../shared/components/loading";
import Link from "next/link";
import {
  Clock,
  Star,
  Flame,
  ArrowLeft,
} from "lucide-react";
import { parseApiError } from "@/utils/apiError";
import { getFoodImageUrl } from "@/utils/image";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { IFoodQueryParams } from "../types/Food";
import FoodFilter from "./foodFilter";

export default function FoodPageContent() {

  const [filter, setFilter] = useState<IFoodQueryParams>({
    search: "",
    categoryId: undefined,
    includedIngredientIds: [],
    excludedIngredientIds: [],
  });

  console.log("CURRENT FILTER:", filter);

  const searchParams = useSearchParams();

  const categoryId = searchParams.get("categoryId");

  const { data, isLoading, isError, error } = useGetAllFoods(filter);

  const parsedError = isError ? parseApiError(error) : null;

  if (isLoading) {
    return <LoadingComponent />;
  }

  if (isError && parsedError?.message) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="rounded-xl bg-red-50 p-4 text-center text-red-500 ring-1 ring-red-200">
          {parsedError?.message}
        </p>
      </div>
    );
  }

  // if (!data?.length) {
  //   return (
  //     <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-16 text-center">
  //       <span className="mb-3 text-5xl">🍽️</span>

  //       <h3 className="text-lg font-bold text-slate-800">
  //         هنوز غذایی ثبت نشده
  //       </h3>

  //       <p className="mt-1 text-sm text-slate-500">
  //         غذاهای جدید پس از ثبت، اینجا نمایش داده می‌شوند.
  //       </p>
  //     </div>
  //   );
  // }

  return (
    <>

      <FoodFilter
        filter={filter}
        setFilter={setFilter}
      />

      <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">

        {data?.length ? (
          data.map((food) => {


            return (
              <article
                key={food.id}
                className="
              group relative flex flex-col overflow-hidden rounded-3xl
              border border-slate-200/80 bg-white p-2.5
              shadow-[0_4px_20px_rgba(15,23,42,0.05)]
              transition-all duration-300 ease-out
              hover:-translate-y-1.5
              hover:border-emerald-300
              hover:shadow-[0_18px_45px_rgba(16,185,129,0.14)]
              active:scale-90
            "
              >
                {/* تصویر */}
                <Link
                  href={`/food/${food.id}`}
                  className="
                relative block h-44 w-full overflow-hidden rounded-2xl
                outline-none
                focus-visible:ring-2
                focus-visible:ring-emerald-500
                focus-visible:ring-offset-2
              "
                >
                  <img
                    src={getFoodImageUrl(food.imagePath)}
                    alt={food.name}

                    sizes="
                  (max-width: 640px) 100vw,
                  (max-width: 1024px) 50vw,
                  25vw
                "
                    className="
                  absolute inset-0 h-full w-full object-cover
                  object-center
                "
                  />

                  {/* Badge دسته‌بندی */}
                  <span
                    className="
                  absolute right-3 top-3
                  max-w-[calc(100%-1.5rem)]
                  truncate rounded-full
                  border border-white/20
                  bg-black/35
                  px-3 py-1.5
                  text-xs font-medium
                  text-white
                  shadow-sm
                  backdrop-blur-md
                  transition-all
                  duration-300
                  group-hover:bg-emerald-600/90
                "
                  >
                    {food.categoryName}
                  </span>
                </Link>

                {/* محتوا */}
                <div className="flex flex-1 flex-col px-2 pb-2 pt-4">
                  <Link
                    href={`/food/${food.id}`}
                    className="
                  group/title
                  rounded-lg
                  outline-none
                  focus-visible:ring-2
                  focus-visible:ring-emerald-500
                "
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3
                        className="
                      line-clamp-1
                      text-lg font-bold
                      text-slate-800
                      transition-colors
                      duration-200
                      group-hover/title:text-emerald-700
                      group-hover:text-emerald-800
                    "
                      >
                        {food.name}
                      </h3>
                    </div>
                  </Link>

                  {/* اطلاعات غذا */}
                  <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <Clock size={14} className="text-emerald-600" />
                      ۳۰ دقیقه
                    </span>

                    <span className="h-3 w-px bg-slate-200" />

                    <span className="flex items-center gap-1.5">
                      <Star
                        size={14}
                        className="fill-amber-400 text-amber-400"
                      />
                      ۴.۸
                    </span>

                    <span className="h-3 w-px bg-slate-200" />

                    <span className="flex items-center gap-1.5">
                      <Flame size={14} className="text-orange-500" />
                      آسان
                    </span>
                  </div>
                </div>
              </article>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-16 text-center">
            <span className="mb-3 text-5xl">🍽️</span>

            <h3 className="text-lg font-bold text-slate-800">
              هنوز غذایی ثبت نشده
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              غذاهای جدید پس از ثبت، اینجا نمایش داده می‌شوند.
            </p>
          </div>
        )}


      </div>
    </>
  );
}