import { Geist, Geist_Mono, Nunito_Sans } from "next/font/google"
import WaveBackground from "@/components/WaveBackground";
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
        h-screen
        w-screen
        bg-emerald-50/50"
      >
        <WaveBackground />
        <ThemeProvider>
            {children}
          </ThemeProvider>
      </body>
    </html>
  )
}
