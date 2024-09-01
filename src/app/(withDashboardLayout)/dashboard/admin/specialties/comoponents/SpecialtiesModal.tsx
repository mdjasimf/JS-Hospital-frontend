import JSMoodal from "@/components/Shared/JSMoodal/JSMoodal";
import { TextField } from "@mui/material";
import React from "react";
type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const SpecialtiesModal = ({ open, setOpen }: TProps) => {
  return (
    <div>
      <JSMoodal open={open} setOpen={setOpen} title="Create Specialties">
        <TextField />
      </JSMoodal>
    </div>
  );
};

export default SpecialtiesModal;
