import { BiFoodMenu, BiSolidFoodMenu } from "react-icons/bi";
import { FaAd, FaBook, FaCalendar, FaEdit, FaEnvelope, FaFileContract, FaHome, FaList, FaPaypal, FaPlug, FaShoppingCart, FaUsers, FaUtensils } from "react-icons/fa";
import { FaClover, FaHouse } from "react-icons/fa6";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
// import useCart from "../hooks/useCart";
import { FcContacts } from "react-icons/fc";
import useAdmin from "../hooks/useAdmin";
import { Typography } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../Pages/providers/AuthProvider";
import { TbLogout } from "react-icons/tb";
import { RiAdminFill } from "react-icons/ri";
import { MdWorkspacePremium } from "react-icons/md";
import { IoIosGitPullRequest } from "react-icons/io";
import { MdCelebration } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { GiEternalLove } from "react-icons/gi";
import { MdFaceRetouchingNatural } from "react-icons/md";

const Dashboard = () => {
    // const [cart] = useCart();

    const [isAdmin] = useAdmin();
    const { user, logOut } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleLogOutClick = () => {
        logOut()
            .then(() => {
                navigate('/');
            })
            .catch(error => console.log(error))
    };

    return (
        <div className="flex flex-col md:flex-row">
            {/* dashboard side bar */}
            <div className="w-full md:w-64 min-h-screen bg-blue-400">
                <ul className="menu p-4 space-y-2">
                    {isAdmin ? (
                        <>
                            <li>
                                <NavLink to="/dashboard/adminHome" className="flex items-center gap-2">
                                    <RiAdminFill />
                                    <span>Admin Home</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/users" className="flex items-center gap-2">
                                    <FaUsers />
                                    <span>Manage Users</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/approvedPremium" className="flex items-center gap-2">
                                    <MdWorkspacePremium />
                                    <span>Approved Premium</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/approvedContactRequest" className="flex items-center gap-2">
                                    <IoIosGitPullRequest />
                                    <span>Approved Contact Request</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/successStory" className="flex items-center gap-2">
                                    <MdCelebration />
                                    <span>Success Story</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/paymentHistory" className="flex items-center gap-2">
                                    <FaPaypal />
                                    <span>Payment History</span>
                                </NavLink>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <NavLink to="/dashboard/userHome" className="flex items-center gap-2">
                                    <FaRegUser />
                                    <span>User Home</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/editBiodata" className="flex items-center gap-2">
                                    <FaEdit />
                                    <span>Edit Biodata</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/viewBiodata" className="flex items-center gap-2">
                                    <FaList />
                                    <span>View Biodata</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/myContactRequest" className="flex items-center gap-2">
                                    <FaFileContract />
                                    <span>My Contact Request</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/favouriteBiodata" className="flex items-center gap-2">
                                    <GiEternalLove />
                                    <span>Favourite Biodata</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/gotMarried" className="flex items-center gap-2">
                                    <MdFaceRetouchingNatural />
                                    <span>Got Married</span>
                                </NavLink>
                            </li>
                        </>
                    )}
                    <li>
                        <Typography
                            className="text-center mt-3 cursor-pointer text-white"
                            variant="body1"
                            component="div"
                            onClick={handleLogOutClick}
                        >
                            <span className="flex items-center gap-2">
                                <TbLogout />
                                Log Out
                            </span>
                        </Typography>
                    </li>
                    <div className="divider"></div>
                    <li>
                        <NavLink to="/" className="flex items-center gap-2">
                            <FaHouse />
                            <span>Home</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/contactUs" className="flex items-center gap-2">
                            <FaEnvelope />
                            <span>Contact</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
            {/* dashboard content */}
            <div className="flex-1 p-8">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
