import { useNavigate } from "@tanstack/react-router";

import { ApiPaginationReturn } from "@/types/generic-type";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export type TableLimitProps = {
  pagination: ApiPaginationReturn;
};
const TableLimit = (props: TableLimitProps) => {
  const { pagination } = props;

  const navigate = useNavigate({ from: "/genre" });

  const onPageSizeChange = (value: number) => {
    navigate({
      search: {
        limit: value,
        page: 1,
      },
    });
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-muted-foreground text-right whitespace-nowrap">
        Rows Per
        <br />
        Page
      </span>
      <Select
        value={`${pagination.limit}`}
        onValueChange={(value) => onPageSizeChange(Number(value))}
      >
        <SelectTrigger className="w-[80px]">
          <SelectValue placeholder={`${pagination.limit}`} />
        </SelectTrigger>
        <SelectContent side="top">
          <SelectItem key={"10"} value={`10`}>
            10
          </SelectItem>
          <SelectItem key={"25"} value={`25`}>
            25
          </SelectItem>
          <SelectItem key={"50"} value={`50`}>
            50
          </SelectItem>
          <SelectItem key={"100"} value={`100`}>
            100
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default TableLimit;
