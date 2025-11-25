/**
 * @summary
 * User service type definitions.
 * Defines interfaces for user-related operations and data structures.
 *
 * @module services/user/userTypes
 */

/**
 * @interface User
 * @description Complete user entity stored in memory
 *
 * @property {number} id - Unique user identifier
 * @property {string} name - User's full name
 * @property {string} email - User's email address
 * @property {string} password - Hashed password
 * @property {Date} dateCreated - Account creation timestamp
 */
export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  dateCreated: Date;
}

/**
 * @interface UserRegisterRequest
 * @description User registration request parameters
 *
 * @property {string} name - User's full name (1-200 characters)
 * @property {string} email - User's email address (valid email format)
 * @property {string} password - User's password (minimum 8 characters)
 */
export interface UserRegisterRequest {
  name: string;
  email: string;
  password: string;
}

/**
 * @interface UserRegisterResponse
 * @description User registration response data
 *
 * @property {number} id - Created user identifier
 * @property {string} name - User's name
 * @property {string} email - User's email
 */
export interface UserRegisterResponse {
  id: number;
  name: string;
  email: string;
}
