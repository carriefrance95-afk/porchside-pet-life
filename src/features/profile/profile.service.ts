import { supabase } from '../../lib/supabase'
import type {
  Profile,
  CreateProfileInput,
  UpdateProfileInput,
} from './types'

const TABLE = 'profiles'

export async function getCurrentProfile(): Promise<Profile> {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError) {
    throw authError
  }

  if (!user) {
    throw new Error('No authenticated user found.')
  }

  const { data: existingProfile, error } = await supabase
    .from(TABLE)
    .select('*')
    .eq('id', user.id)
    .maybeSingle()

  if (error) {
    throw error
  }

  if (existingProfile) {
    return existingProfile as Profile
  }

  const profileToCreate: CreateProfileInput = {
    id: user.id,
    display_name:
      user.user_metadata?.display_name ??
      user.user_metadata?.full_name ??
      null,
    selected_plan: 'Free',
    onboarding_step: 1,
    onboarding_complete: false,
    beta_status: null,
    billing_status: null,
  }

  const { data: createdProfile, error: createError } = await supabase
    .from(TABLE)
    .insert(profileToCreate)
    .select()
    .single()

  if (createError) {
    throw createError
  }

  return createdProfile as Profile
}

export async function updateCurrentProfile(
  updates: UpdateProfileInput,
): Promise<Profile> {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError) {
    throw authError
  }

  if (!user) {
    throw new Error('No authenticated user found.')
  }

  const { data, error } = await supabase
    .from(TABLE)
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', user.id)
    .select()
    .single()

  if (error) {
    throw error
  }

  return data as Profile
}