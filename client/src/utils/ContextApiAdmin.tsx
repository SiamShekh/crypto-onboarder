import { createContext, ReactNode, useEffect, useState } from "react";
import admin from "../api/Admin";

export const ContextValuesAdmin = createContext<null | {
    user: {
        isLoading: boolean,
        setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
        data: {
            id: number
            email: string
            password: string
            createdAt: string
            updatedAt: string
        },
        isLoadingQuery: boolean
    }
}>(null);

const ContextApiAdmin = ({ children }: { children: ReactNode }) => {
    const userApi = admin.getAdmin(undefined);
    const [isLoading, setIsloading] = useState(true);

    useEffect(() => {
        if (isLoading && !userApi?.isLoading) {
            userApi.refetch();
            setIsloading(false);
        }
    }, [isLoading, userApi])

    return (
        <ContextValuesAdmin.Provider value={{
            user: {
                isLoading: false,
                setIsLoading: setIsloading,
                data: userApi?.data,
                isLoadingQuery: userApi.isFetching
            },
        }}>
            {children}
        </ContextValuesAdmin.Provider>
    );
};

export default ContextApiAdmin;