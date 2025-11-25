import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { AuthButton } from "@/components/auth-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Workflow } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

const companyName = process.env.NEXT_PUBLIC_COMPANY_NAME || "AutomateFlow";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: companyName,
  description: "Streamline your workflows with powerful n8n automation",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Global Navigation */}
          <nav className="fixed top-0 w-full z-50 border-b bg-background/80 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
              <Link href="/" className="flex items-center gap-2">
                <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {companyName}
                </span>
              </Link>

              <div className="flex items-center gap-6">
                <ThemeSwitcher />
                <Suspense fallback={null}>
                  <AuthButton />
                </Suspense>
              </div>
            </div>
          </nav>

          {/* Page Content */}
          <div className="pt-[72px]">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
