"use client";
import { Box, Button, Stack, TextField } from "@mui/material";
import SpecialtiesModal from "./comoponents/SpecialtiesModal";
import { useState } from "react";

const SpecialtiesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Button onClick={() => setIsModalOpen(true)}>
          {" "}
          Create Specialties
        </Button>
        <SpecialtiesModal open={isModalOpen} setOpen={setIsModalOpen} />
        <TextField placeholder="Serach Specialties" size="small" />
      </Stack>
    </Box>
  );
};

export default SpecialtiesPage;
