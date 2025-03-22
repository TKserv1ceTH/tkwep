'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ✅ ตรวจสอบสถานะล็อกอิน (ใช้ localStorage)
  useEffect(() => {
    const userToken = localStorage.getItem('token'); // เปลี่ยนตามระบบ auth ของคุณ
    setIsLoggedIn(!!userToken);
  }, []);

  // ✅ ฟังก์ชันออกจากระบบ
  const handleLogout = () => {
    localStorage.removeItem('token'); // ล้าง token
    setIsLoggedIn(false);
    router.push('/login'); // กลับไปหน้าล็อกอิน
  };

  return (
    <header className="bg-gradient-to-r from-green-700 to-green-500 text-white p-5 flex justify-between items-center shadow-lg">
      <Link href="/">
        <Image src="/logo.png" alt="โลโก้" width={50} height={50} className="cursor-pointer" />
      </Link>

      <nav className="flex gap-3">
        <Link 
          href="/" 
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow-md transition duration-300"
        >
          🏠 Home
        </Link>

        {isLoggedIn ? (
          <>
            <Link 
              href="/dashboard" 
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow-md transition duration-300"
            >
              📊 Dashboard
            </Link>
            <button 
              onClick={handleLogout} 
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow-md transition duration-300"
            >
              🚪 Logout
            </button>
          </>
        ) : (
          <>
            <Link 
              href="/registration" 
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow-md transition duration-300"
            >
              📝 Register
            </Link>
            <Link 
              href="/login" 
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow-md transition duration-300"
            >
              🔑 Login
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
