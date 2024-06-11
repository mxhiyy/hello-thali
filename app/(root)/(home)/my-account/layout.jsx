'use client'

import Sidebar from "../../../../components/Sidebar";
import React from "react";

const UserLayout = ({ children }) => {
    return(
        <main className="w-[90%] m-auto mt-10 flex justify-between gap-3 p-5">
            <Sidebar />
            <div className="w-[75%] border-2 border-gray-6">
                {children}
            </div>
        </main>
    )
};

export default UserLayout;