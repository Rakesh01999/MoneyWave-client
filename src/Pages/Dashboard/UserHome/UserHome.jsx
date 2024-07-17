import { Card, CardContent, Typography } from "@mui/material";
import useAuth from "../../../hooks/useAuth";
import logo from '../../../../src/assets/mm.png'

const UserHome = () => {
    const { user } = useAuth();
    return (
        <div>
            {/* <h2 className="text-3xl">
                <span>Hi Welcome </span>
                {
                    user?.displayName ? user.displayName : 'Back'
                }
            </h2> */}

            <div className="p-4 flex flex-col items-center">
                <Typography variant="h4" className="mb-4">User Dashboard</Typography>
                <Typography variant="h3" className="mb-4"> User : {user?.displayName}</Typography>
                <Card className="w-full max-w-lg mb-4">
                    <CardContent>
                        {/* <Typography variant="h5" className="text-center mb-4">Biodata Statistics</Typography> */}
                        <div data-aos="zoom-out-down">
                        <div className="flex justify-center">
                            <img src={logo} alt="" />
                        </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="w-full max-w-lg">
                    <CardContent>
                    <div data-aos="zoom-out-right">  
                        <Typography variant="h5" className="text-center mb-4">
                            Welcome to the Money Wave .
                        </Typography>
                    </div>
                    </CardContent>
                </Card>
            </div>

        </div>
    );
};

export default UserHome;