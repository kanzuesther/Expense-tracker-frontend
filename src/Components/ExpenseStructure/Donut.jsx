import React, { useEffect, useState, useRef } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = () => {
    const [hoveredSegment, setHoveredSegment] = useState(null);

    const chartRef = useRef(null);

    const data = {
        labels: [
            'Food & Drinks',
            'Transportation',
            'Communication, PC',
            'Housing',
            'Life & Entertainment',
            'Income',
            'Others',
            'Shopping',
        ],
        datasets: [
            {
                data: [17500, 29000, 31000, 500, 2000, 5500, 6000, 12500],
                backgroundColor: [
                    '#FF6384', // red
                    '#A9A9A9', // gray
                    '#36A2EB', // blue
                    '#FFCE56', // yellow
                    '#4CAF50', // green
                    '#FFA500', // orange
                    '#800020', // oxblood
                    '#87CEEB', // sky blue
                ],
                hoverOffset: 4,
            },
        ],
    };

    const total = data.datasets[0].data.reduce((acc, value) => acc + value, 0);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    usePointStyle: true,
                    pointStyle: 'circle'
                }
            },
            tooltip: {
                enabled: false,
            },
        },
        onHover: (event, chartElement) => {
            if (chartElement.length > 0) {
                const index = chartElement[0].index;
                const label = data.labels[index];
                const value = data.datasets[0].data[index];
                const percentage = ((value / total) * 100).toFixed(2) + '%';

                if (
                    !hoveredSegment ||
                    hoveredSegment.label !== label ||
                    hoveredSegment.value !== value
                ) {
                    console.log("Setting hovered segment to: ", { label, value, percentage });
                    setHoveredSegment({ label, value, percentage });
                }
            } else {
                if (hoveredSegment !== null) {
                    setHoveredSegment(null);
                }
            }
        },
    };

    const centerTextPlugin = {
        id: 'centerText',
        beforeDraw: (chart) => {
            const { ctx, width, height } = chart;
            ctx.save();
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.font = 'bold 16px Arial';
            const text = hoveredSegment
                ? `${hoveredSegment.label}\n${hoveredSegment.value}\n(${hoveredSegment.percentage})`
                : `Total: ${total}`;
            const lines = text.split('\n');
            lines.forEach((line, index) => {
                ctx.fillText(line, width / 2, height / 2 + (index * 20) - (lines.length - 1) * 10);
            });
            ctx.restore();
        },
    };

    useEffect(() => {
        if (chartRef.current) {
            chartRef.current.update();
        }
    }, [hoveredSegment]);

    return <Doughnut ref={chartRef} data={data} options={options} plugins={[centerTextPlugin]} />;
};

export default DonutChart;
