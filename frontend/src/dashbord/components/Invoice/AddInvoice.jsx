import React from 'react'
import { useState } from 'react'
import axios from 'axios'




const AddInvoice = ({setAddClicked}) => {
    const [beginDate, setBeginDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [journeesUnpaied, setJourneesUnpaied] = useState([])
    const [totalInvoice, setTotalInvoice] = useState(0)

    const handleSearchBtn = async () => {
        console.log("begin date : ", beginDate)
        console.log("end date : ", endDate)
        // make the call
        const result = await axios.get("http://localhost:3000/invoices/getJournees", {
            params: {
                beginDate: beginDate,
                endDate: endDate,
            }
        })

        console.log(result)
        setJourneesUnpaied(result.data.journeesUnpaied)
        setTotalInvoice(result.data.totalUnpaied)
    }

    return (
        <div className="h-screen">
            <div className="relative h-3/4 shadow-lg inset-black-500 rounded-lg p-5">
                <div className="flex justify-around">
                    <label>
                        <p className="font-bold">Begin date :</p>
                        <input type="date" name="beginDate" value={beginDate} onChange={(e) => setBeginDate(e.target.value)} />
                    </label>
                    <label>
                        <p className="font-bold">End date :</p>
                        <input type="date" name="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                    </label>
                    <button
                        onClick={handleSearchBtn}
                        className="cursor-pointer"
                    >
                        <img src="./icons8-chercher.svg" className="h-5 w-5" />
                    </button>
                </div>

                <div className="h-3/4">
                    <table className="w-full overflow-y-scroll text-sm text-left rtl:text-right text-gray-500 ">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 w-1/8 ">
                                Day
                            </th>
                            <th scope="col" className="px-6 py-3 w-1/8 ">
                                Begin hour
                            </th>
                            <th scope="col" className="px-6 py-3 w-1/8 ">
                                End hour
                            </th>
                            <th scope="col" className="w-1/8 px-6 py-3">
                                Hours
                            </th>
                            <th scope="col" className="w-1/8 px-6 py-3">
                                Recette
                            </th>
                            <th scope="col" className="w-1/8 px-6 py-3">
                                Comissions
                            </th>
                            <th scope="col" className="w-1/8 px-6 py-3">
                                Total
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            journeesUnpaied.map(journee => (
                                <tr className="bg-white border-b border-gray-200">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                        {new Date(journee.date).toLocaleDateString()}
                                    </th>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                        {new Date(journee.begin).getHours()+":"+new Date(journee.begin).getMinutes()}
                                    </th>
                                    <td className="px-6 py-4">
                                        {new Date(journee.end).getHours()+":"+new Date(journee.end).getMinutes()}
                                    </td>
                                    <td className="px-6 py-4">
                                        {journee.nb_hours}
                                    </td>
                                    <td className="px-6 py-4">
                                        {journee.recette}
                                    </td>
                                    <td className="px-6 py-4">
                                        {journee.nb_comissions}
                                    </td>

                                    <td className="px-6 py-4">
                                        <span className="bg-yellow-300">{journee.total}</span>
                                    </td>
                                </tr>
                            ))
                        }

                        </tbody>
                    </table>

                    <div className="absolute bottom-5">
                        <p className="font-bold outline">Total: <span className="italic text-red-500">{totalInvoice}</span></p>
                    </div>
                </div>
            </div>



            <div className="absolute bottom-5 right-5 flex gap-2">
                <button
                    className="font-bold px-3 py-2 rounded-xl bg-[#3F88C5] text-white cursor-pointer hover:bg-[#8CACD3] hover:text-[#344D59]"
                    onClick={() => setAddClicked(false)}
                >
                    Download Invoice
                </button>
                <button
                    className="font-bold px-3 py-2 rounded-xl bg-green-500 text-white cursor-pointer hover:bg-[#8CACD3] hover:text-[#344D59]"
                    onClick={() => setAddClicked(false)}
                >
                    Save Invoice
                </button>
            </div>
        </div>
    )
}


export default AddInvoice