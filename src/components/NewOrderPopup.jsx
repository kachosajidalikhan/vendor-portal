import { useState, useEffect, useRef } from 'react';
import fiels from '../constants/index';
import { Check, X } from 'lucide-react';
import Sound from '/sounds/notification.mp3';

const randomOrder = {
  name: 'Muhammad Ali',
  location: 'Plot 232, JTH, Karachi.',
  packageName: 'Majlis Pack 1',
  deliveryDateTime: '16, Oct, 2025 - 9:00 p.m.',
  price: '100,000',
  specialInstructions: 'Use olive oil',
  addOns: 'No',
};

const NewOrderPopup = ({ isOpen, onClose, onAccept, onReject, orderData = randomOrder }) => {
  const [isVisible, setIsVisible] = useState(false);
  const audioRef = useRef(new Audio(Sound));

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      audioRef.current.play().catch(error => {
        console.log('Audio playback failed:', error);
      });
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible && !isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 transition-opacity duration-500 bg-black ${
          isOpen ? 'opacity-30' : 'opacity-0'
        }`}
      />

      {/* Popup Container */}
      <div className="absolute top-0 right-0 h-full w-full flex justify-end items-center p-4 md:p-10">
        <div
          className={`transform transition-transform duration-500 ease-in-out ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          } w-full max-w-[500px]`}
        >
          <div className="bg-[#EE6295] rounded-xl p-4 md:p-6 w-full max-h-[90vh] overflow-y-auto shadow-lg">
            <h2 className="text-lg md:text-xl font-semibold text-white mb-4">New Order!</h2>

            <div className="relative flex flex-col sm:flex-row sm:gap-4">
              {/* Order Details */}
              <div className="text-white text-sm space-y-2">
                <div><b>Name:</b> {orderData.name}</div>
                <div><b>Location:</b> {orderData.location}</div>
                <div><b>Package Name:</b> {orderData.packageName}</div>
                <div><b>Delivery date & time:</b> {orderData.deliveryDateTime}</div>
                <div><b>Price:</b> Rs. {orderData.price}</div>
                <div><b>Special instructions:</b> {orderData.specialInstructions}</div>
                <div><b>Any add-ons?:</b> {orderData.addOns}</div>
              </div>

              {/* Chef Image */}
              <div className="mt-4 sm:mt-0 sm:ml-auto flex justify-end">
                <img src={fiels.chefIcon} alt="Chef" className="w-28 h-28 object-contain" />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-around gap-3 mt-6">
              <button
                onClick={onAccept}
                className="flex items-center justify-center text-sm pl-2 pr-6 py-2 bg-[#9E033B] text-white rounded-lg hover:bg-pink-600 font-semibold shadow w-full sm:w-auto"
              >
                <Check size={15} className="mr-1" /> Accept
              </button>
              <button
                onClick={onReject}
                className="flex items-center justify-center text-sm pl-6 pr-2 py-2 bg-[#7f012bab] rounded-lg text-white hover:bg-white hover:text-[#E5024E] font-semibold shadow w-full sm:w-auto"
              >
                Reject <X size={15} className="ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewOrderPopup;
