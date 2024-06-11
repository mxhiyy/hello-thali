'use client'

import React from 'react'
import { useSelector } from 'react-redux';


const Orderspage = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div>
      Orderspage
      <p>Welcome, {user?.phoneNumber}</p>
    </div>
  )
}

export default Orderspage
