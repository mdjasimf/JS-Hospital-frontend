import { Box, Stack, styled, Typography } from "@mui/material";

const StyleInformationBox = styled(Box)(({ theme }) => ({
  background: "#FFA07A",
  borderRadius: theme.spacing(1),
  width: "45%",
  padding: "8px 16px",
  "& p": {
    fontWeight: 600,
  },
}));

const DoctorInformation = ({ data }: any) => {
  return (
    <>
      <Typography
        sx={{
          textDecoration: "underline",
          margin: "10px 0",
        }}
        variant="h4"
        color="primary.main"
      >
        Basic Information
      </Typography>
      <Stack direction={{ xs: "column", md: "row" }} gap={2} flexWrap={"wrap"}>
        <StyleInformationBox>
          <Typography>Name</Typography>
          <Typography>{data?.name}</Typography>
        </StyleInformationBox>
        <StyleInformationBox>
          <Typography>Role</Typography>
          <Typography>{data?.role}</Typography>
        </StyleInformationBox>
        <StyleInformationBox>
          <Typography>Email</Typography>
          <Typography>{data?.email}</Typography>
        </StyleInformationBox>
        <StyleInformationBox>
          <Typography>Gender</Typography>
          <Typography>{data?.gender}</Typography>
        </StyleInformationBox>
        <StyleInformationBox>
          <Typography>ApointmentFee</Typography>
          <Typography>{data?.apointmentFee}</Typography>
        </StyleInformationBox>
        <StyleInformationBox>
          <Typography>ContactNumber</Typography>
          <Typography>{data?.contactNumber}</Typography>
        </StyleInformationBox>
        <StyleInformationBox>
          <Typography>CurrentWorkingPlace</Typography>
          <Typography>{data?.currentWorkingPlace}</Typography>
        </StyleInformationBox>
        <StyleInformationBox>
          <Typography>Designation</Typography>
          <Typography>{data?.designation}</Typography>
        </StyleInformationBox>
        <StyleInformationBox>
          <Typography>Experience</Typography>
          <Typography>{data?.experience}</Typography>
        </StyleInformationBox>
        <StyleInformationBox>
          <Typography>RegistrationNumber</Typography>
          <Typography>{data?.experience}</Typography>
        </StyleInformationBox>
        <StyleInformationBox>
          <Typography>Status</Typography>
          <Typography>{data?.status}</Typography>
        </StyleInformationBox>
        <StyleInformationBox>
          <Typography>Joined</Typography>
          <Typography>
            {data
              ? new Date(data.createdAt).toLocaleDateString("en-US", {
                  month: "2-digit",
                  day: "2-digit",
                  year: "2-digit",
                })
              : null}
          </Typography>
        </StyleInformationBox>
      </Stack>
    </>
  );
};

export default DoctorInformation;
