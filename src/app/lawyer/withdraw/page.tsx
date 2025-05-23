'use client'


import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner";
import { withdraw } from "../api/withdraw";

const Withdraw = () => {
    const queryClient = useQueryClient();
    const router = useRouter()
    const [message, setMessage] = useState<string>("")
    const [amount, setAmount] = useState<number>(0);

     const withdrawMutationFn = async (data: number) => {
    return withdraw(data);
  };

    const withdawMutation: UseMutationResult<void, unknown, number> = useMutation({
        mutationFn:  withdrawMutationFn,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cases"] });
        toast("Withdraw submitted successfully!");
        },
        onError: (e:any) => {
        console.log(e?.response?.data?.error  );
        
        toast.error(`${e?.response?.data?.error}`);
      
        }
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(Number(e.target.value))
    }
    const handleSubmit = async (e:any) => {
        e.preventDefault()
        if (isNaN(amount) || amount <= 0) {
      setMessage("Please enter a valid amount.");
      return;
    }
    try {
        await withdawMutation.mutateAsync( amount )
    } catch (error) {
        console.log(error)
    }
    }


  return (
    <div className="p-6 bg-gray-200 min-h-screen relative overflow-hidden">
      <div className="bg-white h-[100vh] w-[80%] rounded-xl m-auto p-10 relative flex flex-col gap-8">
      <div
          onClick={() => router.back()}
          className="w-20 text-center bg-[#7B3B99] text-white font-bold py-2 px-4 rounded transition duration-300 hover:bg-purple-700 inline-block mb-2 md:mb-0 cursor-pointer"
        >
          Back
        </div>

        <div className=" bg-white p-4 rounded w-1/3">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Amount</label>
              <input
                type="number"
                name="amount"
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleSubmit}
                className=" w-22 text-center bg-[#7B3B99] text-white font-bold py-2 px-4 rounded transition duration-300 hover:bg-purple-700 inline-block mb-2 md:mb-0 cursor-pointer"
              >
                Withdraw
              </button>
            </div>
          </form>
          {message && <p>{message}</p>}
        </div>

        <hr />
      </div>
      {/* <ToastContainer /> */}
    </div>
  )
}

export default Withdraw