'use client';

import { 
  PlusIcon, 
  TrashIcon, 
  XMarkIcon, 
  DocumentDuplicateIcon 
} from '@heroicons/react/24/outline';
import SubPanel from '@/components/ui/panels/SubPanel';
import { cn } from '@/utils/clsx';
import { 
  getModelsForFamily, 
  getColorsForModel 
} from '@/utils/material-list-helpers';

export default function OrderDetailsSection({
  items,
  materials,
  availableFamilies,
  handlers,
}) {
  const {
    handleAddItem,
    handleRemoveItem,
    handleItemChange,
    handleAddMaterialToItem,
    handleDuplicateMaterial,
    handleRemoveMaterialFromItem,
    handleMaterialFieldChange,
  } = handlers;

  return (
    <SubPanel
      title={
        <div className={cn(
          "flex justify-between items-center",
          "border-b border-lines-secondary pb-2",
          "w-full"
        )}>
          <h2 className="text-2xl font-bold text-gray-800">
            2. Order Details
          </h2>
          <button
            type="button"
            onClick={handleAddItem}
            className="flex items-center text-xs font-semibold text-on-brand-secondary bg-brand-secondary hover:bg-brand-secondary-hover px-3 py-1.5 rounded-md transition-colors"
          >
            <PlusIcon className="w-4 h-4 mr-1" />
            Add Item
          </button>
        </div>
      }
    >
      <div className="space-y-4">
        {items.map((item, index) => (
          <div
            key={item.id}
            className="p-4 bg-white border border-gray-200 rounded-md shadow-sm space-y-3"
          >
            {/* Top Line Item Inputs */}
            <div className="grid grid-cols-12 gap-3 items-center">
              {/* Item Name */}
              <div className="col-span-12 md:col-span-6">
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Item #{index + 1} Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Multi-part Helmet"
                  value={item.itemName}
                  onChange={(e) => handleItemChange(item.id, 'itemName', e.target.value)}
                  className="w-full px-3 py-1.5 border border-lines-secondary rounded-md text-sm focus:ring-2 focus:ring-terracotta-border focus:outline-none text-gray-900"
                />
              </div>

              {/* Quantity */}
              <div className="col-span-5 md:col-span-2">
                <label className="block text-xs font-medium text-gray-600 mb-1">Qty</label>
                <input
                  type="number"
                  min="1"
                  value={item.qty}
                  onChange={(e) => handleItemChange(item.id, 'qty', e.target.value)}
                  className="w-full px-2 py-1.5 border border-lines-secondary rounded-md text-sm focus:ring-2 focus:ring-terracotta-border focus:outline-none text-gray-900 text-center"
                />
              </div>

              {/* Price (PHP ₱) */}
              <div className="col-span-5 md:col-span-3">
                <label className="block text-xs font-medium text-gray-600 mb-1">Price (₱)</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="₱ Price"
                  value={item.price}
                  onChange={(e) => handleItemChange(item.id, 'price', e.target.value)}
                  className="w-full px-2 py-1.5 border border-lines-secondary rounded-md text-sm focus:ring-2 focus:ring-terracotta-border focus:outline-none text-gray-900 text-right"
                />
              </div>

              {/* Delete Item Button */}
              <div className="col-span-2 md:col-span-1 flex justify-center pt-5 md:pt-0">
                <button
                  type="button"
                  onClick={() => handleRemoveItem(item.id)}
                  disabled={items.length === 1}
                  className="text-gray-400 hover:text-red-600 disabled:opacity-25 transition-colors p-1"
                  title="Remove Entire Item"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Compact Material Table */}
            <div className="border-t border-gray-100 pt-4">
              <label className="block text-xs font-semibold text-gray-700 mb-2">
                Materials Used
              </label>
              <div className="overflow-x-auto border border-gray-200 rounded-md">
                <table className="min-w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-gray-500 uppercase tracking-wider font-semibold border-b border-gray-200">
                      <th className="px-3 py-2 w-1/4 font-medium">Family</th>
                      <th className="px-3 py-2 w-2/5 font-medium">Brand / Model</th>
                      <th className="px-3 py-2 w-1/4 font-medium">Color</th>
                      <th className="px-2 py-2 text-right font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 bg-white">
                    {item.materials.map((mat, matIdx) => {
                      const rowModels = getModelsForFamily(materials, mat.family);
                      const rowColors = getColorsForModel(materials, mat.family, mat.model);

                      return (
                        <tr key={matIdx} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-3 py-1.5 align-middle">
                            <select
                              value={mat.family}
                              onChange={(e) => handleMaterialFieldChange(item.id, matIdx, 'family', e.target.value)}
                              className="w-full px-2 py-1 border-transparent hover:border-lines-secondary rounded text-xs text-gray-900 bg-transparent hover:bg-white focus:bg-white focus:border-terracotta-border focus:ring-1 focus:ring-terracotta-border focus:outline-none transition-all cursor-pointer"
                            >
                              {availableFamilies.map((fam) => (
                                <option key={fam} value={fam}>{fam}</option>
                              ))}
                            </select>
                          </td>

                          <td className="px-3 py-1.5 align-middle">
                            <select
                              value={mat.model}
                              onChange={(e) => handleMaterialFieldChange(item.id, matIdx, 'model', e.target.value)}
                              disabled={rowModels.length === 0}
                              className="w-full px-2 py-1 border-transparent hover:border-lines-secondary rounded text-xs text-gray-900 bg-transparent hover:bg-white focus:bg-white focus:border-terracotta-border focus:ring-1 focus:ring-terracotta-border focus:outline-none disabled:bg-transparent disabled:text-gray-400 transition-all cursor-pointer"
                            >
                              {rowModels.map((m) => (
                                <option key={m} value={m}>{m}</option>
                              ))}
                            </select>
                          </td>

                          <td className="px-3 py-1.5 align-middle">
                            <select
                              value={mat.color}
                              onChange={(e) => handleMaterialFieldChange(item.id, matIdx, 'color', e.target.value)}
                              disabled={rowColors.length === 0}
                              className="w-full px-2 py-1 border-transparent hover:border-lines-secondary rounded text-xs text-gray-900 bg-transparent hover:bg-white focus:bg-white focus:border-terracotta-border focus:ring-1 focus:ring-terracotta-border focus:outline-none disabled:bg-transparent disabled:text-gray-400 transition-all cursor-pointer"
                            >
                              {rowColors.map((c) => (
                                <option key={c} value={c}>{c}</option>
                              ))}
                            </select>
                          </td>

                          <td className="px-2 py-1.5 align-middle text-right whitespace-nowrap min-w-[70px]">
                            <div className="flex items-center justify-end space-x-1 w-full">
                              <button
                                type="button"
                                onClick={() => handleDuplicateMaterial(item.id, matIdx)}
                                className="inline-flex p-1.5 text-gray-400 hover:text-brand-primary hover:bg-brand-primary/10 rounded transition-colors"
                                title="Duplicate this material"
                              >
                                <DocumentDuplicateIcon className="w-4 h-4" />
                              </button>

                              {item.materials.length > 1 ? (
                                <button
                                  type="button"
                                  onClick={() => handleRemoveMaterialFromItem(item.id, matIdx)}
                                  className="inline-flex p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                                  title="Remove Material"
                                >
                                  <XMarkIcon className="w-4 h-4" />
                                </button>
                              ) : (
                                <div className="w-7 h-7" aria-hidden="true" />
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <button
                type="button"
                onClick={() => handleAddMaterialToItem(item.id)}
                className="inline-flex items-center text-xs font-semibold text-brand-primary hover:underline mt-2 ml-1"
              >
                <PlusIcon className="w-3.5 h-3.5 mr-1" />
                Add Material Line
              </button>
            </div>
          </div>
        ))}
      </div>
    </SubPanel>
  );
}