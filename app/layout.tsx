import { Figtree } from "next/font/google"
import '@/sass/main.scss'
import '@/public/style.css'

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function RootLayout({ children }: any) {
  return (
    <html lang="en">
      <body className={`${figtree.variable} antialiased page-gradient`}>
        {children}
      </body>
    </html>
  );
}
