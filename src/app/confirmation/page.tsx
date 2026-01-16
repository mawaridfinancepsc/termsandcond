import { Suspense } from 'react';
import ConfirmationClient from './ConfirmationClient';

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<ConfirmationFallback />}>
      <ConfirmationClient />
    </Suspense>
  );
}

function ConfirmationFallback() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center px-4">
      <div className="bg-white border rounded shadow-md p-8 max-w-md w-full text-center animate-pulse">
        <div className="mx-auto h-14 w-14 bg-gray-200 rounded-full mb-4" />
        <div className="h-5 bg-gray-200 rounded w-3/4 mx-auto mb-3" />
        <div className="h-4 bg-gray-200 rounded w-full mb-6" />
        <div className="h-16 bg-gray-200 rounded mb-6" />
        <div className="h-10 bg-gray-200 rounded w-full" />
      </div>
    </div>
  );
}
