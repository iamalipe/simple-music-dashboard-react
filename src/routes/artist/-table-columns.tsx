import { createColumnHelper } from "@tanstack/react-table";

import { ArtistType } from "@/api/artist-api";

export const columnHelper = createColumnHelper<ArtistType>();

const tableColumns = [
  columnHelper.accessor("name", {
    header: () => "Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("bio", {
    header: () => "Bio",
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor("imageUrl", {
    header: "Image Url",
    cell: (info) => info.renderValue(),
    enableSorting: false,
    // footer: (info) => info.column.id,
  }),
  columnHelper.accessor("createdAt", {
    header: "CreatedAt",
    cell: (info) => info.renderValue(),
    // footer: (info) => info.column.id,
  }),
];

export default tableColumns;
