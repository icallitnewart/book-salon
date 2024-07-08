import axios from 'axios';
import express from 'express';

const router = express.Router();

// TODO: 제거 예정 (테스트용)
router.get('/test/bestseller', async (req, res) => {
	const TTBKey = process.env.TTB_KEY;
	const response = await axios.get(
		`http://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=${TTBKey}&QueryType=Bestseller&MaxResults=10&Cover=Big&start=1&SearchTarget=Book&output=js&Version=20131101`,
	);
	res.json({ data: response.data });
});

// TODO: 제거 예정 (테스트용)
router.get('/test/detail', async (req, res) => {
	const TTBKey = process.env.TTB_KEY;
	const response = await axios.get(
		`http://www.aladin.co.kr/ttb/api/ItemLookUp.aspx?ttbkey=${TTBKey}&itemIdType=ISBN&ItemId=9791189327156&output=js&Version=20131101&OptResult=ebookList,usedList,reviewList&Cover=Big`,
	);
	res.json({ data: response.data });
});

export default router;
