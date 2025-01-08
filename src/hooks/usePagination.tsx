import { useNavigate } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";

type UsePaginationProps = {
  initialPageSize?: number;
  initialPageIndex?: number;
  onChange?: (data: { pageSize: number; pageIndex: number }) => void;
};

const usePagination = (props: UsePaginationProps) => {
  const initialPageIndex = props.initialPageIndex
    ? props.initialPageIndex - 1
    : 0;
  const initialPageSize = props.initialPageSize ?? 10;

  const onChange = props.onChange;

  const navigate = useNavigate({ from: "/artist" });

  const [pagination, setPagination] = useState({
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
      search: {
        limit: pagination.pageSize,
        page: pagination.pageIndex + 1,
      },
    });
  }, [pagination, onChange, navigate]);

  return { state: pagination, setPagination };
};

export default usePagination;
