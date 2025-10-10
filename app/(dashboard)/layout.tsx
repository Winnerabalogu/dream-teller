import type React from "react"
import Sidebar from "@/components/layout/Sidebar"
import CloudBackground from "@/components/layout/Cloudbackground"
import LayoutWrapper from "@/components/layout/LayoutWrapper"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
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
