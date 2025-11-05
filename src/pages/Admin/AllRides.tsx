/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Calendar, Loader2, Search } from "lucide-react"
import { format } from "date-fns"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DateRange } from "react-day-picker"
import { Calendar as CalendarPicker } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useGetRidesQuery } from "@/redux/features/admin/admin.api"
import { cn } from "@/lib/utils"

const AllRides = () => {
  const { data: rides, isLoading, isError } = useGetRidesQuery(undefined)
  const [search, setSearch] = useState("")
  const [dateRange, setDateRange] = useState<DateRange | undefined>()

  const filteredRides = useMemo(() => {
    if (!rides?.data?.data) return []

    return rides.data.data.filter((ride: any) => {
      const matchesSearch =
        ride.pickupLocation.address
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        ride.destinationLocation.address
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        ride.status?.toLowerCase().includes(search.toLowerCase())

      const rideDate = new Date(ride.requestedAt)
      const withinDateRange =
        !dateRange?.from ||
        !dateRange?.to ||
        (rideDate >= dateRange.from && rideDate <= dateRange.to)

      return matchesSearch && withinDateRange
    })
  }, [rides, search, dateRange])

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="animate-spin w-6 h-6 text-muted-foreground" />
      </div>
    )

  if (isError)
    return <p className="text-center text-red-500">Something went wrong!</p>

  return (
    <motion.div
      className="p-4 md:p-8 space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Card className="shadow-md border rounded-2xl">
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <CardTitle className="text-xl font-semibold">All Rides</CardTitle>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                   <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by pickup, destination"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "justify-start text-left font-normal w-full sm:w-60",
                    !dateRange && "text-muted-foreground"
                  )}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {dateRange?.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "LLL dd, y")} -{" "}
                        {format(dateRange.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(dateRange.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Filter by date</span>
                  )}
                </Button>
              </PopoverTrigger>

              <PopoverContent align="end" className="p-0">
                <CalendarPicker
                  mode="range"
                  selected={dateRange}
                  onSelect={setDateRange}
                  numberOfMonths={1}
                />
              </PopoverContent>
            </Popover>
          </div>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pickup Location</TableHead>
                  <TableHead>Destination</TableHead>
                  <TableHead>Fare</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Requested At</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredRides.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center py-8 text-muted-foreground"
                    >
                      No rides found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredRides.map((ride: any, i: number) => (
                    <motion.tr
                      key={ride._id || i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03 }}
                      className="border-b hover:bg-muted/50 transition-colors"
                    >
                      <TableCell>{ride.pickupLocation?.address}</TableCell>
                      <TableCell>{ride.destinationLocation?.address}</TableCell>
                      <TableCell>{ride.fare} ৳</TableCell>
                      <TableCell>
                        <span
                          className={cn(
                            "font-medium capitalize",
                            ride.status === "completed"
                              ? "text-green-600"
                              : ride.status === "cancelled"
                              ? "text-red-500"
                              : "text-blue-500"
                          )}
                        >
                          {ride.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        {format(new Date(ride.requestedAt), "PPP")}
                      </TableCell>
                    </motion.tr>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default AllRides
