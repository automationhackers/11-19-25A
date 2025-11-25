"use client";

import { Magnetic } from "@/components/ui/shadcn-io/magnetic";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-20 px-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600">
      <div className="max-w-4xl mx-auto text-center text-white">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Ready to Transform Your Workflow?
        </h2>
        <p className="text-xl mb-8 opacity-90">
          Join hundreds of companies saving time and money with automation
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Magnetic>
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-6 text-lg rounded-xl shadow-2xl">
              Get Started Free
            </Button>
          </Magnetic>
          <Magnetic>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg rounded-xl">
              Schedule Demo
            </Button>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
