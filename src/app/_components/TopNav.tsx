import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'

export default function TopNav() {
  return (
    <div className="w-full max-w-2xl mx-auto py-3 border-b flex justify-between items-center">
      <Link className="font-semibold" href="/">Yapper</Link>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <div className="flex items-center gap-4">
          <Button variant="outline" asChild>
            <Link href="/dashboard">Dashboard <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
          <UserButton />
        </div>
      </SignedIn>
    </div>
  )
}