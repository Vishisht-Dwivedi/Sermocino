import Image from "next/image"
import { 
  Tabs, 
  TabsList, 
  TabsContent, 
  TabsTrigger 
} from "@/components/ui/tabs"
import LoginForm from "@/components/LoginForm"
import RegistrationForm from "@/components/RegistrationForm"

export default function Page() {
  return (
    <main className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2">
      <div className="relative flex flex-col items-center justify-center px-10 py-16 text-center">
        <div className="relative w-2/5 aspect-2/3">
          <Image
            src="/sermocino_mascot.webp"
            alt="Sermocino Mascot"
            fill
            priority
            className="object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.25)]"
          />
        </div>
        <h1 className="mt-8 text-5xl font-bold tracking-tight text-emerald-800">
          Sermocino
        </h1>
        <p className="mt-3 text-lg text-emerald-900/70 max-w-sm">
          Your Intelligent Conversation System
        </p>
      </div>

      <div className="relative flex items-center justify-center px-6 py-16">
        <Tabs defaultValue="login" className="w-full max-w-md">
          <TabsList className="flex w-full mb-8 rounded-md bg-white/40 py-6 backdrop-blur">
            <TabsTrigger value="login"
              className="
                flex-1 py-5 text-sm font-medium
              data-[state=active]:bg-emerald-500
              data-[state=active]:text-white
                data-[state=active]:shadow
              "
            >
              Login
            </TabsTrigger>
            <TabsTrigger value="register"
              className="
                flex-1 py-5 text-sm font-medium
              data-[state=active]:bg-emerald-500
              data-[state=active]:text-white
                data-[state=active]:shadow
              "
            >
              Register
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <LoginForm />
          </TabsContent>

          <TabsContent value="register">
            <RegistrationForm />            
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}