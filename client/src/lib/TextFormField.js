import {
  FormControl,
  FormHelperText,
  Grid,
  TextField,
} from "@material-ui/core";
import { xsBreakPointH } from "../themes/theme";

const formControlStyle = {
  width: "100%",
  [`@media (maxHeight:${xsBreakPointH}px)`]: {
    fontSize: 12,
    margin: 0,
  },
};

export const TextFormField = ({
  required,
  ariaLabel,
  label,
  inputType,
  minLength,
  helpMessage,
  error,
  name,
}) => {
  return (
    <Grid>
      <FormControl
        margin="normal"
        required={required}
        style={formControlStyle}
        error={error}
      >
        <TextField
          aria-label={ariaLabel}
          type={inputType}
          name={name}
          label={label}
          inputProps={{ minLength: minLength }}
        />
        <FormHelperText>{helpMessage}</FormHelperText>
      </FormControl>
    </Grid>
  );
};
