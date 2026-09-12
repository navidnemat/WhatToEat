import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/react-query/Keys";
import { UpdateUserDto } from "../types/user";
import { UpdateProfile } from "../api/User.service";

export default function useUpdateUser() {

    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (dto: UpdateUserDto) =>
            UpdateProfile(dto),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: queryKeys.user})
        }
    })

}