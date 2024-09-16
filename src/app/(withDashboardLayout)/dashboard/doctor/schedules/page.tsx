"use client";

import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import DoctorSchedulesModal from "./components/DoctorSchedulesModal";

const DoctorschedulesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  return (
    <Box>
      <Button onClick={() => setIsModalOpen(true)}>
        Create doctor shedules
      </Button>
      <DoctorSchedulesModal open={isModalOpen} setOpen={setIsModalOpen} />
    </Box>
  );
};

export default DoctorschedulesPage;
