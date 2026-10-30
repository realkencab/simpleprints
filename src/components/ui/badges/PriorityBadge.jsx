import Badge from "./Badge";
import { cn } from "@/utils/clsx";

const PRIORITY_MAP = {
  Critical: 'bg-terracotta-secondary text-on-terracotta-secondary',
  High: 'bg-terracotta-primary text-on-terracotta-primary border border-terracotta-border',
  Medium: 'bg-sage-primary text-on-sage-primary border border-sage-border',
  Low: 'bg-azul-primary text-on-azul-primary border border-azul-border',
  None: 'bg-taupe-primary text-on-taupe-primary border border-taupe-border',
};

export default function PriorityBadge({ priority, ...restProps }) {
  return (
    <Badge 
      badgeType="priority"
      className={cn(PRIORITY_MAP[priority] || PRIORITY_MAP.None)}
      {...restProps}
    >
      {priority}
    </Badge>
  );
}
