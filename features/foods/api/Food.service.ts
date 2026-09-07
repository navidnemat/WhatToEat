import {
    ICreateFoodDto,
    IFoodDetailDto,
    IFoodDto,
    IFoodQueryParams,
    IUpdateFoodDto
} from "@/features/foods/types/Food";
import api from "@/lib/api";

// const BaseUrl = "https://localhost:7232/api/Food"

// async function getApiError(res: Response): Promise<ApiError> {
//     try {
//         return await res.json();
//     } catch {
//         return {
//             message: "خطایی در ارتباط با سرور رخ داد"
//         } as ApiError;
//     }
// }

export async function GetAllFoods(
    params?: IFoodQueryParams
): Promise<IFoodDto[]> {


    const { data } = await api.get<IFoodDto[]>("/Food", {
        params,
        paramsSerializer: {
            indexes: null,  // این اون [] از URL حذف کرد تا با بک اند به خوبی ارتباط بگیره
        },
    })

    return data;

    // const res = await fetch(BaseUrl);

    // if (!res.ok) {
    //     throw await getApiError(res);
    // }

    // return res.json();

}

export async function GetFoodDetail(id: string): Promise<IFoodDetailDto> {

    const { data } = await api.get<IFoodDetailDto>(`/Food/${id}`)

    return data

}

export async function CreateFood(dto: ICreateFoodDto): Promise<IFoodDto> {

    const formData = new FormData();

    formData.append("Name", dto.name)
    formData.append("CategoryId", dto.categoryId);
    formData.append("Recipe", dto.recipe ?? "");

    if (dto.image) {
        formData.append("Image", dto.image);
    }

    const { data } = await api.post<IFoodDto>("/Food", formData);

    return data;

    // const res = await fetch(BaseUrl, {
    //     method: "POST",
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(dto),
    // });

    // const res = await fetch(BaseUrl, {
    //     method: "POST",
    //     body: formData
    // });

    // if (!res.ok) {
    //     throw await getApiError(res);
    // }

    // return res.json();

}

export async function UpdateFood(dto: IUpdateFoodDto): Promise<void> {

    const formData = new FormData();

    formData.append("Name", dto.name);
    formData.append("CategoryId", dto.categoryId);
    formData.append("Recipe", dto.recipe ?? "");

    formData.append(
        "RemoveImage",
        String(dto.removeImage ?? false)
    );

    if (dto.image) {
        formData.append("Image", dto.image);
    }

    await api.put(`/Food/${dto.id}`, formData)

    // const res = await fetch(`${BaseUrl}/${dto.id}`, {
    //     method: "PUT",
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(dto),
    // })

    // const res = await fetch(`${BaseUrl}/${dto.id}`, {
    //     method: "PUT",
    //     body: formData
    // });

    // if (!res.ok) {
    //     throw await getApiError(res);
    // }

}

export async function DeleteFood(id: string): Promise<void> {

    await api.delete(`/Food/${id}`)
    
}