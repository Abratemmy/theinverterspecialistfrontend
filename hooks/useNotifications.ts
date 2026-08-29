"use client";

import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import {
    getNotifications,
    getUnreadNotificationCount,
    markNotificationAsRead,
    markAllNotificationsAsRead,
} from "@/services/notification.service";


// ============================================================
// QUERY KEYS
// ============================================================

export const notificationsQueryKey =
    ["notifications"];

export const unreadNotificationsQueryKey =
    ["notifications", "unread-count"];


// ============================================================
// HOOK
// ============================================================

export default function useNotifications() {

    const queryClient =
        useQueryClient();


    // ========================================================
    // GET NOTIFICATIONS
    // ========================================================

    const notificationsQuery =
        useQuery({

            queryKey:
                notificationsQueryKey,

            queryFn:
                getNotifications,

            refetchInterval:
                30000,

        });


    // ========================================================
    // GET UNREAD COUNT
    // ========================================================

    const unreadCountQuery =
        useQuery({

            queryKey:
                unreadNotificationsQueryKey,

            queryFn:
                getUnreadNotificationCount,

            refetchInterval:
                30000,

        });


    // ========================================================
    // MARK ONE AS READ
    // ========================================================

    const markAsReadMutation =
        useMutation({

            mutationFn:
                markNotificationAsRead,

            onSuccess: () => {

                queryClient.invalidateQueries({

                    queryKey:
                        notificationsQueryKey,

                });

                queryClient.invalidateQueries({

                    queryKey:
                        unreadNotificationsQueryKey,

                });

            },

        });


    // ========================================================
    // MARK ALL AS READ
    // ========================================================

    const markAllAsReadMutation =
        useMutation({

            mutationFn:
                markAllNotificationsAsRead,

            onSuccess: () => {

                queryClient.invalidateQueries({

                    queryKey:
                        notificationsQueryKey,

                });

                queryClient.invalidateQueries({

                    queryKey:
                        unreadNotificationsQueryKey,

                });

            },

        });


    // ========================================================
    // RETURN
    // ========================================================

    return {

        notifications:
            notificationsQuery.data?.data ?? [],

        loadingNotifications:
            notificationsQuery.isLoading,

        fetchingNotifications:
            notificationsQuery.isFetching,

        notificationsError:
            notificationsQuery.error,

        refetchNotifications:
            notificationsQuery.refetch,


        unreadCount:
            unreadCountQuery.data?.data?.count ?? 0,

        loadingUnreadCount:
            unreadCountQuery.isLoading,


        markNotificationAsRead:
            markAsReadMutation.mutateAsync,

        markingNotificationAsRead:
            markAsReadMutation.isPending,


        markAllNotificationsAsRead:
            markAllAsReadMutation.mutateAsync,

        markingAllNotificationsAsRead:
            markAllAsReadMutation.isPending,

    };

}