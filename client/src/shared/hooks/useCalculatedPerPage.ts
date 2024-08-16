import { useMemo } from 'react';

interface IUserCalculatePerPageProps {
	itemHeight: number;
	itemsPerRow: number;
}

function useCalculatePerPage({
	itemHeight,
	itemsPerRow,
}: IUserCalculatePerPageProps): number {
	return useMemo(() => {
		const viewportHeight = window.innerHeight;
		const estimatedRows = Math.floor(viewportHeight / itemHeight);
		const estimatedPerPage = estimatedRows * itemsPerRow;

		return Math.max(estimatedPerPage, itemsPerRow);
	}, [itemHeight, itemsPerRow]);
}

export default useCalculatePerPage;
