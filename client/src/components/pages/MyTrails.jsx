import { Link, useNavigate, useParams } from "react-router-dom";
import { BiLocationPlus, BiImageAdd } from "react-icons/bi";
import { PiDogBold, PiTicketBold } from "react-icons/pi";
import { GiForestCamp } from "react-icons/gi";
import { GrWheelchair } from "react-icons/gr";
import { TbParking, TbTent } from "react-icons/tb";
import { useState } from "react";
import Amenities from "../Amenities";
import axios from "axios";
import PhotoUploader from "../PhotoUploader";
import TrailFormPage from "./TrailFormPage";
import AccountNavigation from "../AccountNavigation";

export default function MyTrails() {
    const nav = useNavigate();

    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("");
    const [addedPhoto, setAddedPhoto] = useState([]);
    const [photoLink, setPhotoLink] = useState("");
    const [description, setDescription] = useState("");
    const [amenities, setAmenities] = useState([]);
    const [extraInfo, setExtraInfo] = useState("");
    const [distance, setDistance] = useState(1);
    const [difficulty, setDifficulty] = useState(1);
    const [duration, setDuration] = useState(1);

    return (
        <div>
            <AccountNavigation />
            <div className="text-center">
                <p>My trails list</p>
                <br />
                <Link
                    className="items-center inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
                    to={"/account/myTrails/new"}>
                    <BiLocationPlus className="text-lg" />
                    add new trail
                </Link>
            </div>

            {/* {action === "new" && <TrailFormPage />} */}
        </div>
    );
}

// action !== "new" and action === "new"
// are used to define is the form should be rendered or not
