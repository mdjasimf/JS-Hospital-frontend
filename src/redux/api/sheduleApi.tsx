import { baseApi } from "./baseApi";
import { tagTypes } from "./tag-Ttypes";
import { IMeta } from "@/types";

const sheduleApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createShedule: build.mutation({
      query: (data) => ({
        url: "/schedule",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.shedule],
    }),
    getAllSchedules: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/schedule",
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: [], meta: IMeta) => {
        return {
          schedules: response,
          meta,
        };
      },
      providesTags: [tagTypes.shedule],
    }),

    deleteSchedule: build.mutation({
      query: (id) => ({
        url: `/schedule/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.shedule],
    }),
  }),
});

export const {
  useCreateSheduleMutation,
  useGetAllSchedulesQuery,
  useDeleteScheduleMutation,
} = sheduleApi;
