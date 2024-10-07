import React, { useState,getIncomes,incomes,totalIncome} from "react"
import axios from "axios"
import { expenses } from "../utils/Icons";
import axiosInstance from "../utils/axiosInstance";

const BASE_URL = "http://localhost:5000/api/v1/";

const GlobalContext = React.createContext()

export const GlobalProvider = ({ children }) => {
    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [error, setError] = useState([null])
//calculate Incomes
    const addIncome = async (income) => {
        const response = await axiosInstance.post(`${BASE_URL}add-income`, income)
            .catch((err) => {
                setError(err.response.data.message)
            })
        setIncomes(response.data.data)
         getIncomes()

    }
    const getIncomes = async() =>{
        const response = await axiosInstance.get(`${BASE_URL}get-income`)
        setIncomes(response.data)
        console.log(response.data)
    }
    const deleteIncome = async(id) =>{
        const response = await axiosInstance.delete(`${BASE_URL}delete-income/${id}`);
        console.log("response: ", response)
        setIncomes(response.data.data)
        console.log(response.data)
        getIncomes()
    }
//calculate expense
    const addExpense = async (income) => {
        const response = await axiosInstance.post(`${BASE_URL}add-expense`, income)
            .catch((err) => {
                setError(err.response.data.message)
            })
        setExpenses(response.data.data)
         getExpenses()

    }
    const getExpenses = async() =>{
        const response = await axiosInstance.get(`${BASE_URL}get-expenses`)
        setExpenses(response.data)
        console.log(response.data)
    }
    const deleteExpense= async(id) =>{
        const response = await axiosInstance.delete(`${BASE_URL}delete-expense/${id}`);
        console.log("response: ", response)
        setExpenses(response.data.data)
        console.log(response.data)
        getExpenses()
    }

    const totalIncome= () =>{
        let totalIncome = 0;
        incomes.forEach((income) =>{
            totalIncome = totalIncome + income.amount
        })
        console.log(`The total income is: ${totalIncome}`);
        return totalIncome;
    }

    const totalExpenses= () =>{
        let totalIncome = 0;
        expenses.forEach((income) =>{
            totalIncome = totalIncome + income.amount
        })
        console.log(`The total income is: ${totalIncome}`);
        return totalIncome;
    }

    const totalBalance = () =>{
        return totalIncome() - totalExpenses()
    }
    const transactionHistory = () =>{
        const history =[...incomes, ...expenses];
        console.log("The history is: ");
        console.log(history);
        history.sort((a,b)=>{
            return new Date(b.createdAt) - new Date(a.createdAt)
        })
        return history.slice(0,3)
    }
    return (
        <GlobalContext.Provider value={{
            addIncome,
            getIncomes,
            incomes,
            deleteIncome,
            totalIncome,
            expenses,
            addExpense,
            deleteExpense,
            getExpenses,
            totalExpenses,
            totalBalance,
            transactionHistory,
            error,
            setError

        }}>
            {children}
        </GlobalContext.Provider>
    )
}



export const useGlobalContext = () => {
    return React.useContext(GlobalContext)
}