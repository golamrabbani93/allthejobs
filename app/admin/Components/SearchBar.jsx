import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"



export default function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(searchTerm)
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-[200px]"
      />
      <Button type="submit" size="sm">
        Search
      </Button>
    </form>
  )
}

