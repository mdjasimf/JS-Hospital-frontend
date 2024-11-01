import { IDoctor } from "@/types/doctor";
import { baseApi } from "./baseApi";
import { tagTypes } from "./tag-Ttypes";
import { IMeta } from "@/types";

const doctorsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createDoctor: build.mutation({
      query: (data) => ({
        url: "/user/create-doctor",
        method: "POST",
        contentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [tagTypes.doctor],
    }),
    getAllDotors: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/doctor",
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: IDoctor[], meta: IMeta) => {
        return {
          doctors: response,
          meta,
        };
      },
      providesTags: [tagTypes.doctor],
    }),
    getSingleDotors: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/doctor/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.doctor],
    }),
    updateDoctor: build.mutation({
      query: (data) => {
        console.log(data, "jasim");
        return {
          url: `/doctor/${data.id}`,
          method: "PATCH",
          data: data.body,
        };
      },
      invalidatesTags: [tagTypes.doctor, tagTypes.user],
    }),
    deleteDoctors: build.mutation({
      query: (id: any) => ({
        url: `/doctor/soft/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.doctor],
    }),
  }),
});

export const {
  useCreateDoctorMutation,
  useGetAllDotorsQuery,
  useGetSingleDotorsQuery,
  useUpdateDoctorMutation,
  useDeleteDoctorsMutation,
} = doctorsApi;
