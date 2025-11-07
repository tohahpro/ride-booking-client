import { useUserInfoQuery } from "@/redux/features/auth/auth.api"
import type { TRole } from "@/types"
import type { ComponentType } from "react"
import { Navigate, useLocation } from "react-router"

export const withAuth = (Component: ComponentType, requiredRole?: TRole, requiredId?: string) => {
    return function AuthWrapper() {

        const { data, isLoading } = useUserInfoQuery(undefined)
        const location = useLocation()

        if (!isLoading && !data?.data?.data?.email) {
            return <Navigate
                to={'/login'}
                state={{ from: location.pathname }}
                replace
            />
        }


        if (requiredId && !isLoading && requiredId !== data?.data?.data?.role) {
            return <Navigate to={'/unauthorized'} />
        }

        if (requiredRole && !isLoading && requiredRole !== data?.data?.data?.role) {
            return <Navigate to={'/unauthorized'} />
        }

        return <Component />
    }
}