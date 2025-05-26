import { useState, useEffect } from "react";
import StatsCards from "../components/dashboard/StatsCards";
import ReportsChart from "../components/dashboard/ReportsChart";
import AnalyticsChart from "../components/dashboard/AnalyticsChart";
import RecentOrdersTable from "../components/dashboard/RecentOrdersTable";
import TopPackagesList from "../components/dashboard/TopPackagesList";
import Header from "../components/Header";

// Mock data
const mockStats = {
    messages: 178,
    packages: 20,
    soldPackages: 190,
    newCustomers: 12
};

const mockSalesData = [
    { name: "Jan", sales: 4000 },
    { name: "Feb", sales: 3000 },
    { name: "Mar", sales: 2000 },
    { name: "Apr", sales: 2780 },
    { name: "May", sales: 1890 },
    { name: "Jun", sales: 2390 },
    { name: "Jul", sales: 3490 },
];

const mockAnalyticsData = {
    sales: 2000,
    cancel: 400,
    refund: 540,
    total: 6640
};

const mockRecentOrders = [
    { id: "#578384", name: "Webinar", price: "20k", orders: 32, total: "100k" },
    { id: "#578198", name: "Brand Reveal", price: "11k", orders: 53, total: "30k" },
    { id: "#578425", name: "Mikad", price: "2k", orders: 78, total: "23k" },
    { id: "#578021", name: "Moto Pack 1", price: "23k", orders: 18, total: "30k" },
];

const mockTopPackages = [
    { name: "Mojito Package 1", totalSell: 45, price: "230k" },
    { name: "Baraati Premium", totalSell: 32, price: "500k" },
];

export default function Dashboard() {
    const [stats, setStats] = useState(mockStats);
    const [salesData, setSalesData] = useState(mockSalesData);
    const [analyticsData, setAnalyticsData] = useState(mockAnalyticsData);
    const [recentOrders, setRecentOrders] = useState(mockRecentOrders);
    const [topPackages, setTopPackages] = useState(mockTopPackages);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Simulate API call
        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                // In a real app, you would fetch from your API here
                // const response = await fetch('/api/dashboard');
                // const data = await response.json();

                // Simulate API delay
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Update state with mock data
                setStats(mockStats);
                setSalesData(mockSalesData);
                setAnalyticsData(mockAnalyticsData);
                setRecentOrders(mockRecentOrders);
                setTopPackages(mockTopPackages);
                setError(null);
            } catch (err) {
                setError("Failed to load dashboard data");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        // In a real app, you would implement search logic here
    };

    if (loading) {
        return (
            <div className="flex w-full h-screen items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="text-red-600">{error}</div>
            </div>
        );
    }

    return (
        <div className="flex w-full h-screen bg-white">
            {/* Main Content */}
            <div className="flex-1 overflow-auto">
                <div className="p-6">
                    <Header title="Dashboard" />
                </div>
                {/* Header */}
                {/* <Header searchQuery={searchQuery} onSearch={handleSearch} /> */}
                {/* Dashboard Content */}
                <div className="p-6 border-l border-[#E6EFF5]">
                    {/* Stats Cards */}
                    <StatsCards stats={stats} />
                    {/* Charts Section */}
                    <div className="flex justify-between mb-8">
                        <ReportsChart />
                        <AnalyticsChart analyticsData={analyticsData} />
                    </div>
                    {/* Tables Section */}
                    <div className="flex justify-between gap-6">
                        <RecentOrdersTable recentOrders={recentOrders} />
                        <TopPackagesList topPackages={topPackages} />
                    </div>
                </div>
            </div>
        </div>
    );
}

// Chart Components
function CircleProgress({ data, duration = 1200 }) {
    const radius = 70;
    const strokeWidthSale = 28;
    const strokeWidthCancel = 24;
    const strokeWidthRefund = 20;
    const strokeWidth = 14;
    const circumference = 2 * Math.PI * radius;

    // Colors to match the image
    const saleColor = '#ED004F';
    const cancelColor = '#CD084F';
    const returnColor = '#EE6295';
    const bgColor = 'rgba(91, 147, 255, 0.05)';

    // GAP
    const GAP_PERCENT = 20; // percent of the circle left as gap
    const ACTIVE_PERCENT = 100 - GAP_PERCENT;

    // Calculate raw percentages for each segment
    const total = data.sales + data.cancel + data.refund;
    const salesRaw = data.sales / total;
    const cancelRaw = data.cancel / total;
    const refundRaw = data.refund / total;

    // Scale so segments sum to ACTIVE_PERCENT
    const salesTarget = salesRaw * ACTIVE_PERCENT;
    const cancelTarget = cancelRaw * ACTIVE_PERCENT;
    const refundTarget = refundRaw * ACTIVE_PERCENT;

    // Animated values
    const [salesPct, setSalesPct] = useState(0);
    const [cancelPct, setCancelPct] = useState(0);
    const [refundPct, setRefundPct] = useState(0);

    useEffect(() => {
        let start;
        function animate(ts) {
            if (!start) start = ts;
            const progress = Math.min((ts - start) / duration, 1);
            setSalesPct(progress * salesTarget);
            setCancelPct(progress * cancelTarget);
            setRefundPct(progress * refundTarget);
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                setSalesPct(salesTarget);
                setCancelPct(cancelTarget);
                setRefundPct(refundTarget);
            }
        }
        requestAnimationFrame(animate);
        // eslint-disable-next-line
    }, [salesTarget, cancelTarget, refundTarget, duration]);

    // Calculate stroke dasharray for each segment
    const salesDash = (salesPct / 100) * circumference;
    const cancelDash = (cancelPct / 100) * circumference;
    const refundDash = (refundPct / 100) * circumference;
    // The gap is just the remaining circumference
    const gapDash = (GAP_PERCENT / 100) * circumference;

    return (
        <svg className="w-full h-full" viewBox="0 0 200 200">
            {/* SVG filter for drop shadow */}
            <defs>
                <filter id="segmentShadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.18" />
                </filter>
            </defs>
            {/* Background circle */}
            <circle
                cx="100"
                cy="100"
                r={radius}
                fill="none"
                stroke={bgColor}
                strokeWidth={strokeWidth}
            />
            {/* Return segment */}
            <circle
                cx="100"
                cy="100"
                r={radius}
                fill="none"
                stroke={returnColor}
                strokeWidth={strokeWidthRefund}
                strokeDasharray={`${refundDash} ${circumference}`}
                strokeLinecap="round"
                transform={`rotate(${(salesPct + cancelPct) * 3.6 - 90} 100 100)`}
                style={{ transition: 'stroke-dasharray 0.2s linear' }}
                filter="url(#segmentShadow)"
            />
            {/* Cancel segment */}
            <circle
                cx="100"
                cy="100"
                r={radius}
                fill="none"
                stroke={cancelColor}
                strokeWidth={strokeWidthCancel}
                strokeDasharray={`${cancelDash} ${circumference}`}
                strokeLinecap="round"
                transform={`rotate(${salesPct * 3.6 - 90} 100 100)`}
                style={{ transition: 'stroke-dasharray 0.2s linear' }}
                filter="url(#segmentShadow)"
            />
            {/* Sale segment */}
            <circle
                cx="100"
                cy="100"
                r={radius}
                fill="none"
                stroke={saleColor}
                strokeWidth={strokeWidthSale}
                strokeDasharray={`${salesDash} ${circumference}`}
                strokeLinecap="round"
                transform="rotate(-90 100 100)"
                style={{ transition: 'stroke-dasharray 0.2s linear' }}
                filter="url(#segmentShadow)"
            />
        </svg>
    );
}
