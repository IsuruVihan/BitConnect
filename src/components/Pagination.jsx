import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/20/solid'
//
// const Pagination = () => {
// 	return (
// 		<nav className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
// 			<div className="-mt-px flex w-0 flex-1">
// 				<div
// 					className="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500
// 					hover:border-gray-300 hover:text-gray-700"
// 				>
// 					<ArrowLongLeftIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
// 					Previous
// 				</div>
// 			</div>
// 			<div className="hidden md:-mt-px md:flex">
// 				<div
// 					className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500
// 					hover:border-gray-300 hover:text-gray-700"
// 				>
// 					1
// 				</div>
// 				<div
// 					className="inline-flex items-center border-t-2 border-indigo-500 px-4 pt-4 text-sm font-medium text-indigo-600"
// 					aria-current="page"
// 				>
// 					2
// 				</div>
// 				<d
// 					className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500
// 					hover:border-gray-300 hover:text-gray-700"
// 				>
// 					3
// 				</d>
// 				<span className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium
// 				text-gray-500">
//           ...
//         </span>
// 				<div
// 					className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500
// 					hover:border-gray-300 hover:text-gray-700"
// 				>
// 					8
// 				</div>
// 				<div
// 					className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500
// 					hover:border-gray-300 hover:text-gray-700"
// 				>
// 					9
// 				</div>
// 				<div
// 					className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500
// 					hover:border-gray-300 hover:text-gray-700"
// 				>
// 					10
// 				</div>
// 			</div>
// 			<div className="-mt-px flex w-0 flex-1 justify-end">
// 				<div
// 					className="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500
// 					hover:border-gray-300 hover:text-gray-700"
// 				>
// 					Next
// 					<ArrowLongRightIcon className="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
// 				</div>
// 			</div>
// 		</nav>
// 	)
// }
//
// export default Pagination;

const Pagination = ({ totalRecords, recordsPerPage, currentPage, onPageChange }) => {
	const totalPages = Math.ceil(totalRecords / recordsPerPage);

	const handlePreviousPage = () => {
		if (currentPage > 1) {
			onPageChange(currentPage - 1);
		}
	};

	const handleNextPage = () => {
		if (currentPage < totalPages) {
			onPageChange(currentPage + 1);
		}
	};

	const renderPageNumbers = () => {
		const pageNumbers = [];
		const maxPagesToShow = 5;
		let startPage, endPage;

		if (totalPages <= maxPagesToShow) {
			startPage = 1;
			endPage = totalPages;
		} else {
			if (currentPage <= 3) {
				startPage = 1;
				endPage = maxPagesToShow;
			} else if (currentPage + 2 >= totalPages) {
				startPage = totalPages - 4;
				endPage = totalPages;
			} else {
				startPage = currentPage - 2;
				endPage = currentPage + 2;
			}
		}

		for (let i = startPage; i <= endPage; i++) {
			pageNumbers.push(
				<div
					key={i}
					onClick={() => onPageChange(i)}
					className={`inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium cursor-pointer ${
						i === currentPage
							? 'border-indigo-500 text-indigo-600'
							: 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
					}`}
					aria-current={i === currentPage ? 'page' : undefined}
				>
					{i}
				</div>
			);
		}

		if (endPage < totalPages) {
			pageNumbers.push(
				<span key="ellipsis" className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500">
					...
				</span>
			);
			pageNumbers.push(
				<div
					key={totalPages}
					onClick={() => onPageChange(totalPages)}
					className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 cursor-pointer"
				>
					{totalPages}
				</div>
			);
		}

		return pageNumbers;
	};

	return (
		<nav className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
			<div className="-mt-px flex w-0 flex-1">
				<div
					onClick={handlePreviousPage}
					className={`inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 cursor-pointer ${
						currentPage === 1 ? 'pointer-events-none opacity-50' : ''
					}`}
				>
					<ArrowLongLeftIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
					Previous
				</div>
			</div>
			<div className="hidden md:-mt-px md:flex">{renderPageNumbers()}</div>
			<div className="-mt-px flex w-0 flex-1 justify-end">
				<div
					onClick={handleNextPage}
					className={`inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 cursor-pointer ${
						currentPage === totalPages ? 'pointer-events-none opacity-50' : ''
					}`}
				>
					Next
					<ArrowLongRightIcon className="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
				</div>
			</div>
		</nav>
	);
};

export default Pagination;