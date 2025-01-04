import { LinkProps } from "@tanstack/react-router";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationRouterLink,
} from "@/components/ui/pagination";
import { generatePaginationLinks } from "@/lib/table-utils";
import { ApiPaginationReturn } from "@/types/generic-type";

export type TablePaginationProps = {
  pagination: ApiPaginationReturn;
  routeFrom: LinkProps["from"];
};
const TablePagination = (props: TablePaginationProps) => {
  const { pagination, routeFrom } = props;

  const totalPages = Math.ceil(pagination.total / pagination.limit);
  const currentPage = pagination.page;
  const paginationLinks = generatePaginationLinks(currentPage, totalPages);

  return (
    <Pagination>
      <PaginationContent>
        {paginationLinks.map((link, index) => (
          <PaginationItem key={index}>
            {link.ellipsis ? (
              <PaginationEllipsis />
            ) : (
              <PaginationRouterLink
                isActive={link.active}
                from={routeFrom}
                search={(prev) => ({ ...prev, page: link.page })}
              >
                {link.page}
              </PaginationRouterLink>
            )}
          </PaginationItem>
        ))}
      </PaginationContent>
    </Pagination>
  );
};

export default TablePagination;
