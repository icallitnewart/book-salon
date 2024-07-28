export const userKeys = {
	all: ['users'] as const,
	auth: ['users', 'auth'] as const,
	login: ['users', 'login'] as const,
	register: ['users', 'register'] as const,
	update: ['users', 'update'] as const,
	delete: ['users', 'delete'] as const,
	logout: ['users', 'logout'] as const,
};

export const bookKeys = {
	all: ['books'] as const,
	bestseller: ['books', 'bestseller'] as const,
	detail: (isbn?: string) => ['books', 'detail', isbn] as const,
};

export const reviewKeys = {
	all: ['reviews'] as const,
	add: ['reviews', 'add'] as const,
	detail: (reviewId?: string) => ['reviews', 'detail', reviewId] as const,
	update: (reviewId?: string) => ['reviews', 'update', reviewId] as const,
	delete: (reviewId?: string) => ['reviews', 'delete', reviewId] as const,
};
