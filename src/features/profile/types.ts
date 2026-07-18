export type SelectedPlan = 'Free' | 'Wellness' | 'Memory' | 'Premium'

export interface Profile {
  id: string
  display_name: string | null
  avatar_url: string | null
  created_at: string | null
  updated_at: string | null
  selected_plan: SelectedPlan
  onboarding_step: number
  onboarding_complete: boolean
  beta_status: string | null
  billing_status: string | null
}

export interface CreateProfileInput {
  id: string
  display_name?: string | null
  selected_plan?: SelectedPlan
  onboarding_step?: number
  onboarding_complete?: boolean
  beta_status?: string | null
  billing_status?: string | null
}

export interface UpdateProfileInput {
  display_name?: string | null
  avatar_url?: string | null
  selected_plan?: SelectedPlan
  onboarding_step?: number
  onboarding_complete?: boolean
  beta_status?: string | null
  billing_status?: string | null
}