import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export default function TopNav() {
  return (
    <div className="mx-auto flex w-full max-w-2xl items-center justify-between border-b px-4 py-3">
      <Link className="font-semibold" href="/">
        Yapper
      </Link>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <div className="flex items-center gap-4">
          <Button variant="outline" asChild>
            <Link href="/dashboard">
              My Profile <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <UserButton />
        </div>
      </SignedIn>
    </div>
  );
}
