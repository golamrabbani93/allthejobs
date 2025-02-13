"use client"

import { useState, useMemo, useEffect } from "react"
import SearchBar from "./SearchBar"
import DataTable from "./DataTable"
import RoleFilter from "./RoleFilter"
import Pagination from "./Pagination"
import Spinner from "@/components/Sppiner/Spinner"
import ItemPerPage from "./ItemPerPage"
import StatusFilter from "./StatusFilter"
import { useGetCallsAdmin } from "@/app/(others)/video-chat3/hooks/useGetCallsAdmin"




export default function MeetingManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [ITEMS_PER_PAGE,setITEMS_PER_PAGE]=useState(15)

  const {upcomingCalls, previousCalls, recordings, isLoading, meetingRequest, role} = useGetCallsAdmin()
  console.log(previousCalls);



  // const filteredData = useMemo(() => {
  //   return users.filter(
  //     (item) =>
  //       (roleFilter === "all" || item.role === roleFilter) && (statusFilter === "all" || item.account_status === statusFilter) &&
  //     // search by any property, commented it because some of the properties are null which creates problem when comparing 
  //       // Object.values(item).some((value) => value.toString().toLowerCase().includes(searchTerm.toLowerCase())),
  //       // search by first name,email items
  //       Object.values(item).slice(1,3).some((value) => value.toString().toLowerCase().includes(searchTerm.toLowerCase())),
  //       // only search by email 
  //       // Object.values(item)[1].toString().toLowerCase().includes(searchTerm.toLowerCase()),
  //   )
  // }, [searchTerm,users,ITEMS_PER_PAGE])

  const totalPages = Math.ceil(previousCalls.length / ITEMS_PER_PAGE)

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    return previousCalls.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  }, [ currentPage,previousCalls])


  const handleSearch = (term) => {
    setSearchTerm(term)
    setCurrentPage(1)
  }

  const handleRoleFilter = (role) => {
    setRoleFilter(role)
    setCurrentPage(1)
  }


  const handlePageChange = (page) => {
    setCurrentPage(page)
  }
  const handleItemPerPageChange=(count)=>{
    setITEMS_PER_PAGE(parseInt(count, 10))
  }

  const handleStatusFilter=(status)=>{
    setStatusFilter(status)
  }
  const handleEdit = (id,data) => {
    setEditingUser(data)
    setIsEditing(true)

  }

  const handleDelete = (id) => {
    // Implement delete functionality here
    const newData = users.filter((item) => item.id !== id)
    // Update users here (in a real app, you'd update the database)
    console.log(`Deleted item with id: ${id}`)
  }
  // console.log(paginatedData);
  return (
    // <div>hello</div>
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Meeting Management</h1>
      {!previousCalls.length?<Spinner></Spinner>:
      // <div className="space-y-4">
      //   <div className="flex justify-between items-center">
      //     {/* <div className="flex gap-2">
      //       <SearchBar onSearch={handleSearch} />
      //     </div> */}

      //   </div>
      <div>
        <DataTable data={paginatedData} onEdit={handleEdit} onDelete={handleDelete} />
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>
      // </div>
      }
    </div>
  )
}

