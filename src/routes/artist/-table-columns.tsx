import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

import { ArtistType } from "@/api/artist-api";
import { Checkbox } from "@/components/ui/checkbox";

export const columnHelper = createColumnHelper<ArtistType>();

const tableColumns: ColumnDef<ArtistType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "name",
    accessorKey: "name",
    header: "Name",
    cell: (info) => info.getValue(),
    enableHiding: false,
  },
  {
    id: "bio",
    accessorKey: "bio",
    header: "Bio",
    cell: (info) => info.getValue(),
  },
  {
    id: "imageUrl",
    accessorKey: "imageUrl",
    header: "Image Url",
    cell: (info) => info.getValue(),
    enableSorting: false,
  },
  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: "Created At",
    cell: (info) => info.getValue(),
  },
];

export default tableColumns;
