import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { updateUserByEmail } from "@/services/GenerateAllData"
import { useState } from "react"
export function EditingModal({isOpen,onClose,editingUser,setEditingUser,setIsEditing,setUsers}) {
  const [isUpdating,setIsUpdating]=useState(false)

  const handleInputChange=(e,type="input")=>{
    if(type==="input"){
      const { id, value } = e.target;
      console.log(id,value);
      setEditingUser((prevValue)=>({
        ...prevValue,
        [id]:value,
      }))
    }else{
      console.log(e,type);
      setEditingUser((prevValue)=>({
        ...prevValue,
        [type]:e,
      }))
    }


  }
  const handleUpdate=async()=>{
    setIsUpdating(true)
    const { name, email, phone, role, account_status } = editingUser;
    const updateUserResponse=await updateUserByEmail(email,{ name, email, phone, role, account_status})
    if(updateUserResponse?.status=="200"){
      // updateLocally
      setUsers(prevUsers=>
        prevUsers.map(user=>
          user.user_id===editingUser.user_id?{...user,name,email,phone,role,account_status}:user
        )

      )
      setIsUpdating(false)
      setIsEditing(false)
      // show a toast
      
    }
    console.log(updateUserResponse);
    
  }
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
           Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value={editingUser?.name} onChange={handleInputChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input id={"email"} value={editingUser?.email} onChange={handleInputChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Phone
            </Label>
            <Input id={"phone"} value={editingUser?.phone} onChange={handleInputChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="email" className="text-right">
              Status
            </Label>
            <Select onValueChange={(value)=>handleInputChange(value,"account_status")}>
            <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={editingUser?.account_status} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="verified">verified</SelectItem>
              <SelectItem value="blocked">blocked</SelectItem>
              <SelectItem value="unverified">unverified</SelectItem>
            </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="email" className="text-right">
              Role
            </Label>
            <Select onValueChange={(value)=>handleInputChange(value,"role")}>
            <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={editingUser?.role} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="talent">Talent</SelectItem>
              <SelectItem value="employer">Employer</SelectItem>
              <SelectItem value="consultant">Consultant</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
            </SelectContent>
            </Select>
          </div>

        </div>
        <DialogFooter>
          <Button disabled={isUpdating} className={`${isUpdating?"cursor-not-allowed bg-gray-500":""}`} type="submit" onClick={handleUpdate}>{isUpdating?"Updating...":"Update"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
