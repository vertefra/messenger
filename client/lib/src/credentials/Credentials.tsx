import { Button, Grid, Typography } from "@material-ui/core"
import { FormEvent } from "react"
import { FormField } from '../formField'

export interface CredentialsProps{
    title: string
    submitValue: string
    handleSubmit: (ev: FormEvent) => void
    children: typeof FormField[]
}


export const Credentials: React.FC<CredentialsProps> = ({
    title,
    submitValue,
    handleSubmit,
    children
}) => {
    return (
    <Grid>
        <form onSubmit={handleSubmit}>
            <Grid item xs={10} sm={8}>
                <Typography variant="h1">
                    {title}
                </Typography>
                <Grid>
                    {children}
                </Grid>
                <Grid container justifyContent="center">
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                >
                  {submitValue}
                </Button>
              </Grid>
            </Grid>
        </form>
    </Grid>
    )
}