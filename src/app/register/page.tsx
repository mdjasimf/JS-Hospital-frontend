"use client";
import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import Image from "next/image";
import assets from "@/assets";
import Link from "next/link";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { modifiedFormData } from "@/utils/modifiesFormData";
import { registerPatient } from "@/services/actions/registerPatient";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { loginUser } from "@/services/actions/loginUser";
import { storeUserInfo } from "@/services/auth.service";
import JsForm from "@/components/Form/JsForm";
import JsInput from "@/components/Form/JsInput";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const patientValidation = z.object({
  name: z.string().min(3, "your name at least three words"),
  email: z.string().email("Please enter a validd email address"),
  contactNumber: z.string().min(3, "your name at least three words"),
  address: z.string().min(3, "your address at least three words"),
});
export const validationSchema = z.object({
  password: z.string().min(5, "your password at least five characters"),
  patient: patientValidation,
});

const RegisterPage = () => {
  const router = useRouter();
  const handleRegister = async (data: FieldValues) => {
    const ModifyPatientData = modifiedFormData(data);
    try {
      const res = await registerPatient(ModifyPatientData);
      if (res?.data?.id) {
        toast.success(res.message);
        console.log(res);
        const result = await loginUser({
          email: data?.patient?.email,
          password: data?.password,
        });
        if (result?.data?.accessToken) {
          storeUserInfo({ accessToken: result?.data?.accessToken });
        }
        if (result?.data) {
          router.push("/dashboard");
        } else {
          toast.error("user is not exist");
        }
      } else {
        toast.error("user is exist");
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <Stack sx={{ height: "100vh" }} alignItems="center" justifyContent="center">
      <Stack
        sx={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: 600,
            width: "100%",
            boxShadow: 1,
            borderRadius: 1,
            p: 4,
            textAlign: "center",
          }}
        >
          <Stack
            sx={{
              justifyContent: "center",
              alignItems: "center",
              p: 2,
              gap: 2,
            }}
          >
            <Box>
              <Image src={assets.svgs.logo} width={50} height={50} alt="logo" />
            </Box>
            <Box>
              <Typography variant="h6" fontWeight={600}>
                Patient Register
              </Typography>
            </Box>
          </Stack>

          <Box>
            <JsForm
              onSubmit={handleRegister}
              resolver={zodResolver(validationSchema)}
              defaultValues={{
                password: "",
                patient: {
                  name: "",
                  email: "",
                  contactNumber: "",
                  address: "",
                },
              }}
            >
              <Grid container spacing={2} my={1}>
                <Grid item md={12}>
                  <JsInput name="patient.name" label="Name" fullWidth={true} />
                </Grid>
                <Grid item md={6}>
                  <JsInput
                    name="patient.email"
                    type="email"
                    label="Email"
                    fullWidth={true}
                  />
                </Grid>
                <Grid item md={6}>
                  <JsInput
                    name="password"
                    type="password"
                    label="Password"
                    fullWidth={true}
                  />
                </Grid>
                <Grid item md={6}>
                  <JsInput
                    name="patient.contactNumber"
                    type="tel"
                    label="Contact Number"
                    fullWidth={true}
                  />
                </Grid>
                <Grid item md={6}>
                  <JsInput
                    name="patient.address"
                    type="text"
                    label="Address"
                    fullWidth={true}
                  />
                </Grid>
              </Grid>
              <Button
                sx={{
                  margin: "10px 0px",
                }}
                fullWidth={true}
                type="submit"
              >
                Register
              </Button>
            </JsForm>
            <Typography component="p" fontWeight={600}>
              Do you have any account?{" "}
              <Link style={{ color: "#1976d2" }} href="/login">
                Login
              </Link>
            </Typography>
          </Box>
        </Box>
      </Stack>
    </Stack>
  );
};

export default RegisterPage;
