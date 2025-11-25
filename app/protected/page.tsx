import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { FileUpload } from "@/components/file-upload";

// Enable dynamic rendering for auth checks
export const dynamic = "force-dynamic";

export default async function ProtectedPage() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    redirect("/auth/login");
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <div className="px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-muted-foreground text-lg">
              Upload your files to get started
            </p>
          </div>

          <FileUpload />
        </div>
      </div>
    </main>
  );
}
