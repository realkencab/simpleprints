'use client';

import SubPanel from '@/components/ui/panels/SubPanel';
import { cn } from '@/utils/clsx';

export default function CustomerSection({
  customerFirstName,
  setCustomerFirstName,
  customerLastName,
  setCustomerLastName,
  customerContactPrimary,
  setCustomerContactPrimary,
  customerContactSecondary,
  setCustomerContactSecondary,
  customerSocials,
  setCustomerSocials,
}) {
  return (
    <SubPanel
      title={
        <div className={cn(
          "flex justify-between items-center",
          "border-b border-lines-secondary pb-2",
          "w-full"
        )}>
          <h2 className="text-2xl font-bold text-gray-800">
            1. Customer Information
          </h2>
        </div>
      }
    >
      {/* Name Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-1">
        <div className="px-1">
          <label className="block text-sm font-medium text-on-main-panel-primary mb-1">
            First Name <span className="text-on-terracotta-primary">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Juan"
            value={customerFirstName}
            onChange={(e) => setCustomerFirstName(e.target.value)}
            className={cn(
              "w-full px-3 py-2 border border-lines-secondary rounded-md",
              "focus:ring-2 focus:ring-terracotta-border focus:outline-none",
              "text-sm text-on-main-panel-input bg-main-panel-input",
              "placeholder-on-terracotta-primary/75"
            )}
          />
        </div>

        <div className="px-1">
          <label className="block text-sm font-medium text-on-main-panel-primary mb-1">
            Last Name
          </label>
          <input
            type="text"
            placeholder="e.g. dela Cruz"
            value={customerLastName}
            onChange={(e) => setCustomerLastName(e.target.value)}
            className={cn(
              "w-full px-3 py-2 border border-lines-secondary rounded-md",
              "focus:ring-2 focus:ring-terracotta-border focus:outline-none",
              "text-sm text-on-main-panel-input bg-main-panel-input",
              "placeholder-on-taupe-primary/50"
            )}
          />
        </div>
      </div>

      {/* Contact Information Row */}
      <div className="py-1">
        <div className="px-1 mb-1">
          <label className="block text-sm font-medium text-on-main-panel-primary mb-1">
            Contact Information <span className="text-on-terracotta-primary">*</span>
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Primary Contact (Required) */}
          <div className="px-1">
            <input
              type="text"
              required
              placeholder="Number / Email / Socials *"
              value={customerContactPrimary}
              onChange={(e) => setCustomerContactPrimary(e.target.value)}
              className={cn(
                "w-full px-3 py-2 border border-lines-secondary rounded-md",
                "focus:ring-2 focus:ring-terracotta-border focus:outline-none",
                "text-sm text-on-main-panel-input bg-main-panel-input",
                "placeholder-on-terracotta-primary/75"
              )}
            />
          </div>

          {/* Secondary Contact (Optional) */}
          <div className="px-1">
            <input
              type="text"
              placeholder="(Optional)"
              value={customerContactSecondary}
              onChange={(e) => setCustomerContactSecondary(e.target.value)}
              className={cn(
                "w-full px-3 py-2 border border-lines-secondary rounded-md",
                "focus:ring-2 focus:ring-terracotta-border focus:outline-none",
                "text-sm text-on-main-panel-input bg-main-panel-input",
                "placeholder-on-taupe-primary/50"
              )}
            />
          </div>

          {/* Third Contact (Optional) */}
          <div className="px-1">
            <input
              type="text"
              placeholder="(Optional)"
              value={customerSocials}
              onChange={(e) => setCustomerSocials(e.target.value)}
              className={cn(
                "w-full px-3 py-2 border border-lines-secondary rounded-md",
                "focus:ring-2 focus:ring-terracotta-border focus:outline-none",
                "text-sm text-on-main-panel-input bg-main-panel-input",
                "placeholder-on-taupe-primary/50"
              )}
            />
          </div>
        </div>
      </div>
    </SubPanel>
  );
}