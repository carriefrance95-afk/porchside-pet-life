import { Outlet } from 'react-router-dom';
import ArrivalLayout from './ArrivalLayout';

const AuthLayout = () => {
  return (
    <ArrivalLayout
      eyebrow="Porchside Pet Life"
      footer={
        <p className="text-center text-sm text-[var(--color-charcoal-500)]">
          A warm, welcoming home for every part of life with your dogs.
        </p>
      }
    >
      <Outlet />
    </ArrivalLayout>
  );
};

export default AuthLayout;