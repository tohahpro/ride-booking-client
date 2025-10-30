/* eslint-disable @typescript-eslint/no-explicit-any */

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { toast } from "sonner";
import { useCreateRideRequestMutation } from "@/redux/features/rider/rider.api";
import { useNavigate } from "react-router";


const rideSchema = z.object({
  pickupAddress: z.string().min(1, "Pickup address is required"),
  destinationAddress: z.string().min(1, "Destination address is required"),
});

type RideFormData = z.infer<typeof rideSchema>;

const RideRequestForm = () => {
  const [createRideRequest] = useCreateRideRequestMutation();


  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RideFormData>({
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


   const navigate = useNavigate();


  const onSubmit = async (data: RideFormData) => {
    try {
      const pickup = await geocodeAddress(data.pickupAddress);
      const destination = await geocodeAddress(data.destinationAddress);

      const payload = {
        pickupLocation: {
          location: {
            type: "Point",
            coordinates: [pickup.longitude, pickup.latitude],
          },
          address: data.pickupAddress, // ✅ Add this
        },
        destinationLocation: {
          location: {
            type: "Point",
            coordinates: [destination.longitude, destination.latitude],
          },
          address: data.destinationAddress, // ✅ Add this
        },
      };

      const res = await createRideRequest(payload).unwrap();
      if (res.success) {
        toast.success("Ride requested successfully!");
        navigate("/rider/history");
      }
    } catch (error: any) {
      toast.error(error.data.message || "Failed to request ride");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-4 space-y-4">
      <div>
        <label className="block mb-1 font-semibold">Pickup Address</label>
        <input
          {...register("pickupAddress")}
          type="text"
          className="w-full border rounded p-2"
          placeholder="Enter pickup address"
        />
        {errors.pickupAddress && <p className="text-red-500 text-sm">{errors.pickupAddress.message}</p>}
      </div>

      <div>
        <label className="block mb-1 font-semibold">Destination Address</label>
        <input
          {...register("destinationAddress")}
          type="text"
          className="w-full border rounded p-2"
          placeholder="Enter destination address"
        />
        {errors.destinationAddress && <p className="text-red-500 text-sm">{errors.destinationAddress.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
      >
        {isSubmitting ? "Requesting..." : "Request Ride"}
      </button>
    </form>
  );
};

export default RideRequestForm;
