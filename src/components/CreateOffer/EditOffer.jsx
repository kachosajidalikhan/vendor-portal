
import React, { useState } from "react"
import { ChevronDown, Plus } from "lucide-react"
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Header from "../Header"

export default function EditOfferPage() {
  const location = useLocation();
  const { offerData } = location.state || {};
  const [formData, setFormData] = useState({
    image: offerData.image || null,
    title: offerData.title || "",
    subTitles: offerData.subTitles || "",
    audience: offerData.audience || "",
    foodCategory: offerData.foodCategory || "",
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

  const handleSave = () => {
    // Yahan API call ya backend save logic aayega
    // For now, hum dummy success maan lete hain

    // Redirect with state
    navigate("/create-offer", { state: { success: true, type: "edit" } });
  };

  return (
    <div className="bg-white p-6 space-y-8">
      <div className="flex flex-col lg:flex-row h-auto lg:h-screen">
        {/* Editor Section */}
        <div className="w-full lg:w-[60%] p-6 overflow-y-auto">
          <div className="relative max-w-md mx-auto space-y-6">
            {/* Vertical Divider only on large screen */}
            {/* <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-px bg-[#EE6295] h-full"></div> */}

            {/* Image Upload */}
            <div className="relative overflow-hidden">
              <label
                htmlFor="image-upload"
                className="w-1/2 float-end h-30 bg-gray-200 rounded-md cursor-pointer flex items-center justify-center"
              >
                {formData.image ? (
                  <img
                    src={formData.image || "/placeholder.svg"}
                    alt="Uploaded preview"
                    className="w-fit h-full rounded-md"
                  />
                ) : (
                  <Plus className="text-rose-500" />
                )}
              </label>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>

            {/* Heading */}
            <div>
              <label className="block text-[#ED004F] mb-1">Offer's Heading</label>
              <input
                type="text"
                name="title"
                placeholder="Enter your heading here"
                className="w-full h-[50px] px-3 py-2 border border-gray-300 rounded-md"
                value={formData.title}
                onChange={handleInputChange}
              />
            </div>

            {/* Subheading */}
            <div>
              <label className="block text-[#ED004F] mb-1">Offer's Subheading</label>
              <input
                type="text"
                name="subTitles"
                placeholder="Enter your subheading here"
                className="w-full h-[50px] px-3 py-2 border border-gray-300 rounded-md"
                value={formData.subTitles}
                onChange={handleInputChange}
              />
            </div>

            {/* Targeted Audience */}
            <div>
              <label className="block text-[#ED004F] mb-1">Choose Your Targeted Audience</label>
              <div className="relative">
                <select
                  name="targetedAudience"
                  className="w-full h-[50px] px-3 py-2 border border-gray-300 rounded-md appearance-none"
                  value={formData.audience}
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

            {/* Save Button */}
            <div className="flex justify-center">
              <button
                onClick={handleSave}
                className="w-1/2 lg:w-1/3 bg-[#E5024E] text-white py-2 Poppins-bold rounded-md hover:bg-rose-600 transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <div className="w-full lg:w-[30%] md:w-[100%] md:p-6">
          <div className="max-w-md mx-auto relative">
            <div className="flex items-center justify-center mb-4 mt-4">
              <button className="mb-6 bg-[#e5024ee5] text-white px-6 py-2 rounded-xl hover:bg-rose-600 transition w-1/2">
                Preview
              </button>
            </div>

            <div className="bg-[#DD4F82] rounded-lg p-4 text-white relative overflow-hidden min-h-[300px]">
              <div className="relative z-10">
                {formData.title && <h2 className="text-xl font-bold mb-2">{formData.title}</h2>}
                {formData.subTitles && <p className=" text-[#ffffff]/50">{formData.subTitles}</p>}
                {formData.audience && <div className="text-sm text-[#ffffff]/50">For: {formData.audience}</div>}
              </div>

              {formData.foodCategory && (
                <div className="text-sm absolute bottom-3">Category: {formData.foodCategory}</div>
              )}
            </div>

            {offerData.image && (
              <div className="absolute md:top-40 top-50 md:-right-30 -right-24  transform -translate-x-1/2 z-10 rounded-full overflow-hidden w-40 h-40 bg-white shadow-lg">
                <img
                  src={offerData.image || "/placeholder.svg"}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>

  )
}
