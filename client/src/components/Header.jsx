import { CgTrees } from "react-icons/cg";
import { HiMenu } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./UserContext.jsx";

export default function Header() {
    const { user } = useContext(UserContext);
    return (
        <div>
            <header className=" flex justify-between">
                <Link to={"/"} className="flex items-center gap-1">
                    <CgTrees className="w-6 h-6 text-primary" />
                    <span className="font-bold text-xl">Tra!ls</span>
                </Link>
                <Link
                    to={user ? "/account" : "/login"}
                    className="flex items-center border gap-2 border-slate-300 rounded-full py-2 px-4 shadow-md shadow-gray-300">
                    <HiMenu />

                    {user && (
                        <div className="text-primary">{user.username}</div>
                    )}
                </Link>
            </header>
        </div>
    );
}
