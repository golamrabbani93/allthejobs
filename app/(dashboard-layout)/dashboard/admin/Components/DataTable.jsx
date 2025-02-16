import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2 } from "lucide-react"


export default function DataTable({ data, onEdit, onDelete }) {
  if (data.length === 0) {
    return <div className="text-center py-4">No data found</div>
  }  const statusColors = {
    unverified: "bg-yellow-600",
    verified: "bg-green-500",
    blocked: "bg-red-500",
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.email}</TableCell>
            <TableCell>{item.role}</TableCell>
            <TableCell><span className={`px-1 py-1 text-white font-semibold rounded-md ${statusColors[item.account_status] || "bg-gray-500"}`}>
              
              
              {item.account_status}</span></TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" onClick={() => onEdit(item.user_id,item)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                {/* <Button variant="outline" size="icon" onClick={() => onDelete(item.user_id)}>
                  <Trash2 className="h-4 w-4 " />
                </Button> */}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

