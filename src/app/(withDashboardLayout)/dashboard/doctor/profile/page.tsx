"use client";
import {
  useGetMyProfileQuery,
  useUpdateMYProfileMutation,
} from "@/redux/api/myProfileApi";
import { Box, Button, Container, styled, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Image from "next/image";
import React, { useState } from "react";
import DoctorInformation from "./components/DoctorInformation";
import AutoFileUploader from "@/components/Form/AutoFileUploader";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { keyframes } from "@emotion/react";
import ProfileUpdateModal from "./components/ProfileUpdateModal";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;
const RotatingIcon = styled(AutorenewIcon)`
  font-size: 50px;
  animation: ${spin} 2s linear infinite;
`;

const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading } = useGetMyProfileQuery({});
  const [updateMyProfile, { isLoading: upLoading }] =
    useUpdateMYProfileMutation();

  const fileUploadHandler = (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("data", JSON.stringify({}));
    updateMyProfile(formData);
  };
  if (isLoading) {
    return <p>Loading........</p>;
  }

  return (
    <>
      <ProfileUpdateModal
        open={isModalOpen}
        setOpen={setIsModalOpen}
        id={data?.id}
      />
      <Container>
        <Grid container spacing={2}>
          <Grid md={4} xs={12}>
            <Box
              sx={{
                height: 300,
                width: "100%",
                overflow: "hidden",
                borderRadius: 1,
              }}
            >
              <Image
                src={data?.profilePhoto}
                width={400}
                height={300}
                alt="profile photo"
              />
            </Box>
            {upLoading ? (
              <p style={{ fontWeight: "bold", fontSize: "25px" }}>
                <RotatingIcon />
                Uploading...
              </p>
            ) : (
              <AutoFileUploader
                name="file"
                label="Update your Photo"
                icon={<CloudUploadIcon />}
                onFileUpload={fileUploadHandler}
                variant="text"
                sx={{
                  color: "red",
                }}
              />
            )}
            <Button
              onClick={() => setIsModalOpen(true)}
              fullWidth
              endIcon={<ModeEditIcon />}
            >
              Edit Profile
            </Button>
          </Grid>
          <Grid md={8} xs={12}>
            <DoctorInformation data={data} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Profile;
