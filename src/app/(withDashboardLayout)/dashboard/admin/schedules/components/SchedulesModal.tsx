import JSDatePicker from "@/components/Form/JSDatePicker";

import JsForm from "@/components/Form/JsForm";

import JSTimePicker from "@/components/Form/JStimePicker";
import JSMoodal from "@/components/Shared/JSMoodal/JSMoodal";
import { useCreateSheduleMutation } from "@/redux/api/sheduleApi";

import { dateFormatter } from "@/utils/dateFormatter";

import { timeFormatter } from "@/utils/timeFormatter";
import { Button, Grid } from "@mui/material";
import React from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SchedulesModal = ({ open, setOpen }: TProps) => {
  const [createShedule] = useCreateSheduleMutation();
  const handleFormSubmit = async (values: FieldValues) => {
    values.startDate = dateFormatter(values.startDate);
    values.endDate = dateFormatter(values.endDate);
    values.startTime = timeFormatter(values.startTime);
    values.endTime = timeFormatter(values.endTime);
    // console.log(values);
    try {
      const res = await createShedule(values).unwrap();
      console.log(res);
      if (res?.length) {
        toast.success("Schedules created successfully!");
        setOpen(false);
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <JSMoodal open={open} setOpen={setOpen} title="Create Schedule">
      <JsForm onSubmit={handleFormSubmit}>
        <Grid container spacing={2} sx={{ width: "400px" }}>
          <Grid item md={12}>
            <JSDatePicker name="startDate" label="Start Date" />
          </Grid>
          <Grid item md={12}>
            <JSDatePicker name="endDate" label="End Date" />
          </Grid>
          <Grid item md={6}>
            <JSTimePicker name="startTime" label="Start Time" />
          </Grid>
          <Grid item md={6}>
            <JSTimePicker name="endTime" label="End Time" />
          </Grid>
        </Grid>
        <Button type="submit" sx={{ mt: 1 }}>
          Create
        </Button>
      </JsForm>
    </JSMoodal>
  );
};

export default SchedulesModal;
