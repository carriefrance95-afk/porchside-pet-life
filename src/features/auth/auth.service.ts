import { supabase } from '../../lib/supabase'

export async function signUpWithEmail(
  email: string,
  password: string,
): Promise<void> {
  const { error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    throw error
  }
}

export async function signInWithEmail(
  email: string,
  password: string,
): Promise<void> {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    throw error
  }
}

export async function signOutUser(): Promise<void> {
  const { error } = await supabase.auth.signOut()

  if (error) {
    throw error
  }
}

export async function sendPasswordResetEmail(
  email: string,
): Promise<void> {
  const redirectTo = `${window.location.origin}/reset-password`

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo,
  })

  if (error) {
    throw error
  }
}