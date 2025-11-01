/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetAvailableRidesQuery } from "@/redux/features/rider/rider.api";
import { useDriverActionMutation } from "@/redux/features/driver/driver.api";
import { useNavigate, useParams } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const statusColors: Record<string, string> = {
    requested: "bg-gray-300 text-gray-800",
    accepted: "bg-blue-200 text-blue-800",
    picked_up: "bg-yellow-200 text-yellow-800",
    in_transit: "bg-indigo-200 text-indigo-800",
    completed: "bg-green-200 text-green-800",
    cancelled: "bg-red-200 text-red-800",
};

const RideActionDetails = () => {
    const { id } = useParams();
    const { data, isLoading } = useGetAvailableRidesQuery(undefined);
    const [driverAction, { isLoading: isActionLoading }] = useDriverActionMutation();

    const [selectedAction, setSelectedAction] = useState<"accept" | "reject" | "">("");


    const navigate = useNavigate()

    if (isLoading)
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="w-6 h-6 animate-spin text-gray-600" />
                <span className="ml-2 text-gray-700">Loading ride details...</span>
            </div>
        );


    const ride = data?.data?.find((ride: any) => ride._id === id);
    if (!ride) {
        return <div className="text-center text-gray-500 font-medium mt-10">Ride not found</div>;
    }

    const handleActionSubmit = async () => {
        if (!selectedAction) {
            toast.warning("Please select an action first");
            return;
        }
        console.log({
            rideId: ride._id,
            action: selectedAction
        });
        try {
            await driverAction({
                rideId: ride._id,
                action: selectedAction
            }).unwrap();

            toast.success(`Ride ${selectedAction === "accept" ? "accepted" : "rejected"} successfully`);
            setSelectedAction("");
            if (selectedAction === "accept") {
                navigate('/driver/accepted')
            }else{
                navigate('/driver/get-request')
            }
        } catch (error: any) {
            toast.error(error?.data?.message || `Failed to ${selectedAction} ride`);
        }
    };

    return (
        <div className="w-full md:w-5/6 lg:w-1/2 mx-auto">
            <Card className="p-5 mt-5 shadow-sm border border-gray-200">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold flex justify-between items-center">
                        Ride #{ride._id.slice(-5)}
                        <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColors[ride.status] || "bg-gray-200 text-gray-800"
                                }`}
                        >
                            {ride.status.replace("_", " ")}
                        </span>
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-3 text-gray-700">
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


                    {ride.status === "requested" && (
                        <div className="flex flex-col sm:flex-row items-center gap-3 pt-3">
                            <Select onValueChange={(val: any) => setSelectedAction(val)} value={selectedAction}>
                                <SelectTrigger className="w-full sm:w-[200px]">
                                    <SelectValue placeholder="Select Action" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="accept">Accept Ride</SelectItem>
                                    <SelectItem value="reject">Reject Ride</SelectItem>
                                </SelectContent>
                            </Select>

                            <Button
                                onClick={handleActionSubmit}
                                disabled={!selectedAction || isActionLoading}
                                className="w-full sm:w-auto"
                            >
                                {isActionLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
                                    </>
                                ) : (
                                    "Submit"
                                )}
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default RideActionDetails;
