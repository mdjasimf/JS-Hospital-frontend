import { SxProps, TextField } from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
type TInputProps = {
  name: string;
  label?: string;
  type?: string;
  sx?: SxProps;
  placeholder?: string;
  size?: "small" | "medium";
  fullWidth?: boolean;
  required?: boolean;
};
const JsInput = ({
  name,
  label,
  type = "text",
  sx,
  placeholder,
  size = "small",
  fullWidth,
  required,
}: TInputProps) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          label={label}
          sx={{ ...sx }}
          type={type}
          variant="outlined"
          size={size}
          placeholder={label}
          fullWidth={fullWidth}
          required={required}
          error={!!error?.message}
          helperText={error?.message}
        />
      )}
    />
  );
};

export default JsInput;
