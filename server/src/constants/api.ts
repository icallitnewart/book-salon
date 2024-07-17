const ALADIN_LIST_BASE_URL = process.env.ALADIN_LIST_API_URL;

const API_URL = {
	ALADIN_BESTSELLER_LIST: `${ALADIN_LIST_BASE_URL}&QueryType=Bestseller&Cover=Big&start=1&SearchTarget=Book&output=js&Version=20131101`,
};

export default API_URL;
