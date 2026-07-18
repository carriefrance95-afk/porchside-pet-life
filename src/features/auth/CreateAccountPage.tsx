import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useAuth } from './useAuth'

interface FormErrors {
  email?: string
  password?: string
  confirmPassword?: string
  form?: string
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error && error.message) {
    const normalizedMessage = error.message.toLowerCase()

    if (
      normalizedMessage.includes('already registered') ||
      normalizedMessage.includes('already exists') ||
      normalizedMessage.includes('user already')
    ) {
      return 'An account already exists with this email address. Try signing in instead.'
    }

    if (normalizedMessage.includes('password')) {
      return 'Your password does not meet the account requirements. Please choose a stronger password.'
    }

    if (
      normalizedMessage.includes('email') ||
      normalizedMessage.includes('invalid')
    ) {
      return 'Please enter a valid email address.'
    }

    return error.message
  }

  return 'We could not create your account. Please try again.'
}

export default function CreateAccountPage() {
  const navigate = useNavigate()
  const { signUp } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
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
      nextErrors.password = 'Create a password.'
    } else if (password.length < 8) {
      nextErrors.password = 'Your password must be at least 8 characters.'
    }

    if (!confirmPassword) {
      nextErrors.confirmPassword = 'Confirm your password.'
    } else if (password !== confirmPassword) {
      nextErrors.confirmPassword = 'Your passwords do not match.'
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
      await signUp(email.trim(), password)

      navigate('/verify-email', {
        replace: true,
        state: {
          email: email.trim(),
        },
      })
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
                  d="M20 31.5C20 22.94 25.37 16 32 16s12 6.94 12 15.5C44 42.4 38.63 48 32 48s-12-5.6-12-16.5Z"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                />
                <path
                  d="M17.5 27.5C12.81 27.5 9 23.92 9 19.5S12.81 12 17.5 12 26 15.58 26 20s-3.81 7.5-8.5 7.5ZM46.5 27.5c-4.69 0-8.5-3.58-8.5-8s3.81-7.5 8.5-7.5 8.5 3.58 8.5 8-3.81 7.5-8.5 7.5Z"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                />
                <path
                  d="M23 48c2.4 2.67 5.4 4 9 4s6.6-1.33 9-4"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#7A7147]">
              Porchside Pet Life
            </p>

            <h1 className="max-w-sm font-serif text-5xl leading-[1.02] text-[#2D2A27]">
              A welcoming home for life with your dogs.
            </h1>

            <p className="mt-6 max-w-sm text-base leading-7 text-[#59534D]">
              Keep the important details close, remember the moments that
              matter, and feel more prepared for every season together.
            </p>
          </div>

          <p className="max-w-sm text-sm leading-6 text-[#6B655F]">
            Thoughtfully built for dog parents—not paperwork, portals, or
            clinical record keeping.
          </p>
        </section>

        <section className="flex items-center px-7 py-9 sm:px-12 lg:px-14">
          <div className="mx-auto w-full max-w-md">
            <div className="mb-8">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#BF6A43]">
                Let&apos;s get you settled
              </p>

              <h2 className="font-serif text-4xl leading-tight text-[#2D2A27] sm:text-[44px]">
                Create your account
              </h2>

              <p className="mt-3 text-base leading-7 text-[#6B655F]">
                Start building a home for everything that matters in life with
                your dogs.
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit} noValidate>
              {errors.form ? (
                <div
                  role="alert"
                  className="rounded-2xl border border-[#BF6A43]/25 bg-[#BF6A43]/8 px-4 py-3 text-sm leading-6 text-[#7E452F]"
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
                  <p
                    id="email-error"
                    className="mt-2 text-sm text-[#A64F35]"
                  >
                    {errors.email}
                  </p>
                ) : null}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-[#2D2A27]"
                >
                  Password
                </label>

                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value)

                      if (errors.password || errors.confirmPassword || errors.form) {
                        setErrors((currentErrors) => ({
                          ...currentErrors,
                          password: undefined,
                          confirmPassword: undefined,
                          form: undefined,
                        }))
                      }
                    }}
                    aria-invalid={Boolean(errors.password)}
                    aria-describedby={
                      errors.password ? 'password-error' : 'password-help'
                    }
                    className="h-12 w-full rounded-2xl border border-[#D9D1C8] bg-[#FFFDFC] px-4 pr-20 text-base text-[#2D2A27] outline-none transition placeholder:text-[#9B948C] focus:border-[#BF6A43] focus:ring-4 focus:ring-[#BF6A43]/10"
                    placeholder="At least 8 characters"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((currentValue) => !currentValue)}
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
                ) : (
                  <p
                    id="password-help"
                    className="mt-2 text-sm text-[#827B74]"
                  >
                    Use at least 8 characters.
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="confirm-password"
                  className="mb-2 block text-sm font-semibold text-[#2D2A27]"
                >
                  Confirm password
                </label>

                <input
                  id="confirm-password"
                  name="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(event) => {
                    setConfirmPassword(event.target.value)

                    if (errors.confirmPassword || errors.form) {
                      setErrors((currentErrors) => ({
                        ...currentErrors,
                        confirmPassword: undefined,
                        form: undefined,
                      }))
                    }
                  }}
                  aria-invalid={Boolean(errors.confirmPassword)}
                  aria-describedby={
                    errors.confirmPassword
                      ? 'confirm-password-error'
                      : undefined
                  }
                  className="h-12 w-full rounded-2xl border border-[#D9D1C8] bg-[#FFFDFC] px-4 text-base text-[#2D2A27] outline-none transition placeholder:text-[#9B948C] focus:border-[#BF6A43] focus:ring-4 focus:ring-[#BF6A43]/10"
                  placeholder="Enter your password again"
                />

                {errors.confirmPassword ? (
                  <p
                    id="confirm-password-error"
                    className="mt-2 text-sm text-[#A64F35]"
                  >
                    {errors.confirmPassword}
                  </p>
                ) : null}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex h-12 w-full items-center justify-center rounded-2xl bg-[#BF6A43] px-6 text-base font-semibold text-white shadow-[0_10px_24px_rgba(191,106,67,0.22)] transition hover:bg-[#A95D3B] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#BF6A43]/25 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? 'Creating your account...' : 'Create account'}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-[#6B655F]">
              Already have an account?{' '}
              <Link
                to="/sign-in"
                className="font-semibold text-[#BF6A43] transition hover:text-[#A95D3B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BF6A43] focus-visible:ring-offset-2"
              >
                Sign in
              </Link>
            </p>

            <p className="mt-5 text-center text-xs leading-5 text-[#918981]">
              By creating an account, you agree to use Porchside Pet Life
              responsibly and keep your account information secure.
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}