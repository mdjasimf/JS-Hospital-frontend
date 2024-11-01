"use client";
import { Box, Button, IconButton, Stack, TextField } from "@mui/material";

import { useState } from "react";

import { DataGrid, GridColDef, GridDeleteIcon } from "@mui/x-data-grid";

import EditIcon from "@mui/icons-material/Edit";
import Link from "next/link";
import DoctorModal from "./components/DoctorsModal";
import {
  useDeleteDoctorsMutation,
  useGetAllDotorsQuery,
} from "@/redux/api/doctorsApi";
import { toast } from "sonner";
import { useDebounce } from "@/redux/hook";
import { useRouter } from "next/navigation";

const DoctorsPage = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const query: Record<string, any> = {};
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debounceTerm = useDebounce({
    searchQuery: searchTerm,
    delay: 600,
  });
  if (!!debounceTerm) {
    query["searchTerm"] = searchTerm;
  }
  const { data, isLoading } = useGetAllDotorsQuery({ ...query });
  const [deleteDoctors] = useDeleteDoctorsMutation();
  const doctors = data?.doctors;
  console.log(data);
  const meta = data?.meta;
  const handleDelete = async (id: string) => {
    try {
      const res = await deleteDoctors(id).unwrap();
      console.log(res);
      if (res?.id) {
        toast.success("Doctor deleted successfully");
      }
    } catch (err: any) {
      console.log(err?.message);
    }
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "contactNumber", headerName: "Contact Number", flex: 1 },
    { field: "address", headerName: "Adress", flex: 1 },
    { field: "designation", headerName: "designation", flex: 1 },
    { field: "apointmentFee", headerName: "apointmentFee", flex: 1 },
    { field: "qualification", headerName: "qualification", flex: 1 },
    {
      field: "currentWorkingPlace",
      headerName: "currentWorkingPlace",
      flex: 1,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => {
        return (
          <Box>
            <IconButton
              onClick={() => handleDelete(row?.id)}
              aria-label="delete"
            >
              <GridDeleteIcon sx={{ color: "red" }} />
            </IconButton>
            <Link href={`/dashboard/admin/doctors/edit/${row?.id}`}>
              <IconButton aria-label="delete">
                <EditIcon />
              </IconButton>
            </Link>
          </Box>
        );
      },
    },
  ];

  return (
    <Box>
      <Stack
        mb={2}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Button onClick={() => setIsModalOpen(true)}>Create New Doctor</Button>
        <DoctorModal open={isModalOpen} setOpen={setIsModalOpen} />
        <TextField
          onChange={(e) => setSearchTerm(e.target.value)}
          size="small"
          placeholder="search doctors"
        />
      </Stack>

      {!isLoading ? (
        <DataGrid rows={doctors} columns={columns} />
      ) : (
        <h1>Loading.........</h1>
      )}
    </Box>
  );
};

export default DoctorsPage;
