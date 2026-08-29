import Link from "next/link";
import {
  Truck,
  ShieldCheck,
  BadgeCheck,
} from "lucide-react";
import Container from "@/components/common/Container/Container";
import SocialLinks from "../Footer/SocialLinks";


export default function TopBar() {
  return (
    <div className="hidden bg-[var(--color-primary)] text-white lg:block">
      <Container>
        <div className="flex h-10 items-center justify-between text-sm ">

          {/* Left */}

          <div className="flex items-center gap-6">
  
            <div className="flex items-center gap-2">
              <Truck size={15} className="text-[var(--color-primary-dark)]" />
              <span>Free Delivery for Orders ₦200,000+</span>
            </div>

            <div className="flex items-center gap-2">
              <ShieldCheck size={15} className="text-[var(--color-primary-dark)]" />
              <span>Years Warranty</span>
            </div>

            <div className="flex items-center gap-2">
              <BadgeCheck size={15} className="text-[var(--color-primary-dark)]" />
              <span>Expert Support</span>
            </div>

          </div>

          {/* Right */}

          <div className="flex items-center gap-5 topBarSocialLinks">

             <a href="tel:+2348033585468" className="underline text-white text-md hover:text-[var(--color-primary-dark)] transition">
                +234 803 358 5468
            </a>

            <SocialLinks />

          </div>

        </div>
      </Container>
    </div>

  
  );
}