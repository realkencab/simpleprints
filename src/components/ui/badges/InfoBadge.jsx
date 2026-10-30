import Badge from "./Badge";

export default function InfoBadge({ children, ...restProps }) {
  return (
    <Badge 
      badgeType="info"
      {...restProps}
    >
      {children}
    </Badge>
  );
}
