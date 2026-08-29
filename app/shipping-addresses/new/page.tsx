"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
ArrowLeft,
Loader2,
MapPin,
Save,
} from "lucide-react";

import axios from "axios";

import { Header } from "@/components/layout/Header";
import Footer from "@/components/layout/Footer/Footer";
import { showError, showSuccess } from "@/lib/toast";

export default function NewShippingAddressPage() {


const router = useRouter();
const searchParams = useSearchParams();

// ============================================================
// REDIRECT
// ============================================================

const redirect =
    searchParams.get("redirect") ||
    "/shipping-addresses";


// ============================================================
// FORM STATE
// ============================================================

const [
    fullName,
    setFullName
] = useState("");

const [
    phone,
    setPhone
] = useState("");

const [
    addressLine1,
    setAddressLine1
] = useState("");

const [
    addressLine2,
    setAddressLine2
] = useState("");

const [
    city,
    setCity
] = useState("");

const [
    state,
    setState
] = useState("");

const [
    country,
    setCountry
] = useState("Nigeria");

const [
    postalCode,
    setPostalCode
] = useState("");

const [
    addressType,
    setAddressType
] = useState<
    "home" | "office" | "other"
>("home");

const [
    isDefault,
    setIsDefault
] = useState(false);


// ============================================================
// LOADING
// ============================================================

const [
    saving,
    setSaving
] = useState(false);


// ============================================================
// SUBMIT
// ============================================================

const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
) => {

    event.preventDefault();


    // ========================================================
    // FRONTEND VALIDATION
    // ========================================================

    if (!fullName.trim()) {

        showError(
            "Please enter the full name."
        );

        return;
    }


    if (!phone.trim()) {

        showError(
            "Please enter a phone number."
        );

        return;
    }


    if (!addressLine1.trim()) {

        showError(
            "Please enter your address."
        );

        return;
    }


    if (!city.trim()) {

        showError(
            "Please enter your city."
        );

        return;
    }


    if (!state.trim()) {

        showError(
            "Please enter your state."
        );

        return;
    }


    if (!country.trim()) {

        showError(
            "Please enter your country."
        );

        return;
    }


    try {

        setSaving(true);


        // ====================================================
        // CREATE SHIPPING ADDRESS
        // ====================================================

        const response =
            await axios.post(

                `${
                    process.env
                        .NEXT_PUBLIC_API_URL
                }/shipping-addresses`,

                {

                    full_name:
                        fullName.trim(),

                    phone:
                        phone.trim(),

                    address_line_1:
                        addressLine1.trim(),

                    address_line_2:
                        addressLine2.trim() ||
                        null,

                    city:
                        city.trim(),

                    state:
                        state.trim(),

                    country:
                        country.trim(),

                    postal_code:
                        postalCode.trim() ||
                        null,

                    address_type:
                        addressType,

                    is_default:
                        isDefault

                },

                {

                    // Important because your
                    // authentication uses cookies.
                    withCredentials:
                        true

                }

            );


        // ====================================================
        // SUCCESS
        // ====================================================

        if (
            response.data?.success
        ) {

            showSuccess(
                "Shipping address added successfully."
            );


            // Small delay so the toast
            // can be seen before navigation.
            setTimeout(() => {

                router.push(
                    redirect
                );

            }, 300);


            return;

        }


        showError(
            response.data?.message ||
            "Unable to add shipping address."
        );

    }
    catch (error: any) {

        console.error(
            "Create shipping address error:",
            error
        );


        // ====================================================
        // BACKEND RESPONSE
        // ====================================================

        const backendData =
            error?.response?.data;


        // ====================================================
        // VALIDATION ERRORS
        // ====================================================

        const validationMessage =
            backendData?.errors
                ?.map(
                    (item: any) =>
                        item.msg
                )
                ?.join(", ");


        // ====================================================
        // ERROR MESSAGE
        // ====================================================

        const message =
            validationMessage ||
            backendData?.message ||
            error?.message ||
            "Unable to add shipping address.";


        showError(
            message
        );

    }
    finally {

        setSaving(false);

    }

};


// ============================================================
// CANCEL
// ============================================================

const handleCancel = () => {

    router.push(
        redirect
    );

};


// ============================================================
// PAGE
// ============================================================

