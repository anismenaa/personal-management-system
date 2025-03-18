import React from "react"
import { Line } from 'react-chartjs-2';
import ProgressBar from "./Dashboard/ProgressBar.jsx";
import Revenues from "./Dashboard/Revenues.jsx"
import Rest from "./Dashboard/RestToPay.jsx"
import 'chart.js/auto';
import DepenseSub from "./Dashboard/DepenseSub.jsx";



const Dashboard = () => {



    return (
        <div>
            <ProgressBar />
            <div className="flex justify-around">
                <Revenues />
                <Rest />
                <DepenseSub />
            </div>
            <div>
            </div>
        </div>
    )
}

export default Dashboard