import Link from "next/link";
import React from "react";
import { MdOutlineRestaurantMenu } from "react-icons/md";


const ReferAndEarnPage = () => {
    return(
        <main>
            <div className="w-full h-[500px] flex flex-col gap-2 justify-center items-center">
                <h1 className="text-5xl font-extrabold text-purple">Coming Soon</h1>
                <h6 className="text-3xl text-semibold">We are working hard to bring you something amazing. Stay tuned!</h6>
                <Link className="mt-10 text-xl font-bold text-green-4 flex gap-3 items-center underline underline-offset-4" href={"/explore"}><MdOutlineRestaurantMenu /> Explore Menu</Link>

            </div>
        </main>
    )
};

export default ReferAndEarnPage;