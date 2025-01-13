import type { ApiSortReturn } from "@/types/generic-type";
import { type LinkProps, useNavigate } from "@tanstack/react-router";
import type { SortingState } from "@tanstack/react-table";
import { useState, useEffect, useRef } from "react";

type UseSortProps = {
  initialSort?: ApiSortReturn;
  onChange?: (data: SortingState) => void;
  routeFrom: LinkProps["from"];
};

const useSort = (props: UseSortProps) => {
  const initialSort =
    props.initialSort?.map((s) => ({
      id: s.orderBy,
      desc: s.order === "desc",
    })) ?? [];

  const onChange = props.onChange;

  const navigate = useNavigate({ from: props.routeFrom });

  const [sorting, setSorting] = useState<SortingState>(initialSort);

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (onChange) onChange(sorting);
    const sort = sorting.map((s) => ({
      orderBy: s.id,
      order: s.desc ? "desc" : "asc",
    }));
    if (sort.length < 1) return;
    navigate({
      search: (prev) => ({
        ...prev,
        sort: sort,
      }),
    });
  }, [sorting, onChange, navigate]);

  return { state: sorting, setSorting };
};

export default useSort;
