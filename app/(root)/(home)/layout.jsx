"use client"

import Footer from '@/components/Footer'
import LoginModal from '@/components/Modal'
import Navbar from '@/components/Navbar'
import { useEffect, useState } from 'react';


const Homelayout = ({ children }) => {
  const [ modalOpen, setModalOpen ] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setModalOpen(true);
    }, 4000);
  
    return clearInterval(() => timer);
  }, []);

  return (
      <main>
      <LoginModal isOpen={modalOpen} closeModal={setModalOpen} />
      <Navbar />
        { children }
      <Footer />
      </main>
  )
}

export default Homelayout