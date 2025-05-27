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
  <div className="w-full min-h-screen bg-white px-4 py-6 sm:p-10">
    <div className="max-w-5xl mx-auto">
      <div onClick={() => navigate(-1)} className="pb-2 cursor-pointer">
        <ChevronLeft color="#ED004F" />
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-6 md:gap-10 cursor-pointer mt-4 mb-8">
        {['info', 'detail'].map((tab) => (
          <div key={tab} onClick={() => setActiveTab(tab)} className="mb-2">
            <h1 className={`font-medium ${activeTab === tab ? "text-[#BF0644]" : "text-[#9E033B]/50"}`}>
              {tab === 'info' ? 'Edit Package' : 'Package Details'}
            </h1>
            {activeTab === tab && (
              <div className="h-1 w-24 bg-[#9E033B] rounded-t-full mt-1"></div>
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-col md:flex-row gap-6 md:gap-12">
        {/* Profile image */}
        <div className="flex-shrink-0 self-center md:self-start">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-sky-100 overflow-hidden">
              {formData.profileImage ? (
                <img src={formData.profileImage} alt="Profile avatar" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-pink-500">
                  <img src={icons.FoodIcon} className="w-12 h-12" />
                </div>
              )}
            </div>
            <label htmlFor="profileImage" className="absolute bottom-0 right-0 bg-[#EE6295] text-white p-1.5 rounded-full cursor-pointer">
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

        {/* Form or Details */}
        <div className="flex-1">
          {activeTab === "info" ? (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { id: "packageName", label: "Package Name", placeholder: "Enter your package name" },
                  { id: "packageType", label: "Package Type", type: "select", options: ["Buffet", "Daig", "Meal Box"] },
                  { id: "foodItem", label: "Food Item", placeholder: "Add the food items to add from your menu" },
                  { id: "description", label: "Description", placeholder: "Use olive oil" },
                  { id: "totalServing", label: "Total Serving", placeholder: "Enter quantity and total serving" },
                  { id: "addOns", label: "Add-Ons", placeholder: "Add the add-ons items to add from your menu" },
                  { id: "price", label: "Price", placeholder: "Set price of the package" },
                  { id: "preparationTime", label: "Preparation Time", placeholder: "Enter preparation time (e.g. 4 days)" },
                  { id: "deliveryTime", label: "Delivery Time", placeholder: "Enter delivery time (e.g. 2 days)" }
                ].map(({ id, label, placeholder, type, options }) => (
                  <div key={id}>
                    <label htmlFor={id} className="block text-pink-500 text-sm mb-1">{label}</label>
                    {type === "select" ? (
                      <select
                        id={id}
                        name={id}
                        required
                        value={formData[id]}
                        onChange={handleChange}
                        className="w-full h-12 text-sm border border-[#9E033B] px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
                      >
                        <option value="">Select {label.toLowerCase()}</option>
                        {options.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        id={id}
                        name={id}
                        type="text"
                        required
                        value={formData[id]}
                        onChange={handleChange}
                        placeholder={placeholder}
                        className="w-full h-12 text-sm border border-[#9E033B] px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="flex justify-end mt-8">
                <button type="submit" className="bg-[#E5024E] text-white px-8 py-2 rounded-xl hover:bg-pink-600">
                  Next
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6 border border-[#9E033B] rounded-xl p-4">
              <h2 className="text-lg font-bold text-pink-600">Package Details</h2>

              <div className="space-y-2 text-sm">
                {[
                  ["Package Name", formData.packageName],
                  ["Package Type", formData.packageType],
                  ["Food Items", formData.foodItem],
                  ["Price", `Rs. ${formData.price} PKR`],
                  ["Total Serving", `${formData.totalServing} people`],
                  ["Preparation Time", `${formData.preparationTime} days`],
                  ["Delivery Time", formData.deliveryTime || "Not specified"]
                ].map(([label, value]) => (
                  <div className="flex gap-2" key={label}>
                    <span className="font-semibold w-40">{label}:</span>
                    <span>{value}</span>
                  </div>
                ))}
              </div>

              <div>
                <hr className="my-2 border-t border-[#EE6295]" />
                <div className="font-semibold text-sm mb-1">Description:</div>
                <p className="text-sm">{formData.description}</p>
              </div>

              <div>
                <hr className="my-2 border-t border-[#EE6295]" />
                <div className="font-semibold text-sm mb-1">Cost Breakdown:</div>
                <div className="text-sm pl-2 space-y-1">
                  <div className="flex justify-between">
                    <span>{formData.foodItem}</span>
                    <span>Rs. {formData.price} - {formData.totalServing} servings</span>
                  </div>
                  {formData.addOns && (
                    <div className="flex justify-between">
                      <span>Add-ons ({formData.addOns})</span>
                      <span>Rs. {Math.round(parseInt(formData.price) * 0.1)}</span>
                    </div>
                  )}
                </div>
              </div>

              <hr className="my-2 border-t border-[#EE6295]" />
              <div className="text-sm flex gap-2">
                <span className="font-semibold">Subtotal:</span>
                <span>Rs. {formData.price}</span>
              </div>
              <div className="text-sm flex gap-2 font-bold mt-2">
                <span>Total: Rs. {Math.round(parseInt(formData.price) * 1.1)}</span>
                <span className="font-normal">(Tax applied)</span>
              </div>

              <div className="flex justify-end mt-6">
                <button onClick={handleCreate} className="bg-[#E5024E] text-white px-8 py-2 rounded-xl hover:bg-pink-600">
                  Create!
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);

}
