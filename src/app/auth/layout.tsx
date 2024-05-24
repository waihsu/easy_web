import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container fixed top-0 max-h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 px-0">
      <div className="relative hidden min-h-screen flex-col item-center bg-muted p-10 py-20  lg:flex dark:border-r">
        <div className="absolute inset-0 bg-muted dark:bg-background " />
        <div className="relative z-20 flex items-center text-lg font-medium ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-6 w-6"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
          Imagine Stories
        </div>
        <div className="relative mt-auto">
          <p className="  sm:text-3xl">
            Dive into a universe of endless possibilities with StoryVerse, where
            every click opens the door to a new adventure. From gripping sci-fi
            sagas to heartwarming romances, our collection of short stories will
            transport you to realms beyond your wildest dreams. Login and unlock
            the magic of storytelling today!
          </p>
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg ">
              &ldquo;This library has saved me countless hours of work and
              helped me deliver stunning designs to my clients faster than ever
              before.&rdquo;
            </p>
            <footer className="text-sm">Sofia Davis</footer>
          </blockquote>
        </div>
      </div>
      <div className="">{children}</div>
    </div>
  );
}
