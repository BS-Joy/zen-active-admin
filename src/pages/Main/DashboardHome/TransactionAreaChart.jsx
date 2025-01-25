import React, { useState } from "react";
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from "recharts";

const dataWeekly = [
    { day: "Mon", value: 120 },
    { day: "Tue", value: 150 },
    { day: "Wed", value: 80 },
    { day: "Thu", value: 170 },
    { day: "Fri", value: 100 },
    { day: "Sat", value: 90 },
    { day: "Sun", value: 130 },
];

const dataDaily = [
    { day: "12 AM", value: 30 },
    { day: "6 AM", value: 50 },
    { day: "12 PM", value: 90 },
    { day: "6 PM", value: 70 },
    { day: "12 AM", value: 30 },
];

const TransactionAreaChart = () => {
    const [data, setData] = useState(dataWeekly);
    const [filter, setFilter] = useState("weekly");

    const handleFilterChange = (event) => {
        const type = event.target.value;
        setFilter(type);
        setData(type === "weekly" ? dataWeekly : dataDaily);
    };

    return (
        <div className="space-y-3">
            <div className="w-[414px] border border-blue-500 rounded-lg flex items-center justify-between px-2">
                <h1 className="text-xl">Your Transactions</h1>
                <div className="flex justify-center">
                    <select
                        value={filter}
                        onChange={handleFilterChange}
                        className="px-4 py-2 bg-transparent border-none rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="weekly">Weekly</option>
                        <option value="daily">Daily</option>
                    </select>
                </div>
            </div>
            <div className="w-[414px] border border-blue-500 rounded-lg">

                <ResponsiveContainer width="100%" height={172}>
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#1E648C" stopOpacity={0.8} />
                                <stop offset="100%" stopColor="#1E648C" stopOpacity={0.1} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#888" }} />
                        <Tooltip />
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#1E648C"
                            fillOpacity={1}
                            fill="url(#colorValue)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default TransactionAreaChart;
