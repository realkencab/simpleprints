// STRICT ORDER FOR FAMILIES: Edit this array to change how Families sort
export const FAMILY_SORT_ORDER = ['PLA', 'PETG', 'ABS', 'ASA', 'TPU', 'PC', 'PCCF', 'RESIN'];

// Extracts unique families, sorted by the strict order above
export const getAvailableFamilies = (mats) => {
  if (!mats || mats.length === 0) return [];
  const uniqueFamilies = [...new Set(mats.map(m => m.family.toUpperCase()))];
  
  return uniqueFamilies.sort((a, b) => {
    const indexA = FAMILY_SORT_ORDER.indexOf(a);
    const indexB = FAMILY_SORT_ORDER.indexOf(b);
    const weightA = indexA === -1 ? 999 : indexA;
    const weightB = indexB === -1 ? 999 : indexB;
    return weightA - weightB;
  });
};

// Extracts unique models for a specific family, sorted alphabetically
export const getModelsForFamily = (mats, familyName) => {
  if (!familyName || !mats) return [];
  const models = mats
    .filter(m => m.family.toUpperCase() === familyName.toUpperCase())
    .map(m => m.model);
  return [...new Set(models)].sort();
};

// Extracts unique colors for a specific family + model combination, sorted alphabetically
export const getColorsForModel = (mats, familyName, modelName) => {
  if (!familyName || !modelName || !mats) return [];
  const colors = mats
    .filter(m => m.family.toUpperCase() === familyName.toUpperCase() && m.model === modelName)
    .map(m => m.color);
  return [...new Set(colors)].sort();
};

// Builds the default starting material based on your JSON data
export const createDefaultMaterial = (mats) => {
  const families = getAvailableFamilies(mats);
  const firstFam = families[0] || '';
  
  const models = getModelsForFamily(mats, firstFam);
  const firstModel = models[0] || '';
  
  const colors = getColorsForModel(mats, firstFam, firstModel);
  const firstColor = colors[0] || '';
  
  return { family: firstFam, model: firstModel, color: firstColor };
};
