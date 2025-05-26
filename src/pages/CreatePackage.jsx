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
      <Header title={"Create a Package"} />
      <div className="w-full mx-auto p-4">
        <div className="space-y-3 pt-12 px-30 border-[#E6EFF5]">
          {packages.map((packageItem) => (
            <div
              key={packageItem.id}
              className="flex items-center justify-between py-2 px-4 shadow-[0_-2px_4px_-1px_rgba(0,0,0,0.1),0_8px_10px_-1px_rgba(0,0,0,0.1)] rounded-md cursor-pointer hover:bg-gray-50"
              onClick={() => handlePackageClick(packageItem)}
            >
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center">
                  <span className="text-white text-xs"></span>
                </div>
                <div className="flex flex-row flex-1">
                  <h3 className="font-medium text-[#9E033B]">{packageItem.title}</h3>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative" ref={menuRef}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMenu(packageItem.id);
                    }}
                    className="text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    <MoreHorizontal className="h-5 w-5 text-[#E5024E]" />
                  </button>

                  <AnimatePresence>
                    {activeMenu === packageItem.id && showPopup && (
                      <motion.div
                        ref={menuRef}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.5 }}
                        className="absolute -right-10 top-2 mt-2 w-36 bg-white p-2 rounded-lg flex flex-col gap-1 shadow-lg border border-gray-100 z-10"
                      >
                        <button
                          onClick={handleDelete}
                          className="w-full px-2 bg-[#ee62953b] py-2 rounded-md text-left text-xs text-red-600 hover:bg-gray-50 flex items-center gap-2 z-10"
                        >
                          <img src={icons.DeleteIcon} alt="" className="h-3 w-3" />
                          Delete
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* create button */}
        <div
          onClick={handleCreatePackage}
          className="absolute bottom-10 cursor-pointer bg-[#EA3270] hover:bg-pink-600 w-20 h-20 right-10 rounded-full shadow-[0_-2px_4px_-1px_rgba(0,0,0,0.1),0_8px_10px_-1px_rgba(0,0,0,0.1)] flex items-center justify-center"
        >
          <img src={icons.LazeezLogo} alt="Create Package" />
        </div>
      </div>
      {/* Create Package Success Popup */}
      {SuccessPopup && (
        <div className={`fixed inset-0 z-50 flex items-center justify-center bg-[#0000003a] bg-opacity-30 ${isFadingOut ? "animate-fade-out " : "animate-fade-in"}`}>
          <div className="bg-[#FDCBCB] p-6 rounded-xl text-center w-[20%] max-w-sm shadow-lg animate-fadeIn">
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
              Your package is created successfully!
            </h2>
            <p className="text-sm text-[#1E1500]">
              Get ready to offer an exceptional experience tailored to your customers' needs. Stay tuned for updates as orders start rolling in!
            </p>
          </div>
        </div>
      )}


      {/* Update Package Success Popup */}
      {UpdatePopup && (
        <div className={`fixed inset-0 z-50 flex items-center justify-center bg-[#0000003a] bg-opacity-30 ${isFadingOut ? "animate-fade-out " : "animate-fade-in"}`}>
          <div className="bg-[#FDCBCB] p-6 rounded-xl text-center w-[20%] max-w-sm shadow-lg animate-fadeIn">
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
              Package updated successfully!
            </h2>
            <p className="text-sm text-[#1E1500]">
              Your package has been updated with the latest information. The changes will be reflected immediately for your customers.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default CreatePackage
