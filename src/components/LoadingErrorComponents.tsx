import { Icon } from '@iconify/react';
import React from 'react';

const LoadingComponent = () => (
  <div className="w-full font-sans min-h-screen pt-24 pl-10 lg:pl-72 bg-[#f2f6fa]">
    <div className="flex flex-col items-center justify-center h-full">
      <Icon icon="eos-icons:loading" width="80" height="80" className="animate-spin text-green-500" />
      <p className="text-2xl text-green-500 mt-4">Loading...</p>
    </div>
  </div>
);
interface Props {
  errorMessage:any
}

const ErrorComponent: React.FC<Props> = ({ errorMessage }) => (
  <div className="w-full font-sans min-h-screen pt-24 pl-10 lg:pl-72 bg-[#f2f6fa] flex items-center justify-center">
    <div className="bg-white shadow-md rounded-lg p-6 max-w-md text-center">
      <Icon icon="mdi:alert-circle" width="80" height="80" className="text-red-500 mb-4" />
      <h2 className="text-2xl font-semibold text-red-500 mb-2">Error</h2>
      <p className="text-gray-600">{errorMessage}</p>
    </div>
  </div>
);

export { LoadingComponent, ErrorComponent };
