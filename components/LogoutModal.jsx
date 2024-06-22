import React from 'react';
import { Button } from '../components/ui/button';
import { Modal } from '@mui/material';
import { logout } from "@/store/slices/authSlice";
import { useDispatch } from "react-redux";

const LogoutModal = ({ open, setIsOpen }) => {
  
  const dispatch = useDispatch();
    
  const handleClose = () => {
    setIsOpen(false);
  }

  const handleLogout = () => {
    dispatch(logout());
    setIsOpen(false);
  }

  return (
    <div>
      <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="flex justify-center items-center"
        >
        <div className={`rounded-md bg-white w-[500px] h-auto items-center flex flex-col gap-3 p-5`}>
            <h1 className='text-xl font-semibold'>Are you sure you want to Logout ? </h1>
            <div className='flex gap-5'>
                <Button className='bg-green-700 hover:bg-green-900 text-white w-20' onClick={handleLogout}>Yes</Button>
                <Button className='bg-red-700 hover:bg-red-900 text-white w-20' onClick={handleClose} >No</Button>
            </div>
        </div>
        </Modal>
    </div>
  )
}

export default LogoutModal
