import Faq from "./components/Faq";
import Features from "./components/features";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import HowItWorks from "./components/HowItWorks";
import Testimonials from "./components/testimonials";

export default function LandingPage() {
  return (
    <div className=" h-full  flex flex-col w-full ">
      <HeroSection/>
      <Features/>
      <HowItWorks/>
      <Testimonials/>
      <Faq/>
      <Footer/>
    </div>
  );
}
