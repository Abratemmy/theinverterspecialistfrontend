"use client";

import {
    ChangeEvent,
} from "react";

import {
    Upload,
    X,
} from "lucide-react";

interface AdminFileUploadProps {

    label: string;

    accept?: string;

    multiple?: boolean;

    files: File[];

    onChange: (
        files: File[]
    ) => void;

    previewUrl?: string | null;

    onRemovePreview?: () => void;

    error?: string;
}

export default function AdminFileUpload({
    label,
    accept = "image/*",
    multiple = false,
    files,
    onChange,
    previewUrl,
    onRemovePreview,
    error,
}: AdminFileUploadProps) {


    const handleChange = (
        event: ChangeEvent<HTMLInputElement>
    ) => {

        const selectedFiles =
            Array.from(
                event.target.files || []
            );

        if (!selectedFiles.length) {
            return;
        }

        onChange(
            multiple
                ? [
                    ...files,
                    ...selectedFiles,
                ]
                : [
                    selectedFiles[0],
                ]
        );

    };


    const removeFile = (
        index: number
    ) => {

        onChange(
            files.filter(
                (_, i) =>
                    i !== index
            )
        );

    };


    return (

        <div className="space-y-2">

            <label className="
                block
                text-sm
                font-medium
            ">

                {label}

            </label>


            <label className="
                flex
                cursor-pointer
                flex-col
                items-center
                justify-center
                rounded-xl
                border-2
                border-dashed
                px-6
                py-8
                transition
                hover:border-primary
                hover:bg-primary/5
            ">

                <Upload
                    size={28}
                    className="
                        text-muted-foreground
                    "
                />


                <p className="
                    mt-3
                    text-sm
                    font-medium
                ">

                    Click to upload

                </p>


                <p className="
                    mt-1
                    text-xs
                    text-muted-foreground
                ">

                    {accept}

                </p>


                <input
                    type="file"
                    accept={accept}
                    multiple={multiple}
                    onChange={
                        handleChange
                    }
                    className="hidden"
                />

            </label>


            {/* EXISTING IMAGE */}

            {previewUrl && (

                <div className="
                    relative
                    mt-3
                    h-32
                    w-32
                    overflow-hidden
                    rounded-xl
                    border
                    bg-white
                ">

                    <img
                        src={previewUrl}
                        alt="Current"
                        className="
                            h-full
                            w-full
                            object-contain
                            p-2
                        "
                    />


                    {onRemovePreview && (

                        <button
                            type="button"
                            onClick={
                                onRemovePreview
                            }
                            className="
                                absolute
                                right-2
                                top-2
                                flex
                                h-7
                                w-7
                                items-center
                                justify-center
                                rounded-full
                                bg-red-500
                                text-white
                            "
                        >

                            <X size={14} />

                        </button>

                    )}

                </div>

            )}


            {/* NEW FILES */}

            {files.length > 0 && (

                <div className="
                    mt-3
                    space-y-2
                ">

                    {files.map(
                        (
                            file,
                            index
                        ) => (

                            <div
                                key={`${file.name}-${index}`}
                                className="
                                    flex
                                    items-center
                                    justify-between
                                    rounded-lg
                                    border
                                    px-3
                                    py-2
                                "
                            >

                                <span className="
                                    truncate
                                    text-sm
                                ">

                                    {file.name}

                                </span>


                                <button
                                    type="button"
                                    onClick={() =>
                                        removeFile(
                                            index
                                        )
                                    }
                                    className="
                                        ml-3
                                        text-red-500
                                    "
                                >

                                    <X
                                        size={16}
                                    />

                                </button>

                            </div>

                        )
                    )}

                </div>

            )}


            {error && (

                <p className="
                    text-xs
                    text-red-500
                ">

                    {error}

                </p>

            )}

        </div>

    );

}