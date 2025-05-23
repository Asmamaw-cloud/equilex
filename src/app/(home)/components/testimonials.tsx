"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  {
    id: 1,
    name: "Alex Rivera",
    role: "Startup Founder",
    avatar: "/placeholder.svg?height=100&width=100",
    content:
      "This platform transformed how we manage our business operations. The intuitive interface and powerful features helped us scale from 10 to 100+ employees seamlessly.",
    rating: 5,
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Marketing Director",
    avatar: "/placeholder.svg?height=100&width=100",
    content:
      "The analytics dashboard gives us insights we never had before. Our team productivity increased by 40% within the first month of implementation.",
    rating: 5,
  },
  {
    id: 3,
    name: "Marcus Johnson",
    role: "Product Manager",
    avatar: "/placeholder.svg?height=100&width=100",
    content:
      "Outstanding customer support and a product that actually delivers on its promises. The automation features saved us countless hours every week.",
    rating: 5,
  },
  {
    id: 4,
    name: "Sofia Chen",
    role: "Operations Lead",
    avatar: "/placeholder.svg?height=100&width=100",
    content:
      "The seamless integration with our existing tools made the transition effortless. Our workflow efficiency improved dramatically from day one.",
    rating: 4,
  },
  {
    id: 5,
    name: "David Thompson",
    role: "Tech Lead",
    avatar: "/placeholder.svg?height=100&width=100",
    content:
      "Robust, reliable, and feature-rich. The API documentation is excellent, and the platform scales beautifully with our growing needs.",
    rating: 5,
  },
  {
    id: 6,
    name: "Emma Rodriguez",
    role: "CEO",
    avatar: "/placeholder.svg?height=100&width=100",
    content:
      "This solution exceeded our expectations. The ROI was evident within weeks, and our team adoption rate was the highest we've ever seen.",
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
    <section
      id="testimonials"
      className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="inline-flex items-center rounded-full bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 text-sm font-semibold text-blue-700 border border-blue-200">
            ✨ Customer Stories
          </div>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl/tight lg:text-5xl bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
            Loved by thousands of teams
          </h2>
          <p className="max-w-[800px] text-gray-600 md:text-xl/relaxed">
            See how companies like yours are achieving remarkable results with our platform
          </p>
        </div>

        <div className="relative mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {visibleTestimonials.map((testimonial) => (
              <Card
                key={testimonial.id}
                className="relative overflow-hidden border-0 bg-white/80 backdrop-blur-sm shadow-xl transition-all duration-300 hover:shadow-2xl hover:translate-y-[-8px] hover:bg-white/90"
              >
                <CardContent className="p-8">
                  <div className="absolute top-6 right-6">
                    <div className="p-2 rounded-full bg-gradient-to-br from-blue-100 to-purple-100">
                      <Quote className="h-5 w-5 text-blue-600" />
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative">
                      <Avatar className="h-14 w-14 border-3 border-white shadow-lg">
                        <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                          {testimonial.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{testimonial.name}</h3>
                      <p className="text-sm font-medium text-blue-600">{testimonial.role}</p>
                    </div>
                  </div>

                  <div className="flex mb-6">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < testimonial.rating ? "text-amber-400 fill-amber-400" : "text-gray-200"
                        }`}
                      />
                    ))}
                  </div>

                  <p className="text-gray-700 leading-relaxed font-medium">{testimonial.content}</p>

                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Navigation controls */}
          <div className="mt-12 flex justify-center items-center gap-6">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              disabled={activeIndex === 0}
              className="rounded-full border-2 border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 disabled:opacity-50 disabled:cursor-not-allowed h-12 w-12 shadow-lg"
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>

            <div className="flex gap-3">
              {Array.from({ length: pageCount }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`h-3 w-8 rounded-full transition-all duration-300 ${
                    activeIndex === index
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg"
                      : "bg-gray-300 hover:bg-gray-400"
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
              className="rounded-full border-2 border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 disabled:opacity-50 disabled:cursor-not-allowed h-12 w-12 shadow-lg"
              aria-label="Next testimonials"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </div>

        <div className="mt-16 text-center">
          <Button
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-6 rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            onClick={() => {
              const element = document.getElementById("faq")
              if (element) {
                element.scrollIntoView({ behavior: "smooth" })
              }
            }}
          >
            View All Success Stories
          </Button>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
