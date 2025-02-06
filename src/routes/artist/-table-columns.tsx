import dayjs from "dayjs";
import type { ArtistType } from "@/api/artist-api";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LocalizedFormat from "dayjs/plugin/LocalizedFormat";
import { Link } from "@tanstack/react-router";
import { DataTableColumn } from "@/hooks/useDataTable";
dayjs.extend(LocalizedFormat);
const tableColumns: DataTableColumn<ArtistType>[] = [
  {
    key: "select",
    label: "Select",
    labelRender: () => (
      <Checkbox
        // checked={
        //   table.getIsAllPageRowsSelected() ||
        //   (table.getIsSomePageRowsSelected() && "indeterminate")
        // }
        // onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    isSortable: false,
    isHidable: false,
    render: () => (
      <Checkbox
        // checked={row.getIsSelected()}
        // onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
  },
  {
    label: "Name",
    key: "name",
    isSortable: true,
    isHidable: false,
    render: (info) => (
      <div className="flex items-center gap-2">
        <Avatar className="border h-8 w-8">
          <AvatarImage src={info.imageUrl || ""} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Link
          to="/artist/$id"
          params={{ id: info.id }}
          className="hover:underline"
        >
          {info.name}
        </Link>
      </div>
    ),
  },
  {
    label: "Bio",
    key: "bio",
    render: (item) => item.bio,
    isSortable: true,
  },
  {
    label: "Created At",
    key: "createdAt",
    render: (info) => dayjs(info.createdAt).format("lll"),
    isSortable: true,
  },
];

export default tableColumns;
