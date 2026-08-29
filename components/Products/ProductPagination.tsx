"use client";

interface ProductPaginationProps {
    currentPage: number;
    totalPages: number;

    onPageChange: (
        page: number
    ) => void;
}


export default function ProductPagination({
    currentPage,
    totalPages,
    onPageChange,
}: ProductPaginationProps) {
    const getPages = () => {

        const pages: (
            number | "..."
        )[] = [];


        if (totalPages <= 7) {

            for (
                let i = 1;
                i <= totalPages;
                i++
            ) {
                pages.push(i);
            }

            return pages;
        }


        pages.push(1);


        if (currentPage > 4) {
            pages.push("...");
        }


        const start = Math.max(
            2,
            currentPage - 1
        );

        const end = Math.min(
            totalPages - 1,
            currentPage + 1
        );


        for (
            let i = start;
            i <= end;
            i++
        ) {

            if (!pages.includes(i)) {
                pages.push(i);
            }

        }


        if (currentPage < totalPages - 3) {
            pages.push("...");
        }


        if (!pages.includes(totalPages)) {
            pages.push(totalPages);
        }


        return pages;
    };


    const pages = getPages();


    return (

        <nav
            aria-label="Product pagination"
            className="
                mt-12
                flex
                items-center
                justify-center
                gap-2
            "
        >
            {/* Previous */}

            <button
                type="button"
                disabled={
                    currentPage === 1
                }
                onClick={() =>
                    onPageChange(
                        currentPage - 1
                    )
                }
                className="
                    flex
                    h-10
                    min-w-10
                    items-center
                    justify-center
                    rounded-lg
                    border
                    px-3
                    text-sm
                    transition
                    hover:border-primary
                    hover:text-primary

                    disabled:pointer-events-none
                    disabled:opacity-40
                    cursor-pointer
                "
                aria-label="Previous page"
            >
                ←
            </button>


            {/* Pages */}

            {pages.map((page, index) => {

                if (page === "...") {

                    return (
                        <span
                            key={`dots-${index}`}
                            className="
                                flex
                                h-10
                                min-w-8
                                items-center
                                justify-center
                                text-sm
                                text-muted-foreground
                            "
                        >
                            ...
                        </span>
                    );
                }


                return (

                    <button
                        key={page}
                        type="button"
                        onClick={() =>
                            onPageChange(page)
                        }
                        aria-current={
                            page === currentPage
                                ? "page"
                                : undefined
                        }
                        className={`
                            flex
                            h-10
                            min-w-10
                            items-center
                            justify-center
                            rounded-lg
                            border
                            px-3
                            text-sm
                            transition
                            cursor-pointer

                            ${
                                page === currentPage
                                    ? "border-primary bg-primary text-white"
                                    : "hover:border-primary hover:bg-[var(--color-primary-dark)] hover:text-white"
                            }
                        `}
                    >
                        {page}
                    </button>
                );

            })}


            {/* Next */}

            <button
                type="button"
                disabled={
                    currentPage === totalPages
                }
                onClick={() =>
                    onPageChange(
                        currentPage + 1
                    )
                }
                className="
                    flex
                    h-10
                    min-w-10
                    items-center
                    justify-center
                    rounded-lg
                    border
                    px-3
                    text-sm
                    transition

                    hover:border-primary
                    hover:text-primary
                    cursor-pointer
                    disabled:pointer-events-none
                    disabled:opacity-40
                "
                aria-label="Next page"
            >
                →
            </button>

        </nav>

    );
}