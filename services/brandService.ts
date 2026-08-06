import axios from "@/lib/axios";
import { Brand } from "@/types/brand";

interface BrandResponse {
    success: boolean;
    count: number;
    data: Brand[];
}

export async function getBrands() {
    const { data } = await axios.get<BrandResponse>("/brands");

    return data.data;
}