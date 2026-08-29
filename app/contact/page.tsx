"use client";

import {
    FormEvent,
    useState,
} from "react";

import {
    Mail,
    Phone,
    MapPin,
    Clock,
    Send,
    Loader2,
} from "lucide-react";

import { Header } from "@/components/layout/Header";
import Footer from "@/components/layout/Footer/Footer";

import {
    sendContactMessage,
} from "@/services/contact.service";

import {
    showError,
    showSuccess,
} from "@/lib/toast";


// ========================================================
// PAGE
// ========================================================

export default function ContactPage() {

    // ====================================================
    // FORM STATE
    // ====================================================

    const [
        formData,
        setFormData
    ] = useState({

        full_name: "",

        email: "",

        phone: "",

        subject: "",

        message: ""

    });


    // ====================================================
    // LOADING
    // ====================================================

    const [
        loading,
        setLoading
    ] = useState(false);


    // ====================================================
    // HANDLE INPUT
    // ====================================================

    const handleChange = (
        event: React.ChangeEvent<
            HTMLInputElement |
            HTMLTextAreaElement
        >
    ) => {

        const {
            name,
            value
        } = event.target;


        setFormData(
            (current) => ({

                ...current,

                [name]: value

            })
        );

    };


    // ====================================================
    // SUBMIT FORM
    // ====================================================

    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>
    ) => {

        event.preventDefault();


        // ------------------------------------------------
        // Validation
        // ------------------------------------------------

        if (
            !formData.full_name.trim()
        ) {

            showError(
                "Please enter your full name."
            );

            return;

        }


        if (
            !formData.email.trim()
        ) {

            showError(
                "Please enter your email address."
            );

            return;

        }


        if (
            !formData.subject.trim()
        ) {

            showError(
                "Please enter a subject."
            );

            return;

        }


        if (
            !formData.message.trim()
        ) {

            showError(
                "Please enter your message."
            );

            return;

        }


        try {

            setLoading(true);


            // ------------------------------------------------
            // Send to backend
            // ------------------------------------------------

            const response =
                await sendContactMessage({

                    full_name:
                        formData.full_name.trim(),

                    email:
                        formData.email.trim(),

                    phone:
                        formData.phone.trim(),

                    subject:
                        formData.subject.trim(),

                    message:
                        formData.message.trim()

                });


            console.log(
                "CONTACT RESPONSE:",
                response
            );


            // ------------------------------------------------
            // Success
            // ------------------------------------------------

            showSuccess(
                response?.message ||
                "Your message has been sent successfully."
            );


            // ------------------------------------------------
            // Clear form
            // ------------------------------------------------

            setFormData({

                full_name: "",

                email: "",

                phone: "",

                subject: "",

                message: ""

            });

        } catch (error: unknown) {

            console.error(
                "CONTACT FORM ERROR:",
                error
            );


            // ------------------------------------------------
            // Get backend error safely
            // ------------------------------------------------

            let message =
                "Unable to send your message. Please try again later.";


            if (
                typeof error === "object" &&
                error !== null &&
                "response" in error
            ) {

                const response =
                    (
                        error as {
                            response?: {
                                data?: {
                                    message?: string;
                                };
                            };
                        }
                    ).response;


                if (
                    response?.data?.message
                ) {

                    message =
                        response.data.message;

                }

            }


            showError(
                message
            );

        } finally {

            setLoading(false);

        }

    };


    // ====================================================
    // PAGE
    // ====================================================

    return (

        <main className="min-h-screen">

            <Header />


            {/* ==================================================
                HERO
            ================================================== */}

            <section className="
                bg-[var(--color-primary)]
                px-4
                py-16
                text-white
                sm:px-6
                lg:px-8
            ">

                <div className="
                    mx-auto
                    max-w-7xl
                    text-center
                ">

                    <h1 className="
                        text-3xl
                        font-bold
                        sm:text-4xl
                        lg:text-5xl
                    ">

                        Contact Us

                    </h1>


                    <p className="
                        mx-auto
                        mt-4
                        max-w-2xl
                        text-sm
                        leading-7
                        text-white/90
                        sm:text-base
                    ">

                        Have a question about our products,
                        solar systems, inverters or batteries?
                        We are here to help.

                    </p>

                </div>

            </section>


            {/* ==================================================
                CONTACT SECTION
            ================================================== */}

            <section className="
                bg-[var(--color-background)]
                px-4
                py-12
                sm:px-6
                lg:px-8
                lg:py-16
            ">

                <div className="
                    mx-auto
                    grid
                    max-w-7xl
                    gap-8
                    lg:grid-cols-3
                ">


                    {/* ==================================================
                        CONTACT INFORMATION
                    ================================================== */}

                    <div className="
                        space-y-5
                    ">

                        <div>

                            <h2 className="
                                text-2xl
                                font-bold
                                text-[var(--color-text)]
                            ">

                                Get In Touch

                            </h2>


                            <p className="
                                mt-3
                                text-sm
                                leading-6
                                text-[var(--color-text-light)]
                            ">

                                We would love to hear from you.
                                Send us a message and our team
                                will get back to you as soon as
                                possible.

                            </p>

                        </div>


                        {/* EMAIL */}

                        <div className="
                            flex
                            gap-4
                            rounded-2xl
                            bg-white
                            p-5
                            shadow-sm
                        ">

                            <div className="
                                flex
                                h-12
                                w-12
                                shrink-0
                                items-center
                                justify-center
                                rounded-xl
                                bg-primary/10
                                text-primary
                            ">

                                <Mail
                                    size={22}
                                />

                            </div>


                            <div>

                                <h3 className="
                                    font-semibold
                                    text-[var(--color-text)]
                                ">

                                    Email

                                </h3>


                                <p className="
                                    mt-1
                                    break-all
                                    text-sm
                                    text-[var(--color-text-light)]
                                ">

                                    {process.env
                                        .NEXT_PUBLIC_CONTACT_EMAIL ||
                                        "info@theinverterspecialist.com"}

                                </p>

                            </div>

                        </div>


                        {/* PHONE */}

                        <div className="
                            flex
                            gap-4
                            rounded-2xl
                            bg-white
                            p-5
                            shadow-sm
                        ">

                            <div className="
                                flex
                                h-12
                                w-12
                                shrink-0
                                items-center
                                justify-center
                                rounded-xl
                                bg-primary/10
                                text-primary
                            ">

                                <Phone
                                    size={22}
                                />

                            </div>


                            <div>

                                <h3 className="
                                    font-semibold
                                    text-[var(--color-text)]
                                ">

                                    Phone

                                </h3>


                                <p className="
                                    mt-1
                                    text-sm
                                    text-[var(--color-text-light)]
                                ">

                                    +234 800 000 0000

                                </p>

                            </div>

                        </div>


                        {/* LOCATION */}

                        <div className="
                            flex
                            gap-4
                            rounded-2xl
                            bg-white
                            p-5
                            shadow-sm
                        ">

                            <div className="
                                flex
                                h-12
                                w-12
                                shrink-0
                                items-center
                                justify-center
                                rounded-xl
                                bg-primary/10
                                text-primary
                            ">

                                <MapPin
                                    size={22}
                                />

                            </div>


                            <div>

                                <h3 className="
                                    font-semibold
                                    text-[var(--color-text)]
                                ">

                                    Address

                                </h3>


                                <p className="
                                    mt-1
                                    text-sm
                                    leading-6
                                    text-[var(--color-text-light)]
                                ">

                                    Nigeria

                                </p>

                            </div>

                        </div>


                        {/* HOURS */}

                        <div className="
                            flex
                            gap-4
                            rounded-2xl
                            bg-white
                            p-5
                            shadow-sm
                        ">

                            <div className="
                                flex
                                h-12
                                w-12
                                shrink-0
                                items-center
                                justify-center
                                rounded-xl
                                bg-primary/10
                                text-primary
                            ">

                                <Clock
                                    size={22}
                                />

                            </div>


                            <div>

                                <h3 className="
                                    font-semibold
                                    text-[var(--color-text)]
                                ">

                                    Business Hours

                                </h3>


                                <p className="
                                    mt-1
                                    text-sm
                                    leading-6
                                    text-[var(--color-text-light)]
                                ">

                                    Monday - Saturday
                                    <br />
                                    8:00 AM - 6:00 PM

                                </p>

                            </div>

                        </div>

                    </div>


                    {/* ==================================================
                        CONTACT FORM
                    ================================================== */}

                    <div className="
                        rounded-2xl
                        bg-white
                        p-6
                        shadow-sm
                        sm:p-8
                        lg:col-span-2
                    ">

                        <div className="mb-7">

                            <h2 className="
                                text-2xl
                                font-bold
                                text-[var(--color-text)]
                            ">

                                Send Us A Message

                            </h2>


                            <p className="
                                mt-2
                                text-sm
                                text-[var(--color-text-light)]
                            ">

                                Fill out the form below and
                                we will get back to you.

                            </p>

                        </div>


                        <form
                            onSubmit={
                                handleSubmit
                            }
                            className="
                                space-y-5
                            "
                        >

                            {/* ======================================
                                NAME + EMAIL
                            ====================================== */}

                            <div className="
                                grid
                                gap-5
                                sm:grid-cols-2
                            ">

                                {/* NAME */}

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
                                        <span className="
                                            text-red-500
                                        ">
                                            *
                                        </span>

                                    </label>


                                    <input
                                        id="full_name"
                                        name="full_name"
                                        type="text"
                                        value={
                                            formData.full_name
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="Enter your full name"
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
                                            outline-none
                                            transition
                                            focus:border-[var(--color-primary)]
                                            focus:ring-2
                                            focus:ring-[var(--color-primary)]
                                            disabled:bg-gray-100
                                        "
                                    />

                                </div>


                                {/* EMAIL */}

                                <div>

                                    <label
                                        htmlFor="email"
                                        className="
                                            mb-2
                                            block
                                            text-sm
                                            font-semibold
                                            text-[var(--color-text)]
                                        "
                                    >

                                        Email Address
                                        <span className="
                                            text-red-500
                                        ">
                                            *
                                        </span>

                                    </label>


                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={
                                            formData.email
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="Enter your email"
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
                                            outline-none
                                            transition
                                            focus:border-[var(--color-primary)]
                                            focus:ring-2
                                            focus:ring-[var(--color-primary)]
                                            disabled:bg-gray-100
                                        "
                                    />

                                </div>

                            </div>


                            {/* ======================================
                                PHONE + SUBJECT
                            ====================================== */}

                            <div className="
                                grid
                                gap-5
                                sm:grid-cols-2
                            ">

                                {/* PHONE */}

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
                                        <span className="
                                            ml-1
                                            text-xs
                                            font-normal
                                            text-gray-400
                                        ">
                                            Optional
                                        </span>

                                    </label>


                                    <input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        value={
                                            formData.phone
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="08012345678"
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
                                            outline-none
                                            transition
                                            focus:border-[var(--color-primary)]
                                            focus:ring-2
                                            focus:ring-[var(--color-primary)]
                                            disabled:bg-gray-100
                                        "
                                    />

                                </div>


                                {/* SUBJECT */}

                                <div>

                                    <label
                                        htmlFor="subject"
                                        className="
                                            mb-2
                                            block
                                            text-sm
                                            font-semibold
                                            text-[var(--color-text)]
                                        "
                                    >

                                        Subject
                                        <span className="
                                            text-red-500
                                        ">
                                            *
                                        </span>

                                    </label>


                                    <input
                                        id="subject"
                                        name="subject"
                                        type="text"
                                        value={
                                            formData.subject
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="What can we help you with?"
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
                                            outline-none
                                            transition
                                            focus:border-[var(--color-primary)]
                                            focus:ring-2
                                            focus:ring-[var(--color-primary)]
                                            disabled:bg-gray-100
                                        "
                                    />

                                </div>

                            </div>


                            {/* ======================================
                                MESSAGE
                            ====================================== */}

                            <div>

                                <label
                                    htmlFor="message"
                                    className="
                                        mb-2
                                        block
                                        text-sm
                                        font-semibold
                                        text-[var(--color-text)]
                                    "
                                >

                                    Message
                                    <span className="
                                        text-red-500
                                    ">
                                        *
                                    </span>

                                </label>


                                <textarea
                                    id="message"
                                    name="message"
                                    rows={7}
                                    value={
                                        formData.message
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="Tell us how we can help you..."
                                    disabled={loading}
                                    className="
                                        w-full
                                        resize-none
                                        rounded-xl
                                        border
                                        border-gray-200
                                        bg-white
                                        px-4
                                        py-3
                                        text-sm
                                        leading-6
                                        outline-none
                                        transition
                                        focus:border-[var(--color-primary)]
                                        focus:ring-2
                                        focus:ring-[var(--color-primary)]
                                        disabled:bg-gray-100
                                    "
                                />

                            </div>


                            {/* ======================================
                                SUBMIT
                            ====================================== */}

                            <button
                                type="submit"
                                disabled={loading}
                                className="
                                    inline-flex
                                    w-full
                                    items-center
                                    justify-center
                                    gap-2
                                    rounded-xl
                                    bg-primary
                                    px-6
                                    py-3.5
                                    text-sm
                                    font-semibold
                                    text-white
                                    transition
                                    hover:bg-[var(--color-primary-dark)]
                                    disabled:cursor-not-allowed
                                    disabled:opacity-60
                                    sm:w-auto
                                "
                            >

                                {loading ? (

                                    <>
                                        <Loader2
                                            size={19}
                                            className="
                                                animate-spin
                                            "
                                        />

                                        Sending...

                                    </>

                                ) : (

                                    <>
                                        <Send
                                            size={18}
                                        />

                                        Send Message

                                    </>

                                )}

                            </button>

                        </form>

                    </div>

                </div>

            </section>

            {/* ==================================================
            GOOGLE MAP
            ================================================== */}

            <section className="
                border-t
                bg-gray-50
                px-4
                py-16
                sm:px-6
                lg:px-8
            ">

            <div className="
                mx-auto
                max-w-7xl
            ">

                {/* HEADER */}

                <div className="
                    mb-8
                    text-center
                ">

                    <span className="
                        text-sm
                        font-semibold
                        uppercase
                        tracking-wider
                        text-primary
                    ">
                        Find Us
                    </span>

                    <h2 className="
                        mt-2
                        text-2xl
                        font-bold
                        text-[var(--color-text)]
                        sm:text-3xl
                    ">
                        Visit The Inverter Specialist
                    </h2>

                    <p className="
                        mx-auto
                        mt-3
                        max-w-2xl
                        text-sm
                        leading-6
                        text-[var(--color-text-light)]
                    ">
                        Find our location and get directions to
                        The Inverter Specialist.
                    </p>

                </div>


                {/* MAP */}

                <div className="
                    overflow-hidden
                    rounded-2xl
                    border
                    bg-white
                    shadow-sm
                ">

                <iframe
                    src="https://www.google.com/maps?q=The+Inverter+Specialist,+Lagos,+Nigeria&output=embed"
                    width="100%"
                    height="450"
                    style={{
                        border: 0,
                    }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    title="The Inverter Specialist Location"
                />

                </div>


                {/* DIRECTIONS */}

                <div className="
                    mt-6
                    flex
                    flex-col
                    items-center
                    justify-between
                    gap-4
                    rounded-2xl
                    border
                    bg-white
                    p-5
                    sm:flex-row
                ">

                    <div>

                        <h3 className="
                            font-semibold
                            text-[var(--color-text)]
                        ">
                            Need directions?
                        </h3>

                        <p className="
                            mt-1
                            text-sm
                            text-[var(--color-text-light)]
                        ">
                            Open Google Maps to get directions
                            from your current location.
                        </p>

                    </div>


                    <a
                        href="https://www.google.com/maps/dir/?api=1&destination=6.4815635,3.3718349"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                            inline-flex
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            bg-primary
                            px-6
                            py-3
                            text-sm
                            font-semibold
                            text-white
                            transition
                            hover:opacity-90
                        "
                    >
                        Get Directions
                    </a>

                </div>

            </div>

            </section>



            <Footer />

        </main>

    );

}