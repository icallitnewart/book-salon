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

// TODO: 제거 예정 (테스트용)
router.get('/test/detail', async (req, res) => {
	const TTBKey = process.env.TTB_KEY;
	const response = await axios.get(
		`http://www.aladin.co.kr/ttb/api/ItemLookUp.aspx?ttbkey=${TTBKey}&itemIdType=ISBN&ItemId=9791189327156&output=js&Version=20131101&OptResult=ebookList,usedList,reviewList&Cover=Big`,
	);
	res.json({ data: response.data });
});

export default router;
