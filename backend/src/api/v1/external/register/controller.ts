/**
 * @summary
 * User registration controller handling new user account creation.
 * Validates input data, checks for existing users, and stores credentials securely.
 *
 * @api {post} /api/v1/external/register Register User
 * @apiName RegisterUser
 * @apiGroup Authentication
 * @apiVersion 1.0.0
 *
 * @apiDescription Creates a new user account with name, email, and password
 *
 * @apiParam {String} name User's full name (1-200 characters)
 * @apiParam {String} email User's email address (valid email format)
 * @apiParam {String} password User's password (minimum 8 characters)
 *
 * @apiSuccess {Number} id User identifier
 * @apiSuccess {String} name User's name
 * @apiSuccess {String} email User's email
 * @apiSuccess {String} message Success message
 *
 * @apiError {String} ValidationError Invalid parameters provided
 * @apiError {String} DuplicateEmailError Email already registered
 * @apiError {String} ServerError Internal server error
 */

import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { successResponse, errorResponse } from '@/utils/response';
import { userRegister } from '@/services/user';
import { zName, zEmail } from '@/utils/validation';

const bodySchema = z.object({
  name: zName,
  email: zEmail,
  password: z.string().min(8).max(100),
});

/**
 * @summary
 * Handles user registration POST request
 *
 * @function postHandler
 * @module api/v1/external/register
 *
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 *
 * @returns {Promise<void>}
 */
export async function postHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    /**
     * @validation Validate request body against schema
     * @throw {ValidationError}
     */
    const validatedData = bodySchema.parse(req.body);

    /**
     * @rule {fn-user-registration} Register new user with validated data
     */
    const result = await userRegister({
      name: validatedData.name,
      email: validatedData.email,
      password: validatedData.password,
    });

    res.status(201).json(
      successResponse(result, {
        message: 'User registered successfully',
      })
    );
  } catch (error: any) {
    /**
     * @rule {be-error-handling} Handle validation and business logic errors
     */
    if (error.name === 'ZodError') {
      res.status(400).json(errorResponse('Invalid input data', 'VALIDATION_ERROR', error.errors));
    } else if (error.message === 'emailAlreadyExists') {
      res.status(409).json(errorResponse('Email already registered', 'DUPLICATE_EMAIL'));
    } else {
      next(error);
    }
  }
}
