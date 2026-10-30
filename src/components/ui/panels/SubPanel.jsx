"use client";

import { cn } from "@/utils/clsx";

export default function SubPanel({ title, children }) {
  return (  
    <div className="rounded-lg shadow-sm overflow-hidden m-4">
      <div className={cn(
          "w-full flex items-center justify-between py-2 px-3",
          "bg-main-panel-secondary",
          "transition-colors  text-left",
        )}
      >
        <div className={cn(
            "flex items-center space-x-2 w-full",
          )}  
        >
          {title}
        </div>
      </div>

      <div className="bg-main-panel-secondary p-4 ">
        <div className="overflow-hidden space-y-4">{children}</div>
      </div>
    </div>
  );
}