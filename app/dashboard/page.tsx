'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('token'); // ตรวจสอบว่ามี token หรือไม่
    if (!isAuthenticated) {
      router.push('/login'); // ถ้าไม่มีให้ไปที่หน้า Login
    }
  }, [router]);

  return (
    <div className="flex flex-col min-h-screen text-center bg-gray-900 text-gray-200 font-roboto">
      <Header />
      <main className="flex flex-wrap justify-center gap-8 my-20 flex-grow animate-fadeIn">
        <h1 className="text-2xl font-bold text-green-400">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          <div className="bg-gray-800 p-5 rounded-lg shadow-lg w-72 text-center">
            <h2 className="text-green-400 text-lg font-bold mb-4">ซื้อเครดิต</h2>
            <button className="bg-green-500 text-white px-4 py-2 w-full rounded-md shadow-md hover:bg-green-600 transition-all">
              ซื้อเครดิต
            </button>
          </div>
          <div className="bg-gray-800 p-5 rounded-lg shadow-lg w-72 text-center">
            <h2 className="text-green-400 text-lg font-bold mb-4">เติมเครดิต</h2>
            <button className="bg-green-500 text-white px-4 py-2 w-full rounded-md shadow-md hover:bg-green-600 transition-all">
              เติมเครดิต
            </button>
          </div>
          <div className="bg-gray-800 p-5 rounded-lg shadow-lg w-72 text-center">
            <h2 className="text-green-400 text-lg font-bold mb-4">บริการอื่นๆ</h2>
            <button className="bg-green-500 text-white px-4 py-2 w-full rounded-md shadow-md hover:bg-green-600 transition-all">
              ดูบริการอื่นๆ
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
