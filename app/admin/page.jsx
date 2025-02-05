"use client"

import { useState, useMemo, useEffect } from "react"
import SearchBar from "./Components/SearchBar"
import DataTable from "./Components/DataTable"
import RoleFilter from "./Components/RoleFilter"
import Pagination from "./Components/Pagination"
import { fetchAllUsers } from "@/services/GenerateAllData"
import Spinner from "@/components/Sppiner/Spinner"

// Mock data (expanded for pagination example)
const initialData = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Editor" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Viewer" },
  { id: 4, name: "Alice Brown", email: "alice@example.com", role: "Editor" },
  { id: 5, name: "Charlie Davis", email: "charlie@example.com", role: "Viewer" },
  { id: 6, name: "Eva Wilson", email: "eva@example.com", role: "Admin" },
  { id: 7, name: "Frank Miller", email: "frank@example.com", role: "Editor" },
  { id: 8, name: "Grace Lee", email: "grace@example.com", role: "Viewer" },
  { id: 9, name: "Henry Taylor", email: "henry@example.com", role: "Editor" },
  { id: 10, name: "Ivy Chen", email: "ivy@example.com", role: "Viewer" },
  { id: 11, name: "Jack Brown", email: "jack@example.com", role: "Admin" },
  { id: 12, name: "Kelly White", email: "kelly@example.com", role: "Editor" },
]

const ITEMS_PER_PAGE = 10

export default function AdminPanel() {
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [users,setUsers]=useState([])
  const [loadingUsers,setLoadingUser]=useState(false)

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
  console.log(users);

  const filteredData = useMemo(() => {
    return users.filter(
      (item) =>
        (roleFilter === "all" || item.role === roleFilter) &&
        Object.values(item).some((value) => value.toString().toLowerCase().includes(searchTerm.toLowerCase())),
    )
  }, [searchTerm, roleFilter])

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

  const handleEdit = (id) => {
    // Implement edit functionality here
    console.log(`Editing item with id: ${id}`)
  }

  const handleDelete = (id) => {
    // Implement delete functionality here
    const newData = users.filter((item) => item.id !== id)
    // Update users here (in a real app, you'd update the database)
    console.log(`Deleted item with id: ${id}`)
  }


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      {loadingUsers?<Spinner></Spinner>:
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <SearchBar onSearch={handleSearch} />
          <RoleFilter onFilterChange={handleRoleFilter} />
        </div>
        <DataTable data={paginatedData} onEdit={handleEdit} onDelete={handleDelete} />
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>
      }
    </div>
  )
}

