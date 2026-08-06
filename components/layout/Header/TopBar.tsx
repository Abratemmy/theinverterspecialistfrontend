import Link from "next/link";
import {
  Truck,
  ShieldCheck,
  BadgeCheck,
} from "lucide-react";
import Container from "@/components/common/Container/Container";


export default function TopBar() {
  return (
    <div className="hidden bg-black text-white lg:block">
      <Container>
        <div className="flex h-10 items-center justify-between text-sm ">

          {/* Left */}

          <div className="flex items-center gap-6">
  
            <div className="flex items-center gap-2">
              <Truck size={15} className="text-green-500" />
              <span>Free Delivery for Orders ₦200,000+</span>
            </div>

            <div className="flex items-center gap-2">
              <ShieldCheck size={15} className="text-green-500" />
              <span>1 Year Warranty</span>
            </div>

            <div className="flex items-center gap-2">
              <BadgeCheck size={15} className="text-green-500" />
              <span>Expert Support</span>
            </div>

          </div>

          {/* Right */}

          <div className="flex items-center gap-5">

            <Link
              href="/track-order"
              className="hover:text-green-500 transition"
            >
              Track Order
            </Link>

            <Link
              href="/help-center"
              className="hover:text-green-500 transition"
            >
              Help Center
            </Link>

          </div>

        </div>
      </Container>
    </div>

  
  );
}