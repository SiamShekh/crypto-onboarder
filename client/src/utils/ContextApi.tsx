import { createContext, ReactNode, useEffect, useState } from "react";
import user from "../api/User";

export const ContextValues = createContext<null | {
    user: {
        isLoading: boolean,
        setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
        data: {
            id: number
            solAddress: string
            username?: string
            connectAt: string
        }
    }
}>(null);

const ContextApi = ({ children }: { children: ReactNode }) => {
    const userApi = user.getUser(undefined);
    const [isLoading, setIsloading] = useState(userApi.isLoading);
    
    useEffect(()=>{
        if (isLoading && !userApi?.isLoading) {
            userApi.refetch();
            setIsloading(false);
        }
    },[isLoading,userApi])

    return (
        <ContextValues.Provider value={{
            user: {
                isLoading: false,
                setIsLoading: setIsloading,
                data: userApi?.data?.user
            },
        }}>
            {children}
        </ContextValues.Provider>
    );
};

export default ContextApi;