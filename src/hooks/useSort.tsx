import { LinkProps, useNavigate } from "@tanstack/react-router";
import { SortingState } from "@tanstack/react-table";
import { useState, useEffect, useRef } from "react";

type UseSortProps = {
  initialSort?: SortingState;
  onChange?: (data: SortingState) => void;
  routeFrom: LinkProps["from"];
};

const useSort = (props: UseSortProps) => {
  const initialSort = props.initialSort ?? [];

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
    console.log("sorting", sorting);

    // navigate({
    //   search: {
    //     limit: pagination.pageSize,
    //     page: pagination.pageIndex + 1,
    //   },
    // });
  }, [sorting, onChange, navigate]);

  return { state: sorting, setSorting };
};

export default useSort;
