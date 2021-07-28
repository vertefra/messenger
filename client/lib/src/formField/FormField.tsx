import { FormControl, Grid, PropTypes, TextField } from "@material-ui/core"

export interface FormFieldProps{
    margin?: PropTypes.Margin
    isRequired?: boolean
    ariaLabel?: string
    className?: string
    label: string
    name: string
    type: string
}

export const FormField: React.FC<FormFieldProps> = ({margin, isRequired, ariaLabel, label, name, type}) => {
    return (<Grid>
        <FormControl
            margin={margin}
            required={isRequired} 
        >
            <TextField 
                aria-label={ariaLabel}
                label={label}
                name={name}
                type={type}
            />
        </FormControl>
    </Grid>)
}