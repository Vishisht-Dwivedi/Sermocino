import WaveBackground from "@/components/auth/WaveBackground"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <WaveBackground />
      <Toaster />
      <ThemeProvider>{children}</ThemeProvider>
    </>
  )
}
