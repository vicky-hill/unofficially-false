import { Figtree } from "next/font/google"
import '@/sass/main.scss'
import '@/public/style.css'
import type { Metadata } from 'next'

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: any = {
  themeColor: '#24242c',

  // Safari iOS-specific PWA appearance
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent', // can be 'default', 'black', or 'black-translucent'
    title: 'My App',
  },

  // Sometimes helps Safari interpret correctly
  viewport: {
    themeColor: '#24242c',
  },
};
export default function RootLayout({ children }: any) {
  return (
    <html lang="en">
      <body className={`${figtree.variable} antialiased page-gradient`}>
        {children}
      </body>
    </html>
  );
}
