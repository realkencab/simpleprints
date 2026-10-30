"use client";

import { useState } from "react";
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { cn } from "@/utils/clsx";

export default function StaticPanel({ title, children }) {
  return (  
    <section className="rounded-lg shadow-sm overflow-hidden">
      <div className={cn(
          "w-full flex items-center justify-between p-4",
          "border-b border-lines-subtle",
          "bg-main-panel-secondary",
          "border-b border-lines-subtle",
          "transition-colors  text-left",
        )}
      >
        <div className="flex items-center space-x-2">
          {title}
        </div>
      </div>

      <div className="bg-main-panel-primary">
        <div className="overflow-hidden">{children}</div>
      </div>
    </section>
  );
}