import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";
import Cookies from 'js-cookie';
import { serverErrorMessages } from '../utils/DataLists'

const SERVER = import.meta.env.VITE_SERVER;

const apiRequest = axios.create({
    baseURL: SERVER,
    withCredentials: true
})

const api = async ( method , url , data = {} ) => {
    const headers = {
        Authorization : `Bearer ${Cookies.get("safeToken")}`,
        'Content-Type': 'application/json'
    }
    switch ( method ) {
        case 'GET' : return await apiRequest.get( url , { headers } )
        case 'POST' : return await apiRequest.post ( url , data , { headers } )
        case 'DELETE' : return await apiRequest.delete( url , { headers , data } )
    }
    
};

export const ChatStore = create((set) => ({
    isLoading: false,
    isChatLoading: false,

    CreateNewChat: async () => {
        set({ isLoading: true })
        try {
            const response = await api( 'POST' , `${SERVER}/api/user/create-chat`)
            toast.success(response.data.message);
            return response.data
        } catch (error) {
            toast.error("Something went wrong. Unable to create new chat.")
        } finally {
            set({ isLoading: false })
        }
    },

    DeleteChat: async (chatId) => {
        set({ isLoading: true })
        try {
            const response = await api( 'DELETE' , `${SERVER}/api/user/del-chat`, { chatId } );
            toast.success(response.data.message);
        } catch (error) {
            console.log(error)
            toast.error("Not able to delete chat, Plese try again.")
        } finally {
            set({ isLoading: false })
        }
    },

    GetLatestChat: async () => {
        try {
            const response = await api( 'GET' , `${SERVER}/api/user/get-latest-chat`)
            return response.data
        } catch (error) {
            console.log(error)
        }
    },

    GetAllChats: async (chatId) => {
        set({ isLoading: true });
        try {
            const response = await api( 'GET' , `${SERVER}/api/user/get-chat-conversation/${chatId}`)
            return response.data;
        } catch (error) {
            toast.error("Something went wrong.")
        } finally {
            set({ isLoading: false });
        }
    },

    GetRecentChats: async () => {
        try {
            const response = await api( 'GET' , `${SERVER}/api/user/get-all-chats`)
            return response.data
        } catch (error) {
        }

    },

    UploadImage : async (formData) => {
        try {
            const response = await apiRequest.post(`${SERVER}/api/chat/upload-img` , formData , {
                headers: {
                    'Content-Type' : 'multipart/form-data'
                }
            } ) 
            return response.data;
        } catch (error) {
            toast.error("Failed to upload Image")
        } 
    },

    AskFriendlyPAI: async (query, chatId) => {
        set({ isChatLoading: true })
        try {
            const response = await api( 'POST' , `${SERVER}/api/chat/ask-PAI`, { query, chatId })
            const answer = response.data;
            return answer;
        } catch (error) {
            toast.error("Server Error. Please wait...")
            return serverErrorMessages[Math.floor(Math.random() * (serverErrorMessages.length))];
        } finally {
            set({ isChatLoading: false })
        }
    }
}))