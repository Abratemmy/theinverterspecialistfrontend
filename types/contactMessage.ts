// ============================================================
// CONTACT MESSAGE STATUS
// ============================================================

export type ContactMessageStatus =
    | "new"
    | "read"
    | "replied"
    | "closed";


// ============================================================
// CONTACT MESSAGE
// ============================================================

export interface ContactMessage {

    id: number;

    full_name: string;

    email: string;

    phone: string | null;

    subject: string;

    message: string;

    status: ContactMessageStatus;

    admin_reply: string | null;

    replied_at: string | null;

    created_at: string;

}


// ============================================================
// PAGINATION
// ============================================================

export interface ContactMessagePagination {

    page: number;

    limit: number;

    total: number;

    totalPages: number;

}


// ============================================================
// GET MESSAGES RESPONSE
// ============================================================

export interface ContactMessagesResponse {

    success: boolean;

    message: string;

    data: ContactMessage[];

    pagination: ContactMessagePagination;

}


// ============================================================
// SINGLE MESSAGE
// ============================================================

export interface ContactMessageResponse {

    success: boolean;

    message: string;

    data: ContactMessage;

}


// ============================================================
// UPDATE STATUS
// ============================================================

export interface UpdateContactMessageStatusPayload {

    status: ContactMessageStatus;

}


// ============================================================
// REPLY
// ============================================================

export interface ReplyContactMessagePayload {

    admin_reply: string;

}