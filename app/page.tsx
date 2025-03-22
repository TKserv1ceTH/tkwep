'use client';

import Image from 'next/image';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen text-center bg-gray-900 text-gray-200 font-roboto">
      <Header />

      {/* Main Content */}
      <main className="flex flex-wrap justify-center gap-8 my-20 flex-grow animate-fadeIn">
        {sections.map((section, idx) => (
          <div 
            key={idx} 
            className="bg-gray-800 p-5 rounded-lg shadow-lg w-80 text-center transition-all 
                      hover:shadow-2xl hover:bg-gray-700 hover:-translate-y-2"
          >
            <h2 className="text-green-400 text-lg font-bold mb-4">{section.title}</h2>
            {section.links.map((link, i) => (
              <a key={i} href={link.href} target="_blank" rel="noopener noreferrer">
                <button 
                  className="bg-green-500 text-white px-4 py-2 w-full rounded-md shadow-md transition-all 
                             hover:bg-green-600 hover:scale-105 hover:shadow-lg my-2"
                >
                  {link.label}
                </button>
              </a>
            ))}
          </div>
        ))}
      </main>

      <Footer />
    </div>
  );
}

const sections = [
  {
    title: 'โปรแกรมพื้นฐาน',
    links: [
      { label: 'ดาวน์โหลด Ultraviewer', href: 'https://www.ultraviewer.net/th/UltraViewer_setup_6.6_th.exe' },
      { label: 'ดาวน์โหลด UnlockTool', href: 'https://file.unlocktool.net/' },
      { label: 'ดาวน์โหลด 3UTool', href: 'https://url2.3u.com/MNBBfyaa' },
    ],
  },
  {
    title: 'ปลดล็อกรหัส Android',
    links: [
      { label: 'Driver QC + MTK 2.0.1', href: 'https://driver-unlocktool.s3-hcm-r1.s3cloud.vn/Driver_Qualcomm_Mtk_2.0.1.zip' },
      { label: 'Driver Huawei USB 1.0', href: 'https://driver-unlocktool.s3-hcm-r1.s3cloud.vn/Driver%20Huawei%20USB%201.0%20Kirin%20Flash%20Device%202.01.02.00.zip' },
      { label: 'Driver SPD Spreadtrum', href: 'https://driver-unlocktool.s3-hcm-r1.s3cloud.vn/Driver_SPD_Spreadtrum_77xx.zip' },
    ],
  },
  {
    title: 'Bypass iPhone 5s - X',
    links: [
      { label: 'Ramdisk - iPhone', href: 'https://file.unlocktool.net/' },
      { label: 'LPro Max V1.1 Windows', href: 'https://mega.nz/folder/R8By0ZiK#4YM_HLtYjq5d3lK-ot1pLg/file/1pIyGT5b' },
      { label: 'Jailbreak iPhone + iPad', href: 'https://www.mediafire.com/file_premium/hy8dt11iakmkdnp/WinRa1n2.1_Jailbreak_iPhone_%252B_iPad.rar/file' },
    ],
  },
];
