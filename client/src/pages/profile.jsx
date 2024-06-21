
import { useAuthContext } from "../hooks/useAuthContext";
import { Container, Typography } from "@mui/material";

const Profile = () =>{

    const {user} = useAuthContext();

    return(
        <Container sx={{m:5 }}>
            <Typography variant="h4">Profile</Typography>
            <div className="box">
                <Typography ><strong>Email: </strong> {user.email}</Typography>
            </div>
            <div className="box">
                <Typography ><strong>Native language: </strong> {user.nativeLanguage}</Typography>
            </div>
            <div className="box">
                <Typography ><strong>Foreign language: </strong> {user.foreignLanguage}</Typography>
            </div>

        </Container>

    )


};
export default Profile;