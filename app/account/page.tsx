"use client";

import {
    useEffect,
    useRef,
    useState,
} from "react";

import {
    Camera,
    Loader2,
    Mail,
    Phone,
    User,
    Save,
    ArrowLeft,
} from "lucide-react";

import { useRouter } from "next/navigation";
import Image from 'next/image';

import { updateProfile } from "@/services/auth.service";

import { showError, showSuccess } from "@/lib/toast";

import api from "@/lib/axios";

import { Header } from "@/components/layout/Header";
import Footer from "@/components/layout/Footer/Footer";


interface UserData {

    id: number;

    first_name: string;

    last_name: string;

    email: string;

    phone?: string | null;

    role: string;

    profile_image?: string | null;

    status: string;

    last_login?: string | null;

    created_at?: string;

}


export default function AccountPage() {

    const router =
        useRouter();


    // ========================================================
    // FILE INPUT
    // ========================================================

    const fileInputRef =
        useRef<HTMLInputElement | null>(
            null
        );


    // ========================================================
    // STATE
    // ========================================================

    const [
        user,
        setUser
    ] = useState<UserData | null>(
        null
    );

    console.log("ÜSER", user)

    const [
        loading,
        setLoading
    ] = useState(true);


    const [
        saving,
        setSaving
    ] = useState(false);


    const [
        firstName,
        setFirstName
    ] = useState("");


    const [
        lastName,
        setLastName
    ] = useState("");


    const [
        phone,
        setPhone
    ] = useState("");


    const [
        selectedImage,
        setSelectedImage
    ] = useState<File | null>(
        null
    );


    const [
        imagePreview,
        setImagePreview
    ] = useState<string | null>(
        null
    );

    // ========================================================
    // GET CURRENT USER
    // ========================================================

    useEffect(() => {

        const getUser =
            async () => {

                try {

                    setLoading(true);


                    const response =
                        await api.get(
                            "/auth/me"
                        );


                    const currentUser =
                        response.data?.data;


                    if (!currentUser) {

                        throw new Error(
                            "Unable to retrieve your account."
                        );

                    }


                    setUser(
                        currentUser
                    );


                    setFirstName(
                        currentUser.first_name || ""
                    );


                    setLastName(
                        currentUser.last_name || ""
                    );


                    setPhone(
                        currentUser.phone || ""
                    );


                    if (
                        currentUser.profile_image
                    ) {

                        setImagePreview(
                            currentUser.profile_image
                        );

                    }

                } catch (error: any) {

                    console.error(
                        "Get account error:",
                        error
                    );


                    showError(
                        error?.response?.data?.message ||
                        "Unable to load your account."
                    );

                } finally {

                    setLoading(false);

                }

            };


        getUser();

    }, []);


    // ========================================================
    // IMAGE SELECTION
    // ========================================================

    const handleImageChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {

        const file =
            event.target.files?.[0];


        if (!file) {
            return;
        }


        // ====================================================
        // VALIDATE TYPE
        // ====================================================

        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp",
        ];


        if (
            !allowedTypes.includes(
                file.type
            )
        ) {

            showError(
                "Only JPG, PNG and WEBP images are allowed."
            );

            return;

        }


        // ====================================================
        // VALIDATE SIZE
        // ====================================================

        if (
            file.size >
            5 * 1024 * 1024
        ) {

            showError(
                "Profile image must not exceed 5MB."
            );

            return;

        }


        setSelectedImage(
            file
        );


        // ====================================================
        // PREVIEW
        // ====================================================

        const previewUrl =
            URL.createObjectURL(
                file
            );


        setImagePreview(
            previewUrl
        );

    };


    // ========================================================
    // SAVE PROFILE
    // ========================================================

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {

        event.preventDefault();


        // ====================================================
        // VALIDATION
        // ====================================================

        if (
            !firstName.trim()
        ) {

            showError(
                "First name is required."
            );

            return;

        }


        if (
            !lastName.trim()
        ) {

            showError(
                "Last name is required."
            );

            return;

        }


        try {

            setSaving(true);


            const response =
                await updateProfile({

                    first_name:
                        firstName.trim(),

                    last_name:
                        lastName.trim(),

                    phone:
                        phone.trim(),

                    profile_image:
                        selectedImage,

                });


            const updatedUser =
                response?.data;


            if (!updatedUser) {

                throw new Error(
                    "Profile update failed."
                );

            }


            setUser(
                updatedUser
            );


            setFirstName(
                updatedUser.first_name || ""
            );


            setLastName(
                updatedUser.last_name || ""
            );


            setPhone(
                updatedUser.phone || ""
            );


            setSelectedImage(
                null
            );


            if (
                updatedUser.profile_image
            ) {

                setImagePreview(
                    updatedUser.profile_image
                );

            }


            showSuccess(
                "Profile updated successfully."
            );


            // Reset file input

            if (
                fileInputRef.current
            ) {

                fileInputRef.current.value =
                    "";

            }

        } catch (error: any) {

            console.error(
                "Update profile error:",
                error
            );


            const backendMessage =
                error?.response?.data?.message;


            showError(
                backendMessage ||
                error?.message ||
                "Unable to update your profile."
            );

        } finally {

            setSaving(false);

        }

    };


    // ========================================================
    // LOADING
    // ========================================================

    if (loading) {

        return (

            <main className="min-h-screen">

                <Header />

                <section className="
                    flex
                    min-h-[60vh]
                    items-center
                    justify-center
                    bg-[var(--color-background)]
                ">

                    <Loader2
                        size={32}
                        className="
                            animate-spin
                            text-primary
                        "
                    />

                </section>

                <Footer />

            </main>

        );

    }


    // ========================================================
    // PAGE
    // ========================================================

    return (

        <main className="min-h-screen">

            <Header />


            <section className="
                min-h-screen
                bg-[var(--color-background)]
                py-10
            ">

                <div className="
                    mx-auto
                    max-w-5xl
                    px-4
                    sm:px-6
                    lg:px-8
                ">


                    {/* ================================================== */}
                    {/* HEADER */}
                    {/* ================================================== */}

                    <div className="
                        mb-8
                        flex
                        flex-col
                        gap-4
                        sm:flex-row
                        sm:items-center
                        sm:justify-between
                    ">

                        <div>

                            <h1 className="
                                text-3xl
                                font-bold
                                text-[var(--color-text)]
                            ">

                                My Account

                            </h1>


                            <p className="
                                mt-2
                                text-[var(--color-text-light)]
                            ">

                                Manage your personal
                                information and profile.

                            </p>

                        </div>


                        <button
                            type="button"
                            onClick={() =>
                                router.back()
                            }
                            className="
                                inline-flex
                                items-center
                                gap-2
                                self-start
                                rounded-xl
                                border
                                border-gray-200
                                bg-white
                                px-4
                                py-2.5
                                text-sm
                                font-semibold
                                text-gray-700
                                transition
                                hover:border-primary
                                hover:text-primary
                            "
                        >

                            <ArrowLeft
                                size={17}
                            />

                            Back

                        </button>

                    </div>


                    {/* ================================================== */}
                    {/* GRID */}
                    {/* ================================================== */}

                    <div className="
                        grid
                        gap-6
                        lg:grid-cols-[280px_1fr]
                    ">


                        {/* ================================================== */}
                        {/* PROFILE CARD */}
                        {/* ================================================== */}

                        <aside className="
                            rounded-2xl
                            bg-white
                            p-6
                            shadow-sm
                        ">

                            <div className="
                                flex
                                flex-col
                                items-center
                                text-center
                            ">


                                {/* PROFILE IMAGE */}

                                <div className="
                                    relative
                                    h-32
                                    w-32
                                ">
                                    
                                    <div className="
                                        relative
                                        h-32
                                        w-32
                                        overflow-hidden
                                        rounded-full
                                        border-4
                                        border-[var(--color-primary)]
                                        bg-primary/10
                                    ">

                                        {imagePreview ? (
                                            
                                            <Image
                                                src={
                                                    imagePreview.startsWith("blob:")
                                                        ? imagePreview
                                                        : imagePreview.startsWith("http")
                                                            ? imagePreview
                                                            : `${api.defaults.baseURL}${imagePreview}`
                                                }
                                                alt="Profile"
                                                fill
                                                sizes="128px"
                                                unoptimized
                                                className="object-cover"
                                            />

                                        ) : (

                                            <div className="
                                                flex
                                                h-full
                                                w-full
                                                items-center
                                                justify-center
                                                text-primary
                                            ">

                                                <User size={52} />

                                            </div>

                                        )}

                                    </div>


                                    {/* CAMERA BUTTON */}

                                    <button
                                        type="button"
                                        onClick={() =>
                                            fileInputRef.current?.click()
                                        }
                                        className="
                                            absolute
                                            bottom-1
                                            right-1
                                            flex
                                            h-10
                                            w-10
                                            items-center
                                            justify-center
                                            rounded-full
                                            bg-primary
                                            text-white
                                            shadow-md
                                            transition
                                            hover:bg-[var(--color-primary-dark)]
                                        "
                                        aria-label="Change profile image"
                                    >

                                        <Camera size={18} />

                                    </button>


                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="
                                            image/jpeg,
                                            image/png,
                                            image/webp
                                        "
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />

                                </div>


                                {/* NAME */}

                                <h2 className="
                                    mt-5
                                    text-xl
                                    font-bold
                                    text-[var(--color-text)]
                                ">

                                    {user?.first_name}{" "}
                                    {user?.last_name}

                                </h2>


                                {/* EMAIL */}

                                <p className="
                                    mt-1
                                    break-all
                                    text-sm
                                    text-[var(--color-text-light)]
                                ">

                                    {user?.email}

                                </p>


                                {/* ROLE */}

                                <span className="
                                    mt-4
                                    rounded-full
                                    bg-primary/10
                                    px-3
                                    py-1
                                    text-xs
                                    font-semibold
                                    capitalize
                                    text-primary
                                ">

                                    {user?.role}

                                </span>


                                <p className="
                                    mt-5
                                    text-xs
                                    leading-5
                                    text-gray-400
                                ">

                                    JPG, PNG or WEBP
                                    <br />
                                    Maximum 5MB

                                </p>

                            </div>

                        </aside>


                        {/* ================================================== */}
                        {/* PROFILE FORM */}
                        {/* ================================================== */}

                        <section className="
                            rounded-2xl
                            bg-white
                            p-6
                            shadow-sm
                            sm:p-8
                        ">

                            <div className="
                                mb-7
                            ">

                                <h2 className="
                                    text-xl
                                    font-semibold
                                    text-[var(--color-text)]
                                ">

                                    Personal Information

                                </h2>


                                <p className="
                                    mt-1
                                    text-sm
                                    text-[var(--color-text-light)]
                                ">

                                    Update your personal
                                    information below.

                                </p>

                            </div>


                            <form
                                onSubmit={
                                    handleSubmit
                                }
                                className="
                                    space-y-6
                                "
                            >


                                {/* NAME */}

                                <div className="
                                    grid
                                    gap-5
                                    sm:grid-cols-2
                                ">

                                    {/* FIRST NAME */}

                                    <div>

                                        <label className="
                                            mb-2
                                            block
                                            text-sm
                                            font-semibold
                                            text-gray-700
                                        ">

                                            First Name

                                        </label>


                                        <input
                                            type="text"
                                            value={
                                                firstName
                                            }
                                            onChange={(
                                                event
                                            ) =>
                                                setFirstName(
                                                    event.target.value
                                                )
                                            }
                                            className="
                                                h-12
                                                w-full
                                                rounded-xl
                                                border
                                                border-gray-200
                                                px-4
                                                text-sm
                                                outline-none
                                                transition
                                                focus:border-primary
                                                focus:ring-2
                                                focus:ring-primary/10
                                            "
                                            placeholder="
                                                Enter your first name
                                            "
                                        />

                                    </div>


                                    {/* LAST NAME */}

                                    <div>

                                        <label className="
                                            mb-2
                                            block
                                            text-sm
                                            font-semibold
                                            text-gray-700
                                        ">

                                            Last Name

                                        </label>


                                        <input
                                            type="text"
                                            value={
                                                lastName
                                            }
                                            onChange={(
                                                event
                                            ) =>
                                                setLastName(
                                                    event.target.value
                                                )
                                            }
                                            className="
                                                h-12
                                                w-full
                                                rounded-xl
                                                border
                                                border-gray-200
                                                px-4
                                                text-sm
                                                outline-none
                                                transition
                                                focus:border-primary
                                                focus:ring-2
                                                focus:ring-primary/10
                                            "
                                            placeholder="
                                                Enter your last name
                                            "
                                        />

                                    </div>

                                </div>


                                {/* EMAIL */}

                                <div>

                                    <label className="
                                        mb-2
                                        block
                                        text-sm
                                        font-semibold
                                        text-gray-700
                                    ">

                                        Email Address

                                    </label>


                                    <div className="
                                        relative
                                    ">

                                        <Mail
                                            size={18}
                                            className="
                                                absolute
                                                left-4
                                                top-1/2
                                                -translate-y-1/2
                                                text-gray-400
                                            "
                                        />


                                        <input
                                            type="email"
                                            value={
                                                user?.email || ""
                                            }
                                            readOnly
                                            className="
                                                h-12
                                                w-full
                                                rounded-xl
                                                border
                                                border-gray-200
                                                bg-gray-50
                                                pl-11
                                                pr-4
                                                text-sm
                                                text-gray-500
                                                outline-none
                                                cursor-not-allowed
                                            "
                                        />

                                    </div>


                                    <p className="
                                        mt-2
                                        text-xs
                                        text-gray-400
                                    ">

                                        Your email address
                                        cannot be changed here.

                                    </p>

                                </div>


                                {/* PHONE */}

                                <div>

                                    <label className="
                                        mb-2
                                        block
                                        text-sm
                                        font-semibold
                                        text-gray-700
                                    ">

                                        Phone Number

                                    </label>


                                    <div className="
                                        relative
                                    ">

                                        <Phone
                                            size={18}
                                            className="
                                                absolute
                                                left-4
                                                top-1/2
                                                -translate-y-1/2
                                                text-gray-400
                                            "
                                        />


                                        <input
                                            type="tel"
                                            value={
                                                phone
                                            }
                                            onChange={(
                                                event
                                            ) =>
                                                setPhone(
                                                    event.target.value
                                                )
                                            }
                                            className="
                                                h-12
                                                w-full
                                                rounded-xl
                                                border
                                                border-gray-200
                                                pl-11
                                                pr-4
                                                text-sm
                                                outline-none
                                                transition
                                                focus:border-primary
                                                focus:ring-2
                                                focus:ring-primary/10
                                            "
                                            placeholder="
                                                Enter your phone number
                                            "
                                        />

                                    </div>

                                </div>


                                {/* SAVE */}

                                <div className="
                                    flex
                                    justify-end
                                    border-t
                                    border-gray-100
                                    pt-6
                                ">

                                    <button
                                        type="submit"
                                        disabled={
                                            saving
                                        }
                                        className="
                                            inline-flex
                                            min-w-[160px]
                                            items-center
                                            justify-center
                                            gap-2
                                            rounded-xl
                                            bg-primary
                                            px-6
                                            py-3
                                            font-semibold
                                            text-white
                                            transition
                                            hover:bg-[var(--color-primary-dark)]
                                            disabled:cursor-not-allowed
                                            disabled:bg-gray-400
                                        "
                                    >

                                        {saving ? (

                                            <>

                                                <Loader2
                                                    size={19}
                                                    className="
                                                        animate-spin
                                                    "
                                                />

                                                Saving...

                                            </>

                                        ) : (

                                            <>

                                                <Save
                                                    size={18}
                                                />

                                                Save Changes

                                            </>

                                        )}

                                    </button>

                                </div>

                            </form>

                        </section>

                    </div>

                </div>

            </section>


            <Footer />

        </main>

    );

}