import HeroSection from "@/components/homeSections/HeroSection";
import MoviesSection from "@/components/homeSections/MoviesSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MoviesSection />
      <div className="text-slate-700">Hello Movie DB</div>
    </>
  );
}
