import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { MenuView } from "@/components/menu/MenuView";
import { MenuBoardDialog } from "@/components/menu/MenuBoardDialog";

export const metadata: Metadata = {
  title: "Menu",
  description: "The Sando, Red Tenders, sliders, wraps, loaded waffle fries, hand spun shakes and more. Pick your heat: No Heat, Country Heat or Screamer.",
};

export default function MenuPage() {
  return (
    <>
      <PageHero
        label="Pick your heat"
        title={["The menu"]}
        intro="No Heat, Country Heat or Screamer. Anything with the flame meter is made to your level."
        art={[
          { kind: "illo", name: "sando", width: 200, className: "left-[27%] top-[2%] w-[44%]!" },
          { kind: "illo", name: "tender-stack", width: 100, className: "left-[2%] top-[18%] w-[21%]!" },
          { kind: "illo", name: "shakes", width: 120, className: "right-0 top-0 w-[25%]!" },
          { kind: "illo", name: "toastie", width: 140, className: "bottom-[4%] right-[2%] w-[30%]!" },
          { kind: "illo", name: "waffle-fries", width: 70, className: "bottom-[2%] left-[8%] w-[15%]!" },
          { kind: "illo", name: "mac-buckets", width: 150, className: "bottom-0 left-[30%] w-[32%]!" },
        ]}
      >
        <MenuBoardDialog />
      </PageHero>
      <MenuView />
    </>
  );
}
