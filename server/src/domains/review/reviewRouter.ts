import express from 'express';
import { authMiddleware } from '../../middlewares';
import { reviewController } from './reviewController';

const router = express.Router();

/**
 * @swagger
 * /reviews:
 *   post:
 *     summary: 도서 리뷰 작성
 *     tags: [Reviews]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReviewInput'
 *     responses:
 *       201:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   example: success
 *                 reviewId:
 *                   type: string
 *                   example: 60a9a1c1f2d3b12f3c8d0f1e
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: 로그인이 필요한 서비스입니다.
 * */
router.post('/', authMiddleware(), reviewController.createReview);

export default router;
