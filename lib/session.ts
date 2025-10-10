import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

export async function getCurrentUser() {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return null
    }

    return {
      id: session.user.id,
      email: session.user.email,
      name: session.user.name,
    }
  } catch (error) {
    console.error("Error getting current user:", error)
    return null
  }
}

export async function requireAuth() {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return {
        error: NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        ),
        user: null,
      }
    }

    return { error: null, user }
  } catch (error) {
    console.error("Auth error:", error)
    return {
      error: NextResponse.json(
        { error: 'Internal Server Error' },
        { status: 500 }
      ),
      user: null,
    }
  }
}