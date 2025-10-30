/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCancelRideRequestMutation, useGetRiderHistoryQuery, useSetDriverFeedbackMutation } from "@/redux/features/rider/rider.api";
import { useState } from "react";
import { useParams } from "react-router";
import { toast } from "sonner";

const statusColors: Record<string, string> = {
    requested: "bg-gray-300 text-gray-800",
    accepted: "bg-blue-200 text-blue-800",
    picked_up: "bg-yellow-200 text-yellow-800",
    in_transit: "bg-indigo-200 text-indigo-800",
    completed: "bg-green-200 text-green-800",
    cancelled: "bg-red-200 text-red-800",
};

const RideHistoryDetails = () => {
    const { id } = useParams();
    const { data, isLoading, isError } = useGetRiderHistoryQuery(undefined);
    const [cancelRide] = useCancelRideRequestMutation();
    const [setDriverFeedback, { isLoading: feedbackLoading }] = useSetDriverFeedbackMutation();

    const [feedback, setFeedback] = useState("");

    if (isLoading) return <div className="p-4">Loading ride history...</div>;
    if (isError) return <div className="p-4 text-red-500">Failed to load ride history</div>;

    const ride = data?.data?.find((ride: any) => ride._id === id);

    if (!ride) return <div className="p-4 text-gray-500">Ride not found</div>;

 
    const handleCancel = async () => {
        try {
            await cancelRide({ id: ride._id, data: { status: "cancelled" } }).unwrap();
            toast.success("Ride cancelled successfully");
        } catch (err: any) {
            toast.error(err?.data?.message || "Failed to cancel ride");
        }
    };


    const handleFeedbackSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!feedback.trim()) return;
        try {
            await setDriverFeedback({ id: ride._id, data: { feedback } }).unwrap();
            toast.success("Feedback submitted successfully");
            setFeedback("");
        } catch (err: any) {
            toast.error(err?.data?.message || "Failed to submit feedback");
        }
    };


    return (
        <div className="w-full pb-8 md:w-5/6 lg:w-1/2 mx-auto">
            <div className="p-5 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Ride Details</h2>

                {/* Pickup & Destination */}
                <div className="mb-4">
                    <p className="text-gray-700">
                        <span className="font-semibold">Pickup:</span> {ride.pickupLocation.address}
                    </p>
                    <p className="text-gray-700">
                        <span className="font-semibold">Destination:</span> {ride.destinationLocation.address}
                    </p>
                </div>

                {/* Fare & Status */}
                <div className="flex items-center justify-between mb-4">
                    <p className="text-gray-700 font-medium">Fare: <span className="text-green-600">{ride.fare} tk</span></p>
                    <p className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColors[ride.status] || "bg-gray-200"}`}>
                        {ride.status.replace("_", " ")}
                    </p>
                </div>

                {/* Feedback */}
                {ride.feedback && (
                    <div className="mb-4">
                        <h3 className="font-semibold text-gray-800 mb-1">Feedback:</h3>
                        <p className="text-gray-700 italic">{ride.feedback}</p>
                    </div>
                )}

                {/* Timeline */}
                <div className="">
                    <h3 className="font-semibold text-gray-800 mb-2">Ride Timeline</h3>
                    <ul className="border-l-2 border-gray-300">
                        {ride.history.map((step: any, idx: number) => (
                            <li key={idx} className="mb-4 ml-4 relative">
                                <span className={`absolute -left-3 w-6 h-6 rounded-full flex items-center justify-center text-white ${statusColors[step.status] || "bg-gray-400"}`}>
                                    {idx + 1}
                                </span>
                                <p className="text-gray-700 pl-6 font-medium">{step.status.replace("_", " ")}</p>
                                <p className="text-gray-500 pl-6 text-sm">{new Date(step.at).toLocaleString()}</p>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <Button
                        className="cursor-pointer"
                        onClick={handleCancel}
                        disabled={isLoading || ride.status == "cancelled" || ride.status == "completed"}
                    >Cancel Ride</Button>
                </div>
            </div>
            {/* Feedback Form */}
            <div className="mt-4 shadow-xl rounded-lg p-5">
                <h3 className="font-semibold text-gray-800 mb-2">Leave Feedback</h3>
                <form onSubmit={handleFeedbackSubmit} className="flex flex-col gap-3">
                    <div className="flex flex-col">
                        <Label className="py-2" htmlFor="feedback">Your Feedback</Label>
                        <Textarea
                            id="feedback"
                            value={feedback}
                            onChange={(e:any) => setFeedback(e.target.value)}
                            placeholder="Write your feedback here..."
                            className="resize-none"
                            rows={4}
                        />
                    </div>
                    <Button type="submit" disabled={feedbackLoading || !feedback.trim()}>
                        {feedbackLoading ? "Submitting..." : "Submit Feedback"}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default RideHistoryDetails;
