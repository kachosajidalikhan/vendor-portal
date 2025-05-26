import { useState, useRef, useEffect } from "react"
import { MoreHorizontal } from "lucide-react"
import icons from "../constants/index"
import Header from "../components/Header"
import { motion, AnimatePresence } from "framer-motion";


function Notifications() {
  const [activeMenu, setActiveMenu] = useState(null)
  const [showPopup, setShowPopup] = useState(false)
  const popupRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setActiveMenu(null)
        setShowPopup(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const notifications = [
    { id: 1, title: "Your payment is released", description: "We have released the payment for your recent order. The amount has been transferred to your registered bank account.", isNew: true },
    { id: 2, title: "We have suspended your account!", description: "We had warned you about the policy violations. Your account has been temporarily suspended.", isNew: true },
    { id: 3, title: "New offers", description: "Some new releases at discounted prices. Check them out now!", isNew: true },
    { id: 4, title: "Your payment is released", description: "We have released the payment for your recent order. The amount has been transferred to your registered bank account.", isNew: false },
    { id: 5, title: "Your payment is released", description: "We have released the payment for your recent order. The amount has been transferred to your registered bank account.", isNew: false },
    { id: 6, title: "Your payment is released", description: "We have released the payment for your recent order. The amount has been transferred to your registered bank account.", isNew: false },
    { id: 7, title: "Your payment is released", description: "We have released the payment for your recent order. The amount has been transferred to your registered bank account.", isNew: false },
    { id: 8, title: "Personalize your account", description: "Start with 3 steps to personalize your account and get better recommendations.", isNew: false },
    { id: 9, title: "Contact us and get help", description: "Need assistance? Our support team is available 24/7 to help you.", isNew: false },
    { id: 10, title: "Welcome!", description: "We welcome you to Lazeez Events! Get started by exploring our platform.", isNew: false },
  ]

  const toggleMenu = (id) => {
    if (activeMenu === id) {
      setActiveMenu(null)
      setShowPopup(false)
    } else {
      setActiveMenu(id)
      setShowPopup(true)
    }
  }

  const handleMarkAsRead = () => {
    console.log("Marked as read")
  }

  const handleDelete = () => {
    console.log("Deleted notification")
  }

  return (
    <div className="w-full min-h-screen bg-white p-2">
      <div className="w-full mx-auto p-4">
        {/* <Header title="Notifications" /> */}

        <div className="space-y-3 pt-12 px-30 border-l border-[#E6EFF5]">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="flex items-center justify-between py-2 px-4 shadow-[0_-2px_4px_-1px_rgba(0,0,0,0.1),0_8px_10px_-1px_rgba(0,0,0,0.1)] rounded-md"
            >
              <div className="flex w-[80%] items-center gap-4">
                <div className="w-7 h-7 rounded-full bg-pink-500 flex items-center justify-center">
                  <span className="text-white text-xs"></span>
                </div>
                <div className="flex flex-row flex-1">
                  <h3 className="Poppins-bold text-[#9E033B]">{notification.title}</h3>
                </div>
                <p className="text-[#bf064499] text-sm w-[30%] truncate">
                  {notification.description.split(' ').slice(0, 4).join(' ')}...
                </p>
              </div>


              <div className="flex items-center justify-end gap-4 w-[20%]">
                {notification.isNew && (
                  <span className="px-2 py-1 bg-pink-100 text-pink-500 text-xs rounded-full whitespace-nowrap">
                    New
                  </span>
                )}

                <div className="relative">
                  <button
                    onClick={() => toggleMenu(notification.id)}
                    className="text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    <MoreHorizontal className="h-5 w-5 text-[#E5024E]" />
                  </button>

                  <AnimatePresence>
                    {activeMenu === notification.id && showPopup && (
                      <motion.div
                        ref={popupRef}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.5 }}
                        className="absolute -right-32 top-2 mt-2 w-36 bg-white p-2 rounded-lg flex flex-col gap-1 shadow-lg border border-gray-100 z-10"
                      >
                        <button
                          onClick={handleMarkAsRead}
                          className="w-full bg-gray-50 px-2 py-2 rounded-lg text-left text-xs text-gray-700 flex items-center gap-2 transition-all duration-200 hover:bg-[#f0f0f0] hover:text-[#DB024D]"
                        >
                          <img src={icons.MarkAsRead} alt="" className="h-3 w-3" />
                          Mark as Read
                        </button>
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
      </div>
    </div>
  )
}

export default Notifications
