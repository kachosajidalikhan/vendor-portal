import { useState } from 'react';
import { X } from 'lucide-react';

const CancelOrderModal = ({ isOpen, onClose, onSubmit, orderId }) => {
  const [reason, setReason] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(orderId, reason);
    setReason('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="relative w-full max-w-md sm:max-w-lg md:max-w-xl">
        <div className="relative bg-[#F2C1D3] rounded-xl z-20 p-4 sm:p-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-bold text-black">Reason to cancel the order?</h2>
            <span
              className="bg-[#E5024E] hover:bg-pink-500 text-white h-5 w-5 flex justify-center items-center cursor-pointer"
              onClick={onClose}
            >
              <X color="#fff" size={14} />
            </span>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="w-full">
              <label
                htmlFor="reason"
                className="block text-sm text-[#CC054D] mb-2"
              >
                Please communicate the reason for canceling the order to the customer clearly and professionally to maintain transparency and trust.
              </label>
              <textarea
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full px-3 py-2 text-[#CC054D] border border-[#CC054D] rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                rows="4"
                placeholder="Type here..."
                required
              />
            </div>

            <div className="flex justify-end mt-4">
              <button
                type="submit"
                className="px-8 sm:px-16 py-2 bg-[#E5024E] text-white rounded-lg hover:bg-pink-600"
              >
                Submit
              </button>
            </div>
          </form>
        </div>

        <div className="absolute inset-0 -top-1 -left-3 w-full h-full rounded-md blur-sm bg-gradient-to-br from-[#F2C1D3] to-[#F2C1D3] z-10"></div>
      </div>
    </div>
  );
};

export default CancelOrderModal;
