import axios from 'axios';
import express from 'express';

import { asyncMiddleware } from '../../middlewares';
import { bookController } from './bookController';

const router = express.Router();

/**
 * @swagger
 * /books/bestseller:
 *   get:
 *     summary: 주간 베스트셀러 목록 조회
 *     description: 원하는 주간의 베스트셀러 목록을 조회하려면 year, month, week가 모두 필요합니다. 혹은 모두 제공하지 않으면 최신 주간 베스트셀러 목록을 조회합니다. (도서 DB 출처 - 알라딘)
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: year
 *         schema:
 *           type: string
 *         description: 조회할 연도 (2000-2100)
 *       - in: query
 *         name: month
 *         schema:
 *           type: string
 *         description: 조회할 월 (1-12)
 *       - in: query
 *         name: week
 *         schema:
 *           type: string
 *         description: 조회할 주 (1-5)
 *     responses:
 *       200:
 *         description: Bestseller list retrieved successfully
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
 *                   description: 알라딘 API로부터 받은 베스트셀러 데이터
 *                   example: []
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
 *                   example: 잘못된 쿼리 형식입니다.
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
 *                   example: 데이터를 찾을 수 없습니다.
 */
router.get('/bestseller', asyncMiddleware(bookController.getBestsellerList));

/**
 * @swagger
 * /books/detail/{isbn}:
 *   get:
 *     summary: 도서 상세 정보 조회 (ISBN)
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: isbn
 *         required: true
 *         schema:
 *           type: string
 *         description: 조회할 도서의 ISBN
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
 *                 book:
 *                   type: object
 *       400:
 *         description: Bad Request
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
 *                   example: 잘못된 ISBN 형식입니다.
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
 *                   example: 데이터를 찾을 수 없습니다.
 */
router.get('/detail/:isbn', asyncMiddleware(bookController.getBookDetail));

/**
 * @swagger
 * /books/search/{searchTerm}:
 *   get:
 *     summary: 제목 및 저자로 도서 검색
 *     description: 제목 및 저자로 도서를 검색합니다. 검색 결과의 수와 시작 페이지를 지정할 수 있습니다. (도서 DB 출처 - 알라딘)
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: searchTerm
 *         required: true
 *         schema:
 *           type: string
 *         description: 검색할 도서의 키워드 (제목 및 저자)
 *       - in: query
 *         name: maxResults
 *         schema:
 *           type: string
 *           default: 10
 *         description: "반환할 최대 검색 결과 수 (기본값: 10)"
 *       - in: query
 *         name: startPage
 *         schema:
 *           type: integer
 *           default: 1
 *         description: "검색 결과의 시작 위치 (기본값: 1)"
 *     responses:
 *       200:
 *         description: 도서 검색 성공
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
 *                   description: 알라딘 API로부터 받은 도서 검색 결과 데이터
 *                   example: []
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
 *               검색어 미제공:
 *                 value:
 *                   result: error
 *                   message: "검색어가 제공되지 않았습니다."
 *               잘못된 쿼리 형식:
 *                 value:
 *                   result: error
 *                   message: "잘못된 쿼리 형식입니다."
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
 *                   example: 데이터를 찾을 수 없습니다.
 */
router.get('/search/:searchTerm', asyncMiddleware(bookController.searchBooks));

export default router;
