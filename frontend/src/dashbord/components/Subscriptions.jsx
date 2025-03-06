import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

const Subscriptions = () => {
    const [subscriptions, setSubscriptions] = useState([]);
    const [total, setTotal] = useState(0);
    const [addClicked, setAddClicked] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [prelevDate, setPrelevDate] = useState("");
    const [price, setPrice] = useState();
    const [active, setActive] = useState(false);
    const [loading, setLoading] = useState(false);


    const handleSavebtn = () => {
        const newSub = {
            title, description, prelevDate, price, active
        }

        setLoading(true);
        // we make the call using axios
        setTimeout(async () => {
            const subAdded = await axios.post('http://localhost:3000/subscriptions/add', newSub);

            if (subAdded) {
                setLoading(false)
                setAddClicked(false)
                setTitle("")
                setDescription("")
                setPrelevDate("")
                setPrice("")
                setActive(false);
            }
            else {console.log("error while adding a sub", subAdded);}
        }, 3000)

    }

    useEffect(() => {
        // make the call to get them
        const getSubscriptions = async () => {
            const subs = await axios.get('http://localhost:3000/subscriptions');
            const data = subs.data.subscriptions
            data.sort((a, b) => new Date(a.prelevDate)- new Date(b.prelevDate))
            const formatedData = data.map((sub) => {
                const prelevDate = new Date(sub.prelevDate)
                return {
                    ...sub,
                    prelevDate: prelevDate.getFullYear()+'-'+(new Date().getMonth() + 1) + '-'+prelevDate.getDate()
                };
            });

            setTotal((subs.data.total).toFixed(2))
            setSubscriptions(formatedData)
        }

        getSubscriptions();
    })



    return (
        <div className="static h-full ">
        {
            !addClicked && <div>
                <ul className="h-90 overflow-scroll shadow-lg inset-shadow-sm ring-cyan-500/50">
                    {
                        subscriptions.map((subscription) => (
                            <li key={subscription._id} className="flex justify-between p-5 mt-2 w-5/6 mx-auto drop-shadow-lg rounded-md shadow-lg inset-shadow-sm ring-cyan-500/50 hover:bg-[#3F88C5] hover:text-white">
                                <div className="">
                                    <p className="font-bold text-lg">{subscription.title}</p>
                                    <p>Prochain prélevement : <span className="text-gray-500 italic">{subscription.prelevDate}</span></p>
                                </div>
                                <div className="flex flex-col justify-end">
                                    <p className="text-xl italic font-bold">{subscription.price}</p>
                                    <p className="text-sm text-gray-500"> see more </p>
                                </div>
                            </li>
                        ))
                    }


                </ul>
                <p className="font-bold text-center text-lg p-5">Total: <span className="text-red-500">{total}</span></p>
                <button
                    className="font-bold px-3 py-2 rounded-xl bg-[#3F88C5] text-white absolute bottom-5 right-5 cursor-pointer hover:bg-[#8CACD3] hover:text-[#344D59]"
                    onClick={()=>setAddClicked(true)}
                >
                    Add Subscription
                </button>
            </div>
        }
            {
                addClicked &&
                <div className="static h-screen">
                    <form className="p-10 shadow-xl ring-sky-500 inset-shadow-sm flex justify-around gap-10">
                        <label>
                            <p>Title</p>
                            <input type="text" name="title" placeholder="Enter title" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </label>
                        <label>
                            <p>Description</p>
                            <textarea name="description" placeholder="Enter description" value={description} onChange={(e)=>setDescription(e.target.value)} />
                        </label>
                        <label>
                            <p>Due Date</p>
                            <input type="Date" name="dueDate" placeholder="Enter date" value={prelevDate} onChange={(e) => setPrelevDate(e.target.value)} />
                        </label>
                        <label>
                            <p>Price</p>
                            <input type="number" placeholder="Enter price" value={price} onChange={(e)=> setPrice(e.target.value)} />
                        </label>
                        <label>
                            <p>Active</p>
                            <input type="checkbox" name="active" checked={active} onChange={(e) => setActive(e.target.checked)} />
                        </label>
                    </form>
                    {loading && <div className="text-center p-10">
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
                                    setAddClicked(false)
                                }, 500)

                            }}
                        >
                            Return
                        </button>
                        <button
                            className="font-bold px-3 py-2 rounded-xl bg-[#3F88C5] text-white  cursor-pointer hover:bg-[#317AC1] hover:text-[#344D59]"
                            onClick={handleSavebtn}
                        >
                            Save
                        </button>
                    </div>
                </div>
            }
        </div>
    )
}

export default Subscriptions