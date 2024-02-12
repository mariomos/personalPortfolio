import Header from '@/components/header'
import './globals.css'
import { Inter } from 'next/font/google'
import ActiveSectionContextProvider from '@/context/active-section-context'
import { Toaster } from 'react-hot-toast'
import Footer from '@/components/footer'
import ThemeSwitch from '@/components/theme-switch'
import ThemeContextProvider from '@/context/theme-context'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Mario Moshogiannis | Personal Portfolio',
  description: 'Explore a showcase of my work as a Frontend Developer. Discover web projects, UI/UX designs, and more. Join me on a journey through code and creativity.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='!scroll-smooth'> 
      <body className={`{inter.className} dark:bg-gray-900 dark:text-gray-50 dark:text-opacity-90 bg-gray-50 text-gray-950 relative pt-4 lg:pt-28  lg:pb-2 pb-14`}>
        <div className='dark:bg-[#946263] bg-[#fbe2e3] absolute -z-10 top-[-6rem] right-[11rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem]'></div>
        <div className='dark:bg-[#676394] bg-[#dbd7fb] absolute -z-10 top-[-1rem] left-[-35rem] h-[50rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem]'></div>
        
        <ThemeContextProvider>
          <ActiveSectionContextProvider>
            <Header/>
            {children}
            <Footer />
            <Toaster position='top-right' />
          </ActiveSectionContextProvider>

          <ThemeSwitch />
        </ThemeContextProvider>
        
        </body>
    </html>
  )
}
