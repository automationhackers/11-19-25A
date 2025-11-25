"use client";

import { AnimatedBeam } from "@/components/ui/shadcn-io/animated-beam";
import { Magnetic } from "@/components/ui/shadcn-io/magnetic";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRef } from "react";
import Link from "next/link";
import {
  Zap,
  Workflow,
  TrendingUp,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);

  return (
    <section className="pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <Badge variant="secondary" className="mb-6 px-4 py-2">
          <Sparkles className="w-4 h-4 mr-2 inline" />
          Powered by n8n Automation
        </Badge>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent leading-tight">
          Transform Your Business
          <br />
          With Intelligent Automation
        </h1>

        <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
          We build custom n8n workflows that save you time, eliminate errors,
          and scale your operations without hiring more staff.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Magnetic>
            <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 text-lg rounded-xl shadow-2xl shadow-purple-500/50">
              <Link href="/protected">
                Start Automating <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </Magnetic>
        </div>

        {/* Animated Workflow Diagram */}
        <div className="relative max-w-4xl mx-auto h-64" ref={containerRef}>
          <div className="absolute left-1/4 top-1/2 -translate-y-1/2">
            <div ref={div1Ref} className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-xl">
              <Zap className="w-8 h-8 text-white" />
            </div>
          </div>

          <div className="absolute left-1/2 top-1/4 -translate-x-1/2">
            <div ref={div2Ref} className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-xl">
              <Workflow className="w-8 h-8 text-white" />
            </div>
          </div>

          <div className="absolute right-1/4 top-1/2 -translate-y-1/2">
            <div ref={div3Ref} className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-xl">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
          </div>

          <AnimatedBeam
            containerRef={containerRef}
            fromRef={div1Ref}
            toRef={div2Ref}
            duration={5}
            gradientStartColor="#a855f7"
            gradientStopColor="#ec4899"
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={div2Ref}
            toRef={div3Ref}
            duration={6}
            gradientStartColor="#3b82f6"
            gradientStopColor="#10b981"
          />
        </div>
      </div>
    </section>
  );
}
