import axiosInstance from "../utils/axiosInstance";

export default class LoginService{
    static async login(username: string, password: string) {
        try {
            const response = await axiosInstance.post("/auth/login", { username, password });
            return response.data;
        } catch (error: any) {
            throw new Error("Login failed: " + error.message);
        }
    }

    static async register(username: string, email: string, password: string) {
        try {
            const response = await axiosInstance.post("/auth/register", { username, email, password });
            return response.data;
        } catch (error: any) {
            throw new Error("Registration failed: " + error.message);
        }
    }
}