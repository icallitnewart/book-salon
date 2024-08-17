import express from 'express';
import { asyncMiddleware, authMiddleware } from '../../middlewares';
import { likeController } from './likeController';

const router = express.Router();

/**
 * @swagger
 * /likes/book:
 *   post:
 *     summary: 도서에 좋아요 추가
 *     tags: [Likes]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               isbn:
 *                 type: string
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *               cover:
 *                 type: string
 *               publisher:
 *                 type: string
 *               pubDate:
 *                 type: string
 *           example:
 *             isbn: "9788934972464"
 *             title: "클린 코드"
 *             author: "로버트 C. 마틴"
 *             description: "애자일 소프트웨어 장인 정신"
 *             category: "컴퓨터 공학"
 *             cover: "https://example.com/cover.jpg"
 *             publisher: "인사이트"
 *             pubDate: "2013-12-24"
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
 *                   example: success
 *                 liked:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Bad Request
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
 *                   example: 유효하지 않은 도서 정보입니다.
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
 *                   example: userId가 존재하지 않습니다.
 *       409:
 *         description: Conflict
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
 *                   example: 이미 좋아요를 누른 책입니다.
 */
router.post(
	'/book',
	authMiddleware(),
	asyncMiddleware(likeController.addBookLike),
);

/**
 * @swagger
 * /likes/book/{isbn}:
 *   delete:
 *     summary: 도서 좋아요 삭제
 *     tags: [Likes]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: isbn
 *         required: true
 *         schema:
 *           type: string
 *         description: 도서의 ISBN
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
 *                 liked:
 *                   type: boolean
 *                   example: false
 *       400:
 *         description: Bad Request
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
 *                   example: 좋아요를 누르지 않은 책입니다.
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
 *                   example: userId가 존재하지 않습니다.
 *       500:
 *         description: Internal Server Error
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
 *                   example: 좋아요 삭제에 실패했습니다.
 */
router.delete(
	'/book/:isbn',
	authMiddleware(),
	asyncMiddleware(likeController.removeBookLike),
);

export default router;
