"use client";

import {
  Box,
  Button,
  IconButton,
  Pagination,
  PaginationItem,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import DoctorSchedulesModal from "./components/DoctorSchedulesModal";
import { DataGrid, GridColDef, GridDeleteIcon } from "@mui/x-data-grid";

import { dateFormatter } from "@/utils/dateFormatter";
import dayjs from "dayjs";
import { useGetAllDoctorSchedulesQuery } from "@/redux/api/doctorSceduleApi";
import { useDeleteScheduleMutation } from "@/redux/api/sheduleApi";
import { ISchedule } from "@/types/schedule";
import { toast } from "sonner";
import AddIcon from "@mui/icons-material/Add";

const DoctorschedulesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const query: Record<string, any> = {};

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  query["page"] = page;
  query["limit"] = limit;
  const [allSchedule, setAllSchedule] = useState<any>([]);
  const [deleteSchedule] = useDeleteScheduleMutation();
  const { data, isLoading } = useGetAllDoctorSchedulesQuery({ ...query });

  const schedules = data?.doctorSchedules;
  const meta = data?.meta;
  let pageCount: number;
  if (meta?.total) {
    pageCount = Math.ceil(meta.total / limit);
  }
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    const updateData = schedules?.map((schedule: ISchedule, index: number) => {
      return {
        sl: index + 1,
        id: schedule?.scheduleId,
        startDate: dateFormatter(schedule?.schedule?.startDate),
        startTime: dayjs(schedule?.schedule?.startDate).format("hh:mm a"),
        endTime: dayjs(schedule?.schedule?.endDate).format("hh:mm a"),
      };
    });
    setAllSchedule(updateData);
  }, [schedules]);

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteSchedule(id).unwrap();

      if (res.scheduleId) {
        toast.success("shedule deleted successfully");
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const columns: GridColDef[] = [
    { field: "sl", headerName: "SL" },
    { field: "startDate", headerName: "Date", flex: 1 },
    { field: "startTime", headerName: "Start Time", flex: 1 },
    { field: "endTime", headerName: "End Time", flex: 1 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }: any) => {
        return (
          <IconButton onClick={() => handleDelete(row.id)} aria-label="delete">
            <GridDeleteIcon sx={{ color: "red" }} />
          </IconButton>
        );
      },
    },
  ];

  return (
    <Box>
      <Button onClick={() => setIsModalOpen(true)} endIcon={<AddIcon />}>
        Create doctor shedules
      </Button>
      <DoctorSchedulesModal open={isModalOpen} setOpen={setIsModalOpen} />

      <Box>
        {!isLoading ? (
          <Box my={2}>
            <DataGrid
              rows={allSchedule ?? []}
              columns={columns}
              hideFooterPagination
              slots={{
                footer: () => {
                  return (
                    <Box
                      sx={{
                        mb: 2,
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      <Pagination
                        count={pageCount}
                        page={page}
                        onChange={handleChange}
                        renderItem={(item: any) => (
                          <PaginationItem
                            {...item}
                            sx={{
                              "&.Mui-selected": {
                                backgroundColor: "blue",
                                color: "white",
                              },
                              "&.Mui-selected:hover": {
                                backgroundColor: "#1976d2", // Hover color when active
                              },
                              "&:hover": {
                                backgroundColor: "lightblue", // Hover color for non-active pages
                              },
                            }}
                          />
                        )}
                      />
                    </Box>
                  );
                },
              }}
            />
          </Box>
        ) : (
          <h1>Loading.....</h1>
        )}
      </Box>
    </Box>
  );
};

export default DoctorschedulesPage;
