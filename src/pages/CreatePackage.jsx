import { useEffect, useState, useRef } from "react"
import { Search, Bell, User, MoreVertical, Check, MoreHorizontal } from "lucide-react"
import icons from "../constants/index"
import Header from "../components/Header"
import { useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from "framer-motion";

function CreatePackage() {
  const [activeMenu, setActiveMenu] = useState(null)
  const [showPopup, setShowPopup] = useState(false)
  const location = useLocation();
  const [SuccessPopup, setSuccessPopup] = useState(false);
  const [UpdatePopup, setUpdatePopup] = useState(false);
  const navigate = useNavigate()
  const menuRef = useRef(null);
  const [isFadingOut, setIsFadingOut] = useState(false);


  const packages = [
    {
      id: 1,
      title: "Grand Walima",
      description: "We have released the payment for your recent order. The amount has been transferred to your registered bank account.",
      isNew: true,
      packageName: "Grand Walima",
      packageType: "Buffet",
      foodItem: "Biryani, Korma, Naan",
      totalServing: "500",
      addOns: "Karachi",
      price: "500000",
      preparationTime: "2",
      deliveryTime: "1"
    },
    {
      id: 2,
      title: "Baraat",
      description: "We had warned you about the policy violations. Your account has been temporarily suspended.",
      isNew: true,
      packageName: "Baraat Package",
      packageType: "Box Meal",
      foodItem: "Chapli Kebab, Paratha",
      totalServing: "300",
      addOns: "Lahore",
      price: "300000",
      preparationTime: "1",
      deliveryTime: "1"
    },
    // ... other packages with their details
  ]

  useEffect(() => {
    if (location.state?.success) {
      if (location.state?.isUpdate) {
        setUpdatePopup(true);
        setIsFadingOut(false);
      } else {
        setSuccessPopup(true);
        setIsFadingOut(false);
      }
      const timer = setTimeout(() => {
        setIsFadingOut(true);
        setTimeout(() => {
          setSuccessPopup(false); // hide after animation
          setUpdatePopup(false);
        }, 300);
      }, 3000);
      window.history.replaceState({}, document.title);
      return () => clearTimeout(timer);
    }
  }, [location.state]);


  //     useEffect(() => {
  //   if (location.state?.success && location.state?.type === "create") {
  //     setSuccessPopup(true);
  //     setIsFadingOut(false); // ensure not fading initially

  //     const timer = setTimeout(() => {
  //       setIsFadingOut(true); // start fade out
  //       setTimeout(() => {
  //         setSuccessPopup(false); // hide after animation
  //       }, 300); // match animation duration
  //     }, 3000);

  //     window.history.replaceState({}, document.title);
  //     return () => clearTimeout(timer);
  //   }
  // }, [location.state]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click is on the MoreHorizontal button
      const isMoreButton = event.target.closest('button');
      if (isMoreButton) return;

      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveMenu(null);
        setShowPopup(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = (id) => {
    if (activeMenu === id) {
      setActiveMenu(null);
      setShowPopup(false);
    } else {
      setActiveMenu(id);
      setShowPopup(true);
    }
  }

  const handleDelete = (e) => {
    e.stopPropagation();
    // Add your delete logic here
    setActiveMenu(null);
    setShowPopup(false);
  }

  const handleCreatePackage = () => {
    navigate('/create-package/package-creation')
  }

  const handlePackageClick = (packageData) => {
    navigate('/create-package/edit-package', { state: { packageData } });
  }


  return (
    <div className="w-full min-h-screen bg-white p-4">
      {/* Container */}
      <div className="max-w-5xl mx-auto p-4">
        {/* Package List */}
        <div className="space-y-3 pt-2 px-4 sm:px-6 md:px-8 rounded-lg">
          {packages.length === 0 ? (
            <p className="text-center text-gray-400 py-8">No packages available.</p>
          ) : (
            packages.map((packageItem) => (
              <div
                key={packageItem.id}
                className="flex items-center justify-between py-3 px-4 shadow-md rounded-md cursor-pointer hover:bg-gray-50 transition"
                onClick={() => handlePackageClick(packageItem)}
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center flex-shrink-0">
                    {/* You had empty span, maybe add initials or icon */}
                    <span className="text-white text-sm font-semibold truncate">
                      {packageItem.title?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <h3 className="font-medium text-[#9E033B] truncate">{packageItem.title}</h3>
                </div>

                <div className="flex items-center gap-2 relative" ref={menuRef}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMenu(packageItem.id);
                    }}
                    className="text-[#E5024E] hover:text-pink-600 rounded"
                    aria-haspopup="true"
                    aria-expanded={activeMenu === packageItem.id}
                    aria-label="Open package menu"
                  >
                    <MoreHorizontal className="h-5 w-5" />
                  </button>

                  <AnimatePresence>
                    {activeMenu === packageItem.id && showPopup && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.3 }}
                        className="absolute right-0 top-full mt-2 w-36 bg-white p-2 rounded-lg flex flex-col gap-1 shadow-lg border border-gray-100 z-20"
                      >
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete();
                          }}
                          className="w-full px-2 py-2 rounded-md text-left text-xs text-red-600 hover:bg-gray-50 flex items-center gap-2"
                        >
                          <img src={icons.DeleteIcon} alt="Delete icon" className="h-4 w-4" />
                          Delete
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ))
          )}
        </div>


        {/* Floating Create Button */}
        <div
          onClick={handleCreatePackage}
          className="
    fixed bottom-6 left-1/2 transform -translate-x-1/2 
    md:bottom-10 md:right-10 md:left-auto md:transform-none
    w-16 h-16 md:w-20 md:h-20 bg-[#EA3270] hover:bg-pink-600 
    rounded-full shadow-lg flex items-center justify-center 
    cursor-pointer transition
  "
          aria-label="Create a new package"
          role="button"
        >
          <img
            src={icons.LazeezLogo}
            alt="Create Package"
            className="w-18 h-18 md:w-25 md:h-25"
            draggable={false}
          />
        </div>

      </div>

      {/* Popups */}
      {(SuccessPopup || UpdatePopup) && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black/60 bg-opacity-30 ${isFadingOut ? "animate-fade-out" : "animate-fade-in"
            }`}
        >
          <div className="bg-[#FDCBCB] p-6 rounded-xl text-center w-11/12 max-w-sm sm:w-96 shadow-lg">
            <div className="flex justify-center mb-4">
              <div className="bg-[#ED004F] p-3 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h2 className="text-lg font-semibold text-black mb-2">
              {SuccessPopup
                ? "Your package is created successfully!"
                : "Package updated successfully!"}
            </h2>
            <p className="text-sm text-[#1E1500]">
              {SuccessPopup
                ? "Get ready to offer an exceptional experience tailored to your customers' needs. Stay tuned for updates as orders start rolling in!"
                : "Your package has been updated with the latest information. The changes will be reflected immediately for your customers."}
            </p>
          </div>
        </div>
      )}
    </div>
  );

}

export default CreatePackage
