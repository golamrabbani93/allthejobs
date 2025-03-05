import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function DataTable({ data, meetingType }) {
  if (data.length === 0) {
    return <div className="text-center py-4">No data found</div>
  }  const statusColors = {
    unverified: "bg-yellow-600",
    verified: "bg-green-500",
    blocked: "bg-red-500",
  };
  const router=useRouter()

  return (
    <Table>

      <TableHeader>
        <TableRow>
          <TableHead>Consultant Name</TableHead>
          <TableHead>Talent Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Time</TableHead>
          {meetingType==="upcoming"&&<TableHead>Action</TableHead>}
          {/* <TableHead>Actions</TableHead> */}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.id}>
            <TableCell>
            {/* <Link
							href={`/consultants/${item.state.custom.consultant_real_id}`}
							target="_blank"
							rel="noopener noreferrer"
						>
							<span className="font-bold cursor-pointer">{item.state.custom.consultant_name}</span>
						</Link> */}
            {item.state.custom.consultant_name}
             </TableCell>
            <TableCell>{item.state.custom.talent_name}</TableCell>
            <TableCell>{item.state.custom.description}</TableCell>
            <TableCell>{item.state.startsAt.toLocaleString('en-US', { hour: 'numeric', hour12: true, year: 'numeric', month: 'numeric', day: 'numeric' })}</TableCell>
            {meetingType==="upcoming"&&
            
            <TableCell onClick={()=>router.push(`/video-chat3/meeting/${item.id}`)}><Button size="sm">Join</Button></TableCell>
            }

          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

