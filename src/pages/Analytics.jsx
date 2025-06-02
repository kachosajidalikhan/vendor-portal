import { useEffect, useState } from "react"
import { MoveRight, Badge, MoreHorizontal, Search, Download } from "lucide-react"
import icons from "../constants"
// import { ResponsiveContainer, PieChart, Pie, Cell,BarChart, CartesianGrid, } from 'recharts'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'
import Header from "../components/Header"
import { useNavigate } from "react-router-dom"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import Image from "next/image"


// Statistics
const statistics = {
  reached: 5000,
  engaged: 3333,
  conversion: 12,
}
const defaultMonthlyData = [
  { month: "Jul", Income: 120 },
  { month: "Aug", Income: 340 },
  { month: "Sep", Income: 250 },
  { month: "Oct", Income: 480 },
  { month: "Nov", Income: 780 },
  { month: "Dec", Income: 240 },
  { month: "Jan", Income: 580 }
]

// Top Selling Packages
const topPackages = [
  {
    name: "Majlis Package 1",
    price: 230000,
    stars: 5,
    image: icons.LazeezImage,
  },
  {
    name: "Baraat Premium",
    price: 500000,
    stars: 5,
    image: icons.LazeezImage,
  },
]

const defaultRecentIncome = [
  { name: "Package 1", date: "28 January 2025", amount: "+Rs. 230k" },
  { name: "Walima", date: "28 January 2025", amount: "+Rs. 20k" },
  { name: "Grand Walima", date: "28 January 2025", amount: "+Rs. 100k" }
]


// Activity
const activity = {
  packages: 55,
  orders: 15,
  free: 30,
  total: 75,
}

// Recent Orders
const recentOrders = [
  {
    id: 1,
    name: "alif",
    tracking: "#878364",
    package: "Mehndi",
    price: 220,
    totalOrder: 325,
    totalAmount: 500,
    icon: "A",
  },
  {
    id: 2,
    name: "alif",
    tracking: "#878368",
    package: "Grand Baraat",
    price: 110,
    totalOrder: 52,
    totalAmount: 800,
    icon: "B",
  },
]

// Income by Packages
const packageData = [
  { name: "Milad Special", value: 30 },
  { name: "Majlis", value: 20 },
  { name: "Nikah", value: 15 },
  { name: "Other", value: 35 },
]

const defaultWeeklyData = [
  { day: "Sat", orders: 450, packages: 230 },
  { day: "Sun", orders: 340, packages: 120 },
  { day: "Mon", orders: 310, packages: 250 },
  { day: "Tue", orders: 460, packages: 350 },
  { day: "Wed", orders: 140, packages: 240 },
  { day: "Thu", orders: 380, packages: 230 },
  { day: "Fri", orders: 390, packages: 320 }
]
const defaultPaymentHistory = [
  {
    description: "Package 1",
    orderId: "#12548796",
    type: "COD",
    date: "28 Jan, 12:30 AM",
    amount: "+Rs. 2,000",
    receipt: true
  }
]

