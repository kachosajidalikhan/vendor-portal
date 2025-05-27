import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { time: "10am", sales: 230000 },
  { time: "11am", sales: 180000 },
  { time: "12am", sales: 250000 },
  { time: "01am", sales: 160000 },
  { time: "02am", sales: 170000 },
  { time: "03am", sales: 233000 },
  { time: "04am", sales: 110000 },
  { time: "05am", sales: 140000 },
  { time: "06am", sales: 260000 },
  { time: "07am", sales: 300000 },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black relative text-white text-center rounded-lg px-3 py-2 text-xs shadow border border-[#F2C4C7]">
        <p>Sales</p>
        <p className="font-bold">Rs. {(payload[0].value / 1000).toFixed(0)}k</p>
        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-black"></div>
      </div>
    );
  }
  return null;
};

export default function SalesChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="strokeGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FDB5CF" />
            <stop offset="100%" stopColor="#A80A43" />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="0" stroke="#6a728224" vertical={false} />
        <XAxis
          dataKey="time"
          tick={{ fill: '#6a7282', fontWeight: 500, fontSize: 12, fontFamily: "Poppins" }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: "3 3", stroke: "#F2C4C7" }} />
        <YAxis
          tick={{ fill: '#6a7282', fontWeight: 500, fontSize: 12, fontFamily: "Poppins" }}
          domain={[0, 500000]}
          tickFormatter={(value) => `${value / 1000}k`}
          tickCount={6}
          axisLine={false}
          tickLine={false}
        />
        <Line
          type="monotone"
          dataKey="sales"
          stroke="url(#strokeGradient)"
          strokeWidth={3}
          dot={{ r: 5, fill: '#fff', stroke: '#EE6295', strokeWidth: 2 }}
          activeDot={{ r: 7 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
