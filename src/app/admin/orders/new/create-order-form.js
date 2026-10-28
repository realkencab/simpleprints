'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function CreateOrderForm({materials = []}) {
  const router = useRouter();

  // 1. Customer Information State
  const [customerName, setCustomerName] = useState('');
  const [customerContact, setCustomerContact] = useState('');

  // 2. Order Details (Item Array State)
  const [items, setItems] = useState([
    { id: 1, itemName: '', material: materials[0]?.name || 'PLA', qty: 1, price: 0 }
  ]);

  // 3. Notes & Form Control State
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handlers for Dynamic Line Items
  const handleAddItem = () => {
    setItems((prev) => [
      ...prev,
      { 
        id: Date.now(), 
        itemName: '', 
        material: materials[0]?.name || 'PLA', 
        qty: 1, 
        price: 0 
      }
    ]);
  };

  const handleRemoveItem = (id) => {
    if (items.length === 1) return; // Retain at least one row
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleItemChange = (id, field, value) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          // Defaults qty to 1 if blank/empty input
          if (field === 'qty') {
            const parsedQty = parseInt(value, 10);
            return { ...item, qty: isNaN(parsedQty) || parsedQty < 1 ? 1 : parsedQty };
          }
          if (field === 'price') {
            const parsedPrice = parseFloat(value);
            return { ...item, price: isNaN(parsedPrice) ? 0 : parsedPrice };
          }
          return { ...item, [field]: value };
        }
        return item;
      })
    );
  };

  // Total Order Cost Calculation (in PHP ₱)
  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + (item.qty * item.price), 0);
  };

  // Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Standardized JSON representation for order items
    const formattedItems = items.map(({ itemName, material, qty, price }) => ({
      itemName: itemName.trim(),
      material,
      qty: Number(qty) || 1,
      price: Number(price) || 0,
    }));

    const orderPayload = {
      customer: {
        name: customerName.trim(),
        contact: customerContact.trim(),
      },
      items: formattedItems, // Serialized to JSON string when writing to Google Sheets
      notes: notes.trim(),
      totalCost: calculateTotal(),
      createdAt: new Date().toISOString(),
    };

    console.log('Order Payload Output:', orderPayload);

    // API routing
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      });

      if (!res.ok) throw new Error('Failed to save order');

      alert('Order created successfully!');
      router.push('/admin/orders/list');
    } catch (err) {
      alert('Error saving order.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto w-full pt-16 md:pt-6 px-4 pb-12">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
        
        {/* Page Title */}
        <div className="border-b border-gray-200 pb-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Create New Order</h1>
          <p className="text-sm text-gray-500">Enter customer information and job order details.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* SECTION 1: CUSTOMER INFORMATION */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-4">
            <h2 className="text-md font-bold text-gray-800 border-b border-gray-200 pb-2">
              1. Customer Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Customer Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Juan dela Cruz"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm text-gray-900 bg-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Number / Email / Socials <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={customerContact}
                  onChange={(e) => setCustomerContact(e.target.value)}
                  placeholder="e.g. 09171234567 / @juandelacruz"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm text-gray-900 bg-white"
                />
              </div>
            </div>
          </div>

          {/* SECTION 2: ORDER DETAILS */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-4">
            <div className="flex justify-between items-center border-b border-gray-200 pb-2">
              <h2 className="text-md font-bold text-gray-800">
                2. Order Details
              </h2>
              <button
                type="button"
                onClick={handleAddItem}
                className="flex items-center text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-100 hover:bg-blue-200 px-3 py-1.5 rounded-md transition-colors"
              >
                <PlusIcon className="w-4 h-4 mr-1" />
                Add Item Row
              </button>
            </div>

            <div className="space-y-3">
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className="grid grid-cols-12 gap-2 p-3 bg-white border border-gray-200 rounded-md items-center shadow-sm"
                >
                  {/* Item Name */}
                  <div className="col-span-12 md:col-span-5">
                    <label className="block text-xs font-medium text-gray-500 md:hidden mb-1">Item Name</label>
                    <input
                      type="text"
                      required
                      placeholder={`Item #${index + 1} Name`}
                      value={item.itemName}
                      onChange={(e) => handleItemChange(item.id, 'itemName', e.target.value)}
                      className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-900"
                    />
                  </div>

                  {/* Material Dropdown */}
                  <div className="col-span-6 md:col-span-3">
                    <label className="block text-xs font-medium text-gray-500 md:hidden mb-1">Material</label>
                    <select
                      value={item.material}
                      onChange={(e) => handleItemChange(item.id, 'material', e.target.value)}
                      className="w-full px-2 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-900 bg-white"
                    >
                      {materials.map((mat) => (
                        <option key={mat.id} value={mat.name}>
                          {mat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Quantity */}
                  <div className="col-span-6 md:col-span-2">
                    <label className="block text-xs font-medium text-gray-500 md:hidden mb-1">Qty</label>
                    <input
                      type="number"
                      min="1"
                      value={item.qty}
                      onChange={(e) => handleItemChange(item.id, 'qty', e.target.value)}
                      className="w-full px-2 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-900 text-center"
                    />
                  </div>

                  {/* Price (PHP ₱) */}
                  <div className="col-span-10 md:col-span-1">
                    <label className="block text-xs font-medium text-gray-500 md:hidden mb-1">Price (₱)</label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="₱ Price"
                      value={item.price}
                      onChange={(e) => handleItemChange(item.id, 'price', e.target.value)}
                      className="w-full px-2 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-900 text-right"
                    />
                  </div>

                  {/* Delete Item Button */}
                  <div className="col-span-2 md:col-span-1 flex justify-center">
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(item.id)}
                      disabled={items.length === 1}
                      className="text-gray-400 hover:text-red-600 disabled:opacity-25 transition-colors p-1"
                      title="Remove Item"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 3: NOTES & TOTAL SUMMARY */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            <div className="md:col-span-2">
              <h2 className="text-md font-bold text-gray-800 mb-2">3. Notes</h2>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Infill %, layer height, post-processing notes, target delivery date, etc."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm text-gray-900 bg-white"
              />
            </div>

            <div className="bg-white p-4 rounded-md border border-gray-200 text-right space-y-1 shadow-sm">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">
                Total Order Cost
              </span>
              <div className="text-2xl font-bold text-blue-600">
                ₱{calculateTotal().toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>
          </div>

          {/* SUBMIT BUTTONS */}
          <div className="flex justify-end space-x-3 border-t border-gray-200 pt-4">
            <button
              type="button"
              onClick={() => router.push('/admin/orders/list')}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {isSubmitting ? 'Saving Order...' : 'Create Order'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}