"use client";

import { rate } from "@/app/client/api/rating";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { toast } from "sonner";

interface ratingProps {
  show: any;
  onClose: any;

  case_id: any;
  lawyer_id: any;
}
const RatingPopup: React.FC<ratingProps> = ({
  show,
  onClose,
  case_id,
  lawyer_id,
}) => {
  const queryClient = useQueryClient();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");

  const ratingMutation = useMutation({
    mutationFn: (id: object) => rate(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rating"] });
      toast.success("rating sucessfull!")
      onClose();
    },
  });

  const handleSubmit = async () => {
    const inputdata = {
      case_id: case_id,
      lawyer_id: lawyer_id,
      rate: rating,
      comment: comment,
    };
    await ratingMutation.mutateAsync(inputdata);
  };

  if (!show) return null;


  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4">Rate and Comment</h2>
        <div className="flex justify-center mb-4">
          {[...Array(5)].map((star, index) => {
            const ratingValue = index + 1;
            return (
              <label key={index}>
                <input
                  type="radio"
                  name="rating"
                  value={ratingValue}
                  onClick={() => setRating(ratingValue)}
                  className="hidden"
                />
                <FaStar
                  size={30}
                  className={`cursor-pointer ${
                    ratingValue <= (hover || rating)
                      ? "text-yellow-500"
                      : "text-gray-400"
                  }`}
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(0)}
                />
              </label>
            );
          })}
        </div>
        <textarea
          className="w-full border p-2 rounded mb-4"
          placeholder="Write your comment here..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <div className="flex justify-end">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default RatingPopup;
