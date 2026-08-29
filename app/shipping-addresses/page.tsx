"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
    ArrowLeft,
    Loader2,
    MapPin,
    Save,
} from "lucide-react";

import { Header } from "@/components/layout/Header";
import Footer from "@/components/layout/Footer/Footer";
import { showError, showSuccess } from "@/lib/toast";


// ============================================================
// ADDRESS FORM TYPE
// ============================================================

type AddressForm = {
    full_name: string;
    phone: string;
    address_line_1: string;
    address_line_2: string;
    city: string;
    state: string;
    country: string;
    postal_code: string;
    address_type: "home" | "office" | "other";
    is_default: boolean;
};


// ============================================================
// PAGE
// ============================================================

export default function NewShippingAddressPage() {

    const router = useRouter();

    const searchParams =
        useSearchParams();


    // ========================================================
    // REDIRECT
    // ========================================================

    const redirect =
        searchParams.get("redirect") ||
        "/account/addresses";


    // ========================================================
    // STATE
    // ========================================================

    const [
        form,
        setForm
    ] = useState<AddressForm>({

        full_name: "",

        phone: "",

        address_line_1: "",

        address_line_2: "",

        city: "",

        state: "",

        country: "Nigeria",

        postal_code: "",

        address_type: "home",

        is_default: false

    });


    const [
        loading,
        setLoading
    ] = useState(false);


    // ========================================================
    // HANDLE CHANGE
    // ========================================================

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement |
            HTMLSelectElement
        >
    ) => {

        const {
            name,
            value
        } = e.target;


        setForm(
            previous => ({

                ...previous,

                [name]: value

            })
        );

    };


    // ========================================================
    // HANDLE CHECKBOX
    // ========================================================

    const handleDefaultChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {

        setForm(
            previous => ({

                ...previous,

                is_default:
                    e.target.checked

            })
        );

    };


    // ========================================================
    // SUBMIT
    // ========================================================

    const handleSubmit = async (
        e: FormEvent<HTMLFormElement>
    ) => {

        e.preventDefault();


        // ====================================================
        // BASIC FRONTEND VALIDATION
        // ====================================================

        if (
            !form.full_name.trim()
        ) {

            showError(
                "Please enter the recipient's full name."
            );

            return;

        }


        if (
            !form.phone.trim()
        ) {

            showError(
                "Please enter a phone number."
            );

            return;

        }


        if (
            !form.address_line_1.trim()
        ) {

            showError(
                "Please enter your address."
            );

            return;

        }


        if (
            !form.city.trim()
        ) {

            showError(
                "Please enter your city."
            );

            return;

        }


        if (
            !form.state.trim()
        ) {

            showError(
                "Please enter your state."
            );

            return;

        }


        try {

            setLoading(true);


            // =================================================
            // CREATE ADDRESS
            // =================================================

            const response =
                await fetch(
                    `${
                        process.env
                            .NEXT_PUBLIC_API_URL
                    }/api/shipping-addresses`,
                    {

                        method:
                            "POST",

                        credentials:
                            "include",

                        headers: {

                            "Content-Type":
                                "application/json"

                        },

                        body:
                            JSON.stringify({

                                full_name:
                                    form.full_name.trim(),

                                phone:
                                    form.phone.trim(),

                                address_line_1:
                                    form.address_line_1.trim(),

                                address_line_2:
                                    form.address_line_2.trim() ||
                                    null,

                                city:
                                    form.city.trim(),

                                state:
                                    form.state.trim(),

                                country:
                                    form.country.trim() ||
                                    "Nigeria",

                                postal_code:
                                    form.postal_code.trim() ||
                                    null,

                                address_type:
                                    form.address_type,

                                is_default:
                                    form.is_default

                            })

                    }
                );


            // =================================================
            // READ RESPONSE
            // =================================================

            const data =
                await response.json();


            if (!response.ok) {

                // ---------------------------------------------
                // EXPRESS VALIDATION ERRORS
                // ---------------------------------------------

                const validationMessage =
                    data?.errors
                        ?.map(
                            (item: any) =>
                                item.msg
                        )
                        ?.join(", ");


                throw new Error(

                    validationMessage ||

                    data?.message ||

                    "Unable to create shipping address."

                );

            }


            // =================================================
            // SUCCESS
            // =================================================

            showSuccess(
                "Shipping address added successfully."
            );


            // =================================================
            // RETURN TO PREVIOUS PAGE
            // =================================================

            router.push(
                redirect
            );


            router.refresh();

        }
        catch (error: any) {

            console.error(
                "Create shipping address error:",
                error
            );


            showError(
                error?.message ||
                "Unable to save shipping address."
            );

        }
        finally {

            setLoading(false);

        }

    };


    // ========================================================
    // PAGE
    // ========================================================

    return (

        <main>

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


                    {/* ====================================== */}
                    {/* BACK */}
                    {/* ====================================== */}

                    <button
                        type="button"
                        onClick={() =>
                            router.push(
                                redirect
                            )
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


                    {/* ====================================== */}
                    {/* TITLE */}
                    {/* ====================================== */}

                    <div
                        className="
                            mb-8
                        "
                    >

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
                                        text-[var(--color-text-light)]
                                    "
                                >
                                    Add an address where your
                                    orders can be delivered.
                                </p>

                            </div>

                        </div>

                    </div>


                    {/* ====================================== */}
                    {/* FORM */}
                    {/* ====================================== */}

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


                        {/* ================================== */}
                        {/* RECIPIENT INFORMATION */}
                        {/* ================================== */}

                        <div
                            className="
                                mb-8
                            "
                        >

                            <h2
                                className="
                                    text-xl
                                    font-semibold
                                    text-[var(--color-text)]
                                "
                            >
                                Recipient Information
                            </h2>


                            <p
                                className="
                                    mt-1
                                    text-sm
                                    text-[var(--color-text-light)]
                                "
                            >
                                Enter the name and phone number
                                of the person receiving the order.
                            </p>


                            <div
                                className="
                                    mt-5
                                    grid
                                    gap-5
                                    sm:grid-cols-2
                                "
                            >

                                {/* FULL NAME */}

                                <div>

                                    <label
                                        htmlFor="full_name"
                                        className="
                                            mb-2
                                            block
                                            text-sm
                                            font-medium
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
                                        name="full_name"
                                        type="text"
                                        value={
                                            form.full_name
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="e.g. John Doe"
                                        disabled={loading}
                                        className="
                                            w-full
                                            rounded-xl
                                            border
                                            border-gray-200
                                            bg-white
                                            px-4
                                            py-3
                                            text-sm
                                            text-[var(--color-text)]
                                            outline-none
                                            transition
                                            focus:border-primary
                                            focus:ring-2
                                            focus:ring-primary/10
                                            disabled:bg-gray-100
                                        "
                                    />

                                </div>


                                {/* PHONE */}

                                <div>

                                    <label
                                        htmlFor="phone"
                                        className="
                                            mb-2
                                            block
                                            text-sm
                                            font-medium
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
                                        name="phone"
                                        type="tel"
                                        value={
                                            form.phone
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="e.g. 08012345678"
                                        disabled={loading}
                                        className="
                                            w-full
                                            rounded-xl
                                            border
                                            border-gray-200
                                            bg-white
                                            px-4
                                            py-3
                                            text-sm
                                            text-[var(--color-text)]
                                            outline-none
                                            transition
                                            focus:border-primary
                                            focus:ring-2
                                            focus:ring-primary/10
                                            disabled:bg-gray-100
                                        "
                                    />

                                </div>

                            </div>

                        </div>


                        {/* ================================== */}
                        {/* ADDRESS */}
                        {/* ================================== */}

                        <div
                            className="
                                mb-8
                            "
                        >

                            <h2
                                className="
                                    text-xl
                                    font-semibold
                                    text-[var(--color-text)]
                                "
                            >
                                Address
                            </h2>


                            <p
                                className="
                                    mt-1
                                    text-sm
                                    text-[var(--color-text-light)]
                                "
                            >
                                Provide the complete delivery
                                address.
                            </p>


                            <div
                                className="
                                    mt-5
                                    space-y-5
                                "
                            >

                                {/* ADDRESS LINE 1 */}

                                <div>

                                    <label
                                        htmlFor="address_line_1"
                                        className="
                                            mb-2
                                            block
                                            text-sm
                                            font-medium
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
                                        name="address_line_1"
                                        type="text"
                                        value={
                                            form.address_line_1
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="e.g. 12 Allen Avenue"
                                        disabled={loading}
                                        className="
                                            w-full
                                            rounded-xl
                                            border
                                            border-gray-200
                                            bg-white
                                            px-4
                                            py-3
                                            text-sm
                                            text-[var(--color-text)]
                                            outline-none
                                            transition
                                            focus:border-primary
                                            focus:ring-2
                                            focus:ring-primary/10
                                            disabled:bg-gray-100
                                        "
                                    />

                                </div>


                                {/* ADDRESS LINE 2 */}

                                <div>

                                    <label
                                        htmlFor="address_line_2"
                                        className="
                                            mb-2
                                            block
                                            text-sm
                                            font-medium
                                            text-[var(--color-text)]
                                        "
                                    >
                                        Apartment / Landmark
                                        <span
                                            className="
                                                ml-1
                                                text-xs
                                                font-normal
                                                text-gray-400
                                            "
                                        >
                                            Optional
                                        </span>
                                    </label>


                                    <input
                                        id="address_line_2"
                                        name="address_line_2"
                                        type="text"
                                        value={
                                            form.address_line_2
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="Apartment, building, landmark, etc."
                                        disabled={loading}
                                        className="
                                            w-full
                                            rounded-xl
                                            border
                                            border-gray-200
                                            bg-white
                                            px-4
                                            py-3
                                            text-sm
                                            text-[var(--color-text)]
                                            outline-none
                                            transition
                                            focus:border-primary
                                            focus:ring-2
                                            focus:ring-primary/10
                                            disabled:bg-gray-100
                                        "
                                    />

                                </div>


                                {/* CITY / STATE */}

                                <div
                                    className="
                                        grid
                                        gap-5
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
                                                font-medium
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
                                            name="city"
                                            type="text"
                                            value={
                                                form.city
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            placeholder="e.g. Ikeja"
                                            disabled={loading}
                                            className="
                                                w-full
                                                rounded-xl
                                                border
                                                border-gray-200
                                                bg-white
                                                px-4
                                                py-3
                                                text-sm
                                                text-[var(--color-text)]
                                                outline-none
                                                transition
                                                focus:border-primary
                                                focus:ring-2
                                                focus:ring-primary/10
                                                disabled:bg-gray-100
                                            "
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
                                                font-medium
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
                                            name="state"
                                            type="text"
                                            value={
                                                form.state
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            placeholder="e.g. Lagos"
                                            disabled={loading}
                                            className="
                                                w-full
                                                rounded-xl
                                                border
                                                border-gray-200
                                                bg-white
                                                px-4
                                                py-3
                                                text-sm
                                                text-[var(--color-text)]
                                                outline-none
                                                transition
                                                focus:border-primary
                                                focus:ring-2
                                                focus:ring-primary/10
                                                disabled:bg-gray-100
                                            "
                                        />

                                    </div>

                                </div>


                                {/* COUNTRY / POSTAL CODE */}

                                <div
                                    className="
                                        grid
                                        gap-5
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
                                                font-medium
                                                text-[var(--color-text)]
                                            "
                                        >
                                            Country
                                        </label>


                                        <input
                                            id="country"
                                            name="country"
                                            type="text"
                                            value={
                                                form.country
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            disabled={loading}
                                            className="
                                                w-full
                                                rounded-xl
                                                border
                                                border-gray-200
                                                bg-white
                                                px-4
                                                py-3
                                                text-sm
                                                text-[var(--color-text)]
                                                outline-none
                                                transition
                                                focus:border-primary
                                                focus:ring-2
                                                focus:ring-primary/10
                                                disabled:bg-gray-100
                                            "
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
                                                font-medium
                                                text-[var(--color-text)]
                                            "
                                        >
                                            Postal Code
                                            <span
                                                className="
                                                    ml-1
                                                    text-xs
                                                    font-normal
                                                    text-gray-400
                                                "
                                            >
                                                Optional
                                            </span>
                                        </label>


                                        <input
                                            id="postal_code"
                                            name="postal_code"
                                            type="text"
                                            value={
                                                form.postal_code
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            placeholder="e.g. 100001"
                                            disabled={loading}
                                            className="
                                                w-full
                                                rounded-xl
                                                border
                                                border-gray-200
                                                bg-white
                                                px-4
                                                py-3
                                                text-sm
                                                text-[var(--color-text)]
                                                outline-none
                                                transition
                                                focus:border-primary
                                                focus:ring-2
                                                focus:ring-primary/10
                                                disabled:bg-gray-100
                                            "
                                        />

                                    </div>

                                </div>

                            </div>

                        </div>


                        {/* ================================== */}
                        {/* ADDRESS TYPE */}
                        {/* ================================== */}

                        <div
                            className="
                                mb-8
                            "
                        >

                            <h2
                                className="
                                    text-xl
                                    font-semibold
                                    text-[var(--color-text)]
                                "
                            >
                                Address Type
                            </h2>


                            <div
                                className="
                                    mt-5
                                    grid
                                    grid-cols-3
                                    gap-3
                                "
                            >

                                {(
                                    [
                                        "home",
                                        "office",
                                        "other"
                                    ] as const
                                ).map(
                                    type => (

                                        <button
                                            key={type}
                                            type="button"
                                            onClick={() =>
                                                setForm(
                                                    previous => ({
                                                        ...previous,
                                                        address_type:
                                                            type
                                                    })
                                                )
                                            }
                                            disabled={loading}
                                            className={`
                                                rounded-xl
                                                border
                                                px-4
                                                py-3
                                                text-sm
                                                font-medium
                                                capitalize
                                                transition

                                                ${
                                                    form.address_type ===
                                                    type
                                                        ? `
                                                            border-primary
                                                            bg-primary/5
                                                            text-primary
                                                            ring-2
                                                            ring-primary/10
                                                        `
                                                        : `
                                                            border-gray-200
                                                            text-[var(--color-text-light)]
                                                            hover:border-primary/50
                                                        `
                                                }

                                                disabled:cursor-not-allowed
                                                disabled:opacity-60
                                            `}
                                        >
                                            {type}
                                        </button>

                                    )
                                )}

                            </div>

                        </div>


                        {/* ================================== */}
                        {/* DEFAULT ADDRESS */}
                        {/* ================================== */}

                        <label
                            className="
                                mb-8
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
                                    form.is_default
                                }
                                onChange={
                                    handleDefaultChange
                                }
                                disabled={loading}
                                className="
                                    mt-1
                                    h-4
                                    w-4
                                    accent-[var(--color-primary)]
                                "
                            />


                            <div>

                                <p
                                    className="
                                        text-sm
                                        font-semibold
                                        text-[var(--color-text)]
                                    "
                                >
                                    Make this my default address
                                </p>


                                <p
                                    className="
                                        mt-1
                                        text-xs
                                        text-[var(--color-text-light)]
                                    "
                                >
                                    This address will automatically
                                    be selected during checkout.
                                </p>

                            </div>

                        </label>


                        {/* ================================== */}
                        {/* ACTIONS */}
                        {/* ================================== */}

                        <div
                            className="
                                flex
                                flex-col-reverse
                                gap-3
                                sm:flex-row
                                sm:justify-end
                            "
                        >

                            <button
                                type="button"
                                onClick={() =>
                                    router.push(
                                        redirect
                                    )
                                }
                                disabled={loading}
                                className="
                                    rounded-xl
                                    border
                                    border-gray-200
                                    px-6
                                    py-3
                                    text-sm
                                    font-semibold
                                    text-[var(--color-text-light)]
                                    transition
                                    hover:border-gray-300
                                    hover:text-[var(--color-text)]
                                    disabled:cursor-not-allowed
                                    disabled:opacity-60
                                "
                            >
                                Cancel
                            </button>


                            <button
                                type="submit"
                                disabled={loading}
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

                                {loading ? (

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

                    </form>

                </div>

            </section>


            <Footer />

        </main>

    );
}