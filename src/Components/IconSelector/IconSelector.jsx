import { useState, useEffect } from "react";
import { Dropdown } from "flowbite-react";
import { LuChevronDown } from "react-icons/lu";

import { categories } from "./iconNames";
import IconRenderer from "../IconRenderer";

export const IconSelector = ({
    onIconSelect,
    icon = null
}) => {
    const [selectedIcon, setSelectedIcon] = useState(icon ? icon : categories[0]);

    useEffect(() => {
        try {
            onIconSelect(selectedIcon)
        } catch (error) {
            console.error(error);
        }
    }, [selectedIcon]);

    return (
        <Dropdown label="" placement="bottom" dismissOnClick={true} renderTrigger={() => (
            <div className="w-full p-2 flex flex-row gap-1 rounded-md border border-gray-300 items-center cursor-pointer justify-between">
                <div style={{ transition: 'transform 100ms' }}>
                    <span>
                        <div
                            className="p-1 flex items-center justify-center cursor-pointer relative rounded-full"
                            style={{ boxShadow: `#26c6da 0px 0px 0px 15px inset`, transition: 'box-shadow 100ms' }}
                            title={selectedIcon}
                        >
                            <IconRenderer name={selectedIcon} size={20} />
                        </div>
                    </span>
                </div>

                <LuChevronDown size={20} />
            </div>
        )}>
            <div className="grid grid-cols-5 gap-3">
                {
                    categories.map((category, index) => {
                        return <div key={index} className="mb-2" style={{ transition: 'transform 100ms' }} onClick={() => {
                            setSelectedIcon(category);
                        }}>
                            <span>
                                <div
                                    className="p-2 cursor-pointer relative rounded-full"
                                    style={{ boxShadow: `#26c6da 0px 0px 0px 15px inset`, transition: 'box-shadow 100ms' }}
                                    title={category}
                                >
                                    <IconRenderer name={category} size={28} />
                                </div>
                            </span>
                        </div>
                    })
                }
            </div>
        </Dropdown>
    )
}