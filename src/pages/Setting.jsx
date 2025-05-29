import { useState, useEffect } from "react";
import { Pencil, Search, Eye, EyeOff } from 'lucide-react';

import icons from "../constants";
import Header from "../components/Header";

// Mock data for demonstration
const mockVendorData = {
  vendorName: "Boss Pakwan Centre",
  businessType: "Catering",
  username: "Admin",
  password: "boss123@reez",
  address: "your present address",
  city: "karachi",
  totalWorkers: "233",
  postalCode: "23433",
  profileImage: null,
  businessTypes: ["Catering", "Restaurant", "Home Chef", "Cafe", "Bakery"],
  cities: [
    "Karachi",
    "Lahore",
    "Islamabad",
    "Faisalabad",
    "Peshawar",
    "Quetta",
    "Multan",
    "Rawalpindi",
    "Hyderabad",
    "Sialkot"
  ]
};

export default function Settings() {
  const [formData, setFormData] = useState(mockVendorData);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Simulate loading data from an API
  useEffect(() => {
    const fetchVendorData = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setFormData(mockVendorData);
      } catch (error) {
        setMessage({ type: 'error', text: 'Failed to load vendor data' });
      } finally {
        setIsLoading(false);
      }
    };

    fetchVendorData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setIsEditing(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      setIsEditing(false);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update profile' });
    } finally {
      setIsLoading(false);
    }
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

    const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full min-h-screen bg-white p-6">
      {/* <Header title="Settings" /> */}
      <div className="max-w-3xl p-4 md:p-6">
        <div className="mb-8">
          <h1 className="font-medium text-[#BF0644]">Edit Profile</h1>
          <div className="h-1 w-22 bg-[#9E033B] mt-1 rounded-t-full"></div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row gap-8 mb-8">
            <div className="flex-shrink-0 mx-auto md:mx-0">
              <div className="relative">
                <div className=" md:w-24 md:h-24 w-20 h-20 rounded-full bg-sky-100 overflow-hidden relative">
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
                  className="absolute bottom-0 right-0 bg-[#ED004F] text-white p-1.5 rounded-full cursor-pointer"
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


            <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-x-26 gap-x-10 gap-y-6">
              <div className="space-y-0">
                <label htmlFor="vendorName" className="text-[#ED004F] text-sm pb-1 block">Vendor Name</label>
                <input
                  id="vendorName"
                  name="vendorName"
                  value={formData.vendorName}
                  onChange={handleChange}
                  className="rounded-xl w-full lg:w-[318px] md:w-[250px] max-w-sm h-[50px] text-sm border border-[#9E033B] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>

              <div className="space-y-0">
                <label htmlFor="businessType" className="text-[#ED004F] text-sm pb-1 block">Business Type</label>
                <select
                  id="businessType"
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleChange}
                  className="rounded-xl w-full lg:w-[318px] md:w-[250px] max-w-sm h-[50px] text-sm border border-[#9E033B] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                  {mockVendorData.businessTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-0">
                <label htmlFor="userName" className="text-[#ED004F] text-sm pb-1 block">Username</label>
                <input
                  id="userName"
                  name="userName"
                  value={formData.username}
                  onChange={handleChange}
                  className="rounded-xl w-full lg:w-[318px] max-w-sm h-[50px] text-sm border border-[#9E033B] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>

              <div className="space-y-0 relative">
                <label htmlFor="password" className="text-[#ED004F] text-sm pb-1 block">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="rounded-xl w-full lg:w-[318px] max-w-sm h-[50px] text-sm border border-[#9E033B] px-3 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />

                {/* Eye Icon */}
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute lg:-right-12 right-6 top-[38px] text-[#ED004F]"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <div className="space-y-0">
                <label htmlFor="address" className="text-[#ED004F] text-sm pb-1 block">Present Address</label>
                <input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="rounded-xl w-full lg:w-[318px] max-w-sm h-[50px] text-sm border border-[#9E033B] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>

              <div className="space-y-0">
                <label htmlFor="city" className="text-[#ED004F] text-sm pb-1 block">City</label>
                <select
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="rounded-xl w-full lg:w-[318px] max-w-sm h-[50px] text-sm border border-[#9E033B] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                  {mockVendorData.cities.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-0">
                <label htmlFor="totalWorkers" className="text-[#ED004F] text-sm pb-1 block">Total Workers</label>
                <input
                  id="totalWorkers"
                  name="totalWorkers"
                  value={formData.totalWorkers}
                  onChange={handleChange}
                  className="rounded-xl w-full lg:w-[318px] max-w-sm h-[50px] text-sm border border-[#9E033B] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>

              <div className="space-y-0">
                <label htmlFor="postalCode" className="text-[#ED004F] text-sm pb-1 block">Postal Code</label>
                <input
                  id="postalCode"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  className="rounded-xl w-full lg:w-[318px] max-w-sm h-[50px] text-sm border border-[#9E033B] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
            </div>

          </div>

          <div className="flex justify-end items-center gap-5 mt-8">
            {message.text && (
              <div className={`text-sm ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                {message.text}
              </div>
            )}
            <button
              type="submit"
              disabled={isLoading || !isEditing}
              className={`bg-[#E5024E] text-white px-14 py-2 rounded-xl cursor-pointer ${(isLoading || !isEditing) ? 'cursor-not-allowed' : 'hover:bg-pink-600 opacity-50 '
                }`}
            >
              {isLoading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
