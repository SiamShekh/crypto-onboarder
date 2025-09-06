declare namespace Express {
    export interface Request {
        user: {
            id: number,
            address: string
        },
        admin: {
            id: number
            email: string
            password: string
        }
    }
}