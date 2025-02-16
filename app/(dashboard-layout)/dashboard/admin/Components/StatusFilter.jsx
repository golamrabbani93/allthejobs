import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function StatusFilter({ onFilterChange }) {
  return (
    <Select onValueChange={onFilterChange}>
      <SelectTrigger className="w-[140px]">
        <SelectValue placeholder="Filter by status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All</SelectItem>
        <SelectItem value="verified">Verified</SelectItem>
        <SelectItem value="unverified">Unverified</SelectItem>
        <SelectItem value="blocked">Blocked</SelectItem>
      </SelectContent>
    </Select>
  )
}

