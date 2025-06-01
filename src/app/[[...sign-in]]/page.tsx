"use client";

import * as Clerk from "@clerk/elements/common";
import { ClerkProvider } from '@clerk/nextjs';
import * as SignIn from "@clerk/elements/sign-in";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LoginPage = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();

  useEffect(() => {
    // Check if user is loaded and signed in
    if (isLoaded && isSignedIn && user) {
      const role = user?.publicMetadata?.role; // Getting the role from Clerk's user metadata

      if (role) {
        // Redirect user based on role
        router.push(`/${role}`);
      }
    }
  }, [isLoaded, isSignedIn, user, router]);

  // Ensure the user is loaded before rendering the component
  if (!isLoaded) {
    return <div>Loading...</div>; // You can show a loading screen while user data is loading
  }

  return (
    <div className="h-screen flex items-center justify-center bg-lamaSkyLight">
      <SignIn.Root>
        <SignIn.Step
          name="start"
          className="bg-white p-12 rounded-md shadow-2xl flex flex-col gap-2"
        >
          <h1 className="text-xl font-bold flex items-center gap-2 px-8">
            <Image
              src="/logo.png"
              alt="Logo"
              width={24}
              height={24}
              className="rounded-2xl"
            />
            Code Hunter
          </h1>
          <h2 className="text-gray-400 text-center">Sign in to your account</h2>
          <Clerk.GlobalError className="text-sm text-red-400" />
          <Clerk.Field name="identifier" className="flex flex-col gap-2">
            <Clerk.Label className="text-xs text-gray-500">
              Username
            </Clerk.Label>
            <Clerk.Input
              type="text"
              required
              className="p-2 rounded-md ring-1 ring-gray-300"
            />
            <Clerk.FieldError className="text-xs text-red-400" />
          </Clerk.Field>
          <Clerk.Field name="password" className="flex flex-col gap-2">
            <Clerk.Label className="text-xs text-gray-500">
              Password
            </Clerk.Label>
            <Clerk.Input
              type="password"
              required
              className="p-2 rounded-md ring-1 ring-gray-300"
            />
            <Clerk.FieldError className="text-xs text-red-400" />
          </Clerk.Field>
          <SignIn.Action
            submit
            className="bg-blue-500 text-white my-1 rounded-md text-sm p-[10px]"
          >
            Sign In
          </SignIn.Action>
        </SignIn.Step>
      </SignIn.Root>
    </div>
  );
};

export default LoginPage;
