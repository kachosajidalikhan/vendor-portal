import { useState, useEffect } from "react";
import { Pencil, Search } from 'lucide-react';
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

            <div className="flex-grow">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-36 gap-y-6">
                <div className="space-y-0">
                  <div htmlFor="vendorName" className="text-[#ED004F] text-sm pb-1">Vendor Name</div>
                  <input
                    id="vendorName"
                    name="vendorName"
                    value={formData.vendorName}
                    onChange={handleChange}
                    className="rounded-xl w-[318px] h-[50px] text-sm border border-[#9E033B] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>
                <div className="space-y-0">
                  <div htmlFor="businessType" className="text-[#ED004F] text-sm pb-1">Business Type</div>
                  <select
                    id="businessType"
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleChange}
                    className="rounded-xl w-[318px] h-[50px] text-sm border border-[#9E033B] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  >
                    {mockVendorData.businessTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-0">
                  <div htmlFor="userName" className="text-[#ED004F] text-sm pb-1">Username</div>
                  <input
                    id="userName"
                    name="userName"
                    value={formData.username}
                    onChange={handleChange}
                    className="rounded-xl w-[318px] h-[50px] text-sm border border-[#9E033B] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>

                <div className="space-y-0">
                  <div htmlFor="password" className="text-[#ED004F] text-sm pb-1">Password</div>
                  <input
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="rounded-xl w-[318px] h-[50px] text-sm border border-[#9E033B] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>
                <div className="space-y-0">
                  <div htmlFor="address" className="text-[#ED004F] text-sm pb-1">Present Address</div>
                  <input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="rounded-xl w-[318px] h-[50px] text-sm border border-[#9E033B] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>

                <div className="space-y-0">
                  <div htmlFor="city" className="text-[#ED004F] text-sm pb-1">City</div>
                  <select
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="rounded-xl w-[318px] h-[50px] text-sm border border-[#9E033B] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  >
                    {mockVendorData.cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-0">
                  <div htmlFor="totalWorkers" className="text-[#ED004F] text-sm pb-1">Total workers</div>
                  <input
                    id="totalWorkers"
                    name="totalWorkers"
                    value={formData.totalWorkers}
                    onChange={handleChange}
                    className="rounded-xl w-[318px] h-[50px] text-sm border border-[#9E033B] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>

                <div className="space-y-0">
                  <div htmlFor="postalCode" className="text-[#ED004F] text-sm pb-1">Postal Code</div>
                  <input
                    id="postalCode"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    className="rounded-xl w-[318px] h-[50px] text-sm border border-[#9E033B] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>
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
              className={`bg-[#E5024E] text-white px-14 py-2 rounded-xl cursor-pointer ${
                (isLoading || !isEditing) ? 'cursor-not-allowed' : 'hover:bg-pink-600 opacity-50 '
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
