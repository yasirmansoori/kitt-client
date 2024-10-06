import Autocomplete from "@mui/material/Autocomplete";
import { airports } from "../../data.json";
import { FormControl, InputAdornment, OutlinedInput } from "@mui/material";
import { MdGpsFixed } from "react-icons/md";

export default function SearchInput({
  label,
  value,
  setValue,
  isError,
}: {
  label: string;
  value: string;
  setValue: (value: string) => void;
  isError?: string;
}) {
  return (
    <Autocomplete
      disablePortal
      options={airports}
      getOptionLabel={(option) => option.label}
      sx={{
        pr: 0,
      }}
      value={airports.find((option) => option.label === value)}
      onChange={(_, value) => {
        setValue(value?.code || "");
      }}
      fullWidth
      renderInput={(params) => {
        return (
          <FormControl variant="outlined" fullWidth>
            <OutlinedInput
              fullWidth
              {...params.InputProps}
              id="outlined-adornment-search"
              placeholder={label}
              error={!!isError}
              startAdornment={
                <InputAdornment position="start">
                  <MdGpsFixed />
                </InputAdornment>
              }
              aria-describedby="outlined-weight-helper-text"
              inputProps={{
                ...params.inputProps,
                "aria-label": "search",
              }}
              sx={{
                border: "none",
              }}
            />
          </FormControl>
        );
      }}
    />
  );
}
