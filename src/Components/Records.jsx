import Navigation from "./Navigation";
import { useState, useEffect } from "react";
import Modal from 'react-modal';
import { API_URL } from "../constants";
import axios from "axios";
import { Sidebar } from "flowbite-react";
import { LuGift } from 'react-icons/lu'
import { FiMoreVertical } from 'react-icons/fi'
import { Dropdown } from "flowbite-react";
import DeleteModal from "./DeleteModal";
import IconRenderer from "./IconRenderer";
import { getFormattedDate } from "../utils/DateFormat";
import AddCategoryModal from "./AddCategoryModal";
import { FaArrowRight } from 'react-icons/fa';
import { RiDeleteBinLine } from 'react-icons/ri';


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

const Records = () => {
    let subtitle;
    const [modalIsOpen, setIsOpen] = useState(false);
    const [amount, setAmount] = useState("10000");
    const [account, setAccount] = useState("Cash");
    const [currency, setCurrency] = useState("FCFA");
    const [color, setColor] = useState("Red");
    const [category, setCategory] = useState("Choose");
    const [label, setLabel] = useState("Choose");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [type, setType] = useState("expense")


    const [data, setData] = useState([]);
    const [cashReserves, setCashReserves] = useState([]);
    const [categories, setCategories] = useState([]);

    const [selectedId, setSelectedId] = useState("");
    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
    const [selectAll, setSelectAll] = useState("");
    const [total, setTotal] = useState(0);
    const [addModalIsOpen, setAddModalIsOpen] = useState(false);
    const [targetAccount, setTargetAccount] = useState(null);
    const [selectedIds, setSelectedIds] = useState([]);
    const [deleteAllRecords, setDeleteAllRecords] = useState(false);




    const [backgroundColor, setBackgroundColor] = useState("");

    const recordTypes = ["expense", "income", "transfer"];


    function addRecords() {
        const formData = {
            amount, currency, color, category, label, date, time,
            sourceAccount: account, type, targetAccount
        }
        axios.post(`${API_URL}/api/v1/add-expense`, formData).then((response) => {
            console.log(response.data);

            let dummy = data;
            setData([response.data.data, ...dummy]);
            closeModal();
        })
            .catch((response) => {
                console.log('error in the request')
                console.log(data);

                console.log("Error is");
                console.log(response)
            })
    }

    useEffect(() => {
        axios.get(`${API_URL}/api/v1/get-expenses`)
            .then((response) => {
                console.log("Data gotten from API")
                console.log(response.data);
                setData(response.data);
            });

        axios.get(`${API_URL}/api/v1/get-cashreserves`)
            .then((response) => {
                console.log("cashReserve gotten from API")
                console.log(response.data);
                setCashReserves(response.data)

                setAccount(response.data[0]._id)
            })

        axios.get(`${API_URL}/api/v1/get-category`)
            .then((response) => {
                console.log("Category gotten from API")
                console.log(response.data);
                setCategories(response.data);

                setCategory(response.data[0]._id)
            })
    }, []);

    useEffect(() => {
        if (account && cashReserves.length > 0) {
            for (let i = 0; i < cashReserves.length; i++) {
                if (cashReserves[i]._id === account) {
                    setBackgroundColor(cashReserves[i].color);
                }
            }
        }
    }, [account]);

    useEffect(() => {
        console.log(`Data changed, getting the total`);
        let total = 0;
        data.forEach((e) => {
            total += (e.type === 'expense' ? -1 : 1) * e.amount;
        })
        setTotal(total);
    }, [data])

    useEffect(() => {
        if (selectAll) {
            let array = data.map((e) => e._id);
            setSelectedIds(array);
        } else {
            setSelectedIds([]);
        }
    }, [selectAll]);


    const formatNumber = (num) => {
        return num.toLocaleString();
    };

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
        <div className="w-screen h-screen bg-[#eef0f2]" style={{ overflow: 'scroll' }}>
            <Navigation activeLink="records" />

            <AddCategoryModal
                isOpen={addModalIsOpen}
                onRequestClose={() => {
                    setAddModalIsOpen(false);
                }}
                onSuccess={(response) => {
                    console.log("category added successfully");
                    setCategories([...categories, response.data.data])
                    setAddModalIsOpen(false);
                }}
            />

            <DeleteModal
                isOpen={deleteModalIsOpen}
                onRequestClose={() => setDeleteModalIsOpen(false)}
                onDelete={() => {
                    console.log("about to delete");
                    axios.delete(`${API_URL}/api/v1/delete-expense/${selectedId}`)
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
            <DeleteModal
                isOpen={deleteAllRecords}
                onRequestClose={() => { setDeleteAllRecords(false) }}
                onDelete={() => {
                    console.log("about to delete");
                    axios.delete(`${API_URL}/api/v1/delete-expenses`, {
                        data: {
                            selectedIds
                        }
                    })
                        .then((response) => {
                            let deletedData = response.data.data;

                            let dummy = data;
                            dummy = dummy.filter((e) => {
                                return (
                                    !selectedIds.includes(e._id)
                                )
                            })
                            setData(dummy)

                            setDeleteAllRecords(false);
                        })
                        .catch((response) => {
                            console.log(response)
                        })
                }}
            />


            <div className="mt-4 px-6 flex-1 flex flex-row gap-3">
                <div className="h-screen bg-[#fafbfd] w-1/5 p-3 rounded-md flex flex-col gap-[24px]">
                    <h5 className="text-2xl font-bold">Records</h5>
                    <button className="rounded-full px-3 py-1 bg-[#FFB74D] text-white" onClick={() => openModal()}>+ Add</button>
                    <label for="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                        <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                    </div>
                    <div classNameName="flex flex-col px-3 py-1 gap-2">
                        <p>Cash reserve</p>
                        <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="all">All</option>
                            {
                                cashReserves.map((item, index) => <option value={item._id} key={index}>{item.name}</option>)
                            }
                        </select>
                    </div>
                    <div className="flex flex-col px-3 py-1 gap-2">
                        <p>Categories</p>
                        <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="all">All</option>
                            {
                                categories.map((item, index) => <option value={item._id} key={index}>{item.name}</option>)
                            }
                        </select>
                    </div>

                </div>

                <div className="flex-1 ">
                    <div className="flex flex-row justify-between px-6 py-2 bg-[#fafbfd] rounded-md items-center">
                        <div className="flex flex-row gap-2 items-center ">
                            <input type="checkbox" id="select_all_records"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                checked={selectAll}
                                onChange={(e) => {
                                    let checked = e.target.checked;
                                    setSelectAll(checked);
                                }} />
                            <label htmlFor="select_all_records">Select all</label>
                        </div>
                        <div className={`${total < 0 ? "text-red-500" : "text-green-500"}`}>
                            <span>FCFA</span>
                            <span>{formatNumber(total)}</span>
                        </div>
                        {selectedIds.length > 0 ? <div className="cursor-pointer"><RiDeleteBinLine color={"red"} onClick={() => { setDeleteAllRecords(true) }} /></div> : <></>}

                    </div>

                    <div className="flex flex-col gap-3 mt-4">
                        {
                            data.map((e, index) => {
                                let date = new Date(e.date);
                                let checked = selectedIds.some((id) => {
                                    return e._id == id
                                });

                                return (
                                    <div key={index} className=" flex flex-row justify-between items-center w-full px-6 py-3 rounded-md bg-white">
                                        <div className="flex flex-row gap-4 items-center">
                                            <input checked={checked} onChange={() => {
                                                if (checked) {
                                                    let array = selectedIds.filter((id) => id !== e._id);
                                                    setSelectedIds([...array]);
                                                } else {
                                                    setSelectedIds([...selectedIds, e._id]);
                                                }
                                            }} id="checked-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />

                                            <div className="w-[32px] h-[32px] p-2 rounded-full flex flex-row items-center" style={{
                                                backgroundColor: e.category.color

                                            }}>
                                                <IconRenderer name={e.category.icon} size={16} />
                                            </div>

                                            <div>
                                                <span>{e.category.name}</span>
                                            </div>

                                            <div className="flex flex-row gap-2 items-center">
                                                <span className="w-[5px] h-[5px] rounded-full bg-blue-600"></span>
                                                <span>{e?.sourceAccount?.name}</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-row items-center gap-2">
                                            <div>
                                                {getFormattedDate(date)}
                                            </div>

                                            <Dropdown label="" dismissOnClick={false} renderTrigger={() => <div className="cursor-pointer flex flex-row items-center gap-2">

                                                <p className={`${e.type == "expense" ? "text-red-500" : "text-green-500"} flex flex-row items-center`} >
                                                    <IconRenderer name={e.type == "expense" ? "minus" : "plus"} size={8} backgroundColor={e.type == "expense" ? "red" : "green"} />
                                                    {formatNumber(e.amount)}
                                                </p>
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
                            <div className="w-full flex flex-col gap-4 mt-2">
                                <div className="w-full p-3" style={{
                                    backgroundColor: backgroundColor ? backgroundColor : "00897b",
                                    transition: "all .4s ease-in-out"
                                }}>
                                    <div className="grid grid-cols-3 border-2 border-red-100 rounded-md">
                                        {
                                            recordTypes.map((item, index) => {
                                                return <span onClick={() => setType(item)} key={index} className={`text-center ${type === item ? 'bg-white' : ''} ${index + 1 < recordTypes.length ? 'border-r-2' : ''} border-red-100 cursor-pointer`}>{item[0].toUpperCase() + item.substring(1)}</span>
                                            })
                                        }
                                    </div>
                                    {
                                        type == "transfer" ? (
                                            <>
                                                <div className="flex flex-col gap-2 items-center">
                                                    <label htmlFor="">Amount</label>
                                                    <input type="text" name="amount" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-[#000] focus:border-[#000] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                                    <div className="flex flex-row gap-2 items-center w-full justify-between">
                                                        <div className="flex flex-col">
                                                            <label htmlFor="">From</label>
                                                            <select id="from" value={account} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                onChange={(e) => {
                                                                    console.log("Select changed value, the new value is ", e.target.value);
                                                                    setAccount(e.target.value)
                                                                }}>
                                                                {
                                                                    cashReserves.map((e, index) => <option value={e._id}>{e.name}</option>)
                                                                }
                                                            </select>
                                                        </div>
                                                        <FaArrowRight className="items-center" />
                                                        <div className="flex flex-col">
                                                            <label htmlFor="">To</label>
                                                            <select id="to" value={targetAccount} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                onChange={(e) => {
                                                                    console.log("Select changed value, the new value is ", e.target.value);
                                                                    setTargetAccount(e.target.value)
                                                                }}>
                                                                {
                                                                    cashReserves.map((e, index) => <option value={e._id}>{e.name}</option>)
                                                                }
                                                            </select>
                                                        </div>

                                                    </div>
                                                </div>

                                            </>
                                        ) : (
                                            <><div className="justify-center items-center mt-2">
                                                <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Account</label>
                                                <select id="countries" value={account} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    onChange={(e) => {
                                                        console.log("Select changed value, the new value is ", e.target.value);
                                                        setAccount(e.target.value)
                                                    }}
                                                >
                                                    {
                                                        cashReserves.map((e, index) => <option value={e._id}>{e.name}</option>)
                                                    }
                                                </select>
                                            </div>
                                                <div className="flex flex-row gap-2">
                                                    <div>
                                                        <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount</label>

                                                        <div class="relative">
                                                            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                                                {
                                                                    type == "expense" ? <IconRenderer backgroundColor="red" name={"minus"} size={16} /> : <IconRenderer backgroundColor="green" name={"plus"} size={16} />}
                                                            </div>
                                                            <input type="add" value={amount} id="default-add" className="items-center block w-full p-2.5 ps-10 text-sm text-right text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-12 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=" 0" required
                                                                onChange={(e) => {
                                                                    console.log("Select changed value, the new value is ", e.target.value);
                                                                    setAmount(e.target.value)
                                                                }}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="justify-center items-center">
                                                        <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Currency</label>
                                                        <select id="countries" value={currency} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                            onChange={(e) => {
                                                                console.log("Select changed value, the new value is ", e.target.value);
                                                                setCurrency(e.target.value)
                                                            }}
                                                        >
                                                            <option selected>XAF</option>
                                                        </select>
                                                    </div>

                                                </div></>
                                        )
                                    }

                                </div>

                                <div className="flex flex-col items-center">
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                                            <div className="flex flex-row items-center gap-1">
                                                <select id="category" value={category} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    onChange={(e) => {
                                                        console.log("Select changed value, the new value is ", e.target.value);
                                                        setCategory(e.target.value)
                                                    }}
                                                >
                                                    {
                                                        categories.map((e, index) => <option value={e._id}>{e.name}</option>)
                                                    }
                                                </select>
                                                <button onClick={() => setAddModalIsOpen(true)}>
                                                    < IconRenderer backgroundColor="grey" name={"plus"} size={18} />
                                                </button>

                                            </div>
                                        </div>
                                        <div>
                                            <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Labels</label>
                                            <select id="countries" value={label} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                onChange={(e) => {
                                                    console.log("Select changed value, the new value is ", e.target.value);
                                                    setLabel(e.target.value)
                                                }}
                                            >
                                                <option selected>Choose</option>
                                                <option value="Bank">Bank</option>
                                                <option value="Momo">Momo</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>
                                            <input id="countries" value={date} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                onChange={(e) => {
                                                    console.log("Select changed value, the new value is ", e.target.value);
                                                    setDate(e.target.value)
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Time</label>
                                            <input id="countries" value={time} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                onChange={(e) => {
                                                    console.log("Select changed value, the new value is ", e.target.value);
                                                    setTime(e.target.value)
                                                }} />
                                        </div>
                                    </div>
                                    <div className="mt-2 flex flex-col items-center justify-center ">
                                        <button className="text-white bg-[#3C5A64] w-full py-1 px-6 rounded-full"
                                            onClick={(e) => {
                                                e.preventDefault()
                                                addRecords()
                                            }}>Add record</button>
                                        <a href="Add and create another" className="underline mt-2">Add and create another</a>
                                    </div>
                                </div>
                            </div>

                            {/* form2 */}
                            {/* <div className="w-2/5 p-3 ">
                                <form>
                                    <label htmlFor="">Payer</label>
                                    <input id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                    <label htmlFor="">Note</label>
                                    <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a comment..."></textarea>

                                    <label htmlFor="">Payment type</label>
                                    <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full">
                                        <option selected>Cash</option>
                                        <option value="US">United States</option>
                                        <option value="CA">Canada</option>
                                        <option value="FR">France</option>
                                        <option value="DE">Germany</option>
                                    </select>
                                    <label htmlFor="">Payment status</label>
                                    <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full">
                                        <option selected>Cleared</option>
                                        <option value="US">United States</option>
                                        <option value="CA">Canada</option>
                                        <option value="FR">France</option>
                                        <option value="DE">Germany</option>
                                    </select>
                                    <label htmlFor="">Location</label>

                                    <div class="relative">
                                        <div class="absolute inset-y-0 end-2 flex items-center ps-3 pointer-events-none">
                                            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g clip-path="url(#clip0_15_152)"> <rect width="24" height="24" fill="white"></rect> <circle cx="10.5" cy="10.5" r="6.5" stroke="#867979" stroke-linejoin="round"></circle> <path d="M19.6464 20.3536C19.8417 20.5488 20.1583 20.5488 20.3536 20.3536C20.5488 20.1583 20.5488 19.8417 20.3536 19.6464L19.6464 20.3536ZM20.3536 19.6464L15.3536 14.6464L14.6464 15.3536L19.6464 20.3536L20.3536 19.6464Z" fill="#867979"></path> </g> <defs> <clipPath id="clip0_15_152"> <rect width="24" height="24" fill="white"></rect> </clipPath> </defs> </g></svg>
                                        </div>
                                        <input type="add" id="default-add" className="items-center block w-full p-2.5 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-12 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Name or address" required />
                                    </div>


                                </form>
                            </div> */}




                        </div>

                    </Modal>
                </div>
            </div >
        </div >
    )
}

export default Records;