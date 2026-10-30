"use client";

import { useState } from "react";
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { cn } from "@/utils/clsx";

export default function ExpansionPanel({ title, children, defaultToClose=false }) {
  const [isOpen, setIsOpen] = useState(!defaultToClose);

  return (  
    <section className="rounded-lg shadow-sm overflow-hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full flex items-center justify-between p-4 ",
          "border-b border-lines-subtle",
          "bg-main-panel-secondary",
          "hover:bg-main-panel-secondary-hover ",
          "transition-colors  text-left",
        )}
      >
        <div className="flex items-center space-x-2">
          {title}
        </div>
        <ChevronDownIcon
          className={`w-5 h-5 text-on-main-panel-primary transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        /> 
      </button>
      <div
        className={cn(
          "grid transition-all duration-300 ease-in-out ",
          "bg-main-panel-primary",
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        )}
      >
        <div className="overflow-hidden">{children}</div>
      </div>
    </section>
  );
}