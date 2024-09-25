import axios from 'axios'
import toast from 'react-hot-toast'
import { create } from 'zustand'



const SERVER = import.meta.env.VITE_SERVER;

const api = axios.create({
    baseURL: SERVER,
    withCredentials: true
})

export const AuthStore = create((set) => ({
    isLoading: false,
    isCheckingAuth: true,
    isVerified: false,
    isAuthorized : false,
    SignUp: async (name, email, password) => {
        try {
            console.log(SERVER)
            set({ isLoading: true })
            const response = await api.post(`${SERVER}/api/auth/signup`, { name, email, password })
            toast.success(response.data.message)
            set({ isLoading: false})
            return response.data.success;
        } catch (error) {
            toast.error(error?.response?.data?.message || "Server Error")
            set({ isLoading: false })
        }
    },

    Verify: async (otp) => {
        try {
            set({ isLoading: true })
            const response = await api.post(`${SERVER}/api/auth/verify-user`, { otp })
            set({ isLoading: false})
            toast.success(response.data.message)
            console.log(response.data.success)
            return response.data.success;
        } catch (error) {
            toast.error(error?.response?.data?.message || "Server Error")
            set({ isLoading: false })
        }
    },
    VerifyUser: async (token,otp) => {
        try {
            set({ isLoading: true })
            const response = await api.post(`${SERVER}/api/auth/verify-user/${token}/${otp}`)
            set({ isLoading: false})
            toast.success(response.data.message)
            return response.data.success;
        } catch (error) {
            toast.error(error?.response?.data?.message || "Server Error")
            set({ isLoading: false })
        }
    },

    ResendOTP: async () => {
        try {
            set({ isLoading: true });
            const response = await api.post(`${SERVER}/api/auth/resend-otp`)
            toast.success(response.data.message)
            set({ isLoading: false })
        } catch (error) {
            toast.error(error?.response?.data?.message || "Server Error")
            set({ isLoading: false })
        }
    },

    Login: async (email, password) => {
        try {
            set({ isLoading: true })
            const response = await api.post(`${SERVER}/api/auth/login`, { email, password })
            set({ isLoading: false })
            toast.success(response.data.message)
            return response.data.success;
        } catch (error) {
            toast.error(error?.response?.data?.message || "Server Error")
            set({ isLoading: false })
        }
    },

    Logout: async () => {
        try {
            set({ isLoading: true })
            const response = await api.post(`${SERVER}/api/auth/logout`);
            set({ isLoading: false , isAuthorized: false, isVerified: false})
            toast.success(response.data.message)
            return response.data.success;
        } catch (error) {
            toast.error(error?.response?.data?.message || "Server Error")
            set({ isLoading: false })
        }
    },

    ForgotPassword: async (email) => {
        try {
            set({ isLoading: true })
            const response = await api.post(`${SERVER}/api/auth/forgot-password`, { email })
            toast.success(response.data.message)
            set({ isLoading: false })
            return response;
        } catch (error) {
            toast.error(error?.response?.data?.message || "Server Error")
            set({ isLoading: false })
        }
    },

    ResetPassword: async (token, password) => {
        try {
            set({ isLoading: true })
            const response = await api.post(`${SERVER}/api/auth/reset-password/${token}`, { password })
            toast.success(response.data.message)
            set({ isLoading: false})
            return response;
        } catch (error) {
            toast.error(error?.response?.data?.message || "Server Error")
            set({ isLoading: false })
        }
    },

    AuthorizationCheck: async () => {
        try {
            const response = await api.post(`${SERVER}/api/auth/authorization-check`);
            set({ isCheckingAuth: false,  isVerified: response.data.isVerified , isAuthorized : response.data.isAuthorized });
        } catch (error) {
              set({
                isAuthorized: false,
                isVerified: false,
                isCheckingAuth: false
              });
        }
    }
}))