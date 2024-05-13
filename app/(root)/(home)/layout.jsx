"use client"

import Footer from '@/components/Footer'
import LoginModal from '@/components/Modal'
import Navbar from '@/components/Navbar'
import { useEffect, useState } from 'react';


const Homelayout = ({ children }) => {
  const [ modalOpen, setModalOpen ] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"))
  
  useEffect(() => {
    const timer = setTimeout(() => {
        setModalOpen(!user?.phoneNumber);
    }, 4000);
    return () => clearInterval(timer);
  }, [user?.phoneNumber]);

  return (
      <main>
      <LoginModal isOpen={modalOpen} closeModal={setModalOpen} />
      <Navbar />
        { children }
      <Footer />
      </main>
  )
}

export default Homelayout;