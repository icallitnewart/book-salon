import {
	MutationCache,
	QueryCache,
	QueryClient,
	QueryClientConfig,
} from '@tanstack/react-query';

const QUERY_TYPE = {
	QUERY: 'QUERY',
	MUTATION: 'MUTATION',
} as const;

function createErrMsg(
	msg: string,
	type: (typeof QUERY_TYPE)[keyof typeof QUERY_TYPE],
) {
	return `[${type}]: ${msg}`;
}

function errorHandler(errMsg: string) {
	// TODO: 모달 추가 예정
	console.error(errMsg);
}

const queryClientOptions: QueryClientConfig = {
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60 * 5, // 5 mins
			gcTime: 1000 * 60 * 15, // 15 mins
			refetchOnWindowFocus: false,
		},
	},
	queryCache: new QueryCache({
		onError: error => {
			const errMsg = createErrMsg(error.message, QUERY_TYPE.QUERY);
			errorHandler(errMsg);
		},
	}),
	mutationCache: new MutationCache({
		onError: error => {
			const errMsg = createErrMsg(error.message, QUERY_TYPE.MUTATION);
			errorHandler(errMsg);
		},
	}),
};

export const queryClient = new QueryClient(queryClientOptions);
