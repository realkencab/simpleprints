import { cn } from "@/utils/clsx";

export default function Card({ children }) {

  return (
    <div 
      className={cn(
          "space-y-4"
      )}
    >
      {children}
    </div>
  );
}