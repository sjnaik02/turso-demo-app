import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"

export default function TopNav() {
  return (
    <div className="w-full max-w-2xl mx-auto py-3 border-b px-4 flex justify-between items-center">
      <p className="font-semibold">Personal Twitter</p>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  )
}