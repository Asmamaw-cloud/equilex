// import React, { useState } from 'react';

// interface FormsProps {
//   type: string;
//   initialData: any;
//   onSubmit: (data: { type: string; value: any }) => void;
// }

// export const LanguageForm: React.FC<FormsProps> = ({ type, initialData, onSubmit }) => {
//   const [language, setLanguage] = useState(initialData?.name || '');

//   const handleSubmit = () => {
//     onSubmit({ type, value: { name: language } });
//     setLanguage('');
//   };

//   return (
//     <div className="mt-4">
//       <input
//         type="text"
//         value={language}
//         onChange={(e) => setLanguage(e.target.value)}
//         placeholder="Enter language"
//         className="border p-2 w-full mb-4"
//       />
//       <button
//         onClick={handleSubmit}
//         className="bg-[#7B3B99] hover:bg-purple-700 text-white font-bold py-2 px-4 rounded w-full"
//       >
//         Submit
//       </button>
//     </div>
//   );
// };

// export const ExperienceForm: React.FC<FormsProps> = ({ type, initialData, onSubmit }) => {
//   const [experience, setExperience] = useState(initialData || '');

//   const handleSubmit = () => {
//     onSubmit({ type, value: experience });
//     setExperience('');
//   };

//   return (
//     <div className="mt-4">
//       <input
//         type="text"
//         value={experience}
//         onChange={(e) => setExperience(e.target.value)}
//         placeholder="Enter experience"
//         className="border p-2 w-full mb-4"
//       />
//       <button
//         onClick={handleSubmit}
//         className="bg-[#7B3B99] hover:bg-purple-700 text-white font-bold py-2 px-4 rounded w-full"
//       >
//         Submit
//       </button>
//     </div>
//   );
// };