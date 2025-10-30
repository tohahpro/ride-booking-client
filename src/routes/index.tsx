import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Homepage from "@/pages/Homepage";
import LoginPage from "@/pages/Loginpage";
import { withAuth } from "@/utils/withAuth";
import { createBrowserRouter, Navigate } from "react-router";
import { generateRoutes } from "./generateRoutes";
import { adminSidebarItems } from "./adminSidebarItems";
import { TRole } from "@/types";
import { role } from "@/constants/role";
import { riderDynamicRoutes, riderSidebarItems } from "./riderSidebarItems";
import { driverSidebarItems } from "./driverSidebarItems";


const router = createBrowserRouter([
    {
        path: '/',
        Component: App,
        children: [
            {
                index: true,
                Component: Homepage
            }
        ]
    },
    {
        Component: withAuth(DashboardLayout, role.admin as TRole, ),
        path: '/admin',
        children: [
            {index: true, element: <Navigate to={'/admin/all-users'}/>},
            ...generateRoutes(adminSidebarItems)
        ]
    },
    {
        Component: withAuth(DashboardLayout, role.rider as TRole),
        path: '/rider',
        children: [
            {index: true, element: <Navigate to={'/rider/ride-request'}/>},
            ...generateRoutes(riderSidebarItems),
            ...riderDynamicRoutes.map(route => ({
                path: route.url,
                Component: route.component
            }))
        ]
    },
    {
        Component: withAuth(DashboardLayout, role.driver as TRole),
        path: '/driver',
        children: [
            {index: true, element: <Navigate to={'/driver/get-request'}/>},
            ...generateRoutes(driverSidebarItems)
        ]
    },
    {
        path: '/login',
        Component: LoginPage
    },
    
]);


export default router;