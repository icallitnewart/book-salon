import express from 'express';
import { asyncMiddleware, authMiddleware } from '../../middlewares';
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

/**
 * @swagger
 * /reviews/{reviewId}:
 *   get:
 *     summary: 도서 리뷰 상세 조회
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: reviewId
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *         description: 조회할 리뷰의 ID (24자리 16진수 MongoDB ObjectId)
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   example: success
 *                 review:
 *                   $ref: '#/components/schemas/Review'
 *       400:
 *         description: Invalid ReviewId
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   example: 'error'
 *                 message:
 *                   type: string
 *                   example: 유효하지 않은 reviewId입니다.
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   example: 'error'
 *                 message:
 *                   type: string
 *                   example: 리뷰를 찾을 수 없습니다.
 */
router.get('/:reviewId', asyncMiddleware(reviewController.getReview));

export default router;
