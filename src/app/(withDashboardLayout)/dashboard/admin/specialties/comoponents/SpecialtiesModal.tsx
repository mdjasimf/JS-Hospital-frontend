import JSFileUploader from "@/components/Form/JSFileUploader";
import JsForm from "@/components/Form/JsForm";
import JsInput from "@/components/Form/JsInput";
import JSMoodal from "@/components/Shared/JSMoodal/JSMoodal";
import { Box, Button, Grid } from "@mui/material";

import React from "react";
import { FieldValues } from "react-hook-form";
type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const SpecialtiesModal = ({ open, setOpen }: TProps) => {
  const handleFormSubmit = (values: FieldValues) => {};

  return (
    <div>
      <JSMoodal open={open} setOpen={setOpen} title="Create a new Specialty">
        <JsForm onSubmit={handleFormSubmit}>
          <Grid container spacing={2}>
            <Grid item md={6}>
              <JsInput name="title" label="title" />
            </Grid>
            <Grid item md={6}>
              <JSFileUploader />
            </Grid>
          </Grid>
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", mr: 3, mt: 1 }}
          >
            <Button type="submit">Create</Button>
          </Box>
        </JsForm>
      </JSMoodal>
    </div>
  );
};

export default SpecialtiesModal;
