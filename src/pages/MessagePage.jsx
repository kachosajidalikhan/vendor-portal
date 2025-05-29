import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { ChevronLeft, Search, Send, } from "lucide-react"
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
            <div className="mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-[#E6EFF5]">
                    <div className="flex items-center gap-4 justify-between w-full px-4 sm:px-10"> {/* mobile:px-4 */}
                        <button
                            onClick={() => navigate("/chats")}
                            className="p-2 hover:bg-gray-100 rounded-full"
                        >
                            <ChevronLeft className="w-5 h-5 text-[#E5024E]" />
                        </button>
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full overflow-hidden bg-gray-200"> {/* mobile: smaller avatar */}
                                {/* Add avatar image here if available */}
                            </div>
                            <div>
                                <h2 className="text-base sm:text-lg font-semibold text-[#9E033B]">{chatData.name}</h2>
                                <p className="text-xs sm:text-sm text-gray-500">Order ID: {chatData.id}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Messages Container */}
                <div
                    className="md:h-[calc(100vh-180px)] h-[calc(80vh-120px)]  overflow-y-auto p-2 sm:p-4 backdrop-grayscale-200"
                    style={{
                        backgroundImage: `url(${icons.MessageBackground})`,
                        backgroundSize: "contain",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                    }}
                >
                    <div className="space-y-4 px-2 sm:px-12"> {/* mobile:px-2 */}
                        {chatData.messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex ${message.sender === "vendor" ? "justify-end" : "justify-start"}`}
                            >
                                <div
                                    className={`max-w-[85%] sm:max-w-[70%] rounded-lg p-3 ${message.sender === "vendor"
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
                <div className="fixed bottom-0 right-0 xl:w-[80%] lg:w-[75%] md:w-[100%] w-[100%] bg-white z-10 px-4 py-2 lg:px-8">
                    <div className="flex md:flex-wrap items-center md:justify-between gap-2 w-full">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Send a message"
                            className="flex-grow p-2 rounded-full border border-gray-200 focus:outline-none focus:border-[#E5024E] text-black min-w-[150px]"
                            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                        />
                        <button
                            onClick={handleSendMessage}
                            className="h-10 px-6 lg:px-10 rounded-full font-medium text-white bg-gradient-to-t from-[#CC054D] to-[#EE6295] hover:from-pink-600 hover:to-rose-700 border-0 cursor-pointer shadow-lg flex items-center justify-center gap-1"
                        >
                            <span className="hidden lg:block">Submit</span>
                            <Send className="lg:hidden h-5 w-5" />
                        </button>
                    </div>
                </div>

            </div>
        </div>

    )
}
