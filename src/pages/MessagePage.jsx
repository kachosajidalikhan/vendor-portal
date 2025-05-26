import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { ChevronLeft, Search, Send } from "lucide-react"
import icons from "../constants/index"

export default function MessagePage() {
    const location = useLocation()
    const navigate = useNavigate()
    const [chatData, setChatData] = useState(null)
    const [newMessage, setNewMessage] = useState("")

    useEffect(() => {
        if (location.state?.chatData) {
            setChatData(location.state.chatData)
        } else {
            // If no chat data is available, redirect back to chats
            navigate("/chats")
        }
    }, [location.state, navigate])

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            const newMsg = {
                id: Date.now(),
                text: newMessage,
                sender: "vendor",
                timestamp: new Date().toLocaleString()
            }
            setChatData(prev => ({
                ...prev,
                messages: [...prev.messages, newMsg]
            }))
            setNewMessage("")
        }
    }

    if (!chatData) return null

    return (
        <div className="bg-white w-full min-h-screen">
            <div className=" mx-auto">
                <header className="flex justify-between items-center p-4 border-b border-[#E6EFF5]">
                    <h2 className="text-xl font-bold text-pink-600">Chats</h2>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-[#E72765]" />
                            <input
                                type="text"
                                placeholder="Search for something"
                                className="pl-10 pr-4 py-2 rounded-full bg-[#F2C4C7] text-sm text-[#E5024E] w-64 focus:outline-none"
                            // value={searchQuery}
                            // onChange={onSearch}
                            />
                        </div>
                        <button className="w-10 h-10 rounded-full bg-[#F2C4C7] flex items-center justify-center text-pink-600">
                            {/* <Bell className="w-5 h-5" /> */}
                            <img src={icons.FoodIcon} className="w-5 h-5" />
                        </button>
                        <button className="w-10 h-10 rounded-full bg-[#F2C4C7] flex items-center justify-center text-pink-600">
                            <img src={icons.NotificationIcon} alt="" className="w-7.5 h-7.5" />
                        </button>
                    </div>
                </header>
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-[#E6EFF5]">
                    <div className="flex items-center gap-4 justify-between w-full px-10">
                        <button
                            onClick={() => navigate("/chats")}
                            className="p-2 hover:bg-gray-100 rounded-full"
                        >
                            <ChevronLeft className="w-5 h-5 text-[#E5024E]" />
                        </button>
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-200">
                                {/* Add avatar image here if available */}
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-[#9E033B]">{chatData.name}</h2>
                                <p className="text-sm text-gray-500">Order ID: {chatData.id}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Messages Container */}
                <div className="h-[calc(100vh-180px)] overflow-y-auto p-4 backdrop-grayscale-200" style={{ backgroundImage: `url(${icons.MessageBackground})`, backgroundSize: "contain", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
                    <div className="space-y-4 px-12" >
                        {chatData.messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex ${message.sender === "vendor" ? "justify-end" : "justify-start"}`}
                            >
                                <div
                                    className={`max-w-[70%] rounded-lg p-3 ${message.sender === "vendor"
                                        ? "bg-[#E5024E] text-white"
                                        : "bg-gray-100 text-gray-800"
                                        }`}
                                >
                                    <p className="text-sm">{message.text}</p>
                                    <p className="text-xs mt-1 opacity-70">
                                        {message.timestamp}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Message Input */}
                <div className="p-4 fixed bottom-0 w-[80%] flex justify-center">
                    <div className="flex items-center gap-2 w-[80%]">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Send a message"
                            className="flex-1 p-2 rounded-full border border-gray-200 focus:outline-none focus:border-[#E5024E] text-black"
                            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                        />
                        <button className="h-10 px-10 rounded-full font-medium text-white bg-gradient-to-t from-[#CC054D] to-[#EE6295] hover:from-pink-600 hover:to-rose-700 border-0 cursor-pointer shadow-lg">
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
