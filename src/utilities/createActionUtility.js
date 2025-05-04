/**
 * Creates a standard action object.
 * @param {string} type - The action type.
 * @param {object} [payload={}] - The action payload.
 * @param {boolean} [error=false] - Whether the action represents an error.
 * @param {object|null} [meta=null] - Optional metadata for the action.
 * @returns {{type: string, payload: object, error: boolean, meta: object|null}} - The action object.
 */
export function createAction(type, payload = {}, error = false, meta = null) {
  return { type, payload, error, meta };
}