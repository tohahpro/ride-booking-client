/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetAvailableRidesQuery } from "@/redux/features/rider/rider.api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Link } from "react-router";

const statusColors: Record<string, string> = {
    requested: "bg-green-300 text-green-800",
};

const AllRides = () => {
    const { data, isLoading, isError } = useGetAvailableRidesQuery(undefined);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="w-6 h-6 animate-spin text-gray-600" />
                <span className="ml-2 text-gray-700">Loading available rides...</span>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="text-center text-red-500 font-medium mt-10">
                Failed to load available rides
            </div>
        );
    }

    const rides = data?.data || [];

    if (rides.length === 0) {
        return (
            <div className="text-center text-gray-500 font-medium mt-10">
                🚘 No available rides right now — waiting for the next request!
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-center font-bold text-lg">Requested Ride</h2>
            <div className="p-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {rides.map((ride: any) => (
                    <Card key={ride._id} className="shadow-sm border border-gray-200 hover:shadow-md transition">
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold flex justify-between items-center">
                                <span>Ride #{ride._id.slice(-5)}</span>
                                <span
                                    className={`px-4 py-1 rounded-full text-xs font-semibold ${statusColors[ride.status] || "bg-gray-200 text-gray-800"
                                        }`}
                                >
                                    {ride.status.replace("_", " ")}
                                </span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm text-gray-700">
                            <p>
                                <strong>Pickup:</strong> {ride.pickupLocation?.address || "N/A"}
                            </p>
                            <p>
                                <strong>Destination:</strong> {ride.destinationLocation?.address || "N/A"}
                            </p>
                            <p>
                                <strong>Fare:</strong>{" "}
                                <span className="text-green-600 font-semibold">{ride.fare} tk</span>
                            </p>
                            <div className="flex justify-end pt-2">
                                <Link to={`/driver/ride-details/${ride._id}`}>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="cursor-pointer"
                                    >
                                        View Details
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default AllRides;
