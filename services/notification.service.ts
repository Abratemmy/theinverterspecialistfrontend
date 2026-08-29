import api from "@/lib/axios";

import type {
    NotificationsResponse,
    UnreadNotificationCountResponse,
} from "@/types/notification";


// ============================================================
// GET NOTIFICATIONS
// ============================================================

export const getNotifications =
    async (): Promise<NotificationsResponse> => {

        const response =
            await api.get(
                "/notifications"
            );

        return response.data;

    };


// ============================================================
// GET UNREAD COUNT
// ============================================================

export const getUnreadNotificationCount =
    async (): Promise<UnreadNotificationCountResponse> => {

        const response =
            await api.get(
                "/notifications/unread-count"
            );

        return response.data;

    };


// ============================================================
// MARK ONE AS READ
// ============================================================

export const markNotificationAsRead =
    async (
        id: number
    ) => {

        const response =
            await api.patch(
                `/notifications/${id}/read`
            );

        return response.data;

    };


// ============================================================
// MARK ALL AS READ
// ============================================================

export const markAllNotificationsAsRead =
    async () => {

        const response =
            await api.patch(
                "/notifications/read-all"
            );

        return response.data;

    };