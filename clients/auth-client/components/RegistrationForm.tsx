import { 
  Card, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
export default function RegistrationForm() {
    return (
        <Card className="w-full max-w-md rounded-2xl border border-emerald-400/20 bg-white/30 backdrop-blur-xs shadow-emerald-50 p-8">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-emerald-900">
                Create Account
              </CardTitle>
              <CardDescription className="text-sm text-emerald-900/60 mb-6">
                Join Sermocino today
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                type="text"
                placeholder="Full Name"
                className="w-full rounded-lg border border-emerald-900/40 bg-white/60 px-4 py-5 outline-none focus:ring-2 focus:ring-emerald-400"
              />
              <Input
                type="email"
                placeholder="Email"
                className="w-full rounded-lg border border-emerald-900/40 bg-white/60 px-4 py-5 outline-none focus:ring-2 focus:ring-emerald-400"
              />
              <Input
                type="password"
                placeholder="Password"
                className="w-full rounded-lg border border-emerald-900/40 bg-white/60 px-4 py-5 outline-none focus:ring-2 focus:ring-emerald-400"
              />
              <Input
                type="password"
                placeholder="Confirm Password"
                className="w-full rounded-lg border border-emerald-900/40 bg-white/60 px-4 py-5 outline-none focus:ring-2 focus:ring-emerald-400"
              />
              <Button className="w-full rounded-lg bg-emerald-600 hover:bg-emerald-700 transition text-white py-5 font-semibold shadow-lg">
                Create Account
              </Button>
            </CardContent>
            <CardFooter className="text-center text-sm text-emerald-900/70 mt-6">
              Already have an account? <span className="font-semibold cursor-pointer"> Login</span>
            </CardFooter>
        </Card>
    );
}