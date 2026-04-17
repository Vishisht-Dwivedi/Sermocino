import Image from "next/image"
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs"
import RegistrationForm from "@/components/onboarding/RegistrationForm"
export default function Page() {
  return (
    <main className="grid min-h-screen grid-cols-1 lg:grid-cols-2 h-screen w-screen bg-emerald-50/10">
      <div className="relative flex flex-col items-center justify-center px-10 py-16 text-center">
        <div className="relative aspect-2/3 w-2/5">
          <Image
            src="/sermocino_mascot.webp"
            alt="Sermocino Mascot"
            fill
            priority
            className="object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.25)]"
          />
        </div>
        <h1 className="mt-1 flex w-2/3 items-center justify-center gap-4 text-5xl font-bold tracking-tight text-emerald-800">
          <span className="h-1 flex-1 bg-emerald-300"></span>
          Sermocino
          <span className="h-1 flex-1 bg-emerald-300"></span>
        </h1>
        <p className="mt-3 flex w-2/3 max-w-sm items-center justify-center gap-4 text-lg text-emerald-900/70">
          <span className="h-1 flex-1 bg-emerald-300"></span>
          Your Intelligent Conversation System
          <span className="h-1 flex-1 bg-emerald-300"></span>
        </p>
      </div>

      <div className="relative flex items-center justify-center px-6 py-16">
        <RegistrationForm />
      </div>
    </main>
  )
}
