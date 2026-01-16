'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import FeaturesTable from './FeaturesTable';

export default function TermsAndConditionsStep() {
  const [accepted, setAccepted] = useState(false);
  const router = useRouter();


  
  const handleNext = () => {
  const stored = sessionStorage.getItem('leadInfo');

  if (!stored) {
    alert('Session expired. Please start again.');
    router.push('/verify-mobile');
    return;
  }

  const leadInfo = JSON.parse(stored);

  sessionStorage.setItem(
    'leadInfo',
    JSON.stringify({
      ...leadInfo,
      formTwo: true,      // ✅ mark form one completed
    })
  );

  router.push('/terms');
};



  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col">
      {/* Stepper */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Step step="1" title="Acknowledgement" />
          <Divider />
          <Step step="2" title="Terms & Conditions" active />
          <Divider />
          <Step step="3" title="Confirmation" />
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
      Auto / Vehicle Finance provides an opportunity to fulfill your needs for financing vehicles.
    </p>
  </div>
</div>


           <div className="max-w-7xl border border-gray-300 rounded-sm overflow-hidden">
  <div className="bg-[#c9c39a] px-4 py-2">
    <h2 className="text-sm font-semibold text-gray-800">
     Sharia’a Structure
    </h2>
  </div>

  <div className="bg-white px-4 py-3">
    <p className="text-sm text-gray-700">
     Vehicle/Car Murabaha:
This product is based on Murabaha mode where Mawarid Finance PJSC. buys the vehicle/car from and after receiving it physically or
constructively, Mawarid Finance PJSC. sells the same vehicle/car to you on Murabaha basis at a price which consists of cost-plus profit
amount agreed upon in the contract. All terms and conditions of the transaction are disclosed to you.
    </p>
  </div>
</div>


<FeaturesTable/>

            <Section title="Key Customer Rights">
              <ul className="list-decimal ml-5 space-y-1">
                <li>Understand Sharia-compliant finance structure</li>
                <li>Receive full disclosure of profit rate and fees</li>
                <li>Request all documents before signing</li>
                <li>Apply for early or partial settlement</li>
                <li>Receive signed copies of documents</li>
              </ul>
            </Section>

            <Section title="Key Customer Responsibilities">
              <ul className="list-decimal ml-5 space-y-1">
                <li>Provide accurate documentation</li>
                <li>Pay installments on time</li>
                <li>Protect OTPs and banking credentials</li>
                <li>Inform bank of contact detail changes</li>
              </ul>
            </Section>

            <Section title="Cooling-Off Period">
              You are entitled to a cooling-off period of five (5) business days
              from the date of approval. During this period, the transaction may
              be cancelled subject to actual incurred costs.
            </Section>

            <Section title="Early & Partial Settlement">
              Early settlement fee shall be 1% of outstanding amount (maximum
              AED 10,000) or unearned profit, whichever is lower, in accordance
              with CBUAE regulations.
            </Section>

            <div className="bg-[#F3F4F6] border p-3 rounded text-xs">
              This web page is a digital representation of the official
              “Auto Finance – Terms and Conditions” document issued by
              MAWARID FINANCE PJSC.
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
  disabled={!accepted}
  onClick={handleNext}
  className={`px-6 py-2 rounded text-white ${
    accepted
      ? 'bg-[#B19359] hover:bg-black'
      : 'bg-gray-300 cursor-not-allowed'
  }`}
>
  Next
</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Helpers ---------- */

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="font-semibold text-[#374151] mb-1">{title}</h2>
      <div>{children}</div>
    </div>
  );
}

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
        ${active ? 'bg-[#B19359] text-white' : 'bg-gray-300 text-gray-700'}`}
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
