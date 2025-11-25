"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { createClient } from "@/lib/supabase/client"; // Use client-side Supabase
import { LogoutButton } from "./logout-button";

export function AuthButton() {
  const [user, setUser] = useState<any>(null); // State to hold user session

  useEffect(() => {
    const supabase = createClient();

    // Fetch initial session
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
    });

    // Subscribe to auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    // Cleanup subscription on unmount
    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []); // Empty dependency array means this runs once on mount

  return user ? (
    <div className="flex items-center gap-3">
      <Button
        asChild
        size="sm"
        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
      >
        <Link href="/protected">Dashboard</Link>
      </Button>
      <LogoutButton />
    </div>
  ) : (
    <Button
      asChild
      size="sm"
      variant="outline"
      className="border-purple-500/50 text-purple-600 hover:bg-purple-500/10 dark:text-purple-400 dark:hover:bg-purple-500/20"
    >
      <Link href="/auth/login">Sign in</Link>
    </Button>
  );
}
