import { useState, useEffect, useRef } from "react";
import type { MessageDTO, UserDTO } from "../types";
import UserService from "../services/UserService";
import { useChatService } from "../services/ChatService";

export default function useChatManagement() {
    const [users, setUsers] = useState<UserDTO[]>([]);
    const [selectedUser, setSelectedUser] = useState<UserDTO | null>(null);
    const token: string | null = localStorage.getItem("token");
    const me = useRef<UserDTO | null>(null);
    const { sendMessage, getMessagesBetweenTwoUsers, messages, setMessages } = useChatService();


    useEffect(() => {
        const fetchUsers = async () => {
            const fetchedUsers: UserDTO[] = await UserService.getAllUsers(token || "");
            setUsers(fetchedUsers);
            me.current = await UserService.getUser(token || "");
        };

        fetchUsers();
    }, []);

    function searchUsers(query: string): UserDTO[] {
        const lowerQuery = query.toLowerCase().trim();
        return users.filter(user =>
            user.username.toLowerCase().includes(lowerQuery) ||
            user.email.toLowerCase().includes(lowerQuery)
        );
    }

    async function handleClickUser(user: UserDTO) {
        setSelectedUser(user);
        const messages = await getMessagesBetweenTwoUsers(token || "", user.id);
        setMessages(messages);
        console.log(`Selected user: ${user.username} (${user.email})`);
    }

    function handleSendMessage(content: string) {
        if (!selectedUser) {
            console.error("No user selected");
            return;
        }
        if (!token) {
            console.error("No token found");
            return;
        }

        const message: MessageDTO = {
            content,
            sender: parseInt(me.current?.id || "0"),
            receiver: parseInt(selectedUser.id),
            timestamp: new Date()
        };

        sendMessage(message);
    }

    return {
        users,
        searchUsers,
        selectedUser,
        handleClickUser,
        handleSendMessage,
        messages
    };
}