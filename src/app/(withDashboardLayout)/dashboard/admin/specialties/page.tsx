"use client";
import { Box, Button, IconButton, Stack, TextField } from "@mui/material";
import SpecialtiesModal from "./comoponents/SpecialtiesModal";
import { useState } from "react";
import {
  useDeleteSpecialtiesMutation,
  useGetAllSpecialtiesQuery,
} from "@/redux/api/specialtiesApi";
import { DataGrid, GridColDef, GridDeleteIcon } from "@mui/x-data-grid";
import Image from "next/image";
import { toast } from "sonner";

const SpecialtiesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { data, isLoading } = useGetAllSpecialtiesQuery({});
  const [deleteSpecialties] = useDeleteSpecialtiesMutation();
  const handleDelete = async (id: string) => {
    try {
      const res = await deleteSpecialties(id).unwrap();
      if (res?.id) {
        toast.success("Specialties deleted successfully");
      }
    } catch (err: any) {
      console.log(err.message);
    }
  };

  // console.log(data);
  const columns: GridColDef[] = [
    { field: "title", headerName: "title", width: 400 },
    {
      field: "icon",
      headerName: "icon",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Image src={row.icon} width={30} height={30} alt="icon" />
          </Box>
        );
      },
    },
    {
      field: "Action",
      headerName: "Action",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => {
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
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Button onClick={() => setIsModalOpen(true)}>
          {" "}
          Create Specialties
        </Button>
        <SpecialtiesModal open={isModalOpen} setOpen={setIsModalOpen} />
        <TextField placeholder="Serach Specialties" size="small" />
      </Stack>
      <Box my={2}>
        {!isLoading ? (
          <DataGrid rows={data} columns={columns} hideFooter={true} />
        ) : (
          <h1>Loading.........</h1>
        )}
      </Box>
    </Box>
  );
};

export default SpecialtiesPage;
