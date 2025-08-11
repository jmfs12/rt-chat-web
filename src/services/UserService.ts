import type { UserDTO } from "../types";
import axiosInstance from "../utils/axiosInstance";

class UserService {
    static async getUser(token: string): Promise<UserDTO> {
        const response = await axiosInstance.get(`api/users/me`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    }

    static async getAllUsers(token: string): Promise<UserDTO[]> {
        const response = await axiosInstance.get(`api/users`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log("All users:", response.data);
        return response.data;
    }
}

export default UserService;