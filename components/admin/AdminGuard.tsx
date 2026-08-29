"use client";

import {
    useEffect,
    useState
} from "react";

import {
    usePathname,
    useRouter
} from "next/navigation";

import api from "@/lib/axios";


export default function AdminGuard({
    children
}: {
    children: React.ReactNode;
}) {

    const router =
        useRouter();

    const pathname =
        usePathname();


    const [
        checkingAuth,
        setCheckingAuth
    ] = useState(true);


    useEffect(() => {

        let mounted = true;


        const checkAdminAccess =
            async () => {

                try {

                    const response =
                        await api.get(
                            "/auth/me"
                        );


                    const user =
                        response.data?.data;


                    // ====================================================
                    // ONLY ADMIN AND MANAGER CAN ACCESS ADMIN DASHBOARD
                    // ====================================================

                    if (
                        user?.role !== "admin" &&
                        user?.role !== "manager"
                    ) {

                        router.replace("/");

                        return;

                    }


                    if (mounted) {

                        setCheckingAuth(false);

                    }

                }
                catch (error) {

                    console.error(
                        "Admin authentication error:",
                        error
                    );


                    router.replace("/");

                }

            };


        checkAdminAccess();


        return () => {

            mounted = false;

        };

    }, [
        router,
        pathname
    ]);


    if (checkingAuth) {

        return (

            <div className="
                flex
                min-h-screen
                items-center
                justify-center
                bg-gray-50
            ">

                <div className="
                    text-sm
                    text-gray-500
                ">

                    Checking access...

                </div>

            </div>

        );

    }


    return children;

}