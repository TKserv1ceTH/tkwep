'use client'
import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Wrench, Download, ShieldCheck, Headphones, Cpu, Zap } from 'lucide-react'
import { Badge, Section, GhostButton, PrimaryButton } from './components/ui'

export default function HomePage() {
  return (
    <div>
      <div className="relative overflow-hidden border-b border-neutral-900/70 bg-gradient-to-b from-black via-neutral-950 to-black">
        <Section>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mx-auto max-w-3xl text-center">
            <Badge className="border-red-500/40 bg-red-500/10 text-red-400"><Zap className="h-3.5 w-3.5" /> เร็ว • ปลอดภัย • มืออาชีพ</Badge>
            <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-white md:text-5xl">
              ศูนย์ซ่อม–ปลดล็อกมือถือ & เครื่องมือซอฟต์แวร์ TKserviceTHL
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base text-neutral-300 md:text-lg">
              รับซ่อมมือถือ/แท็บเล็ต ปลดล็อก FRP / MDM / iCloud และเครื่องมือซอฟต์แวร์สำหรับช่าง บริการครบ จบที่เดียว
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/services"><PrimaryButton><Wrench className="h-4 w-4" /> ดูบริการ</PrimaryButton></Link>
              <Link href="/downloads"><GhostButton><Download className="h-4 w-4" /> ดาวน์โหลดเครื่องมือ</GhostButton></Link>
            </div>
            <div className="mt-10 flex items-center justify-center gap-6 text-xs text-neutral-400">
              <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4"/>งานมีรับประกัน</div>
              <div className="flex items-center gap-2"><Headphones className="h-4 w-4"/>ซัพพอร์ตหลังการขาย</div>
              <div className="flex items-center gap-2"><Cpu className="h-4 w-4"/>เครื่องมือพัฒนาเอง</div>
            </div>
          </motion.div>
        </Section>
      </div>
      <Section>
        <div className="grid gap-6 md:grid-cols-3">
          <Link href="/services" className="tk-card p-6 hover:scale-[1.01] transition">
            <h3 className="text-lg font-bold">บริการซ่อม/ปลดล็อก</h3>
            <p className="mt-2 text-sm text-neutral-300">ฮาร์ดแวร์/ซอฟต์แวร์ ครบวงจร โปร่งใส มาตรฐานร้าน</p>
          </Link>
          <Link href="/downloads" className="tk-card p-6 hover:scale-[1.01] transition">
            <h3 className="text-lg font-bold">ดาวน์โหลดโปรแกรม</h3>
            <p className="mt-2 text-sm text-neutral-300">VAR Tool, Driver Fix, FRP Helper และอื่น ๆ</p>
          </Link>
          <Link href="/contact" className="tk-card p-6 hover:scale-[1.01] transition">
            <h3 className="text-lg font-bold">ติดต่อเรา</h3>
            <p className="mt-2 text-sm text-neutral-300">สอบถาม/ประเมินราคา นัดหมายคิวงาน</p>
          </Link>
        </div>
      </Section>
    </div>
  )
}
