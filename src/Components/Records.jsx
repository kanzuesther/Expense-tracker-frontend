import Navigation from "./Navigation";
import { useState, useEffect } from "react";
import Modal from 'react-modal';
import { API_URL } from "../constants";
import axios from "axios";
import { FiMoreVertical } from 'react-icons/fi'
import { Dropdown } from "flowbite-react";
import DeleteModal from "./DeleteModal";
import IconRenderer from "./IconRenderer";
import { getFormattedDate } from "../utils/DateFormat";
import AddCategoryModal from "./AddCategoryModal";
import { FaArrowRight } from 'react-icons/fa';
import RecordModal from "./RecordModal";
import axiosInstance from "../utils/axiosInstance";


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
    const [amount, setAmount] = useState(10000);
    const [account, setAccount] = useState("Cash");
    const [currency, setCurrency] = useState("FCFA");
    const [color, setColor] = useState("Red");
    const [category, setCategory] = useState("");
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
    const [filterCashReserve, setFilterCashReserve] = useState("all");
    const [filterCategory, setFilterCategory] = useState("all");
    const [filterData, setFilterData] = useState([]);

    const [recordId, setRecordId] = useState("");

    const [backgroundColor, setBackgroundColor] = useState("");

    const recordTypes = ["expense", "income", "transfer"];

    useEffect(() => {
        axiosInstance.get(`${API_URL}/api/v1/get-expenses`)
            .then((response) => {
                console.log("Data gotten from API")
                console.log(response.data);
                setData(response.data);
            });

        axiosInstance.get(`${API_URL}/api/v1/get-cashreserves`)
            .then((response) => {
                console.log("cashReserve gotten from API")
                console.log(response.data);
                setCashReserves(response.data)

                setAccount(response.data[0]._id)
            })

        axiosInstance.get(`${API_URL}/api/v1/get-category`)
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

    useEffect(() => {
        let filter1 = data;
        if (filterCashReserve) {
            filter1 = filter1.filter((e) => {
                    if (filterCashReserve == "all")
                        return e;
                    return e.sourceAccount._id == filterCashReserve
                 }
            )
        }

        if (filterCategory) {
            filter1 = filter1.filter((e) => {
                if (filterCategory == "all")
                    return e;
                return e.category._id == filterCategory
            })
        }

        setFilterData([...filter1]);



    }, [filterCashReserve, filterCategory, data]);

    useEffect(() => {
        console.log(`Amount changed to: `, amount);
    }, [amount]);


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
                    setIsOpen(true);
                }}
                onSuccess={(response) => {
                    console.log("category added successfully");
                    setCategories([...categories, response.data.data])
                    setAddModalIsOpen(false);
                    setIsOpen(true);
                }}
            />

            <DeleteModal
                isOpen={deleteModalIsOpen}
                onRequestClose={() => setDeleteModalIsOpen(false)}
                onDelete={() => {
                    console.log("about to delete");
                    axiosInstance.delete(`${API_URL}/api/v1/delete-expense/${selectedId}`)
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
                    axiosInstance.delete(`${API_URL}/api/v1/delete-expenses`, {
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
                    {/* <label for="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                        <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                    </div> */}
                    <div classNameName="flex flex-col px-3 py-1 gap-2">
                        <p>Cash reserve</p>
                        <select value={filterCashReserve} id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={(e) => {
                                console.log("Select changed value, the new value is ", e.target.value);
                                setFilterCashReserve(e.target.value)
                            }}>
                            <option value="all">All</option>
                            {
                                cashReserves.map((item, index) => <option value={item._id} key={index}>{item.name}</option>)
                            }
                        </select>
                    </div>
                    <div className="flex flex-col px-3 py-1 gap-2">
                        <p>Categories</p>
                        <select id="countries" value={filterCategory} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={(e) => {
                                console.log("Select changed value, the new value is ", e.target.value);
                                setFilterCategory(e.target.value)
                            }}>
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
                            filterData.map((e, index) => {
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

                                                    setAmount(e.amount);
                                                    setAccount(e.sourceAccount._id);
                                                    setCategory(e.category._id);
                                                    setDate(e.date);
                                                    setCurrency(e.currency);
                                                    setType(e.type);
                                                    
                                                    setIsOpen(true);
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

                    <RecordModal
                        isOpen={modalIsOpen}
                        amount={amount}
                        account={account}
                        cashReserves={cashReserves}
                        categories={categories}
                        targetAccount={targetAccount}
                        onRequestClose={() => {
                            console.log(`Setting isOpen to false`);
                            setIsOpen(false)
                        }}
                        onSuccess={(response) => {
                            console.log("Display sucess message",response.data)
                            let dummy = data;
                            let record = response.data.data;

                            dummy = dummy.filter((r) => {
                                return r._id !== record._id
                            })

                            setData([response.data.data, ...dummy]);
                            setSelectedId(null);
                        }}
                        date="2024-09-19 10:23"
                        category={category}
                        addCategoryClick={() => setAddModalIsOpen(true)}
                        setAccount={setAccount}
                        setAmount={setAmount}
                        setCurrency={setCurrency}
                        setType={setType}
                        setTargetAccount={setTargetAccount}
                        setDate={setDate}
                        setCategory={setCategory}
                        type={type}
                        id={selectedId}
                    />
                </div>
            </div >
        </div >
    )
}

export default Records;