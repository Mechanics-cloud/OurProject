/**
 * Converts an object of parameters into a query string.
 *
 * @param {Record<string, string | number | null | undefined>} params - An object containing parameters
 * where the keys are strings, and the values can be strings, numbers, null, or undefined.
 * @returns {string} A query string representing the parameters in the format
 * "key1=value1&key2=value2".
 *
 * Values that are undefined or null will be excluded from the final string.
 *
 * @example
 * const params = {
 *   param1: 'value1',
 *   param2: 42,
 *   param3: null, // Will be excluded
 *   param4: undefined, // Will be excluded
 *   param5: 'value5',
 * };
 *
 * const queryString = getQueryParams(params);
 * console.log(queryString); // Output: "param1=value1&param2=42&param5=value5"
 */

export const getQueryParams = (
  params: Record<string, null | number | string | undefined>
): string => {
  return Object.entries(params)
    .flatMap(([key, value]) => {
      if (value === undefined || value === null) {
        return []
      }

      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    })
    .join('&')
}
