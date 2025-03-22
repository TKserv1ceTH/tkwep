'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('❌ กรุณากรอกอีเมลให้ถูกต้อง');
      return;
    }

    setLoading(true); // 🔄 เริ่มโหลด
    try {
      const res = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (data.success) {
        setMessage('✅ กรุณาตรวจสอบอีเมลของคุณเพื่อรีเซ็ตรหัสผ่าน');
      } else {
        setError(data.error);
      }
    } catch {
      setError('เกิดข้อผิดพลาดในการส่งคำขอ');
    } finally {
      setLoading(false); // ✅ โหลดเสร็จ
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-200">
      <Header />
      <main className="flex flex-col items-center justify-center flex-grow p-5">
        <h1 className="text-2xl font-bold text-green-400 mb-5">ลืมรหัสผ่าน</h1>
        <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg w-80">
          {message && <p className="text-blue-400 mb-3">{message}</p>}
          {error && <p className="text-red-400 mb-3">{error}</p>}

          <input
            type="email"
            name="email"
            placeholder="กรอกอีเมลของคุณ"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-3 rounded bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
            autoComplete="email"
            required
          />

          <button
            type="submit"
            className={`w-full p-2 rounded text-white ${
              loading
                ? 'bg-gray-500 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600 hover:scale-105 transition-transform'
            }`}
            disabled={loading}
          >
            {loading ? '⏳ กำลังส่งคำขอ...' : 'รีเซ็ตรหัสผ่าน'}
          </button>
        </form>

        <button onClick={() => router.push('/login')} className="mt-3 text-blue-400 hover:underline">
          กลับไปที่เข้าสู่ระบบ
        </button>
      </main>
      <Footer />
    </div>
  );
}
