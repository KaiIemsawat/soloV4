import {
    Link,
    Navigate,
    useLocation,
    useNavigate,
    useParams,
} from "react-router-dom";
import { HiOutlineUser } from "react-icons/hi";
import { CgTrees, CgTree } from "react-icons/cg";
import axios from "axios";

export default function AccountNavigation() {
    const { pathname } = useLocation(); // to get path
    // console.log({ pathname }); // printable --> verify the current path
    let subpage = pathname.split("/")?.[2];
    if (subpage === undefined) {
        subpage = "profile";
    }

    /* linkClasses() {} <---- create base styles and assign additional style if the conditions meet
    then assign as classname in Tags */
    function linkClasses(type = null) {
        let classes = "p-2 px-6 inline-flex gap-1 items-center rounded-full";
        if (type === subpage) {
            classes += " bg-primary text-white";
        } else {
            classes += " bg-slate-200";
        }
        return classes;
    }
    return (
        <nav className="w-full flex justify-center mt-8 mb-8 gap-2">
            <Link className={linkClasses("profile")} to={"/account"}>
                <HiOutlineUser />
                My Profile
            </Link>
            <Link
                className={linkClasses("allTrails")}
                to={"/account/allTrails"}>
                <CgTrees />
                All Trails
            </Link>
            <Link className={linkClasses("myTrails")} to={"/account/myTrails"}>
                <CgTree />
                My Trails
            </Link>
        </nav>
    );
}
