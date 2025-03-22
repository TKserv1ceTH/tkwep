'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '', rememberMe: false });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      setError('❌ กรุณากรอกอีเมลให้ถูกต้อง');
      return;
    }

    setLoading(true); // 🔄 เริ่มโหลด
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        alert('✅ เข้าสู่ระบบสำเร็จ!');
        router.push('/dashboard');
      } else {
        setError(data.error);
      }
    } catch {
      setError('เกิดข้อผิดพลาดในการเข้าสู่ระบบ');
    } finally {
      setLoading(false); // ✅ โหลดเสร็จ
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-200">
      <Header />
      <main className="flex flex-col items-center justify-center flex-grow p-5">
        <h1 className="text-2xl font-bold text-green-400 mb-5">เข้าสู่ระบบ</h1>
        <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg w-80">
          {error && <p className="text-red-400 mb-3">{error}</p>}

          <input
            type="email"
            name="email"
            placeholder="อีเมล"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
            autoComplete="email"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="รหัสผ่าน"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
            autoComplete="current-password"
            required
          />

          {/* ✅ Checkbox "จำฉัน" */}
          <div className="flex items-center mb-3">
            <input
              id="rememberMe"
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="mr-2 cursor-pointer"
            />
            <label htmlFor="rememberMe" className="text-sm text-gray-300 cursor-pointer">
              จำการเข้าสู่ระบบ
            </label>
          </div>

          <button
            type="submit"
            className={`w-full p-2 rounded text-white ${
              loading
                ? 'bg-gray-500 cursor-not-allowed'
                : 'bg-green-500 hover:bg-green-600 hover:scale-105 transition-transform'
            }`}
            disabled={loading}
          >
            {loading ? '⏳ กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
          </button>

          {/* ✅ ลิงก์ "ลืมรหัสผ่าน?" */}
          <div className="text-center mt-3">
            <Link href="/forgot-password" className="text-blue-400 hover:underline">
              ลืมรหัสผ่าน?
            </Link>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
}
