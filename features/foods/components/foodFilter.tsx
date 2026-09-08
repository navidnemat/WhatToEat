// 'use client'

// import {
//     Select,
//     SelectContent,
//     SelectGroup,
//     SelectItem,
//     SelectLabel,
//     SelectTrigger,
//     SelectValue,
// } from "@/components/ui/select";
// import useGetAllCategories from "@/features/categories/hooks/useGetAllCategories";
// import Modal from "@/shared/components/modal";
// import { useState } from "react";
// import { IFoodQueryParams } from "../types/Food";
// import SelectIngredient from "@/features/ingredients/components/selectIngredient";
// import { IIngredientItem } from "@/features/ingredients/types/Ingredient";
// import { X } from "lucide-react";

// interface IFoodFilterProps {
//     filter: IFoodQueryParams;
//     setFilter: React.Dispatch<React.SetStateAction<IFoodQueryParams>>;
// }

// export default function FoodFilter({
//     filter,
//     setFilter,
// }: IFoodFilterProps) {

//     const [searchInput, setSearchInput] = useState('');
//     const [categoryIdInput, setCategoryIdInput] = useState('');

//     const [includedIngredientIsOpen, setIncludedIngredientIsOpen] = useState(false)

//     const [includedIngredients, setIncludedIngredients] = useState<
//         IIngredientItem[]
//     >([]);

//     const [excludedIngredientIsOpen, setExcludedIngredientIsOpen] = useState(false)

//     const [excludedIngredients, setExcludedIngredients] = useState<
//         IIngredientItem[]
//     >([]);

//     const {
//         data,
//         isLoading,
//         isError,
//         error
//     } = useGetAllCategories()

//     const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setSearchInput(event.target.value);
//     };

//     const handleFilter = () => {
//         setFilter((prev) => ({
//             ...prev,
//             search: searchInput,
//             categoryId: categoryIdInput === "all"
//                 ? undefined
//                 : categoryIdInput,
//             includedIngredientIds: includedIngredients.map(
//                 ingredient => ingredient.id
//             ),
//             excludedIngredientIds: excludedIngredients.map(
//                 ingredient => ingredient.id
//             ),
//         }))
//     }

//     const handleIncludedIngredientSelect = (
//         ingredient: IIngredientItem
//     ) => {
//         setIncludedIngredients((prev) => {
//             if (prev.some(item => item.id === ingredient.id)) {
//                 return prev;
//             }

//             return [
//                 ...prev,
//                 {
//                     id: ingredient.id,
//                     name: ingredient.name,
//                 }
//             ];
//         });

//         setIncludedIngredientIsOpen(false);
//     };

//     const handleExcludedIngredientSelect = (
//         ingredient: IIngredientItem
//     ) => {
//         setExcludedIngredients((prev) => {
//             if (prev.some(item => item.id === ingredient.id)) {
//                 return prev;
//             }

//             return [
//                 ...prev,
//                 {
//                     id: ingredient.id,
//                     name: ingredient.name,
//                 }
//             ];
//         });

//         setExcludedIngredientIsOpen(false);
//     };

//     const handleRemoveIncludedIngredient = (id: string) => {
//         setIncludedIngredients((prev) =>
//             prev.filter((ingredient) => ingredient.id !== id)
//         );
//     };

//     const handleRemoveExcludedIngredient = (id: string) => {
//         setExcludedIngredients((prev) =>
//             prev.filter((ingredient) => ingredient.id !== id)
//         );
//     };

//     return (
//         <div className="flex flex-1 gap-3 transition-all duration-300 bg-white p-4 rounded-xl mb-8 shadow-md">
//             <div className="relative">
//                 <input
//                     type="text"
//                     value={searchInput}
//                     onChange={handleSearchChange}
//                     placeholder="نام غذا"
//                     className="px-4 py-3 w-50 bg-slate-50 border border-slate-200 rounded-xl 
//                                 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:bg-white 
//                                 transition-all duration-200"
//                 />
//             </div>


//             { /* Category Filter */}
//             <Select
//                 value={categoryIdInput}
//                 onValueChange={(value) => {
//                     setCategoryIdInput(value);
//                 }}>
//                 <SelectTrigger className="w-full max-w-38 py-6 rounded-xl focus:ring-2
//         focus:ring-emerald-500">
//                     <SelectValue placeholder="دسته بندی" />
//                 </SelectTrigger>
//                 <SelectContent>
//                     <SelectGroup>
//                         <SelectLabel>دسته بندی ها</SelectLabel>

