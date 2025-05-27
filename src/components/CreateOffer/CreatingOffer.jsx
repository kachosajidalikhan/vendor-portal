
import React, { useState } from "react"
import { ChevronDown, Plus } from "lucide-react"
import { useNavigate } from "react-router-dom";
import Header from "../Header"
import { div } from "framer-motion/client";

export default function CreatingOfferPage() {
  const [formData, setFormData] = useState({
    image: null,
    heading: "",
    subheading: "",
    targetedAudience: "",
    foodCategory: "",
  });

  const navigate = useNavigate();

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          setFormData({
            ...formData,
            image: event.target.result,
          });
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLaunch = (e) => {
    // Yahan API call ya backend save logic aayega
    // For now, hum dummy success maan lete hain

    // Redirect with state
    e.preventDefault();
    navigate("/create-offer", { state: { success: true, type: "create" } });
  };

  return (
    <div className="flex flex-col lg:flex-row bg-white min-h-screen">
      {/* Editor Section */}
      <div className="w-full lg:w-3/5 p-4 overflow-y-auto">
        <form onSubmit={handleLaunch} className="space-y-6">
          <div className="max-w-md mx-auto space-y-6">
            {/* Image Upload */}
            <div className="relative overflow-hidden">
              <label
                htmlFor="image-upload"
                className="w-full h-40 bg-gray-200 rounded-md cursor-pointer flex items-center justify-center"
              >
                {formData.image ? (
                  <img
                    src={formData.image}
                    alt="Uploaded preview"
                    className="w-fit h-full rounded-md"
                  />
                ) : (
                  <Plus className="text-rose-500" />
                )}
              </label>
              <input
                id="image-upload"
                required
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>

            {/* Heading Input */}
            <div>
              <label className="block text-[#ED004F] mb-1">Offer's Heading</label>
              <input
                type="text"
                name="heading"
                required
                placeholder="Enter your heading here"
                className="w-full h-[50px] px-3 py-2 border border-gray-300 rounded-md"
                value={formData.heading}
                onChange={handleInputChange}
              />
            </div>

            {/* Subheading */}
            <div>
              <label className="block text-[#ED004F] mb-1">Offer's Subheading</label>
              <input
                type="text"
                name="subheading"
                required
                placeholder="Enter your subheading here"
                className="w-full h-[50px] px-3 py-2 border border-gray-300 rounded-md"
                value={formData.subheading}
                onChange={handleInputChange}
              />
            </div>

            {/* Targeted Audience */}
            <div>
              <label className="block text-[#ED004F] mb-1">Choose Your Targeted Audience</label>
              <div className="relative">
                <select
                  name="targetedAudience"
                  required
                  className="w-full h-[50px] px-3 py-2 border border-gray-300 rounded-md appearance-none"
                  value={formData.targetedAudience}
                  onChange={handleInputChange}
                >
                  <option value="" disabled>
                    Select your targeted audience
                  </option>
                  <option value="families">Families</option>
                  <option value="young-adults">Young Adults</option>
                  <option value="seniors">Seniors</option>
                  <option value="students">Students</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              </div>
            </div>

            {/* Food Category */}
            <div>
              <label className="block text-[#ED004F] mb-1">Food Category</label>
              <div className="relative">
                <select
                  name="foodCategory"
                  required
                  className="w-full h-[50px] px-3 py-2 border border-gray-300 rounded-md appearance-none"
                  value={formData.foodCategory}
                  onChange={handleInputChange}
                >
                  <option value="" disabled>
                    Choose food category
                  </option>
                  <option value="Desi Food">Desi Food</option>
                  <option value="Chinese Food">Chinese Food</option>
                  <option value="Desserts & Sweets">Desserts & Sweets</option>
                  <option value="Continental Food">Continental Food</option>
                  <option value="Fast Food">Fast Food</option>
                  <option value="Snacks & Appetizers">Snacks & Appetizers</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              </div>
            </div>

            {/* Launch Button */}
            <div className="flex justify-center">
              <button type="submit" className="w-1/2 bg-[#E5024E] text-white py-2 Poppins-bold rounded-md hover:bg-rose-600 transition">
                Launch!
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Preview Section */}
      <div className="w-full lg:w-1/4 p-4">
        <div className="max-w-md mx-auto relative">
          <div className="flex items-center justify-center mb-4 mt-4">
            <button className="bg-[#e5024ee5] text-white px-6 py-2 rounded-xl hover:bg-rose-600 transition w-full lg:w-1/2">
              Preview
            </button>
          </div>

          <div className="bg-[#DD4F82] rounded-lg p-4 text-white relative overflow-hidden min-h-[300px]">
            <div className="relative z-10">
              {formData.heading && <h2 className="text-xl font-bold mb-2">{formData.heading}</h2>}
              {formData.subheading && <p className="text-[#ffffff]/50">{formData.subheading}</p>}
              {formData.targetedAudience && (
                <div className="text-sm text-[#ffffff]/50">For: {formData.targetedAudience}</div>
              )}
            </div>
            {formData.foodCategory && (
              <div className="text-sm absolute bottom-3">Category: {formData.foodCategory}</div>
            )}
          </div>

          {formData.image && (
            <div className="absolute top-40 -right-22 md:-right-35 -translate-x-1/2 z-50 rounded-full overflow-hidden w-40 h-40 bg-white shadow-lg">
              <img
                src={formData.image || "/placeholder.svg"}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </div>

  )
}
