import { Hero } from "@/components/home/Hero";
import { PaperMarquee } from "@/components/brand/PaperMarquee";
import { Signatures } from "@/components/home/Signatures";
import { HeatScroll } from "@/components/home/HeatScroll";
import { StoryTeaser } from "@/components/home/StoryTeaser";
import { BranchesTeaser } from "@/components/home/BranchesTeaser";

export default function Home() {
  return (
    <>
      <Hero />
      <PaperMarquee />
      <Signatures />
      <HeatScroll />
      <StoryTeaser />
      <BranchesTeaser />
    </>
  );
}
