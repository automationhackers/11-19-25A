import Link from "next/link";
import { Button } from "./ui/button";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "./logout-button";

export async function AuthButton() {
  const supabase = await createClient();

  // You can also use getUser() which will be slower.
  const { data } = await supabase.auth.getClaims();

  const user = data?.claims;

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
