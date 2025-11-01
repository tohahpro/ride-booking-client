import { baseApi } from "@/redux/baseApi";

export const driverApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    createDriver: builder.mutation({
      query: (payload) => ({
        url: "/drivers/create-driver",
        method: "POST",
        data: payload,
      }),
      invalidatesTags: ["DRIVER"],
    }),

    driverAction: builder.mutation({
      query: ({ rideId, action }) => ({
        url: `/drivers/accept-ride/${rideId}`,
        method: "POST",
        data: { action }
      }),
      invalidatesTags: ["RIDE"],
    }),

    updateRideStatus: builder.mutation({
      query: ({ rideId, status }) => ({
        url: `/drivers/status-update/${rideId}`,
        method: "PATCH",
        data: { status },
      }),
      invalidatesTags: ["RIDE"],
    }),

    getAcceptedRides: builder.query({
      query: () => ({
        url: "/drivers/accepted-rides",
        method: "GET",
      }),
      providesTags: ["RIDE"],
    }),

    changeOnlineStatus: builder.mutation({
      query: (data) => ({
        url: "/drivers/online-status",
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["DRIVER"],
    }),

    getDriverHistory: builder.query({
      query: () => ({
        url: "/drivers/history",
        method: "GET",
      }),
      providesTags: ["DRIVER_HISTORY"],
    }),
  }),
});

export const {
  useCreateDriverMutation,
  useDriverActionMutation,
  useUpdateRideStatusMutation,
  useChangeOnlineStatusMutation,
  useGetDriverHistoryQuery,
  useGetAcceptedRidesQuery,
} = driverApi;