//                         <SelectItem value="all">
//                             همه غذاها
//                         </SelectItem>

//                         {data?.map((item) => (
//                             <SelectItem key={item.id} value={item.id}>
//                                 {item.name}
//                             </SelectItem>
//                         ))}
//                     </SelectGroup>
//                 </SelectContent>
//             </Select>

//             {/* Included Ingredients */}
//             <div className={`flex flex-col gap-2 w-full bg-white border border-slate-200 p-2
//                 rounded-xl transition-all duration-300`}>
//                 <div className="flex w-full justify-between items-center">
//                     <span className="text-slate-500">مواد اولیه موجود</span>
//                     <button
//                         type="button"
//                         onClick={() => setIncludedIngredientIsOpen(true)}
//                         className="bg-emerald-500 px-4 py-1 rounded-md 
//                                 text-white text-sm font-medium transition-all 
//                                 hover:bg-emerald-700 hover:shadow-md
//                                 justify-self-end"
//                     >
//                         افزودن ماده اولیه
//                     </button>
//                 </div>

//                 <div className="flex gap-2 flex-wrap">
//                     {includedIngredients.map((ingredient => (
//                         <div
//                             key={ingredient.id}
//                             className="pl-1 pr-3 py-1 rounded-lg 
//                                 bg-emerald-50 border border-emerald-200 text-emerald-600 
//                                 transition-all duration-200 cursor-pointer flex items-center gap-2 text-sm">
//                             {ingredient.name}

//                             <button
//                                 type="button"
//                                 onClick={() => handleRemoveIncludedIngredient(ingredient.id)}
//                                 className="text-emerald-500 hover:text-emerald-700 
//                 hover:bg-emerald-100 rounded-full w-5 h-5 
//                 flex items-center justify-center transition-colors"
//                                 aria-label={`حذف ${ingredient.name}`}
//                             >
//                                 <X size={10}/>
//                             </button>
//                         </div>
//                     )))}
//                 </div>

//             </div>

//             {/* Excluded Ingredients */}
//             <div className={`flex flex-col gap-2 w-full bg-white border border-slate-200 p-2
//                 rounded-xl transition-all duration-300`}>
//                 <div className="flex w-full justify-between items-center">
//                     <span className="text-slate-500">مواد اولیه ناموجود</span>
//                     <button
//                         type="button"
//                         onClick={() => setExcludedIngredientIsOpen(true)}
//                         className="bg-emerald-500 px-4 py-1 rounded-md 
//                                 text-white text-sm font-medium transition-all 
//                                 hover:bg-emerald-700 hover:shadow-md
//                                 justify-self-end"
//                     >
//                         افزودن ماده اولیه
//                     </button>
//                 </div>

//                 <div className="flex gap-2 flex-wrap">
//                     {excludedIngredients.map((ingredient => (
//                         <div
//                             key={ingredient.id}
//                             className="pl-1 pr-3 py-1 rounded-lg 
//                                 bg-rose-50 border border-rose-200 text-rose-600 
//                                 transition-all duration-200 cursor-pointer flex items-center gap-2 text-sm">
//                             {ingredient.name}

//                             <button
//                                 type="button"
//                                 onClick={() => handleRemoveExcludedIngredient(ingredient.id)}
//                                 className="text-rose-500 hover:text-eose-700 
//                 hover:bg-rose-100 rounded-full w-5 h-5 
//                 flex items-center justify-center transition-colors"
//                                 aria-label={`حذف ${ingredient.name}`}
//                             >
//                                 <X size={10}/>
//                             </button>
//                         </div>
//                     )))}
//                 </div>

//             </div>
//             <button
//                 type="submit"
//                 onClick={handleFilter}
//                 className="bg-emerald-600 px-4 py-3.5 rounded-xl text-nowrap 
//                                 text-white text-sm font-medium transition-all hover:bg-emerald-700 hover:shadow-md"
//             >
//                 فیلتر کردن
//             </button>

//             <Modal
//                 open={includedIngredientIsOpen}
//                 onOpenChange={setIncludedIngredientIsOpen}
//                 title="افزدون ماده اولیه در دسترس"
//                 size="xs">
//                 <SelectIngredient
//                     onIngredientSelect={handleIncludedIngredientSelect}
//                 />
//             </Modal>

