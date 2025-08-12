import {useState, useRef, useEffect} from 'react';
import useChatManagement from '../hooks/useChatManagement';
import { useNavigate } from 'react-router-dom';
import { AiOutlineSend } from "react-icons/ai";

export default function Chat() {
    const token: string | null = localStorage.getItem("token");
    const navigate = useNavigate();
    if (!token) {
        navigate("/login");
    }

    const [searchQuery, setSearchQuery] = useState<string>('');
    const { searchUsers, selectedUser, handleClickUser, handleSendMessage, messages } = useChatManagement();
    const [onFocus, setOnFocus] = useState<boolean>(false);
    const [content, setContent] = useState<string>("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
        }
    }, [messages]);

    return (
    <div className="flex flex-col md:flex-row items-center justify-center h-screen bg-gradient-to-t from-red-500 to-white gap-4 p-4">
        <div className="bg-gray-600 md:w-1/5 w-full h-48 md:h-[80%] rounded shadow-lg shadow-red-500 flex flex-col items-center justify-start p-4 gap-2">
            <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full p-2 rounded bg-red-400 text-white" placeholder="Search users..." onFocus={() => setOnFocus(true)} onBlur={() => setTimeout(() => setOnFocus(false), 150)}/>
            {onFocus && (<ul className="w-full overflow-y-auto h-full">
                {searchUsers(searchQuery).map(user => (
                    <li key={user.id} className="text-white p-2 hover:bg-red-400 cursor-pointer bg-gray-700 border border-red-200" onClick={() => {handleClickUser(user)}}>
                        {user.username} ({user.email})
                    </li>
                ))}
            </ul>)}
        </div>
        <div className="bg-gray-600 md:w-3/5 w-full h-64 md:h-[80%] rounded shadow-lg shadow-red-500">
            {selectedUser ? (
                <div className="p-4 text-white flex flex-col items-start justify-start h-full w-full">
                    <h2 className="text-2xl mb-2">{selectedUser.username}</h2>
                    <div className='bg-red-100 w-full h-[0.2%]'></div>

                    <div ref={messagesEndRef} className='h-full overflow-y-auto w-full my-2 flex flex-col gap-2'>
                        {messages.map((msg, index) => (
                            <div key={index} className={`p-2 rounded ${msg.sender === parseInt(selectedUser.id) ? 'bg-gray-300 self-start' : 'bg-red-400 self-end text-white'}`}>
                                <p className="text-sm">{msg.content}</p>
                                <span className="text-xs text-gray-600">{new Date(msg.timestamp).toLocaleString()}</span>
                            </div>
                        ))}
                    </div>

                    <div className='flex flex-col items-start justify-end w-full'>
                        <div className='flex flex-row w-full'>
                            <textarea rows={2} className="w-[93%] h-15 border border-gray-200 focus:outline-none focus:border focus:border-gray-200 rounded-lg resize-none p-2" placeholder="Type your text" value={content} onChange={e => setContent(e.target.value)} 
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    if (content.trim() === "") return;
                                    handleSendMessage(content);
                                    setContent("");
                                }
                            }}/>
                            <button className="w-[7%] bg-red-400 rounded-lg hover:bg-red-500 cursor-pointer font-extrabold text-base text-gray-800 shadow-md " type="submit"
                            onClick={() => {
                                if (content.trim() === "") return;
                                handleSendMessage(content);
                                setContent("");
                            }}
                            >
                                <AiOutlineSend size="1.25rem" className='mx-[35%]'/>
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-center h-full text-white text-2xl">
                    <p>Select a user to start chatting</p>
                </div>
            )}
        </div>
    </div>

    )
}