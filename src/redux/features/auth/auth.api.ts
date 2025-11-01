import { baseApi } from "@/redux/baseApi";



export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (userInfo) => ({
                url: "/auth/login",
                method: "POST",
                data: userInfo,
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: "/auth/logout",
                method: "POST"
            }),
            invalidatesTags: []
        }),
        register: builder.mutation({
            query: (userInfo) => ({
                url: "/user/register",
                method: "POST",
                data: userInfo
            })
        }),
        userInfo: builder.query({
            query: () => ({
                url: "/user/me",
                method: "GET",
            }),
            providesTags: [{ type: "USER" }],
        }),
        updateProfile: builder.mutation({
            query: ({ id, userInfo }) => ({
                url: `/user/${id}`,
                method: "PATCH",
                data: userInfo
            }),
            invalidatesTags: ["USER"],
        }),
        changePassword: builder.mutation({
            query: (data) => ({
                url: "/auth/change-password",
                method: "POST",
                data: data,
            })
        })        
    }),
});

export const {
    useRegisterMutation,
    useLoginMutation,
    useLogoutMutation,
    useUpdateProfileMutation,
    useChangePasswordMutation,
    useUserInfoQuery
} = authApi