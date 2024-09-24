import { create } from 'zustand';
import axios from 'axios';
import toast from 'react-hot-toast';


const SERVER = import.meta.env.VITE_SERVER; 

const api = axios.create({
    baseURL: SERVER,
    withCredentials: true
})

export const UserStore = create((set) => ({
    isLoading: false,

    CreateProfile: async (nickname, dob, age, gender, education) => {
        try {
            set({ isLoading: true });
            const response = await api.post(`${SERVER}/api/user/create-profile`, {
                nickname, dob, age, gender, education
            })
            toast.success(response.data.message)
            set({ isLoading: false });
            return response.data.success;
        } catch (error) {
            toast.error(error?.response?.data?.message || "Server Error")
            set({ isLoading: false });
        }
    },

    AddInterests: async (interests) => {
        try {
            set({ isLoading: true });
            const response = await api.post(`${SERVER}/api/user/create-profile`, { interests: interests })
            set({ isLoading: false });
            toast.success(response.data.message)
            return response.data.success;
        } catch (error) {
            toast.error(error?.response?.data?.message || "Server Error")
            set({ isLoading: false });
        }
    },

    GetProfile: async () => {
        try {
            const response = await api?.get(`${SERVER}/api/user/get-profile`);
            const { name, email } = response?.data?.user
            const { nickname, dob, age, gender, education, interests } = response?.data?.profile
            const USER = {
                name,
                email,
                nickname,
                dob,
                age,
                gender,
                education,
                interests
            };
            return USER;
        } catch (error) {
            return null
        }

    },

    Logout: async () => {
        try {
            const response = await api.post(`${SERVER}/api/auth/logout`)
            console.log(response)
            toast.success(response.data.message);
        } catch (error) {
            toast.error("Logout unsuccessfull, Please try again...");
        }
    }

}))