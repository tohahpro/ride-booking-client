import { baseApi } from "@/redux/baseApi";

export const adminApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => ({
                url: "/admin/getAllUser",
                method: "GET",
            }),
        }),
        getRides: builder.query({
            query: () => ({
                url: "/admin/getAllRide",
                method: "GET",
            }),
        }),
        changeIsApproveStatus: builder.mutation({
            query: (id: string) => ({
                url: `/admin/changeIsApproveStatus/${id}`,
                method: "PATCH",
            }),
        }),
        updateActiveStatus: builder.mutation({
            query: ({ id, isActive }: { id: string; isActive: string }) => ({
                url: `/admin/updateActiveStatus/${id}`,
                method: "PATCH",
                data: { isActive },
            }),
            invalidatesTags: ['USER'],
        }),
        changeBlockStatus: builder.mutation({
            query: (id: string) => ({
                url: `/admin/changeBlockStatus/${id}`,
                method: "PATCH",
            }),
            invalidatesTags: ['USER'],
        }),
    }),
});

export const {
    useGetUsersQuery,
    useGetRidesQuery,
    useChangeIsApproveStatusMutation,
    useUpdateActiveStatusMutation,
    useChangeBlockStatusMutation,
} = adminApi;
