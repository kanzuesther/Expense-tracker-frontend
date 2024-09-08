import axios from "axios";
import { useState, useEffect } from "react";
// import Modal from "react-modal";
import { API_URL } from "../constants";
import ColorSelector from "./ColorSelector";
import { IconSelector } from "./IconSelector/IconSelector";
import { Button, Modal } from 'flowbite-react';

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
// Modal.setAppElement('#root');

const CashReserveModal = ({
    name = "Cash",
    balance = 0,
    currency = "FCFA",
    color = "Red",
    icon = "Rent/Mortgage",
    id = null,
    isOpen,
    onAfterOpen,
    onRequestClose,
    onSuccess
}) => {
    const [nameState, setName] = useState(name);
    const [balanceState, setBalance] = useState(balance);
    const [currencyState, setCurrency] = useState(currency);
    const [colorState, setColor] = useState(color);
    const [iconState, setIconState] = useState(icon);
    const [idState, setId] = useState(id);

    function submitCashReserve() {
        let data = {
            name: nameState,
            balance: balanceState,
            currency: currencyState,
            color: colorState,
            icon: iconState
        };

        let method, url;

        if (!idState) {
            // new cash reserve
            method = axios.post;
            url = `${API_URL}/api/v1/add-cashreserves`;

            // axios.post(`${API_URL}/api/v1/add-cashreserves`, data).then((response) => {
            //     console.log('Cash reserve added successfully');
            //     console.log(response.data)
            //     onSuccess(response);
            // })
        } else {
            // modifying an existing cash reserv
            method = axios.put;
            url = `${API_URL}/api/v1/update-cashreserve/${idState}`;
        }

        method(url, data).then((response) => {
            console.log('Action completed');
            console.log(response.data);
            onSuccess(response);
        })
    }

    return (
        <Modal dismissible show={isOpen} onClose={() => onRequestClose()}>
            <Modal.Header>{idState ? "Modify " : "Add "} Cash Reserve</Modal.Header>
            <Modal.Body>
                <div className="w-full h-full flex flex-row justify-center">
                    <div className="w-full">
                        <form onSubmit={(e) => {
                            e.preventDefault()
                            submitCashReserve()
                        }} className="flex flex-col gap-3">
                            <div>
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
                            </div>

                            <div className="flex flex-row gap-3 items-center">
                                <div className="w-1/5">
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
                                </div>

                                <div className="w-4/5">
                                    <label htmlFor="">Balance</label>
                                    <input id="name" value={balanceState} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#000] focus:border-[#000] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        onChange={(e) => setBalance(e.target.value)}
                                    />
                                </div>
                            </div>


                            <div className="flex flex-row gap-3 items-center">
                                <div className="flex flex-col w-3/5">
                                    <label htmlFor="">Color</label>
                                    <ColorSelector onColorSelect={(color) => setColor(color)} />
                                </div>

                                <div className="flex flex-col w-2/5">
                                    <label>Icon</label>
                                    <IconSelector icon={iconState} onIconSelect={(icon) => setIconState(icon)} />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div className="w-full flex justify-end">
                    <Button className="bg-[#3C5A64] right" onClick={submitCashReserve}>
                        {idState ? 'Update' : 'Add'}
                    </Button>
                </div>
            </Modal.Footer>
        </Modal>
    )
}

export default CashReserveModal;