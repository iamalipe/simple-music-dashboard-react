export function generatePaginationLinks(
  currentPage: number,
  totalPages: number
): Array<{
  page: number;
  ellipsis: boolean;
  active: boolean;
}> {
  const links: Array<{ page: number; ellipsis: boolean; active: boolean }> = [];

  // Always show first page
  links.push({ page: 1, ellipsis: false, active: currentPage === 1 });

  if (totalPages <= 7) {
    // Show all pages if total is 7 or less
    for (let i = 2; i <= totalPages; i++) {
      links.push({
        page: i,
        ellipsis: false,
        active: currentPage === i,
      });
    }
    return links;
  }

  // Handle cases with more than 7 pages
  if (currentPage <= 3) {
    // Near start: show 1,2,3,4,5 ... last
    for (let i = 2; i <= 5; i++) {
      links.push({
        page: i,
        ellipsis: false,
        active: currentPage === i,
      });
    }
    links.push({ page: -1, ellipsis: true, active: false });
    links.push({
      page: totalPages,
      ellipsis: false,
      active: currentPage === totalPages,
    });
  } else if (currentPage >= totalPages - 2) {
    // Near end: show 1 ... third-last, second-last, last
    links.push({ page: -1, ellipsis: true, active: false });
    for (let i = totalPages - 4; i <= totalPages; i++) {
      links.push({
        page: i,
        ellipsis: false,
        active: currentPage === i,
      });
    }
  } else {
    // Middle: show 1 ... current-1, current, current+1 ... last
    links.push({ page: -1, ellipsis: true, active: false });
    for (let i = currentPage - 1; i <= currentPage + 1; i++) {
      links.push({
        page: i,
        ellipsis: false,
        active: currentPage === i,
      });
    }
    links.push({ page: -1, ellipsis: true, active: false });
    links.push({
      page: totalPages,
      ellipsis: false,
      active: currentPage === totalPages,
    });
  }

  return links;
}
