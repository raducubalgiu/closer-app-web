import { TextField, TextFieldProps } from "@mui/material";
import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { get, has } from "lodash";

type IProps = TextFieldProps & { name: string; label: string; rules?: {} };

export default function Input({ name, label, rules }: IProps) {
  const { formState, control } = useFormContext();
  const { errors } = formState;

  return (
    <Controller
      control={control}
      rules={{ ...rules }}
      render={({ field: { onChange, onBlur, value } }) => (
        <TextField
          fullWidth
          label={label}
          error={has(errors, name)}
          //helperText={get(errors, name)?.message}
          required={has(rules, "required")}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
        />
      )}
      name={name}
    />
  );
}