export default function Analytics({
  mockStatistics = statistics,
  mockTopPackages = topPackages,
  mockActivity = activity,
  recentIncome = defaultRecentIncome,
  mockRecentOrders = recentOrders,
  mockPackageData = packageData,
  paymentHistory = defaultPaymentHistory,
  mockWeeklyData = defaultWeeklyData,
  monthlyData = defaultMonthlyData,
  weeklyData = defaultWeeklyData,
}) {
  const COLORS = ["#9E033B", "#ED004F", "#f48fb1", "#f8bbd0"]

  const nav = useNavigate()

  // Animated segment lengths for activity chart
  const totalLength = 157;
  const targetPackages = (activity.packages / 100) * totalLength;
  const targetOrders = (activity.orders / 100) * totalLength;
  const targetFree = (activity.free / 100) * totalLength;

  const [animatedPackages, setAnimatedPackages] = useState(0);
  const [animatedOrders, setAnimatedOrders] = useState(0);
  const [animatedFree, setAnimatedFree] = useState(0);

  useEffect(() => {
    let start;
    const duration = 900;
    function animate(ts) {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setAnimatedPackages(progress * targetPackages);
      setAnimatedOrders(progress * targetOrders);
      setAnimatedFree(progress * targetFree);
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setAnimatedPackages(targetPackages);
        setAnimatedOrders(targetOrders);
        setAnimatedFree(targetFree);
      }
    }
    requestAnimationFrame(animate);
  }, [activity]);

  // Optionally, simulate fetching data
  // useEffect(() => {
  //   // fetch data here and update state
  // }, [])

  return (
    <div className="w-full min-h-screen bg-white lg:p-6">
      {/* Header */}
      {/* <Header title={'Analytics'}/> */}

      <div className="container mx-auto p-4">
        {/* Statistics Section */}
        <div className="lg:col-span-2">


          <div className="rounded-xl py-6 -mb-6 flex flex-col gap-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-bold text-[#e91e63]">Offer 1 Statistics</h2>
            </div>

            <div className="flex flex-col gap-2 mb-4">
              {/* Top Labels Section */}
              <div className="hidden md:flex flex-col sm:flex-row bg-[#FFF5F6] rounded-lg pl-2 py-1 justify-between sm:gap-10 shadow-lg w-full sm:w-[720px] overflow-x-auto">
                {/* Labels and values together in mobile */}
                <div className="hidden md:flex flex-col sm:flex-row gap-4 sm:gap-5">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-[#EE6295]"></div>
                    <span className="text-sm font-bold text-[#9E033B]">Audience Reached</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-[#EE6295]"></div>
                    <span className="text-sm font-bold text-[#9E033B]">Audience Engaged</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-[#EE6295]"></div>
                    <span className="text-sm font-bold text-[#9E033B]">Conversion Rate</span>
                  </div>
                </div>

                {/* Edit button - comes last in mobile */}
                <div className="flex items-center mt-2 sm:mt-0 sm:relative">
                  <button className="px-6 py-2 rounded-xl bg-[#e91e63] text-white font-semibold shadow hover:bg-[#c2185b] transition-all w-full sm:w-auto">
                    Edit
                  </button>
                </div>
              </div>

              {/* Value Section */}
              <div className="grid grid-cols-1 sm:flex bg-[#FFF5F6] rounded-lg p-4 shadow-lg w-full sm:w-[480px] gap-y-3 sm:gap-0">
                <div className="flex md:flex-col gap-4 flex-row  sm:w-40 text-center">
                  <span className="text-sm text-[#9E033B] font-semibold sm:hidden">Audience Reached</span>
                  <span className="text-md text-gray-900">
                    {statistics.reached.toLocaleString()}
                  </span>
                </div>

                <div className="flex md:flex-col gap-4 flex-row sm:w-40 text-center">
                  <span className="text-sm text-[#9E033B] font-semibold sm:hidden">Audience Engaged</span>
                  <span className="text-md text-gray-900">
                    {statistics.engaged.toLocaleString()}
                  </span>
                </div>

                <div className="flex md:flex-col gap-4 flex-row sm:w-40 text-center md:col-span-2 col-span-1">
                  <span className="text-sm text-[#9E033B] font-semibold sm:hidden">Conversion Rate</span>
                  <span className="text-md text-[#3A974C]">
                    {statistics.conversion}%
                  </span>
                </div>
                <div className="flex md:hidden items-center mt-2 sm:mt-0 sm:relative">
                  <button className="px-6 py-2 rounded-xl bg-[#e91e63] text-white font-semibold shadow hover:bg-[#c2185b] transition-all w-full sm:w-auto">
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>




          <div className="flex flex-wrap gap-10 justify-between items-end ">
            {/* Top Selling Packages */}
            <div className="mb-8 p-6 flex-2 bg-[#FFF5F6] w-160 rounded-lg flex flex-col gap-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-[#ED004F]">Top Selling Packages</h2>
                <button variant="ghost" size="icon" className="text-gray-400">
                  <MoreHorizontal className="h-5 w-5" />
                </button>
              </div>
              {topPackages.map((pkg, idx) => (
                <div key={pkg.name} className="mb-4 rounded-xl flex items-center gap-4">
                  <div className="w-18 h-18 bg-[#e91e63] rounded-lg flex items-center justify-center">
                    <img src={pkg.image} alt="" className="rounded-lg" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-md text-gray-800">{pkg.name}</h3>
                    <div className="flex items-center mb-1">
                      {[...Array(pkg.stars)].map((_, i) => (
                        <span key={i} className="text-yellow-400 text-base">★</span>
                      ))}
                    </div>
                    <p className="font-bold text-gray-900 text-base">Rs. {pkg.price.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Activity Section */}
            <div className="mb-6 flex-1 bg-[#FFF5F6] rounded-xl shadow p-6 w-80">
              {/* Header */}
              <div className="flex items-center justify-between pb-4">
                <div className="text-lg font-semibold text-[#e91e63]">Activity</div>
                <select className="bg-[#fff0f3] text-[#e91e63] text-sm font-semibold rounded-md px-2 py-1 border-none outline-none cursor-pointer">
                  <option>Month</option>
                  <option>Week</option>
                  <option>Year</option>
                </select>
              </div>

              {/* Chart with Center Percentage */}
              <div className="relative flex justify-center items-center h-36 overflow-visible pb-2">
                {(() => {
                  // const totalLength = 157; // already defined above
                  // const packagesLength = (activity.packages / 100) * totalLength;
                  // const ordersLength = (activity.orders / 100) * totalLength;
                  // const freeLength = (activity.free / 100) * totalLength;
                  return (
                    <svg viewBox="0 0 120 60" className="w-52 h-28 overflow-visible">
                      <defs>
                        <filter id="segmentShadow" x="-20%" y="-20%" width="140%" height="140%">
                          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.15" />
                        </filter>
                      </defs>
                      {/* Packages (back layer) */}
                      <path
                        d="M 10,50 A 50,50 0 1,1 110,50"
                        fill="none"
                        stroke="#EE6295"
                        strokeWidth="20"
                        strokeDasharray={`${animatedPackages}, ${totalLength - animatedPackages}`}
                        strokeDashoffset="0"
                        strokeLinecap="round"
                      />
                      {/* Free (middle layer) */}
                      <path
                        d="M 10,50 A 50,50 0 1,1 110,50"
                        fill="none"
                        stroke="#C4BBB9"
                        strokeWidth="20"
                        strokeDasharray={`${animatedFree}, ${totalLength - animatedFree}`}
                        strokeDashoffset={`-${targetPackages + targetOrders}`}
                        strokeLinecap="round"
                      />
                      {/* Orders (front layer) */}
                      <path
                        d="M 10,50 A 50,50 0 1,1 110,50"
                        fill="none"
                        stroke="#E5024E"
                        strokeWidth="20"
                        strokeDasharray={`${animatedOrders}, ${totalLength - animatedOrders}`}
                        strokeDashoffset={`-${targetPackages}`}
                        strokeLinecap="round"
                      />
                    </svg>
                  );
                })()}
                <span className="absolute text-2xl font-bold text-[#3e3e3e] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  {activity.total}%
                </span>
              </div>


              {/* Legends */}
              <div className="flex justify-between mt-6">
                <div className="flex flex-col justify-start">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-[#EE6295]"></div>
                    <span className="text-sm text-gray-700">Packages</span> <br />
                  </div>
                  <span className="font-bold text-gray-800 text-start">{activity.packages}%</span>
                </div>
                <div className="flex flex-col justify-start">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-[#E5024E]"></div>
                    <span className="text-sm text-gray-700">Orders</span> <br />
                  </div>
                  <span className="font-bold text-gray-800 text-start">{activity.orders}%</span>
                </div>
              </div>

              {/* Button */}
              <button onClick={() => nav('/')} className="mt-6 w-full cursor-pointer flex items-center justify-center gap-2 text-sm font-semibold border border-[#e91e63] text-[#e91e63] py-2 rounded-lg hover:bg-[#ffe6ec] transition-all">
                View all activity
                <MoveRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Right Column */}
          <div className="">
            <div className="flex flex-col lg:flex-row justify-between items-start w-full gap-4">
              {/* Recent Orders */}

              <div className="bg-[#FFF5F6] mt-9 p-6 rounded-xl shadow w-full lg:w-[65%]">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-[#f50057]">Recent Orders</h3>
                  <button className="text-gray-400 text-xl">⋯</button>
                </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left min-w-[600px]">
                  <thead>
                    <tr className="text-[#A80A43] font-medium">
                      <th className="pb-3">Tracking no <span className="text-[#EE6295] text-xs">▼</span></th>
                      <th className="pb-3">Package Name <span className="text-[#EE6295] text-xs">▼</span></th>
                      <th className="pb-3">Price <span className="text-[#EE6295] text-xs">▼</span></th>
                      <th className="pb-3">Total Order <span className="text-[#EE6295] text-xs">▼</span></th>
                      <th className="pb-3">Total Amount <span className="text-[#EE6295] text-xs">▼</span></th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="border-t border-[#fcdde4]">
                        <td className="py-4 text-[#333] font-medium">{order.tracking}</td>
                        <td className="py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-md bg-[#f50057] flex items-center justify-center text-white text-sm">
                              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                              </svg>
                            </div>
                            <span className="text-[#333]">{order.name}</span>
                          </div>
                        </td>
                        <td className="py-4 text-[#333]">Rs. {order.price}</td>
                        <td className="py-4">
                          <span className="bg-[#ffe0eb] text-[#f50057] text-xs font-bold px-3 py-1 rounded-lg">
                            {order.totalOrder}
                          </span>
                        </td>
                        <td className="py-4 text-[#333]">Rs. {order.totalAmount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
           

            {/* Income by Packages */}
            <div className="w-full lg:w-[35%]">
                <div className="text-lg font-bold text-pink-700 mb-2">Income by Packages</div>
              <div className="bg-white w-full flex flex-col">
                <div className="rounded-2xl p-6 w-full bg-pink-50">
                  <ResponsiveContainer key={Date.now()} width="100%" height={260}>
                    <PieChart>
                      <Pie
                        data={mockPackageData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
                          const RADIAN = Math.PI / 180;
                          const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                          const x = cx + radius * Math.cos(-midAngle * RADIAN);
                          const y = cy + radius * Math.sin(-midAngle * RADIAN);

                          return (
                            <text
                              x={x}
                              y={y - 10}
                              fill="#fff"
                              textAnchor="middle"
                              dominantBaseline="central"
                              fontWeight="bold"
                              fontSize={14}
                            >
                              {`${mockPackageData[index].value}%`}
                              <tspan x={x} dy="1.2em" fontSize={12}>{mockPackageData[index].name}</tspan>
                            </text>
                          );
                        }}
                        outerRadius={120}
                        innerRadius={0}
                        paddingAngle={3}
                        dataKey="value"
                        stroke="#fdf2f8"
                        strokeWidth={6}
                        isAnimationActive={true}
                      >
                        {mockPackageData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
          </div>

        </div>


        <div className="flex flex-wrap w-full gap-6 mt-6">
          {/* Weekly Activity Chart */}
          <div className="flex flex-col lg:p-2 w-full lg:w-[60%] min-w-[200px]">
            <div className="text-lg font-bold text-pink-700 mb-2">Weekly Activity</div>
            <div className="flex-1 bg-pink-50 lg:p-6 p-2 rounded-2xl">
              <div className="flex justify-end items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-[#D42D69] rounded-full"></div>
                <span className="text-xs text-pink-600">Orders</span>
                <div className="w-3 h-3 bg-[#EE6295] rounded-full"></div>
                <span className="text-xs text-pink-600">Packages</span>
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart
                  data={weeklyData}
                  barCategoryGap={30}
                  margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="0" stroke="#FAD1DF" />
                  <XAxis
                    dataKey="day"
                    tick={{ fill: '#EE6295', fontWeight: 300 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: '#EE6295', fontWeight: 300 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip contentStyle={{ borderRadius: 12, borderColor: '#F2C4C7' }} />
                  <Bar dataKey="orders" fill="#D42D69" radius={[8, 8, 8, 8]} barSize={10} />
                  <Bar dataKey="packages" fill="#EE6295" radius={[8, 8, 8, 8]} barSize={10} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Income */}
          <div className="flex flex-col lg:p-2 w-full lg:w-[33%] min-w-[300px]">
            <div className="text-lg font-bold text-pink-700 mb-2">Recent Income</div>
            <div className="space-y-6 rounded-2xl shadow-lg lg:p-6 p-2 bg-white lg:min-h-[250px]">
              {recentIncome.map((item, idx) => (
                <div className="flex items-center px-2 justify-between" key={idx}>
                  <div>
                    <p className="font-semibold text-black">{item.name}</p>
                    <p className="text-xs text-pink-300">{item.date}</p>
                  </div>
                  <p className="font-semibold text-emerald-500">{item.amount}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <br />



        <div className="bg-white rounded-2xl flex flex-col lg:p-4 p-2 w-full lg:w-[68%] lg:min-w-[300px]">
          <div className="text-lg font-bold text-pink-700 mb-2">Monthly Income</div>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={monthlyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#E5024E" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#E5024E" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F2C4C7" />
                <XAxis
                  dataKey="month"
                  tick={{ fill: '#E5024E', fontWeight: 400 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: '#E5024E', fontWeight: 400 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip contentStyle={{ borderRadius: 12, borderColor: '#F2C4C7' }} />
                <Line
                  type="monotone"
                  dataKey="Income"
                  stroke="#E5024E"
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#E5024E' }}
                  activeDot={{ r: 5 }}
                  fillOpacity={1}
                  fill="url(#colorIncome)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>



        <div className="mt-8 lg:rounded-2xl p-2 w-full">
          <div className="text-lg font-bold text-pink-700 mb-2">Payment History</div>
          <div className="overflow-x-auto">
            <table className="min-w-[800px] w-full lg:rounded-2xl overflow-hidden">
              <thead>
                <tr className="bg-[#FFF5F6] border-b-2 border-pink-100">
                  <th className="text-left py-3 px-4 text-[#ED004F] font-bold">Description</th>
                  <th className="text-left py-3 px-4 text-[#ED004F] font-bold">Order ID</th>
                  <th className="text-left py-3 px-4 text-[#ED004F] font-bold">Type</th>
                  <th className="text-left py-3 px-4 text-[#ED004F] font-bold">Date</th>
                  <th className="text-left py-3 px-4 text-[#ED004F] font-bold">Amount</th>
                  <th className="text-left py-3 px-4 text-[#ED004F] font-bold">Receipt</th>
                </tr>
              </thead>
              <tbody>
                {paymentHistory.map((row, idx) => (
                  <tr className="bg-[#FFF5F6]" key={idx}>
                    <td className="py-3 px-4 font-medium text-black">{row.description}</td>
                    <td className="py-3 px-4 text-gray-500">{row.orderId}</td>
                    <td className="py-3 px-4 text-gray-500">{row.type}</td>
                    <td className="py-3 px-4 text-gray-500">{row.date}</td>
                    <td className="py-3 px-4 text-emerald-500 font-semibold">{row.amount}</td>
                    <td className="py-3 px-4">
                      {row.receipt && (
                        <button className="flex items-center gap-2 px-4 py-1 border border-[#ED004F] text-[#ED004F] rounded-full hover:bg-pink-50 transition font-semibold">
                          <Download className="h-4 w-4" />
                          Download
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>



      </div>
    </div>
  )
}
