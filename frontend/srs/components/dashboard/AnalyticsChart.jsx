import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";


const AnalyticsChart = ({ data }) => {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">

            <h2 className="text-lg font-semibold mb-6">
                User Growth
            </h2>

            <div className="h-80">

                <ResponsiveContainer width="100%" height="100%">

                    <AreaChart data={data}>

                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="month" />

                        <YAxis />

                        <Tooltip />

                        <Area
                            type="monotone"
                            dataKey="users"
                            stroke="#2563EB"
                            fill="#BFDBFE"
                        />

                    </AreaChart>

                </ResponsiveContainer>

            </div>

        </div>
    );
};

export default AnalyticsChart;