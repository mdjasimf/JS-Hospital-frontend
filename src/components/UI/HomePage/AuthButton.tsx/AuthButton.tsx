import { authKey } from "@/constants.ts/authKey";
import useUserInfo from "@/hooks/useUserInfo";
import { deleteCookies } from "@/services/actions/deleteCookies";
import { logoutUser } from "@/services/actions/logoutUser";
import { getUserInfo, removeUser } from "@/services/auth.service";
import { Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const AuthButton = () => {
  const router = useRouter();
  const userInfo = useUserInfo();
  const handleLogoutButton = () => {
    logoutUser(router);
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
