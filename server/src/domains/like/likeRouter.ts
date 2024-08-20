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

/**
 * @swagger
 * /likes/book/me:
 *   get:
 *     summary: 사용자가 좋아요한 도서 목록 조회
 *     tags: [Likes]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 1
 *         description: 페이지 번호
 *       - in: query
 *         name: perPage
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: 페이지 당 항목 수
 *       - in: query
 *         name: pageGroupSize
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: 페이지 그룹 크기
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
 *                 books:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       isbn:
 *                         type: string
 *                       title:
 *                         type: string
 *                       author:
 *                         type: string
 *                       description:
 *                         type: string
 *                       category:
 *                         type: string
 *                       cover:
 *                         type: string
 *                       publisher:
 *                         type: string
 *                       pubDate:
 *                         type: string
 *                 pageInfo:
 *                   type: object
 *                   properties:
 *                     lastPage:
 *                       type: integer
 *                       description: 마지막 페이지 번호
 *                     hasNextPage:
 *                       type: boolean
 *                       description: 다음 페이지 존재 여부
 *             example:
 *               result: success
 *               books:
 *                 - isbn: "9788934972464"
 *                   title: "클린 코드"
 *                   author: "로버트 C. 마틴"
 *                   description: "애자일 소프트웨어 장인 정신"
 *                   category: "컴퓨터 공학"
 *                   cover: "https://example.com/cover.jpg"
 *                   publisher: "인사이트"
 *                   pubDate: "2013-12-24"
 *               pageInfo:
 *                 lastPage: 1
 *                 hasNextPage: false
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
 *             examples:
 *               Invalid Page:
 *                 value:
 *                   result: error
 *                   message: page 쿼리는 숫자여야 합니다.
 *               Invalid PerPage:
 *                 value:
 *                   result: error
 *                   message: perPage 쿼리는 숫자여야 합니다.
 *               Invalid PageGroupSize:
 *                 value:
 *                   result: error
 *                   message: pageGroupSize 쿼리는 숫자여야 합니다.
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
 */
router.get(
	'/book/me',
	authMiddleware(),
	asyncMiddleware(likeController.getLikedBooks),
);

/**
 * @swagger
 * /likes/book/{isbn}:
 *   get:
 *     summary: 특정 도서에 대한 사용자의 좋아요 상태 확인
 *     tags: [Likes]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: isbn
 *         required: true
 *         schema:
 *           type: string
 *         description: 확인할 도서의 ISBN
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
 *                   description: 사용자가 해당 도서를 좋아요 했는지 여부
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
 *                   example: 유효하지 않은 ISBN입니다.
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
 *                   example: 인증되지 않은 사용자입니다.
 */
router.get(
	'/book/:isbn',
	authMiddleware(),
	asyncMiddleware(likeController.checkBookLike),
);

export default router;
