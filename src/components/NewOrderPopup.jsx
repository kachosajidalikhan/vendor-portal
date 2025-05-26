import { useState, useEffect, useRef } from 'react';
import fiels from '../constants/index';
import { Check, X } from 'lucide-react';
import Sound from '/sounds/notification.mp3';
// import chefImg from 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=facearea&w=256&h=256&facepad=2';

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
      // Play sound when popup opens
      audioRef.current.play().catch(error => {
        console.log('Audio playback failed:', error);
      });
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 500); // Match this with the animation duration
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible && !isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 transition-opacity duration-500 ${isOpen ? 'opacity-30' : 'opacity-0'}`}
        // onClick={onClose}
      />
      
      {/* Popup */}
      <div className="absolute top-0 right-0 h-full flex items-center">
        <div 
          className={`transform transition-transform duration-500 ease-in-out ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="bg-[#EE6295] rounded-xl p-6 w-[500px]">
            {/* Left: Order Details */}
            <div className="flex-1 space-y-1">
              <h2 className="text-xl font-semibold text-white mb-2">New Order!</h2>
              <div className='flex items-center relative'>
                <div className="text-white space-y-1 text-sm">
                  <div><b>Name:</b> {orderData.name}</div>
                  <div><b>Location:</b> {orderData.location}</div>
                  <div><b>Package Name:</b> {orderData.packageName}</div>
                  <div><b>Delivery date & time:</b> {orderData.deliveryDateTime}</div>
                  <div><b>Price:</b> Rs. {orderData.price}</div>
                  <div><b>Special instructions:</b> {orderData.specialInstructions}</div>
                  <br />
                  <div><b>Any add-ons?:</b> {orderData.addOns}</div>
                </div>
                {/* Right: Chef Illustration */}
                <div className='absolute right-0'>
                  <img src={fiels.chefIcon} alt="Chef" className='w-50 h-50' />
                </div>
              </div>
            </div>
            <div className="flex justify-around mt-6">
              <button
                onClick={onAccept}
                className="flex items-center cursor-pointer justify-center text-sm pl-2 pr-6 bg-[#9E033B] text-white rounded-lg hover:bg-pink-600 font-semibold shadow"
              >
                <span className="pr-1"><Check size={15}/></span> Accept
              </button>
              <button
                onClick={onReject}
                className="flex items-center cursor-pointer justify-center text-sm pl-6 pr-2 py-0.5 bg-[#7f012bab] rounded-lg text-white hover:bg-white hover:text-[#E5024E] font-semibold"
              >
                Reject <span className="pl-1"><X size={15}/></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewOrderPopup; 