import { useState, useEffect, useRef } from "react"
import { Search, Bell, User, MoreVertical, Check, MoreHorizontal } from "lucide-react"
import icons from "../constants/index"
import { useNavigate, NavLink, useLocation } from "react-router-dom"
import Header from "../components/Header"
import { motion, AnimatePresence } from "framer-motion";


function CreateOffer() {
  const [activeMenu, setActiveMenu] = useState(null)
  const [showPopup, setShowPopup] = useState(false)
  const location = useLocation();
  const [SuccessPopup, setSuccessPopup] = useState(false);
  const [SavePopup, setSavePopup] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState(null);

  const nav = useNavigate()

  const image = icons.LazeezImage

  const notifications = [
    { id: 1, image: image, audience: "Family waly", foodCategory: "fast food", title: "Ramadan Special Ramadan Special 10%", subTitles: "We have released the payment for your recent order.", isNew: true },
    { id: 2, image: image, audience: "Dost log", foodCategory: "garm food", title: "Ramadan Special 30%", subTitles: "We had warned you about the policy violations.", isNew: false },
    { id: 3, image: image, audience: "Girl friend", foodCategory: "thanda food", title: "Eid Special", subTitles: "Some new releases at discounted prices.", isNew: true },
    { id: 4, image: image, audience: "Bary log", foodCategory: "pak food", title: "Majlis", subTitles: "We have released the payment for your recent order.", isNew: false },
    { id: 5, image: image, audience: "Choty log", foodCategory: "china food", title: "Birthday special 1", subTitles: "We have released the payment for your recent order.", isNew: true },
    { id: 6, image: image, audience: "Moty log", foodCategory: "desi food", title: "Birthday special 2", subTitles: "We have released the payment for your recent order.", isNew: false },
  ]

   const handleMoreClick = (id) => {
    setOpenDropdownId(openDropdownId === id ? null : id)
  }

  const handleMarkAsRead = (id) => {
    // Add your mark as read logic here
    setOpenDropdownId(null)
  }

  const handleDelete = (id) => {
    setOrders(orders.filter(order => order.id !== id))
    setOpenDropdownId(null)
  }

  useEffect(() => {
    if (location.state?.success && location.state?.type === "create") {
      setSuccessPopup(true);
      setIsFadingOut(false); // ensure not fading initially

      const timer = setTimeout(() => {
        setIsFadingOut(true); // start fade out
        setTimeout(() => {
          setSuccessPopup(false); // hide after animation
        }, 300); // match animation duration
      }, 3000);

      window.history.replaceState({}, document.title);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  useEffect(() => {
    if (location.state?.success && location.state?.type === "edit") {
      setSavePopup(true);
      setIsFadingOut(false);

      const timer = setTimeout(() => {
        setIsFadingOut(true);
        setTimeout(() => {
          setSavePopup(false);
        }, 300);
      }, 3000);

      window.history.replaceState({}, document.title);
      return () => clearTimeout(timer);
    }
  }, [location.state]);


  const menuRef = useRef(null);
  useEffect(() => {
      const handleClickOutside = (event) => {
        // Check if the click is on the MoreHorizontal button
        const isMoreButton = event.target.closest('button');
        if (isMoreButton) return;
  
        if (menuRef.current && !menuRef.current.contains(event.target)) {
          setOpenDropdownId(null);
        }
      };
  
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
  


  const handleDetail = (notification) => () => {
    nav(`/create-offer/create-offer-detail/${notification.id}`, { state: { notification } })
  }


  return (
    <div className="w-full min-h-screen bg-white">
      <div className="w-full mx-auto p-4">
        {/* <Header title={"Create an Offer"} /> */}

        <div className="space-y-3 pt-12 md:px-30 border-[#E6EFF5]">
          {SavePopup && (
            <div className={`absolute top-20 left-10 right-0 m-auto flex items-center gap-2 p-2 bg-white rounded-xl shadow-lg w-1/2 ${isFadingOut ? "animate-fade-out " : "animate-fade-in"} `}>
              <svg className="w-5 h-5 rounded-full bg-[#3A974C]/21 text-[#3A974C]" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-[#3A974C] font-semibold text-sm">Save</span>
            </div>
           )}
          {notifications.map((notification) => (
            <div onClick={handleDetail(notification)} key={notification.id} className="flex items-center justify-between py-2 px-4 shadow-[0_-2px_4px_-1px_rgba(0,0,0,0.1),0_8px_10px_-1px_rgba(0,0,0,0.1)] rounded-md">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center">
                  <span className="text-white text-xs"></span>
                </div>
                <div className="flex flex-row flex-1">
                  <h3 className="font-medium text-[#9E033B]">{notification.title}</h3>
                </div>
              </div>
              <div className="relative" ref={menuRef}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMoreClick(notification.id);
                  }}
                  className="focus:outline-none cursor-pointer"
                >
                  <MoreHorizontal className="h-5 w-5 text-[#E5024E] z-5" />
                </button>
                <AnimatePresence>

                {openDropdownId === notification.id && (
                  <motion.div
                        ref={menuRef}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.5 }}
                        // className="absolute -right-10 top-2 mt-2 w-36 bg-white p-2 rounded-lg flex flex-col gap-1 shadow-lg border border-gray-100 z-10"
                      >

                  <div
                    className="absolute -right-4 mt-2 w-36 bg-white p-2 rounded-lg flex flex-col gap-1 shadow-lg border border-gray-100 z-10"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMarkAsRead(notification.id);
                      }}
                      className="w-full hover:bg-[#f0f0f0] hover:text-[#DB024D] bg-gray-50 px-2 py-2 rounded-lg text-left text-xs text-gray-700 flex items-center gap-2 z-10"
                      >
                      <img src={icons.MarkAsRead} alt="" className="h-3 w-3" />
                      Mark as Read
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(notification.id);
                      }}
                      className="w-full px-2 bg-[#ee62953b] py-2 rounded-md text-left text-xs text-red-600 hover:bg-gray-50 flex items-center gap-2 z-10"
                      >
                      <img src={icons.DeleteIcon} alt="" className="h-3 w-3" />
                      Delete
                    </button>
                  </div>
                        </motion.div>
                )}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>
        <NavLink to="/create-offer/creating-offer">
          <div className="absolute bottom-10 bg-[#9E033B] w-20 h-20  right-10 rounded-full shadow-[0_-2px_4px_-1px_rgba(0,0,0,0.1),0_8px_10px_-1px_rgba(0,0,0,0.1)]">
            <img src={icons.LazeezLogo} alt="" />
          </div>
        </NavLink>
      </div>
      {SuccessPopup && (
        <div className={`fixed inset-0 z-50 flex items-center justify-center bg-[#0000003a] bg-opacity-30 ${isFadingOut ? "animate-fade-out " : "animate-fade-in"}`}>
          <div className="bg-[#FDCBCB] p-6 rounded-xl text-center lg:w-[20%] w-70 max-w-sm shadow-lg animate-fadeIn">
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
              Your offer launched successfully!
            </h2>
            <p className="text-sm text-[#1E1500]">
              Get ready to offer an exceptional experience tailored to your customers’ needs.
              Stay tuned for updates as orders start rolling in!
            </p>
          </div>
        </div>
       )}
    </div>
  )
}

export default CreateOffer
