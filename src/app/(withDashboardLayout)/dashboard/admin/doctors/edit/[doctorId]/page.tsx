"use client";
import JsForm from "@/components/Form/JsForm";
import JsInput from "@/components/Form/JsInput";
import JSSelectField from "@/components/Form/JSSelectField";
import {
  useGetSingleDotorsQuery,
  useUpdateDoctorMutation,
} from "@/redux/api/doctorsApi";
import { Gender } from "@/types";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type TParams = {
  params: {
    doctorId: string;
  };
};
const DoctorUpdatePage = ({ params }: TParams) => {
  const router = useRouter();
  const id = params?.doctorId;
  const { data, isLoading } = useGetSingleDotorsQuery(id);
  const [updateDoctor] = useUpdateDoctorMutation();
  const handleFormSubmit = async (values: FieldValues) => {
    values.experience = Number(values.experience);
    values.apointmentFee = Number(values.apointmentFee);
    values.id = id;
    try {
      const res = await updateDoctor({ id: values.id, body: values }).unwrap();
      console.log(res);
      if (res?.id) {
        toast.success("Doctor Updated Successfully!!!");
        router.push("/dashboard/admin/doctors");
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  const defaultValues = {
    email: data?.email || "",
    name: data?.name || "",
    contactNumber: data?.contactNumber || "",
    address: data?.address || "",
    registrationNumber: data?.registrationNumber || "",
    gender: data?.gender || "",
    experience: data?.experience || 0,
    apointmentFee: data?.apointmentFee || 0,
    qualification: data?.qualification || "",
    currentWorkingPlace: data?.currentWorkingPlace || "",
    designation: data?.designation || "",
  };
  return (
    <Box>
      <Typography component="h3" variant="h3">
        Update doctor info
      </Typography>
      {isLoading ? (
        "Loading...."
      ) : (
        <JsForm
          onSubmit={handleFormSubmit}
          defaultValues={data && defaultValues}
        >
          <Grid container spacing={2} sx={{ my: 5 }}>
            <Grid item xs={12} sm={12} md={4}>
              <JsInput
                name="name"
                label="Name"
                fullWidth={true}
                sx={{ mb: 2 }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <JsInput
                name="email"
                type="email"
                label="Email"
                fullWidth={true}
                sx={{ mb: 2 }}
                required
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4}>
              <JsInput
                name="contactNumber"
                label="Contract Number"
                fullWidth={true}
                sx={{ mb: 2 }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <JsInput
                name="address"
                label="Address"
                fullWidth={true}
                sx={{ mb: 2 }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <JsInput
                name="registrationNumber"
                label="Registration Number"
                fullWidth={true}
                sx={{ mb: 2 }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <JsInput
                name="experience"
                type="number"
                label="Experience"
                fullWidth={true}
                sx={{ mb: 2 }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <JSSelectField
                items={Gender}
                name="gender"
                label="Gender"
                sx={{ mb: 2 }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <JsInput
                name="apointmentFee"
                type="number"
                label="ApointmentFee"
                fullWidth={true}
                sx={{ mb: 2 }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <JsInput
                name="qualification"
                label="Qualification"
                fullWidth={true}
                sx={{ mb: 2 }}
                required
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4}>
              <JsInput
                name="currentWorkingPlace"
                label="Current Working Place"
                fullWidth={true}
                sx={{ mb: 2 }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <JsInput
                name="designation"
                label="Designation"
                fullWidth={true}
                sx={{ mb: 2 }}
                required
              />
            </Grid>
          </Grid>

          <Button type="submit">Update</Button>
        </JsForm>
      )}
    </Box>
  );
};

export default DoctorUpdatePage;
