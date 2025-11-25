"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    // Use full page reload to ensure cookies are cleared and server components update
    window.location.href = "/";
  };

  return (
    <Button
      onClick={logout}
      size="sm"
      variant="outline"
      className="border-purple-500/50 text-purple-600 hover:bg-purple-500/10 dark:text-purple-400 dark:hover:bg-purple-500/20"
    >
      Logout
    </Button>
  );
}
