'use client'

import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';
import { addFaq } from '../api/faq';

export default function FaqAdminForm() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const mutationFn = async ({
    question, answer
  }: {question:string, answer: string}) => {
    await addFaq(question, answer)
  }

  const {mutateAsync} = useMutation({
    mutationFn,
    onSuccess: () => {
        toast.success("FAQ added successfully!");
    },
    onError:()=>{
        toast.error("Failed to add the faq.");
      }
  });
  




  const handleSubmit = async () => {
    if (question.trim() && answer.trim()) {
        try {
            await mutateAsync({ question, answer });
          } catch (e) {
            console.log(e);
          }
    } else {
        toast('Both question and answer are required.');
      return;
    }

  };

  return (
    <div className="w-full font-sans min-h-screen pt-28 pl-10 lg:pl-72 bg-[#f2f6fa] text-black overflow-auto flex flex-col gap-4">
      <div className="p-4 mt-4 flex flex-col gap-4">
        <label htmlFor="question" className="text-lg font-semibold">
          Question
        </label>
        <textarea
          id="question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full p-4 rounded-lg bg-gray-200 border-none resize-none h-32"
          placeholder="Enter your question here..."
        />
      </div>

      <div className="p-4 mt-4 flex flex-col gap-4">
        <label htmlFor="answer" className="text-lg font-semibold">
          Answer
        </label>
        <textarea
          id="answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="w-full p-4 rounded-lg bg-gray-200 border-none resize-none h-32"
          placeholder="Enter your response here..."
        />
        <button
          className="px-6 py-2 rounded-2xl bg-[#7B3B99] text-white self-end hover:bg-[#692e85] transition"
          onClick={handleSubmit}
        >
          SEND
        </button>
      </div>
    </div>
  );
}
