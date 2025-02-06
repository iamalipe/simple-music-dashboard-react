import { type LinkProps, useNavigate } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";

export type SortType = {
  orderBy: string;
  order: "asc" | "desc";
};

type UseSortProps = {
  initialSort?: SortType[];
  onChange?: (data: SortType[]) => void;
  routeFrom: LinkProps["from"];
};

const useSort = (props: UseSortProps) => {
  const initialSort = props.initialSort ?? [];

  const onChange = props.onChange;

  const navigate = useNavigate({ from: props.routeFrom });

  const [sorting, setSorting] = useState<SortType[]>(initialSort);

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (onChange) onChange(sorting);

    navigate({
      search: (prev) => ({
        ...prev,
        sort: sorting,
      }),
    });
  }, [sorting, onChange, navigate]);

  const onSortChange = (newSort: SortType[]) => {
    setSorting(newSort);
  };

  return { state: sorting, setSorting, onSortChange };
};

export default useSort;
