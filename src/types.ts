export interface MessageDTO {
    content: string;
    sender: number;
    receiver: number;
    timestamp: Date;
}

export interface UserDTO {
    id: string;
    username: string;
    email: string;
}