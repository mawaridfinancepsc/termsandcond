'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AcknowledgementPage() {
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
      formOne: true,      // ✅ mark form one completed
    })
  );

  router.push('/autofinance');
};


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Stepper */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Step step="1" title="Acknowledgement" active />
          <Divider />
          <Step step="2" title="Details" />
          <Divider />
          <Step step="3" title="Confirmation" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 max-w-6xl mx-auto w-full px-4 py-6">
        <div className="bg-white rounded shadow p-4">
          <h1 className="text-lg font-semibold text-center mb-4">
            Acknowledgement | إقرار
          </h1>

          {/* Table wrapper for mobile */}
          <div className="overflow-x-auto border">
            <table className="w-full border-collapse text-sm">
              <tbody>
                {/* Row 1 */}
                <tr className="border-b">
                  <td className="w-1/2 border-r p-4 align-top">
                    <p className="font-semibold mb-2">
                      The contractual relationship with the seller
                    </p>
                    <p>I am in contractual relationship with the seller through:</p>
                    <ul className="list-disc ml-5 mt-2 space-y-1">
                      <li>An advance payment made to the seller</li>
                      <li>AED ................................</li>
                      <li>
                        Trade in deal and my old car equal ....% of new car in value
                      </li>
                      <li>
                        The car reservation amount will be refunded as soon as the
                        financing ends
                      </li>
                      <li>There is no contractual relationship at all</li>
                    </ul>
                  </td>

                  <td
                    dir="rtl"
                    className="w-1/2 p-4 align-top text-right"
                  >
                    <p className="font-semibold mb-2">
                      العلاقة التعاقدية مع البائع
                    </p>
                    <p>قمت بالتعاقد مع البائع من خلال:</p>
                    <ul className="list-disc mr-5 mt-2 space-y-1">
                      <li>دفعة مقدمة مدفوعة للبائع مقدارها</li>
                      <li>درهم ................................</li>
                      <li>
                        صفقة استبدال والمركبة القديمة تمثل ....٪ من قيمة المركبة
                        الجديدة
                      </li>
                      <li>
                        سيتم استرداد مبلغ حجز السيارة بمجرد انتهاء التمويل
                      </li>
                      <li>لا توجد علاقة تعاقدية من الأساس</li>
                    </ul>
                  </td>
                </tr>

                {/* Row 2 */}
                <tr className="border-b">
                  <td className="border-r p-4 align-top">
                    <p>
                      I, the undersigned, acknowledge the termination of any
                      existing contractual relationship between me and the
                      merchant for the subject of finance “vehicle”.
                    </p>

                    <p className="mt-3">
                      In the event that I paid / will pay part cost of the
                      vehicle, I agree to terminate the contractual relationship
                      regarding a common share of the vehicle equal to the
                      percentage of the unpaid amount of the total cost.
                    </p>
                  </td>

                  <td dir="rtl" className="p-4 align-top text-right">
                    <p>
                      أقرّ بموجب هذا بإنهاء أي علاقة تعاقدية قائمة بيني وبين
                      التاجر بخصوص تمويل المركبة.
                    </p>

                    <p className="mt-3">
                      في حال دفعت / سأدفع جزءًا من تكلفة المركبة، أوافق على
                      إنهاء العلاقة التعاقدية بما يتناسب مع نسبة المبلغ غير
                      المدفوع من إجمالي التكلفة.
                    </p>
                  </td>
                </tr>

                {/* Row 3 */}
                <tr>
                  <td className="border-r p-4 align-top">
                    <p className="font-semibold mb-2">
                      Option of Cooling-off period
                    </p>
                    <p>
                      You are eligible for cooling off period of (5) business
                      days from the date of application approval. During this
                      period, you may withdraw from the transaction without any
                      financial obligation except actual costs.
                    </p>
                  </td>

                  <td dir="rtl" className="p-4 align-top text-right">
                    <p className="font-semibold mb-2">
                      خيار فترة المراجعة
                    </p>
                    <p>
                      يحق لك الاستفادة من فترة مراجعة (خيار التراجع) لمدة خمسة
                      أيام عمل من تاريخ الموافقة على الطلب، مع إمكانية إلغاء
                      المعاملة وفق الشروط المعتمدة.
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Checkbox */}
          <div className="mt-4 flex items-start gap-2">
            <input
              type="checkbox"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
              className="mt-1"
            />
            <label className="text-sm">
              I agree to the acknowledgement | أوافق على الإقرار
            </label>
          </div>

          {/* Actions */}
          <div className="mt-6 flex justify-end">
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

/* ---------- Stepper ---------- */

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
