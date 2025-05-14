import { denormalize, normalize } from "normalizr";

export const normalizeSchema = (data, schema) => normalize(data, schema);
export const denormalizeSchema = (data, schema) => {
  if (!data) return null;

  const { result, entities } = data;
  if (result && entities) return denormalize(result, schema, entities);
  return [];
};

export const addNormalizeSchema = (list, item, key) => {
  // Basic validation for item and key
  if (!item || typeof item._id === "undefined" || !key) {
    // If item, item._id, or key is invalid, return the original list.
    // This matches the original behavior for some invalid list inputs.
    return list;
  }

  // If list is null or undefined, initialize it as a new normalized structure
  if (list === null || typeof list === "undefined") {
    return {
      result: [item._id],
      entities: {
        [key]: {
          [item._id]: item,
        },
      },
    };
  }

  // At this point, list is an object (could be empty {} or a populated normalized structure).
  // Use defaults in destructuring to handle cases like list being {} or missing properties.
  const {
    result: existingResultInput = [],
    entities: existingEntitiesInput = {},
  } = list;

  // Ensure existingResultInput is treated as an array.
  // If it was a single ID, it becomes [ID]. If it was an array, it stays.
  // If it was undefined/null (after default destructuring, this means it was initially undefined/null or not present), it becomes [].
  const existingResultArray = Array.isArray(existingResultInput)
    ? existingResultInput
    : existingResultInput !== null && typeof existingResultInput !== "undefined"
    ? [existingResultInput]
    : [];

  const currentKeyEntities = existingEntitiesInput[key] || {};

  return {
    result: [item._id, ...existingResultArray], // Prepend new item's ID
    entities: {
      ...existingEntitiesInput,
      [key]: {
        ...currentKeyEntities,
        [item._id]: item,
      },
    },
  };
};
