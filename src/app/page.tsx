'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Phone, Mail, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
if (typeof window !== 'undefined') {
  sessionStorage.removeItem('leadInfo');
}
export default function VerifyMobilePage() {
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasLead, setHasLead] = useState(false);

  // ✅ Load from localStorage
  useEffect(() => {
    const stored = sessionStorage.getItem('leadInfo');
    if (stored) {
      const data = JSON.parse(stored);
      if (data?.Phone || data?.EmailAddress) {
        setMobile(data?.Phone || '');
        setEmail(data?.EmailAddress || '');
        setHasLead(true);
      }
    }
  }, []);

  const handleVerifyMobile = async () => {
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/search-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: `971${mobile}` }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Verification failed');
      }

      // ✅ Save to localStorage
      sessionStorage.setItem(
        'leadInfo',
        JSON.stringify({
          Phone: data.Phone,
          EmailAddress: data.EmailAddress,
          formOne:false,
          formTwo:false,
          formThree:false,
          isSubmitted:false,
          ackNum:""
        })
      );

      setMobile(data.Phone);
      setEmail(data.EmailAddress);
      setHasLead(true);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
    const router = useRouter();

useEffect(() => {
  sessionStorage.removeItem('leadInfo');
}, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <div className="flex-1 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-sm rounded-xl bg-white border border-slate-200 shadow-md p-8"
        >
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <Image src="/logo.png" alt="Company Logo" width={120} height={48} />
          </div>

          {!hasLead ? (
            <>
              <h1 className="text-lg font-semibold text-slate-900 mb-1">
                Verify mobile number
              </h1>

              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-2 rounded-md border bg-slate-100">
                  +971
                </span>

                <input
                  type="tel"
                  maxLength={9}
                  placeholder="5XXXXXXXX"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="w-full pl-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {error && <p className="text-xs text-red-500 mb-3">{error}</p>}

              <button
                onClick={handleVerifyMobile}
                disabled={loading || mobile.length !== 9}
                className="w-full py-2.5 bg-[#B19359] text-white rounded-md hover:bg-black disabled:opacity-50"
              >
                {loading ? 'Checking...' : 'Continue'}
              </button>
            </>
          ) : (
            <>
              <div className="text-center">
                <CheckCircle className="mx-auto h-10 w-10 text-green-600 mb-3" />

                <h2 className="text-lg font-semibold text-slate-900 mb-4">
                  Lead Found
                </h2>

                <div className="space-y-3 text-sm text-slate-700">
                  <div className="flex items-center gap-2 justify-center">
                    <Phone className="h-4 w-4 text-slate-500" />
                    <span>{mobile}</span>
                  </div>

                  <div className="flex items-center gap-2 justify-center">
                    <Mail className="h-4 w-4 text-slate-500" />
                    <span>{email || 'Email not available'}</span>
                  </div>
                </div>

                <button
                  className="mt-6 w-full py-2.5 bg-[#B19359] text-white rounded-md hover:bg-black"
                onClick={()=>router.push("/acknowledgement")}
                >
                  Proceed
                </button>
              </div>
            </>
          )}
        </motion.div>
      </div>

      <footer className="bg-[#1A1A1A] text-slate-300 text-xs py-4 text-center">
        © {new Date().getFullYear()} Mawarid Finance.
      </footer>
    </div>
  );
}
