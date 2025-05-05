import { denormalize, normalize } from "normalizr";

export const normalizeSchema = (data, schema) => normalize(data, schema);
export const denormalizeSchema = (data, schema) => {
  if (!data) return null;

  const { result, entities } = data;
  if (result && entities) return denormalize(result, schema, entities);
  return [];
};

export const addNormalizeSchema = (list, item, key) => {
  const { result, entities } = list;

  if (result && entities) {
    const resultArray = Array.isArray(result) ? result : [result];
    return {
      result: [item._id, ...resultArray],
      entities: {
        ...entities,
        [key]: {
          ...entities[key],
          [item._id]: item,
        },
      },
    };
  }

  return list;
};
