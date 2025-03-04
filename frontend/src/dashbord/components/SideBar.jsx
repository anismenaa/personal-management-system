import React from 'react'
import {useNavigate} from "react-router";


const Sidebar = ({setPageKey, pageKey}) => {
    const navigate = useNavigate();

    return (
        <div className="w-1/5 h-screen bg-[#A2AEBB]  max-sm:w-full">
            <ul className="py-20 font-bold flex flex-col gap-10">
                <a
                    key="1"
                    className="group/item hover:bg-[#FFBA08] p-5 cursor-pointer flex justify-between shadow-lg"
                    onClick={()=>setPageKey("1")}
                >
                    <p>
                        <li>Dashboard</li>
                    </p>
                    <p className="font-extrabold group/edit invisible group-hover/item:visible">
                        >
                    </p>
                </a>
                <a
                    key="2"
                    className="group/item hover:bg-[#FFBA08] p-5 cursor-pointer flex justify-between shadow-lg"
                    onClick={()=>setPageKey("2")}
                >
                    <p>
                        <li>Days table</li>
                    </p>
                    <p className="font-extrabold group/edit invisible group-hover/item:visible">
                        >
                    </p>
                </a>
                <a
                    key="3"
                    className="group/item hover:bg-[#FFBA08] p-5 cursor-pointer flex justify-between shadow-lg"
                    onClick={()=>setPageKey("3")}
                >
                    <p>
                        <li>Subscription & depenses</li>
                    </p>
                    <p className="font-extrabold group/edit invisible group-hover/item:visible">
                        >
                    </p>

                </a>
                <a
                    key="4"
                    className="group/item hover:bg-[#FFBA08] p-5 cursor-pointer flex justify-between shadow-lg"
                    onClick={()=>setPageKey("4")}
                >
                    <p>
                        <li>Invoices</li>
                    </p>
                    <p className="font-extrabold group/edit invisible group-hover/item:visible">
                        >
                    </p>
                </a>
            </ul>
        </div>
    )
}

export default Sidebar