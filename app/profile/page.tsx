// 'use client'
// import { useAuth } from "@/context/AuthContext";
// import ProtectedRoute from "@/shared/components/ProtectedRoute";

// export default function ProfilePage() {
//     return (
//         <ProtectedRoute>
//             <ProfileContent />
//         </ProtectedRoute>
//     );
// }

// function ProfileContent() {
//     const { user } = useAuth();

//     return (
//         <div className="px-10 py-30">
//             <div className="flex flex-col gap-2 mt-5">
//                 <h1 className="text-2xl font-bold">بهههه، ببین کی اینجاست {user?.username} 😘</h1>
//                 <p>ایمیل: {user?.email}</p>
//                 <p>نقش: {user?.roles[0]}</p>
//             </div>
//         </div>
//     );
// }


'use client'
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import ProtectedRoute from "@/shared/components/ProtectedRoute";
import Link from "next/link";
import useUpdateUser from "@/features/auth/hooks/useUpdateUser";
import { UpdateCategoryFormData } from "@/features/categories/schemas/UpdateCategory.schema";
import { UpdateUserDto } from "@/features/auth/types/user";
import AppToast from "@/lib/toast";
import { parseApiError } from "@/utils/apiError";
import { useForm } from "react-hook-form";
import { UpdateUserFormData, UpdateUserSchema } from "@/features/auth/schemas/UpdateUser.Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField } from "@mui/material";

export default function ProfilePage() {
    return (
        <ProtectedRoute>
            <ProfileContent />
        </ProtectedRoute>
    );
}

