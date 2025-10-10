"use client"

import { motion, useAnimation, useMotionValue, useTransform } from "framer-motion"
import { useEffect, useMemo, useState } from "react"
import type React from "react"
import { useRouter } from "next/navigation"

const goldenRatio = 1.618033988749895

const fibonacciSpiral = (centerX: number, centerY: number, size: number, rotation: number) => {
  let path = `M${centerX},${centerY} `
  let currentSize = size
  let currentAngle = rotation

  for (let i = 0; i < 8; i++) {
    const endX = centerX + Math.cos(currentAngle) * currentSize
    const endY = centerY + Math.sin(currentAngle) * currentSize
    path += `A${currentSize},${currentSize} 0 0 1 ${endX},${endY} `
    currentSize /= goldenRatio
    currentAngle += Math.PI / 2
  }

  return path
}

const inspirationalMessages = [
  "Every dream is a doorway to understanding yourself",
  "Your subconscious speaks in symbols and stories",
  "Dreams are the whispers of your soul",
  "In dreams, we find truths we hide from ourselves",
  "The night reveals what the day conceals",
  "Your dreams hold the keys to your deepest wisdom",
  "Listen to your dreams, they know you best",
  "Dreams are letters from your inner self",
]

export default function HomePage() {
  const router = useRouter()
  const centerX = 150
  const centerY = 150
  const initialPath = useMemo(() => fibonacciSpiral(centerX, centerY, 120, 0), [])

  const spiralControls = useAnimation()
  const particleControls = useAnimation()
  const [isHovered, setIsHovered] = useState(false)
  const [inspirationalMessage] = useState(
    () => inspirationalMessages[Math.floor(Math.random() * inspirationalMessages.length)],
  )

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useTransform(mouseY, [0, 300], [5, -5])
  const rotateY = useTransform(mouseX, [0, 300], [-5, 5])

  useEffect(() => {
    const animateSpiral = async () => {
      while (true) {
        await spiralControls.start({
          pathLength: [0, 1],
          transition: { duration: 4, ease: "easeInOut" },
        })
        await spiralControls.start({
          pathLength: 1,
          transition: { duration: 2 },
        })
      }
    }

    const animateRotation = async () => {
      await spiralControls.start({
        rotate: 360,
        transition: { duration: 20, ease: "linear", repeat: Number.POSITIVE_INFINITY },
      })
    }

    const animateParticles = async () => {
      await particleControls.start({
        opacity: [0, 1],
        transition: { duration: 1, staggerChildren: 0.1 },
      })
      particleControls.start({
        opacity: [1, 0.7, 1],
        transition: { duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" },
      })
    }

    animateSpiral()
    animateRotation()
    animateParticles()
  }, [spiralControls, particleControls])

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    mouseX.set(event.clientX - rect.left)
    mouseY.set(event.clientY - rect.top)
  }

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-rose-950 overflow-hidden p-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900/20 via-purple-950/50 to-black opacity-70"></div>

      {/* Responsive background dots */}
      {[...Array(40)].map((_, index) => (
        <motion.div
          key={`dot-${index}`}
          className="absolute w-1 h-1 bg-amber-200/60 rounded-full"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: Math.random() * 2 + 1,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
          whileHover={{
            opacity: 0.8,
            scale: 1.5,
            transition: { duration: 0.3 },
          }}
        />
      ))}

      <motion.div
        className="relative w-[300px] h-[300px] cursor-pointer"
        style={{ perspective: 1000, rotateX, rotateY }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        transition={{ type: "spring", stiffness: 100, damping: 30 }}
      >
        <svg width="300" height="300" viewBox="0 0 300 300" className="relative z-10">
          <defs>
            <linearGradient id="spiralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B">
                <animate
                  attributeName="stop-color"
                  values="#F59E0B; #EC4899; #A855F7; #F59E0B"
                  dur="10s"
                  repeatCount="indefinite"
                />
              </stop>
              <stop offset="50%" stopColor="#EC4899">
                <animate
                  attributeName="stop-color"
                  values="#EC4899; #A855F7; #F59E0B; #EC4899"
                  dur="10s"
                  repeatCount="indefinite"
                />
              </stop>
              <stop offset="100%" stopColor="#A855F7">
                <animate
                  attributeName="stop-color"
                  values="#A855F7; #F59E0B; #EC4899; #A855F7"
                  dur="10s"
                  repeatCount="indefinite"
                />
              </stop>
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Fibonacci spiral */}
          <motion.path
            d={initialPath}
            stroke="url(#spiralGradient)"
            strokeWidth="4"
            fill="none"
            filter="url(#glow)"
            initial={{ pathLength: 0, rotate: 0 }}
            animate={spiralControls}
            style={{ originX: "150px", originY: "150px" }}
          />

          {/* Particles */}
          {[...Array(12)].map((_, index) => {
            const angle = (index / 12) * Math.PI * 2
            const radius = 100 + (index % 3) * 20
            return (
              <motion.circle
                key={index}
                cx={centerX + Math.cos(angle) * radius}
                cy={centerY + Math.sin(angle) * radius}
                r="4"
                fill="#FDE68A"
                initial={{ opacity: 0 }}
                animate={particleControls}
              />
            )
          })}

          {/* Central pulsating dot */}
          <motion.circle
            cx={centerX}
            cy={centerY}
            r="8"
            fill="#FDE68A"
            animate={{
              opacity: [1, 0.7, 1],
              scale: isHovered ? [1, 1.1, 1] : 1,
            }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, ease: "easeInOut" }}
          />

          {/* Orbiting particle */}
          <motion.circle
            cx={centerX}
            cy={centerY - 120}
            r="4"
            fill="#FDE68A"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            style={{
              originX: "150px",
              originY: "150px",
            }}
          />
        </svg>
      </motion.div>

      <motion.div
        className="mt-12 text-center space-y-6 max-w-2xl px-6 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-light text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-rose-200 to-purple-200">
          {[..."Aeterna"].map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 + index * 0.1, duration: 0.5 }}
              className="inline-block hover:text-amber-300 transition-colors duration-300"
            >
              {char}
            </motion.span>
          ))}
        </h1>

        <motion.p
          className="text-lg md:text-xl text-slate-300 font-light leading-relaxed italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
        >
          {inspirationalMessage}
        </motion.p>

        <motion.button
          onClick={() => router.push("/auth/signin")}
          className="mt-8 bg-gradient-to-r from-amber-500/90 to-rose-500/90 hover:from-amber-500 hover:to-rose-500 text-white font-normal px-12 py-5 rounded-2xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-2xl text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3, duration: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Welcome
        </motion.button>
      </motion.div>
    </div>
  )
}