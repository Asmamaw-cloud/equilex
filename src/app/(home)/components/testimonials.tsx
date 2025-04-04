"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Small Business Owner",
    avatar: "/placeholder.svg?height=100&width=100",
    content:
      "EQUILEX connected me with a business attorney who helped me navigate the complexities of starting my company. The process was seamless, and the attorney was a perfect match for my needs.",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Family Law Client",
    avatar: "/placeholder.svg?height=100&width=100",
    content:
      "During my divorce, I needed a lawyer who spoke Mandarin and understood cultural nuances. EQUILEX found me the perfect attorney who made a difficult process much easier to handle.",
    rating: 5,
  },
  {
    id: 3,
    name: "David Rodriguez",
    role: "Immigration Case",
    avatar: "/placeholder.svg?height=100&width=100",
    content:
      "The immigration attorney I found through EQUILEX was exceptional. They were responsive, knowledgeable, and genuinely cared about my case. I'm now a permanent resident thanks to their help!",
    rating: 5,
  },
  {
    id: 4,
    name: "Emily Thompson",
    role: "Real Estate Investor",
    avatar: "/placeholder.svg?height=100&width=100",
    content:
      "As a real estate investor, I needed specialized legal advice for multiple properties. EQUILEX connected me with an attorney who had exactly the expertise I needed. Highly recommend!",
    rating: 4,
  },
  {
    id: 5,
    name: "James Wilson",
    role: "Criminal Defense Client",
    avatar: "/placeholder.svg?height=100&width=100",
    content:
      "When facing criminal charges, finding the right attorney quickly was crucial. EQUILEX matched me with a defense lawyer who fought tirelessly for me and achieved the best possible outcome.",
    rating: 5,
  },
  {
    id: 6,
    name: "Lisa Patel",
    role: "Intellectual Property Client",
    avatar: "/placeholder.svg?height=100&width=100",
    content:
      "Protecting my startup's IP was my top priority. The patent attorney I found through EQUILEX was exceptional - they secured our patents quickly and provided strategic advice for our business.",
    rating: 5,
  },
]

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const itemsPerPage = 3
  const pageCount = Math.ceil(testimonials.length / itemsPerPage)

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % pageCount)
  }

  const prevSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + pageCount) % pageCount)
  }

  const visibleTestimonials = testimonials.slice(activeIndex * itemsPerPage, (activeIndex + 1) * itemsPerPage)

  return (
    <section id="testimonials" className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-[#333333]">
            Testimonials
          </div>
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight lg:text-5xl">Success Stories</h2>
          <p className="max-w-[800px] text-muted-foreground md:text-xl/relaxed">
            Hear from clients who found the perfect legal match through EQUILEX
          </p>
        </div>

        <div className="relative mx-auto max-w-6xl">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visibleTestimonials.map((testimonial) => (
              <Card
                key={testimonial.id}
                className="relative overflow-hidden border bg-background shadow-md transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px]"
              >
                <CardContent className="p-6">
                  <div className="absolute top-4 right-4 text-[#333333]">
                    <Quote className="h-8 w-8 opacity-20" />
                  </div>

                  <div className="flex items-center gap-4 mb-4">
                    <Avatar className="h-12 w-12 border-2 border-[#333333]/20">
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-semibold">{testimonial.name}</h3>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>

                  <div className="flex mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>

                  <p className="text-muted-foreground">{testimonial.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Navigation controls */}
          <div className="mt-10 flex justify-center items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              disabled={activeIndex === 0}
              className="rounded-full border-[#333333] text-[#333333] hover:bg-[#333333]/10 hover:text-[#333333]"
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            <div className="flex gap-2">
              {Array.from({ length: pageCount }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`h-2.5 w-2.5 rounded-full transition-colors ${
                    activeIndex === index ? "bg-[#333333]" : "bg-[#333333]/30"
                  }`}
                  aria-label={`Go to testimonial page ${index + 1}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              disabled={activeIndex === pageCount - 1}
              className="rounded-full border-[#333333] text-[#333333] hover:bg-[#333333]/10 hover:text-[#333333]"
              aria-label="Next testimonials"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="mt-16 text-center">
          <Button
            className="bg-[#333333] hover:bg-[#444444] text-white px-8 py-6"
            onClick={() => {
              const element = document.getElementById("faq")
              if (element) {
                element.scrollIntoView({ behavior: "smooth" })
              }
            }}
          >
            Read More Success Stories
          </Button>
        </div>
      </div>
    </section>
  )
}

export default Testimonials

