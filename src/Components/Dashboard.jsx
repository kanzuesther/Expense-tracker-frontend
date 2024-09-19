import Account from "./Account"
import BalanceTrendCard from "./BalanceTrend/BalanceTrendCard"
import CashFlowCard from "./CashFlowCard/CashFlowCard"
import ExpenseStructureCard from "./ExpenseStructure/ExpenseStructure"
import Navigation from "./Navigation"
import CashReserveModal from './CashReserveModal'
import { useState, useEffect } from "react"
import { MdAdd } from "react-icons/md"
import axios from "axios"
import { API_URL } from "../constants"
import IconRenderer from "./IconRenderer"
import { categories } from "./IconSelector/iconNames"


const Dashboard = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [cashReserves, setCashReserves] = useState([]);

function openModal() {
    console.log(`Setting isOpen to true`);
    setModalIsOpen(true);
}

function closeModal() {
    setModalIsOpen(false);
}

useEffect(() => {
    axios.get(`${API_URL}/api/v1/get-cashreserves`)
        .then((response) => {
            console.log("Cash reserves gotten from API")
            console.log(response.data);
            setCashReserves(response.data)
        })
}, []);

return (
    <div className="w-screen h-screen bg-[#eef0f2] overflow-auto pb-3" style={{ overflow: 'scroll' }}>
        <CashReserveModal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            onSuccess={(response) => {
                console.log("Cash reserve added successfully");
                setCashReserves([...cashReserves, response.data.data])
                closeModal();
            }}
        />

            <Navigation activeLink="dashboard" />

            <div className="bg-[#f9fbfd] w-full px-3 md:px-6 xl:px-[80px] py-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                {
                    cashReserves.map((item, index) => (
                        <Account
                            key={index}
                            name={item.name}
                            balance={item.balance}
                            backgroundColor={item.color}
                            icon={<IconRenderer name={item.icon} size={40} />} />
                    ))
                }
                <div className="p-2 gap-2 bg-transparent border-2 border-dashed flex flex-col justify-center rounded-md items-center hover:cursor-pointer"
                    onClick={() => openModal()}>
                    <span>+Add Account</span>
                </div>
            </div>

            <div className="w-full flex justify-center items-center mt-4 gap-3">
                <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option selected>Choose a country</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="FR">France</option>
                    <option value="DE">Germany</option>
                </select>
            </div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 px-3 md:px-6 xl:px-[80px] gap-3">
                <ExpenseStructureCard />
                <CashFlowCard />
                <BalanceTrendCard />
            </div>

            <button className='md:hidden h-[40px] w-[40px] bg-[#455A64] rounded-full fixed right-6 bottom-3 text-white shadow-lg flex flex-col justify-center items-center'>
                <MdAdd color='white' size={32} />
            </button>
        </div>
        )
}

  export default Dashboard;