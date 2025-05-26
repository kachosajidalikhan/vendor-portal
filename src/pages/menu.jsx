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

    return (
        <div className="p-6 min-h-screen w-full bg-white ">
            <Header title={"Menu"} />
            <div className="space-y-3 pt-12 px-30 border-[#E6EFF5]">
                {SavePopup && (
                    <div className={`absolute top-25 left-60 right-0 m-auto flex items-center gap-2 p-2 bg-white rounded-xl shadow-lg w-1/2 ${isFadingOut ? "animate-fade-out " : "animate-fade-in"} `}>
                        <svg className="w-5 h-5 rounded-full bg-[#3A974C]/21 text-[#3A974C]" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-[#3A974C] font-semibold text-sm">Created Successfully</span>
                    </div>
                )}
                {foodItems.map((item) => (
                    <div key={item.id} onClick={() => handleEdit(item)} className="flex items-center justify-between py-2 px-4 shadow-[0_-2px_4px_-1px_rgba(0,0,0,0.1),0_8px_10px_-1px_rgba(0,0,0,0.1)] rounded-md">
                        <div className="flex items-center gap-4">
                            <div className="w-8 h-8 rounded-full bg-[#EE6295] flex items-center justify-center">
                                <span className="text-white text-xs"></span>
                            </div>
                            <div className="flex flex-row flex-1">
                                <h3 className="font-medium text-[#9E033B]">{item.title}</h3>
                            </div>
                        </div>
                        <div className="flex items-center gap-4" >
                            <div className="relative" >
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
                                            className="absolute -right-32 top-2 mt-2 w-36 bg-white p-2 rounded-lg flex flex-col gap-1 shadow-lg border border-gray-100 z-100"
                                        >

                                            <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();

                                                        // your logic for mark as read
                                                    }}
                                                    className="w-full bg-gray-50 px-2 py-2 rounded-lg text-left text-xs text-gray-700 hover:bg-gray-100 z-100 flex items-center gap-2"
                                                >
                                                    <img src={icons.MarkAsRead} alt="" className="h-3 w-3" />
                                                    Mark as Read
                                                </button>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        // your logic for delete
                                                    }}
                                                    className="w-full px-2 bg-[#ee62953b] py-2 rounded-md text-left text-xs text-red-600 hover:bg-gray-100 flex items-center gap-2 z-10"
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
            <div onClick={() => nav("/food-list/create-menu")} className="absolute bottom-10 bg-[#9E033B] w-20 h-20  right-10 rounded-full shadow-[0_-2px_4px_-1px_rgba(0,0,0,0.1),0_8px_10px_-1px_rgba(0,0,0,0.1)]">
                <img src={icons.LazeezLogo} alt="" />
            </div>
        </div>
    );
};

export default FoodList;
