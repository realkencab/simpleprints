import { cn } from "@/utils/clsx";

export default function Badge({ children, badgeType, className, ...restProps }) {
  const badgeTypeStyling = badgeType==="info" ? "rounded-full"
                         : badgeType=="priority" ? "rounded"
                         : "";

  return (
    <span 
      className={cn(
          "text-xs font-semibold",
          "px-2 py-0.5",
          badgeTypeStyling,
          className,
      )}
      {...restProps}
    >
      {children}
    </span>
  );
}