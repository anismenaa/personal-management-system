import React, {useEffect} from 'react'
import axios from "axios";





const RestToPay = () => {
    const [rest, setRest] = React.useState(0);
    const [month, setMonth] = React.useState(new Date().getMonth());


    useEffect(() => {
        const getRest = async () => {
            const result = await axios.get(`http://localhost:3000/statistics/restpermonth/${month}`)
            setRest(result.data.restpermonth);
        }

        getRest()
    }, [month, rest])

    return (
        <div className="outline w-80 h-full text-white flex flex-col items-center justify-center p-5 mt-10 bg-[#1C3144]">
            <select onChange={(e) => {
                console.log(e.target.value);
                setMonth(e.target.value)
            }}
                    className="text-center">
                <option selected disabled>please select your month:</option>
                <option value={0}>January</option>
                <option value={1}>February</option>
                <option value={2}>March</option>
                <option value={3}>April</option>
                <option value={4}>May</option>
                <option value={5}>June</option>
                <option value={6}>July</option>
                <option value={7}>August</option>
            </select>
            <div className="text-2xl font-bold">Impaied : <span className="italic">{new Date(2025, month).toLocaleString("en-US", {month:'long'})}</span></div>
            <div className="flex-grow flex items-center justify-center">
                <div className="text-2xl font-extrabold text-red-500">{rest} €</div>
            </div>
        </div>
    )
}


export default RestToPay