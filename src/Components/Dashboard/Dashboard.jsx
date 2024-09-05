import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import { InnerLayout } from '../../styles/Layouts';
import { dollar } from '../../utils/Icons';
import { useGlobalContext } from '../../context/globalContext';
import ChartComponent from '../Chart/Chart'
import History from '../History/History';

function Dashboard(){
    const {totalExpenses, totalIncome, incomes, expenses, totalBalance, getIncomes, getExpenses} = useGlobalContext()

    useEffect(()=>{
        getIncomes()
        getExpenses()
    },[])
    return(
        <DashboardStyled>
            <InnerLayout>
            <h1>All Transactions</h1>
                <div className="stats-con">
                    <div className="chart-con">
                        <ChartComponent />
                        <div className="amount-con">
                            <div className="income">
                                <h5>Total Income</h5>
                                <p>
                                    {dollar} {totalIncome()}
                                </p>
                            </div>
                            <div className="expense">
                            <h5>Total Expense</h5>
                                <p>
                                    {dollar} {totalExpenses()}
                                </p>
                            </div>
                            <div className="balance">
                                <h5>Total Balance</h5>
                                <p>
                                    {dollar} {totalBalance()}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="history-con">
                        <History/>
                        <h5 className='salary-title'>Min <span>Salary</span>Max</h5>
                        <div className="salary-item">
                            <p>
                                {Math.min(...incomes.map(item=> item.amount))}
                            </p>
                            <p>
                                {Math.max(...incomes.map(item=> item.amount))}
                            </p>
                        </div>
                        <h5 className='salary-title'>Min <span>Salary</span>Max</h5>
                        <div className="salary-item">
                            <p>
                                {Math.min(...expenses.map(item=> item.amount))}
                            </p>
                            <p>
                                {Math.max(...expenses.map(item=> item.amount))}
                            </p>
                        </div>
                    </div>
                </div>

            </InnerLayout>
        </DashboardStyled>
    )
}

const DashboardStyled = styled.div`
    .stats-con{
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 2rem;
        .chart-con{
            grid-column: 1 / 4;
            height: 400px;
            .amount-con{
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 2rem;
                margin-top: 2rem;
                .income, .expense{
                    grid-column: span 2;
                }
                .income, .expense, .balance{
                    background: #FCF6F9;
                    border: 2px solid #FFFFFF;
                    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                    border-radius: 20px;
                    padding: 1rem;
                    p{
                        font-size: 1rem;
                        font-weight: 700;
                    }
                }

                .balance{
                    grid-column: 2 / 4;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    p{
                        color: var(--color-green);
                        opacity: 0.6;
                        font-size: 1.5rem;
                    }
                }
            }
        }

        .history-con{
            grid-column: 4 / -1;
            h5{
                margin: 1rem 0;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            .salary-title{
                font-size: 1.2rem;
                span{
                    font-size: 1rem;
                }
            }
            .salary-item{
                background: #FCF6F9;
                border: 2px solid #FFFFFF;
                box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                padding: 1rem;
                border-radius: 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                p{
                    font-weight: 600;
                    font-size: 1.6rem;
                }
            }
        }
    }
`;

export default Dashboard