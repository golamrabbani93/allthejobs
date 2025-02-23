
"use client"

import { useState, useMemo, useEffect } from "react"
import SearchBar from "./SearchBar"
import DataTable from "./DataTable"
import RoleFilter from "./RoleFilter"
import Pagination from "./Pagination"
import { fetchAllUsers } from "@/services/GenerateAllData"
import Spinner from "@/components/Sppiner/Spinner"
import { EditingModal } from "./EditingModal"
import ItemPerPage from "./ItemPerPage"
import StatusFilter from "./StatusFilter"
import AddUser from "./AddUser"
import { Button } from "@/components/ui/button"
import toast, { Toaster } from 'react-hot-toast';


// Mock data (expanded for pagination example)

export default function AdminPanel() {

  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [users,setUsers]=useState([])
  const [loadingUsers,setLoadingUser]=useState(false)
  const [isEditing,setIsEditing]=useState(false)
  const [editingUser,setEditingUser]=useState(null)
  const [ITEMS_PER_PAGE,setITEMS_PER_PAGE]=useState(15)
  const [statusFilter,setStatusFilter]=useState("all")
  const [creatingUser,setCreatingUser]=useState(false)

  useEffect(()=>{
    const fetchData = async () => {
      try {
        setLoadingUser(true)
        const response = await fetchAllUsers();
        setUsers(response);
        setRoleFilter("all")
      } catch (error) {
        console.error('Error fetching users:', error);
      }finally{
        setLoadingUser(false)
      }
    };
    fetchData()
  },[])
  console.log(editingUser);

  const filteredData = useMemo(() => {
    return users.filter(
      (item) =>
        (roleFilter === "all" || item.role === roleFilter) && (statusFilter === "all" || item.account_status === statusFilter) &&
      // search by any property, commented it because some of the properties are null which creates problem when comparing 
        // Object.values(item).some((value) => value.toString().toLowerCase().includes(searchTerm.toLowerCase())),
        // search by first name,email items
        Object.values(item).slice(1,3).some((value) => value.toString().toLowerCase().includes(searchTerm.toLowerCase())),
        // only search by email 
        // Object.values(item)[1].toString().toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }, [searchTerm, roleFilter,users,ITEMS_PER_PAGE,statusFilter])

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE)

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  }, [filteredData, currentPage])


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
  console.log(creatingUser);


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      {loadingUsers?<Spinner></Spinner>:
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <SearchBar onSearch={handleSearch} />
            <Button className="bg-green-500 hover:bg-green-600" size="sm" onClick={()=>setCreatingUser(true)}>Add User</Button>
          </div>
          <div className="mx-2 flex gap-2">
            <ItemPerPage onFilterChange={handleItemPerPageChange}></ItemPerPage>
            <RoleFilter onFilterChange={handleRoleFilter} />
            <StatusFilter onFilterChange={handleStatusFilter}></StatusFilter>
          </div>
        </div>
        <DataTable data={paginatedData} onEdit={handleEdit} onDelete={handleDelete} />
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>
      }
      <EditingModal isOpen={isEditing} onClose={()=>setIsEditing(false)} setIsEditing={setIsEditing} editingUser={editingUser} setEditingUser={setEditingUser} setUsers={setUsers}></EditingModal>
      {creatingUser&&<AddUser setCreatingUser={setCreatingUser}></AddUser>}
      <Toaster />
    </div>
  )

}
