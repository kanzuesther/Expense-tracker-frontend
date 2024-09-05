import axios from "axios";
import Navigation from "./Navigation";
import { useState, useEffect } from "react";
import Modal from 'react-modal';
import { API_URL } from "../constants";
import CashReserveModal from "./CashReserveModal";
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

const CashReserves = () => {
    let subtitle;
    const [modalIsOpen, setIsOpen] = useState(false);
    const [name, setName] = useState("Cash");
    const [balance, setBalance] = useState("");
    const [currency, setCurrency] = useState("FCFA");
    const [color, setColor] = useState("Red");

    const [data, setData] = useState([]);
    const [selectedId, setSelectedId] = useState("");
    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);

    useEffect(() => {
        axios.get(`${API_URL}/api/v1/get-cashreserves`)
            .then((response) => {
                console.log("Data gotten from API")
                console.log(response.data);
                setData(response.data)
            })
    }, []);


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
        <div className="w-screen h-screen bg-[#eef0f2] overflow-hidden">
            <Navigation activeLink="cash-reserves" />


            <div className="mt-4 px-6 flex-1 flex flex-row gap-3">
                <div className="h-screen bg-[#fafbfd] w-1/5 p-3 rounded-md flex flex-col gap-[24px]">
                    <h5 className="text-2xl font-bold">CashReserves</h5>
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
                                                onClick={() => {
                                                    setDeleteModalIsOpen(true);
                                                    setSelectedId(e._id);
                                                }}>
                                                <svg fill="grey" width="20px" height="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M5.755,20.283,4,8H20L18.245,20.283A2,2,0,0,1,16.265,22H7.735A2,2,0,0,1,5.755,20.283ZM21,4H16V3a1,1,0,0,0-1-1H9A1,1,0,0,0,8,3V4H3A1,1,0,0,0,3,6H21a1,1,0,0,0,0-2Z" /></svg>
                                            </button>
                                            <p>{e.name}</p>

                                        </div>
                                        <div>
                                            <p>{e.balance}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
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

            <DeleteModal 
                isOpen={deleteModalIsOpen} 
                onRequestClose={() => setDeleteModalIsOpen(false)}
                onDelete={() => {
                    console.log("about to delete");
                    axios.delete(`${API_URL}/api/v1/delete-cashreserves/${selectedId}`)
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
        </div>
    )
}

export default CashReserves;