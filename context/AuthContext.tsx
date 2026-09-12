// context/AuthContext.tsx
'use client'

import { createContext, useContext, useEffect, useState } from "react";
import api from "@/lib/api"; // همون فایل axios که با withCredentials ساختی
import { useRouter } from "next/navigation";
import AppToast from "@/lib/toast";

type User = {
    username: string;
    roles: string[];
    email?: string;
    phoneNumber?: string;
    fullName?: string;
    address?: string;
} | null;

type AuthContextType = {
    user: User;
    loading: boolean;
    login: (username: string, password: string) => Promise<void>;
    register: (username: string, email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    login: async () => { },
    register: async () => { },
    logout: async () => { },
    refreshUser: async () => { },
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    // 🔍 بار اول لود شدن اپ، چک می‌کنیم کاربر لاگین هست یا نه
    useEffect(() => {
        refreshUser().finally(() => setLoading(false));
    }, []);

    // 🟢 لاگین
    const login = async (username: string, password: string) => {

        //setLoading(true);

        try {
            await api.post("/account/login", {
                username,
                password
            });

            // بعد از لاگین موفق، اطلاعات کاربر رو می‌گیریم
            const { data } = await api.get("/account/me");

            setUser(data);

            // هدایت بر اساس نقش کاربر
            if (data.roles?.includes("Admin")) {
                router.push("/admin");
            } else {
                router.push("/profile");
            }
        }
        finally {
            console.log("finally");
            //setLoading(false)
        }
    };

    // 🆕 ثبت‌نام
    const register = async (username: string, email: string, password: string) => {
        await api.post("/account/register", { username, email, password });
        // بعد از ثبت نام، لاگینش می‌کنیم
        await login(username, password);
    };

    // 🔴 خروج
    const logout = async () => {
        try {
            await api.post("/account/logout");
            AppToast.success("بای بای 👋")
        } finally {
            setUser(null);
            router.replace("/");
        }
    };

    const refreshUser = async () => {
        try {
            const { data } = await api.get("/account/me");
            setUser(data);
        } catch {
            setUser(null);
        }
    }

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            login,
            register,
            logout,
            refreshUser
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);