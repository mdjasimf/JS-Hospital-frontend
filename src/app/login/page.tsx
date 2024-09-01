"use client";
import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import Image from "next/image";
import assets from "@/assets";
import Link from "next/link";
import { FieldValues } from "react-hook-form";
import { loginUser } from "@/services/actions/loginUser";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { storeUserInfo } from "@/services/auth.service";
import JsForm from "@/components/Form/JsForm";
import JsInput from "@/components/Form/JsInput";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

export const validationSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(5, "Must be at least 5 characters"),
});

const LoginPage = () => {
  const [error, setError] = useState();
  const router = useRouter();
  const handleLogin = async (data: FieldValues) => {
    try {
      const res = await loginUser(data);
      if (res?.data?.accessToken) {
        toast.success(res.message);
        storeUserInfo({ accessToken: res?.data?.accessToken });
        router.push("/dashboard");
      } else {
        setError(res.message);
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
                Patient Login
              </Typography>
            </Box>
          </Stack>
          <Box>
            {error && (
              <Typography
                fontWeight={600}
                sx={{
                  bgcolor: "rgba(255, 0, 0, 0.5)",
                  color: "white",
                  padding: "5px",
                  margin: "2px",
                  borderRadius: "5px",
                }}
              >
                {error}
              </Typography>
            )}
          </Box>
          <Box>
            <JsForm
              onSubmit={handleLogin}
              resolver={zodResolver(validationSchema)}
              defaultValues={{
                email: "",
                password: "",
              }}
            >
              <Grid container spacing={2} my={1}>
                <Grid item md={6}>
                  <JsInput
                    name="email"
                    label="Email"
                    type="email"
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
              </Grid>
              <Typography textAlign="end" component="p" fontWeight={600}>
                forget password?
              </Typography>
              <Button
                sx={{
                  margin: "10px 0px",
                  background:
                    "linear-gradient(to right, rgba(0, 0, 139, 0.8), rgba(0, 0, 139, 0))",
                }}
                fullWidth={true}
                type="submit"
              >
                Login
              </Button>
            </JsForm>
            <Typography component="p" fontWeight={600}>
              Don&apos;t you have any account?{" "}
              <Link style={{ color: "#1976d2" }} href="/register">
                Please register
              </Link>
            </Typography>
          </Box>
        </Box>
      </Stack>
    </Stack>
  );
};

export default LoginPage;
