"use client";

import { Toaster } from "react-hot-toast";

export default function ToastContainer() {
    return (
        <Toaster
            position="top-right"
            reverseOrder={false}
            gutter={10}
            toastOptions={{
                duration: 3000,

                style: {
                    borderRadius: "10px",
                    padding: "14px 16px",
                    fontSize: "14px",
                    fontWeight: 500,
                },

                success: {
                    duration: 3000,
                },

                error: {
                    duration: 4000,
                },
            }}
        />
    );
}