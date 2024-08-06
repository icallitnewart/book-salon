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
router.post(
	'/',
	authMiddleware(),
	asyncMiddleware(reviewController.createReview),
);

/**
 * @swagger
 * /reviews/list:
 *   get:
 *     summary: 도서 리뷰 리스트 조회
 *     tags: [Reviews]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: "페이지 번호 (기본값: 1)"
 *       - in: query
 *         name: perPage
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: "페이지당 리뷰 수 (기본값: 10)"
 *       - in: query
 *         name: pageGroupSize
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: "한 그룹의 페이지 수 (기본값: 10)"
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [mostViewed, latest]
 *         description: "정렬 방식 (기본값: latest)"
 *       - in: query
 *         name: isbn
 *         schema:
 *           type: string
 *         description: "도서의 ISBN (선택적)"
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
 *                 reviews:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Review'
 *                 pageInfo:
 *                   type: object
 *                   properties:
 *                     lastPage:
 *                       type: integer
 *                       example: 5
 *                     hasNextPage:
 *                       type: boolean
 *                       example: true
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
 *               Invalid Sort:
 *                 value:
 *                   result: error
 *                   message: 유효하지 않은 sort입니다.
 *               Invalid ISBN:
 *                 value:
 *                   result: error
 *                   message: 유효하지 않은 isbn입니다.
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
 *                   example: 서버 내부 오류가 발생했습니다.
 */
router.get('/list', asyncMiddleware(reviewController.getReviewList));

/**
 * @swagger
 * /reviews/{reviewId}/view-count:
 *   patch:
 *     summary: 도서 리뷰 조회수 증가
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: reviewId
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *         description: 조회수를 증가시킬 리뷰의 ID (24자리 16진수 MongoDB ObjectId)
 *     responses:
 *       200:
 *         description: 조회수 증가 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   example: success
 *                 viewCount:
 *                   type: number
 *                   example: 121
 *       400:
 *         description: 유효하지 않은 ReviewId
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
 *         description: 리뷰를 찾을 수 없음
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
 *                   example: 리뷰가 존재하지 않습니다.
 */
router.patch(
	'/:reviewId/view-count',
	asyncMiddleware(reviewController.increaseViewCount),
);

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
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "60a9a1c1f2d3b12f3c8d0f1e"
 *                     user:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: "60a9a1c1f2d3b12f3c8d0f1c"
 *                         nickname:
 *                           type: string
 *                           example: "책벌레123"
 *                     title:
 *                       type: string
 *                       example: "반전이 엄청난 추리소설 추천"
 *                     content:
 *                       type: string
 *                       example: "읽는 내내 몰입하게 만드는 소설이었습니다."
 *                     rating:
 *                       type: number
 *                       example: 5
 *                     tags:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["스릴러", "추리소설"]
 *                     viewCount:
 *                       type: number
 *                       example: 120
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-05-20T15:30:00Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-05-20T15:30:00Z"
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

/**
 * @swagger
 * /reviews/{reviewId}:
 *   patch:
 *     summary: 도서 리뷰 수정
 *     tags: [Reviews]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: reviewId
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *         description: 수정할 리뷰의 ID (24자리 16진수 MongoDB ObjectId)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReviewUpdateInput'
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
 *               Invalid Review Id:
 *                 value:
 *                   result: error
 *                   message: 유효하지 않은 reviewId입니다.
 *               Invalid Review Data:
 *                 value:
 *                   result: error
 *                   message: 유효하지 않은 리뷰 데이터입니다.
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
 *       403:
 *         description: Forbidden
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
 *                   example: 이 리뷰에 대한 권한이 없습니다.
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
 *       500:
 *         description: Internal Server Error
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
 *                   example: 리뷰 업데이트에 실패하였습니다.
 * components:
 *   schemas:
 *     ReviewUpdateInput:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: 수정할 리뷰 제목
 *         content:
 *           type: string
 *           description: 수정할 리뷰 내용
 *         rating:
 *           type: number
 *           minimum: 1
 *           maximum: 5
 *           description: 수정할 평점 (1-5)
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           description: 수정할 태그 목록
 */
router.patch(
	'/:reviewId',
	authMiddleware(),
	asyncMiddleware(reviewController.updateReview),
);

/**
 * @swagger
 * /reviews/{reviewId}:
 *   delete:
 *     summary: 도서 리뷰 삭제
 *     tags: [Reviews]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: reviewId
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *         description: 삭제할 리뷰의 ID (24자리 16진수 MongoDB ObjectId)
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
 *                   example: 유효하지 않은 reviewId입니다.
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
 *       403:
 *         description: Forbidden
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
 *                   example: 이 리뷰에 대한 권한이 없습니다.
 *       404:
 *         description: Not Found
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
 *                   example: 리뷰를 찾을 수 없습니다.
 */
router.delete(
	'/:reviewId',
	authMiddleware(),
	asyncMiddleware(reviewController.deleteReview),
);

export default router;
