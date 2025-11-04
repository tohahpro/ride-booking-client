import RideActionDetails from "@/components/modules/Driver/RideActionDetails";
import AcceptRide from "@/pages/Driver/AcceptRide";
import EarningHistoryPage from "@/pages/Driver/EarningHistory";
import HistoryPage from "@/pages/Driver/HistoryPage";
import ProfilePage from "@/pages/ProfilePage";
import type { ISidebarItem } from "@/types";
import { lazy } from "react";


const driverRequest = lazy(() => import('@/pages/Driver/AllRides'))
export const driverSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Request Rides",
        url: "/driver/get-request",
        component: driverRequest,
      },
      {
        title: "Running Rides",
        url: "/driver/accepted",
        component: AcceptRide,
      },
      {
        title: "History",
        url: "/driver/history",
        component: HistoryPage,
      },
      {
        title: "Earning History",
        url: "/driver/earning-history",
        component: EarningHistoryPage,
      },
      {
        title: "Profile",
        url: "/driver/profile",
        component: ProfilePage,
      },

    ],
  }
]

export const driverDynamicRoutes = [
  {
    url: "ride-details/:id",
    component: RideActionDetails,
  },
];