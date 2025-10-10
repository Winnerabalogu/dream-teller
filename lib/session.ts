import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

export async function getCurrentUser() {
  const session = await auth()

  if (!session?.user?.id) {
    return null
  }

  return {
    id: session.user.id,
    email: session.user.email,
    name: session.user.name,
  }
}

export async function requireAuth() {
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
}
