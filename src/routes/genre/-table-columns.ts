import { createColumnHelper } from "@tanstack/react-table";

import { GenreType } from "@/api/genre-api";

export const columnHelper = createColumnHelper<GenreType>();

const tableColumns = [
  columnHelper.accessor("name", {
    header: () => "Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("originYear", {
    header: () => "Origin year",
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor("description", {
    header: "Description",
    cell: (info) => info.renderValue(),
    // footer: (info) => info.column.id,
  }),
  columnHelper.accessor("popularInCountry", {
    header: "Popular in country",
    cell: (info) => info.renderValue(),
    // footer: (info) => info.column.id,
  }),
  columnHelper.accessor("createdAt", {
    header: "CreatedAt",
    cell: (info) => info.renderValue(),
    // footer: (info) => info.column.id,
  }),
];

export default tableColumns;
