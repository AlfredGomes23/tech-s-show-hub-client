import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { PieChart, Pie, Cell, Legend } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FF8042', '#FFBB28'];

const Stats = () => {
    const axiosSecure = useAxiosSecure();

    const { data = [], isLoading } = useQuery({
        queryKey: ["data"],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/admin-stats');
            return data;
        }
    });

    //custom shapes
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    if (isLoading) return <p className="loading loading-dots text-secondary flex mx-auto text-center"></p>;

    return (
        <div>
            <h2 className="text-3xl text-center font-medium">Statistics</h2>
            <div className="divider"></div>
            <div className="flex flex-col md:flex-row">
                {/* stats */}
                <div className="md:w-1/3 flex justify-center items-center">
                    <div className="stats md:stats-vertical shadow">
                        <div className="stat">
                            <div className="stat-title">{data[0].name}</div>
                            <div className="stat-value">{data[0].value}</div>
                        </div>

                        <div className="stat">
                            <div className="stat-title">{data[1].name}</div>
                            <div className="stat-value">{data[1].value}</div>
                        </div>

                        <div className="stat">
                            <div className="stat-title">{data[2].name}</div>
                            <div className="stat-value">{data[2].value}</div>
                        </div>
                    </div>
                </div>
                {/* pie chart */}
                <div className="md:w-2/3  flex justify-center items-center mb-10">
                    <PieChart width={300} height={300}>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Legend></Legend>
                    </PieChart>
                </div>
            </div>
        </div>
    );
};

export default Stats;