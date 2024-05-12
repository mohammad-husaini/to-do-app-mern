interface User {
    _id: string;
    username: string;
    email: string;
    password: string;
    image?: string;
}

interface RegisterRequest {
    username: string;
    email: string;
    password: string;
    image?: Buffer;
}

interface LoginRequest {
    email: string;
    password: string;
}


interface AuthResponse {
    token: string;
}


interface AuthenticatedRequest extends Request {
    user: User;
}
