import { CgTrees } from "react-icons/cg";
import { BiSearch } from "react-icons/bi";
import { HiMenu, HiUser } from "react-icons/hi";
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
                <div className="flex border gap-2 border-slate-300 rounded-full py-2 px-4 ">
                    <div className="text-slate-400">My Trails</div>
                    <div className=" border-l border-slate-300"></div>
                    <div className="text-slate-400">All Trails</div>
                    <div className=" border-l border-slate-300"></div>
                    <div className="text-slate-400">Invite Friends</div>
                    <button className="bg-primary text-white p-1 rounded-full">
                        <BiSearch />
                    </button>
                </div>
                <Link
                    to={user ? "/account" : "/login"}
                    className="flex items-center border gap-2 border-slate-300 rounded-full py-2 px-4 shadow-md shadow-gray-300">
                    <HiMenu />
                    <div className="bg-primary text-white rounded-full border border-primary overflow-hidden">
                        <HiUser className="relative text-xl border-primary" />
                    </div>
                    {user && <div>{user.username}</div>}
                </Link>
            </header>
        </div>
    );
}
