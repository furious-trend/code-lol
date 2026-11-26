// agent-notes: { ctx: "Root layout with metadata, theme surface, conditional Navbar and AmbientJoke", deps: ["./globals.css", "@/components/Navbar", "@/components/AmbientJoke", "@/components/ConditionalLayout"], state: "active", last: "sato@2026-11-26" }
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { AmbientJoke } from "@/components/AmbientJoke";
import { ConditionalLayout } from "@/components/ConditionalLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CodeLOL — Learn to Code with Humor & Memes",
  description: "An interactive, gamified platform to learn programming in JavaScript, Python, C, C++, and Java with AI roasts, meme sounds, and multiplayer coding battles.",
  keywords: ["learn to code", "programming", "python", "javascript", "coding games", "developer humor", "codelol"],
  authors: [{ name: "CodeLOL Team" }],
  openGraph: {
    title: "CodeLOL — Learn to Code with Humor & Memes",
    description: "An interactive, gamified platform to learn programming with AI roasts, meme sounds, and multiplayer coding battles.",
    type: "website",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://code-lol-three.vercel.app",
    siteName: "CodeLOL",
  },
  twitter: {
    card: "summary_large_image",
    title: "CodeLOL — Learn to Code with Humor & Memes",
    description: "An interactive, gamified platform to learn programming with AI roasts, meme sounds, and multiplayer coding battles.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col text-zinc-50 relative bg-zinc-950">
        <div data-testid="scanline-overlay" className="pointer-events-none fixed inset-0 z-50 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:18px_18px] opacity-35" />
        <ConditionalLayout>
          <Navbar />
        </ConditionalLayout>
        <main className="flex-1 w-full flex flex-col">
          {children}
        </main>
        <ConditionalLayout>
          <AmbientJoke />
        </ConditionalLayout>
      </body>
    </html>
  );
}
