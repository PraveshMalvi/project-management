import { useAuthGuard } from "@/hooks/useAuthGuard";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { IoIosMenu } from "react-icons/io";

const Navbar = () => {
  useAuthGuard();
  const router = useRouter();
  const [toggle, setToggle] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
    toast.success("Logged out!");
  };
  return (
    <div className="w-full h-[60px] bg-black/80 flex items-center sm:px-12 px-8">
      <div className="w-full flex justify-between items-center">
        <p className="text-white m-0 p-0 text-xl font-bold">Projectiles</p>
        {/* for large screens */}
        <div className="md:flex hidden justify-center items-center gap-8">
          <Link
            className="text-white hover:opacity-70 duration-200"
            href={"/dashboard"}
          >
            Dashboard
          </Link>
          <Link
            className="text-white hover:opacity-70 duration-200"
            href={"/map"}
          >
            Map
          </Link>
          <Link
            className="text-white hover:opacity-70 duration-200"
            href={"/media"}
          >
            Media
          </Link>
          <Link
            className="text-white hover:opacity-70 duration-200 bg-amber-500 rounded-full py-1 px-3 flex items-center"
            href={""}
            onClick={handleLogout}
          >
            Logout
          </Link>
        </div>
        {/* for small screens */}
        <div className="md:hidden block relative">
          <IoIosMenu
            color="white"
            size={"40"}
            className="cursor-pointer"
            onClick={() => setToggle((prev) => !prev)}
          />
          {toggle && (
            <div className="bg-white shadow-xl p-3 w-[150px] rounded-lg absolute top-[50px] right-0 flex flex-col justify-center items-start gap-3">
              <Link
                className="text-black hover:opacity-60 duration-200"
                href={"/dashboard"}
              >
                Dashboard
              </Link>
              <Link
                className="text-black hover:opacity-60 duration-200"
                href={"/map"}
              >
                Map
              </Link>
              <Link
                className="text-black hover:opacity-60 duration-200"
                href={"/media"}
              >
                Media
              </Link>
              <Link
                className="text-white hover:opacity-70 duration-200 bg-amber-500 rounded-full py-1 px-3 flex items-center"
                href={""}
                onClick={handleLogout}
              >
                Logout
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
