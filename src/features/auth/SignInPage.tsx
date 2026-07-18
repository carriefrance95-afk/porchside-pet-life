import { useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { getCurrentProfile } from '../profile/profile.service'
import { useAuth } from './useAuth'

interface SignInLocationState {
  from?: string
}

interface FormErrors {
  email?: string
  password?: string
  form?: string
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error && error.message) {
    const message = error.message.toLowerCase()

    if (
      message.includes('invalid login credentials') ||
      message.includes('invalid credentials')
    ) {
      return 'That email and password do not match. Please check them and try again.'
    }

    if (message.includes('email not confirmed')) {
      return 'Please confirm your email address before signing in.'
    }

    if (message.includes('too many requests')) {
      return 'Too many sign-in attempts were made. Please wait a few minutes and try again.'
    }

    return error.message
  }

  return 'We could not sign you in. Please try again.'
}

export default function SignInPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { signIn } = useAuth()

  const locationState = location.state as SignInLocationState | null
  const requestedDestination = locationState?.from

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})

  const validateForm = (): FormErrors => {
    const nextErrors: FormErrors = {}
    const trimmedEmail = email.trim()

    if (!trimmedEmail) {
      nextErrors.email = 'Enter your email address.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      nextErrors.email = 'Enter a valid email address.'
    }

    if (!password) {
      nextErrors.password = 'Enter your password.'
    }

    return nextErrors
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const validationErrors = validateForm()

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setErrors({})
    setIsSubmitting(true)

    try {
      await signIn(email.trim(), password)

      const profile = await getCurrentProfile()

      if (profile.onboarding_complete) {
        navigate(requestedDestination || '/porch', {
          replace: true,
        })
      } else {
        navigate('/onboarding/about-you', {
          replace: true,
        })
      }
    } catch (error) {
      setErrors({
        form: getErrorMessage(error),
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FAF7F2] px-6 py-8">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-[32px] border border-[#E8E1D8] bg-white shadow-[0_24px_70px_rgba(45,42,39,0.12)] lg:grid-cols-[0.92fr_1.08fr]">
        <section className="hidden bg-[#DCE4D6] px-12 py-12 lg:flex lg:flex-col lg:justify-between">
          <div>
            <div className="mb-10 flex h-14 w-14 items-center justify-center rounded-full border border-[#BF6A43]/30 bg-[#FAF7F2]">
              <svg
                aria-hidden="true"
                viewBox="0 0 64 64"
                className="h-8 w-8 text-[#BF6A43]"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13 29.5L32 13l19 16.5"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <path
                  d="M18 27v24h28V27"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <path
                  d="M26 51V37h12v14"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#7A7147]">
              Porchside Pet Life
            </p>

            <h1 className="max-w-sm font-serif text-5xl leading-[1.02] text-[#2D2A27]">
              Welcome back home.
            </h1>

            <p className="mt-6 max-w-sm text-base leading-7 text-[#59534D]">
              Everything you have gathered for life with your dogs is right
              where you left it.
            </p>
          </div>

          <p className="max-w-sm text-sm leading-6 text-[#6B655F]">
            A calm, thoughtful place for the details, routines, and memories
            that make life together yours.
          </p>
        </section>

        <section className="flex items-center px-7 py-10 sm:px-12 lg:px-14">
          <div className="mx-auto w-full max-w-md">
            <div className="mb-8">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#BF6A43]">
                Come on in
              </p>

              <h2 className="font-serif text-4xl leading-tight text-[#2D2A27] sm:text-[44px]">
                Sign in
              </h2>

              <p className="mt-3 text-base leading-7 text-[#6B655F]">
                Pick up where you left off with your dogs.
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit} noValidate>
              {errors.form ? (
                <div
                  role="alert"
                  className="rounded-2xl border border-[#BF6A43]/25 bg-[#BF6A43]/10 px-4 py-3 text-sm leading-6 text-[#7E452F]"
                >
                  {errors.form}
                </div>
              ) : null}

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-[#2D2A27]"
                >
                  Email address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value)

                    if (errors.email || errors.form) {
                      setErrors((currentErrors) => ({
                        ...currentErrors,
                        email: undefined,
                        form: undefined,
                      }))
                    }
                  }}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  className="h-12 w-full rounded-2xl border border-[#D9D1C8] bg-[#FFFDFC] px-4 text-base text-[#2D2A27] outline-none transition placeholder:text-[#9B948C] focus:border-[#BF6A43] focus:ring-4 focus:ring-[#BF6A43]/10"
                  placeholder="you@example.com"
                />

                {errors.email ? (
                  <p id="email-error" className="mt-2 text-sm text-[#A64F35]">
                    {errors.email}
                  </p>
                ) : null}
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between gap-4">
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-[#2D2A27]"
                  >
                    Password
                  </label>

                  <Link
                    to="/forgot-password"
                    className="text-sm font-semibold text-[#7A7147] transition hover:text-[#BF6A43] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BF6A43] focus-visible:ring-offset-2"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value)

                      if (errors.password || errors.form) {
                        setErrors((currentErrors) => ({
                          ...currentErrors,
                          password: undefined,
                          form: undefined,
                        }))
                      }
                    }}
                    aria-invalid={Boolean(errors.password)}
                    aria-describedby={
                      errors.password ? 'password-error' : undefined
                    }
                    className="h-12 w-full rounded-2xl border border-[#D9D1C8] bg-[#FFFDFC] px-4 pr-20 text-base text-[#2D2A27] outline-none transition placeholder:text-[#9B948C] focus:border-[#BF6A43] focus:ring-4 focus:ring-[#BF6A43]/10"
                    placeholder="Enter your password"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((currentValue) => !currentValue)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-[#7A7147] transition hover:text-[#BF6A43] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BF6A43] focus-visible:ring-offset-2"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>

                {errors.password ? (
                  <p
                    id="password-error"
                    className="mt-2 text-sm text-[#A64F35]"
                  >
                    {errors.password}
                  </p>
                ) : null}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex h-12 w-full items-center justify-center rounded-2xl bg-[#BF6A43] px-6 text-base font-semibold text-white shadow-[0_10px_24px_rgba(191,106,67,0.22)] transition hover:bg-[#A95D3B] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#BF6A43]/25 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? 'Opening your home...' : 'Sign in'}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-[#6B655F]">
              New to Porchside Pet Life?{' '}
              <Link
                to="/create-account"
                className="font-semibold text-[#BF6A43] transition hover:text-[#A95D3B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BF6A43] focus-visible:ring-offset-2"
              >
                Create an account
              </Link>
            </p>

            <Link
              to="/"
              className="mx-auto mt-5 flex w-fit text-sm font-semibold text-[#7A7147] transition hover:text-[#BF6A43] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BF6A43] focus-visible:ring-offset-2"
            >
              Back to welcome
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}