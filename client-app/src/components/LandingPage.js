import Link from "../components/LayoutL.js"

export default function Component() {
  return (
    <main className="flex flex-col min-h-[100dvh]">
      <section className="w-full py-20 md:py-32 lg:py-40 bg-gradient-to-r from-[#5C6BC0] to-[#7986CB]">
        <div className="container px-4 md:px-6 flex flex-col items-center text-center space-y-6 md:space-y-8 lg:space-y-10">
          <div className="max-w-[800px] space-y-4 md:space-y-6">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Elevate Your Campus Experience with CampusCord
            </h1>
            <p className="text-lg text-gray-200 md:text-xl lg:text-2xl">
              Collaborate, share skills, and exchange notes seamlessly with your fellow students on CampusCord.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <Link
              className="inline-flex h-10 items-center justify-center rounded-md bg-white px-6 py-2 text-sm font-medium text-[#5C6BC0] shadow-md transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#5C6BC0]"
              href="#"
            >
              Download for iOS
            </Link>
            <Link
              className="inline-flex h-10 items-center justify-center rounded-md bg-white px-6 py-2 text-sm font-medium text-[#5C6BC0] shadow-md transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#5C6BC0]"
              href="#"
            >
              Download for Android
            </Link>
          </div>
        </div>
      </section>
      <section className="w-full py-16 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          <div className="flex flex-col items-start space-y-4 md:space-y-6">
            <MergeIcon className="w-12 h-12 text-[#5C6BC0]" />
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Seamless Collaboration</h2>
            <p className="text-gray-500 md:text-lg">
              Connect with your peers, form study groups, and collaborate on projects seamlessly with CampusCord's
              powerful collaboration tools.
            </p>
          </div>
          <div className="flex flex-col items-start space-y-4 md:space-y-6">
            <ShareIcon className="w-12 h-12 text-[#5C6BC0]" />
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Skill Sharing</h2>
            <p className="text-gray-500 md:text-lg">
              Discover and learn new skills from your fellow students, or share your own expertise with the community.
            </p>
          </div>
          <div className="flex flex-col items-start space-y-4 md:space-y-6">
            <StickyNoteIcon className="w-12 h-12 text-[#5C6BC0]" />
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Note Exchange</h2>
            <p className="text-gray-500 md:text-lg">
              Easily share and exchange class notes with your peers, ensuring you never miss a beat.
            </p>
          </div>
        </div>
      </section>
      <section className="w-full py-16 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
        <div className="container px-4 md:px-6 flex flex-col items-center text-center space-y-6 md:space-y-8 lg:space-y-10">
          <div className="max-w-[800px] space-y-4 md:space-y-6">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Join the CampusCord Community</h2>
            <p className="text-gray-500 md:text-lg">
              Download the app and start connecting with your fellow students today.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <Link
              className="inline-flex h-10 items-center justify-center rounded-md bg-[#5C6BC0] px-6 py-2 text-sm font-medium text-white shadow-md transition-colors hover:bg-[#7986CB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5C6BC0] focus-visible:ring-offset-2"
              href="#"
            >
              Download for iOS
            </Link>
            <Link
              className="inline-flex h-10 items-center justify-center rounded-md bg-[#5C6BC0] px-6 py-2 text-sm font-medium text-white shadow-md transition-colors hover:bg-[#7986CB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5C6BC0] focus-visible:ring-offset-2"
              href="#"
            >
              Download for Android
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

function MergeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 6 4-4 4 4" />
      <path d="M12 2v10.3a4 4 0 0 1-1.172 2.872L4 22" />
      <path d="m20 22-5-5" />
    </svg>
  )
}


function ShareIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" x2="12" y1="2" y2="15" />
    </svg>
  )
}


function StickyNoteIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15.5 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V8.5L15.5 3Z" />
      <path d="M15 3v6h6" />
    </svg>
  )
}

=== styles.css ===

body {
  font-family: var(--font-comfortaa), sans-serif;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-gabarito), sans-serif;
}

=== layout.jsx ===

// This is the root layout component for your Next.js app.
// Learn more: https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required

import { Gabarito } from 'next/font/google'
import { Comfortaa } from 'next/font/google'
import './styles.css'

const gabarito = Gabarito({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-gabarito',
})
const comfortaa = Comfortaa({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-comfortaa',
})

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body className={gabarito.variable + ' ' + comfortaa.variable}>
        {children}
      </body>
    </html>
  )
}