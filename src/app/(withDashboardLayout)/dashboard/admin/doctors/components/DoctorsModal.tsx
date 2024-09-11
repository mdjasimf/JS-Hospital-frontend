import { Button, Grid } from "@mui/material";
import { Gender } from "@/types/common";
import { FieldValues } from "react-hook-form";
import JSFullScreenModal from "@/components/Shared/JSMoodal/JSFullScreenModal";
import JsInput from "@/components/Form/JsInput";
import JSSelectField from "@/components/Form/JSSelectField";
import JsForm from "@/components/Form/JsForm";
import { modifiedFormData } from "@/utils/modifiesFormData";
import { useCreateDoctorMutation } from "@/redux/api/doctorsApi";
import { toast } from "sonner";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const DoctorModal = ({ open, setOpen }: TProps) => {
  const [createDoctor] = useCreateDoctorMutation();

  const handleFormSubmit = async (values: FieldValues) => {
    console.log(values);

    values.doctor.experience = Number(values.doctor.experience);
    values.doctor.apointmentFee = Number(values.doctor.apointmentFee);
    const data = modifiedFormData(values);
    try {
      const res = await createDoctor(data).unwrap();
      console.log(res);
      if (res?.id) {
        toast.success("Doctor created successfully!!!");
        setOpen(false);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  const defaultValues = {
    doctor: {
      email: "",
      name: "",
      contactNumber: "",
      address: "",
      registrationNumber: "",
      gender: "",
      experience: 0,
      apointmentFee: 0,
      qualification: "",
      currentWorkingPlace: "",
      designation: "",
      profilePhoto: "",
    },
    password: "",
  };

  return (
    <JSFullScreenModal open={open} setOpen={setOpen} title="Create New Doctor">
      <JsForm onSubmit={handleFormSubmit} defaultValues={defaultValues}>
        <Grid container spacing={2} sx={{ my: 5 }}>
          <Grid item xs={12} sm={12} md={4}>
            <JsInput
              name="doctor.name"
              label="Name"
              fullWidth={true}
              sx={{ mb: 2 }}
              required
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <JsInput
              name="doctor.email"
              type="email"
              label="Email"
              fullWidth={true}
              sx={{ mb: 2 }}
              required
            />
          </Grid>

          <Grid item xs={12} sm={12} md={4}>
            <JsInput
              name="password"
              type="password"
              label="Password"
              fullWidth={true}
              sx={{ mb: 2 }}
              required
            />
          </Grid>

          <Grid item xs={12} sm={12} md={4}>
            <JsInput
              name="doctor.contactNumber"
              label="Contract Number"
              fullWidth={true}
              sx={{ mb: 2 }}
              required
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <JsInput
              name="doctor.address"
              label="Address"
              fullWidth={true}
              sx={{ mb: 2 }}
              required
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <JsInput
              name="doctor.registrationNumber"
              label="Registration Number"
              fullWidth={true}
              sx={{ mb: 2 }}
              required
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <JsInput
              name="doctor.experience"
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
              name="doctor.gender"
              label="Gender"
              sx={{ mb: 2 }}
              required
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <JsInput
              name="doctor.apointmentFee"
              type="number"
              label="ApointmentFee"
              fullWidth={true}
              sx={{ mb: 2 }}
              required
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <JsInput
              name="doctor.qualification"
              label="Qualification"
              fullWidth={true}
              sx={{ mb: 2 }}
              required
            />
          </Grid>

          <Grid item xs={12} sm={12} md={4}>
            <JsInput
              name="doctor.currentWorkingPlace"
              label="Current Working Place"
              fullWidth={true}
              sx={{ mb: 2 }}
              required
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <JsInput
              name="doctor.designation"
              label="Designation"
              fullWidth={true}
              sx={{ mb: 2 }}
              required
            />
          </Grid>
        </Grid>

        <Button type="submit">Create</Button>
      </JsForm>
    </JSFullScreenModal>
  );
};

export default DoctorModal;
