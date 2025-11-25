"use client";

import { PixelImage } from "@/components/ui/shadcn-io/pixel-image";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";

export function ShowcaseSection() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <Badge variant="outline" className="mb-4">Success Story</Badge>
            <h2 className="text-4xl font-bold mb-6">
              From Manual to Magical
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              See how we helped companies transform their workflows with intelligent automation.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center mt-1">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">95% Time Reduction</h4>
                  <p className="text-sm text-muted-foreground">Tasks that took hours now complete in minutes</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center mt-1">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Zero Errors</h4>
                  <p className="text-sm text-muted-foreground">Eliminate human mistakes with automated workflows</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center mt-1">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">24/7 Operation</h4>
                  <p className="text-sm text-muted-foreground">Workflows run automatically, even while you sleep</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <PixelImage
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
              grid="8x8"
              grayscaleAnimation={true}
              showReplayButton={true}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
