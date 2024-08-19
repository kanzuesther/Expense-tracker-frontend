import React from 'react'
import {Chart as ChartJs, 
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js'

import {Line} from 'react-chartjs-2'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext'
import { dateFormat } from '../../utils/dateFormat'

ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
)

function Chart() {
    const {incomes, expenses} = useGlobalContext()

    // const data = {
    //     labels: incomes.map((inc) =>{
    //         const {date} = inc
    //         return dateFormat(date)
    //     }),
    //     datasets: [
    //         {
    //             label: 'Income',
    //             data: [
    //                 ...incomes.map((income) => {
    //                     const {amount} = income
    //                     return amount
    //                 })
    //             ],
    //             backgroundColor: 'green',
    //             tension: .2
    //         },
    //         {
    //             label: 'Expenses',
    //             data: [
    //                 ...expenses.map((expense) => {
    //                     const {amount} = expense
    //                     return amount
    //                 })
    //             ],
    //             backgroundColor: 'red',
    //             tension: .2
    //         }
    //     ]
    // }

    const labels = ['1', '2', '3', '4', '5', '6'];
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'dataset',
    
                data: [65, 59, 83, 89, 76, 55, 40],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(201, 203, 207, 0.2)'
                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)'
                ],
                borderWidth: 1
            }
        ]
    };


    return (
        <ChartStyled >
            <Line data={data} />
        </ChartStyled>
    )
}

const ChartStyled = styled.div`
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 1rem;
    border-radius: 20px;
    height: 100%;
`;

export default Chart