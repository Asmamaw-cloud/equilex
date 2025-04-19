import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React from "react";
import { createOffer } from "../api/offer";

interface OfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  client_id: number;
}

const OfferModal: React.FC<OfferModalProps> = ({
  isOpen,
  onClose,
  client_id,
}) => {
  const [inputData, setInputData] = React.useState({
    title: "",
    description: "",
    price: 0,
  });

  const { data: session } = useSession();
  const lawyer_id = session?.user.image?.id;

  const handleChange = (e: any) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const createCaseMutation = useMutation({
    mutationFn: async (data: any) => createOffer(data),
    onSuccess: (data) => {
      onClose();
      setInputData({
        title: "",
        description: "",
        price: 0,
      });
      console.log("Offer created successfully", data);
    },
  });

  const handleSubmit = async () => {
    const data = {
      ...inputData,
      price: Number(inputData.price),
      lawyer_id: lawyer_id,
      client_id: client_id,
    };
    createCaseMutation.mutate(data);
  };

  return (
    <div className=" fixed inset-0 flex items-center justify-center bg-black/50">
      <div className=" bg-white p-6 rounded-md shadow-md w-96 ">
        <h2 className=" text-xl font-bold mb-4 ">Make an Offer</h2>
        <div className="mb-4">
          <label className=" block text-sm font-medium text-gray-700 ">
            Title
          </label>
          <input
            name="title"
            type="text"
            value={inputData.title}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <input
            name="description"
            type="text"
            value={inputData.description}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            name="price"
            type="number"
            value={inputData.price}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className=" flex justify-evenly ">
          <button
            onClick={onClose}
            className=" mr-2 px-4 py-2 bg-gray-300 rounded-md "
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-[#7B3B99] text-white rounded-md"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default OfferModal;