//             <Modal
//                 open={excludedIngredientIsOpen}
//                 onOpenChange={setExcludedIngredientIsOpen}
//                 title="افزدون ماده اولیه دور از دسترس"
//                 size="xs">
//                 <SelectIngredient
//                     onIngredientSelect={handleExcludedIngredientSelect}
//                 />
//             </Modal>
//         </div>
//     )

// }


// 'use client'

// import {
//     Select,
//     SelectContent,
//     SelectGroup,
//     SelectItem,
//     SelectLabel,
//     SelectTrigger,
//     SelectValue,
// } from "@/components/ui/select";
// import useGetAllCategories from "@/features/categories/hooks/useGetAllCategories";
// import Modal from "@/shared/components/modal";
// import { useState } from "react";
// import { IFoodQueryParams } from "../types/Food";
// import SelectIngredient from "@/features/ingredients/components/selectIngredient";
// import { IIngredientItem } from "@/features/ingredients/types/Ingredient";
// import { X, Plus } from "lucide-react";

// interface IFoodFilterProps {
//     filter: IFoodQueryParams;
//     setFilter: React.Dispatch<React.SetStateAction<IFoodQueryParams>>;
// }

// export default function FoodFilter({ filter, setFilter }: IFoodFilterProps) {
//     const [searchInput, setSearchInput] = useState('');
//     const [categoryIdInput, setCategoryIdInput] = useState('');
//     const [includedIngredientIsOpen, setIncludedIngredientIsOpen] = useState(false);
//     const [excludedIngredientIsOpen, setExcludedIngredientIsOpen] = useState(false);
//     const [includedIngredients, setIncludedIngredients] = useState<IIngredientItem[]>([]);
//     const [excludedIngredients, setExcludedIngredients] = useState<IIngredientItem[]>([]);

//     const { data } = useGetAllCategories();

//     const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setSearchInput(event.target.value);
//     };

//     const handleFilter = () => {
//         setFilter(prev => ({
//             ...prev,
//             search: searchInput,
//             categoryId: categoryIdInput === "all" ? undefined : categoryIdInput,
//             includedIngredientIds: includedIngredients.map(i => i.id),
//             excludedIngredientIds: excludedIngredients.map(i => i.id),
//         }));
//     };

//     const handleIncludedIngredientSelect = (ingredient: IIngredientItem) => {
//         setIncludedIngredients(prev =>
//             prev.some(item => item.id === ingredient.id)
//                 ? prev
//                 : [...prev, { id: ingredient.id, name: ingredient.name }]
//         );
//         setIncludedIngredientIsOpen(false);
//     };

//     const handleExcludedIngredientSelect = (ingredient: IIngredientItem) => {
//         setExcludedIngredients(prev =>
//             prev.some(item => item.id === ingredient.id)
//                 ? prev
//                 : [...prev, { id: ingredient.id, name: ingredient.name }]
//         );
//         setExcludedIngredientIsOpen(false);
//     };

//     const handleRemoveIncludedIngredient = (id: string) => {
//         setIncludedIngredients(prev => prev.filter(i => i.id !== id));
//     };

//     const handleRemoveExcludedIngredient = (id: string) => {
//         setExcludedIngredients(prev => prev.filter(i => i.id !== id));
//     };

//     return (
//         <div className="flex flex-col md:flex-row items-start gap-4 bg-white p-4 rounded-xl mb-8 shadow-md">
//             {/* Search Input - ارتفاع ثابت h-10 */}
//             <div className="w-full md:w-auto">
//                 <input
//                     type="text"
//                     value={searchInput}
//                     onChange={handleSearchChange}
//                     placeholder="نام غذا"
//                     className="h-10 px-4 w-full md:w-40 bg-slate-50 border border-slate-200 rounded-xl 
//                                focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:bg-white 
//                                transition-all duration-200"
//                 />
//             </div>

