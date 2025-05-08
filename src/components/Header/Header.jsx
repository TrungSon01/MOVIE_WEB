import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import UserMenu from "../UserMenu/UserMenu";

export default function Header() {
  const { user } = useSelector((state) => state.userSlice);

  return (
    <div className="px-20 flex justify-between items-center shadow-lg h-20">
      <Link
        to="/"
        className="text-3xl font-black text-red-500 animate-pulse inline-block"
      >
        MovieHome
      </Link>

      <div className="flex items-center space-x-6">
        {user && (
          <>
            <UserMenu /> {/* ✅ Đúng cú pháp */}
          </>
        )}
        {!user && (
          <Link
            to="/login&register"
            className="text-lg font-black text-black-500 ml-4"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
}
