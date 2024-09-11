import JSFileUploader from "@/components/Form/JSFileUploader";
import JsForm from "@/components/Form/JsForm";
import JsInput from "@/components/Form/JsInput";
import JSMoodal from "@/components/Shared/JSMoodal/JSMoodal";
import { useCreateSpecialtiesMutation } from "@/redux/api/specialtiesApi";
import { modifiedFormData } from "@/utils/modifiesFormData";
import { Box, Button, Grid } from "@mui/material";
import React from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SpecialtiesModal = ({ open, setOpen }: TProps) => {
  const [createSpecialties] = useCreateSpecialtiesMutation();
  const handleFormSubmit = async (values: FieldValues) => {
    if (!values.file) {
      return toast.error("something went wrong");
    }
    if (!values.title) {
      return toast.error("something went wrong");
    }
    const data = modifiedFormData(values);

    try {
      const res = await createSpecialties(data).unwrap();
      console.log(res);
      if (res?.id) {
        toast.success("Specialties created successfully");
        setOpen(false);
      }
      console.log(res);
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <div>
      <JSMoodal open={open} setOpen={setOpen} title="Create a new Specialty">
        <JsForm onSubmit={handleFormSubmit}>
          <Grid container spacing={2}>
            <Grid item md={6}>
              <JsInput name="title" label="title" />
            </Grid>
            <Grid item md={6}>
              <JSFileUploader name="file" label="Upload file" />
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
