"use client";
import { useSession } from "next-auth/react";

export default function HeaderUsername() {
  const { data: session, status } = useSession()

  if (status === "authenticated") {
    return <p>{session.user?.name}</p>
  }

  return <a href="/api/auth/signin">Sign in</a>
}