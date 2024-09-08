import axios from "axios";
import { useState, useEffect } from "react";
import Modal from "react-modal";
import { API_URL } from "../constants";
import ColorSelector from "./ColorSelector";
import { IconSelector } from "./IconSelector/IconSelector";

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%,-50%)",
        backgroundColor: 'whitesmoke',
    },
};
Modal.setAppElement('#root');

const CashReserveModal = ({
    name = "Cash",
    balance = 0,
    currency = "FCFA",
    color = "Red",
    id = "",
    isOpen,
    onAfterOpen,
    onRequestClose,
    onSuccess
}) => {
    const [nameState, setName] = useState(name);
    const [balanceState, setBalance] = useState(balance);
    const [currencyState, setCurrency] = useState(currency);
    const [colorState, setColor] = useState(color);
    const [idState, setId] = useState(id);

    function addCashReserve() {
        axios.post(`${API_URL}/api/v1/add-cashreserves`, {
            name: nameState, 
            balance: balanceState, 
            currency: currencyState, 
            color: colorState
        }).then((response) => {
            console.log(response.data)
            onSuccess(response);
        })
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyles}
            contentLabel="Transfer, income and expense records"
            onAfterOpen={onAfterOpen}
        >
            <div className="w-full flex justify-end items-end">
                <button onClick={() => onRequestClose()} className="w-8 h-8 bg-[#3C5A64] rounded-full text-white shadow-md">X</button>
            </div>
            <div className="w-full h-full flex flex-row justify-center">
                {/* form2 */}
                <div className="w-full p-3 ">
                    <form onSubmit={(e) => {
                        e.preventDefault()
                        addCashReserve()
                    }}>
                        <label htmlFor="">Name</label>
                        <select id="name" value={nameState} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#000] focus:border-[#000] block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full"
                            onChange={(e) => {
                                console.log("Select changed value, the new value is ", e.target.value);
                                setName(e.target.value)
                            }}
                        >
                            <option value="Cash">Cash</option>
                            <option value="MoMo">Momo</option>
                            <option value="Bank">Bank</option>
                        </select>

                        <label htmlFor="">Currency</label>
                        <select id="currency" value={currencyState} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#000] focus:border-[#000] block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full"
                            onChange={(e) => {
                                console.log("Select changed value, the new value is ", e.target.value);
                                setCurrency(e.target.value)
                            }}
                        >
                            <option value="FCFA">FCFA</option>
                            <option value="USD">USD</option>
                            <option value="Naira">Naira</option>
                            <option value="Euro">Euro</option>
                            <option value="Pounds">Pounds</option>
                        </select>
                        <label htmlFor="">Balance</label>
                        <input id="name" value={balanceState} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#000] focus:border-[#000] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={(e) => setBalance(e.target.value)}
                        />


                        <label htmlFor="">Color</label>
                        <ColorSelector onColorSelect={(color) => setColor(color)} />

                        <label>Icon</label>
                        <IconSelector />

                        <div className="mt-2 flex flex-col items-center justify-center ">
                            <button className="text-white bg-[#3C5A64] w-full py-1 px-6 rounded-full">Add</button>
                        </div>
                    </form>
                </div>




            </div>

        </Modal>
    )
}

export default CashReserveModal;