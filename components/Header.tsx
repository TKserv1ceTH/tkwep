'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const userToken = localStorage.getItem('token');
    setIsLoggedIn(!!userToken);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    router.push('/login');
  };

  return (
    <header className="bg-gradient-to-r from-green-700 to-green-500 text-white p-5 flex justify-between items-center shadow-lg">
      <Link href="/">
        <Image src="/logo.png" alt="โลโก้" width={50} height={50} className="cursor-pointer" />
      </Link>

      <button 
        className="lg:hidden p-2 text-white" 
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      <nav 
        className={`${
          menuOpen ? 'flex' : 'hidden'
        } flex-col lg:flex lg:flex-row gap-3 absolute lg:static top-16 left-0 w-full bg-green-700 lg:bg-transparent p-5 lg:p-0 z-50`}
      >
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
