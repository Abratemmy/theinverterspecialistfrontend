"use client";

import Link from "next/link";
import { Search, ShoppingCart, User, Menu } from "lucide-react";

import Logo from "./Logo";
import NavLinks from "../Header/NavLinks";
import Container from "@/components/common/Container/Container";

export default function Navbar() {
  return (
    <header className="
    sticky
    top-0
    z-50
    bg-white
    border-b
    shadow-sm
  ">

      <Container>

        <div className="flex h-20 items-center justify-between">

          {/* Logo */}

          <Logo />

          {/* Desktop Menu */}

          <NavLinks />

          {/* Right */}

          <div className="flex items-center gap-5">


            <button className="relative">

              <ShoppingCart size={22} />

              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-yellow-400 text-xs font-bold text-black">
                0
              </span>

            </button>

            <Link href="/login">

              <User size={22} />

            </Link>

            <button className="lg:hidden">

              <Menu size={25} />

            </button>

          </div>

        </div>

      </Container>

    </header>
  );
}