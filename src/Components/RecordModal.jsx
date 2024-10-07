import { useEffect, useState } from "react";
import { API_URL } from "../constants";
import axios from "axios";
import CashReserveSelect from "../CashReserveSelect";
import IconRenderer from "./IconRenderer";
import { Modal } from "flowbite-react";
import { FaArrowRight } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axiosInstance from "../utils/axiosInstance";

const RecordModal = ({
    isOpen,
    amount = 0,
    account,
    currency = "FCFA",
    cashReserves = [],
    category,
    type = "expense",
    categories = [],
    targetAccount = null,
    onRequestClose,
    onSuccess,
    date,
    addCategoryClick,
    setAmount,
    setAccount,
    setCurrency,
    setType,
    setTargetAccount,
    setDate,
    setCategory,
    id = null
}) => {
    const [backgroundColor, setBackgroundColor] = useState('#3C5A64');
    const [label, setLabel] = useState('');
    const [time, setTime] = useState('');

    const recordTypes = ["expense", "income", "transfer"];

    function addRecord() {
        const formData = {
            amount: amount,
            currency: currency,
            category: category,
            date: date,
            sourceAccount: account,
            type: type,
            targetAccount: targetAccount
        }

        let method, url;

        if (!id) {
            method = axiosInstance.post;
            url = `${API_URL}/api/v1/add-expense`;
        } else {
            method = axiosInstance.put;
            url = `${API_URL}/api/v1/update-expense/${id}`;
        }

        console.log("adding record, data...");
        console.log(formData);

        method(url, formData)
            .then((response) => {
                console.log("Data submitted successfully");
                try {
                    onSuccess(response);
                    onRequestClose();
                } catch (error) {
                    console.error(error);
                }
            })
            .catch((response) => {
            
                console.log('error in the request')
                console.log(response.data);

                console.log("Error is");
                console.log(response)
            })
    }

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
        if (categories.length) {
            setCategory(categories[0]._id);
        }
    }, [categories]);

    return (
        <>
            <Modal
                dismissible
                show={isOpen}
                onClose={onRequestClose}
            >
                <Modal.Header>{id ? "Modify " : "New "} Record</Modal.Header>

                <Modal.Body className="px-0 pt-0">
                    <div className="w-full h-full flex flex-row justify-center">
                        <div className="w-full flex flex-col gap-4 mt-2">
                            <div className="w-full p-3" style={{
                                backgroundColor: backgroundColor ? backgroundColor : "#00897b",
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
                                                        <CashReserveSelect
                                                            cashReserves={cashReserves}
                                                            value={account}
                                                            onChange={(e) => setAccount(e.target.value)}
                                                        />
                                                    </div>
                                                    <FaArrowRight className="items-center" />
                                                    <div className="flex flex-col">
                                                        <label htmlFor="">To</label>
                                                        <CashReserveSelect
                                                            cashReserves={cashReserves}
                                                            value={targetAccount}
                                                            onChange={(e) => setTargetAccount(e.target.value)}
                                                        />
                                                    </div>

                                                </div>
                                            </div>

                                        </>
                                    ) : (
                                        <div className="flex flex-col gap-3">
                                            <div className="justify-center items-center mt-2">
                                                <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Account</label>
                                                <CashReserveSelect
                                                    cashReserves={cashReserves}
                                                    value={account}
                                                    onChange={(e) => {
                                                        setAccount(e.target.value);
                                                    }}
                                                />
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

                                            </div>
                                        </div>
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
                                                    categories.map((e, index) => <option key={index} value={e._id}>{e.name}</option>)
                                                }
                                            </select>
                                            <button onClick={addCategoryClick}>
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

                                    <div className="items-center">
                                        <label for="date" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>
                                        {/* <input id="date" value={date} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            onChange={(e) => {
                                                console.log("Select changed value, the new value is ", e.target.value);
                                                setDate(e.target.value)
                                            }}
                                        /> */}
                                        <DatePicker className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 items-center dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                            selected={date} 
                                            onChange={(date)=>setDate(date)} 
                                            // showTimeSelect
                                        />
                                    </div>
                                </div>
                                <div className="mt-2 flex flex-col items-center justify-center ">
                                    <button className="text-white bg-[#3C5A64] w-full py-1 px-6 rounded-full"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            addRecord()
                                        }}>{id ? "Update " : "Add "} record</button>
                                    <a href="Add and create another" className="underline mt-2">Add and create another</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default RecordModal;