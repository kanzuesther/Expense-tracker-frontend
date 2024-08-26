import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const BalanceTrendCard = () => {
    const data = {
        labels: ['08/01', '08/07', '08/14', '08/21', '08/28'],
        datasets: [
            {
                label: 'Balance Trend',
                data: [340000, 320000, 370000, 310000, 328500],
                fill: true,
                backgroundColor: 'rgba(53, 162, 235, 0.2)',
                borderColor: 'rgba(53, 162, 235, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(53, 162, 235, 1)',
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: false,
                ticks: {
                    callback: function (value) {
                        return value >= 1000 ? value / 1000 + 'k' : value;
                    },
                    color: '#6b7280', // Text color for Y axis labels (Tailwind gray-500)
                },
                grid: {
                    color: '#e5e7eb', // Grid line color (Tailwind gray-200)
                },
            },
            x: {
                ticks: {
                    color: '#6b7280', // Text color for X axis labels (Tailwind gray-500)
                },
                grid: {
                    display: false,
                },
            },
        },
        plugins: {
            legend: {
                display: false,
            },
        },
        elements: {
            point: {
                radius: 0,
            },
        },
    };

    const percentageChange = '-8%';
    const currentBalance = 328500;

    return (
        <div href="#" class="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <div className="py-1">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Balance trend</h5>
            </div>
            <hr />
            
            <div className="mb-6 mt-2">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-500">TODAY</span>
                    <span className="text-2xl font-bold text-gray-900">
                        FCFA {currentBalance.toLocaleString()}
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
            <div>
                <Line data={data} options={options} />
            </div>
        </div>
    );
};

export default BalanceTrendCard;
