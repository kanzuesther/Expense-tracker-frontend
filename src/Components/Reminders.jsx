import Navigation from "./Navigation";
import { useEffect, useState } from "react";
import Modal from 'react-modal';
import axios from "axios";
import { API_URL } from "../constants";

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%,-50%)",
        backgroundColor: 'whitesmoke'
    },
};
Modal.setAppElement('#root');

const Reminders = () => {
    let subtitle;
    const [modalIsOpen, setIsOpen] = useState(false);
    const [name, setName] = useState(false);
    const [cycle, setCycle] = useState("Daily");
    const [cashreserve, setCashreserve] = useState("Cash");
    const [amount, setAmount] = useState(false);
    const [date, setDate] = useState(false);

    const [data, setData] = useState([]);
    const [cashReserves, setCashReserves] = useState([]);


    function addReminder() {
        axios.post(`${API_URL}/api/v1/add-reminder`, {
            name, cycle,date,amount,cashreserve
        }).then((response) => {
            console.log(response.data);

            let dummy = data;
            dummy.push(response.data.data);
            setData(dummy)
            closeModal()
        })
    }

    useEffect(() => {
        axios.get(`${API_URL}/api/v1/get-reminder`)
            .then((response) => {
                console.log("Data gotten from API")
                console.log(response.data);
                setData(response.data)
            })
            axios.get(`${API_URL}/api/v1/get-cashreserves`)
            .then((response) => {
                console.log("Data gotten from API")
                console.log(response.data);
                setCashReserves(response.data)

                // setAccount(response.data[0]._id)
            })
    }, []);


    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        subtitle.style.color = '#000';
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <div className="w-screen h-screen bg-[#eef0f2] overflow-hidden">
            <Navigation activeLink="reminders" />


            <div className="mt-4 px-6 flex-1 flex flex-row gap-3">
                <div className="h-screen bg-[#fafbfd] w-1/5 p-3 rounded-md flex flex-col gap-[24px]">
                    <h5 className="text-2xl font-bold">Reminders</h5>
                    <button className="rounded-full px-3 py-1 bg-[#FFB74D] text-white" onClick={() => openModal()}>+ Add</button>


                </div>

                <div className="flex-1 ">
                    <div className="flex flex-row justify-between px-6 py-2 bg-[#fafbfd] rounded-md items-center">
                        <div className="flex flex-row gap-2 items-center ">
                            <input type="checkbox" id="select_all_records" />
                            <label htmlFor="select_all_records">Select all</label>
                        </div>
                        <div>
                            <span>FCFA</span>
                            <span>35000</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 mt-4">
                        {
                            data.map((e, index) => {
                                return (
                                    <div key={index} className=" flex flex-row justify-between items-center w-full px-6 py-3 rounded-md bg-white">
                                        <div className="flex flex-row gap-3 items-center">
                                            <button 
                                            onClick={()=>{
                                                console.log("about to delete")
                                                axios.delete(`${API_URL}/api/v1/delete-reminder/${e._id}`)
                                                .then((response) => {
                                                    console.log("Deletion complete");
                                                    let deletedData = response.data.data;
                                                    
                                                    let dummy = data;
                                                    dummy =dummy.filter((e,index)=>{
                                                        return(
                                                            e._id!==deletedData._id
                                                        )
                                                    })
                                                    setData(dummy)

                                                })
                                                .catch((response)=>{
                                                    console.log(response)
                                                })
                                            }}>
                                                <svg fill="grey" width="20px" height="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M5.755,20.283,4,8H20L18.245,20.283A2,2,0,0,1,16.265,22H7.735A2,2,0,0,1,5.755,20.283ZM21,4H16V3a1,1,0,0,0-1-1H9A1,1,0,0,0,8,3V4H3A1,1,0,0,0,3,6H21a1,1,0,0,0,0-2Z" /></svg>
                                            </button>
                                            <p>{e.name}</p>

                                        </div>
                                        <div>
                                            <p>{e.cashreserve}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>

                    <Modal
                        isOpen={modalIsOpen}
                        onAfterOpen={afterOpenModal}
                        onRequestClose={closeModal}
                        style={customStyles}
                        contentLabel="Transfer, income and expense records"
                    >
                        <div className="w-full flex justify-end items-end">
                            <button onClick={() => closeModal()} className="w-8 h-8 bg-[#3C5A64] rounded-full text-white shadow-md">X</button>
                        </div>
                        <div className="w-full h-full flex flex-row justify-center">
                            {/* form2 */}
                            <div className="w-full p-3 ">
                                <form onSubmit={(e) => {
                                    e.preventDefault()
                                    addReminder()
                                }}>
                                    <label htmlFor="">Name:</label>
                                    <input id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#000] focus:border-[#000] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />

                                    <label htmlFor="">Cash-reserve</label>
                                    <select id="cash-reserve" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#000] focus:border-[#000] block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full">
                                        <option selected>Cash</option>
                                        <option value="momo">Momo</option>
                                        <option value="bank">Bank</option>
                                    </select>
                                    <label htmlFor="">Amount</label>
                                    <input id="amount" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#000] focus:border-[#000] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />

                                    <label htmlFor="">Date</label>
                                    <input id="date" type='date' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#000] focus:border-[#000] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />

                                    <label htmlFor="">Cycle</label>
                                    <select id="cycle" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#000] focus:border-[#000] block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full">
                                        <option selected>Daily</option>
                                        <option value="weekly">Weekly</option>
                                        <option value="monthly">Monthly</option>
                                        <option value="yearly">Yearly</option>
                                    </select>
                                    <div className="mt-2 flex flex-col items-center justify-center ">
                                        <button className="text-white bg-[#3C5A64] w-full py-1 px-6 rounded-full">Add</button>
                                    </div>
                                </form>
                            </div>




                        </div>

                    </Modal>
                </div>
            </div>
        </div>
    )
}

export default Reminders;