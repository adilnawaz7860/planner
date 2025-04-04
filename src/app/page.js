"use client";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <SignedOut>
        <h1 className="text-3xl font-bold">Welcome to Time Table Planner</h1>
        <SignInButton mode="modal" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" />
      </SignedOut>

      <SignedIn>
        {router.push("/dashboard")}
      </SignedIn>
    </div>
  );
}
