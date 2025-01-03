import { GenreType } from "@/api/genre-api";
import { TableColumns } from "@/types/table-type";

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
    toggleVisibility: false,
  },
];

export default tableColumns;
