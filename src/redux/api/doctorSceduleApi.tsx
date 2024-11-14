import { baseApi } from "./baseApi";
import { tagTypes } from "./tag-Ttypes";
import { IMeta } from "@/types";

const doctorScheduleApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createDoctorShedule: build.mutation({
      query: (data) => ({
        url: "/doctor-schedule",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.doctorSchedule],
    }),
    getAllDoctorSchedules: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/doctor-schedule",
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: [], meta: IMeta) => {
        console.log(meta);
        return {
          doctorSchedules: response,
          meta,
        };
      },
      providesTags: [tagTypes.doctorSchedule],
    }),
    getDoctorSchedules: build.query({
      query: (id: string | string[]) => {
        return {
          url: `/doctor-schedule/${id}`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.doctorSchedule],
    }),
    getMySchedule: build.query({
      query: () => ({
        url: "/doctor-schedule/my-schedule",
        method: "GET",
      }),
      providesTags: [tagTypes.doctorSchedule],
    }),

    deleteSchedule: build.mutation({
      query: (id: string) => ({
        url: `/doctor-schedule/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.doctorSchedule],
    }),
  }),
  overrideExisting: true,
});

export const {
  useCreateDoctorSheduleMutation,
  useGetAllDoctorSchedulesQuery,
  useGetDoctorSchedulesQuery,
  useGetMyScheduleQuery,
  useDeleteScheduleMutation,
} = doctorScheduleApi;
