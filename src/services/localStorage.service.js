/**
 * @author Tahara Kazuki
 * @created 03/08/2024
 * @lastModified 04/11/2024
 * @description Types list in Config Store
 * @copyright SoTru
 */

/**
 * Persist a token to localStorage
 * @param {string} token - The token to persist
 */
export const persistToken = (token) => {
  localStorage.setItem('accessToken', token);
};

/**
 * Read a token from localStorage
 * @returns {string|null} - The token or null if not found
 */
export const readToken = () => {
  return localStorage.getItem('accessToken');
};

/**
 * Persist a user to localStorage
 * @param {{ username: string, email: string, permission: string }} user - The user object to persist
 */
export const persistUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

/**
 * Read a user from localStorage
 * @returns {{ username: string, email: string, permission: string }|null} - The user object or null if not found
 */
export const readUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

/**
 * Persist a permission to localStorage
 * @param {string} permission - The permission to persist
 */
export const persistPermission = (permission) => {
  localStorage.setItem('permission', permission);
};

/**
 * Read a permission from localStorage
 * @returns {string|null} - The permission or null if not found
 */
export const readPermission = () => {
  return localStorage.getItem('permission');
};

/**
 * Delete the token from localStorage
 */
export const deleteToken = () => localStorage.removeItem('accessToken');

/**
 * Delete the user from localStorage
 */
export const deleteUser = () => localStorage.removeItem('user');

/**
 * Delete the permission from localStorage
 */
export const deletePermission = () => localStorage.removeItem('permission');
