const ALADIN_LIST_BASE_URL = process.env.ALADIN_LIST_API_URL;
const ALADIN_ITEM_BASE_URL = process.env.ALADIN_ITEM_API_URL;

const API_URL = {
	ALADIN_BESTSELLER_LIST: `${ALADIN_LIST_BASE_URL}&QueryType=Bestseller&Cover=Big&start=1&SearchTarget=Book&output=js&Version=20131101`,
	ALADIN_BOOK_DETAIL: `${ALADIN_ITEM_BASE_URL}&itemIdType=ISBN&output=js&Version=20131101&OptResult=ebookList,usedList,reviewList&Cover=Big`,
};

export default API_URL;
