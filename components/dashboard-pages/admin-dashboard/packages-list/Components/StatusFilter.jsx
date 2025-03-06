import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function StatusFilter({ onFilterChange }) {
  return (
    <Select onValueChange={onFilterChange} defaultValue="upcoming">
      <SelectTrigger className="w-[140px]">
        <SelectValue placeholder="Filter by status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="previous">Previous</SelectItem>
        <SelectItem value="upcoming">Upcoming/Ongoing</SelectItem>
      </SelectContent>
    </Select>
  )
}

