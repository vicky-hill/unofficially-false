import { Figtree } from "next/font/google"
import '@/sass/main.scss'
import '@/public/style.css'
import type { Metadata } from 'next'

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  themeColor: '#24242c',
}

export default function RootLayout({ children }: any) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#24242c" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className={`${figtree.variable} antialiased page-gradient`}>
        {children}
      </body>
    </html>
  );
}
