"use client";

import { Box, Container, Stack, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import Link from "next/link";

const Navbar = () => {
  const AuthButton = dynamic(
    () => import("@/components/UI/HomePage/AuthButton.tsx/AuthButton"),
    { ssr: false }
  );
  return (
    <Box
      sx={{
        bgcolor: "primary.main",
      }}
    >
      <Container>
        <Stack
          py={2}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            sx={{
              background:
                "linear-gradient(to right, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.5))", // Deep red to red gradient
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
            variant="h4"
            component={Link}
            href="/"
            fontWeight={600}
          >
            J
            <Box
              sx={{
                background:
                  "linear-gradient(to right, rgba(0, 0, 255, 0.8), rgba(0, 0, 139, 0.8))", // Matching gradient for the "S"
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
              component="span"
              color="#ffffff"
            >
              S
            </Box>{" "}
            Hospital
          </Typography>

          <Stack direction="row" justifyContent="space-between" gap={4}>
            <Typography component={Link} href="/consultation" color="#ffffff">
              Consultation
            </Typography>

            <Typography color="#ffffff">Diagnostics</Typography>
            <Typography component={Link} href="/doctors" color="#ffffff">
              Doctors
            </Typography>
          </Stack>

          <AuthButton />
        </Stack>
      </Container>
    </Box>
  );
};

export default Navbar;
