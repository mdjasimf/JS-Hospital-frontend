import { baseApi } from "./baseApi";
import { tagTypes } from "./tag-Ttypes";

const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSingleUser: build.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),
  }),
});
export const { useGetSingleUserQuery } = userApi;
