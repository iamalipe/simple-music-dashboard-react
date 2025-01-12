import { LinkProps, useNavigate } from "@tanstack/react-router";
import { PaginationState } from "@tanstack/react-table";
import { useState, useEffect, useRef } from "react";

type UsePaginationProps = {
  initialPageSize?: number;
  initialPageIndex?: number;
  onChange?: (data: PaginationState) => void;
  routeFrom: LinkProps["from"];
};

const usePagination = (props: UsePaginationProps) => {
  const initialPageIndex = props.initialPageIndex
    ? props.initialPageIndex - 1
    : 0;
  const initialPageSize = props.initialPageSize ?? 10;

  const onChange = props.onChange;

  const navigate = useNavigate({ from: props.routeFrom });

  const [pagination, setPagination] = useState<PaginationState>({
    pageSize: initialPageSize,
    pageIndex: initialPageIndex,
  });

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (onChange) onChange(pagination);
    navigate({
      search: (prev) => ({
        ...prev,
        limit: pagination.pageSize,
        page: pagination.pageIndex + 1,
      }),
    });
  }, [pagination, onChange, navigate]);

  return { state: pagination, setPagination };
};

export default usePagination;