return (

    <main className="min-h-screen">

        <Header />

        <section
            className="
                min-h-screen
                bg-[var(--color-background)]
                py-10
            "
        >

            <div
                className="
                    mx-auto
                    max-w-4xl
                    px-4
                    sm:px-6
                    lg:px-8
                "
            >

                {/* ================================================== */}
                {/* BACK */}
                {/* ================================================== */}

                <button
                    type="button"
                    onClick={
                        handleCancel
                    }
                    className="
                        mb-6
                        flex
                        items-center
                        gap-2
                        text-sm
                        font-medium
                        text-[var(--color-text-light)]
                        transition
                        hover:text-primary
                    "
                >

                    <ArrowLeft
                        size={18}
                    />

                    Back

                </button>


                {/* ================================================== */}
                {/* PAGE HEADER */}
                {/* ================================================== */}

                <div className="mb-8">

                    <div
                        className="
                            flex
                            items-center
                            gap-4
                        "
                    >

                        <div
                            className="
                                flex
                                h-14
                                w-14
                                shrink-0
                                items-center
                                justify-center
                                rounded-2xl
                                bg-primary/10
                                text-primary
                            "
                        >

                            <MapPin
                                size={28}
                            />

                        </div>


                        <div>

                            <h1
                                className="
                                    text-3xl
                                    font-bold
                                    text-[var(--color-text)]
                                "
                            >
                                Add Shipping Address
                            </h1>

                            <p
                                className="
                                    mt-1
                                    text-sm
                                    text-[var(--color-text-light)]
                                "
                            >
                                Add an address where your
                                order can be delivered.
                            </p>

                        </div>

                    </div>

                </div>


                {/* ================================================== */}
                {/* FORM */}
                {/* ================================================== */}

                <form
                    onSubmit={
                        handleSubmit
                    }
                    className="
                        rounded-2xl
                        bg-white
                        p-6
                        shadow-sm
                        sm:p-8
                    "
                >

                    <div
                        className="
                            grid
                            gap-6
                        "
                    >

                        {/* ================================================== */}
                        {/* FULL NAME */}
                        {/* ================================================== */}

                        <div>

                            <label
                                htmlFor="full_name"
                                className="
                                    mb-2
                                    block
                                    text-sm
                                    font-semibold
                                    text-[var(--color-text)]
                                "
                            >
                                Full Name
                                <span className="text-red-500">
                                    {" "}*
                                </span>
                            </label>

                            <input
                                id="full_name"
                                type="text"
                                value={
                                    fullName
                                }
                                onChange={(event) =>
                                    setFullName(
                                        event.target.value
                                    )
                                }
                                placeholder="Enter recipient's full name"
                                autoComplete="name"
                                className="
                                    w-full
                                    rounded-xl
                                    border
                                    border-gray-300
                                    px-4
                                    py-3
                                    text-sm
                                    outline-none
                                    transition
                                    focus:border-primary
                                    focus:ring-2
                                    focus:ring-primary/20
                                "
                                disabled={
                                    saving
                                }
                            />

                        </div>


                        {/* ================================================== */}
                        {/* PHONE */}
                        {/* ================================================== */}

                        <div>

                            <label
                                htmlFor="phone"
                                className="
                                    mb-2
                                    block
                                    text-sm
                                    font-semibold
                                    text-[var(--color-text)]
                                "
                            >
                                Phone Number
                                <span className="text-red-500">
                                    {" "}*
                                </span>
                            </label>

                            <input
                                id="phone"
                                type="tel"
                                value={
                                    phone
                                }
                                onChange={(event) =>
                                    setPhone(
                                        event.target.value
                                    )
                                }
                                placeholder="08012345678"
                                autoComplete="tel"
                                className="
                                    w-full
                                    rounded-xl
                                    border
                                    border-gray-300
                                    px-4
                                    py-3
                                    text-sm
                                    outline-none
                                    transition
                                    focus:border-primary
                                    focus:ring-2
                                    focus:ring-primary/20
                                "
                                disabled={
                                    saving
                                }
                            />

                        </div>


                        {/* ================================================== */}
                        {/* ADDRESS LINE 1 */}
                        {/* ================================================== */}

                        <div>

                            <label
                                htmlFor="address_line_1"
                                className="
                                    mb-2
                                    block
                                    text-sm
                                    font-semibold
                                    text-[var(--color-text)]
                                "
                            >
                                Address
                                <span className="text-red-500">
                                    {" "}*
                                </span>
                            </label>

                            <input
                                id="address_line_1"
                                type="text"
                                value={
                                    addressLine1
                                }
                                onChange={(event) =>
                                    setAddressLine1(
                                        event.target.value
                                    )
                                }
                                placeholder="House number and street address"
                                autoComplete="address-line1"
                                className="
                                    w-full
                                    rounded-xl
                                    border
                                    border-gray-300
                                    px-4
                                    py-3
                                    text-sm
                                    outline-none
                                    transition
                                    focus:border-primary
                                    focus:ring-2
                                    focus:ring-primary/20
                                "
                                disabled={
                                    saving
                                }
                            />

                        </div>


                        {/* ================================================== */}
                        {/* ADDRESS LINE 2 */}
                        {/* ================================================== */}

                        <div>

                            <label
                                htmlFor="address_line_2"
                                className="
                                    mb-2
                                    block
                                    text-sm
                                    font-semibold
                                    text-[var(--color-text)]
                                "
                            >
                                Apartment / Suite / Landmark
                                <span
                                    className="
                                        ml-1
                                        font-normal
                                        text-gray-400
                                    "
                                >
                                    Optional
                                </span>
                            </label>

                            <input
                                id="address_line_2"
                                type="text"
                                value={
                                    addressLine2
                                }
                                onChange={(event) =>
                                    setAddressLine2(
                                        event.target.value
                                    )
                                }
                                placeholder="Apartment, suite, floor or landmark"
                                autoComplete="address-line2"
                                className="
                                    w-full
                                    rounded-xl
                                    border
                                    border-gray-300
                                    px-4
                                    py-3
                                    text-sm
                                    outline-none
                                    transition
                                    focus:border-primary
                                    focus:ring-2
                                    focus:ring-primary/20
                                "
                                disabled={
                                    saving
                                }
                            />

                        </div>


                        {/* ================================================== */}
                        {/* CITY / STATE */}
                        {/* ================================================== */}

                        <div
                            className="
                                grid
                                gap-6
                                sm:grid-cols-2
                            "
                        >

                            {/* CITY */}

                            <div>

                                <label
                                    htmlFor="city"
                                    className="
                                        mb-2
                                        block
                                        text-sm
                                        font-semibold
                                        text-[var(--color-text)]
                                    "
                                >
                                    City
                                    <span className="text-red-500">
                                        {" "}*
                                    </span>
                                </label>

                                <input
                                    id="city"
                                    type="text"
                                    value={
                                        city
                                    }
                                    onChange={(event) =>
                                        setCity(
                                            event.target.value
                                        )
                                    }
                                    placeholder="e.g. Lagos"
                                    autoComplete="address-level2"
                                    className="
                                        w-full
                                        rounded-xl
                                        border
                                        border-gray-300
                                        px-4
                                        py-3
                                        text-sm
                                        outline-none
                                        transition
                                        focus:border-primary
                                        focus:ring-2
                                        focus:ring-primary/20
                                    "
                                    disabled={
                                        saving
                                    }
                                />

                            </div>


                            {/* STATE */}

                            <div>

                                <label
                                    htmlFor="state"
                                    className="
                                        mb-2
                                        block
                                        text-sm
                                        font-semibold
                                        text-[var(--color-text)]
                                    "
                                >
                                    State
                                    <span className="text-red-500">
                                        {" "}*
                                    </span>
                                </label>

                                <input
                                    id="state"
                                    type="text"
                                    value={
                                        state
                                    }
                                    onChange={(event) =>
                                        setState(
                                            event.target.value
                                        )
                                    }
                                    placeholder="e.g. Lagos State"
                                    autoComplete="address-level1"
                                    className="
                                        w-full
                                        rounded-xl
                                        border
                                        border-gray-300
                                        px-4
                                        py-3
                                        text-sm
                                        outline-none
                                        transition
                                        focus:border-primary
                                        focus:ring-2
                                        focus:ring-primary/20
                                    "
                                    disabled={
                                        saving
                                    }
                                />

                            </div>

                        </div>


                        {/* ================================================== */}
                        {/* COUNTRY / POSTAL CODE */}
                        {/* ================================================== */}

                        <div
                            className="
                                grid
                                gap-6
                                sm:grid-cols-2
                            "
                        >

                            {/* COUNTRY */}

                            <div>

                                <label
                                    htmlFor="country"
                                    className="
                                        mb-2
                                        block
                                        text-sm
                                        font-semibold
                                        text-[var(--color-text)]
                                    "
                                >
                                    Country
                                    <span className="text-red-500">
                                        {" "}*
                                    </span>
                                </label>

                                <input
                                    id="country"
                                    type="text"
                                    value={
                                        country
                                    }
                                    onChange={(event) =>
                                        setCountry(
                                            event.target.value
                                        )
                                    }
                                    autoComplete="country-name"
                                    className="
                                        w-full
                                        rounded-xl
                                        border
                                        border-gray-300
                                        px-4
                                        py-3
                                        text-sm
                                        outline-none
                                        transition
                                        focus:border-primary
                                        focus:ring-2
                                        focus:ring-primary/20
                                    "
                                    disabled={
                                        saving
                                    }
                                />

                            </div>


                            {/* POSTAL CODE */}

                            <div>

                                <label
                                    htmlFor="postal_code"
                                    className="
                                        mb-2
                                        block
                                        text-sm
                                        font-semibold
                                        text-[var(--color-text)]
                                    "
                                >
                                    Postal Code
                                    <span
                                        className="
                                            ml-1
                                            font-normal
                                            text-gray-400
                                        "
                                    >
                                        Optional
                                    </span>
                                </label>

                                <input
                                    id="postal_code"
                                    type="text"
                                    value={
                                        postalCode
                                    }
                                    onChange={(event) =>
                                        setPostalCode(
                                            event.target.value
                                        )
                                    }
                                    placeholder="Postal code"
                                    autoComplete="postal-code"
                                    className="
                                        w-full
                                        rounded-xl
                                        border
                                        border-gray-300
                                        px-4
                                        py-3
                                        text-sm
                                        outline-none
                                        transition
                                        focus:border-primary
                                        focus:ring-2
                                        focus:ring-primary/20
                                    "
                                    disabled={
                                        saving
                                    }
                                />

                            </div>

                        </div>


                        {/* ================================================== */}
                        {/* ADDRESS TYPE */}
                        {/* ================================================== */}

                        <div>

                            <label
                                htmlFor="address_type"
                                className="
                                    mb-2
                                    block
                                    text-sm
                                    font-semibold
                                    text-[var(--color-text)]
                                "
                            >
                                Address Type
                            </label>

                            <select
                                id="address_type"
                                value={
                                    addressType
                                }
                                onChange={(event) =>
                                    setAddressType(
                                        event.target.value as
                                            | "home"
                                            | "office"
                                            | "other"
                                    )
                                }
                                className="
                                    w-full
                                    rounded-xl
                                    border
                                    border-gray-300
                                    bg-white
                                    px-4
                                    py-3
                                    text-sm
                                    outline-none
                                    transition
                                    focus:border-primary
                                    focus:ring-2
                                    focus:ring-primary/20
                                "
                                disabled={
                                    saving
                                }
                            >

                                <option value="home">
                                    Home
                                </option>

                                <option value="office">
                                    Office
                                </option>

                                <option value="other">
                                    Other
                                </option>

                            </select>

                        </div>


                        {/* ================================================== */}
                        {/* DEFAULT ADDRESS */}
                        {/* ================================================== */}

                        <label
                            className="
                                flex
                                cursor-pointer
                                items-start
                                gap-3
                                rounded-xl
                                border
                                border-gray-200
                                p-4
                            "
                        >

                            <input
                                type="checkbox"
                                checked={
                                    isDefault
                                }
                                onChange={(event) =>
                                    setIsDefault(
                                        event.target.checked
                                    )
                                }
                                className="
                                    mt-0.5
                                    h-5
                                    w-5
                                    rounded
                                    border-gray-300
                                    accent-[var(--color-primary)]
                                "
                                disabled={
                                    saving
                                }
                            />

                            <span>

                                <span
                                    className="
                                        block
                                        text-sm
                                        font-semibold
                                        text-[var(--color-text)]
                                    "
                                >
                                    Make this my default address
                                </span>

                                <span
                                    className="
                                        mt-1
                                        block
                                        text-xs
                                        text-[var(--color-text-light)]
                                    "
                                >
                                    This address will be selected
                                    automatically during checkout.
                                </span>

                            </span>

                        </label>


                        {/* ================================================== */}
                        {/* ACTIONS */}
                        {/* ================================================== */}

                        <div
                            className="
                                mt-2
                                flex
                                flex-col-reverse
                                gap-3
                                border-t
                                border-gray-200
                                pt-6
                                sm:flex-row
                                sm:justify-end
                            "
                        >

                            <button
                                type="button"
                                onClick={
                                    handleCancel
                                }
                                disabled={
                                    saving
                                }
                                className="
                                    rounded-xl
                                    border
                                    border-gray-300
                                    px-6
                                    py-3
                                    text-sm
                                    font-semibold
                                    text-[var(--color-text)]
                                    transition
                                    hover:bg-gray-50
                                    disabled:cursor-not-allowed
                                    disabled:opacity-50
                                "
                            >
                                Cancel
                            </button>


                            <button
                                type="submit"
                                disabled={
                                    saving
                                }
                                className="
                                    flex
                                    items-center
                                    justify-center
                                    gap-2
                                    rounded-xl
                                    bg-primary
                                    px-6
                                    py-3
                                    text-sm
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
                                            size={18}
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

                                        Save Address

                                    </>

                                )}

                            </button>

                        </div>

                    </div>

                </form>

            </div>

        </section>

        <Footer />

    </main>

);

}
