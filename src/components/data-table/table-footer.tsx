import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import TablePagination from "./table-pagination";

const TableFooter = () => {
  return (
    <div className="flex items-center justify-between px-2 py-1 flex-none">
      <div className="text-xs text-muted-foreground flex flex-col">
        <span>Rows Selected: 12 of 30</span>
        <span>Page: 1 of 5</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium whitespace-nowrap">
            Rows per page
          </span>
          <Select
            value={`1000`}
            // onValueChange={(value) => {
            //   onPageSizeChange(Number(value));
            // }}
          >
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder={"1000"} />
            </SelectTrigger>
            <SelectContent side="top">
              <SelectItem key={"1000"} value={`1000`}>
                1000
              </SelectItem>
              <SelectItem key={"20"} value={`20`}>
                20
              </SelectItem>
              <SelectItem key={"30"} value={`30`}>
                30
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <TablePagination />
      </div>
    </div>
  );
};

export default TableFooter;
