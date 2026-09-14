"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { logout } from "@/services/auth.service";

import { showError, showSuccess } from "@/lib/toast";


export default function useAdminLogout() {

    const router = useRouter();

    const [
        loggingOut,
        setLoggingOut,
    ] = useState(false);


    const handleLogout = async () => {

        if (loggingOut) {
            return;
        }


        try {

            setLoggingOut(true);


            await logout();


            showSuccess(
                "Logged out successfully."
            );


            router.replace(
                "/"
            );

            router.refresh();

        }
        catch (error: unknown) {

            console.error(
                "Logout error:",
                error
            );


            showError(
                "Unable to logout. Please try again."
            );

        }
        finally {

            setLoggingOut(false);

        }

    };


    return {
        handleLogout,
        loggingOut,
    };

}
