"use client"

import { CheckCircle, Search, MessageSquare, FileText, CreditCard, ArrowRight, Star, Shield, Clock } from "lucide-react"
import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      title: "Discover Your Attorney",
      description:
        "Browse our curated network of verified attorneys. Filter by specialty, language, location, and client ratings to find your perfect legal match.",
      icon: <Search className="h-7 w-7" />,
      color: "from-blue-500 to-blue-600",
      features: ["500+ Verified Attorneys", "Multi-language Support", "Specialty Filtering"],
    },
    {
      number: 2,
      title: "Connect & Consult",
      description:
        "Schedule a free initial consultation. Discuss your case confidentially through our secure platform and get expert legal advice.",
      icon: <MessageSquare className="h-7 w-7" />,
      color: "from-emerald-500 to-emerald-600",
      features: ["Free Consultation", "Secure Messaging", "Video Calls Available"],
    },
    {
      number: 3,
      title: "Secure Agreement",
      description:
        "Formalize your partnership with transparent contracts. Clear terms, defined scope, and protected payments ensure peace of mind.",
      icon: <FileText className="h-7 w-7" />,
      color: "from-purple-500 to-purple-600",
      features: ["Transparent Pricing", "Clear Contracts", "Legal Protection"],
    },
    {
      number: 4,
      title: "Success-Based Payment",
      description:
        "Pay only when you're satisfied. Our escrow system protects your investment until your legal matter is successfully resolved.",
      icon: <CreditCard className="h-7 w-7" />,
      color: "from-orange-500 to-orange-600",
      features: ["Escrow Protection", "Success-Based", "Satisfaction Guaranteed"],
    },
  ]

  const stats = [
    { icon: <Star className="h-5 w-5" />, value: "4.9/5", label: "Client Rating" },
    { icon: <Shield className="h-5 w-5" />, value: "100%", label: "Secure Platform" },
    { icon: <Clock className="h-5 w-5" />, value: "24h", label: "Response Time" },
  ]

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="how-it-works" className="relative w-full py-20 md:py-28 lg:py-36 overflow-hidden">
      {/* Background with gradient and pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.05),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.05),transparent_50%)]"></div>

      <div className="relative container px-4 md:px-6">
        {/* Header Section */}
        <div className="flex flex-col items-center justify-center space-y-6 text-center mb-16">
          <div className="inline-flex items-center rounded-full bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">
            <span className="mr-2">⚡</span>
            Simple Process
          </div>
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            How{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">EQUILEX</span>{" "}
            Works
          </h2>
          <p className="max-w-3xl text-lg text-slate-600 md:text-xl leading-relaxed">
            Connect with top-rated attorneys in minutes, not days. Our streamlined platform makes legal help accessible,
            transparent, and results-driven.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-8">
            {stats.map((stat, index) => (
              <div key={index} className="flex items-center gap-2 text-slate-600">
                <div className="text-blue-600">{stat.icon}</div>
                <span className="font-bold text-slate-900">{stat.value}</span>
                <span className="text-sm">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Steps Section */}
        <div ref={ref} className="relative mx-auto max-w-7xl">
          {/* Connection line for desktop */}
          <div className="absolute left-0 right-0 top-24 h-0.5 bg-gradient-to-r from-blue-200 via-purple-200 to-orange-200 hidden lg:block"></div>

          <div className="grid gap-8 lg:grid-cols-4 md:grid-cols-2">
            {steps.map((step, index) => (
              <div
                key={index}
                className={cn(
                  "relative group transition-all duration-700 ease-out",
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12",
                )}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                {/* Card */}
                <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 group-hover:border-slate-200 h-full">
                  {/* Step number badge */}
                  <div className="absolute -top-4 left-8 h-8 w-8 rounded-full bg-gradient-to-r from-slate-600 to-slate-700 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div
                    className={cn(
                      "flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-r text-white shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300",
                      step.color,
                    )}
                  >
                    {step.icon}
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-slate-700 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">{step.description}</p>

                    {/* Features */}
                    <ul className="space-y-2">
                      {step.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm text-slate-500">
                          <CheckCircle className="h-4 w-4 text-emerald-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Arrow connector for desktop */}
                  {index < steps.length - 1 && (
                    <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 hidden lg:block">
                      <div className="bg-white rounded-full p-2 shadow-md border border-slate-200">
                        <ArrowRight className="h-4 w-4 text-slate-400" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-20 text-center">
            <div className="inline-flex flex-col sm:flex-row gap-4 items-center">
              <button className="group relative inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2">
                <span>Start Your Legal Journey</span>
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="inline-flex items-center justify-center rounded-xl border-2 border-slate-300 px-8 py-4 text-lg font-semibold text-slate-700 transition-all duration-300 hover:border-slate-400 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500/50 focus:ring-offset-2">
                Watch Demo
              </button>
            </div>
            <p className="mt-4 text-sm text-slate-500">
              No upfront fees • Free consultation • 100% satisfaction guaranteed
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
