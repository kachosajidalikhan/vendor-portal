import { useState, useEffect } from "react";
import { ChevronLeft, Pencil } from 'lucide-react';
import icons from "../constants";
import Header from "../components/Header";
import { useNavigate, useLocation } from "react-router-dom";

export default function OrderDetail() {
    const location = useLocation();
    const navigate = useNavigate();
    const [orderData, setOrderData] = useState(null);
    const [activeTab, setActiveTab] = useState("info");

    useEffect(() => {
        if (location.state?.orderData) {
            setOrderData(location.state.orderData);
        }
    }, [location.state]);

    const handleBack = () => {
        navigate('/manage-orders');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/manage-orders');
    };

    if (!orderData) {
        return <div>Loading...</div>;
    }

return (
    <div className="w-full min-h-screen bg-white p-4 sm:p-6">
        <div className="max-w-5xl mx-auto p-4 md:p-6">
            <div className="pb-2 mb-4 cursor-pointer" onClick={handleBack}>
                <ChevronLeft color="#ED004F" />
            </div>

            <div className="flex flex-wrap gap-6 md:gap-10 cursor-pointer">
                <div className="mb-4 md:mb-8" onClick={() => setActiveTab("info")}>
                    <h1 className={`font-medium ${activeTab === "info" ? "text-[#9E033B]" : "text-[#9E033B]/50"}`}>
                        Edit Profile
                    </h1>
                    {activeTab === "info" && <div className="h-1 w-full bg-[#9E033B] mt-1 rounded-t-full" />}
                </div>
                <div className="mb-4 md:mb-8" onClick={() => setActiveTab("detail")}>
                    <h1 className={`font-medium ${activeTab === "detail" ? "text-[#9E033B]" : "text-[#9E033B]/50"}`}>
                        Package Detail
                    </h1>
                    {activeTab === "detail" && <div className="h-1 w-full bg-[#9E033B] mt-1 rounded-t-full" />}
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 md:gap-12">
                <div className="flex-shrink-0 flex justify-center md:justify-start">
                    <div className="relative">
                        <div className="w-24 h-24 rounded-full bg-sky-100 overflow-hidden">
                            {orderData.avatar ? (
                                <img
                                    src={orderData.avatar}
                                    alt="Profile avatar"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-pink-500">
                                    <img src={icons.FoodIcon} className="w-12 h-12" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="w-full">
                    {/* Order Info */}
                    {activeTab === "info" && (
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-col md:flex-row gap-8 mb-8">
                                <div className="flex-grow">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 lg:gap-x-20 gap-y-6">
                                        {[
                                            { id: 'customerName', label: 'Customer Name', value: orderData.name },
                                            { id: 'location', label: 'Location', value: orderData.location },
                                            { id: 'dateTime', label: 'Delivery Date & Time', value: orderData.date + orderData.time },
                                            { id: 'packageName', label: 'Package Name', value: orderData.packageName },
                                            { id: 'orderID', label: 'Order ID', value: orderData.id },
                                            { id: 'paymentMethod', label: 'Payment Method', value: orderData.paymentMethod },
                                            { id: 'totalIncome', label: 'Total Income', value: orderData.totalIncome },
                                        ].map(({ id, label, value }) => (
                                            <div key={id} className="space-y-1">
                                                <label htmlFor={id} className="text-[#ED004F] text-sm">
                                                    {label}
                                                </label>
                                                <input
                                                    id={id}
                                                    name={id}
                                                    value={value}
                                                    readOnly
                                                    className="rounded-xl w-full max-w-[318px] h-[50px] text-sm border border-[#9E033B] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 bg-gray-50"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end mt-8 pr-2">
                                <button
                                    type="submit"
                                    className="bg-[#E5024E] text-white px-10 py-2 rounded-xl cursor-pointer hover:bg-pink-600"
                                >
                                    OK
                                </button>
                            </div>
                        </form>
                    )}

                    {/* Package Detail */}
                    {activeTab === "detail" && (
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-col md:flex-row gap-8 mb-8">
                                <div className="flex-grow">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 lg:gap-x-20 gap-y-6">
                                        {[
                                            { id: 'packageName', label: 'Package Name', value: orderData.packageName },
                                            { id: 'packageType', label: 'Package Type', value: orderData.packageType },
                                            { id: 'quantity', label: 'Quantity', value: orderData.quantity },
                                            { id: 'specialInstructions', label: 'Special Instructions', value: orderData.specialInstructions },
                                            { id: 'foodItem', label: 'Food Item', value: orderData.foodItem },
                                            { id: 'addOns', label: 'Add-ons?', value: `Rs. ${orderData.addOns}` },
                                        ].map(({ id, label, value }) => (
                                            <div key={id} className="space-y-1">
                                                <label htmlFor={id} className="text-[#ED004F] text-sm">
                                                    {label}
                                                </label>
                                                <input
                                                    id={id}
                                                    name={id}
                                                    value={value}
                                                    readOnly
                                                    className="rounded-xl w-full max-w-[318px] h-[50px] text-sm border border-[#9E033B] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 bg-gray-50"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end mt-8 pr-2">
                                <button
                                    type="submit"
                                    className="bg-[#E5024E] text-white px-10 py-2 rounded-xl cursor-pointer hover:bg-pink-600"
                                >
                                    OK
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    </div>
);

}
