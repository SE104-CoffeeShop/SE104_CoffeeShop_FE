import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'bottom' as const,
        },
    },
    scales: {
        x: {
            grid: {
                display: false,
            },
        },
        y: {
            beginAtZero: true,
            max: 1000, // Adjust this based on your data range
        },
    },
};

const generateLastSevenDays = () => {
    const today = new Date();
    const lastSevenDays = Array.from({ length: 7 }, (_, index) => {
        const pastDate = new Date(today);
        pastDate.setDate(today.getDate() - index);
        return pastDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    });

    return lastSevenDays.reverse();
};

const labels = generateLastSevenDays();

// TODO: add data
const generateDataForLastSevenDays = () => {
    return labels.map(() => Math.floor(Math.random() * 1000));
};

export const data = {
    labels,
    datasets: [
        {
            label: 'Doanh thu',
            data: generateDataForLastSevenDays(),
            backgroundColor: '#3758F9',
        },
    ],
};

export function RecentProfit() {
    return (
        <div className="mt-[0.89rem] flex h-fit w-full flex-col justify-start rounded-md bg-white pb-[1.56rem] pl-[4.56rem] pr-[5.06rem] pt-[1.63rem] drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
            <h1 className="select-none font-sans text-[1.5rem] font-bold">Doanh thu 7 ngày qua</h1>
            <Bar options={options} data={data} className="mt-[3.37rem] w-full self-center" />
        </div>
    );
}
