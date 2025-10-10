// app/(dashboard)/layout.tsx
"use client"
import type React from "react"
import { useState, useEffect } from 'react';
import Sidebar from "@/components/layout/Sidebar"
import CloudBackground from "@/components/layout/Cloudbackground"
import LayoutWrapper from "@/components/layout/LayoutWrapper"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <>
      <CloudBackground />
      <div className="">  
        <Sidebar/>  
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </div>    
    </>
  )
}