import { useState, useEffect } from "react";
import { Dropdown } from "flowbite-react";
import { LuChevronDown } from "react-icons/lu";

const ColorSelector = ({
    colors = ["#26c6da", "#0097a7", "#0d47a1", "#1565c0", "#455a64", "#6a1b9a","#FF6F61","#FFC1A1","#FFB300","#FF7043","#00ACC1","#26A69A","#FFF59D","#808000","#8B4513","#D35B27","#E97451"],
    onColorSelect
}) => {
    const [selectedColor, setSelectedColor] = useState(colors[0]);

    useEffect(() => {
        try {
            console.log(`Calling onColorSelect with argument ${selectedColor}`);
            onColorSelect(selectedColor);
        } catch (error) {
            console.error(error);
        }
    }, [selectedColor]);

    return (
        <Dropdown label="" placement="bottom" dismissOnClick={true} renderTrigger={() => (
            <div className="w-full p-3 flex flex-row gap-1 rounded-md border border-gray-300 items-center cursor-pointer">
                <span style={{ backgroundColor: selectedColor }} className="rounded-sm h-[12px] flex-1"></span>

                <LuChevronDown size={20} />
            </div>
        )}>
            <div className="grid grid-cols-5">
                {
                    colors.map((color, index) => {
                        return <div key={index} className="w-[28px] h-[28px] mb-2" style={{ transition: 'transform 100ms' }} onClick={() => {
                            setSelectedColor(color);
                        }}>
                            <span>
                                <div
                                    className="w-full h-full cursor-pointer relative rounded-full"
                                    style={{ boxShadow: `${color} 0px 0px 0px 15px inset`, transition: 'box-shadow 100ms' }}
                                    title={color}
                                />
                            </span>
                        </div>
                    })
                }
            </div>
        </Dropdown>
    )
}

export default ColorSelector;