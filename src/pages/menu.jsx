import { MoreHorizontal } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import icons from "../constants/index"
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { motion, AnimatePresence } from "framer-motion";




const FoodList = () => {
    const [activeMenu, setActiveMenu] = useState(null);
    const [showPopup, setShowPopup] = useState(false)
    const [SavePopup, setSavePopup] = useState(false);
    const [isFadingOut, setIsFadingOut] = useState(false);
    const location = useLocation();
    const [openDropdownId, setOpenDropdownId] = useState(null);
    const nav = useNavigate()
    const foodItems = [
        { id: 1, title: "Grand Walima", category: "fast food", price: 500, quantity: 2, description: "We have released the payment for your recent order. The amount has been transferred to your registered bank account.", isNew: true },
        { id: 2, title: "Baraat", category: "fast food", price: 500, quantity: 2, description: "We had warned you about the policy violations. Your account has been temporarily suspended.", isNew: true },
        { id: 3, title: "Birthday", category: "fast food", price: 500, quantity: 2, description: "Some new releases at discounted prices. Check them out now!", isNew: true },
        { id: 4, title: "Majlis", category: "fast food", price: 500, quantity: 2, description: "We have released the payment for your recent order. The amount has been transferred to your registered bank account.", isNew: false },
        { id: 5, title: "Birthday special 1", category: "fast food", price: 500, quantity: 2, description: "We have released the payment for your recent order. The amount has been transferred to your registered bank account.", isNew: false },
        { id: 6, title: "Birthday special 2", category: "fast food", price: 500, quantity: 2, description: "We have released the payment for your recent order. The amount has been transferred to your registered bank account.", isNew: false },
    ]
    // const toggleMenu = (id) => {
    //     if (activeMenu === id) {
    //         setActiveMenu(null)
    //         setShowPopup(false)
    //     } else {
    //         setActiveMenu(id)
    //         setShowPopup(true)
    //     }
    // }

    const handleMoreClick = (id) => {
        setOpenDropdownId(openDropdownId === id ? null : id)
    }

    useEffect(() => {
        if (location.state?.success && location.state?.type === "create") {
            setSavePopup(true);
            setIsFadingOut(false);

            const fadeOutTimer = setTimeout(() => {
                setIsFadingOut(true);

                const hidePopupTimer = setTimeout(() => {
                    setSavePopup(false);
                }, 300);

                // Cleanup for inner timeout
                return () => clearTimeout(hidePopupTimer);
            }, 3000);

            // Clear browser history state to avoid repeat trigger
            window.history.replaceState({}, document.title);

            // Cleanup for outer timeout
            return () => clearTimeout(fadeOutTimer);
        }
    }, [location.state]);

    const handleEdit = (item) => {
        nav("/food-list/edit-menu", { state: { foodData: item } });

    };

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

    return (<>
        {/* <Header title={"Menu"} /> */}
        <div className="p-4 sm:p-6 min-h-screen w-full bg-white">
            <div className="space-y-3 md:pt-12 px-4 sm:px-8 border-[#E6EFF5]">
                {SavePopup && (
                    <div className={`fixed top-15 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-2 p-2 bg-white rounded-xl shadow-lg w-11/12 sm:w-1/2 ${isFadingOut ? "animate-fade-out" : "animate-fade-in"}`}>
                        <svg className="w-5 h-5 rounded-full bg-[#3A974C]/21 text-[#3A974C]" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-[#3A974C] font-semibold text-sm">Created Successfully</span>
                    </div>
                )}

                {/* mobile version */}

                {foodItems.map((item) => (
                    <div key={item.id} onClick={() => handleEdit(item)} className="md:hidden flex flex-row items-start sm:items-center justify-between py-2 px-4 shadow-[0_-2px_4px_-1px_rgba(0,0,0,0.1),0_8px_10px_-1px_rgba(0,0,0,0.1)] rounded-md">
                        <div className="flex items-center gap-3 w-full">
                            <div className="w-8 h-8 rounded-full bg-[#EE6295] flex items-center justify-center">
                                <span className="text-white text-xs"></span>
                            </div>
                            <div className="flex-1">
                                <h3 className="font-medium text-[#9E033B] text-sm sm:text-base">{item.title}</h3>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 mt-2 sm:mt-0 sm:ml-4">
                            <div className="relative">
                                <button onClick={(e) => {
                                    e.stopPropagation();
                                    handleMoreClick(item.id);
                                }} className="text-gray-400 hover:text-gray-600 cursor-pointer">
                                    <MoreHorizontal className="h-5 w-5 text-[#E5024E]" />
                                </button>

                                <AnimatePresence>
                                    {openDropdownId === item.id && (
                                        <motion.div
                                            ref={menuRef}
                                            initial={{ opacity: 0, scale: 0.5 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.5 }}
                                            transition={{ duration: 0.5 }}
                                            className="absolute -right-2 top-2 mt-2 w-36 bg-white p-2 rounded-lg flex flex-col gap-1 shadow-lg border border-gray-100 z-50"
                                        >
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    // your logic for mark as read
                                                }}
                                                className="w-full bg-gray-50 px-2 py-2 rounded-lg text-left text-xs text-gray-700 hover:bg-gray-100 z-50 flex items-center gap-2"
                                            >
                                                <img src={icons.MarkAsRead} alt="" className="h-3 w-3" />
                                                Mark as Read
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    // your logic for delete
                                                }}
                                                className="w-full px-2 bg-[#ee62953b] py-2 rounded-md text-left text-xs text-red-600 hover:bg-gray-100 flex items-center gap-2 z-50"
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


                {/* desktop version */}

                {foodItems.map((item) => (
                    <div key={item.id} onClick={() => handleEdit(item)} className="hidden md:flex flex-col sm:flex-row items-start sm:items-center justify-between py-2 px-4 shadow-[0_-2px_4px_-1px_rgba(0,0,0,0.1),0_8px_10px_-1px_rgba(0,0,0,0.1)] rounded-md">
                        <div className="flex items-center gap-3 w-full">
                            <div className="w-8 h-8 rounded-full bg-[#EE6295] flex items-center justify-center">
                                <span className="text-white text-xs"></span>
                            </div>
                            <div className="flex-1">
                                <h3 className="font-medium text-[#9E033B] text-sm sm:text-base">{item.title}</h3>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 mt-2 sm:mt-0 sm:ml-4">
                            <div className="relative">
                                <button onClick={(e) => {
                                    e.stopPropagation();
                                    handleMoreClick(item.id);
                                }} className="text-gray-400 hover:text-gray-600 cursor-pointer">
                                    <MoreHorizontal className="h-5 w-5 text-[#E5024E]" />
                                </button>

                                <AnimatePresence>
                                    {openDropdownId === item.id && (
                                        <motion.div
                                            ref={menuRef}
                                            initial={{ opacity: 0, scale: 0.5 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.5 }}
                                            transition={{ duration: 0.5 }}
                                            className="absolute -right-2 top-2 mt-2 w-36 bg-white p-2 rounded-lg flex flex-col gap-1 shadow-lg border border-gray-100 z-50"
                                        >
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    // your logic for mark as read
                                                }}
                                                className="w-full bg-gray-50 px-2 py-2 rounded-lg text-left text-xs text-gray-700 hover:bg-gray-100 z-50 flex items-center gap-2"
                                            >
                                                <img src={icons.MarkAsRead} alt="" className="h-3 w-3" />
                                                Mark as Read
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    // your logic for delete
                                                }}
                                                className="w-full px-2 bg-[#ee62953b] py-2 rounded-md text-left text-xs text-red-600 hover:bg-gray-100 flex items-center gap-2 z-50"
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

            {/* Floating Icon */}
            <div
                onClick={() => nav("/food-list/create-menu")}
                className="fixed sm:bottom-10 sm:right-10 bottom-4 right-4 bg-[#9E033B] w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center shadow-[0_-2px_4px_-1px_rgba(0,0,0,0.1),0_8px_10px_-1px_rgba(0,0,0,0.1)] z-50 cursor-pointer"
            >
                <img src={icons.LazeezLogo} alt="+" className="w-30 md:w-30" />
            </div>
        </div>

    </>
    );
};

export default FoodList;
