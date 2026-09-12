import api from "@/lib/api";
import { UpdateUserDto } from "../types/user";

export async function UpdateProfile(dto: UpdateUserDto): Promise<void> {
    
    await api.put("Account/update-profile", dto)

}