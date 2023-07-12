import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { HiOutlineUser } from "react-icons/hi";
import { CgTrees, CgTree } from "react-icons/cg";
import axios from "axios";
import MyTrails from "./MyTrails";
import AccountNavigation from "../AccountNavigation";

export default function ProfilePage() {
    const { isReady, user, setUser } = useContext(UserContext);
    const [redirect, setRedirect] = useState(null);

    // assign subpage value of params
    let { subpage } = useParams();
    if (subpage === undefined) {
        subpage = "profile";
    }

    async function logout() {
        await axios.post("/logout");
        setUser(null);
        setRedirect("/");
    }

    if (!isReady) {
        return "Loading .........";
    }
    if (isReady && !user && !redirect) {
        return <Navigate to={"/login"} />;
    }

    if (redirect) {
        return <Navigate to={redirect} />;
    }

    return (
        <div>
            <AccountNavigation />
            {subpage === "profile" && (
                <div className="text-center text-slate-700 max-w-lg mx-auto">
                    Logged in as {user.username} ({user.email})<br />
                    <button onClick={logout} className="primary max-w-xs">
                        logout
                    </button>
                </div>
            )}
            {subpage === "myTrails" && <MyTrails />}
        </div>
    );
}
