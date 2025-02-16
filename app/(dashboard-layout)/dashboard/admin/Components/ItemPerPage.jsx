import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ItemPerPage({ onFilterChange }) {
  return (
    <Select onValueChange={onFilterChange}>
      <SelectTrigger className="w-[100px]">
        <SelectValue placeholder="Item" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="15">15</SelectItem>
        <SelectItem value="20">20</SelectItem>
        <SelectItem value="30">30</SelectItem>
        <SelectItem value="50">50</SelectItem>
      </SelectContent>
    </Select>
  )
}

