/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useGetRiderHistoryQuery } from "@/redux/features/rider/rider.api"
import { Link } from "react-router"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Car, ChevronLeft, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"

const History = () => {
  const { data, isLoading, isError } = useGetRiderHistoryQuery(undefined)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  if (isLoading)
    return <div className="text-center py-10 text-gray-500">Loading ride history...</div>
  if (isError)
    return <div className="text-center py-10 text-red-500">Failed to load ride history</div>

  const allRides = data?.data?.slice().reverse() || []
  const totalPages = Math.ceil(allRides.length / itemsPerPage)

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentRides = allRides.slice(startIndex, endIndex)

  const handlePrev = () => setCurrentPage((p) => Math.max(p - 1, 1))
  const handleNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages))

  return (
    <section className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">
      
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center mb-3">
            <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
              <Car size={26} />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Ride History</h1>
          <p className="text-gray-500 mt-2">Review all your past rides and their details</p>
        </motion.div>


        <div className="overflow-hidden rounded-2xl shadow-md border">
          <Table>
            <TableHeader className="bg-chart-1">
              <TableRow>
                <TableHead className="font-semibold text-gray-700">Destination</TableHead>
                <TableHead className="font-semibold text-gray-700">Pickup</TableHead>
                <TableHead className="font-semibold text-gray-700">Fare</TableHead>
                <TableHead className="font-semibold text-gray-700">Status</TableHead>
                <TableHead className="font-semibold text-gray-700 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {currentRides.map((ride: any) => (
                <TableRow
                  key={ride._id}
                  className="hover:bg-blue-50/40 transition-colors duration-200"
                >
                  <TableCell className="font-medium">{ride.destinationLocation.address}</TableCell>
                  <TableCell className="font-medium">{ride.pickupLocation.address}</TableCell>
                  <TableCell className="text-chart-1">{ride.fare} ৳</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        ride.status === "completed"
                          ? "default"
                          : ride.status === "cancelled"
                          ? "destructive"
                          : "secondary"
                      }
                      className="capitalize"
                    >
                      {ride.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Link to={`/rider/history/${ride._id}`}>
                      <Button
                        variant="outline"
                        className="text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white transition"
                        size="sm"
                      >
                        Details
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}

              {currentRides.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                    No rides found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center gap-3 items-center mt-6 max-w-6xl mx-auto">
            <Button
              variant="outline"
              disabled={currentPage === 1}
              onClick={handlePrev}
              className="flex items-center gap-1"
            >
              <ChevronLeft size={18} /> Prev
            </Button>

            <p className="text-gray-600">
              Page <span className="font-semibold">{currentPage}</span> of {totalPages}
            </p>

            <Button
              variant="outline"
              disabled={currentPage === totalPages}
              onClick={handleNext}
              className="flex items-center gap-1"
            >
              Next <ChevronRight size={18} />
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}

export default History
