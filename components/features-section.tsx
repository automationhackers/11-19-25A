"use client";

import { PinContainer } from "@/components/ui/shadcn-io/3d-pin";
import { Zap, Clock, Shield, CheckCircle2 } from "lucide-react";

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 px-6 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Why Choose AutomateFlow?
          </h2>
          <p className="text-xl text-muted-foreground">
            Enterprise-grade automation without enterprise complexity
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-8">
          <PinContainer title="Learn More" href="#" className="w-full h-full">
            <div className="flex flex-col h-full min-h-[400px] p-8 bg-background rounded-2xl border shadow-xl">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-purple-500/30">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Lightning Fast Setup</h3>
              <p className="text-muted-foreground mb-6 flex-grow">
                Get your first automation running in hours, not weeks. Our expert team handles everything.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Free consultation</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Custom workflows</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span className="text-sm">24/7 support</span>
                </li>
              </ul>
            </div>
          </PinContainer>

          <PinContainer title="Explore" href="#" className="w-full h-full">
            <div className="flex flex-col h-full min-h-[400px] p-8 bg-background rounded-2xl border shadow-xl">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30">
                <Clock className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Save 40+ Hours/Week</h3>
              <p className="text-muted-foreground mb-6 flex-grow">
                Automate repetitive tasks and focus on what matters. Our clients save an average of 40 hours weekly.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Email automation</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Data synchronization</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Report generation</span>
                </li>
              </ul>
            </div>
          </PinContainer>

          <PinContainer title="Discover" href="#" className="w-full h-full">
            <div className="flex flex-col h-full min-h-[400px] p-8 bg-background rounded-2xl border shadow-xl">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-green-500/30">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Enterprise Security</h3>
              <p className="text-muted-foreground mb-6 flex-grow">
                Bank-level encryption and compliance. Your data stays secure and private, always.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span className="text-sm">SOC 2 compliant</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span className="text-sm">GDPR ready</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span className="text-sm">End-to-end encryption</span>
                </li>
              </ul>
            </div>
          </PinContainer>
        </div>
      </div>
    </section>
  );
}