//             {/* Category Select - ارتفاع ثابت h-10 */}
//             <div className="w-full md:w-auto">
//                 <Select value={categoryIdInput} onValueChange={setCategoryIdInput}>
//                     <SelectTrigger className="w-full md:w-44 rounded-xl focus:ring-2 focus:ring-emerald-500 py-2">
//                         <SelectValue placeholder="دسته بندی" />
//                     </SelectTrigger>
//                     <SelectContent>
//                         <SelectGroup>
//                             <SelectLabel>دسته بندی ها</SelectLabel>
//                             <SelectItem value="all">همه غذاها</SelectItem>
//                             {data?.map(item => (
//                                 <SelectItem key={item.id} value={item.id}>
//                                     {item.name}
//                                 </SelectItem>
//                             ))}
//                         </SelectGroup>
//                     </SelectContent>
//                 </Select>
//             </div>

//             {/* Included Ingredients - حداقل ارتفاع min-h-10 */}
//             <div className="flex flex-col gap-2 w-full md:flex-1 bg-white border border-slate-200 p-3 rounded-xl min-h-10">
//                 <div className="flex items-center justify-between gap-2">
//                     <span className="text-sm font-medium text-slate-600">مواد اولیه‌ای که دارم</span>
//                     <button
//                         type="button"
//                         onClick={() => setIncludedIngredientIsOpen(true)}
//                         className="bg-emerald-500 px-3 py-1.5 rounded-md text-white text-xs font-medium 
//                                   hover:bg-emerald-600 transition-colors flex items-center gap-1"
//                     >
//                         <Plus size={14} />
//                         افزودن
//                     </button>
//                 </div>

//                 <div className="flex flex-wrap gap-2">
//                     {includedIngredients.length === 0 ? (
//                         <span className="text-slate-400 text-sm">ماده‌ای انتخاب نشده است</span>
//                     ) : (
//                         includedIngredients.map(ingredient => (
//                             <span
//                                 key={ingredient.id}
//                                 className="pl-2 pr-3 py-1 rounded-lg bg-emerald-50 border border-emerald-200 
//                                           text-emerald-600 text-sm flex items-center gap-2"
//                             >
//                                 {ingredient.name}
//                                 <button
//                                     type="button"
//                                     onClick={() => handleRemoveIncludedIngredient(ingredient.id)}
//                                     className="text-emerald-500 hover:text-emerald-700 hover:bg-emerald-100 
//                                               rounded-full w-5 h-5 flex items-center justify-center transition-colors"
//                                     aria-label={`حذف ${ingredient.name}`}
//                                 >
//                                     <X size={12} />
//                                 </button>
//                             </span>
//                         ))
//                     )}
//                 </div>
//             </div>

//             {/* Excluded Ingredients - حداقل ارتفاع min-h-10 */}
//             <div className="flex flex-col gap-2 w-full md:flex-1 bg-white border border-slate-200 p-3 rounded-xl min-h-10">
//                 <div className="flex items-center justify-between gap-2">
//                     <span className="text-sm font-medium text-slate-600">مواد اولیه‌ای که نمی‌خواهم</span>
//                     <button
//                         type="button"
//                         onClick={() => setExcludedIngredientIsOpen(true)}
//                         className="bg-rose-500 px-3 py-1.5 rounded-md text-white text-xs font-medium 
//                                   hover:bg-rose-600 transition-colors flex items-center gap-1"
//                     >
//                         <Plus size={14} />
//                         افزودن
//                     </button>
//                 </div>

//                 <div className="flex flex-wrap gap-2">
//                     {excludedIngredients.length === 0 ? (
//                         <span className="text-slate-400 text-sm">ماده‌ای انتخاب نشده است</span>
//                     ) : (
//                         excludedIngredients.map(ingredient => (
//                             <span
//                                 key={ingredient.id}
//                                 className="pl-2 pr-3 py-1 rounded-lg bg-rose-50 border border-rose-200 
//                                           text-rose-600 text-sm flex items-center gap-2"
//                             >
//                                 {ingredient.name}
//                                 <button
//                                     type="button"
//                                     onClick={() => handleRemoveExcludedIngredient(ingredient.id)}
//                                     className="text-rose-500 hover:text-rose-700 hover:bg-rose-100 
//                                               rounded-full w-5 h-5 flex items-center justify-center transition-colors"
//                                     aria-label={`حذف ${ingredient.name}`}
//                                 >
//                                     <X size={12} />
//                                 </button>
//                             </span>
//                         ))
//                     )}
//                 </div>
//             </div>

