export interface User {
    username: string;
    roles: string[];
    email?: string;
    phoneNumber?: string;
    fullName?: string;
};

export interface UpdateUserDto {
    fullName?: string;
    email?: string;
    phoneNumber?: string;
};