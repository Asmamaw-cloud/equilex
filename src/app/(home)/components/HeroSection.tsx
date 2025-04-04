"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const HeroSection = () => {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <section className="bg-hero-section h-[calc(100vh-30px)]">
      <div className="absolute inset-0 bg-white/75 sm:bg-transparent sm:from-white/95 sm:to-white/25 sm:bg-gradient-to-r h-full"></div>

      <div className="relative mx-auto max-w-screen-2xl px-4 py-24 lg:py-6 sm:px-6 lg:flex lg:h-[calc(100vh-82px)] lg:items-center lg:px-8">
        <div className="max-w-xl text-center sm:text-left">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Your Bridge to
            <strong className="block font-extrabold text-[#7B3B99]">
              {" "}
              Legal Expertise.{" "}
            </strong>
          </h1>

          <p className="mt-6 text-lg text-gray-600 leading-relaxed">
            Empowering you with comprehensive legal solutions and expertise,
            bridging the gap between legal complexity and your peace of mind!
          </p>
          <>
            {!session && (
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button
                className="bg-[#7B3B99] hover:bg-[#444444] text-white px-8 py-6 text-base cursor-pointer"
                onClick={() => router.push("/signup")}
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
  
              <Button
                variant="outline"
                className="border-[#333333] text-[#333333] hover:bg-[#333333]/10 px-8 py-6 text-base cursor-pointer"
                onClick={() => {
                  const element = document.getElementById("how-it-works")
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" })
                  }
                }}
              >
                Learn More
              </Button>
            </div>
            )}
          </>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
