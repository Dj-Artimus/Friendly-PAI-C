import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";


const SERVER = import.meta.env.VITE_SERVER;

const api = axios.create({
    baseURL: SERVER,
    withCredentials: true
})

export const ChatStore = create((set) => ({
    isLoading: false,
    isChatLoading: false,

    CreateNewChat: async () => {
        set({ isLoading: true })
        try {
            const response = await api.post(`${SERVER}/api/user/create-chat`)
            toast.success(response.data.message);
            set({ isLoading: false })

            return response.data
        } catch (error) {
            toast.error("Something went wrong. Unable to create new chat.")
        }
        set({ isLoading: false })
    },

    DeleteChat: async (chatId) => {
        set({ isLoading: true })
        try {
            const response = await api.delete(`${SERVER}/api/user/del-chat`, { data: { chatId } });
            toast.success(response.data.message);
        } catch (error) {
            console.log(error)
            toast.error("Not able to delete chat, Plese try again.")
        }
        set({ isLoading: false })
    },

    GetLatestChat: async () => {
        try {
            const response = await api.get(`${SERVER}/api/user/get-latest-chat`)
            return response.data
        } catch (error) {
            console.log(error)
        }
    },

    GetAllChats: async (chatId) => {
        set({ isLoading: true });
        try {
            const response = await api.get(`${SERVER}/api/user/get-chat-conversation/${chatId}`)
            set({ isLoading: false });
            return response.data;
        } catch (error) {
            set({ isLoading: false });
            toast.error("Something went wrong.")
        }
    },

    GetRecentChats: async () => {
        try {
            const response = await api.get(`${SERVER}/api/user/get-all-chats`)
            return response.data
        } catch (error) {
            toast.error("Error to fetch rescent chats.")
        }

    },

    AskFriendlyPAI: async (query, chatId) => {
        set({ isChatLoading: true })
        try {
            const response = await api.post(`${SERVER}/api/chat/ask-PAI`, { query, chatId })
            const answer = response.data;
            set({ isChatLoading: false })
            return answer;
        } catch (error) {
            toast.error("Server Error. Please refresh")
            set({ isChatLoading: false })
            return "SERVER ERROR. PLEASE TRY AGAIN."
        }
    }
}))