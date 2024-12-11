import React, { useState, useEffect } from "react";
import Modal from 'react-modal';
import { Dropdown } from "flowbite-react";
import { FiMoreVertical, FiPieChart } from 'react-icons/fi';
import { HiCurrencyDollar } from 'react-icons/hi';
import { MdCategory } from 'react-icons/md';
import { RiDeleteBinLine } from 'react-icons/ri';

// Import your custom components and utilities
import Navigation from "./Navigation";
import DeleteModal from "./DeleteModal";
import axiosInstance from "../utils/axiosInstance";
import { API_URL } from "../constants";

// Modal styling
const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%,-50%)",
        backgroundColor: 'whitesmoke',
        borderRadius: '12px',
        width: '500px'
    },
};
Modal.setAppElement('#root');

const Budget = () => {
    // State variables
    const [modalIsOpen, setIsOpen] = useState(false);
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [cashreserve, setCashreserve] = useState("");
    const [amount, setAmount] = useState("2000");
    const [cycle, setCycle] = useState("Daily");

    const [categories, setCategories] = useState([]);
    const [selectedId, setSelectedId] = useState("");
    const [cashReserves, setCashReserves] = useState([]);
    const [currency, setCurrency] = useState("FCFA");
    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
    const [deleteAllModalIsOpen, setDeleteAllModalIsOpen] = useState(false);
    const [total, setTotal] = useState(0);

    const [data, setData] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [selectedIds, setSelectedIds] = useState([]);

    // Budget progress calculation
    const calculateBudgetProgress = ({budget, total_expenses}) => {
        const totalAmount = budget.amount;
        // Simulated spending - replace with actual backend logic
        const amountSpent = total_expenses
        
        const percentageSpent = (amountSpent / totalAmount) * 100;
        const percentageRemaining = 100 - percentageSpent;
        const amountRemaining = totalAmount - amountSpent;

        let progressColor = '#10B981'; // Green
        if (percentageSpent > 75) progressColor = '#EF4444'; // Red
        else if (percentageSpent > 50) progressColor = '#F59E0B'; // Yellow

        return {
            percentageRemaining: Math.max(0, percentageRemaining.toFixed(0)),
            amountRemaining,
            percentageSpent: Math.min(100, percentageSpent.toFixed(0)),
            progressColor
        };
    };

    // Add new budget
    const addBudget = (e) => {
        e.preventDefault();
        const formData = {
            name, 
            account: cashreserve, 
            category, 
            cycle,
            amount, 
            currency
        };

        axiosInstance.post(`${API_URL}/api/v1/add-budget`, formData)
            .then((response) => {
                const newBudget = response.data.data;
                const updatedData = [...data, newBudget];
                
                setData(updatedData);
                setTotal((prevTotal) => prevTotal + newBudget.amount);
                setIsOpen(false);
                
                // Reset form fields
                setName("");
                setAmount("2000");
                setCycle("Daily");
            })
            .catch((error) => {
                console.error("Error adding budget:", error);
                // Optional: Add error handling toast or alert
            });
    };

    // Delete single budget
    const deleteSingleBudget = () => {
        if (!selectedId) return;

        axiosInstance.delete(`${API_URL}/api/v1/delete-budget/${selectedId}`)
            .then((response) => {
                // Filter out the deleted budget
                const updatedData = data.filter(budget => budget._id !== selectedId);
                
                // Recalculate total
                const newTotal = updatedData.reduce((sum, budget) => sum + budget.amount, 0);
                
                // Update state
                setData(updatedData);
                setTotal(newTotal);
                setDeleteModalIsOpen(false);
                setSelectedId("");
            })
            .catch((error) => {
                console.error("Error deleting budget:", error);
                // Optional: Add error handling
            });
    };

    // Delete multiple budgets
    const deleteBulkBudgets = () => {
        if (selectedIds.length === 0) return;

        axiosInstance.delete(`${API_URL}/api/v1/delete-budgets`, {
            data: { selectedIds }
        })
        .then((response) => {
            // Filter out deleted budgets
            const updatedData = data.filter(budget => !selectedIds.includes(budget._id));
            
            // Recalculate total
            const newTotal = updatedData.reduce((sum, budget) => sum + budget.amount, 0);
            
            // Update state
            setData(updatedData);
            setTotal(newTotal);
            setDeleteAllModalIsOpen(false);
            
            // Reset selection
            setSelectedIds([]);
            setSelectAll(false);
        })
        .catch((error) => {
            console.error("Error deleting budgets:", error);
            // Optional: Add error handling
        });
    };

    // Toggle individual budget selection
    const toggleBudgetSelection = (budgetId) => {
        setSelectedIds(prev => 
            prev.includes(budgetId)
                ? prev.filter(id => id !== budgetId)
                : [...prev, budgetId]
        );
    };

    // Toggle select all budgets
    useEffect(() => {
        if (selectAll) {
            setSelectedIds(data.map(budget => budget._id));
        } else {
            setSelectedIds([]);
        }
    }, [selectAll, data]);

    // Fetch initial data
    useEffect(() => {
        // Fetch budgets
        axiosInstance.get(`${API_URL}/api/v1/get-budget`)
            .then((response) => {
                setData(response.data);
                console.log('Budgets gotten from API')
                console.log(response.data);
                const total = response.data.reduce((sum, {budget}) => sum + budget.amount, 0);
                setTotal(total);
            })
            .catch((error) => {
                console.error("Error fetching budgets:", error);
            });
        
        // Fetch cash reserves
        axiosInstance.get(`${API_URL}/api/v1/get-cashreserves`)
            .then((response) => {
                setCashReserves(response.data);
                setCashreserve(response.data[0]?._id);
            })
            .catch((error) => {
                console.error("Error fetching cash reserves:", error);
            });

        // Fetch categories
        axiosInstance.get(`${API_URL}/api/v1/get-category`)
            .then((response) => {
                setCategories(response.data);
                setCategory(response.data[0]?._id);
            })
            .catch((error) => {
                console.error("Error fetching categories:", error);
            });
    }, []);

    return (
        <div className="bg-[#f4f6f9] min-h-screen">
            <Navigation activeLink="budgets" />

            {/* Delete Single Budget Modal */}
            <DeleteModal
                isOpen={deleteModalIsOpen}
                onRequestClose={() => {
                    setDeleteModalIsOpen(false);
                    setSelectedId("");
                }}
                onDelete={deleteSingleBudget}
            />

            {/* Delete Multiple Budgets Modal */}
            <DeleteModal
                isOpen={deleteAllModalIsOpen}
                onRequestClose={() => setDeleteAllModalIsOpen(false)}
                onDelete={deleteBulkBudgets}
                message={`Are you sure you want to delete ${selectedIds.length} budget(s)?`}
            />

            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Budget Tracker</h1>
                    <button 
                        onClick={() => setIsOpen(true)}
                        className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                        <span>+ Create Budget</span>
                    </button>
                </div>

                {/* Dashboard Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500">Total Budget</p>
                                <h2 className="text-2xl font-bold text-gray-800">
                                    {total.toLocaleString()} FCFA
                                </h2>
                            </div>
                            <HiCurrencyDollar className="text-indigo-600 text-4xl" />
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500">Total Budgets</p>
                                <h2 className="text-2xl font-bold text-gray-800">{data.length}</h2>
                            </div>
                            <FiPieChart className="text-green-600 text-4xl" />
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500">Average Spending</p>
                                <h2 className="text-2xl font-bold text-gray-800">
                                    {(total / (data.length || 1)).toLocaleString()} FCFA
                                </h2>
                            </div>
                            <MdCategory className="text-purple-600 text-4xl" />
                        </div>
                    </div>
                </div>

                {/* Budget Breakdown */}
                <div className="bg-white rounded-xl shadow-md flex flex-col" style={{ height: "calc(100vh - 250px)" }}>
                    {/* Header */}
                    <div className="p-6 border-b flex-shrink-0 flex justify-between items-center">
                        <h3 className="text-xl font-semibold text-gray-800">Budget Breakdown</h3>
                        {selectedIds.length > 0 && (
                            <button 
                                onClick={() => setDeleteAllModalIsOpen(true)}
                                className="text-red-500 hover:text-red-700 flex items-center gap-2"
                            >
                                <RiDeleteBinLine /> Delete Selected
                            </button>
                        )}
                    </div>
                    
                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto">
                        {data.map(({budget, total_expenses}) => {
                            const progress = calculateBudgetProgress({budget, total_expenses});
                            return (
                                <div 
                                    key={budget._id} 
                                    className="px-6 py-4 border-b last:border-b-0 hover:bg-gray-50 transition-colors flex items-center"
                                >
                                    <input 
                                        type="checkbox"
                                        checked={selectedIds.includes(budget._id)}
                                        onChange={() => toggleBudgetSelection(budget._id)}
                                        className="mr-4 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                    />
                                    <div className="flex-1">
                                        <div className="flex justify-between items-center mb-2">
                                            <h4 className="font-semibold text-gray-800">{budget.name}</h4>
                                            <span className="text-sm text-gray-500">{budget.cycle}</span>
                                        </div>
                                        <div className="text-sm text-gray-600 mb-2">
                                            Initial Budget: {budget.amount.toLocaleString()} FCFA
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                                            <div 
                                                className="h-2.5 rounded-full" 
                                                style={{ 
                                                    width: `${progress.percentageSpent}%`, 
                                                    backgroundColor: progress.progressColor 
                                                }}
                                            />
                                        </div>
                                        <div className="flex justify-between text-sm text-gray-600">
                                            <span>{progress.percentageRemaining}% Remaining</span>
                                            <span>{(budget.amount - total_expenses)?.toLocaleString()} FCFA Left</span>
                                        </div>
                                    </div>
                                    <div className="ml-6">
                                        <Dropdown 
                                            label="" 
                                            dismissOnClick={false} 
                                            renderTrigger={() => (
                                                <div className="cursor-pointer">
                                                    <FiMoreVertical size={16} />
                                                </div>
                                            )}
                                        >
                                            <Dropdown.Item>Edit</Dropdown.Item>
                                            <Dropdown.Item 
                                                onClick={() => {
                                                    setSelectedId(budget._id);
                                                    setDeleteModalIsOpen(true);
                                                }}
                                            >
                                                Delete
                                            </Dropdown.Item>
                                        </Dropdown>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Add Budget Modal */}
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={() => setIsOpen(false)}
                    style={customStyles}
                    contentLabel="Add New Budget"
                >
                    <div className="p-8 w-[500px]">
                        <h2 className="text-2xl font-bold mb-6 text-center">Create New Budget</h2>
                        <form onSubmit={addBudget} className="space-y-4">
                            <div>
                                <label className="block mb-2 text-sm font-medium">Budget Name</label>
                                <input 
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-3 py-2 border rounded-lg"
                                    placeholder="Enter budget name"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium">Cash Reserve</label>
                                <select 
                                    value={cashreserve}
                                    onChange={(e) => setCashreserve(e.target.value)}
                                    className="w-full px-3 py-2 border rounded-lg"
                                    required
                                >
                                    {cashReserves.map((reserve) => (
                                        <option key={reserve._id} value={reserve._id}>
                                            {reserve.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium">Category</label>
                                <select 
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full px-3 py-2 border rounded-lg"
                                    required
                                >
                                    {categories.map((cat) => (
                                        <option key={cat._id} value={cat._id}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium">Amount</label>
                                <input 
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="w-full px-3 py-2 border rounded-lg"
                                    placeholder="Enter budget amount"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium">Cycle</label>
                                <select 
                                    value={cycle}
                                    onChange={(e) => setCycle(e.target.value)}
                                    className="w-full px-3 py-2 border rounded-lg"
                                >
                                    <option value="Daily">Daily</option>
                                    <option value="Weekly">Weekly</option>
                                    <option value="Monthly">Monthly</option>
                                    <option value="Yearly">Yearly</option>
                                </select>
                            </div>
                            <button 
                                type="submit" 
                                className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                            >
                                Create Budget
                            </button>
                        </form>
                    </div>
                </Modal>
            </div>
        </div>
    )
}

export default Budget;