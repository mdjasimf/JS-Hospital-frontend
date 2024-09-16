import JSDatePicker from "@/components/Form/JSDatePicker";
import JsForm from "@/components/Form/JsForm";
import JSMoodal from "@/components/Shared/JSMoodal/JSMoodal";
import { useGetAllSchedulesQuery } from "@/redux/api/sheduleApi";
import { dateFormatter } from "@/utils/dateFormatter";
import { Button, Grid } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import MultipleSelectFieldChip from "./MultipleSelectFieldChip";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const DoctorSchedulesModal = ({ open, setOpen }: TProps) => {
  const [selectDate, setSelectDate] = useState(dayjs(new Date()).toISOString());
  const [selectSchedulesId, setSelectSchedulesId] = useState([]);
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
  console.log(data);

  return (
    <JSMoodal open={open} setOpen={setOpen} title="Create doctor schedules">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Controlled picker"
          value={dayjs(selectDate)}
          onChange={(newValue) => setSelectDate(dayjs(newValue).toISOString())}
        />
      </LocalizationProvider>
      <MultipleSelectFieldChip schedules={schedules} />
    </JSMoodal>
  );
};

export default DoctorSchedulesModal;
