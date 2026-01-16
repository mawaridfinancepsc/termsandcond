'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircle } from 'lucide-react';

export default function ConfirmationPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const ackNumber = searchParams.get('ack');

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center px-4">
      <div className="bg-white border rounded shadow-md p-8 max-w-md w-full text-center">
        <CheckCircle className="mx-auto h-14 w-14 text-green-600 mb-4" />

        <h1 className="text-xl font-semibold text-gray-900 mb-2">
          Submission Successful
        </h1>

        <p className="text-sm text-gray-600 mb-6">
          Your auto finance request has been successfully submitted.
        </p>

        <div className="border rounded bg-gray-50 p-4 mb-6">
          <p className="text-xs text-gray-500 mb-1">Acknowledgement Number</p>
          <p className="text-lg font-mono font-semibold text-gray-900">
            {ackNumber || '—'}
          </p>
        </div>

        <p className="text-xs text-gray-500 mb-6">
          Please save this number for future reference.
        </p>

        <button
          onClick={() => router.push('/')}
          className="w-full py-2.5 rounded bg-[#B19359] text-white hover:bg-black transition"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}
