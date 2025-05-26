import { useState, useEffect } from "react";
import { Pencil, Search, ChevronLeft } from 'lucide-react';
import icons from "../constants";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

// Mock data for demonstration
const mockPackageData = {
    packageName: "",
    packageType: "",
    foodItem: "",
    description: "",
    totalServing: "",
    addOns: "",
    price: "",
    preparationTime: "",
    deliveryTime: null,
    packageTypes: [],
    cities: []
};

export default function PackageCreation() {
    const [formData, setFormData] = useState(mockPackageData);
    const [isLoading, setIsLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [activeTab, setActiveTab] = useState("info"); // "info" or "detail"
    const navigate = useNavigate();

    // Simulate loading data from an API
    useEffect(() => {
        const fetchVendorData = async () => {
            setIsLoading(true);
            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1000));
                setFormData(mockPackageData);
            } catch (error) {
                setMessage({ type: 'error', text: 'Failed to load package data' });
            } finally {
                setIsLoading(false);
            }
        };

        fetchVendorData();
    }, []);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
            setActiveTab("detail"); // Switch to detail tab when Next is clicked
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setIsEditing(true);
    };


    const handleCreate = () => {
        // Yahan API call ya backend save logic aayega
        // For now, hum dummy success maan lete hain

        // Redirect with state
        navigate("/create-package", { state: { success: true } });
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, profileImage: reader.result }));
                setIsEditing(true);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="w-full min-h-screen bg-white p-6">
            <Header title="Create a Package" />
            <div className="max-w-3xl p-4 md:p-6">
                <div onClick={() => navigate(-1)} className="pb-2 cursor-pointer">
                    <ChevronLeft color="#ED004F" />
                </div>
                <div className="flex gap-10 cursor-pointer">
                    <div className="mb-8" onClick={() => setActiveTab("info")}>
                        <h1 className={` font-medium ${activeTab === "info" ? "text-[#BF0644]" : "text-[#9E033B]/50"}`}>
                            Edit Package
                        </h1>
                        {activeTab === "info" && <div className="h-1 w-24 bg-[#9E033B] rounded-t-full mt-1"></div>}
                    </div>
                    <div className="mb-8" onClick={() => setActiveTab("detail")}>
                        <h1 className={` font-medium ${activeTab === "detail" ? "text-[#BF0644]" : "text-[#9E033B]/50"}`}>
                            Package Details
                        </h1>
                        {activeTab === "detail" && <div className="h-1 w-30 bg-[#9E033B] rounded-t-full mt-1"></div>}
                    </div>
                </div>
                <div className="flex gap-12">
                    <div className="flex-shrink-0">
                        <div className="relative">
                            <div className="w-24 h-24 rounded-full bg-sky-100 overflow-hidden relative">
                                {formData.profileImage ? (
                                    <img
                                        src={formData.profileImage}
                                        alt="Profile avatar"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-pink-500">
                                        <img src={icons.FoodIcon} className="w-12 h-12" />
                                    </div>
                                )}
                            </div>
                            <label
                                htmlFor="profileImage"
                                className="absolute bottom-0 right-0 bg-[#EE6295] text-white p-1.5 rounded-full cursor-pointer"
                            >
                                <Pencil size={16} />
                                <input
                                    type="file"
                                    id="profileImage"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                />
                            </label>
                        </div>
                    </div>
                    <div>

                        {/* package info part */}
                        {
                            activeTab === "info" && (
                                <form onSubmit={handleSubmit}>
                                    <div className="flex flex-col md:flex-row mb-8">
                                        <div className="flex-grow">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-36 gap-y-6">

                                                <div className="space-y-0">
                                                    <div htmlFor="packageName" className="text-pink-500 text-sm pb-1">Package Name</div>
                                                    <input
                                                        id="packageName"
                                                        name="packageName"
                                                        required
                                                        value={formData.packageName}
                                                        placeholder="Enter your package name"
                                                        onChange={handleChange}
                                                        className="rounded-xl w-[318px] h-[50px] text-sm border border-[#9E033B] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                                    />
                                                       </div>
                                                <div className="space-y-0">
                                                    <label htmlFor="packageType" className="text-pink-500 text-sm pb-1">Package Type</label>
                                                    <select
                                                        id="packageType"
                                                        name="packageType"
                                                        required
                                                        value={formData.packageType}
                                                        onChange={handleChange}
                                                        className="rounded-xl w-[318px] h-[50px] text-sm border border-[#9E033B] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                                    >
                                                        <option value="">Select package type</option> {/* default/placeholder */}
                                                        <option value="Buffet">Buffet</option>
                                                        <option value="Daig">Daig</option>
                                                        <option value="Meal Box">Meal Box</option>
                                                    </select>
                                                </div>


                                                <div className="space-y-0">
                                                    <div htmlFor="foodItem" className="text-pink-500 text-sm pb-1">Food Item</div>
                                                    <input
                                                        id="foodItem"
                                                        name="foodItem"
                                                        required
                                                        value={formData.foodItem}
                                                        placeholder="Add the food items to add from your menu"
                                                        onChange={handleChange}
                                                        className="rounded-xl w-[318px] h-[50px] text-sm border border-[#9E033B] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                                    />
                                                   
                                                </div>

                                                <div className="space-y-0">
                                                    <div htmlFor="description" className="text-pink-500 text-sm pb-1">Description</div>
                                                    <input
                                                        id="description"
                                                        name="description"
                                                        required
                                                        value={formData.description}
                                                        placeholder="Use olive oil"
                                                        onChange={handleChange}
                                                        className="rounded-xl w-[318px] h-[50px] text-sm border border-[#9E033B] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                                    />
                                                   
                                                </div>
                                                <div className="space-y-0">
                                                    <div htmlFor="totalServing" className="text-pink-500 text-sm pb-1">Total Serving</div>
                                                    <input
                                                        id="totalServing"
                                                        name="totalServing"
                                                        required
                                                        value={formData.totalServing}
                                                        placeholder="Enter quantity and total serving"
                                                        onChange={handleChange}
                                                        className="rounded-xl w-[318px] h-[50px] text-sm border border-[#9E033B] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                                    />
                                                    
                                                </div>

                                                <div className="space-y-0">
                                                    <div htmlFor="addOns" className="text-pink-500 text-sm pb-1">Add-Ons</div>
                                                    <input
                                                        id="addOns"
                                                        name="addOns"
                                                        required
                                                        value={formData.addOns}
                                                        onChange={handleChange}
                                                        placeholder="Add the add-ons items to add from your menu"
                                                        className="rounded-xl w-[318px] h-[50px] text-sm border border-[#9E033B] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                                    />
                                                   

                                                </div>

                                                <div className="space-y-0">
                                                    <div htmlFor="price" className="text-pink-500 text-sm pb-1">Price</div>
                                                    <input
                                                        id="price"
                                                        name="price"
                                                        required
                                                        value={formData.price}
                                                        placeholder="Set price of the package"
                                                        onChange={handleChange}
                                                        className="rounded-xl w-[318px] h-[50px] text-sm border border-[#9E033B] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                                    />
                                                   
                                                </div>

                                                <div className="space-y-0">
                                                    <div htmlFor="preparationTime" className="text-pink-500 text-sm pb-1">Preparation Time</div>
                                                    <input
                                                        id="preparationTime"
                                                        name="preparationTime"
                                                        required
                                                        value={formData.preparationTime}
                                                        placeholder="Enter delivery time (e.g. 4 days)"
                                                        onChange={handleChange}
                                                        className="rounded-xl w-[318px] h-[50px] text-sm border border-[#9E033B] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                                    />
                                                  
                                                </div>

                                                <div className="space-y-0">
                                                    <div htmlFor="deliveryTime" className="text-pink-500 text-sm pb-1">Delivery Time</div>
                                                    <input
                                                        id="deliveryTime"
                                                        name="deliveryTime"
                                                        required
                                                        value={formData.deliveryTime}
                                                        onChange={handleChange}
                                                        placeholder="Enter delivery time (e.g. 2 days)"
                                                        className="rounded-xl w-[318px] h-[50px] text-sm border border-[#9E033B] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                                    />
                                                
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-end items-center mt-8 pr-2">
                                        <button
                                            type="submit"
                                            className='bg-[#E5024E] text-white px-14 py-2 rounded-xl cursor-pointer hover:bg-pink-600'
                                        >
                                            Next
                                        </button>
                                    </div>
                                </form>
                            )
                        }
                        {/* package detail part */}
                        {
                            activeTab === "detail" && (
                                <div className="w-200">
                                    <div className="rounded-lg overflow-hidden">
                                        <div className="pb-2">
                                            <h2 className="text-lg Poppins-bold text-pink-600">Package Details</h2>
                                        </div>
                                        <div className="space-y-0 border-1 border-[#9E033B] rounded-xl p-4">
                                            <div className="space-y-0">
                                                <div className="flex">
                                                    <span className="Poppins-bold text-sm w-36">Package Name:</span>
                                                    <span>{formData.packageName}</span>
                                                </div>
                                                <div className="flex">
                                                    <span className="Poppins-bold text-sm w-36">Package type:</span>
                                                    <span>{formData.packageType}</span>
                                                </div>
                                                <div className="flex">
                                                    <span className="Poppins-bold text-sm w-36">Food Items:</span>
                                                    <span>{formData.foodItem}</span>
                                                </div>
                                                <div className="flex">
                                                    <span className="Poppins-bold text-sm w-36">Price:</span>
                                                    <span>Rs. {formData.price} PKR</span>
                                                </div>
                                                <div className="flex">
                                                    <span className="Poppins-bold text-sm w-36">Total serving:</span>
                                                    <span>{formData.totalServing} people</span>
                                                </div>
                                                <div className="flex">
                                                    <span className="Poppins-bold text-sm w-36">Preparation time:</span>
                                                    <span>{formData.preparationTime} days</span>
                                                </div>
                                                <div className="flex">
                                                    <span className="Poppins-bold text-sm w-36">Delivery time:</span>
                                                    <span>{formData.deliveryTime || 'Not specified'}</span>
                                                </div>
                                            </div>
                                            <hr className="my-2  border-t border-[#EE6295]" />
                                            <div className="space-y-0">
                                                <div className="flex">
                                                    <span className="Poppins-bold text-sm w-36">Description:</span>
                                                </div>
                                                <div className="text-sm">
                                                    <span>{formData.description}</span>
                                                </div>
                                            </div>
                                            <hr className="my-2 border-t border-[#EE6295]" />

                                            <div className="space-y-0">
                                                <div className="Poppins-bold text-sm">Cost breakdown:</div>
                                                <div className="pl-4 space-y-1">
                                                    <div className="flex justify-between text-sm">
                                                        <span>{formData.foodItem}</span>
                                                        <span>Rs. {formData.price} - {formData.totalServing} servings</span>
                                                    </div>
                                                    {formData.addOns && (
                                                        <div className="flex justify-between text-sm">
                                                            <span>Add-ons ({formData.addOns})</span>
                                                            <span>Rs. {Math.round(parseInt(formData.price) * 0.1)}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <hr className="my-2 border-t border-[#EE6295]" />
                                            <div className="flex justify-start gap-3 mt-6">
                                                <span className="Poppins-bold text-sm">Subtotal:</span>
                                                <span>Rs. {formData.price}</span>
                                            </div>
                                            <hr className="my-2 border-t border-[#EE6295]" />
                                            <div className="flex justify-start gap-3 Poppins-bold text-sm mt-6">
                                                <span>Total: Rs. {Math.round(parseInt(formData.price) * 1.1)}</span>
                                                <span className="Poppins">(Tax applied)</span>
                                            </div>
                                        </div>
                                        <div className="flex justify-end items-center mt-8 pr-2">
                                            <button
                                                type="submit"
                                                onClick={handleCreate}
                                                className="bg-[#E5024E] text-white px-14 py-2 rounded-xl cursor-pointer hover:bg-pink-600"
                                            >
                                                Create!
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}
