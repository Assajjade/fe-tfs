import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Controller } from 'react-hook-form';

export default function ImageField(props) {
  const { label, width, name, control } = props;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error }, formState }) => (
        <>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              onChange(e.target.files[0]);
            }}
            style={{ display: 'none' }}
            id={`${name}-input`}
          />
          <label htmlFor={`${name}-input`}>
            <Button
              variant="outlined"
              component="span"
              fullWidth
              sx={{ width: { width } }}
            >
              {value ? value.name : label}
            </Button>
          </label>
        </>
      )}
    />
  );
}
