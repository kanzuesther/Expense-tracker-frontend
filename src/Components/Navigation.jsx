import React from 'react'
import { LuLogOut } from 'react-icons/lu'
import { Link } from 'react-router-dom'
import { FaBars } from 'react-icons/fa';
import { Drawer } from 'flowbite-react';
import RecordModal from "./RecordModal"
import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../constants";
import AddCategoryModal from "./AddCategoryModal";



function Navigation({ activeLink = "dashboard" }) {

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
    const [selectedIds, setSelectedIds] = useState([]);
    const [deleteAllRecords, setDeleteAllRecords] = useState(false);
    const [targetAccount, setTargetAccount] = useState(null);





    const links = [
        {
            id: 1,
            name: "dashboard",
            text: "Dashboard",
            url: "/dashboard"
        },
        {
            id: 2,
            name: "records",
            text: "Records",
            url: "/records"
        },
        {
            id: 3,
            name: "cash-reserves",
            text: "Cash Reserves",
            url: "/cash-reserves"
        },
        {
            id: 4,
            name: "budgets",
            text: "Budgets",
            url: "/budgets"
        },
        {
            id: 5,
            name: "reminders",
            text: "Reminders",
            url: "/reminders"
        }
    ]

    const [drawerIsOpen, setDrawerIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        subtitle.style.color = '#000';
    }

    function closeModal() {
        setIsOpen(false);
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

    return (
        <div className="w-full px-3 md:px-6 xl:px-[80px] py-2 md:py-3 bg-white flex flex-row justify-between items-center">
            <div className="flex flex-row items-center gap-3">
                <button className='md:hidden' onClick={() => setDrawerIsOpen(true)}>
                    <FaBars />
                </button>
                <p>K-Wallet</p>
                {
                    links.map((item, index) => (
                        <a key={index} href={item.url} className={`hidden md:block ${item.name === activeLink ? 'font-bold text-xl' : ''}`}>{item.text}</a>
                    ))
                }
            </div>
            <div className="flex flex-row items-center gap-3">
                <button onClick={() => openModal()} className="rounded-md px-3 py-1 text-white font-medium text-lg bg-[#455A64] hidden md:block">
                    <span>+</span>
                    <span>{" "}Record</span>
                </button>
                <div className="flex flex-row gap-1 justify-center items-center">
                    <div className='mr-2 w-10 h-10 rounded-full bg-[#455A64] text-white shadow-lg flex items-center justify-center'>
                        <span>KK</span>
                    </div>
                    <Link to="/login">
                        <LuLogOut size={20} />
                    </Link>
                </div>
            </div>

            <Drawer open={drawerIsOpen} onClose={() => setDrawerIsOpen(false)}>
                <Drawer.Header title="Menu" titleIcon={() => <></>} />
                <Drawer.Items>
                    <div className='w-full flex flex-col items-center'>
                        {
                            links.map((item, index) => (
                                <a key={index} href={item.url} className={`w-full text-center py-2 rounded-md md:block ${item.name === activeLink ? 'bg-teal-50' : ''}`}>{item.text}</a>
                            ))
                        }
                    </div>
                </Drawer.Items>
            </Drawer>
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
                    console.log("Display sucess message", response.data)
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
        </div>
    )
}

export default Navigation