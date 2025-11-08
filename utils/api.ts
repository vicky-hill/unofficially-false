import axios from "axios"
import error from "./error"

const instance = axios.create({
    baseURL: `${process.env.API_URL}`,
    // baseURL: "http://localhost:4000/api/fluent",
    headers: { 'Content-Type': 'application/json' }
});

instance.interceptors.request.use((config) => {
    const token = typeof window !== "undefined" && localStorage.getItem('token');
    config.headers['x-auth-token'] = token ? token : ''
    return config;
});

export const api = {
    get: async <T>(url: string): Promise<T> => {
        const promise = (resolve: (value: T) => void, reject: (reason?: any) => void) => {
            instance.get(url)
                .then(res => resolve(res.data))
                .catch(err => {
                    error(err);
                    reject(err);
                })
        }

        return new Promise(promise);
    },
    post: async <T>(url: string, body: any): Promise<T> => {
        const promise = (resolve: (value: T) => void, reject: (reason?: any) => void) => {
            instance.post(url, body)
                .then(res => resolve(res.data))
                .catch(err => {
                    error(err);
                    reject(err);
                })
        }

        return new Promise(promise);
    },
    put: async <T>(url: string, body: any): Promise<T>  => {
        const promise = (resolve: (value: T) => void, reject: (reason?: any) => void) => {
            instance.put(url, body)
                .then(res => resolve(res.data))
                .catch(err => reject(error(err)))
        }

        return new Promise(promise);
    },
    delete: async <T>(url: string): Promise<T>  => {
        const promise = (resolve: (value: T) => void, reject: (reason?: any) => void) => {
            instance.delete(url)
                .then(res => resolve(res.data))
                .catch(err => {
                    error(err);
                    reject(err);
                })
        }

        return new Promise(promise);
    }
}

export default api;