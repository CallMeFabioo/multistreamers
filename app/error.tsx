'use client';

import { useEffect } from 'react';

import Image from 'next/image';

import ErrorPageImg from '../public/error-page.svg';

export default function Error({ error }: { error: Error; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="relative h-screen overflow-hidden bg-slate-900">
      <header className="absolute top-0 left-0 right-0 z-20">
        <nav className="container mx-auto px-6 py-4 md:px-12">
          <div className="items-center justify-between md:flex">
            <div className="flex items-center justify-between">
              <div className="md:hidden">
                <button className="text-gray-800 focus:outline-none">
                  <svg
                    className="h-12 w-12"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 6H20M4 12H20M4 18H20"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <div className="container z-10 mx-auto flex h-screen items-center justify-between px-6 pt-32 md:pt-0">
        <div className="container relative mx-auto flex flex-col-reverse items-center justify-between px-6 lg:flex-row">
          <div className="mb-16 w-full text-center md:mb-8 lg:text-left">
            <h1 className="mt-12 text-center font-sans text-5xl font-light text-gray-200 md:mt-0 lg:text-left lg:text-8xl">
              Sorry, something wrong happen!
            </h1>

            <h1 className="mt-12 text-center font-sans text-5xl font-light text-gray-200 lg:text-left lg:text-5xl">
              Reload the page!
            </h1>
          </div>
          <div className="relative mx-auto block w-full max-w-md md:mt-0 lg:max-w-2xl">
            <Image src={ErrorPageImg} alt="" />
          </div>
        </div>
      </div>
    </main>
  );
}
