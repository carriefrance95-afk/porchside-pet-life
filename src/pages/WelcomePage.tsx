import { useNavigate } from 'react-router-dom';

import Button from '../components/ui/Button';
import Surface from '../components/ui/Surface';

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="grid min-h-[calc(100vh-8rem)] items-center gap-8 py-4 lg:grid-cols-[minmax(0,0.92fr)_minmax(30rem,1.08fr)] lg:gap-12 lg:py-8">
      <section className="order-2 mx-auto w-full max-w-2xl text-center lg:order-1 lg:mx-0 lg:text-left">
        <p className="psl-eyebrow">
          Welcome to Porchside Pet Life
        </p>

        <h1 className="psl-display-title mt-4">
          Welcome home.
          <span className="mt-1 block text-[var(--color-terracotta-600)]">
            Life with your dogs belongs here.
          </span>
        </h1>

        <p className="psl-body-copy mx-auto mt-6 max-w-xl lg:mx-0">
          A warm, simple place to care for your dogs, keep the moments that
          matter, and feel more prepared for every part of life together.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
          <Button
            size="large"
            onClick={() => navigate('/create-account')}
          >
            Let&apos;s Head Inside
          </Button>

          <Button
            variant="quiet"
            size="large"
            onClick={() => navigate('/sign-in')}
          >
            I Already Have a Home
          </Button>
        </div>

        <p className="mt-6 text-sm leading-6 text-[var(--color-olive-600)]">
          Your dogs. Your memories. Your peace of mind.
        </p>
      </section>

      <aside className="order-1 mx-auto w-full max-w-2xl lg:order-2 lg:mx-0 lg:max-w-none">
        <Surface
          tone="sage"
          className="relative isolate min-h-[24rem] overflow-hidden p-0 sm:min-h-[29rem] lg:min-h-[34rem]"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-br from-white/55 via-transparent to-[var(--color-cream-100)]/70"
          />

          <div
            aria-hidden="true"
            className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-white/40 blur-2xl"
          />

          <div
            aria-hidden="true"
            className="absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-[var(--color-cream-100)]/80 blur-2xl"
          />

          <img
            src="/assets/illustrations/arrival.png"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover object-center opacity-70"
          />

          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[var(--color-cream-100)]/80 via-white/5 to-white/15"
          />

          <div className="relative flex min-h-[24rem] items-end justify-center px-5 pt-6 sm:min-h-[29rem] sm:px-8 lg:min-h-[34rem]">
            <img
              src="/assets/stitch/stitch-welcome.png"
              alt="Stitch, the Porchside Pet Life host"
              className="relative z-10 max-h-[21rem] w-auto max-w-full object-contain drop-shadow-[0_18px_22px_rgba(65,54,46,0.18)] sm:max-h-[26rem] lg:max-h-[31rem]"
            />
          </div>
        </Surface>
      </aside>
    </div>
  );
};

export default WelcomePage;