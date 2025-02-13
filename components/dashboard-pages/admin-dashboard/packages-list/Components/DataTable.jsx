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
  console.log(data[0].state.custom);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Consultant Name</TableHead>
          <TableHead>Talent Name</TableHead>
          <TableHead>Time</TableHead>
          {/* <TableHead>Actions</TableHead> */}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.state.custom.consultant_name}</TableCell>
            <TableCell>{item.state.custom.talent_name}</TableCell>
            <TableCell>{item.state.startsAt.toLocaleString()}</TableCell>
            {/* <TableCell>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" onClick={() => onEdit(item.user_id,item)}>
                  <Pencil className="h-4 w-4" />
                </Button>
              </div>
            </TableCell> */}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

