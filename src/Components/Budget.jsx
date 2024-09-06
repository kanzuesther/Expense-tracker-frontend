import Navigation from "./Navigation";
import { useState, useEffect } from "react";
import Modal from 'react-modal';
import { API_URL } from "../constants";
import axios from "axios";
import { FaYoutube } from 'react-icons/fa';
import { FiMoreVertical } from 'react-icons/fi'
import { Dropdown } from "flowbite-react";
import DeleteModal from "./DeleteModal";


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

const Budget = () => {
    let subtitle;
    const [modalIsOpen, setIsOpen] = useState(false);
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [cashreserve, setCashreserve] = useState("");
    const [amount, setAmount] = useState("");
    const [cycle, setCycle] = useState("Daily");

    const [categories, setCategories] = useState([]);
    const [cashReserves, setCashReserves] = useState([]);
    const [currency, setCurrency] = useState("FCFA");
    const [selectedId, setSelectedId] = useState("");
    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
    const [total,setTotal]= useState(0);


    const [data, setData] = useState([]);

    function formatNumber(number) {
        return new Intl.NumberFormat().format(number);
      }

    function addBudget() {
        let formData = {
            name, account: cashreserve, category, cycle,
            amount, currency
        }
        console.log(`Posting..`)
        console.log(formData)

        axios.post(`${API_URL}/api/v1/add-budget`, formData).then((response) => {
            console.log(response.data);

            let dummy = data;
            dummy.push(response.data.data);
            setData(dummy)
            closeModal()
        })
    }

    useEffect(() => {
        axios.get(`${API_URL}/api/v1/get-budget`)
            .then((response) => {
                console.log("Budget gotten from API")
                console.log(response.data);
                setData(response.data);
               let total =0;
                response.data.forEach((e,index)=>{
                    total += e.amount;
                })
                setTotal(total)
            })
        axios.get(`${API_URL}/api/v1/get-cashreserves`)
            .then((response) => {
                console.log("Cash reserve gotten from API")
                console.log(response.data);
                setCashReserves(response.data)

                setCashreserve(response.data[0]._id)
            })

        axios.get(`${API_URL}/api/v1/get-category`)
            .then((response) => {
                console.log("Category gotten from API")
                console.log(response.data);
                setCategories(response.data)

                setCategory(response.data[0]._id)
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
            <Navigation activeLink="budgets" />

            <DeleteModal
                isOpen={deleteModalIsOpen}
                onRequestClose={() => setDeleteModalIsOpen(false)}
                onDelete={() => {
                    console.log("about to delete");
                    axios.delete(`${API_URL}/api/v1/delete-budget/${selectedId}`)
                        .then((response) => {
                            let deletedData = response.data.data;

                            let dummy = data;
                            dummy = dummy.filter((e) => {
                                return (
                                    e._id !== deletedData._id
                                )
                            })
                            setData(dummy)

                            setDeleteModalIsOpen(false);
                        })
                        .catch((response) => {
                            console.log(response)
                        })
                }}
            />


            <div className="mt-4 px-6 flex-1 flex flex-row gap-3">
                <div className="h-screen bg-[#fafbfd] w-1/5 p-3 rounded-md flex flex-col gap-[24px]">
                    <h5 className="text-2xl font-bold">Budget</h5>
                    <button className="rounded-full px-3 py-1 bg-[#FFB74D] text-white" onClick={() => openModal()}>+ Add</button>


                </div>

                <div className="flex-1 ">
                    <div className="flex flex-row justify-between px-6 py-2 bg-[#fafbfd] rounded-md items-center">
                        <div className="flex flex-row gap-2 items-center ">
                        <input id="checked-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label htmlFor="select_all_records">Select all</label>
                        </div>
                        <div>
                            <span>FCFA</span>
                            <span>{formatNumber(total)}</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 mt-4">
                        {
                            data.map((e, index) => {
                                return (
                                    <div key={index} className=" flex flex-row justify-between items-center w-full px-6 py-1 rounded-md bg-white">
                                        <div className="flex flex-row gap-4 items-center justify-center">
                                            <input id="checked-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />

                                            <div className="rounded-full p-1 flex flex-row justify-center items-center bg-red-600">
                                                <FaYoutube size={16} color="white" />
                                            </div>
                                            <span>{e?.category?.name}</span>
                                            <div className="flex flex-col">
                                                <div className="flex flex-row gap-2 items-center">
                                                    <span>{e.name}</span>
                                                </div>
                                                <div className="flex flex-row gap-2 items-center">
                                                    <span>{e.account?.name}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-row">
                                        <div className="flex flex-row gap-2 items-center">
                                                <span>{e.cycle}</span>
                                            </div>
                                            </div>
                                        <div className="flex flex-row items-center gap-2">
                                            <div className="flex flex-row gap-2 items-center">
                                                <span>{formatNumber(e.amount)}</span>
                                            </div>
                                            <Dropdown label="" dismissOnClick={false} renderTrigger={() => <div className="cursor-pointer">
                                                <FiMoreVertical size={16} />
                                            </div>}>
                                                <Dropdown.Item onClick={() => {
                                                    setSelectedId(e._id);
                                                }}>Edit</Dropdown.Item>
                                                <Dropdown.Item onClick={() => {
                                                    setSelectedId(e._id);

                                                    setDeleteModalIsOpen(true);
                                                }}>Delete</Dropdown.Item>
                                            </Dropdown>
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
                                    addBudget()
                                }}>
                                    <label htmlFor="">Name</label>
                                    <input id="name" value={name} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#000] focus:border-[#000] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        onChange={(e) => setName(e.target.value)}

                                    />

                                    <label htmlFor="">Cash-Reserve</label>
                                    <select id="cash-reserve" value={cashreserve} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#000] focus:border-[#000] block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full"
                                        onChange={(e) => {
                                            console.log("Select changed value, the new value is ", e.target.value);
                                            setCashreserve(e.target.value)
                                        }}
                                    >
                                        {
                                            cashReserves.map((e, index) => <option key={index} value={e._id}>{e.name}</option>)
                                        }
                                    </select>
                                    <label htmlFor="">Category</label>
                                    <select id="category" value={category} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#000] focus:border-[#000] block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full"
                                        onChange={(e) => {
                                            console.log("Select changed value, the new value is ", e.target.value);
                                            setCategory(e.target.value)
                                        }}
                                    >
                                        {
                                            categories.map((e, index) => <option key={index} value={e._id}>{e.name}</option>)
                                        }
                                    </select>

                                    <label htmlFor="">amount:</label>
                                    <input id="amount" value={amount} placeholder="Budget limit" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#000] focus:border-[#000] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        onChange={(e) => setAmount(e.target.value)}
                                    />

                                    <label htmlFor="">Cycle</label>
                                    <select id="cycle" value={cycle} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#000] focus:border-[#000] block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full"
                                        onChange={(e) => {
                                            console.log("Select changed value, the new value is ", e.target.value);
                                            setCycle(e.target.value)
                                        }}
                                    >
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

export default Budget;