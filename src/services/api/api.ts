import axios from 'axios';
import { toast } from '@/hooks/use-toast';
import { LoginResult } from '@/types/type';

// export const base = "http://10.100.104.120:8008"
// export const baseUrl = `${base}/api`

export const base = "http://app.metra-rent.uz"
export const baseUrl = `${base}/api`

export const api = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use((config) => {
  const user_info = sessionStorage.getItem("auth");
  const isAuthenticated: LoginResult = user_info ? JSON.parse(user_info) : {};
  const token = isAuthenticated?.token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
},
(error) => {
  toast({ variant: "destructive", title: "So'rov yuborishda xatolik", description: error.message || "Noma'lum xatolik yuz berdi" });
  return Promise.reject(error);
}
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      sessionStorage.removeItem('token');
      // window.location.href = '/login';
      toast({ variant: "destructive", title: "Avtorizatsiya xatosi", description: "Iltimos, qaytadan tizimga kiring" });
    } else {
      toast({ variant: "destructive", title: "Xatolik yuz berdi", description: error.response?.data?.message || error.message || "Noma'lum xatolik yuz berdi" });
    }
    return Promise.reject(error);
  }
);

// Universal API functions
export const apiRequest = async <T>(method: "POST" | "GET" | "PUT" | "DELETE", url: string, data?: any, headers = {}) => {
  try {
    const isFormData = data instanceof FormData;
    const response = await api.request<T>({
      method,
      url,
      data,
      headers: {
        ...(isFormData ? {} : { "Content-Type": "application/json" }), // FormData bo‘lsa, Content-Type avtomatik qo‘shiladi
        ...headers,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};










//? Eskisi

// import axios from 'axios'

// import { toast } from '@/hooks/use-toast'

// export const API = axios.create({
//   baseURL: import.meta.env.VITE_BASE_API_URL,
//   headers: {
//     'Content-Type': 'application/json'
//   }
// })

// API.interceptors.request.use(
//   config => {
//     const authInfo = JSON.parse(sessionStorage.getItem('auth') || '{}')
//     if (authInfo.token)
//       config.headers.Authorization = `Bearer ${authInfo.token}`
//     return config
//   },
//   error => {
//     return Promise.reject(error)
//   }
// )

// API.interceptors.response.use(
//   response => response.data,
//   error => {
//     console.log('Logging the error', error)
//     toast({
//       title: 'Opps, something wrong',
//       description: (
//         <pre className='mt-2 w-[340px] rounded-md bg-destructive p-4 text-white'>
//           {error.message}
//         </pre>
//       )
//     })
//     return Promise.reject(error)
//   }
// )
