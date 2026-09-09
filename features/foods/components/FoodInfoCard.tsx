import { getFoodImageUrl } from "@/utils/image";
import { IFoodDetailDto } from "../types/Food";
import DOMPurify from "dompurify";

interface props {
    food?: IFoodDetailDto
}

export default function FoodInfoCard({ food }: props) {


    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 w-full mb-6">
            <div className="flex gap-3">
                {/* Image */}
                <div className="relative w-60">
                    <div className="relative h-40 w-full rounded-lg overflow-hidden">

                        <img
                            src={getFoodImageUrl(food?.imagePath)}
                            alt={`${food?.name}`}
                            sizes="(max-width: 768px) 100vw, 25vw"
                            className="absolute inset-0 h-full w-full object-cover
                                                    object-center"
                        />
                    </div>

                </div>

                <div className="flex flex-col gap-2">
                    <div className="text-2xl font-bold text-gray-800">{food?.name}</div>
                    <div className="text-gray-500 mt-1">دسته بندی: <span className="text-emerald-600 font-medium">{food?.categoryName}</span></div>
                </div>
            </div>

            <div
                className="tiptap leading-8 text-justify mt-3"
                dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(food?.recipe ?? ""),
                }}
            />
        </div>
    )
}