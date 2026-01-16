"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TermsAndConditionsStep() {
  const [accepted, setAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
const generateAckNumber = () => {
  const random = Math.floor(10000000 + Math.random() * 90000000); // 8 digits
  return `MAW${random}`;
};

const handleSubmit = async () => {
  try {
    setLoading(true);

    const stored = sessionStorage.getItem('leadInfo');
    if (!stored) {
      alert('Session expired. Please start again.');
      router.push('/verify-mobile');
      return;
    }

    const leadInfo = JSON.parse(stored);

    const ackNumber = generateAckNumber();

    const updatedLeadInfo = {
      ...leadInfo,
      formThree: true,
      isSubmitted: true,
      ackNum:ackNumber
    };

    // Save once (single source of truth)
    sessionStorage.setItem('leadInfo', JSON.stringify(updatedLeadInfo));

    const {
      Phone,
      EmailAddress,
      formOne,
      formTwo,
      formThree,
      isSubmitted,
      ackNum,
    } = updatedLeadInfo;

    if (!Phone || !EmailAddress) {
      alert('Invalid session data.');
      router.push('/verify-mobile');
      return;
    }

    const res = await fetch('/api/confirm', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        Phone,
        EmailAddress,
        formOne,
        formTwo,
        formThree,
        isSubmitted,
        ackNum, // ✅ send ACK to backend / Sheets
      }),
    });

    if (!res.ok) {
      throw new Error('Submission failed');
    }

    // Redirect with ACK (safe even after storage clear)
    router.push(`/confirmation?ack=${ackNumber}`);

    // Clear session AFTER navigation
    sessionStorage.removeItem('leadInfo');

  } catch (error) {
    console.error(error);
    alert('Something went wrong. Please try again.');
  } finally {
    setLoading(false);
  }
};



  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col">
      {/* Stepper */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Step step="1" title="Acknowledgement" />
          <Divider />
          <Step step="2" title="Terms & Conditions" />
          <Divider />
          <Step step="3" title="Confirmation" active />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 max-w-6xl mx-auto w-full px-4 py-6">
        <div className="bg-white border rounded shadow-sm p-4 md:p-6">
          <h1 className="text-lg font-semibold text-[#1F2937] text-center mb-1">
            Terms and Conditions – Auto Finance
          </h1>
          <p className="text-center text-sm text-gray-500 mb-4">
            Version 6 – May 2025
          </p>

          {/* Scrollable PDF-like content */}
          <div className="border rounded p-4 h-[520px] overflow-y-auto text-sm text-[#111827] leading-relaxed space-y-4">
            <div className="max-w-7xl border border-gray-300 rounded-sm overflow-hidden">
              <div className="bg-[#c9c39a] px-4 py-2">
                <h2 className="text-sm font-semibold text-gray-800">
                  Product Description
                </h2>
              </div>

              <div className="bg-white px-4 py-3">
                <p className="text-sm text-gray-700">
                  {/* Your terms content here */}
                </p>
              </div>
            </div>
          </div>

          {/* Acceptance */}
          <div className="mt-4 flex items-start gap-2">
            <input
              type="checkbox"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
              className="mt-1"
            />
            <label className="text-sm text-gray-700">
              I have read and agree to the Terms & Conditions
            </label>
          </div>

          {/* Actions */}
          <div className="mt-6 flex justify-between">
            <button
              onClick={() => router.back()}
              className="px-6 py-2 rounded border text-gray-700"
            >
              Back
            </button>

            <button
              disabled={!accepted || loading}
              onClick={handleSubmit}
              className={`px-6 py-2 rounded text-white ${
                accepted && !loading
                  ? "bg-[#B19359] hover:bg-black"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Helpers ---------- */

function Step({
  step,
  title,
  active = false,
}: {
  step: string;
  title: string;
  active?: boolean;
}) {
  return (
    <div className="flex flex-col items-center flex-1">
      <div
        className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-semibold
        ${active ? "bg-[#B19359] text-white" : "bg-gray-300 text-gray-700"}`}
      >
        {step}
      </div>
      <span className="text-xs mt-1">{title}</span>
    </div>
  );
}

function Divider() {
  return <div className="flex-1 h-px bg-gray-300 mx-2 mt-4" />;
}
