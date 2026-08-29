"use client";

import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import {
    register,
    login,
    logout,
    getCurrentUser,
} from "@/services/auth.service";

import type {
    LoginPayload,
    RegisterPayload,
} from "@/types/auth";

export default function useAuth() {

    const queryClient =
        useQueryClient();


    // ========================================================
    // CURRENT USER
    // ========================================================

    const userQuery = useQuery({

        queryKey: ["auth", "user"],

        queryFn: getCurrentUser,

        retry: false,

        staleTime:
            5 * 60 * 1000,

    });


    // ========================================================
    // REGISTER
    // ========================================================

    const registerMutation =
        useMutation({

            mutationFn: (
                payload: RegisterPayload
            ) =>
                register(payload),

            onSuccess: () => {

                queryClient.invalidateQueries({
                    queryKey: [
                        "auth",
                        "user",
                    ],
                });

            },

        });


    // ========================================================
    // LOGIN
    // ========================================================

    const loginMutation =
        useMutation({

            mutationFn: (
                payload: LoginPayload
            ) =>
                login(payload),

            onSuccess: () => {

                queryClient.invalidateQueries({
                    queryKey: [
                        "auth",
                        "user",
                    ],
                });

            },

        });


    // ========================================================
    // LOGOUT
    // ========================================================

    const logoutMutation = useMutation({
        mutationFn: logout,

        onSuccess: () => {
            // Remove authenticated user data
            queryClient.removeQueries({
                queryKey: ["auth"],
            });

            // Remove the cart belonging to the logged-in user
            queryClient.removeQueries({
                queryKey: ["cart"],
            });
        },
    });


    return {

        // User
        user:
            userQuery.data ?? null,

        loading:
            userQuery.isLoading,

        isAuthenticated:
            !!userQuery.data,

        authError:
            userQuery.error,

        refetchUser:
            userQuery.refetch,


        // Register
        register:
            registerMutation.mutateAsync,

        registering:
            registerMutation.isPending,

        registerError:
            registerMutation.error,


        // Login
        login:
            loginMutation.mutateAsync,

        loggingIn:
            loginMutation.isPending,

        loginError:
            loginMutation.error,


        // Logout
        logout:
            logoutMutation.mutateAsync,

        loggingOut:
            logoutMutation.isPending,

        logoutError:
            logoutMutation.error,

    };
}