import { useUserInfoQuery } from "@/redux/features/auth/auth.api"
import type { TRole } from "@/types"
import type { ComponentType } from "react"
import { Navigate } from "react-router"

export const withAuth = (Component: ComponentType, requiredRole?: TRole, requiredId?: string) => {
    return function AuthWrapper() {

        const { data, isLoading } = useUserInfoQuery(undefined)
        if (!isLoading && !data?.data?.data?.email) {
            return <Navigate to={'/login'} />
        }

        console.log(data?.data?.data?._id);
        if (requiredId && !isLoading && requiredId !== data?.data?.data?.role) {
            return <Navigate to={'/unauthorized'} />
        }

        if (requiredRole && !isLoading && requiredRole !== data?.data?.data?.role) {
            return <Navigate to={'/unauthorized'} />
        }
        
        return <Component />
    }
}