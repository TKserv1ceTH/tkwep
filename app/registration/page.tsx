'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Registration() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phone: '',
    address: {
      houseNumber: '',
      city: '',
      province: '',
      country: '',
      postalCode: '',
    },
    birthdate: '',
  });

  const [error, setError] = useState('');

  const updateNestedValue = (name: string, value: string) => {
    setFormData((prev) => {
      if (name.startsWith('address.')) {
        return {
          ...prev,
          address: { ...prev.address, [name.split('.')[1]]: value },
        };
      }
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { email, phone } = formData;

    // ✅ ตรวจสอบอีเมลและเบอร์โทร
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('❌ กรุณากรอกอีเมลให้ถูกต้อง');
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      setError('❌ เบอร์โทรศัพท์ต้องมี 10 ตัวเลข');
      return;
    }

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        alert('✅ สมัครสมาชิกสำเร็จ! กำลังไปที่หน้าล็อกอิน...');
        router.push('/login');
      } else {
        setError(data.error);
      }
    } catch {
      setError('เกิดข้อผิดพลาดในการสมัครสมาชิก');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-200">
      <Header />
      <main className="flex flex-col items-center justify-center flex-grow p-5">
        <h1 className="text-2xl font-bold text-green-400 mb-5">ลงทะเบียน</h1>
        <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
          {error && <p className="text-red-400 mb-3">{error}</p>}

          {[
            { name: 'username', placeholder: 'ชื่อผู้ใช้', type: 'text', autoComplete: 'username' },
            { name: 'email', placeholder: 'อีเมล', type: 'email', autoComplete: 'email' },
            { name: 'password', placeholder: 'รหัสผ่าน', type: 'password', autoComplete: 'new-password' },
            { name: 'phone', placeholder: 'เบอร์โทรศัพท์', type: 'tel', autoComplete: 'tel' },
          ].map(({ name, placeholder, type, autoComplete }) => (
            <input
              key={name}
              type={type}
              name={name}
              placeholder={placeholder}
              value={typeof formData[name] === 'object' ? JSON.stringify(formData[name]) : formData[name] || ''}

              onChange={(e) => updateNestedValue(name, e.target.value)}
              className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
              autoComplete={autoComplete}
            />
          ))}

          <h2 className="text-green-400 font-bold mt-3 mb-2">ที่อยู่</h2>
          {[
            { name: 'address.houseNumber', placeholder: 'เลขที่บ้าน' },
            { name: 'address.city', placeholder: 'เมือง' },
            { name: 'address.province', placeholder: 'จังหวัด' },
            { name: 'address.country', placeholder: 'ประเทศ' },
            { name: 'address.postalCode', placeholder: 'รหัสไปรษณีย์' },
          ].map(({ name, placeholder }) => (
            <input
              key={name}
              type="text"
              name={name}
              placeholder={placeholder}
              value={formData.address[name.split('.')[1] as keyof typeof formData.address]}
              onChange={(e) => updateNestedValue(name, e.target.value)}
              className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
            />
          ))}

          <input
            type="date"
            name="birthdate"
            placeholder="วันเกิด"
            value={formData.birthdate}
            onChange={(e) => updateNestedValue('birthdate', e.target.value)}
            className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
            autoComplete="bday"
          />

          <button 
            type="submit" 
            className="w-full bg-green-500 hover:bg-green-600 text-white p-2 rounded 
                       hover:scale-105 transition-transform"
          >
            สมัครสมาชิก
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
}
