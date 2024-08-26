import React from "react";
import DonutChart from "./Donut";

const ExpenseStructureCard = () => {
    return (
        <div href="#" class="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <div className="py-1">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Expenses structure</h5>
            </div>
            <hr />

            <div className="flex flex-col mt-2">
                <div className="flex flex-row justify-between">
                    <h6>THIS MONTH</h6>
                    <span>vs previous period</span>
                </div>
                <div className="flex flex-row justify-between">
                    <h2 className="text-2xl font-bold">-FCFA 133,000</h2>
                    <div className="flex flex-row">
                        <div>
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 3C12.2652 3 12.5196 3.10536 12.7071 3.29289L19.7071 10.2929C20.0976 10.6834 20.0976 11.3166 19.7071 11.7071C19.3166 12.0976 18.6834 12.0976 18.2929 11.7071L13 6.41421V20C13 20.5523 12.5523 21 12 21C11.4477 21 11 20.5523 11 20V6.41421L5.70711 11.7071C5.31658 12.0976 4.68342 12.0976 4.29289 11.7071C3.90237 11.3166 3.90237 10.6834 4.29289 10.2929L11.2929 3.29289C11.4804 3.10536 11.7348 3 12 3Z" fill="#000000"></path> </g></svg>
                        </div>
                        <span>3%</span>
                    </div>
                </div>
            </div>
            <div className='pt-2'>
                <DonutChart />
            </div>
        </div>
    )
}

export default ExpenseStructureCard;