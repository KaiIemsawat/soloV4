import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import Amenities from "../Amenities";
import axios from "axios";
import PhotoUploader from "../PhotoUploader";
import AccountNavigation from "../AccountNavigation";

export default function TrailFormPage() {
    const { action } = useParams();
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

    function inputHeader(text) {
        return <h2 className="text-xl  mt-4">{text}</h2>;
    }

    function inputDescription(text) {
        return <p className="text-xs text-slate-400">{text}</p>;
    }

    function preInput(header, description) {
        return (
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>
        );
    }
    // fagdggserghfhjfyjkguykiuyoui
    async function submitHandler(e) {
        e.preventDefault();
        await axios.post("/trails", {
            title,
            location,
            addedPhoto,
            description,
            amenities,
            extraInfo,
            distance,
            difficulty,
            duration,
        });
        nav("/account/myTrails");
    }

    return (
        <div>
            <AccountNavigation />
            <form className="mx-2" onSubmit={submitHandler}>
                {preInput("Title", "might need to remove later")}
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="title : please input the trail's name"
                />
                {preInput("Location", "might need to remove later")}
                <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="location : please input the trail's location"
                />
                {preInput("Images", "might need to remove later")}
                <PhotoUploader
                    addedPhoto={addedPhoto}
                    onChange={setAddedPhoto}
                />
                {preInput("Description", "Please input valuable description")}
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                {preInput("Amenities", "Select all available amenities")}
                <div className="mt-2 gap-2 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  xl:grid-cols-6">
                    <Amenities selected={amenities} onChange={setAmenities} />
                </div>
                {preInput(
                    "Extra Info",
                    "If there is any useful tip aor things to aware"
                )}
                <textarea
                    value={extraInfo}
                    onChange={(e) => setExtraInfo(e.target.value)}
                />
                {preInput(
                    "Distance, Difficulty, and Hike Duration",
                    "might need to remove later"
                )}
                <div className="grid gap-2 sm:grid-cols-3">
                    <div>
                        <h3 className="mt-2 -mb-1 text-slate-500">
                            Distance{" "}
                            <span className="text-slate-500">(miles)</span>
                        </h3>
                        <input
                            type="number"
                            value={distance}
                            onChange={(e) => setDistance(e.target.value)}
                            placeholder="5.6"
                            min="1"
                        />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1 text-slate-500">
                            Difficulty Level{" "}
                            <span className="text-slate-500">(1-10)</span>
                        </h3>
                        <input
                            type="number"
                            value={difficulty}
                            onChange={(e) => setDifficulty(e.target.value)}
                            placeholder="3"
                            min="1"
                            max="10"
                        />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1 text-slate-500">
                            Duration{" "}
                            <span className="text-slate-500">(hours)</span>
                        </h3>
                        <input
                            type="number"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            placeholder="6"
                            min="1"
                        />
                    </div>
                </div>
                <button className="primary mt-4">save my trail</button>
            </form>
        </div>
    );
}
