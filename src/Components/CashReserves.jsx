import axios from "axios";
import Navigation from "./Navigation";
import { useState, useEffect } from "react";
import { API_URL } from "../constants";
import CashReserveModal from "./CashReserveModal";
import DeleteModal from "./DeleteModal";
import { MdAdd } from "react-icons/md";
import { Dropdown } from "flowbite-react";
import { LuGift } from "react-icons/lu";
import { FiMoreVertical } from 'react-icons/fi'
import { RiDeleteBinLine } from 'react-icons/ri'
import IconRenderer from "./IconRenderer";
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
// Modal.setAppElement('#root');

const CashReserves = () => {
    let subtitle;
    const [modalIsOpen, setIsOpen] = useState(false);
    const [data, setData] = useState([]);
    const [selectedId, setSelectedId] = useState("");
    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
    const [total, setTotal] = useState(0);

    const [selectAll, setSelectAll] = useState(false);
    const [selectedIds, setSelectedIds] = useState([]);
    const [deleteAllRecords, setDeleteAllRecords] = useState(false);



    useEffect(() => {
        axiosInstance.get(`${API_URL}/api/v1/get-cashreserves`)
            .then((response) => {
                console.log("CashReserve gotten from API")
                console.log(response.data);
                setData(response.data)

                let total = 0;
                response.data.forEach((e, index) => {
                    console.log(`${e.balance} to float: ${parseFloat(e.balance)}`)
                    total += parseFloat(e.balance);
                })
                setTotal(total);
            })
    }, []);

    useEffect(() => {
        if (selectAll) {
            let array = data.map((e) => e._id);
            setSelectedIds(array);
        } else {
            setSelectedIds([]);
        }
    }, [selectAll]);

    useEffect(() => {
        console.log(`Selected ids changed to`);
        console.log(selectedIds);
        if (selectedIds.length == data.length) {
            setSelectAll(true);
        }
    }, [selectedIds]);

    const formatNumber = (num) => {
        return num.toLocaleString();
    };

    function openModal() {
        console.log(`Setting isOpen to true`);
        setIsOpen(true);
    }

    function afterOpenModal() {
        subtitle.style.color = '#000';
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <div className="w-screen h-screen bg-[#eef0f2] overflow-hidden" style={{ overflow: 'scroll' }}>
            <Navigation activeLink="cash-reserves" />

            <DeleteModal
                isOpen={deleteModalIsOpen}
                onRequestClose={() => setDeleteModalIsOpen(false)}
                onDelete={() => {
                    console.log("about to delete");
                    axiosInstance.delete(`${API_URL}/api/v1/delete-cashreserves/${selectedId}`)
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
                    axiosInstance.delete(`${API_URL}/api/v1/delete-cashreserve`, {
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
                <div className="hidden md:block h-screen bg-[#fafbfd] w-1/5 p-3 rounded-md flex flex-col gap-[24px]">
                    <h5 className="text-2xl font-bold">CashReserves</h5>
                    <button className="rounded-full px-3 py-1 bg-[#FFB74D] text-white" onClick={() => openModal()}>+ Add</button>


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
                        <div>
                            <span>FCFA</span>
                            <span>{formatNumber(total)}</span>
                        </div>
                        {selectedIds.length > 0 ? <div className="cursor-pointer"><RiDeleteBinLine color={"red"} onClick={() => { setDeleteAllRecords(true) }} /></div> : <></>}

                    </div>

                    <div className="flex flex-col gap-3 mt-4">
                        {
                            data.map((e, index) => {
                                let checked = selectedIds.some((id) => {
                                    return e._id == id
                                });
                                return (
                                    <div key={index} className=" flex flex-row justify-between items-center w-full px-6 py-3 rounded-md bg-white">
                                        <div className="flex flex-row gap-4 items-center">
                                            <input checked={checked} onChange={() => {
                                                console.log(`Input changed, checked? ${checked}`)
                                                if (checked) {
                                                    let array = selectedIds.filter((id) => id !== e._id);
                                                    setSelectedIds([...array]);
                                                } else {
                                                    setSelectedIds([...selectedIds, e._id]);
                                                }
                                            }} id="checked-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                            <div className="flex flex-row items-center gap-2">
                                                <span className="rounded-full p-1 " style={{ backgroundColor: e.color }}><IconRenderer name={e.icon} backgroundColor={'white'} size={16} /></span>
                                                <span>{e.name}</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-row items-center gap-2">
                                            <p>{formatNumber(parseFloat(e.balance))}</p>
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

                    <button onClick={openModal} className='md:hidden h-[40px] w-[40px] bg-[#455A64] rounded-full fixed right-6 bottom-3 text-white shadow-lg flex flex-col justify-center items-center'>
                        <MdAdd color='white' size={32} />
                    </button>
                </div>
            </div>

            <CashReserveModal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                onSuccess={(response) => {
                    let dummy = data;
                    console.log('In onSuccess, the response data is');
                    console.log(response.data);

                    dummy.push(response.data.data);
                    setData(dummy);
                    closeModal();
                }}
            />
        </div>
    )
}

export default CashReserves;