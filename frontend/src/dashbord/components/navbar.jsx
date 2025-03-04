import React from 'react'
import { useNavigate} from "react-router";

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <nav className="fixed top-0 left-0 w-full bg-[#1C3144] flex justify-end px-5 py-2 gap-5 shadow-2xl">
            <img
                className="h-10 rounded-full"
                src="./PROFILEPICANIS.jpg"
                alt="avatar image logo"
            />
            <button
                className="text-[#A2AEBB] font-bold bg-[#D00000] px-2 rounded-lg cursor-pointer hover:bg-[#CF5C78]"
                onClick={() => navigate("/login")}
            >
                Signout
            </button>
        </nav>
    )
}

export default Navbar;