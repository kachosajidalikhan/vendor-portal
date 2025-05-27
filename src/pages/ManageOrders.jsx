import { useState, useRef, useEffect } from "react"
import { Search, Bell, Star, MoreHorizontal, Trash2, CheckCircle } from "lucide-react"
import icons from "../constants/index"
import Header from "../components/Header"
import StatusDropdown from "../components/customDropDown"
import CancelOrderModal from "../components/CancelOrderModal"
import NewOrderPopup from "../components/NewOrderPopup"
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from "framer-motion";
// import Image from "next/image"

export default function ManageOrders() {
  const navigate = useNavigate()
  const [orders, setOrders] = useState([
    {
      id: "#876354",
      name: "M. Ali",
      avatar: "/placeholder.svg?height=32&width=32",
      description: "Ordered Barat pack...",
      date: "12 Dec, 2023",
      status: "Complete",
      starred: true,
      selected: false,
      packageName: "Grand Walima",
      packageType: "Buffet",
      foodItem: "Biryani, Korma, Naan",
      totalServing: "500",
      addOns: "100ml Signtr. Drink, 1 unit per box",
      price: "500000",
      preparationTime: "2",
      deliveryTime: "1",
      paymentMethod: "COD",
      totalIncome: 20000,
      location: 'Plot 232, JTH, Karachi.',
      isNew: false
    },
    {
      id: "#876123",
      name: "Muhammad",
      avatar: "/placeholder.svg?height=32&width=32",
      description: "Ordered Barat pack...",
      date: "12 Dec, 2023",
      status: "Complete",
      starred: true,
      selected: false,
      packageName: "Grand Walima",
      packageType: "Buffet",
      foodItem: "Biryani, Korma, Naan",
      totalServing: "500",
      addOns: "100ml Signtr. Drink, 1 unit per box",
      price: "500000",
      preparationTime: "2",
      deliveryTime: "1",
      paymentMethod: "COD",
      totalIncome: 20000,
      location: 'Plot 232, JTH, Karachi.',
      isNew: false
    },
    {
      id: "#876213",
      name: "Muhammad",
      avatar: "/placeholder.svg?height=32&width=32",
      description: "Ordered Barat pack...",
      date: "12 Dec, 2023",
      status: "Complete",
      starred: true,
      selected: false,
      packageName: "Grand Walima",
      packageType: "Buffet",
      foodItem: "Biryani, Korma, Naan",
      totalServing: "500",
      addOns: "100ml Signtr. Drink, 1 unit per box",
      price: "500000",
      preparationTime: "2",
      deliveryTime: "1",
      paymentMethod: "COD",
      totalIncome: 20000,
      location: 'Plot 232, JTH, Karachi.',
      isNew: false
    },
    {
      id: "#876987",
      name: "Ali",
      avatar: "/placeholder.svg?height=32&width=32",
      description: "Ordered Barat pack...",
      date: "08 Dec, 2023",
      starred: true,
      selected: false,
      packageName: "Grand Walima",
      packageType: "Buffet",
      foodItem: "Biryani, Korma, Naan",
      totalServing: "500",
      addOns: "100ml Signtr. Drink, 1 unit per box",
      price: "500000",
      preparationTime: "2",
      deliveryTime: "1",
      paymentMethod: "COD",
      totalIncome: 20000,
      location: 'Plot 232, JTH, Karachi.',
      isNew: false
    },
    {
      id: "#872345",
      name: "Muhammad",
      avatar: "/placeholder.svg?height=32&width=32",
      description: "Ordered Barat pack...",
      date: "10 Dec, 2022",
      starred: true,
      selected: false,
      packageName: "Grand Walima",
      packageType: "Buffet",
      foodItem: "Biryani, Korma, Naan",
      totalServing: "500",
      addOns: "100ml Signtr. Drink, 1 unit per box",
      price: "500000",
      preparationTime: "2",
      deliveryTime: "1",
      paymentMethod: "COD",
      totalIncome: 20000,
      location: 'Plot 232, JTH, Karachi.',
      isNew: false
    },
    {
      id: "#872346",
      name: "Ali",
      avatar: "/placeholder.svg?height=32&width=32",
      description: "Ordered Barat pack...",
      date: "10 Dec, 2022",
      starred: true,
      selected: false,
      packageName: "Grand Walima",
      packageType: "Buffet",
      foodItem: "Biryani, Korma, Naan",
      totalServing: "500",
      addOns: "100ml Signtr. Drink, 1 unit per box",
      price: "500000",
      preparationTime: "2",
      deliveryTime: "1",
      paymentMethod: "COD",
      totalIncome: 20000,
      location: 'Plot 232, JTH, Karachi.',
      isNew: false
    },
    {
      id: "#872344",
      name: "Ali",
      avatar: "/placeholder.svg?height=32&width=32",
      description: "Ordered Barat pack...",
      date: "10 Dec, 2022",
      status: "Completed",
      starred: true,
      selected: false,
      packageName: "Grand Walima",
      packageType: "Buffet",
      foodItem: "Biryani, Korma, Naan",
      totalServing: "500",
      addOns: "100ml Signtr. Drink, 1 unit per box",
      price: "500000",
      preparationTime: "2",
      deliveryTime: "1",
      paymentMethod: "COD",
      totalIncome: 20000,
      location: 'Plot 232, JTH, Karachi.',
      isNew: false
    },
    {
      id: "#872343",
      name: "Ali",
      avatar: "/placeholder.svg?height=32&width=32",
      description: "Ordered Barat pack...",
      date: "10 Dec, 2022",
      status: "Cancelled",
      starred: true,
      selected: false,
      packageName: "Grand Walima",
      packageType: "Buffet",
      foodItem: "Biryani, Korma, Naan",
      totalServing: "500",
      addOns: "100ml Signtr. Drink, 1 unit per box",
      price: "500000",
      preparationTime: "2",
      deliveryTime: "1",
      paymentMethod: "COD",
      totalIncome: 20000,
      location: 'Plot 232, JTH, Karachi.',
      isNew: false
    },
    {
      id: "#872341",
      name: "Ali",
      avatar: "/placeholder.svg?height=32&width=32",
      description: "Ordered Barat pack...",
      date: "10 Dec, 2022",
      status: "Pending",
      starred: true,
      selected: false,
      packageName: "Grand Walima",
      packageType: "Buffet",
      foodItem: "Biryani, Korma, Naan",
      totalServing: "500",
      addOns: "100ml Signtr. Drink, 1 unit per box",
      price: "500000",
      preparationTime: "2",
      deliveryTime: "1",
      paymentMethod: "COD",
      totalIncome: 20000,
      location: 'Plot 232, JTH, Karachi.',
      isNew: false
    },
  ])
  const [openDropdownId, setOpenDropdownId] = useState(null)
  const [selectAll, setSelectAll] = useState(false)
  const [cancelModalOpen, setCancelModalOpen] = useState(false)
  const [selectedOrderId, setSelectedOrderId] = useState(null)
  const [showNewOrderPopup, setShowNewOrderPopup] = useState(false)
  
  const [newOrder, setNewOrder] = useState({
    id: "#876999",
    name: "New Customer",
    avatar: "/placeholder.svg?height=32&width=32",
    description: "New order received...",
    date: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
    status: "Pending",
    starred: false,
    selected: false,
    packageName: "Grand Walima",
    packageType: "Buffet",
    foodItem: "Biryani, Korma, Naan",
    totalServing: "300",
    addOns: "100ml Signtr. Drink, 1 unit per box",
    price: "300000",
    preparationTime: "2",
    deliveryTime: "1",
    paymentMethod: "COD",
    totalIncome: 15000,
    location: 'Plot 232, JTH, Karachi.',
    isNew: true
  })
  const menuRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNewOrderPopup(true);
    }, 1000); // 1 second delay

    return () => clearTimeout(timer);
  }, []); // Empty dependency array means this runs once on mount

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

  const statusOptions = [
    "Complete",
    "Pending",
    "Upcoming",
    "Cancelled"
  ]

  const toggleStar = (id) => {
    setOrders(orders.map((order) => (order.id === id ? { ...order, starred: !order.starred } : order)))
  }

  const toggleSelect = (id) => {
    setOrders(orders.map((order) => (order.id === id ? { ...order, selected: !order.selected } : order)))
    setSelectAll(false)
  }

  const handleSelectAll = (e) => {
    e.stopPropagation()
    const newSelectAll = !selectAll
    setSelectAll(newSelectAll)
    setOrders(orders.map(order => ({ ...order, selected: newSelectAll })))
  }

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

  const handleStatusChange = (id, newStatus) => {
    if (newStatus === "Cancelled") {
      setSelectedOrderId(id);
      setCancelModalOpen(true);
    } else {
      setOrders(orders.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      ));
    }
  }

  const handleOrderClick = (order) => {
    navigate('/manage-orders/order-detail', { state: { orderData: order } });
  }

  const handleAcceptOrder = () => {
    setOrders([newOrder, ...orders]);
    setShowNewOrderPopup(false);
  }

  const handleRejectOrder = () => {
    setSelectedOrderId(newOrder.id);
    setCancelModalOpen(true);
    setShowNewOrderPopup(false);
  }

  const handleCancelSubmit = (orderId, reason) => {
    const orderToCancel = orderId === newOrder.id ? newOrder : orders.find(order => order.id === orderId);

    if (!orderToCancel) {
      console.error('Order to cancel not found');
      setCancelModalOpen(false);
      setShowNewOrderPopup(false);
      return;
    }

    const cancelledOrder = { ...orderToCancel, status: "Cancelled", cancellationReason: reason };

    if (orderId === newOrder.id) {
      setOrders([cancelledOrder, ...orders]);
      setShowNewOrderPopup(false);
    } else {
      setOrders(orders.map((order) =>
        order.id === orderId ? cancelledOrder : order
      ));
    }

    setOpenDropdownId(null);
    setCancelModalOpen(false);
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Complete":
        return "bg-green-100 text-[#3A974C]"
      case "Pending":
        return "bg-orange-100 text-[#F29339]"
      case "Upcoming":
        return "bg-blue-100 text-[#3A4297]"
      case "Cancelled":
        return "bg-red-100 text-[#E71D36]"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

return (
  <div className="bg-white w-full min-h-screen p-4 sm:p-6">
    {/* <Header title="Manage Orders" /> */}
    <div className="max-w-7xl mx-auto relative">
      <div className="bg-white border-l border-[#E6EFF5] pt-10 overflow-x-auto">
        <table className="w-full min-w-[768px]">
          <thead>
            <tr className="text-left text-sm">
              <th className="p-2 sm:p-4 font-medium text-gray-500">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                  className="rounded border-gray-300 accent-[#E5024E]"
                />
              </th>
              {["Invoice ID", "Name", "Description", "Date", "Status", ""].map((heading, idx) => (
                <th key={idx} className="p-2 sm:p-4 font-medium text-[#EE6295] whitespace-nowrap">
                  {heading && (
                    <>
                      {heading} <span className="text-[#EE6295] text-xs">▼</span>
                    </>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="hover:shadow-[0_-2px_4px_-1px_rgba(0,0,0,0.1),0_8px_10px_-1px_rgba(0,0,0,0.1)] duration-200 rounded-lg"
                onClick={() => handleOrderClick(order)}
              >
                <td className="p-2 sm:p-4">
                  <input
                    type="checkbox"
                    checked={order.selected}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSelect(order.id);
                    }}
                    className="rounded border-gray-300 accent-[#E5024E] cursor-pointer"
                  />
                </td>

                {/* Invoice ID */}
                <td className="p-2 sm:p-4 text-sm font-medium whitespace-nowrap">
                  {order.id}
                  {order.isNew && (
                    <span className="ml-2 px-2 py-1 text-xs bg-green-100 text-green-600 rounded-full">New</span>
                  )}
                </td>

                {/* Name */}
                <td className="p-2 sm:p-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full overflow-hidden bg-gray-200" />
                    <span className="text-sm font-medium text-pink-600">{order.name}</span>
                  </div>
                </td>

                {/* Description */}
                <td className="p-2 sm:p-4">
                  <div className="flex items-center gap-2">
                    <img src={icons.Message} alt="" className="w-3 h-3" />
                    <span className="text-sm text-gray-600">{order.description}</span>
                  </div>
                </td>

                {/* Date */}
                <td className="p-2 sm:p-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <img src={icons.Calender} alt="" className="w-3 h-3" />
                    <span className="text-sm text-gray-600">{order.date}</span>
                  </div>
                </td>

                {/* Status */}
                <StatusDropdown order={order} onChange={handleStatusChange} />

                {/* Actions */}
                <td className="p-2 sm:p-4">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleStar(order.id);
                      }}
                      className="focus:outline-none cursor-pointer"
                    >
                      <Star
                        className={`h-5 w-5 ${order.starred ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                      />
                    </button>

                    {/* Dropdown */}
                    <div className="relative">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMoreClick(order.id);
                        }}
                        className="focus:outline-none cursor-pointer"
                      >
                        <MoreHorizontal className="h-5 w-5 text-[#E5024E]" />
                      </button>

                      <AnimatePresence>
                        {openDropdownId === order.id && (
                          <motion.div
                            ref={menuRef}
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            transition={{ duration: 0.5 }}
                            className="absolute -right-6 top-4 mt-2 w-36 bg-white p-2 rounded-lg flex flex-col gap-1 shadow-lg border border-gray-100 z-10"
                          >
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleMarkAsRead(order.id);
                              }}
                              className="w-full hover:bg-[#f0f0f0] hover:text-[#DB024D] bg-gray-50 px-2 py-2 rounded-lg text-left text-xs text-gray-700 flex items-center gap-2"
                            >
                              <img src={icons.MarkAsRead} alt="" className="h-3 w-3" />
                              Mark as Read
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(order.id);
                              }}
                              className="w-full px-2 bg-[#ee62953b] py-2 rounded-md text-left text-xs text-red-600 hover:bg-gray-50 flex items-center gap-2"
                            >
                              <img src={icons.DeleteIcon} alt="" className="h-3 w-3" />
                              Delete
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modals */}
        <CancelOrderModal
          isOpen={cancelModalOpen}
          onClose={() => {
            setCancelModalOpen(false);
            setSelectedOrderId(null);
          }}
          onSubmit={handleCancelSubmit}
          orderId={selectedOrderId}
        />
        <NewOrderPopup
          isOpen={showNewOrderPopup}
          onClose={() => setShowNewOrderPopup(false)}
          onAccept={handleAcceptOrder}
          onReject={handleRejectOrder}
          orderData={newOrder}
        />
      </div>
    </div>
  </div>
);

} 