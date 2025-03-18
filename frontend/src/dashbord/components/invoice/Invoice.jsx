import React from "react"
import {useState} from "react";
import AddInvoice from "./AddInvoice.jsx";



const Invoice = () => {
    const [addClicked, setAddClicked] = useState(false);
    return (
        <div>
            <div>
                {
                    addClicked && <AddInvoice setAddClicked={setAddClicked} />
                }
            </div>

            <div>
                {
                    !addClicked &&
                    <div>
                        <button
                            className="font-bold px-3 py-2 rounded-xl bg-[#3F88C5] text-white absolute bottom-5 right-5 cursor-pointer hover:bg-[#8CACD3] hover:text-[#344D59]"
                            onClick={() => setAddClicked(true)}
                        >
                            Add Invoice
                        </button>
                    </div>
                }
            </div>

        </div>
    )
}


export default Invoice