/**
 * @summary
 * External API routes configuration for public endpoints.
 * Handles public access routes without authentication requirements.
 *
 * @module routes/v1/externalRoutes
 */

import { Router } from 'express';
import * as registerController from '@/api/v1/external/register/controller';

const router = Router();

/**
 * @rule {be-route-configuration}
 * User registration route - public access
 */
router.post('/register', registerController.postHandler);

export default router;
