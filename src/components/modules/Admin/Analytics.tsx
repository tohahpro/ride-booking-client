/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from "react"
import { motion } from "framer-motion"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useGetRidesQuery } from "@/redux/features/admin/admin.api"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  ResponsiveContainer,
  Legend,
} from "recharts"

const AnalyticsDashboard = () => {
  const { data: ridesData, isLoading, isError } = useGetRidesQuery(undefined)

  const analyticsData = useMemo(() => {
    if (!ridesData?.data?.data) return { rideVolume: [], revenue: [], driverActivity: [] }

    const rideVolumeMap: Record<string, number> = {}
    const revenueMap: Record<string, number> = {}
    const driverMap: Record<string, number> = {}

    ridesData.data.data.forEach((ride: any) => {
      const date = new Date(ride.requestedAt).toLocaleDateString()

      rideVolumeMap[date] = (rideVolumeMap[date] || 0) + 1

      revenueMap[date] = (revenueMap[date] || 0) + ride.fare

      if (ride.driverId) {
        driverMap[ride.driverId] = (driverMap[ride.driverId] || 0) + 1
      }
    })

    const rideVolume = Object.keys(rideVolumeMap).map(date => ({ date, rides: rideVolumeMap[date] }))
    const revenue = Object.keys(revenueMap).map(date => ({ date, revenue: revenueMap[date] }))
    const driverActivity = Object.keys(driverMap).map(driverId => ({ driverId, rides: driverMap[driverId] }))

    return { rideVolume, revenue, driverActivity }
  }, [ridesData])

  if (isLoading) return <p className="text-center py-8">Loading...</p>
  if (isError) return <p className="text-center py-8 text-red-500">Failed to load data</p>

  return (
    <motion.div
      className="px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >

      <Card>
        <CardHeader>
          <CardTitle>Ride Volume</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analyticsData.rideVolume}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="rides" stroke="#4ade80" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Revenue Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analyticsData.revenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#60a5fa" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Driver Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analyticsData.driverActivity}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="driverId" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="rides" fill="#facc15" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default AnalyticsDashboard
