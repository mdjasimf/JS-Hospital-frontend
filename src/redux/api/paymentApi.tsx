import { IDoctor } from "@/types/doctor";
import { baseApi } from "./baseApi";
import { tagTypes } from "./tag-Ttypes";
import { IMeta } from "@/types";

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    initialPayment: build.mutation({
      query: (id: string) => ({
        url: `/payment/init/${id}`,
        method: "POST",
      }),
      invalidatesTags: [tagTypes.payment],
    }),
  }),
});

export const { useInitialPaymentMutation } = paymentApi;
export default paymentApi;
