import { getUserInfo, removeUser } from "@/services/auth.service";
import { Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const AuthButton = () => {
  const router = useRouter();
  const userInfo = getUserInfo();

  const handleLogoutButton = () => {
    removeUser();
    router.refresh();
  };
  return (
    <>
      {userInfo?.userId ? (
        <Button
          sx={{
            background:
              "linear-gradient(to bottom, rgba(139, 0, 0, 0.9), rgba(139, 0, 0, 0.3))",
          }}
          onClick={handleLogoutButton}
          color="error"
        >
          Logout
        </Button>
      ) : (
        <Button
          component={Link}
          href="/login"
          sx={{
            background:
              "linear-gradient(to right, rgba(0, 0, 139, 0.8), rgba(0, 0, 139, 0))",
          }}
        >
          Login
        </Button>
      )}
    </>
  );
};

export default AuthButton;
