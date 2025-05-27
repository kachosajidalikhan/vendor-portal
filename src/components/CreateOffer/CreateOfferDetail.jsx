import { div } from 'framer-motion/client';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';
import { ChevronLeft } from 'lucide-react';

const CreateOfferDetail = () => {
  const location = useLocation();
  const { notification } = location.state || {};
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [offerData, setOfferData] = useState(null);



  useEffect(() => {
    // Simulate loading for 3 seconds
    const timer = setTimeout(() => {
      if (notification) {
        setOfferData(notification);
      }
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [notification]);


  const handleEdit = () => {
    // Navigate to the edit page with the offer ID
    if (offerData) {
      navigate(`/create-offer/edit-offer/${offerData.id}`, { state: { offerData } });
    }
  };

  return (
    <div className="min-h-screen bg-white p-6 space-y-8">
      {/* <Header title={"Offer Details"} /> */}
      {/* Top Metrics Card */}
      <div className="relative">
        {/* Back Button */}
        <div onClick={() => navigate(-1)} className="pb-2 cursor-pointer">
          <ChevronLeft color="#ED004F" />
        </div>

        {/* Header with Metrics Labels & Edit Button */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between bg-white rounded-2xl shadow-lg py-4 px-4 md:px-6 space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row md:space-x-12 space-y-4 md:space-y-0 items-center">
            <MetricHeader label="Audience Reached" />
            <MetricHeader label="Audience Engaged" />
            <MetricHeader label="Conversion Rate" />
          </div>

          <div className="flex justify-center md:justify-end">
            <button
              onClick={() => handleEdit()}
              className="bg-[#E5024E]/80 text-white px-6 py-2 rounded-xl font-semibold text-sm shadow-md hover:bg-pink-600 transition"
            >
              Edit
            </button>
          </div>
        </div>

        {/* Metric Values Row */}
        <div className="flex flex-col md:flex-row items-center justify-center md:space-x-24 space-y-2 md:space-y-0 w-full md:w-[60%] mt-3 mx-auto px-4 py-3 bg-white rounded-xl shadow-lg">
          <div className="w-full md:w-24 text-center text-gray-800 font-medium">5,000</div>
          <div className="w-full md:w-24 text-center text-gray-800 font-medium">3,333</div>
          <div className="w-full md:w-24 text-center text-green-600 font-semibold">12%+</div>
        </div>
      </div>


      {/* Content Section */}
      <div className="flex justify-center items-center">
        {loading ? (
          // {/* // 👇 Loading placeholder block */}
          <div className='lg:w-[30%] md:w-[60%] w-[70%] max-w-md mx-auto'>
            <div className="relative bg-[#DD4F82] w-1/1 min-h-[400px] rounded-xl p-4 animate-pulse">
              <div className="space-y-3">
                <div className="bg-white h-4 rounded-md w-3/4"></div>
                <div className="bg-white h-4 rounded-md w-2/3"></div>
                <div className="bg-white h-4 rounded-md w-1/2"></div>
              </div>
              <div className="absolute bottom-4 left-4 bg-[#ED004F] h-4 w-3/4 rounded-full"></div>
              <div className="absolute right-[-40px] bottom-8 w-24 h-24 bg-[#ED004F] rounded-full"></div>
            </div>
          </div>
         ) : ( 
          // {/* // 👇 Real content block */}
          <div className="lg:lg:w-[35%] md:w-[60%] w-[100%] md:p-6">
            <div className="max-w-md mx-auto relative">

              <div className="bg-[#DD4F82] w-1/1 rounded-lg p-4 text-white relative overflow-hidden min-h-[400px]">
                {/* Preview Content */}
                <div className="relative z-10">
                  {offerData.title && <h2 className="text-xl Poppins-bold mb-2">{offerData.title}</h2>}
                  {offerData.subTitles && <p className=" text-[#ffffff]/50">{offerData.subTitles}</p>}
                  {offerData.audience && <div className="text-sm text-[#ffffff]/50">For: {offerData.audience}</div>}
                </div>

                {/* Decorative Circle */}
                {/* <div className="absolute bottom-0 right-0 w-24 h-24 bg-rose-400 rounded-full transform translate-x-1/4 translate-y-1/4"></div> */}

                {/* Preview Image */}
                {offerData.foodCategory && <div className="text-sm absolute bottom-5">Category: {offerData.foodCategory}</div>}
              </div>
              {offerData.image && (
                <div className="absolute md:top-25 top-30 -right-6 lg:left-35 md:-right-16 z-1000 rounded-full overflow-hidden md:w-60 md:h-60 w-50 h-50 bg-white shadow-lg">
                  <img
                    src={offerData.image || "/placeholder.svg"}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        )} 
      </div>
    </div>
  );
};
const MetricHeader = ({ label }) => (
  <div className="flex flex-col items-center">
    <div className="flex items-center space-x-2">
      <div className="w-6 h-6 bg-[#EE6295] rounded-full"></div>
      <span className="text-sm font-semibold text-[#9E033B]">{label}</span>
    </div>
  </div>
);

export default CreateOfferDetail;
