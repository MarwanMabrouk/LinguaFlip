
import { useAuthContext } from "../hooks/useAuthContext";
import { Container, Typography, Box } from "@mui/material";

const Profile = () =>{

    const {user} = useAuthContext();

    return(
        <Container sx={{m:5 }} className="container-profile">
            <Box >
                <Typography sx={{fontWeight: 'bold'}}variant="h4">Profile</Typography>
            </Box>
            
            <Box className="box">
                <Typography ><strong>Email: </strong> {user.email}</Typography>
            </Box>
            <Box className="box">
                <Typography ><strong>Native language: </strong> {user.nativeLanguage}</Typography>
            </Box>
            <Box className="box">
                <Typography ><strong>Foreign language: </strong> {user.foreignLanguage}</Typography>
            </Box>
          
            

        </Container>

    )


};
export default Profile;