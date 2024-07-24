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
};