//             {/* Filter Button - ارتفاع ثابت h-10 و self-start */}
//             <button
//                 type="button"
//                 onClick={handleFilter}
//                 className="h-10 px-6 self-start bg-emerald-600 rounded-xl text-white text-sm font-medium 
//                           hover:bg-emerald-700 hover:shadow-md transition-all"
//             >
//                 فیلتر کردن
//             </button>

//             {/* Modals */}
//             <Modal
//                 open={includedIngredientIsOpen}
//                 onOpenChange={setIncludedIngredientIsOpen}
//                 title="افزودن ماده اولیه‌ای که دارم"
//                 size="xs"
//             >
//                 <SelectIngredient onIngredientSelect={handleIncludedIngredientSelect} />
//             </Modal>

//             <Modal
//                 open={excludedIngredientIsOpen}
//                 onOpenChange={setExcludedIngredientIsOpen}
//                 title="افزودن ماده اولیه‌ای که نمی‌خواهم"
//                 size="xs"
//             >
//                 <SelectIngredient onIngredientSelect={handleExcludedIngredientSelect} />
//             </Modal>
//         </div>
//     );
// }


'use client'

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import useGetAllCategories from "@/features/categories/hooks/useGetAllCategories";
import Modal from "@/shared/components/modal";
import { useState } from "react";
import { IFoodQueryParams } from "../types/Food";
import SelectIngredient from "@/features/ingredients/components/selectIngredient";
import { IIngredientItem } from "@/features/ingredients/types/Ingredient";
import { X } from "lucide-react";

interface IFoodFilterProps {
    filter: IFoodQueryParams;
    setFilter: React.Dispatch<React.SetStateAction<IFoodQueryParams>>;
}

