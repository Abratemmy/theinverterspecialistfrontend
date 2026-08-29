"use client";

import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import {
    getContactMessages,
    getContactMessageById,
    updateContactMessageStatus,
    replyToContactMessage,
    deleteContactMessage,
} from "@/services/contact.service";

import type {
    UpdateContactMessageStatusPayload,
    ReplyContactMessagePayload,
} from "@/types/contactMessage";


// ============================================================
// QUERY KEY
// ============================================================

export const contactMessagesQueryKey =
    ["admin-contact-messages"];


// ============================================================
// HOOK
// ============================================================

export default function useContactMessages(

    filters?: {

        search?: string;

        status?: string;

        page?: number;

        limit?: number;

    }

) {

    const queryClient =
        useQueryClient();


    // ========================================================
    // GET MESSAGES
    // ========================================================

    const messagesQuery =
        useQuery({

            queryKey: [

                ...contactMessagesQueryKey,

                filters

            ],

            queryFn: () =>
                getContactMessages(
                    filters
                ),

        });


    // ========================================================
    // UPDATE STATUS
    // ========================================================

    const statusMutation =
        useMutation({

            mutationFn: ({

                id,

                payload,

            }: {

                id: number;

                payload:
                    UpdateContactMessageStatusPayload;

            }) =>
                updateContactMessageStatus(
                    id,
                    payload
                ),

            onSuccess: () => {

                queryClient.invalidateQueries({

                    queryKey:
                        contactMessagesQueryKey,

                });

            },

        });


    // ========================================================
    // REPLY
    // ========================================================

    const replyMutation =
        useMutation({

            mutationFn: ({

                id,

                payload,

            }: {

                id: number;

                payload:
                    ReplyContactMessagePayload;

            }) =>
                replyToContactMessage(
                    id,
                    payload
                ),

            onSuccess: () => {

                queryClient.invalidateQueries({

                    queryKey:
                        contactMessagesQueryKey,

                });

            },

        });


    // ========================================================
    // DELETE
    // ========================================================

    const deleteMutation =
        useMutation({

            mutationFn:
                deleteContactMessage,

            onSuccess: () => {

                queryClient.invalidateQueries({

                    queryKey:
                        contactMessagesQueryKey,

                });

            },

        });


    // ========================================================
    // SINGLE MESSAGE
    // ========================================================

    const getSingleMessage =
        async (
            id: number
        ) => {

            return getContactMessageById(
                id
            );

        };


    // ========================================================
    // RETURN
    // ========================================================

    return {

        messages:
            messagesQuery.data?.data ?? [],

        pagination:
            messagesQuery.data?.pagination,

        loadingMessages:
            messagesQuery.isLoading,

        fetchingMessages:
            messagesQuery.isFetching,

        messagesError:
            messagesQuery.error,

        refetchMessages:
            messagesQuery.refetch,


        getContactMessageById:
            getSingleMessage,


        updateContactMessageStatus:
            statusMutation.mutateAsync,

        updatingContactMessageStatus:
            statusMutation.isPending,


        replyToContactMessage:
            replyMutation.mutateAsync,

        replyingToContactMessage:
            replyMutation.isPending,


        deleteContactMessage:
            deleteMutation.mutateAsync,

        deletingContactMessage:
            deleteMutation.isPending,

    };

}