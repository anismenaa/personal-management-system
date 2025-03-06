import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";



const ProgressBar = () => {
    const [subscriptions, setSubscriptions] = useState([]);
    const currentDate = new Date();

    useEffect(() => {
        const getSubs = async () => {
            const subs = await axios.get('http://localhost:3000/statistics/titles')

            setSubscriptions(subs.data.titles)
        }

        getSubs()
    }, subscriptions);


    return (
        <div>
            <p className="text-xl mb-2 font-bold  ">Subscriptions </p>
            <div className="w-full bg-gray-200 p-4 flex items-center relative">
                <div className="absolute w-full h-1 bg-gray-300"></div>
                <div className="z-10 flex justify-around w-full">
                    {
                        subscriptions.map((subscription) => {
                            const dateOfSubscription = new Date(subscription.prelevDate);
                            const displayDate = new Date(dateOfSubscription.getFullYear(), currentDate.getMonth(), dateOfSubscription.getDate());

                            const isFutureDate = displayDate > currentDate;

                            const bgColor = isFutureDate ? 'bg-red-500' : 'bg-green-500';
                            const borderColor = isFutureDate ? 'border-red-500' : 'border-green-500';



                            return (
                                <div>
                                    <div
                                        className={`w-16 h-16 ${bgColor} rounded-full flex justify-center items-center shadow-lg border-2 ${borderColor} text-white font-bold text-xs text-center`}
                                    >
                                        {subscription.title}
                                    </div>
                                    <div className="text-xs ">
                                        {
                                            displayDate.toLocaleDateString("fr-FR")

                                        }
                                    </div>
                                </div>

                            );
                        })
                    }
                </div>

            </div>

        </div>

    )
}

export default ProgressBar;