export default function FoodFilter({
    filter,
    setFilter,
}: IFoodFilterProps) {

    const [searchInput, setSearchInput] = useState('');
    const [categoryIdInput, setCategoryIdInput] = useState('');

    const [includedIngredientIsOpen, setIncludedIngredientIsOpen] = useState(false)
    const [includedIngredients, setIncludedIngredients] = useState<IIngredientItem[]>([]);

    const [excludedIngredientIsOpen, setExcludedIngredientIsOpen] = useState(false)
    const [excludedIngredients, setExcludedIngredients] = useState<IIngredientItem[]>([]);

    const { data, isLoading, isError, error } = useGetAllCategories()

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(event.target.value);
    };

    const handleFilter = () => {
        setFilter((prev) => ({
            ...prev,
            search: searchInput,
            categoryId: categoryIdInput === "all" ? undefined : categoryIdInput,
            includedIngredientIds: includedIngredients.map(ingredient => ingredient.id),
            excludedIngredientIds: excludedIngredients.map(ingredient => ingredient.id),
        }))
    }

    const handleIncludedIngredientSelect = (ingredient: IIngredientItem) => {
        setIncludedIngredients((prev) => {
            if (prev.some(item => item.id === ingredient.id)) return prev;
            return [...prev, { id: ingredient.id, name: ingredient.name }];
        });
        setIncludedIngredientIsOpen(false);
    };

    const handleExcludedIngredientSelect = (ingredient: IIngredientItem) => {
        setExcludedIngredients((prev) => {
            if (prev.some(item => item.id === ingredient.id)) return prev;
            return [...prev, { id: ingredient.id, name: ingredient.name }];
        });
        setExcludedIngredientIsOpen(false);
    };

    const handleRemoveIncludedIngredient = (id: string) => {
        setIncludedIngredients((prev) => prev.filter((ingredient) => ingredient.id !== id));
    };

    const handleRemoveExcludedIngredient = (id: string) => {
        setExcludedIngredients((prev) => prev.filter((ingredient) => ingredient.id !== id));
    };

    return (
        <div className="flex flex-col lg:flex-row lg:items-center gap-3 transition-all duration-300 bg-white p-4 lg:p-5 rounded-xl mb-8 shadow-md">
            
            {/* Search Input */}
            <input
                type="text"
                value={searchInput}
                onChange={handleSearchChange}
                placeholder="نام غذا..."
                className="w-full lg:w-48 h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl 
                           focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:bg-white 
                           transition-all duration-200 text-sm"
            />

            {/* Category Filter (RTL Fixed) */}
            <Select
                value={categoryIdInput}
                onValueChange={(value) => setCategoryIdInput(value)}
            >
                <SelectTrigger className="w-full lg:w-48 rounded-lg focus:ring-2 focus:ring-emerald-500 flex-row-reverse text-right bg-slate-50 ">
                    <SelectValue placeholder="دسته‌بندی" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>دسته‌بندی‌ها</SelectLabel>
                        <SelectItem value="all">همه غذاها</SelectItem>
                        {data?.map((item) => (
                            <SelectItem key={item.id} value={item.id}>
                                {item.name}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>

            {/* Included Ingredients */}
            <div className="flex flex-col gap-1.5 flex-1 bg-slate-50 border border-slate-200 p-2.5 rounded-xl transition-all duration-300 min-h-[48px] justify-center">
                <div className="flex w-full justify-between items-center">
                    <span className="text-xs sm:text-sm font-medium text-slate-600">شامل این مواد (دارم)</span>
                    <button
                        type="button"
                        onClick={() => setIncludedIngredientIsOpen(true)}
                        className="bg-emerald-500 px-2.5 py-1 rounded-md text-white text-xs font-medium transition-all hover:bg-emerald-700"
                    >
                        افزودن
                    </button>
                </div>

                <div className="flex gap-2 flex-wrap items-center">
                    {includedIngredients.length === 0 ? (
                        <span className="text-[10px] text-slate-400">هیچ ماده‌ای اضافه نشده است</span>
                    ) : (
                        includedIngredients.map((ingredient) => (
                            <div
                                key={ingredient.id}
                                className="px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center gap-1.5 text-xs"
                            >
                                {ingredient.name}
                                <button
                                    type="button"
                                    onClick={() => handleRemoveIncludedIngredient(ingredient.id)}
                                    className="text-emerald-500 hover:text-emerald-700 hover:bg-emerald-100 rounded-full p-0.5 flex items-center justify-center transition-colors"
                                    aria-label={`حذف ${ingredient.name}`}
                                >
                                    <X size={12} />
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Excluded Ingredients */}
            <div className="flex flex-col gap-1.5 flex-1 bg-slate-50 border border-slate-200 p-2.5 rounded-xl transition-all duration-300 min-h-[48px] justify-center">
                <div className="flex w-full justify-between items-center">
                    <span className="text-xs sm:text-sm font-medium text-slate-600">بدون این مواد (نمی‌خوام)</span>
                    <button
                        type="button"
                        onClick={() => setExcludedIngredientIsOpen(true)}
                        className="bg-rose-500 px-2.5 py-1 rounded-md text-white text-xs font-medium transition-all hover:bg-rose-700"
                    >
                        افزودن
                    </button>
                </div>

                <div className="flex gap-2 flex-wrap items-center">
                    {excludedIngredients.length === 0 ? (
                        <span className="text-[10px] text-slate-400">هیچ ماده‌ای اضافه نشده است</span>
                    ) : (
                        excludedIngredients.map((ingredient) => (
                            <div
                                key={ingredient.id}
                                className="px-2.5 py-1 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 flex items-center gap-1.5 text-xs"
                            >
                                {ingredient.name}
                                <button
                                    type="button"
                                    onClick={() => handleRemoveExcludedIngredient(ingredient.id)}
                                    className="text-rose-500 hover:text-rose-700 hover:bg-rose-100 rounded-full p-0.5 flex items-center justify-center transition-colors"
                                    aria-label={`حذف ${ingredient.name}`}
                                >
                                    <X size={12} />
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Filter Button */}
            <button
                type="button"
                onClick={handleFilter}
                className="bg-emerald-600 px-6 h-12 rounded-xl text-white text-sm font-medium transition-all hover:bg-emerald-700 hover:shadow-md w-full lg:w-auto"
            >
                اعمال فیلتر
            </button>

            {/* Modals */}
            <Modal
                open={includedIngredientIsOpen}
                onOpenChange={setIncludedIngredientIsOpen}
                title="افزودن ماده اولیه (موادی که دارید)"
                size="xs"
            >
                <SelectIngredient onIngredientSelect={handleIncludedIngredientSelect} />
            </Modal>

            <Modal
                open={excludedIngredientIsOpen}
                onOpenChange={setExcludedIngredientIsOpen}
                title="افزودن ماده اولیه (موادی که نمی‌خواهید)"
                size="xs"
            >
                <SelectIngredient onIngredientSelect={handleExcludedIngredientSelect} />
            </Modal>
        </div>
    )
}