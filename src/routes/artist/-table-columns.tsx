import type { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import type { ArtistType } from "@/api/artist-api";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LocalizedFormat from "dayjs/plugin/LocalizedFormat";
dayjs.extend(LocalizedFormat);

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
    meta: {
      visibilityLabel: "Name",
    },
    cell: (info) => (
      <div className="flex items-center gap-2">
        <Avatar className="border h-8 w-8">
          <AvatarImage src={info.row.original.imageUrl || ""} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <span>{info.getValue() as string}</span>
      </div>
    ),
    enableHiding: false,
  },
  {
    id: "bio",
    accessorKey: "bio",
    header: "Bio",
    meta: {
      visibilityLabel: "Bio",
    },
    cell: (info) => info.getValue(),
  },
  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: "Created At",
    meta: {
      visibilityLabel: "Created At",
    },
    cell: (info) => dayjs(info.getValue() as string).format("lll"),
  },
];

export default tableColumns;
