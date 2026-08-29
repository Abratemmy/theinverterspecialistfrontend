// ============================================================
// NOTIFICATION TYPES
// ============================================================

export type NotificationType =
    | "order"
    | "payment"
    | "promotion"
    | "system"
    | "security";


// ============================================================
// NOTIFICATION
// ============================================================

export interface Notification {

    id: number;

    user_id: number;

    title: string;

    message: string;

    type: NotificationType;

    is_read: boolean;

    created_at: string;

}


// ============================================================
// GET NOTIFICATIONS RESPONSE
// ============================================================

export interface NotificationsResponse {

    success: boolean;

    message: string;

    data: Notification[];

}


// ============================================================
// UNREAD COUNT RESPONSE
// ============================================================

export interface UnreadNotificationCountResponse {

    success: boolean;

    data: {
        count: number;
    };

}