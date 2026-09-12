import { email, z } from "zod"

export const UpdateUserSchema = z.object({

    fullName: z.string().optional(),
    phoneNumber: z.string()
        .min(10, "شماره موبایل نمی تواند کمتر از 10 رقم باشد")
        .max(11, "شماره موبایل نمی تواند بیشتر از 11 رقم باشد").optional(),
    email: z.email("فرمت ایمیل صحیح نمی باشد ").optional(),

})

export type UpdateUserFormData = z.infer<typeof UpdateUserSchema>