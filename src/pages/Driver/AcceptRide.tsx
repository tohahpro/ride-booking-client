/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useGetAcceptedRidesQuery, useUpdateRideStatusMutation } from "@/redux/features/driver/driver.api";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router";

const statusColors: Record<string, string> = {
    requested: "bg-gray-300 text-gray-800",
    accepted: "bg-blue-200 text-blue-800",
    picked_up: "bg-yellow-200 text-yellow-800",
    in_transit: "bg-indigo-200 text-indigo-800",
    completed: "bg-green-200 text-green-800",
    cancelled: "bg-red-200 text-red-800",
};

const AcceptRides = () => {
    const { data, isLoading } = useGetAcceptedRidesQuery(undefined);
    const [updateRideStatus] = useUpdateRideStatusMutation();

    const navigate = useNavigate();
    const [selectedStatuses, setSelectedStatuses] = useState<Record<string, string>>({});

    const handleSelectChange = (rideId: string, value: string) => {
        setSelectedStatuses((prev) => ({ ...prev, [rideId]: value }));
    };

    const handleStatusUpdate = async (rideId: string) => {
        const lastStatus = selectedStatuses[rideId];
        if (!lastStatus) {
            toast.error("Please select a status first!");
            return;
        }
        try {
            await updateRideStatus({ rideId, status: lastStatus }).unwrap();
            toast.success(`Ride status updated to ${lastStatus}`);
            if (lastStatus === "completed") {
                setTimeout(() => {
                    navigate("/driver/history"); 
                }, 800);
            }
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to update status");
        }
    };

    if (isLoading)
        return (
            <div className="flex items-center justify-center h-40">
                <Loader2 className="animate-spin" /> Loading accepted rides...
            </div>
        );

        


    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4 text-center">Accepted Running Rides</h2>
            {data?.data?.length > 0 ? (
                <div className="grid gap-4">
                    {data.data.map((ride: any) => (
                        <div
                            key={ride._id}
                            className="p-4 border rounded-lg shadow-sm bg-white space-y-3"
                        >
                            <p>
                                <strong>Pickup:</strong> {ride.pickupLocation?.address}
                            </p>
                            <p>
                                <strong>Destination:</strong> {ride.destinationLocation?.address}
                            </p>

                            <div className="flex items-center gap-2">
                                <span
                                    className={`px-2 py-1 rounded-md text-sm font-medium ${statusColors[ride.status]}`}
                                >
                                    {ride.status.replace("_", " ")}
                                </span>
                            </div>                     
                            <div className="">
                                <h3 className="font-semibold text-gray-800 mb-2">
                                    Ride Timeline
                                </h3>
                                <ul className="border-l-2 border-gray-300">
                                    {ride.history.map((step: any, idx: number) => (
                                        <li key={idx} className="mb-4 ml-4 relative">
                                            <span
                                                className={`absolute -left-3 w-6 h-6 rounded-full flex items-center justify-center text-white ${statusColors[step.status] || "bg-gray-400"
                                                    }`}
                                            >
                                                {idx + 1}
                                            </span>
                                            <p className="text-gray-700 pl-6 font-medium">
                                                {step.status.replace("_", " ")}
                                            </p>
                                            <p className="text-gray-500 pl-6 text-sm">
                                                {new Date(step.at).toLocaleString()}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="flex items-center gap-3">
                                <Select
                                    onValueChange={(value) =>
                                        handleSelectChange(ride._id, value)
                                    }
                                    defaultValue={ride.status || ""}
                                    disabled={isLoading}
                                >
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Update status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="accepted">Accepted</SelectItem>
                                        <SelectItem value="picked_up">Picked Up</SelectItem>
                                        <SelectItem value="in_transit">In Transit</SelectItem>
                                        <SelectItem value="completed">Completed</SelectItem>
                                        <SelectItem value="cancelled">Cancelled</SelectItem>
                                    </SelectContent>
                                </Select>

                                <Button
                                    onClick={() => handleStatusUpdate(ride._id)}
                                    className="bg-blue-600 text-white hover:bg-blue-700"
                                    disabled={isLoading}
                                >
                                    Update
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center py-32 font-medium text-lg">🌟 You have no running rides right now. Stay ready for your next trip!</p>
            )}
        </div>
    );
};

export default AcceptRides;
