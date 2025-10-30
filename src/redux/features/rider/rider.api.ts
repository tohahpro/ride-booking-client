import { baseApi } from "@/redux/baseApi";

export const riderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    createRideRequest: builder.mutation({
      query: (payload) => ({
        url: "/rides/request-ride",
        method: "POST",
        data: payload,
      }),
      invalidatesTags: ["RIDE"],
    }),


    getAvailableRides: builder.query({
      query: () => ({
        url: "/rides/available-ride",
        method: "GET",
      }),
      providesTags: ["RIDE"],
    }),


    getRiderHistory: builder.query({
      query: () => ({
        url: "/rides/history",
        method: "GET",
      }),
      providesTags: ["RIDE_HISTORY"],
    }),


    cancelRideRequest: builder.mutation({
      query: ({ id, data }) => ({
        url: `/rides/cancel-ride/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["RIDE", "RIDE_HISTORY"],
    }),


    setDriverFeedback: builder.mutation({
      query: ({ id, data }) => ({
        url: `/rides/feedback/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["RIDE_HISTORY"],
    }),
  }),
});

export const {
  useCreateRideRequestMutation,
  useGetAvailableRidesQuery,
  useGetRiderHistoryQuery,
  useCancelRideRequestMutation,
  useSetDriverFeedbackMutation,
} = riderApi;
