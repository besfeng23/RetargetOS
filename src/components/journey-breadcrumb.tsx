"use client";

import { journeySteps, type JourneyStep } from "@/lib/constants";
import { ChevronRight } from "lucide-react";

interface JourneyBreadcrumbProps {
  currentStep?: JourneyStep;
}

export function JourneyBreadcrumb({ currentStep }: JourneyBreadcrumbProps) {
  if (!currentStep) return null;

  const currentIndex = journeySteps.findIndex((s) => s.id === currentStep);
  if (currentIndex === -1) return null;

  return (
    <div className="flex items-center gap-2 text-xs text-white/50">
      {journeySteps.slice(0, currentIndex + 1).map((step, idx) => (
        <div key={step.id} className="flex items-center gap-2">
          <div
            className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold ${
              idx < currentIndex
                ? "bg-green-500/20 text-green-300"
                : idx === currentIndex
                  ? "bg-blue-500/20 text-blue-300"
                  : "bg-white/10 text-white/40"
            }`}
          >
            {step.step}
          </div>
          {idx < currentIndex + 1 && idx < journeySteps.length - 1 && (
            <ChevronRight className="h-4 w-4" />
          )}
        </div>
      ))}
    </div>
  );
}
