import { Geist, Geist_Mono, Nunito_Sans } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils";

const nunitoSans = Nunito_Sans({variable:'--font-sans'})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", nunitoSans.variable)}
    >
      <body className="
        bg-[radial-gradient(circle_at_center,var(--custom-emerald-100),var(--custom-emerald-200),var(--custom-emerald-400))] 
        h-screen
        w-screen"
      >
        <ThemeProvider>
            {children}
          </ThemeProvider>
      </body>
    </html>
  )
}
