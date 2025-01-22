"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AuthMiddleware = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const isAuthenticated = typeof window !== "undefined" && localStorage.getItem("token");

    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/login");
        }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) {
        return null;
    }

    return <>{ children }</>
};

export default AuthMiddleware;