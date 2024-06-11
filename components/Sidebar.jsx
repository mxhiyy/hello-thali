import { userPage } from "@/constants";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { PiHandsPrayingFill } from "react-icons/pi";
import { logout } from "@/store/slices/authSlice";
import { useDispatch } from "react-redux";

const Sidebar = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <main className="w-[250px] h-auto">
      <Link href={"/user-profile"}>
      <div className="border-2 border-gray-6 p-3 rounded-md flex justify-center items-center hover:bg-green-4 hover:text-white cursor-pointer">
        <h2 className="text-xl font-medium flex gap-2 items-center">
          <PiHandsPrayingFill className="text-yellow-400" size={20} /> Hello,
          HelloThali User
        </h2>
      </div>
      </Link>
      <div className="mt-20 flex flex-col gap-3">
        {userPage.map((data) => (
          <Link href={data.route}>
            <div
              className="border-2 border-gray-6 rounded-md flex justify-between items-center p-3"
              key={data.id}
            >
              {data.icon}
              <h2 className="font-medium text-xl" href={data.route}>
                {data.name}
              </h2>
              <FaChevronRight className="text-green-4" size={25} />
            </div>
          </Link>
        ))}
      </div>

      {/* ============= logout option ============ */}
      <Link href={"/"} onClick={handleLogout}>
        <div className="border-2 border-gray-6 p-3 mt-3 rounded-md flex justify-between items-center">
          <IoLogOut size={30} className="text-green-4" />
          <h2 className="text-xl font-medium">Log Out</h2>
          <FaChevronRight className="text-green-4" size={25} />
        </div>
      </Link>
    </main>
  );
};

export default Sidebar;
