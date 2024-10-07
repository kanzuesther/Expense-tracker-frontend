import axios from "axios";
import { useState, useEffect } from "react";
import { API_URL } from "../constants";
import ColorSelector from "./ColorSelector";
import { IconSelector } from "./IconSelector/IconSelector";
import { Button, Modal } from 'flowbite-react';
import axiosInstance from "../utils/axiosInstance";



const extraCategory = ({
    name = "Cash",
    icon = "Rent/Mortgage",
    color = 'red',
    id = null,
    isOpen,
    onAfterOpen,
    onRequestClose,
    onSuccess
}) => {
    const [nameState, setName] = useState(name);
    const [colorState, setColor] = useState(color);
    const [iconState, setIconState] = useState(icon);
    const [idState, setId] = useState(id);

    function submitCategory() {
        let data = {
            name: nameState,
            icon: iconState,
            color: colorState,
        };

        let method, url;

        if (!idState) {
            // new cash reserve
            method = axiosInstance.post;
            url = `${API_URL}/api/v1/add-category`;
        } else {
            // modifying an existing cash reserv
            method = axiosInstance.put;
            url = `${API_URL}/api/v1/update-category/${idState}`;
        }

        method(url, data).then((response) => {
            console.log('Action completed');
            console.log(response.data);
            onSuccess(response);
        })
    }

    return (
        <Modal dismissible show={isOpen} onClose={() => onRequestClose()}>
            <Modal.Header>{idState ? "Modify " : "Add "} Category</Modal.Header>
            <Modal.Body>
                <div className="w-full h-full flex flex-row justify-center">
                    <div className="w-full">
                        <form onSubmit={(e) => {
                            e.preventDefault()
                            submitCategory()
                        }} className="flex flex-col gap-3">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="">Name</label>
                                <input type="text" value={nameState} id="name" className="items-center block w-full p-2.5 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-12 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required
                                 onChange={(e) => setName(e.target.value)} />
                            </div>

                            <div className="flex flex-row gap-3 items-center">
                                <div className="flex flex-col w-3/5">
                                    <label htmlFor="">Color</label>
                                    <ColorSelector value={color} onColorSelect={(color) => setColor(color)} 
                                     onChange={(e) => setColor(e.target.value)}/>
                                </div>

                                <div className="flex flex-col w-2/5">
                                    <label>Icon</label>
                                    <IconSelector value={icon} icon={iconState} onIconSelect={(icon) => setIconState(icon)}
                                     onChange={(e) => setIcon(e.target.value)} />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div className="w-full flex justify-end">
                    <Button className="bg-[#3C5A64] right" onClick={submitCategory}>
                        {idState ? 'Update' : 'Add'}
                    </Button>
                </div>
            </Modal.Footer>
        </Modal>
    )
}

export default extraCategory;