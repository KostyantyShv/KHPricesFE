import { Avatar, Typography } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
interface IProps {
  statusCode: number;
  errorMessage: string;
}
const Error = ({statusCode, errorMessage}: IProps) => {
  return (
   <>
   <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
    <ErrorIcon />
        </Avatar>
        <Typography component="h1" variant="h4">
          {statusCode}
        </Typography>
        <Typography component="h2" variant="h5">
          {errorMessage}
        </Typography>
   </>
  )
}

export default Error