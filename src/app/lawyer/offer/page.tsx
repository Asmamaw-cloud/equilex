'use client'

import { useState } from "react"



const OfferPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleOpenModal = () => {
        setIsModalOpen(false)
    }

  return (
    <div className="min-h-screen flex items-center justify-center">
        <button
        onClick={handleOpenModal}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
            Offer
        </button>
    </div>
  )
}

export default OfferPage