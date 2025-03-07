import React from 'react'
import {useState, useEffect} from "react";
import axios from "axios";

const DaysTable = () => {
    const [days, setDays] = useState([]);
    const [addClicked, setAddClicked] = useState(false);
    const [date, setDate] = useState(Date());
    const [begin, setBegin] = useState("");
    const [end, setEnd] = useState("");
    const [recette, setRecette] = useState(0);
    const [price_hour, setPrice_hour] = useState(7.5);
    const [price_commission, setPrice_commission] = useState(20);
    const [number_commission, setNumber_commission] = useState(0);
    const [checked, setChecked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    useEffect( () => {
        // make the request to the server to get the dayz
        const fetchData = async () => {
            try {
                const result = await axios.get('http://localhost:3000/journee')
                const data = result.data.journees
                data.sort((a, b) => {

                    console.log(a.date - b.date)
                    return new Date(a.date) - new Date(b.date);
                })
                console.log(data)
                setDays(data);
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();

    }, [])

    const handleAddJournee = () => {
        setIsLoading(true);
        setTimeout(async ()=>{
            const postReq = await axios.post('http://localhost:3000/journee/add', {
                date: date,
                begin: begin,
                end: end,
                recette: recette,
                price_hour: price_hour,
                commission: price_commission,
                nb_comissions: number_commission,
                paied: checked

            })

            setIsLoading(false)
            console.log(postReq.data)
            alert("successfully added journee", postReq);
            setAddClicked(false);

        }, 3000)
    }

    return (
        <div className="static h-full">
            {!addClicked && <div>
                <div className="overflow-x-auto h-4/6 overflow-auto shadow-xl">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 w-1/8 ">
                                Paied ?
                            </th>
                            <th scope="col" className="px-6 py-3 w-1/8 ">
                                Day
                            </th>
                            <th scope="col" className="px-6 py-3 w-1/8 ">
                                Begins
                            </th>
                            <th scope="col" className="w-1/8 px-6 py-3">
                                Ends
                            </th>
                            <th scope="col" className="w-1/8 px-6 py-3">
                                Nb hours
                            </th>
                            <th scope="col" className="w-1/8 px-6 py-3">
                                Price/Hour
                            </th>
                            <th scope="col" className="w-1/8 px-6 py-3">
                                Comission value
                            </th>
                            <th scope="col" className="w-1/8 px-6 py-3">
                                Nb comissions
                            </th>
                            <th scope="col" className="w-1/8 px-6 py-3">
                                Recette
                            </th>
                            <th scope="col" className="w-1/8 px-6 py-3">
                                Total
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            days.map(day => (
                                <tr className="bg-white border-b border-gray-200">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                        {day.paied? "✅": "❌"}
                                    </th>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                        {new Date(day.date).toLocaleDateString('fr-FR')}
                                    </th>
                                    <td className="px-6 py-4">
                                        {new Date(day.begin).getHours()+":"+new Date(day.begin).getMinutes()}
                                    </td>
                                    <td className="px-6 py-4">
                                        {new Date(day.end).getHours()+":"+new Date(day.end).getMinutes()}
                                    </td>
                                    <td className="px-6 py-4">
                                        {day.nb_hours}
                                    </td>
                                    <td className="px-6 py-4">
                                        {day.price_hour}
                                    </td>
                                    <td className="px-6 py-4">
                                        {day.commission}
                                    </td>
                                    <td className="px-6 py-4">
                                        {day.nb_comissions}
                                    </td>
                                    <td className="px-6 py-4">
                                        {day.recette}
                                    </td>
                                    <td className="px-6 py-4">
                                        {day.total}
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </div>

                <button
                    className="font-bold px-3 py-2 rounded-xl bg-[#3F88C5] text-white absolute bottom-5 right-5 cursor-pointer hover:bg-[#8CACD3] hover:text-[#344D59]"
                    onClick={() => setAddClicked(true)}
                >
                    Add Day
                </button>
            </div>}
            {
                addClicked &&
                <div>
                    <form className="flex justify-around p-10 shadow-xl">
                        <div className="">
                            <label>
                                <p className="font-bold text-lg">Date : </p>
                                <input className="my-2 w-full" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                            </label>
                            <label>
                                <p className="font-bold text-lg">Begin : </p>
                                <input className="my-2 w-full" type="datetime-local" value={begin} onChange={(e) => setBegin(e.target.value)} required />
                            </label>
                            <label>
                                <p className="font-bold text-lg">End : </p>
                                <input className="my-2 w-full" type="datetime-local" value={end} onChange={(e) => setEnd(e.target.value)} required />
                            </label>

                            <label>
                                <p className="font-bold text-lg">Recette : </p>
                                <input className="my-2 w-full" type="number" value={recette} onChange={(e) => {setRecette(e.target.value)}}/>
                            </label>
                        </div>
                        <div>
                            <label>
                                <p className="font-bold text-lg">Price hour</p>
                                <input className="my-2 w-full" type="number" placeholder="Price hour" value={price_hour} onChange={(e)=>{setPrice_hour(e.target.value)}} required />
                            </label>
                            <label>
                                <p className="font-bold text-lg">Price comission</p>
                                <input className="my-2 w-full" type="number" placeholder="Price comission" value={price_commission} onChange={() => {setPrice_commission(20)}} />
                            </label>
                            <label>
                                <p className="font-bold text-lg">Number comissions</p>
                                <input className="my-2 w-full" type="number" placeholder="Number comissions" value={number_commission} onChange={(e)=>  {setNumber_commission(e.target.value)}} />
                            </label>
                            <label>
                                <p className="font-bold text-lg">Paied</p>
                                <input className="my-2 w-full" type="checkbox"  checked={checked} onChange={(e)=>  {setChecked(e.target.checked)}} />
                            </label>


                        </div>
                    </form>
                    {isLoading && <div className="text-center p-10">
                        <div role="status">
                            <svg aria-hidden="true"
                                 className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                 viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor"/>
                                <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentFill"/>
                            </svg>
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>}

                    <div className="absolute bottom-5 right-5 flex gap-5">
                        <button
                            className="font-bold px-3 py-2 rounded-xl bg-[#FFBA08] text-white  cursor-pointer hover:bg-[#E1A624] hover:text-[#344D59]"
                            onClick={() => {
                                setTimeout(()=>{
                                    alert("you're gonna quit adding a journee!")
                                    setAddClicked(false)
                                }, 1000)

                            }}
                        >
                            Return
                        </button>
                        <button
                            className="font-bold px-3 py-2 rounded-xl bg-[#3F88C5] text-white  cursor-pointer hover:bg-[#317AC1] hover:text-[#344D59]"
                            onClick={handleAddJournee}
                        >
                            Save
                        </button>
                    </div>
                </div>
            }
        </div>
    )
}

export default DaysTable