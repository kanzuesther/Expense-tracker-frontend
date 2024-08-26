import React from 'react';

const CashFlowCard = () => {
    const income = 105500;
    const expense = 133000;
    const netCashFlow = income - expense;
    const percentageChange = '>1000%';

    return (
        <div className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <div className="py-1">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Cash flow</h5>
            </div>
            <hr />
            <div className="mb-6 py-2">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-500">THIS MONTH</span>
                    <span className={`text-2xl font-bold ${netCashFlow < 0 ? 'text-red-500' : 'text-green-500'}`}>
                        {netCashFlow < 0 ? '-' : ''}FCFA {Math.abs(netCashFlow).toLocaleString()}
                    </span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-sm">vs previous period</span>
                    <span className="flex items-center text-red-500 text-sm">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                fillRule="evenodd"
                                d="M14.707 10.293a1 1 0 00-1.414 0L10 13.586l-3.293-3.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l4-4a1 1 0 000-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                        {percentageChange}
                    </span>
                </div>
            </div>
            <div className="mb-4">
                <div className="flex justify-between mb-1">
                    <span className="text-gray-500">Income</span>
                    <span className="text-gray-900">FCFA {income.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-md h-[32px]">
                    <div
                        className="bg-green-500 h-[32px] rounded-md"
                        style={{ width: `${(income / Math.max(income,expense)) * 100}%` }}
                    ></div>
                </div>
            </div>
            <div>
                <div className="flex justify-between mb-1">
                    <span className="text-gray-500">Expense</span>
                    <span className="text-gray-900">-FCFA {expense.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-md h-[32px]">
                    <div
                        className="bg-red-500 h-[32px] rounded-md"
                        style={{ width: `${(expense / Math.max(income,expense)) * 100}%` }}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default CashFlowCard;
