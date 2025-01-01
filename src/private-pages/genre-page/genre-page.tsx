import { GenreType } from "@/api/genre-api";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  // TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import apiQuery from "@/hooks/use-api-query";
import ActionButtons from "@/private-pages/genre-page/action-buttons";
import { TableColumns, TablePagination, TableSort } from "@/types/table-type";
import { useState } from "react";

const GenrePage = () => {
  const [tablePagination, setTablePagination] = useState<TablePagination>({
    page: 1,
    limit: 30,
  });

  const [tableSort, setTableSort] = useState<TableSort<GenreType>>({
    orderBy: "createdAt",
    order: "desc",
  });

  const { data, isLoading, isError, error } = apiQuery.genre.useGetAll({
    ...tablePagination,
    ...tableSort,
  });

  const tableColumns: TableColumns<GenreType>[] = [
    {
      key: "name",
      label: "Name",
    },
    {
      key: "originYear",
      label: "Origin year",
    },
    {
      key: "description",
      label: "Description",
    },
    {
      key: "popularInCountry",
      label: "Popular in country",
    },
    {
      key: "createdAt",
      label: "Created at",
    },
    {
      key: "updatedAt",
      label: "Updated at",
    },
  ];

  return (
    <main className="flex-1 overflow-hidden flex flex-col p-2 md:p-4 gap-2 md:gap-4">
      <ActionButtons />
      {/* <div className="overflow-hidden"> */}
      {/* <div className="overflow-auto"> */}
      <Table>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow className="border-b-0 table-header-box-shadow">
            {tableColumns.map((column) => (
              <TableHead key={column.key}>{column.label}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data?.map((genre, index) => {
            return (
              <TableRow key={index}>
                {tableColumns.map((column) => (
                  <TableCell key={`${index}_${column.key}`}>
                    {genre[column.key]}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {/* </div> */}
      <div className="flex items-center justify-between px-2 py-1 flex-none">
        <div className="flex-1 text-sm text-muted-foreground">
          12 of 30 row(s) selected.
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
          <div className="flex-none text-sm text-muted-foreground ml-4">
            Page 1 of 5
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink isActive href="#">
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">30</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </main>
  );
};

export default GenrePage;
