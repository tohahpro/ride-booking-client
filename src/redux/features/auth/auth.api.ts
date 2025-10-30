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
            providesTags: ["USER"],
        }),
        updateProfile: builder.mutation({
            query: ({ id, userInfo }) => ({
                url: `/user/${id}`,
                method: "PATCH",
                data: userInfo
            })
        }),
        changePassword: builder.mutation({
            query: (data) => ({
                url: "/auth/change-password",
                method: "POST",
                data: data,
            })
        }),
        registerUser: builder.mutation({
            query: (data) => ({
                url: "/users/register",
                method: "POST",
                body: data,
            }),
        }),


        getMe: builder.query({
            query: () => ({
                url: "/user/me",
                method: "GET",
            }),
            providesTags: ["USER"],
        }),

        updateUser: builder.mutation({
            query: ({ id, data }) => ({
                url: `/user/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["USER"],
        }),
    }),
});

export const {
    useRegisterMutation,
    useLoginMutation,
    useLogoutMutation,
    useUpdateProfileMutation,
    useChangePasswordMutation,
    useUserInfoQuery,
    useRegisterUserMutation,
    useGetMeQuery,
    useUpdateUserMutation,

} = authApi