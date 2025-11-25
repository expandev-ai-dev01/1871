/**
 * @summary
 * User registration business logic.
 * Handles user creation with email uniqueness validation and password hashing.
 *
 * @module services/user/userLogic
 */

import { UserRegisterRequest, UserRegisterResponse, User } from './userTypes';
import { config } from '@/config';

/**
 * @remarks
 * In-memory user storage (no database persistence)
 */
const users: User[] = [];
let nextId = 1;

/**
 * @summary
 * Registers a new user in the system
 *
 * @function userRegister
 * @module services/user/userLogic
 *
 * @param {UserRegisterRequest} params - User registration parameters
 * @param {string} params.name - User's full name
 * @param {string} params.email - User's email address
 * @param {string} params.password - User's password (plain text)
 *
 * @returns {Promise<UserRegisterResponse>} Created user information
 *
 * @throws {Error} When email already exists
 */
export async function userRegister(params: UserRegisterRequest): Promise<UserRegisterResponse> {
  /**
   * @validation Check if email already exists
   * @throw {emailAlreadyExists}
   */
  const existingUser = users.find(
    (user) => user.email.toLowerCase() === params.email.toLowerCase()
  );

  if (existingUser) {
    throw new Error('emailAlreadyExists');
  }

  /**
   * @rule {fn-password-hashing} Hash password before storage
   */
  const hashedPassword = await hashPassword(params.password);

  /**
   * @rule {fn-user-creation} Create new user record
   */
  const newUser: User = {
    id: nextId++,
    name: params.name,
    email: params.email,
    password: hashedPassword,
    dateCreated: new Date(),
  };

  users.push(newUser);

  /**
   * @output {UserRegisterResponse, 1, 1}
   * @column {number} id - User identifier
   * @column {string} name - User's name
   * @column {string} email - User's email
   */
  return {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
  };
}

/**
 * @summary
 * Hashes password using bcrypt-like simulation
 *
 * @function hashPassword
 * @module services/user/userLogic
 *
 * @param {string} password - Plain text password
 *
 * @returns {Promise<string>} Hashed password
 */
async function hashPassword(password: string): Promise<string> {
  /**
   * @rule {fn-password-security} Simulate bcrypt hashing
   * In production, use actual bcrypt library
   */
  const rounds = config.security.bcryptRounds;
  return `$2b$${rounds}$${Buffer.from(password).toString('base64')}`;
}

/**
 * @summary
 * Retrieves user by email (internal use)
 *
 * @function getUserByEmail
 * @module services/user/userLogic
 *
 * @param {string} email - User's email address
 *
 * @returns {User | undefined} User object or undefined
 */
export function getUserByEmail(email: string): User | undefined {
  return users.find((user) => user.email.toLowerCase() === email.toLowerCase());
}
