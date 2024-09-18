import JSDatePicker from "@/components/Form/JSDatePicker";
import JsForm from "@/components/Form/JsForm";
import JSMoodal from "@/components/Shared/JSMoodal/JSMoodal";
import { useGetAllSchedulesQuery } from "@/redux/api/sheduleApi";
import { dateFormatter } from "@/utils/dateFormatter";
import { Button, Grid, Stack } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import MultipleSelectFieldChip from "./MultipleSelectFieldChip";
import LoadingButton from "@mui/lab/LoadingButton";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const DoctorSchedulesModal = ({ open, setOpen }: TProps) => {
  const [selectDate, setSelectDate] = useState(dayjs(new Date()).toISOString());
  const [selectSchedulIds, setSelectScheduleIds] = useState<string[]>([]);
  console.log(selectSchedulIds, "jasim");
  const query: Record<string, any> = {};
  if (!!selectDate) {
    query["startDate"] = dayjs(selectDate)
      .hour(0)
      .minute(0)
      .millisecond(0)
      .toISOString();
    query["endDate"] = dayjs(selectDate)
      .hour(23)
      .minute(99)
      .millisecond(999)
      .toISOString();
  }
  const { data, isLoading } = useGetAllSchedulesQuery(query);
  const schedules = data?.schedules;

  const onSubmit = () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <JSMoodal open={open} setOpen={setOpen} title="Create doctor schedules">
      <Stack direction={"column"} gap={2}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Controlled picker"
            value={dayjs(selectDate)}
            onChange={(newValue) =>
              setSelectDate(dayjs(newValue).toISOString())
            }
            sx={{
              width: "100%",
            }}
          />
        </LocalizationProvider>
        <MultipleSelectFieldChip
          schedules={schedules}
          selectSchedulIds={selectSchedulIds}
          setSelectScheduleIds={setSelectScheduleIds}
        />
        <LoadingButton
          size="small"
          onClick={onSubmit}
          loading={true}
          loadingIndicator="Submitting..."
          variant="contained"
        >
          Submit
        </LoadingButton>
      </Stack>
    </JSMoodal>
  );
};

export default DoctorSchedulesModal;
