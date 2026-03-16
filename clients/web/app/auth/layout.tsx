import WaveBackground from "@/components/WaveBackground"
import { ThemeProvider } from "@/components/theme-provider"

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <WaveBackground />
      <ThemeProvider>{children}</ThemeProvider>
    </>
  )
}
