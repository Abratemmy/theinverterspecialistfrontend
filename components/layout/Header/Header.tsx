"use client";

import TopBar from "./TopBar";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";

import useHeader from "@/hooks/useHeader";

interface HeaderProps {
    showSearch?: boolean;
}

export default function Header({
    showSearch = false,
}: HeaderProps) {
    const { isScrolled } = useHeader();

    return (
        <>
            {/* Top Bar */}
            <div
                className={`overflow-hidden transition-all duration-300 ${
                    isScrolled
                        ? "max-h-0 opacity-0"
                        : "max-h-16 opacity-100"
                }`}
            >
                <TopBar />
            </div>

            {/* Navbar */}
            <Navbar />

            {/* Search Bar */}
            {showSearch && (
                <div
                    className={`overflow-hidden transition-all duration-300 ${
                        isScrolled
                            ? "max-h-0 opacity-0"
                            : "max-h-screen opacity-100"
                    }`}
                >
                    <SearchBar />
                </div>
            )}
        </>
    );
}