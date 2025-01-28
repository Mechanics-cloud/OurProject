import { Nullable } from '@/common'

/**
 * Generates a URL path by replacing parameters in a URL string with values from an object.
 *
 * @param url - A URL string containing parameters in the format `:key`.
 * @param entries - An optional object containing key-value pairs for replacing the parameters.
 *                  Keys should match the parameters in the URL, and values can be
 *                  numbers, strings, or `null`/`undefined` (in which case, the parameter will be replaced with an empty string).
 *
 * @returns A string URL with the parameter values replaced. If `entries` is not provided,
 *          the original URL is returned.
 *
 * @example
 * // Example 1: Replacing parameters in a URL
 * const url = "/users/:userId/posts/:postId";
 * const entries = { userId: 123, postId: 456 };
 * const result = generatePath(url, entries);
 * console.log(result); // "/users/123/posts/456"
 *
 * @example
 * // Example 2: Parameter not provided
 * const url2 = "/products/:productId";
 * const entries2 = { productId: undefined };
 * const result2 = generatePath(url2, entries2);
 * console.log(result2); // "/products/:productId" (parameter replaced with empty string)
 *
 * @example
 * // Example 3: Parameters with null value
 * const url3 = "/posts/:postId/comments/:commentId";
 * const entries3 = { postId: 789, commentId: null };
 * const result3 = generatePath(url3, entries3);
 * console.log(result3); // "/posts/789/comments/" (commentId replaced with empty string)
 *
 * @example
 * // Example 4: No parameters provided
 * const url4 = "/home";
 * const result4 = generatePath(url4);
 * console.log(result4); // "/home" (original URL)
 */

export const generatePath = (
  url: string,
  entries?: Record<string, Nullable<number | string | undefined>>
): string => {
  if (!entries) {
    return url
  }

  return Object.entries(entries).reduce((acc, arg) => {
    const [key, value] = arg

    return acc.replace(`/:${key}`, value ? `/${String(value)}` : '')
  }, url)
}