function ProfileContent() {

    const { user, refreshUser } = useAuth();
    const [isEditing, setIsEditing] = useState(false);

    const { mutate, isPending, isError, error } = useUpdateUser()

    const parsedError = isError ? parseApiError(error) : null;

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<UpdateUserFormData>({
        resolver: zodResolver(UpdateUserSchema),
        defaultValues: {
            fullName: user?.fullName,
            phoneNumber: user?.phoneNumber,
            email: user?.email,
        }
    })

    console.log("Errrorrrrrrrrrr" + parsedError)

    const onSubmit = (data: UpdateUserFormData) => {

        mutate({
            fullName: data.fullName,
            phoneNumber: data.phoneNumber,
            email: data.email
        },
            {
                onSuccess: async () => {
                    await refreshUser()

                    reset()
                    setIsEditing(false);
                    AppToast.success("پروفایل با موفقیت به روزرسانی شد")
                },
                onError: (mutationError) => {
                    const parsed = parseApiError(mutationError);

                    AppToast.error(
                        parsed.message ?? "خطایی رخ داد"
                    );
                }
            }
        );
    };

    return (
        <div className="px-6 md:px-12 py-24 max-w-4xl mx-auto" dir="rtl">
            {/* ===== کارت پروفایل ===== */}
            <div className="rounded-3xl bg-white border border-emerald-100 shadow-sm overflow-hidden">
                <div className="h-24 bg-linear-to-l from-emerald-500 to-emerald-400" />

                <div className="px-6 md:px-10 pb-8">
                    <div className="flex flex-col md:flex-row md:items-end gap-5 -mt-14">
                        <div className="w-28 h-28 rounded-full bg-white p-1 shadow-md">
                            <div className="w-full h-full rounded-full bg-emerald-100 flex items-center justify-center text-4xl font-bold text-emerald-600">
                                {user?.username?.[0]?.toUpperCase()}
                            </div>
                        </div>

                        <div className="flex-1">
                            <h1 className="text-2xl font-bold text-gray-800">
                                {user?.fullName || user?.username}
                            </h1>
                        </div>

                        <button
                            onClick={() => setIsEditing((p) => !p)}
                            className="self-start md:self-end px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium shadow-sm transition"
                        >
                            {isEditing ? "بستن ویرایش" : "ویرایش پروفایل"}
                        </button>
                    </div>

                    {/* دکمه‌های دسترسی سریع */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8">
                        <Link
                            href="/favoriteList"
                            className="flex items-center gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/50 hover:bg-emerald-50 px-5 py-4 transition"
                        >
                            <span className="text-2xl">❤️</span>
                            <span className="font-medium text-gray-800">علاقه‌مندی‌ها</span>
                        </Link>

                        <Link
                            href="/shoppingList"
                            className="flex items-center gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/50 hover:bg-emerald-50 px-5 py-4 transition"
                        >
                            <span className="text-2xl">🛒</span>
                            <span className="font-medium text-gray-800">لیست خرید</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* ===== اطلاعات یا فرم ویرایش ===== */}
            {isEditing ? (
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="mt-8 rounded-2xl bg-white border border-gray-100 shadow-sm p-6 md:p-8"
                >
                    <h2 className="font-semibold text-gray-800 mb-6">ویرایش اطلاعات</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <TextField size="small"
                            label="نام کامل"
                            variant="outlined"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '8px',
                                },
                            }}
                            {...register("fullName")}
                        />

                        <TextField size="small"
                            label="شماره موبایل"
                            variant="outlined"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '8px',
                                },
                            }}
                            {...register("phoneNumber")}
                            error={!!parsedError?.fieldErrors?.PhoneNumber || !!errors.phoneNumber?.message}
                            helperText={!!parsedError?.fieldErrors?.PhoneNumber?.[0] || errors.phoneNumber?.message}
                        />

                        <TextField size="small"
                            label="ایمیل"
                            variant="outlined"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '8px',
                                },
                            }}
                            {...register("email")}
                            error={!!parsedError?.fieldErrors?.Email || !!errors.email?.message}
                            helperText={!!parsedError?.fieldErrors?.Email?.[0] || errors.email?.message}
                        />

                        {isError && parsedError?.message && (
                            <p className="text-sm text-rose-500 mt-2">
                                {parsedError.message}
                            </p>
                        )}

                        <div className="md:col-span-2 flex justify-end gap-3 mt-2">
                            <button
                                type="button"
                                onClick={() => setIsEditing(false)}
                                className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm"
                            >
                                انصراف
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting || isPending}
                                className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium shadow-sm"
                            >
                                {isPending
                                    ? "در حال ذخیره..."
                                    : "ذخیره تغییرات"}
                            </button>
                        </div>
                    </div>
                </form>
            ) : (
                <div className="mt-8 rounded-2xl bg-white border border-gray-100 shadow-sm p-6 md:p-8">
                    <h2 className="font-semibold text-gray-800 mb-6 flex items-center gap-2">
                        <span className="w-1.5 h-5 rounded-full bg-emerald-500 inline-block" />
                        حساب کاربری
                    </h2>

                    <div className="space-y-3">
                        <Row label="نام کاربری" value={user?.username} />
                        <Row label="نام کامل" value={user?.fullName || "—"} />
                        <Row label="ایمیل" value={user?.email} />
                        <Row label="شماره تلفن" value={user?.phoneNumber || "—"} />
                    </div>
                </div>
            )}
        </div>
    );
}

/* ---------- کامپوننت‌های کوچیک ---------- */
function Row({ label, value }: { label?: string; value?: string }) {
    return (
        <div className="flex justify-between items-center text-sm border-b border-dashed border-gray-100 last:border-0 pb-2 last:pb-0">
            <span className="text-gray-500">{label}</span>
            <span className="text-gray-800 font-medium">{value}</span>
        </div>
    );
}

function Input({
    label,
    name,
    defaultValue,
    type = "text",
}: {
    label: string;
    name: string;
    defaultValue?: string;
    type?: string;
}) {
    return (
        <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">{label}</label>
            <input
                type={type}
                name={name}
                defaultValue={defaultValue}
                className="w-full rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none px-4 py-2.5 text-sm transition bg-gray-50/50 focus:bg-white"
            />
        </div>
    );
}