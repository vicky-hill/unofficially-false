import { Figtree } from "next/font/google"
import { Metadata, Viewport } from 'next'
import '@/sass/main.scss'
import '@/public/style.css'
import ReduxProvider from '@/redux/ReduxProvider'

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({ children }: any) {
  return (
    <html lang="en">
      <body className={`${figtree.variable} antialiased page-gradient`}>
        <ReduxProvider>
          {/* {children} */}
          <div className='flex justify-center text-white text-2xl mt-52'>Closed for now</div>
        </ReduxProvider>
      </body>
    </html>
  );
}
