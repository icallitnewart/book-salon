import express from 'express';
import { asyncMiddleware } from '../../middlewares';
import { UserController } from './userController';

const router = express.Router();

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: User registration
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 token:
 *                   type: string
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                 message:
 *                   type: string
 *             examples:
 *               requestError:
 *                 summary: Invalid request
 *                 value:
 *                   result: 'error'
 *                   message: '잘못된 요청입니다.'
 *       409:
 *         description: Conflict
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                 message:
 *                   type: string
 *             examples:
 *               conflictError:
 *                 summary: Email already exists
 *                 value:
 *                   result: 'error'
 *                   message: '이미 존재하는 이메일입니다.'
 */
router.post('/register', asyncMiddleware(UserController.registerUser));

export default router;
