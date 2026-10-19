import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { BranchesView } from "@/components/branches/BranchesView";

export const metadata: Metadata = {
  title: "Branches",
  description: "Seven Sides in DHA Phase 5, Lake City, Cantt and Model Town, Lahore. Addresses, phone numbers, opening hours and directions.",
};

export default function BranchesPage() {
  return (
    <>
      <PageHero
        label="Lahore"
        title={["Branches"]}
        intro="DHA Phase 5, Lake City, Cantt and Model Town. Dine in, take away or get it delivered."
        art={[
          { kind: "photo", src: "/images/cantt-bag.webp", alt: "", className: "left-[6%] top-[2%] aspect-[3/4] w-[36%]", rotate: -3 },
          { kind: "photo", src: "/images/lake-city-interior.webp", alt: "", className: "right-[6%] top-[8%] aspect-[3/4] w-[32%]", rotate: 3 },
          { kind: "illo", name: "mac-buckets", width: 190, className: "bottom-0 left-[22%] w-[44%]!" },
          { kind: "illo", name: "shakes", width: 90, className: "bottom-[6%] right-0 w-[20%]!" },
          { kind: "illo", name: "waffle-fries", width: 60, className: "left-0 top-[46%] w-[13%]!" },
        ]}
      />
      <BranchesView />
    </>
  );
}
