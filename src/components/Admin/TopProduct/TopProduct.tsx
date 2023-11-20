import React, { useState } from 'react';
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

interface TopProduct {
    productName: string;
    sales: number;
    revenue: number;
}

const generateTopProductsData = (
    selectedMetric: 'sales' | 'revenue',
): { labels: string[]; data: number[] } => {
    const topProductsData: TopProduct[] = [
        { productName: 'Trà sữa kem trứng cháy', sales: 1200, revenue: 2400 },
        { productName: 'Trà lài', sales: 750, revenue: 1500 },
        { productName: 'Cà phê muối', sales: 453, revenue: 1257 },
        { productName: 'Trà đào', sales: 500, revenue: 1400 },
        { productName: 'Matcha đá xay', sales: 275, revenue: 1700 },
    ];

    const labels = topProductsData.map((product) => product.productName);
    const data = topProductsData.map((product) =>
        selectedMetric === 'sales' ? product.sales : product.revenue,
    );

    return { labels, data };
};

function TopProducts() {
    const [selectedMetric, setSelectedMetric] = useState<'sales' | 'revenue'>('sales');
    const [selectedTimeRange, setSelectedTimeRange] = useState<
        'day' | 'week' | 'month' | 'quarter' | 'year'
    >('day');

    const handleMetricChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedMetric(event.target.value as 'sales' | 'revenue');
    };

    const handleTimeRangeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedTimeRange(event.target.value as 'week' | 'month' | 'quarter' | 'year');
    };

    const topProducts = generateTopProductsData(selectedMetric);

    const topProductsData = {
        labels: topProducts.labels,
        datasets: [
            {
                label: selectedMetric === 'sales' ? 'Số lượng bán' : 'Doanh thu',
                data: topProducts.data,
                backgroundColor: '#3758F9',
                barThickness: 25,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom' as const,
            },
        },
        scales: {
            x: {
                grid: {
                    display: true,
                },
            },
            y: {
                max: 1000,
                ticks: {
                    beginAtZero: true,
                    stepSize: 100,
                    callback: (value: any, index: number) => {
                        if (selectedMetric === 'sales') {
                            return topProducts.labels[index];
                        }
                        if (selectedMetric === 'revenue') {
                            return topProducts.labels[index];
                        }
                        return value;
                    },
                },
                grid: {
                    display: false,
                },
            },
        },
        indexAxis: 'y' as const,
        type: 'horizontalBar',
    };

    return (
        <div className="mt-[0.89rem] flex h-fit w-full flex-col justify-start rounded-md bg-white pb-[1.56rem] pl-[4.56rem] pr-[5.06rem] pt-[1.63rem] drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
            <div className="mb-3 flex items-center">
                <div className="top-products-header mr-3 select-none font-sans text-[1.5rem] font-bold">
                    Top Sản Phẩm Của Cửa Hàng
                </div>
                <div className="mr-10" /> {}
                <select
                    value={selectedMetric}
                    onChange={handleMetricChange}
                    style={{
                        padding: '8px',
                        backgroundColor: '#f4f4f4',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        transition: 'background-color 0.3s',
                        fontSize: '16px',
                        color: '#005B6F',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        marginRight: '10px',
                    }}
                >
                    <option value="sales">Theo Số Lượng Bán</option>
                    <option value="revenue">Theo Doanh Thu</option>
                </select>
                <div className="mr-10" /> {}
                <select
                    value={selectedTimeRange}
                    onChange={handleTimeRangeChange}
                    style={{
                        padding: '8px',
                        backgroundColor: '#f4f4f4',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        transition: 'background-color 0.3s',
                        fontSize: '16px',
                        color: '#005B6F',
                        textAlign: 'center',
                        fontWeight: 'bold',
                    }}
                >
                    <option value="week">7 Ngày Qua</option>
                    <option value="month">1 Tháng Qua</option>
                    <option value="quarter">3 Tháng Qua</option>
                    <option value="year">1 Năm Qua</option>
                </select>
            </div>
            <Bar
                options={options}
                data={topProductsData}
                className="mt-[3.37rem] h-[26rem] w-[62.0625rem] self-center"
            />
        </div>
    );
}

export default TopProducts;
