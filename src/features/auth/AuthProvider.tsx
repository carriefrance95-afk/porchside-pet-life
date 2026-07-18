import {
  createContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Session, User } from '@supabase/supabase-js'

import { supabase } from '../../lib/supabase'
import {
  sendPasswordResetEmail,
  signInWithEmail,
  signOutUser,
  signUpWithEmail,
} from './auth.service'
import type { AuthContextValue } from './types'

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined,
)

interface AuthProviderProps {
  children: ReactNode
}

export default function AuthProvider({
  children,
}: AuthProviderProps) {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    async function loadSession() {
      const {
        data: { session: currentSession },
      } = await supabase.auth.getSession()

      if (!isMounted) {
        return
      }

      setSession(currentSession)
      setUser(currentSession?.user ?? null)
      setIsLoading(false)
    }

    void loadSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession)
      setUser(nextSession?.user ?? null)
      setIsLoading(false)
    })

    return () => {
      isMounted = false
      subscription.unsubscribe()
    }
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      session,
      isLoading,
      signUp: signUpWithEmail,
      signIn: signInWithEmail,
      signOut: signOutUser,
      resetPassword: sendPasswordResetEmail,
    }),
    [user, session, isLoading],
  )

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}