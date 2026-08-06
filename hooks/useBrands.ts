"use client";

import { useEffect, useState } from "react";

import { Brand } from "@/types/brand";
import { getBrands } from "@/services/brandService";

export default function useBrands() {
    const [brands, setBrands] = useState<Brand[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchBrands() {
            try {
                const data = await getBrands();
                setBrands(data);
            } catch (err) {
                console.error(err);
                setError("Unable to load brands.");
            } finally {
                setLoading(false);
            }
        }

        fetchBrands();
    }, []);

    return {
        brands,
        loading,
        error,
    };
}