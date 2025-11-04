/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useGetDriverHistoryQuery } from "@/redux/features/driver/driver.api";
import {
  Loader2,
  Clock,
  MapPin,
  Phone,
  User,
  MessageSquare,
  CalendarCheck,
  Filter,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const itemLimits = 10;

const HistoryPage = () => {
  const { data, isLoading } = useGetDriverHistoryQuery(undefined);
  const rides = data?.data?.rides || [];


  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);


  const filteredRides = useMemo(() => {
    let filtered = rides;

    if (statusFilter !== "all") {
      filtered = filtered.filter((r: any) => r.status === statusFilter);
    }

    if (searchTerm.trim()) {
      filtered = filtered.filter(
        (r: any) =>
          r.rider?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          r.rider?.phone?.includes(searchTerm)
      );
    }

    return filtered;
  }, [rides, statusFilter, searchTerm]);


  const totalPages = Math.ceil(filteredRides.length / itemLimits);
  const paginatedRides = filteredRides.slice(
    (currentPage - 1) * itemLimits,
    currentPage * itemLimits
  );

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="animate-spin text-gray-600" size={24} />
        <span className="ml-2 text-gray-600">Loading history...</span>
      </div>
    );

  return (
    <div className="p-6 space-y-8">
      <h2 className="text-2xl font-bold text-gray-800">Driver Ride History</h2>

  
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-gray-50 p-4 rounded-lg shadow-sm border">
        <div className="flex items-center gap-2">
          <Filter className="text-gray-600" size={18} />
          <Select
            onValueChange={(val) => {
              setStatusFilter(val);
              setCurrentPage(1);
            }}
            defaultValue={statusFilter}
          >
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Input
          placeholder="Search by name or phone..."
          className="w-full sm:w-64"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

  
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {paginatedRides.map((ride: any, idx: number) => (
          <motion.div
            key={ride.rideId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="shadow-md border border-gray-200 hover:shadow-lg transition-all duration-200">
              <CardHeader className="bg-gray-50 rounded-t-lg py-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-gray-700">
                    <User size={18} className="text-blue-600" />
                    <span className="font-medium">{ride?.rider?.name}</span>
                  </div>
                  <span
                    className={`px-3 py-1 text-sm font-semibold rounded-full ${
                      ride.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : ride.status === "cancelled"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {ride.status}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                  <Phone size={14} />
                  <span>{ride?.rider?.phone || 'N/A'}</span>
                </div>
              </CardHeader>

              <CardContent className="p-4 space-y-3 text-gray-700">
                <div className="flex items-start gap-2">
                  <MapPin className="text-gray-600 mt-1" size={16} />
                  <div>
                    <p className="font-medium text-sm text-gray-600">
                      Pickup:{" "}
                      <span className="text-gray-800">{ride.pickupLocation}</span>
                    </p>
                    <p className="font-medium text-sm text-gray-600">
                      Destination:{" "}
                      <span className="text-gray-800">
                        {ride.destinationLocation}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock size={14} className="text-blue-500" />
                  <span>
                    Requested:{" "}
                    {new Date(ride.requestedAt).toLocaleString("en-BD", {
                      hour: "2-digit",
                      minute: "2-digit",
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>

                {ride.completedAt && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CalendarCheck size={14} className="text-green-500" />
                    <span>
                      Completed:{" "}
                      {new Date(ride.completedAt).toLocaleString("en-BD", {
                        hour: "2-digit",
                        minute: "2-digit",
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                )}

                <div className="flex justify-between items-center mt-3">
                  <p className="text-lg font-semibold text-gray-800">
                    Fare: <span className="text-blue-600">৳{ride.amount}</span>
                  </p>
                </div>

                {ride.feedback && (
                  <div className="flex items-start gap-2 bg-blue-50 p-2 rounded-md mt-2">
                    <MessageSquare
                      size={16}
                      className="text-blue-500 mt-0.5 flex-shrink-0"
                    />
                    <p className="text-sm text-gray-700 italic">
                      “{ride.feedback}”
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>


      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-6">
          <Button
            variant="outline"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Prev
          </Button>
          <span className="text-gray-600 text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
