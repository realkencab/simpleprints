import { PRIORITY_STYLES } from '@/constants/badge-colors';

export default function PriorityBadge({ priority }) {
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded ${PRIORITY_STYLES[priority] || PRIORITY_STYLES.None}`}>
      {priority}
    </span>
  );
}
