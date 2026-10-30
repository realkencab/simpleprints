'use client';

import { StaticPanel } from '@/components/ui/panels';
import { useOrderForm } from './hooks/useOrderForm';
import { getAvailableFamilies } from '@/utils/material-list-helpers';
import CustomerSection from './components/CustomerSection';
import OrderDetailsSection from './components/OrderDetailsSection';
import OrderSummarySection from './components/OrderSummarySection';

export default function CreateOrderForm({ materials = [] }) {
  const {
    customerState,
    items,
    notes,
    setNotes,
    isSubmitting,
    calculateTotal,
    handleSubmit,
    handlers,
  } = useOrderForm(materials);

  const availableFamilies = getAvailableFamilies(materials);

  return (
    <div className="w-full max-w-7xl mx-auto min-h-screen flex flex-col justify-start pt-16 md:pt-6 px-4 pb-10 space-y-6">
      <StaticPanel
        title={
          <>
            <h1 className="text-2xl font-bold text-on-main-panel-primary">Create New Order</h1>
            <p className="text-sm text-on-main-panel-secondary">Enter customer information and job order details.</p>
          </>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <CustomerSection {...customerState} />

          <OrderDetailsSection
            items={items}
            materials={materials}
            availableFamilies={availableFamilies}
            handlers={handlers}
          />

          <OrderSummarySection
            notes={notes}
            setNotes={setNotes}
            totalCost={calculateTotal()}
            isSubmitting={isSubmitting}
          />
        </form>
      </StaticPanel>
    </div>
  );
}