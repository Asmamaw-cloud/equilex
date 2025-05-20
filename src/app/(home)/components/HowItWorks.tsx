"use client"

import { CheckCircle, Search, MessageSquare, FileText, CreditCard } from "lucide-react"
import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      title: "Search for Attorneys",
      description:
        "Search for attorneys based on language, specialty, or region to find the perfect match for your case.",
      icon: <Search className="h-6 w-6 text-white" />,
    },
    {
      number: 2,
      title: "Chat & Consult",
      description: "Connect and chat with potential attorneys to discuss your case details and requirements.",
      icon: <MessageSquare className="h-6 w-6 text-white" />,
    },
    {
      number: 3,
      title: "Form a Contract",
      description:
        "Once you find the right attorney, formalize your agreement with a clear contract outlining services.",
      icon: <FileText className="h-6 w-6 text-white" />,
    },
    {
      number: 4,
      title: "Pay After Completion",
      description: "Only pay for legal services after your case is successfully completed, ensuring satisfaction.",
      icon: <CreditCard className="h-6 w-6 text-white" />,
    },
  ]

  // Create a single ref for the section
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="how-it-works" className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-[#333333]">
            Process
          </div>
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight lg:text-5xl">
            How <span className="text-[#333333]">EQUILEX</span> Works
          </h2>
          <p className="max-w-[800px] text-muted-foreground md:text-xl/relaxed">
            Finding the right legal help has never been easier. Our streamlined process connects you with the perfect
            attorney for your needs.
          </p>
        </div>

        <div ref={ref} className="relative mx-auto max-w-6xl mt-12">
          {/* Connection line */}
          {/* <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#333333] to-[#555555]/30 hidden lg:block"></div> */}

          <div className="grid gap-12 py-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div
                key={index}
                className={cn(
                  "relative flex flex-col items-center text-center transition-all duration-700",
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
                )}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#333333] to-[#555555] text-xl font-bold text-white shadow-lg mb-6 z-10">
                  {step.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>

                {/* Step number */}
                <div className="absolute -top-4 -right-4 h-8 w-8 rounded-full bg-[#333333]/10 flex items-center justify-center text-[#333333] font-bold">
                  {step.number}
                </div>

                {/* Checkmark for completed steps (visual only) */}
                {index < steps.length - 1 && (
                  <div className="absolute top-16 right-0 lg:right-auto lg:left-1/2 lg:top-auto lg:translate-y-0 lg:translate-x-32 hidden lg:block">
                    <CheckCircle className="h-6 w-6 text-[#333333]" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-16 flex justify-center">
            <a
              href="#testimonials"
              className="inline-flex items-center justify-center rounded-md bg-[#333333] px-6 py-3 text-base font-medium text-white shadow-md transition-all duration-300 hover:bg-[#444444] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#333333]/50 focus:ring-offset-2"
            >
              See Success Stories
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks

