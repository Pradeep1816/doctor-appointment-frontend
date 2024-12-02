import { SignUp, SignIn } from '@clerk/nextjs';
import Link from 'next/link';
export default function SignUpPage() {
  return (
    <div className="flex flex-col items-center p-10 max-w-md mx-auto">

      <SignIn

        path='/sign-in'
        appearance={{
          layout: {
            socialButtonsPlacement: 'bottom',
          },
          elements: {
            rootBox: 'p-5 rounded-lg',
            card: 'p-5 rounded-lg shadow-md border-none',
            formButtonPrimary: 'bg-teal-400 text-white py-2 px-4 rounded hover:bg-teal-500',
          },
          variables: {
            colorPrimary: '#1a73e8',
            colorText: '#333333',
            borderRadius: '8px',
          },
        }}
      />

    </div>
  );
}