"use client"

import LoadingComponent from "@/shared/components/loading";
import { useGetAllFoods } from "@/features/foods/hooks/useGetAllFoods";
import { useState } from "react";
import { useDeleteFood } from "@/features/foods/hooks/useDeleteFood";
import Link from "next/link";
import Modal from "@/shared/components/modal";
import CreateFood from "./createFood";
import AppToast from "@/lib/toast";
import { getFoodImageUrl } from "@/utils/image";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { parseApiError } from "@/utils/apiError";

export default function AdminGetFoods() {

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const { data, isLoading, isError, error } = useGetAllFoods()
    const { mutate: deleteMutate, isPending: deleteIsPending } = useDeleteFood()

    const parsedError = isError ? parseApiError(error) : null;

    const onDeleteSubmit = (id: string) => {
        deleteMutate(id, {
            onSuccess: () => AppToast.success("غذا با موفقیت حذف شد"),
            onError: (err: any) => AppToast.error(err.message)
        })
    }

    if (isLoading) return <LoadingComponent />

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
        <div className="w-full">
            <div className="flex justify-start mb-8">
                <button
                    className="bg-emerald-500 rounded-lg text-lg text-white px-5 py-3 shadow-md hover:bg-emerald-600 transition-all duration-200 hover:scale-105"
                    onClick={() => setIsCreateModalOpen(true)}
                >
                    + افزودن غذای جدید
                </button>
            </div>

            {/* لیست غذاها */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {data?.map(food => (
                    <div

                        key={food.id}
                        className="group w-full p-5 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-lg hover:border-emerald-300 transition-all duration-200 flex flex-col gap-2 justify-between"
                    >
                        <Link
                            href={`/admin/foods/${food.id}`}
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
                        <div className="flex flex-col gap-2 text-gray-800">
                            <div className="text-xl font-bold text-emerald-700">{food.name}</div>
                            <div className="text-sm text-gray-500">
                                دسته‌بندی: <span className="font-medium text-gray-700">{food.categoryName}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
                            <Link
                                href={`/admin/foods/${food.id}`}
                                // onClick={() => {
                                //     setFoodId(food.id)
                                //     setDefaultFoodName(food.name)
                                //     setIsEditingMode("Edit")
                                // }}
                                className="flex-1 px-3 py-2 text-sm rounded-lg bg-amber-50 text-amber-600 ring-1 ring-amber-200 hover:bg-amber-100 transition-all"
                            >
                                ویرایش
                            </Link>
                            {/* <button
                                onClick={() => onDeleteSubmit(food.id)}
                                disabled={deleteIsPending}
                                className="flex-1 px-3 py-2 text-sm rounded-lg bg-red-50 text-red-600 ring-1 ring-red-200 hover:bg-red-100 transition-all disabled:opacity-50"
                            >
                                حذف
                            </button> */}
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <button
                                        className="flex-1 px-3 py-2 text-sm rounded-lg bg-red-50 text-red-600 ring-1 ring-red-200 hover:bg-red-100 transition-all disabled:opacity-50">
                                        حذف
                                    </button>
                                </AlertDialogTrigger>

                                <AlertDialogContent dir="rtl">
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>
                                            حذف غذا
                                        </AlertDialogTitle>

                                        <AlertDialogDescription>
                                            آیا مطمئنی می‌خواهی این غذا را حذف کنی؟
                                            این عملیات قابل بازگشت نیست.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>

                                    <AlertDialogFooter>
                                        <AlertDialogCancel>
                                            انصراف
                                        </AlertDialogCancel>

                                        <AlertDialogAction
                                            disabled={deleteIsPending}

                                            onClick={() => onDeleteSubmit(food.id)}
                                        >
                                            {deleteIsPending ? "در حال حذف..." : "حذف"}
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    </div>
                ))}
            </div>

            <Modal
                open={isCreateModalOpen}
                onOpenChange={setIsCreateModalOpen}
                title="افزودن غذای جدید"
                size="xl"
            >
                <CreateFood
                    onSuccess={() => setIsCreateModalOpen(false)} />
            </Modal>

        </div>
    )
}