import api from "@/lib/axios";


export interface LoginData {

    email: string;

    password: string;

}


export interface RegisterData {

    first_name: string;

    last_name: string;

    email: string;

    phone?: string;

    password: string;

}


export interface User {

    id: number;

    first_name: string;

    last_name: string;

    email: string;

    phone?: string;

    role: string;

    profile_image?: string | null;

    status: string;

    last_login?: string;

    created_at?: string;

}


// ============================================================
// LOGIN
// ============================================================

export const login =
    async (
        data: LoginData
    ) => {

        const response =
            await api.post(
                "/auth/login",
                data
            );


        return response.data;

    };


// ============================================================
// REGISTER
// ============================================================

export const register =
    async (
        data: RegisterData
    ) => {

        const response =
            await api.post(
                "/auth/register",
                data
            );


        return response.data;

    };


// ============================================================
// LOGOUT
// ============================================================

export const logout =
    async () => {

        const response =
            await api.post(
                "/auth/logout"
            );


        return response.data;

    };


// ============================================================
// CURRENT USER
// ============================================================

export const getCurrentUser =
    async (): Promise<User> => {

        const response =
            await api.get(
                "/auth/me"
            );


        return response.data.data;

    };


// ============================================================
// CHECK AUTH
// ============================================================

export const checkAuth =
    async () => {

        try {

            const response =
                await api.get(
                    "/auth/check"
                );


            return response.data;

        } catch {

            return {

                success:
                    false,

                authenticated:
                    false

            };

        }

    };

// ============================================================
// UPDATE PROFILE
// ============================================================

export interface UpdateProfileData {
    first_name: string;
    last_name: string;
    phone?: string;
    profile_image?: File | null;
}

export const updateProfile = async (
    profileData: UpdateProfileData
) => {

    const formData = new FormData();

    formData.append(
        "first_name",
        profileData.first_name
    );

    formData.append(
        "last_name",
        profileData.last_name
    );

    formData.append(
        "phone",
        profileData.phone || ""
    );

    if (profileData.profile_image) {

        formData.append(
            "profile_image",
            profileData.profile_image
        );

    }


    // ========================================================
    // UPLOAD PROFILE
    // ========================================================

    const baseURL =
        api.defaults.baseURL;


    if (!baseURL) {

        throw new Error(
            "API base URL is not configured."
        );

    }


    const response =
        await fetch(
            `${baseURL}/auth/profile`,
            {
                method: "PUT",

                credentials: "include",

                body: formData,
            }
        );


    // ========================================================
    // READ RESPONSE
    // ========================================================

    const data =
        await response.json();


    // ========================================================
    // HANDLE ERROR
    // ========================================================

    if (!response.ok) {

        throw new Error(
            data?.message ||
            "Unable to update profile."
        );

    }


    return data;
};