export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="flex items-center justify-center h-screen">
        <div className="size-[50%]">
            {children}
        </div>
    </main>
  )
}
