"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession, signOut } from "next-auth/react"
import {
  History,
  Database,
  Edit3,
  Download,
  Upload,
  Sparkles,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  LogOut,
  BookOpen,
  Settings,
  User,
  Heart,
} from "lucide-react"
import { useDreams } from "@/hooks/useDreams"
import DreamCard from "../dream/DreamCard"
import DictionaryModal from "../modals/DictionaryModal"
import { exportDreamsData } from "@/services/db"

export default function Sidebar() {
  const { dreams, patterns, loading } = useDreams()
  const [showDictionary, setShowDictionary] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false)
  const pathname = usePathname()
  const { data: session } = useSession()

  useEffect(() => {
    const savedState = localStorage.getItem("sidebarCollapsed")
    if (savedState !== null) {
      setIsDesktopCollapsed(JSON.parse(savedState))
    }
  }, [])

  // Close mobile sidebar when route changes
  useEffect(() => {
    setIsMobileOpen(false)
  }, [pathname])

  const toggleDesktopSidebar = () => {
    const newState = !isDesktopCollapsed
    setIsDesktopCollapsed(newState)
    localStorage.setItem("sidebarCollapsed", JSON.stringify(newState))
    window.dispatchEvent(new Event("sidebarToggle"))
  }

  const handleExport = async () => {
    try {
      const data = await exportDreamsData()
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `dream-guide-backup-${new Date().toISOString().split("T")[0]}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Export failed:", error)
      alert("Failed to export data")
    }
  }

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      const text = await file.text()
      const data = JSON.parse(text)

      const res = await fetch("/api/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!res.ok) throw new Error("Import failed")

      alert("Data imported successfully!")
      window.location.reload()
    } catch (error) {
      console.error("Import failed:", error)
      alert("Failed to import data. Please check the file format.")
    }
  }

  const topRecurringSymbol = Object.entries(patterns.recurringSymbols).sort((a, b) => b[1] - a[1])[0]

  return (
    <>
      {/* Mobile Toggle - Fixed positioning to not overlap with content */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-purple-600/90 backdrop-blur-sm p-2.5 rounded-lg shadow-lg hover:bg-purple-500 transition-all"
        aria-label="Toggle mobile menu"
      >
        {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Desktop Toggle - Fixed positioning to prevent overlap with sidebar icons */}
      <button
        onClick={toggleDesktopSidebar}
        className="hidden lg:flex fixed top-4 z-50 bg-purple-600/90 backdrop-blur-sm p-2.5 rounded-lg transition-all duration-300 hover:bg-purple-500 shadow-lg items-center justify-center"
        style={{ left: isDesktopCollapsed ? "5.5rem" : "20.5rem" }}
        aria-label={isDesktopCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isDesktopCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>

      {/* Sidebar - Improved responsive widths and transitions */}
      <aside
        className={`fixed left-0 top-0 h-full bg-gradient-to-b from-indigo-950 via-purple-900 to-indigo-950 backdrop-blur-lg border-r border-white/10 overflow-y-auto z-40 transition-all duration-300 scrollbar-thin scrollbar-thumb-purple-500/50 scrollbar-track-transparent
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
          ${isDesktopCollapsed ? "lg:w-20" : "lg:w-80"}
          ${isDesktopCollapsed ? "lg:px-2 lg:py-6" : "lg:px-6 lg:py-6"}
          w-80 px-6 py-6`}
      >
        {/* Header */}
        <div
          className={`mb-8 transition-opacity duration-300 ${isDesktopCollapsed ? "lg:opacity-0 lg:h-0 lg:overflow-hidden" : "opacity-100"}`}
        >
          <Link
            href="/"
            className="flex items-center space-x-3 text-2xl font-light text-white hover:text-purple-300 transition-colors"
          >
            <Sparkles className="w-7 h-7 text-purple-400" />
            <span className="bg-gradient-to-r from-purple-200 to-blue-200 bg-clip-text text-transparent">
              Aeterna&apos;s Journal
            </span>
          </Link>
          <p className="text-purple-300/80 text-sm mt-2 ml-10">Your personal dream journal</p>
        </div>

        {/* Collapsed Header */}
        <div
          className={`mb-8 transition-opacity duration-300 ${isDesktopCollapsed ? "lg:opacity-100 lg:flex" : "lg:opacity-0 lg:hidden"} hidden justify-center`}
        >
          <Sparkles className="w-8 h-8 text-purple-400" />
        </div>

        {/* User Profile */}
        {session?.user && (
          <div
            className={`mb-6 pb-6 border-b border-white/10 transition-opacity duration-300 ${isDesktopCollapsed ? "lg:opacity-0 lg:h-0 lg:overflow-hidden" : "opacity-100"}`}
          >
            <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-purple-100 truncate">
                  {session.user.name || session.user.email}
                </p>
                <p className="text-xs text-purple-300/70 truncate">{session.user.email}</p>
              </div>
            </div>
          </div>
        )}

        {/* Collapsed User Icon */}
        {session?.user && (
          <div
            className={`mb-6 pb-6 border-b border-white/10 transition-opacity duration-300 ${isDesktopCollapsed ? "lg:opacity-100 lg:flex lg:justify-center" : "lg:opacity-0 lg:hidden"} hidden`}
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
          </div>
        )}

        {/* Navigation - Improved hover states and active indicators */}
        <nav className="space-y-1.5 mb-6">
          <Link
            href="/dashboard"
            className={`flex items-center p-3 rounded-lg transition-all group ${
              pathname === "/dashboard" ? "bg-purple-600 shadow-lg shadow-purple-600/30" : "hover:bg-white/10"
            } ${isDesktopCollapsed ? "lg:justify-center lg:w-full" : "space-x-3"}`}
            title="Dashboard"
          >
            <Sparkles
              className={`w-5 h-5 flex-shrink-0 ${pathname === "/dashboard" ? "text-white" : "text-purple-300 group-hover:text-white"}`}
            />
            <span
              className={`${isDesktopCollapsed ? "lg:hidden" : ""} ${pathname === "/dashboard" ? "text-white font-medium" : "text-purple-200"}`}
            >
              Dashboard
            </span>
          </Link>
          <Link
            href="/dashboard/patterns"
            className={`flex items-center p-3 rounded-lg transition-all group ${
              pathname === "/dashboard/patterns" ? "bg-purple-600 shadow-lg shadow-purple-600/30" : "hover:bg-white/10"
            } ${isDesktopCollapsed ? "lg:justify-center lg:w-full" : "space-x-3"}`}
            title="Patterns"
          >
            <Database
              className={`w-5 h-5 flex-shrink-0 ${pathname === "/dashboard/patterns" ? "text-white" : "text-purple-300 group-hover:text-white"}`}
            />
            <span
              className={`${isDesktopCollapsed ? "lg:hidden" : ""} ${pathname === "/dashboard/patterns" ? "text-white font-medium" : "text-purple-200"}`}
            >
              Patterns
            </span>
          </Link>
          <Link
            href="/dashboard/dictionary"
            className={`flex items-center p-3 rounded-lg transition-all group ${
              pathname === "/dashboard/dictionary"
                ? "bg-purple-600 shadow-lg shadow-purple-600/30"
                : "hover:bg-white/10"
            } ${isDesktopCollapsed ? "lg:justify-center lg:w-full" : "space-x-3"}`}
            title="Dictionary"
          >
            <Edit3
              className={`w-5 h-5 flex-shrink-0 ${pathname === "/dashboard/dictionary" ? "text-white" : "text-purple-300 group-hover:text-white"}`}
            />
            <span
              className={`${isDesktopCollapsed ? "lg:hidden" : ""} ${pathname === "/dashboard/dictionary" ? "text-white font-medium" : "text-purple-200"}`}
            >
              Dictionary
            </span>
          </Link>
          <Link
            href="/dashboard/journal"
            className={`flex items-center p-3 rounded-lg transition-all group ${
              pathname === "/dashboard/journal" ? "bg-purple-600 shadow-lg shadow-purple-600/30" : "hover:bg-white/10"
            } ${isDesktopCollapsed ? "lg:justify-center lg:w-full" : "space-x-3"}`}
            title="Journal"
          >
            <BookOpen
              className={`w-5 h-5 flex-shrink-0 ${pathname === "/dashboard/journal" ? "text-white" : "text-purple-300 group-hover:text-white"}`}
            />
            <span
              className={`${isDesktopCollapsed ? "lg:hidden" : ""} ${pathname === "/dashboard/journal" ? "text-white font-medium" : "text-purple-200"}`}
            >
              Journal
            </span>
          </Link>
          <Link
            href="/dashboard/meditation"
            className={`flex items-center p-3 rounded-lg transition-all group ${
              pathname === "/dashboard/meditation"
                ? "bg-purple-600 shadow-lg shadow-purple-600/30"
                : "hover:bg-white/10"
            } ${isDesktopCollapsed ? "lg:justify-center lg:w-full" : "space-x-3"}`}
            title="Meditation"
          >
            <Heart
              className={`w-5 h-5 flex-shrink-0 ${pathname === "/dashboard/meditation" ? "text-white" : "text-purple-300 group-hover:text-white"}`}
            />
            <span
              className={`${isDesktopCollapsed ? "lg:hidden" : ""} ${pathname === "/dashboard/meditation" ? "text-white font-medium" : "text-purple-200"}`}
            >
              Meditation
            </span>
          </Link>
          <Link
            href="/dashboard/profile"
            className={`flex items-center p-3 rounded-lg transition-all group ${
              pathname === "/dashboard/profile" ? "bg-purple-600 shadow-lg shadow-purple-600/30" : "hover:bg-white/10"
            } ${isDesktopCollapsed ? "lg:justify-center lg:w-full" : "space-x-3"}`}
            title="Profile"
          >
            <Settings
              className={`w-5 h-5 flex-shrink-0 ${pathname === "/dashboard/profile" ? "text-white" : "text-purple-300 group-hover:text-white"}`}
            />
            <span
              className={`${isDesktopCollapsed ? "lg:hidden" : ""} ${pathname === "/dashboard/profile" ? "text-white font-medium" : "text-purple-200"}`}
            >
              Profile
            </span>
          </Link>
        </nav>

        {/* Sign Out Button */}
        <div
          className={`mb-6 transition-opacity duration-300 ${isDesktopCollapsed ? "lg:opacity-0 lg:h-0 lg:overflow-hidden" : "opacity-100"}`}
        >
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-red-500/20 transition-all w-full text-left text-red-300 hover:text-red-200 group"
          >
            <LogOut className="w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Collapsed Sign Out Icon */}
        <div
          className={`mb-6 transition-opacity duration-300 ${isDesktopCollapsed ? "lg:opacity-100 lg:flex lg:justify-center" : "lg:opacity-0 lg:hidden"} hidden`}
        >
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="p-3 rounded-lg hover:bg-red-500/20 transition-all text-red-300 hover:text-red-200 group"
            title="Sign Out"
          >
            <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>
        </div>

        {/* Export/Import */}
        <div
          className={`space-y-1.5 mb-6 pb-6 border-b border-white/10 transition-opacity duration-300 ${isDesktopCollapsed ? "lg:opacity-0 lg:h-0 lg:overflow-hidden" : "opacity-100"}`}
        >
          <button
            onClick={handleExport}
            className="flex items-center space-x-3 text-sm text-purple-300 hover:text-white hover:bg-white/10 p-2.5 rounded-lg w-full text-left transition-all group"
          >
            <Download className="w-4 h-4 flex-shrink-0 group-hover:scale-110 transition-transform" />
            <span>Export Data</span>
          </button>
          <label className="flex items-center space-x-3 text-sm text-purple-300 hover:text-white hover:bg-white/10 p-2.5 rounded-lg w-full cursor-pointer transition-all group">
            <Upload className="w-4 h-4 flex-shrink-0 group-hover:scale-110 transition-transform" />
            <span>Import Data</span>
            <input type="file" accept=".json" onChange={handleImport} className="hidden" />
          </label>
        </div>

        {/* Collapsed Export/Import Icons */}
        <div
          className={`mb-6 pb-6 border-b border-white/10 space-y-2 transition-opacity duration-300 ${isDesktopCollapsed ? "lg:opacity-100 lg:flex lg:flex-col lg:items-center" : "lg:opacity-0 lg:hidden"} hidden`}
        >
          <button
            onClick={handleExport}
            className="p-2.5 rounded-lg text-purple-300 hover:text-white hover:bg-white/10 transition-all group"
            title="Export Data"
          >
            <Download className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>
          <label
            className="p-2.5 rounded-lg text-purple-300 hover:text-white hover:bg-white/10 cursor-pointer transition-all group"
            title="Import Data"
          >
            <Upload className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <input type="file" accept=".json" onChange={handleImport} className="hidden" />
          </label>
        </div>

        {/* Dream History */}
        <div
          className={`mb-6 transition-opacity duration-300 ${isDesktopCollapsed ? "lg:opacity-0 lg:h-0 lg:overflow-hidden" : "opacity-100"}`}
        >
          <h2 className="text-base font-medium mb-3 flex items-center space-x-2 text-purple-200">
            <History className="w-5 h-5 flex-shrink-0" />
            <span>Your Dreams ({dreams.length})</span>
          </h2>
          {loading ? (
            <div className="text-purple-300/70 text-sm">Loading...</div>
          ) : dreams.length === 0 ? (
            <p className="text-purple-300/70 text-sm italic">No dreams yet. Start by interpreting your first dream!</p>
          ) : (
            <div className="space-y-2">
              {dreams.slice(0, 10).map((dream) => (
                <DreamCard key={dream.id} dream={dream} onClick={() => setIsMobileOpen(false)} />
              ))}
              {dreams.length > 10 && (
                <p className="text-purple-300/70 text-xs text-center pt-2">+{dreams.length - 10} more dreams</p>
              )}
            </div>
          )}
        </div>

        {/* Collapsed Dream Count */}
        <div
          className={`mb-6 transition-opacity duration-300 ${isDesktopCollapsed ? "lg:opacity-100 lg:flex lg:flex-col lg:items-center" : "lg:opacity-0 lg:hidden"} hidden`}
        >
          <Link
            href="/dashboard/patterns"
            className="p-2.5 rounded-lg text-purple-300 hover:text-white hover:bg-white/10 transition-all group"
            title={`${dreams.length} Dreams`}
          >
            <History className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </Link>
          <span className="text-xs text-purple-300/70 mt-1 font-medium">{dreams.length}</span>
        </div>

        {/* Pattern Insight */}
        {topRecurringSymbol && (
          <div
            className={`mt-4 p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl border border-yellow-500/30 transition-opacity duration-300 ${isDesktopCollapsed ? "lg:opacity-0 lg:h-0 lg:overflow-hidden" : "opacity-100"}`}
          >
            <p className="text-xs font-semibold text-yellow-200 mb-1.5 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              Pattern Insight
            </p>
            <p className="text-sm text-yellow-100 leading-relaxed">
              <span className="font-semibold capitalize">{topRecurringSymbol[0]}</span> appears frequently in your
              dreams, appearing {topRecurringSymbol[1]} times.
            </p>
          </div>
        )}
      </aside>

      {/* Dictionary Modal */}
      {showDictionary && <DictionaryModal onClose={() => setShowDictionary(false)} />}

      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  )
}
