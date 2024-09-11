import { baseApi } from "./baseApi";
import { tagTypes } from "./tag-Ttypes";

const specialtiesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createSpecialties: build.mutation({
      query: (data) => ({
        url: "/specialties",
        method: "POST",
        contentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [tagTypes.specialties],
    }),
    getAllSpecialties: build.query({
      query: (data) => ({
        url: "/specialties",
        method: "GET",
      }),
      providesTags: [tagTypes.specialties],
    }),
    deleteSpecialties: build.mutation({
      query: (id) => ({
        url: `/specialties/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.specialties],
    }),
  }),
});

export const {
  useCreateSpecialtiesMutation,
  useGetAllSpecialtiesQuery,
  useDeleteSpecialtiesMutation,
} = specialtiesApi;
