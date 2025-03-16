import Faq from "./components/Faq";
import HeroSection from "./components/HeroSection";

export default function LandingPage() {
  return (
    <div className=" h-full  flex flex-col w-full ">
      <HeroSection/>
      <Faq/>
    </div>
  );
}
