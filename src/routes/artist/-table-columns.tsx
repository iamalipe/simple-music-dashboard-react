import { ArtistType } from "@/api/artist-api";
import { TableColumns } from "@/types/table-type";
import { createColumnHelper } from "@tanstack/react-table";

const tableColumns: TableColumns<ArtistType>[] = [
  {
    key: "name",
    label: "Name",
  },
  {
    key: "bio",
    label: "bio",
  },
  {
    key: "imageUrl",
    label: "imageUrl",
  },
  {
    key: "createdAt",
    label: "Created at",
  },
  {
    key: "updatedAt",
    label: "Updated at",
    toggleVisibility: false,
  },
];

const columnHelper = createColumnHelper<ArtistType>();

export const columns = [
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
    // footer: (info) => info.column.id,
  }),
  columnHelper.accessor("createdAt", {
    header: "CreatedAt",
    cell: (info) => info.renderValue(),
    // footer: (info) => info.column.id,
  }),
];

export default tableColumns;
