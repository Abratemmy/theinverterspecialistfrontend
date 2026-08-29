// services/wishlist.service.ts

import api from "@/lib/axios";


// ========================================================
// ADD TO WISHLIST
// ========================================================

export const addToWishlist = async (
    productId: number
) => {

    const { data } =
        await api.post(
            `/wishlist/${productId}`
        );

    return data;

};


// ========================================================
// REMOVE FROM WISHLIST
// ========================================================

export const removeFromWishlist = async (
    productId: number
) => {

    const { data } =
        await api.delete(
            `/wishlist/${productId}`
        );

    return data;

};


// ========================================================
// GET USER WISHLIST
// ========================================================

export const getWishlist = async () => {

    const { data } =
        await api.get(
            "/wishlist"
        );

    return data;

};


// ========================================================
// CHECK PRODUCT
// ========================================================

export const checkWishlist = async (
    productId: number
) => {

    const { data } =
        await api.get(
            `/wishlist/check/${productId}`
        );

    return data;

};