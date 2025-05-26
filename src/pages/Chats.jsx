import { useEffect, useRef, useState } from "react"
import { Search, Bell, Star, MoreHorizontal, Trash2, CheckCircle } from "lucide-react"
import icons from "../constants/index"
import { useNavigate } from "react-router-dom"
import Header from "../components/Header"
import { motion, AnimatePresence } from "framer-motion";
// import Image from "next/image"

export default function Chats() {
  const navigate = useNavigate()
  const [selectAll, setSelectAll] = useState(false)
  const [orders, setOrders] = useState([
    {
      id: "#876354",
      name: "M. Ali",
      avatar: "/placeholder.svg?height=32&width=32",
      description: "Assalamaualikum hope you are good i just want to say...",
      date: "12 Dec, 2023",
      isNew: true,
      starred: true,
      selected: false,
      messages: [
        { id: 1, text: "Assalamaualikum hope you are good i just want to say...", sender: "client", timestamp: "12 Dec, 2023 10:30 AM" },
        { id: 2, text: "Yes, how can I help you?", sender: "vendor", timestamp: "12 Dec, 2023 10:31 AM" }
      ]
    },
    {
      id: "#876123",
      name: "Muhammad",
      avatar: "/placeholder.svg?height=32&width=32",
      description: "Assalamaualikum hope you are good i just want to inform about a new order",
      date: "10 Dec, 2023",
      isNew: true,
      starred: false,
      selected: false,
      messages: [
        { id: 1, text: "Assalamaualikum hope you are good i just want to inform about a new order", sender: "client", timestamp: "12 Dec, 2023 10:30 AM" },
        { id: 2, text: "Yes, how can I help you?", sender: "vendor", timestamp: "12 Dec, 2023 10:31 AM" }
      ]
    },
    {
      id: "#876213",
      name: "Muhammad",
      avatar: "/placeholder.svg?height=32&width=32",
      description: "Ordered Barat pack...",
      date: "08 Dec, 2023",
      isNew: false,
      starred: false,
      selected: true,
      messages: [
        { id: 1, text: "Assalamaualikum hope you are good i just want to inform about a new order", sender: "client", timestamp: "12 Dec, 2023 10:30 AM" },
        { id: 2, text: "Yes, how can I help you?", sender: "vendor", timestamp: "12 Dec, 2023 10:31 AM" }
      ]
    },
    {
      id: "#876987",
      name: "Ali",
      avatar: "/placeholder.svg?height=32&width=32",
      description: "Ordered Barat pack...",
      date: "08 Dec, 2023",
      isNew: false,
      starred: false,
      selected: true,
      messages: [
        { id: 1, text: "Assalamaualikum hope you are good i just want to inform about a new order", sender: "client", timestamp: "12 Dec, 2023 10:30 AM" },
        { id: 2, text: "Yes, how can I help you?", sender: "vendor", timestamp: "12 Dec, 2023 10:31 AM" }
      ]
    },
    {
      id: "#873145",
      name: "Ali",
      avatar: "/placeholder.svg?height=32&width=32",
      description: "Ordered Barat pack...",
      date: "10 Dec, 2023",
      isNew: false,
      starred: false,
      selected: false,
      messages: [
        { id: 1, text: "Assalamaualikum hope you are good i just want to inform about a new order", sender: "client", timestamp: "12 Dec, 2023 10:30 AM" },
        { id: 2, text: "Yes, how can I help you?", sender: "vendor", timestamp: "12 Dec, 2023 10:31 AM" }
      ]
    },
    {
      id: "#872345",
      name: "Muhammad",
      avatar: "/placeholder.svg?height=32&width=32",
      description: "Ordered Barat pack...",
      date: "10 Dec, 2022",
      isNew: true,
      starred: true,
      selected: true,
      messages: [
        { id: 1, text: "Assalamaualikum hope you are good i just want to inform about a new order", sender: "client", timestamp: "12 Dec, 2023 10:30 AM" },
        { id: 2, text: "Yes, how can I help you?", sender: "vendor", timestamp: "12 Dec, 2023 10:31 AM" }
      ]
    },
    {
      id: "#872346",
      name: "Ali",
      avatar: "/placeholder.svg?height=32&width=32",
      description: "Ordered Barat pack...",
      date: "10 Dec, 2022",
      isNew: false,
      starred: false,
      selected: false,
      messages: [
        { id: 1, text: "Assalamaualikum hope you are good i just want to inform about a new order", sender: "client", timestamp: "12 Dec, 2023 10:30 AM" },
        { id: 2, text: "Yes, how can I help you?", sender: "vendor", timestamp: "12 Dec, 2023 10:31 AM" }
      ]
    },
    {
      id: "#872347",
      name: "Ali",
      avatar: "/placeholder.svg?height=32&width=32",
      description: "Ordered Barat pack...",
      date: "10 Dec, 2022",
      isNew: false,
      starred: false,
      selected: false,
      messages: [
        { id: 1, text: "Assalamaualikum hope you are good i just want to inform about a new order", sender: "client", timestamp: "12 Dec, 2023 10:30 AM" },
        { id: 2, text: "Yes, how can I help you?", sender: "vendor", timestamp: "12 Dec, 2023 10:31 AM" }
      ]
    },
    {
      id: "#872348",
      name: "Ali",
      avatar: "/placeholder.svg?height=32&width=32",
      description: "Ordered Barat pack...",
      date: "10 Dec, 2022",
      isNew: false,
      starred: false,
      selected: false,
      messages: [
        { id: 1, text: "Assalamaualikum hope you are good i just want to inform about a new order", sender: "client", timestamp: "12 Dec, 2023 10:30 AM" },
        { id: 2, text: "Yes, how can I help you?", sender: "vendor", timestamp: "12 Dec, 2023 10:31 AM" }
      ]
    },
    {
      id: "#872349",
      name: "Ali",
      avatar: "/placeholder.svg?height=32&width=32",
      description: "Ordered Barat pack...",
      date: "10 Dec, 2022",
      isNew: false,
      starred: false,
      selected: false,
      messages: [
        { id: 1, text: "Assalamaualikum hope you are good i just want to inform about a new order", sender: "client", timestamp: "12 Dec, 2023 10:30 AM" },
        { id: 2, text: "Yes, how can I help you?", sender: "vendor", timestamp: "12 Dec, 2023 10:31 AM" }
      ]
    },
  ])
  const [openDropdownId, setOpenDropdownId] = useState(null)

  const toggleStar = (id) => {
    setOrders(orders.map((order) => (order.id === id ? { ...order, starred: !order.starred } : order)))
  }

  const toggleSelect = (id) => {
    setOrders(orders.map((order) => (order.id === id ? { ...order, selected: !order.selected } : order)))
  }

  const handleMoreClick = (id) => {
    setOpenDropdownId(openDropdownId === id ? null : id)
  }

  const handleMarkAsRead = (id) => {
    setOrders(orders.map((order) => (order.id === id ? { ...order, isNew: false } : order)))
    setOpenDropdownId(null)
  }

  const handleDelete = (id) => {
    setOrders(orders.filter(order => order.id !== id))
    setOpenDropdownId(null)
  }

  const handleChatClick = (order) => {
    const chatId = order.id.replace('#', '')
    navigate(`/chats/messages/${chatId}`, { state: { chatData: order } })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Complete":
        return "bg-green-100 text-green-800"
      case "Pending":
        return "bg-orange-100 text-orange-800"
      case "Upcoming":
        return "bg-blue-100 text-blue-800"
      case "Cancelled":
        return "bg-red-100 text-red-800"
      case "AOS Status":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

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

  const menuRef = useRef(null);
  const handleSelectAll = (e) => {
    e.stopPropagation()
    const newSelectAll = !selectAll
    setSelectAll(newSelectAll)
    setOrders(orders.map(order => ({ ...order, selected: newSelectAll })))
  }

  return (
    <div className="bg-white w-full min-h-screen p-6">
      {/* <Header title="Chats" /> */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-white border-l border-[#E6EFF5] pt-15">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm">
                <th className="p-4 font-medium text-gray-500">
                  <input type="checkbox" checked={selectAll} onChange={handleSelectAll} className="rounded border-gray-300 accent-[#E5024E]" />
                </th>
                <th className="p-4 font-medium text-[#EE6295]">
                  Order ID <span className="text-[#EE6295] text-xs">▼</span>
                </th>
                <th className="p-4 font-medium text-[#EE6295]">
                  Name <span className="text-[#EE6295] text-xs">▼</span>
                </th>
                <th className="p-4 font-medium text-[#EE6295]">
                  Description <span className="text-[#EE6295] text-xs">▼</span>
                </th>
                <th className="p-4 font-medium text-[#EE6295]">
                  Status <span className="text-[#EE6295] text-xs">▼</span>
                </th>
                <th className="p-4 font-medium text-[#EE6295]">
                  {/* <Trash2 className="h-5 w-5 text-[#EE6295]" /> */}
                  <img src={icons.DeleteIcon} alt="" className="h-5 w-5" />
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:shadow-[0_-2px_4px_-1px_rgba(0,0,0,0.1),0_8px_10px_-1px_rgba(0,0,0,0.1)] duration-200 rounded-lg cursor-pointer"
                  onClick={() => handleChatClick(order)}
                >
                  <td className="p-4" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={order.selected}
                      onChange={() => toggleSelect(order.id)}
                      className="rounded border-gray-300 accent-[#E5024E]"
                    />
                  </td>
                  <td className="p-4 text-sm font-medium">{order.id}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full overflow-hidden bg-gray-200">
                      </div>
                      <span className="text-sm font-medium text-pink-600">{order.name}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="p-1 rounded">
                        <img src={icons.Message} alt="" className="w-3 h-3" />
                      </div>
                      <span className="text-sm text-gray-600">{order.description.split(' ').slice(0, 4).join(' ')}...</span>
                    </div>
                  </td>
                  <td className="p-4">
                    {order.isNew && (
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-pink-100 text-pink-800">
                        New
                      </span>
                    )}
                  </td>
                  <td className="p-4" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center gap-4">

                      <div className="relative">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMoreClick(order.id);
                          }}
                          className="focus:outline-none cursor-pointer"
                        >
                          <MoreHorizontal className="h-5 w-5 text-[#E5024E] z-5" />
                        </button>
                        <AnimatePresence>

                        {openDropdownId === order.id && (
                          <motion.div
                        ref={menuRef}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.5 }}
                        className="absolute -right-10 top-2 mt-2 w-36 bg-white p-2 rounded-lg flex flex-col gap-1 shadow-lg border border-gray-100 z-10"
                      >

                          
                            <button
                              onClick={() => handleMarkAsRead(order.id)}
                              className="w-full hover:bg-[#f0f0f0] hover:text-[#DB024D] bg-gray-50 px-2 py-2 rounded-lg text-left text-xs text-gray-700 flex items-center gap-2 z-10"
                            >
                              <img src={icons.MarkAsRead} alt="" className="h-3 w-3" />
                              Mark as Read
                            </button>
                            <button
                              onClick={() => handleDelete(order.id)}
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
} 