'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  getModelsForFamily, 
  getColorsForModel, 
  createDefaultMaterial 
} from '@/utils/material-list-helpers';

export function useOrderForm(materials = []) {
  const router = useRouter();

  // 1. Customer Information State
  const [customerFirstName, setCustomerFirstName] = useState('');
  const [customerLastName, setCustomerLastName] = useState('');
  const [customerContactPrimary, setCustomerContactPrimary] = useState('');
  const [customerContactSecondary, setCustomerContactSecondary] = useState('');
  const [customerSocials, setCustomerSocials] = useState('');

  // 2. Order Details (Item Array State)
  const [items, setItems] = useState([
    { id: 1, itemName: '', materials: [createDefaultMaterial(materials)], qty: 1, price: 0 }
  ]);

  // 3. Notes & Form Control State
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ----------------------------------------------------------------------
  // LINE ITEM HANDLERS
  // ----------------------------------------------------------------------
  const handleAddItem = () => {
    setItems((prev) => [
      ...prev,
      { 
        id: Date.now(), 
        itemName: '', 
        materials: [createDefaultMaterial(materials)], 
        qty: 1, 
        price: 0 
      }
    ]);
  };

  const handleRemoveItem = (id) => {
    if (items.length === 1) return;
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleItemChange = (id, field, value) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
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

  // ----------------------------------------------------------------------
  // MATERIAL LINE HANDLERS
  // ----------------------------------------------------------------------
  const handleAddMaterialToItem = (itemId) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          return { ...item, materials: [...item.materials, createDefaultMaterial(materials)] };
        }
        return item;
      })
    );
  };

  const handleDuplicateMaterial = (itemId, matIndex) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          const clonedMaterial = { ...item.materials[matIndex] };
          const updatedMaterials = [...item.materials];
          updatedMaterials.splice(matIndex + 1, 0, clonedMaterial);
          return { ...item, materials: updatedMaterials };
        }
        return item;
      })
    );
  };

  const handleRemoveMaterialFromItem = (itemId, matIndex) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          if (item.materials.length === 1) return item;
          const updatedMaterials = item.materials.filter((_, idx) => idx !== matIndex);
          return { ...item, materials: updatedMaterials };
        }
        return item;
      })
    );
  };

  const handleMaterialFieldChange = (itemId, matIndex, subField, value) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          const updatedMaterials = [...item.materials];
          const currentMat = { ...updatedMaterials[matIndex] };

          if (subField === 'family') {
            currentMat.family = value;
            const availableModels = getModelsForFamily(materials, value);
            currentMat.model = availableModels[0] || '';
            const availableColors = getColorsForModel(materials, value, currentMat.model);
            currentMat.color = availableColors[0] || '';
          } 
          else if (subField === 'model') {
            currentMat.model = value;
            const availableColors = getColorsForModel(materials, currentMat.family, value);
            currentMat.color = availableColors[0] || '';
          } 
          else {
            currentMat.color = value;
          }

          updatedMaterials[matIndex] = currentMat;
          return { ...item, materials: updatedMaterials };
        }
        return item;
      })
    );
  };

  // ----------------------------------------------------------------------
  // SUBMISSION & CALCULATIONS
  // ----------------------------------------------------------------------
  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + (item.qty * item.price), 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formattedItems = items.map(({ itemName, materials, qty, price }) => ({
      itemName: itemName.trim(),
      materials, 
      qty: Number(qty) || 1,
      price: Number(price) || 0,
    }));

    // AMENDED: Fixed ReferenceErrors for customer fields
    const orderPayload = {
      customer: {
        firstName: customerFirstName.trim(),
        lastName: customerLastName.trim(),
        primaryContact: customerContactPrimary.trim(),
        secondaryContact: customerContactSecondary.trim(),
        socials: customerSocials.trim(),
      },
      items: formattedItems,
      notes: notes.trim(),
      totalCost: calculateTotal(),
      createdAt: new Date().toISOString(),
    };

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

  return {
    customerState: {
      customerFirstName, setCustomerFirstName,
      customerLastName, setCustomerLastName,
      customerContactPrimary, setCustomerContactPrimary,
      customerContactSecondary, setCustomerContactSecondary,
      customerSocials, setCustomerSocials,
    },
    items,
    notes,
    setNotes,
    isSubmitting,
    calculateTotal,
    handleSubmit,
    handlers: {
      handleAddItem,
      handleRemoveItem,
      handleItemChange,
      handleAddMaterialToItem,
      handleDuplicateMaterial,
      handleRemoveMaterialFromItem,
      handleMaterialFieldChange,
    },
  };
}