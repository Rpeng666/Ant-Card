'use client';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { usePathname, useLocaleRouter } from '@/i18n/routing.public';

function getCurrentPageFromPath(pathname: string): number {
  const match = pathname.match(/\/page\/(\d+)$/);
  if (match?.[1]) {
    return Number(match[1]);
  }
  return 1;
}

type CustomPaginationProps = {
  totalPages: number;
  routePrefix: string;
};

export default function CustomPagination({
  totalPages,
  routePrefix,
}: CustomPaginationProps) {
  const router = useLocaleRouter();
  const pathname = usePathname();
  const currentPage = getCurrentPageFromPath(pathname);

  const handlePageChange = (page: number | string) => {
    const pageNum = Number(page);
    if (pageNum === 1) {
      // Go to /blog or /blog/category/[slug] for page 1
      router.push(routePrefix);
    } else {
      // Go to /blog/page/x or /blog/category/[slug]/page/x
      router.push(`${routePrefix}/page/${pageNum}`);
    }
  };

  const allPages = generatePagination(currentPage, totalPages);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={
              currentPage > 1
                ? () => handlePageChange(currentPage - 1)
                : undefined
            }
            aria-disabled={currentPage <= 1}
            className={
              currentPage <= 1
                ? 'pointer-events-none text-gray-300 dark:text-gray-600'
                : 'cursor-pointer'
            }
          />
        </PaginationItem>
        {allPages.map((page, index) => (
          <PaginationItem key={`${page}-${index}`}>
            {page === '...' ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                onClick={() => handlePageChange(page)}
                isActive={currentPage === page}
                className={currentPage === page ? '' : 'cursor-pointer'}
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            onClick={
              currentPage < totalPages
                ? () => handlePageChange(currentPage + 1)
                : undefined
            }
            aria-disabled={currentPage >= totalPages}
            className={
              currentPage >= totalPages
                ? 'pointer-events-none text-gray-300 dark:text-gray-600'
                : 'cursor-pointer'
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

/**
 * Generate an array of page numbers to display in the pagination component
 */
const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};
