import React from "react"
import { Line } from 'react-chartjs-2';
import ProgressBar from "./Dashboard/ProgressBar.jsx";
import Revenues from "./Dashboard/Revenues.jsx"
import 'chart.js/auto';



const Dashboard = () => {



    return (
        <div>
            <ProgressBar />
            <Revenues />
        </div>
    )
}

export default Dashboard