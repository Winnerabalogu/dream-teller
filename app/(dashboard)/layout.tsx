// app/(dashboard)/layout.tsx
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import type React from "react"
import Sidebar from "@/components/layout/Sidebar"
import CloudBackground from "@/components/layout/Cloudbackground"
import LayoutWrapper from "@/components/layout/LayoutWrapper"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  
  // Redirect to login if not authenticated
  if (!session?.user) {
    redirect('/auth/signin?callbackUrl=/dashboard')
  }

  return (
    <>
      <CloudBackground />
      <div className="flex min-h-screen w-full">
        <Sidebar />
        <LayoutWrapper>{children}</LayoutWrapper>
      </div>
    </>
  )
}