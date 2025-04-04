"use client"

import { MessageSquare, Search, Shield, Zap, Clock, Award, CheckCircle } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

const Features = () => {
  const [activeTab, setActiveTab] = useState("clients")

  const clientFeatures = [
    {
      icon: <Search className="h-6 w-6" />,
      title: "Smart Matching",
      description:
        "Our AI-powered algorithm matches you with lawyers based on expertise, location, and case requirements.",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Verified Professionals",
      description: "Every lawyer on our platform is thoroughly vetted and credentials-verified for your peace of mind.",
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "Secure Communication",
      description: "Our encrypted platform ensures all client-lawyer communications remain confidential and secure.",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Fast Response",
      description: "Get connected with qualified legal professionals within hours, not days or weeks.",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "24/7 Availability",
      description: "Access legal help whenever you need it with our round-the-clock platform availability.",
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Quality Guarantee",
      description:
        "If you're not satisfied with your match, we'll connect you with another lawyer at no additional cost.",
    },
  ]

  const lawyerFeatures = [
    {
      icon: <Search className="h-6 w-6" />,
      title: "Client Acquisition",
      description: "Grow your practice with a steady stream of pre-qualified clients seeking your specific expertise.",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Reputation Building",
      description: "Build your online presence with verified reviews and ratings from satisfied clients.",
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "Streamlined Communication",
      description: "Our platform handles scheduling, messaging, and document sharing in one secure place.",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Efficient Workflow",
      description: "Integrated tools for case management, billing, and client onboarding save you valuable time.",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Flexible Schedule",
      description: "Set your own availability and work on cases that fit your expertise and schedule.",
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Professional Network",
      description: "Connect with other legal professionals for referrals, collaboration, and knowledge sharing.",
    },
  ]

  const features = activeTab === "clients" ? clientFeatures : lawyerFeatures

  return (
    <section id="features" className="w-full py-16 md:py-24 lg:py-32 bg-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-[#333333]">
            Features
          </div>
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight lg:text-5xl">
            Why Choose <span className="text-[#333333]">EQUILEX</span>?
          </h2>
          <p className="max-w-[800px] text-muted-foreground md:text-xl/relaxed">
            Our platform offers unique advantages to both clients seeking legal help and lawyers looking to grow their
            practice.
          </p>

          <div className="flex space-x-2 p-1 mt-6 bg-gray-100 rounded-full">
            <Button
              variant={activeTab === "clients" ? "default" : "ghost"}
              className={activeTab === "clients" ? "bg-[#333333] text-white" : "text-gray-600"}
              onClick={() => setActiveTab("clients")}
            >
              For Clients
            </Button>
            <Button
              variant={activeTab === "lawyers" ? "default" : "ghost"}
              className={activeTab === "lawyers" ? "bg-[#333333] text-white" : "text-gray-600"}
              onClick={() => setActiveTab("lawyers")}
            >
              For Lawyers
            </Button>
          </div>
        </div>

        <div className="mx-auto grid max-w-6xl gap-8 py-12 sm:grid-cols-2 md:gap-12 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-lg border bg-background p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:translate-y-[-5px] group"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#333333] to-[#555555] text-white mb-4">
                {feature.icon}
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
              <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-[#333333] to-[#555555] transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button
            className="bg-[#333333] hover:bg-[#444444] text-white px-8 py-6"
            onClick={() => {
              const element = document.getElementById(activeTab === "clients" ? "how-it-works" : "faq")
              if (element) {
                element.scrollIntoView({ behavior: "smooth" })
              }
            }}
          >
            {activeTab === "clients" ? "See How It Works" : "Join Our Network"}
            <CheckCircle className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}

export default Features

