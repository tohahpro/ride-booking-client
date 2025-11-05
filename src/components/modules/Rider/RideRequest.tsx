/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { toast } from "sonner";
import { useCreateRideRequestMutation } from "@/redux/features/rider/rider.api";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";

const rideSchema = z.object({
  pickupAddress: z.string().min(1, "Pickup address is required"),
  destinationAddress: z.string().min(1, "Destination address is required"),
});

type RideFormData = z.infer<typeof rideSchema>;

const RideRequestForm = () => {
  const [createRideRequest] = useCreateRideRequestMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RideFormData>({
    resolver: zodResolver(rideSchema),
  });

  const geocodeAddress = async (address: string) => {
    const res = await axios.get("https://nominatim.openstreetmap.org/search", {
      params: { q: address, format: "json", limit: 1 },
    });
    if (!res.data || res.data.length === 0) {
      throw new Error(`Could not find coordinates for: ${address}`);
    }
    const { lat, lon } = res.data[0];
    return { latitude: parseFloat(lat), longitude: parseFloat(lon) };
  };

  const onSubmit = async (data: RideFormData) => {
    try {
      const pickup = await geocodeAddress(data.pickupAddress);
      const destination = await geocodeAddress(data.destinationAddress);

      const payload = {
        pickupLocation: {
          location: { type: "Point", coordinates: [pickup.longitude, pickup.latitude] },
          address: data.pickupAddress,
        },
        destinationLocation: {
          location: { type: "Point", coordinates: [destination.longitude, destination.latitude] },
          address: data.destinationAddress,
        },
      };

      const res = await createRideRequest(payload).unwrap();
      if (res.success) {
        toast.success("Ride requested successfully!");
        navigate("/rider/history");
      }
    } catch (error: any) {
      toast.error(error.data?.message || "Failed to request ride");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-16">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl space-y-6 border border-gray-200"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center">Request a Ride</h2>

        <div className="space-y-1">
          <label className="block text-gray-700 font-medium">Pickup Address</label>
          <input
            {...register("pickupAddress")}
            type="text"
            placeholder="Enter pickup address"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
          />
          {errors.pickupAddress && (
            <p className="text-red-500 text-sm">{errors.pickupAddress.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <label className="block text-gray-700 font-medium">Destination Address</label>
          <input
            {...register("destinationAddress")}
            type="text"
            placeholder="Enter destination address"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
          />
          {errors.destinationAddress && (
            <p className="text-red-500 text-sm">{errors.destinationAddress.message}</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Requesting..." : "Request Ride"}
        </Button>
      </form>
    </div>
  );
};

export default RideRequestForm;
