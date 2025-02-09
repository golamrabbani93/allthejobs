import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function RoleFilter({ onFilterChange }) {
  return (
    <Select onValueChange={onFilterChange}>
      <SelectTrigger className="w-[130px]">
        <SelectValue placeholder="Filter by role" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Roles</SelectItem>
        <SelectItem value="talent">Talent</SelectItem>
        <SelectItem value="employer">Employer</SelectItem>
        <SelectItem value="consultant">Consultant</SelectItem>
        <SelectItem value="admin">Admin</SelectItem>
      </SelectContent>
    </Select>
  )
}

