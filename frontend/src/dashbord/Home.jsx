import React from "react";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/SideBar.jsx";
import Dashboard from "./components/Dashboard.jsx";
import DaysTable from "./components/Days.jsx";
import Subscriptions from "./components/Subscriptions.jsx";

const Home = () => {
    const [pageKey, setPageKey] = useState("1");

    return (
        <div>
            <Navbar />
            <div className="flex">
                <Sidebar setPageKey={setPageKey} pageKey={pageKey} />
                <div className="pt-20 w-4/5 p-3">
                    {
                        pageKey === "1" ? <Dashboard />
                            : pageKey === "2" ? <DaysTable />
                            : pageKey === "3" ? <Subscriptions />
                            : null
                    }
                </div>
            </div>
        </div>
    )
}

export default Home;