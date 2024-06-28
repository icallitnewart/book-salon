import express from 'express';
import { authMiddleware, asyncMiddleware } from '../../middlewares';
import { userController } from './userController';

const router = express.Router();

/**
 * @swagger
 * /users:
 *   post:
 *     summary: 회원가입
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
 *                 result:
 *                   type: string
 *                   example: 'success'
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
router.post('/', asyncMiddleware(userController.registerUser));

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: 로그인
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   example: 'success'
 *                 user:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                       example: 'john@example.com'
 *                     nickname:
 *                       type: string
 *                       example: 'john_doe'
 *       401:
 *         description: Invalid email or password
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
 *                 summary: Invalid email or password
 *                 value:
 *                   result: 'error'
 *                   message: '이메일 혹은 비밀번호가 일치하지 않습니다.'
 */
router.post('/login', asyncMiddleware(userController.loginUser));

/**
 * @swagger
 * /users/logout:
 *   post:
 *     summary: 로그아웃
 *     tags: [Users]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Successful logout
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: '로그아웃되었습니다.'
 *       401:
 *         description: Unauthorized
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
 *               unauthorized:
 *                 summary: Unauthorized
 *                 value:
 *                   result: 'error'
 *                   message: '인증이 필요합니다.'
 */
router.post(
	'/logout',
	authMiddleware,
	asyncMiddleware(userController.logoutUser),
);

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: 회원정보 조회
 *     tags: [Users]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Authenticated user information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   example: success
 *                 user:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                       example: 'john@example.com'
 *                     nickname:
 *                       type: string
 *                       example: 'john_doe'
 *       401:
 *         description: Unauthorized
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
 *               unauthorized:
 *                 summary: Unauthorized
 *                 value:
 *                   result: 'error'
 *                   message: '인증이 필요합니다.'
 */
router.get(
	'/me',
	authMiddleware,
	asyncMiddleware(userController.getAuthenticatedUser),
);

/**
 * @swagger
 * /users:
 *   patch:
 *     summary: 회원정보 수정
 *     tags: [Users]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               nickname:
 *                 type: string
 *               currentPassword:
 *                 type: string
 *               password:
 *                 type: string
 *               passwordConfirm:
 *                 type: string
 *     responses:
 *       200:
 *         description: User information updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   example: success
 *                 user:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                       example: 'john@example.com'
 *                     nickname:
 *                       type: string
 *                       example: 'john'
 *       400:
 *         description: Bad request
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
 *               passwordMismatch:
 *                 summary: New password and password confirmation do not match
 *                 value:
 *                   result: 'error'
 *                   message: '새 비밀번호와 비밀번호 확인이 일치하지 않습니다.'
 *       401:
 *         description: Unauthorized
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
 *               unauthorized:
 *                 summary: Unauthorized
 *                 value:
 *                   result: 'error'
 *                   message: '로그인이 필요한 서비스입니다.'
 *               invalidCurrentPassword:
 *                 summary: Invalid current password
 *                 value:
 *                   result: 'error'
 *                   message: '현재 비밀번호가 올바르지 않습니다.'
 *       404:
 *         description: User not found
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
 *               userNotFound:
 *                 summary: User not found
 *                 value:
 *                   result: 'error'
 *                   message: '사용자를 찾을 수 없습니다.'
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
 *               duplicateEmail:
 *                 summary: Email already exists
 *                 value:
 *                   result: 'error'
 *                   message: '이미 존재하는 이메일입니다.'
 */
router.patch('/', authMiddleware, asyncMiddleware(userController.updateUser));

/**
 * @swagger
 * /users:
 *   delete:
 *     summary: 회원 탈퇴
 *     tags: [Users]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   example: success
 *       401:
 *         description: Unauthorized
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
 *               unauthorized:
 *                 summary: Unauthorized
 *                 value:
 *                   result: 'error'
 *                   message: '인증이 필요합니다.'
 *       404:
 *         description: User not found
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
 *               userNotFound:
 *                 summary: User not found
 *                 value:
 *                   result: 'error'
 *                   message: '사용자를 찾을 수 없습니다.'
 */
router.delete('/', authMiddleware, asyncMiddleware(userController.deleteUser));

export default router;
