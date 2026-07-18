import { Link, useLocation } from 'react-router-dom'

interface VerifyEmailLocationState {
  email?: string
}

export default function VerifyEmailPage() {
  const location = useLocation()
  const state = location.state as VerifyEmailLocationState | null
  const email = state?.email?.trim()

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FAF7F2] px-6 py-8">
      <div className="w-full max-w-xl rounded-[32px] border border-[#E8E1D8] bg-white px-7 py-10 text-center shadow-[0_24px_70px_rgba(45,42,39,0.12)] sm:px-12 sm:py-12">
        <div className="mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-full border border-[#BF6A43]/25 bg-[#DCE4D6]">
          <svg
            aria-hidden="true"
            viewBox="0 0 64 64"
            className="h-10 w-10 text-[#BF6A43]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="9"
              y="15"
              width="46"
              height="34"
              rx="8"
              stroke="currentColor"
              strokeWidth="2.5"
            />

            <path
              d="M12 20L28.14 33.2C30.39 35.04 33.61 35.04 35.86 33.2L52 20"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <path
              d="M13 45L25 34.5"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            <path
              d="M51 45L39 34.5"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#BF6A43]">
          One quick step
        </p>

        <h1 className="font-serif text-4xl leading-tight text-[#2D2A27] sm:text-5xl">
          Check your email
        </h1>

        <p className="mx-auto mt-5 max-w-md text-base leading-7 text-[#6B655F]">
          We sent you a confirmation link
          {email ? (
            <>
              {' '}
              at{' '}
              <span className="font-semibold text-[#2D2A27]">
                {email}
              </span>
            </>
          ) : null}
          . Open that email and confirm your account before signing in.
        </p>

        <div className="mt-8 rounded-2xl border border-[#E8E1D8] bg-[#FAF7F2] px-5 py-4 text-left">
          <p className="text-sm font-semibold text-[#2D2A27]">
            Don&apos;t see the email?
          </p>

          <p className="mt-1 text-sm leading-6 text-[#6B655F]">
            Give it a few minutes, then check your spam, junk, or promotions
            folder. Make sure you are checking the same email address you used
            to create your account.
          </p>
        </div>

        <Link
          to="/sign-in"
          replace
          className="mt-8 flex h-12 w-full items-center justify-center rounded-2xl bg-[#BF6A43] px-6 text-base font-semibold text-white shadow-[0_10px_24px_rgba(191,106,67,0.22)] transition hover:bg-[#A95D3B] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#BF6A43]/25"
        >
          Continue to sign in
        </Link>

        <Link
          to="/create-account"
          className="mt-5 inline-flex text-sm font-semibold text-[#7A7147] transition hover:text-[#BF6A43] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BF6A43] focus-visible:ring-offset-2"
        >
          Used the wrong email? Create a new account
        </Link>

        <p className="mt-7 text-xs leading-5 text-[#918981]">
          You can close this page while you check your inbox. Your place will
          be waiting when you return.
        </p>
      </div>
    </main>
  )
}