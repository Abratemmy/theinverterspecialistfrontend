import api from "@/lib/axios";


// ========================================================
// TYPES
// ========================================================

export interface ContactMessageData {
    full_name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
}


// ========================================================
// SEND CONTACT MESSAGE
// ========================================================

export const sendContactMessage = async (
    data: ContactMessageData
) => {

    const response =
        await api.post(
            "/contact",
            data
        );

    return response.data;
};

// admin

import type {
    ContactMessagesResponse,
    ContactMessageResponse,
    UpdateContactMessageStatusPayload,
    ReplyContactMessagePayload,
} from "@/types/contactMessage";


// ============================================================
// GET CONTACT MESSAGES
// ============================================================

export const getContactMessages = async (

    params?: {

        search?: string;

        status?: string;

        page?: number;

        limit?: number;

    }

): Promise<ContactMessagesResponse> => {

    const response =
        await api.get(
            "/admin/contact-messages",
            {
                params
            }
        );


    return response.data;

};


// ============================================================
// GET SINGLE MESSAGE
// ============================================================

export const getContactMessageById =
    async (
        id: number
    ): Promise<ContactMessageResponse> => {

        const response =
            await api.get(
                `/admin/contact-messages/${id}`
            );


        return response.data;

    };


// ============================================================
// UPDATE STATUS
// ============================================================

export const updateContactMessageStatus =
    async (

        id: number,

        payload:
            UpdateContactMessageStatusPayload

    ) => {

        const response =
            await api.patch(

                `/admin/contact-messages/${id}/status`,

                payload

            );


        return response.data;

    };


// ============================================================
// REPLY
// ============================================================

export const replyToContactMessage =
    async (

        id: number,

        payload:
            ReplyContactMessagePayload

    ) => {

        const response =
            await api.patch(

                `/admin/contact-messages/${id}/reply`,

                payload

            );


        return response.data;

    };


// ============================================================
// DELETE
// ============================================================

export const deleteContactMessage =
    async (
        id: number
    ) => {

        const response =
            await api.delete(

                `/admin/contact-messages/${id}`

            );


        return response.data;

    };