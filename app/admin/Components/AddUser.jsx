'use client';

import Form from '@/components/common/form/register/FormContent';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from 'react';
const AddUser = ({setCreatingUser}) => {
  const [userTypeState, setUserTypeState] = useState("talent")
  return (
    <Dialog open={true} onOpenChange={()=>setCreatingUser(false)}>
      <DialogTrigger asChild>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <div className="modal-body">
          <div id="login-modal">
            <div className="login-form default-form">
              <div className="mb-2 flex gap-2">
              <label className='font-semibold'>User Type :</label>
                <Select defaultValue="talent" onValueChange={(value)=>setUserTypeState(value)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="User Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="talent">Talent</SelectItem>
                    <SelectItem value="employer">Employer</SelectItem>
                    <SelectItem value="consultant">Consultant</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Form userType={userTypeState} setCreatingUser={setCreatingUser} submitButtonText='Add New User' />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddUser;

